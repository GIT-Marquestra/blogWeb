import express from "express";
import bodyParser from "body-parser";
import fs, { read } from "fs"; // importing fileSystem modules
// import session from "express-session";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// let posts = [] // initializing the array....now we will use a file.json as a database..

function readData(){ // helper function to read data.
    try {
        const data = fs.readFileSync("database.json", "utf-8"); // reading files "synchronously"
        return JSON.parse(data);
    } catch(error){
        console.error(`Error reading data: ${error}`);
        return [];
    }
}

function writeData(data){ // helper function to write data.
    try{
        fs.writeFileSync("database.json", JSON.stringify(data, null, 2));
    } catch(error){
        console.error(`Error writing data: ${error}`)       

    }
}

app.get("/", (req, res) => {
    const posts = readData();
    res.render("index.ejs", { posts });
}
);

app.get("/start", (req, res) => { 
    res.render("start.ejs")
}
);

app.post("/submit", (req, res) => {
    const posts = readData(); // reads the data and assign it in an array "posts"
    const {titleName, content, password} = req.body;
    const post = {
        id: (posts.length + 1).toString(),
        titleName, 
        content,
        password 
    }

    
    posts.unshift(post); // first it appends it in array "posts"
    writeData(posts); // then it writes "posts" in file
    res.redirect("/");
}
);

app.use(express.json());  // To parse JSON data in the body of any request
app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded data


app.delete("/delete/:id", (req, res) => {
    const postId = req.params.id;
    const { passwordElement } = req.body // shorthand method to write --> const passwordElement = req.body.passwordElement.
    const posts = readData();
    const postToDelete = posts.find(post => post.id === postId);

    if(!postToDelete){
        return res.status(404).json({ error: "Post not found." });
    }

    if(postToDelete.password === passwordElement){
        const upPosts = posts.filter(post => post.id !== postId);
        writeData(upPosts);

        return res.status(200).json({ message: "Post deleted successfully." });

    } else {
        return res.status(403).json({ error: "Incorrect password." });
    }

})


app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
} 
);  

