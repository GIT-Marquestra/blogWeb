document.addEventListener("DOMContentLoaded", function(){
    document.querySelector(".post").addEventListener("click", function(){
        alert("Please reload the page once to see the changes!")
    })
    // scrolling to the data entry section-->
    document.querySelector(".buttonStart").addEventListener("click", function(){
        // Method 1 to make scroll work.
        // document.querySelector(".cv1").scrollIntoView({
        //     behavior: "smooth",
        //     block: "start"
    
        // })

        // Method 2, slightly better method.
        const targetSection = document.querySelector(".cv1");
        const sectionPosition = targetSection.offsetTop;
        const offset = 100;
        window.scrollTo({
            top: sectionPosition - offset,
            behavior: "smooth"
        })
    
    })
    document.querySelector(".button-div").addEventListener("click", function(){
        // Method 1 to make scroll work.
        // document.querySelector(".cv1").scrollIntoView({
        //     behavior: "smooth",
        //     block: "start"
    
        // })

        // Method 2, slightly better method.
        const targetSection = document.querySelector(".cont2");
        const sectionPosition = targetSection.offsetTop;
        const offset = 100;
        window.scrollTo({
            top: sectionPosition - offset,
            behavior: "smooth"
        })
    
    })
    
    
    // fetching the data and showing it on the preview section-->
    document.querySelectorAll(".blog-card").forEach(card => {
        card.addEventListener("click", function(event){
            event.preventDefault();
            const id = this.dataset.id;
            const titleElement = this.dataset.title;
            const contentElement = this.dataset.content;
    
            let title = "";
            let content = "";
    
            if(titleElement || contentElement){
                title = titleElement;
                content = contentElement;
                console.log("Data transfered successfully")
            } else{
                console.error("Title or content element not found...")
            }
    
            if(title || content){
                document.querySelector("#previewTitle").textContent = title;
                document.querySelector("#previewContent").textContent = content;
                console.log("Done")
    
            } else {
                console.error("Data not transferred to the preview section...")
            }
    
            currentPostId = id;

            
            document.querySelector(".h2").classList.add("shrink")
            document.querySelector("#previewSection").classList.add("show")    
            document.querySelector("#previewSection").classList.remove("zoomOutAnimation")    
            document.querySelector("#previewSection").classList.add("zoomInAnimation")    
            document.querySelector("#previewSection").style.display = "block"; 
    
            // document.getElementById("preview-section").scrollIntoView({ behavior: "smooth" });
    
        })
    
    
    })
    
    document.querySelector("#closePreview").addEventListener("click", function(){
        document.querySelector("#previewSection").style.display = "none";
        document.querySelector("#previewSection").classList.remove("zoomInAnimation")
        document.querySelector("#previewSection").classList.add("zoomOutAnimation")
        setTimeout(function(){
            document.querySelector(".h2").classList.remove("shrink")
            document.querySelector(".h2").classList.add("reset")
        }, 100)
    })
      
    
    // delete functionality-->
    document.querySelector("#deletePostBtn").addEventListener("click", function(){

        const passwordContainer = document.querySelector("#passwordContainer");
        if (passwordContainer) {
            console.log("Password container found!");
            passwordContainer.style.display = "block"; // Show the container
        } else {
            console.error("Password container not found!");
        }
        document.querySelector("#passwordContainer").style.display = "block";
    })
    
    document.querySelector("#confirmDelete").addEventListener("click", function(){
        const passwordElement = document.querySelector("#checkPassword").value; // now the passwordElement has the pass entered by deleter.
        console.log(currentPostId)
        if(passwordElement){
            console.log(passwordElement)
        } else{
            console.log("Noob")
        }
    
        if(!currentPostId || !passwordElement){
            console.error("ID or Password is missing...")
        }
    
        fetch(`/delete/${currentPostId}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ passwordElement }) // try changing here
        })
    
        .then(response => {
            if(response.ok){
                document.querySelector("#previewSection").classList.remove("zooInAnimation")
                document.querySelector("#previewSection").classList.add("zooOutAnimation")
                document.querySelector(".h2").classList.remove("shrink")
                document.querySelector(".h2").classList.add("reset")
                alert("Post deleted successfully")

            } else if(response.status === 403){
                alert("Incorrect password, Please try again.")
            } else {
                alert("Deletion Failed, Please try again later")
            }
        })
    
        .catch(error => console.error("Error: ", error))

    })

    document.querySelector(".h2").addEventListener("mouseenter", (e) => {
        e.stopPropagation();
    })
    const scrollAppearElements = document.querySelectorAll('.scroll-appear');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); 
    scrollAppearElements.forEach(el => observer.observe(el));





})    
