class ProfileMenu {
    constructor() {
        this.mainPageSection = document.querySelector('#mainSection');
        this.profileDropSection = document.querySelector('#profileSection');
        document.querySelector('#mainPageSection').addEventListener('click', e => {
            profileMenu.showMainPage(e)
        });
    }

    showMainPage(e) {
        e.preventDefault();
        this.mainPageSection.style.display = 'block';
        this.profileDropSection.style.display = 'none';
        resetOptions.reset();
    }

    showProfileMenu(e, userData) {
        e.preventDefault();
        this.mainPageSection.style.display = 'none';
        this.profileDropSection.style.display = 'block';

        //Show userData
        createUserProfile.createUserDataProfile(userData);

        //Show userPanel
        if(userData.isAdmin === true) {
            //create admin panel
            createUserPanel.createUserPanelButtons();
            handleAddAdmin.createAddBlog();

            //SPYTA PREZESA O TO. JAK ROZWIĄZAc klase
            const submitNewBlog = document.querySelector('#submitNewBlog');
            submitNewBlog.addEventListener('submit', e => fetchSubmitBlog.submitBlogPanel(e));

            const togglePanelOptionsButtons = [...document.querySelectorAll('#userPanel button')];
            togglePanelOptionsButtons.forEach(button => button.addEventListener('click', profileMenu.togglePanelOptions));
        }
        else if (userData.isAdmin === false) {
            // toDo create normal user panel
        }
    }

    togglePanelOptions() {
        resetOptions.reset();
        if( this.id === 'addBlogButton'){
            handleAddAdmin.createAddBlog();

            //SPYTA PREZESA O TO. JAK ROZWIĄZAc klase
            const submitNewBlog = document.querySelector('#submitNewBlog');
            submitNewBlog.addEventListener('submit', e => fetchSubmitBlog.submitBlogPanel(e));
        }
        else if ( this.id === 'editBlogButton'){
            handleShowBlogsAdmin.createShowBlogs();
        }
        else if ( this.id === 'showAllUsersButton'){
            handleShowUsersAmin.createShowUsers();
        }
    }
}

const profileMenu = new ProfileMenu();


