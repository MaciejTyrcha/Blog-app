class FetchSubmitBlog{
    constructor() {
        this.inputArtist = document.querySelector('#inputArtist');
        this.inputAlbum = document.querySelector('#inputAlbum');
        this.inputDescription = document.querySelector('#inputDescription');
        this.inputRating = document.querySelector('#inputRating');
        this.submitNewBlog = document.querySelector('#submitNewBlog');
    }
    async submitBlogPanel (e){
        e.preventDefault();
        console.log(this.submitNewBlog);
        const blog = {
            artist: `${inputArtist.value}`,
            album: `${inputAlbum.value}`,
            description: `${inputDescription.value}`,
            rating: `${inputRating.value}`,
        }
        const response = await fetch('/blogs', {
            method: 'post',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(blog),
        })

        // Resets create element when submit blog
        const pElementAfter = document.querySelector('#submitNewBlog p');
        if(pElementAfter){
            submitNewBlog.removeChild(submitNewBlog.lastChild);
        }

        let data = await response.json();
        if(JSON.stringify(data) === JSON.stringify({e: "Cannot create new blog!"})) {
            const pElement = document.createElement('p');
            pElement.textContent = 'Cannot create new blog!';
            pElement.style.color = 'red';
            submitNewBlog.appendChild(pElement);
        }
        else {
            const pElement = document.createElement('p');
            pElement.textContent = 'New blog added!';
            pElement.style.color = 'green';
            submitNewBlog.appendChild(pElement);
        }
    }
}

const fetchSubmitBlog = new FetchSubmitBlog();
