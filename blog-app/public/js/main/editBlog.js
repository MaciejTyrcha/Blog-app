class EditBlog {
    constructor() {
    }
    editSingleBlog (){
        createPopup();
        const popup = document.querySelector('#popupContainer');
        const quitPopup = document.querySelector('#quitPopup');
        quitPopup.addEventListener('click', () => {
            document.body.removeChild(popup);
        });
    }
}

const editBlog = new EditBlog();