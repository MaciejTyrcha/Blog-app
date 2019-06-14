class FetchAllBlogsPanel {
    constructor() {
        this.editBlogTBody = document.querySelector('#editBlogTBody');
    }
    async showAllBlogsPanel () {
        const response = await fetch('/blogs', {
            method: 'get',
        })

        const data = await response.json();
        data.forEach((el, index) => {
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            th.scope = 'row';
            th.textContent = `${index + 1}.`;

            editBlogTBody.appendChild(tr);
            tr.appendChild(th);

            for(let i = 0; i < 7; i++ ) {
                const td = document.createElement('td');
                switch(i) {
                    case 0:
                        td.textContent = el._id;
                        break;
                    case 1:
                        td.textContent = el.artist;
                        break;
                    case 2:
                        td.textContent = el.album;
                        break;
                    case 3:
                        td.textContent = el.description;
                        break;
                    case 4:
                        td.textContent = el.rating;
                        break;
                    case 5:
                        td.innerHTML = `<button class="btn btn-info">Edit</button>`;
                        break;
                    case 6:
                        td.innerHTML = `<button class="btn btn-danger">Delete</button>`;
                        break;

                }
                tr.appendChild(td);
            }
        });
        // Function to handle edit buttons
        const editBlogButton = document.querySelectorAll('#editBlogTBody button');
        editBlogButton.forEach(btn => btn.addEventListener('click', editBlog.editSingleBlog));
    }
}

const fetchAllBlogsPanel = new FetchAllBlogsPanel();
