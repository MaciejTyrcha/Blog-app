class HandleShowBlogsAdmin {
    constructor(){
        this.wholeContent = document.querySelector('#wholeContent');
    }

    createShowBlogs() {
        const container = document.createElement('div');
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        const tbody = document.createElement('tbody');
        container.id='editBlogContent';
        container.classList.add('table-responsive');
        table.classList.add('table', 'table-striped');
        tbody.id='editBlogTBody';

        ['', 'Id', 'Artist', 'Album', 'Description', 'Rating', '', ''].forEach(el => {
            const th = document.createElement('th');
            th.scope = 'col';
            th.appendChild(document.createTextNode(el));
            tr.appendChild(th);
        });

        thead.appendChild(tr);
        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(table);
        this.wholeContent.appendChild(container);


        fetchAllBlogsPanel.showAllBlogsPanel();
    }

}

const handleShowBlogsAdmin = new HandleShowBlogsAdmin();

