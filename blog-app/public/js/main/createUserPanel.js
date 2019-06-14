class CreateUserPanel {
    constructor(){
        this.userPanel = document.querySelector('#userPanel');
    }

    createUserPanelButtons(){
        const addblogButton = document.createElement('button');
        const showAllBlogsButton = document.createElement('button');
        const showAllUsersButton = document.createElement('button');
        while(this.userPanel.firstChild){
            this.userPanel.removeChild(this.userPanel.firstChild);
        }
        addblogButton.textContent = 'Add blog';
        addblogButton.classList.add('btn', 'btn-info');
        addblogButton.id = "addBlogButton";

        showAllBlogsButton.textContent = 'Show blogs';
        showAllBlogsButton.classList.add('btn', 'btn-info');
        showAllBlogsButton.id = "editBlogButton";

        showAllUsersButton.textContent  = 'Show users';
        showAllUsersButton.classList.add('btn', 'btn-info');
        showAllUsersButton.id = "showAllUsersButton";

        this.userPanel.appendChild(addblogButton);
        this.userPanel.appendChild(showAllBlogsButton);
        this.userPanel.appendChild(showAllUsersButton);
    }
}

const createUserPanel = new CreateUserPanel();


