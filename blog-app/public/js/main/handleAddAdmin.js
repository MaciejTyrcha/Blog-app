class HandleAddAdmin {
    constructor() {
        this.wholeContent = document.querySelector('#wholeContent');
    }

    createAddBlog() {
        const container = document.createElement('div');
        const form = document.createElement('form');
        const button = document.createElement('button');
        container.id = 'addBlogContent';
        form.id = 'submitNewBlog';
        button.type = 'submit';
        button.classList.add('btn', 'btn-success');
        button.textContent = 'Submit';

        for ( let i = 0 ; i < 4; i++) {
            const div = document.createElement('div');
            const label = document.createElement('label');
            const input = document.createElement('input');
            const textArea = document.createElement('textarea');
            div.classList.add('form-group');

            const showContent = (text, forInput, id, placeholder)  => {
                label.textContent = `${text}`;
                label.htmlFor = `${forInput}`;
                input.classList.add('form-control');
                input.id = `${id}`;
                input.placeholder = `${placeholder}`;
                input.required = true;
                div.appendChild(label);
            }

            switch(i) {
                case 0:
                    showContent('Artist', 'inputArtist', 'inputArtist', 'Artist');
                    input.type = 'text';
                    div.appendChild(input)
                    break;
                case 1:
                    showContent('Album', 'inputAlbum', 'inputAlbum', 'Album');
                    input.type = 'text';
                    div.appendChild(input)
                    break;
                case 2:
                    label.textContent = 'Description';
                    label.htmlFor = 'inputDescription';
                    textArea.classList.add('form-control');
                    textArea.id = 'inputDescription';
                    textArea.placeholder = 'Description';
                    textArea.required = true;
                    textArea.rows = 3;
                    div.appendChild(label);
                    div.appendChild(textArea);
                    break;
                case 3:
                    showContent('Rating', 'inputRating', 'inputRating', 'Rating');
                    input.type = 'text';
                    div.appendChild(input)
                    break;
            }
            form.appendChild(div)
        }
        form.appendChild(button);
        this.wholeContent.appendChild(container);
        container.appendChild(form);

        // const submitNewBlog = document.querySelector('#submitNewBlog');
        // submitNewBlog.addEventListener('submit', e => submitBlogPanel(e));
    }
}

const handleAddAdmin = new HandleAddAdmin();
