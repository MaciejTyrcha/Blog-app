class ResetOptions {
    reset (){
        const addBlogContent = document.querySelector('#addBlogContent');
        const editBlogContent = document.querySelector('#editBlogContent');
        const editUserContent = document.querySelector('#editUserContent');
        const wholeContent = document.querySelector('#wholeContent');

        if(addBlogContent) {
            wholeContent.removeChild(addBlogContent);
        }
        if(editBlogContent) {
            wholeContent.removeChild(editBlogContent);
        }
        if(editUserContent){
            wholeContent.removeChild(editUserContent);
        }
    }
}

const resetOptions = new ResetOptions();