console.log('Client side JS is loaded!');
const mainPageSectionButton = document.querySelector('#mainPageSection');
const dropdownOptions = document.querySelector('#dropdownOptions');
const mainPageSection = document.querySelector('#mainSection');
const profileDropSection = document.querySelector('#profileSection');

const dropdownMenu = document.querySelector('#headerMenu .dropdown-menu');

const wholeContent = document.querySelector('#wholeContent');

const createDropdownUnauthorized = () => {
    dropdownOptions.textContent = 'Account';
    while(dropdownMenu.firstChild){
        dropdownMenu.removeChild(dropdownMenu.firstChild);
    }
    const firstA =  document.createElement('a');
    firstA.id = 'dropdownRegister';
    firstA.className = 'dropdown-item';
    firstA.textContent = 'Register';
    firstA.href = "/register";
    dropdownMenu.appendChild(firstA);
}

const createDropdown = data => {
    dropdownOptions.textContent = data.firstName;
    while(dropdownMenu.firstChild){
        dropdownMenu.removeChild(dropdownMenu.firstChild);
    }

    const firstA = document.createElement('a');
    const secondA = document.createElement('a');
    firstA.id = 'dropdownProfile';
    firstA.className = 'dropdown-item';
    firstA.textContent = 'Profile';
    firstA.href = "";
    secondA.id = 'dropdownLogout';
    secondA.className = 'dropdown-item';
    secondA.textContent = 'Logout';
    secondA.href = "";

    dropdownMenu.appendChild(firstA);
    dropdownMenu.appendChild(secondA);

}

const showMainPage = e => {
    e.preventDefault();
    mainPageSection.style.display = 'block';
    profileDropSection.style.display = 'none';
    resetOptions();
}

const createAddBlog = () => {
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
    wholeContent.appendChild(container);
    container.appendChild(form);

    const submitNewBlog = document.querySelector('#submitNewBlog');
    submitNewBlog.addEventListener('submit', submitBlogPanel);
}

const createShowBlogs = () => {
    const container = document.createElement('div');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const tbody = document.createElement('tbody');
    container.id='editBlogContent';
    container.classList.add('table-responsive');
    table.classList.add('table', 'table-striped');
    tbody.id='editBlogTBody';

    ['', 'Id', 'Artist', 'Album', 'Description', 'Rating', ''].forEach(el => {
       const th = document.createElement('th');
       th.scope = 'col';
       th.appendChild(document.createTextNode(el));
       tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
    wholeContent.appendChild(container);

    //Read all from database
    showAllBlogsPanel();
}

// const editSingleBlog = () => {
//     console.log('Działa!');
// }

const createShowUsers = () => {
    const container = document.createElement('div');
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const tbody = document.createElement('tbody');
    container.id='editUserContent';
    container.classList.add('table-responsive');
    table.classList.add('table', 'table-striped');
    tbody.id='editUserTBody';

    ['', 'Id', 'User name', 'Email', 'First Name', 'Last name', 'Age'].forEach(el => {
        const th = document.createElement('th');
        th.scope = 'col';
        th.appendChild(document.createTextNode(el));
        tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
    wholeContent.appendChild(container);

    //Read all from database
    showAllUsersPanel();
}

const resetOptions = () => {
    const addBlogContent = document.querySelector('#addBlogContent');
    const editBlogContent = document.querySelector('#editBlogContent');
    const editUserContent = document.querySelector('#editUserContent');

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

togglePanelOptions = function(){
    resetOptions();
    if( this.id === 'addBlogButton'){
        createAddBlog();
    }
    else if ( this.id === 'editBlogButton'){
        createShowBlogs();
    }
    else if ( this.id === 'showAllUsersButton'){
        createShowUsers();
    }
}

//Function to add new blog to database
const submitBlogPanel = async e => {
    const inputArtist = document.querySelector('#inputArtist');
    const inputAlbum = document.querySelector('#inputAlbum');
    const inputDescription = document.querySelector('#inputDescription');
    const inputRating = document.querySelector('#inputRating');
    e.preventDefault();
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

    //Resets create element when submit blog
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

//Function to read all users from database
const showAllUsersPanel = async () => {
    const editUserTBody = document.querySelector('#editUserTBody');

    const response = await fetch('/users', {
        method: 'get',
    })

    const data = await response.json();
    data.forEach((el, index) => {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.scope = 'row';
        th.textContent = `${index + 1}.`;

        editUserTBody.appendChild(tr);
        tr.appendChild(th);

        for(let i = 0; i < 6; i++ ) {
            const td = document.createElement('td');
            switch(i) {
                case 0:
                    td.textContent = el._id;
                    break;
                case 1:
                    td.textContent = el.userName;
                    break;
                case 2:
                    td.textContent = el.email;
                    break;
                case 3:
                    td.textContent = el.firstName;
                    break;
                case 4:
                    td.textContent = el.lastName;
                    break;
                case 5:
                    td.textContent = el.age;
                    break;
            }
            tr.appendChild(td);
        }
    });
}

//Function to read all blogs from database
const showAllBlogsPanel = async () => {
    const editBlogTBody = document.querySelector('#editBlogTBody');

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

       for(let i = 0; i < 6; i++ ) {
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
                   td.innerHTML = `<button class="btn btn-info">Edit</button>`
           }
           tr.appendChild(td);
       }
    });

    //Function to handle edit buttons
    const editBlogButton = document.querySelectorAll('#editBlogTBody button');
    editBlogButton.forEach(btn => btn.addEventListener('click', editSingleBlog));
}

//NAD TYM PRACUJĘ OBECNIE
editSingleBlog = function() {
    const container = document.createElement('div');
    const popup = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = 0;
    container.style.left = 0;
    container.style.backgroundColor = `rgba(0,0,0,0.1)`;
    container.style.width = '100vw';
    container.style.height = '100vh';

    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = `translate(-50%, -50%)`;
    popup.style.backgroundColor = 'white';
    popup.style.width = '400px';
    popup.style.height = '600px';
    popup.style.border = `1px solid black`;
    popup.style.borderRadius = '5px';
    document.body.appendChild(container)
    document.body.appendChild(popup);
}

//Widok PANELU!!
const createUserDataPanel = userData => {
    const userPanel = document.querySelector('#userPanel');
    while(userPanel.firstChild){
        userPanel.removeChild(userPanel.firstChild);
    }
    if(userData.isAdmin === true) {
        const addblogButton = document.createElement('button');
        const showAllBlogsButton = document.createElement('button');
        const showAllUsersButton = document.createElement('button');

        addblogButton.textContent = 'Add blog';
        addblogButton.classList.add('btn', 'btn-info');
        addblogButton.id = "addBlogButton";

        showAllBlogsButton.textContent = 'Show blogs';
        showAllBlogsButton.classList.add('btn', 'btn-info');
        showAllBlogsButton.id = "editBlogButton";

        showAllUsersButton.textContent  = 'Show users';
        showAllUsersButton.classList.add('btn', 'btn-info');
        showAllUsersButton.id = "showAllUsersButton";

        userPanel.appendChild(addblogButton);
        userPanel.appendChild(showAllBlogsButton);
        userPanel.appendChild(showAllUsersButton);

        const togglePanelOptionsButtons = [...document.querySelectorAll('#userPanel button')];

        createAddBlog();

        //Zmiana widoku zakładek
        togglePanelOptionsButtons.forEach(button => button.addEventListener('click', togglePanelOptions));
    }
    else if (userData.isAdmin === false) {
        // wholeContent.forEach(content => content.classList.add('hide'));
    }

};

mainPageSectionButton.addEventListener('click', showMainPage);

const profileMenu = (e, userData) => {
    e.preventDefault();
    mainPageSection.style.display = 'none';
    profileDropSection.style.display = 'block';

    createUserDataProfile(userData);
    createUserDataPanel(userData);
};

const createUserDataProfile = userData => {
    const profileSectionUsernameP = document.querySelector('#userData p:nth-of-type(1)');
    const profileSectionEmailP = document.querySelector('#userData p:nth-of-type(2)');
    const profileSectionFirstnameP = document.querySelector('#userData p:nth-of-type(3)');
    const profileSectionLastnameP = document.querySelector('#userData p:nth-of-type(4)');
    const profileSectionAgeP = document.querySelector('#userData p:nth-of-type(5)');
    profileSectionUsernameP.textContent = userData.userName;
    profileSectionEmailP.textContent = userData.email;
    profileSectionFirstnameP.textContent = userData.firstName;
    profileSectionLastnameP.textContent = userData.lastName;
    profileSectionAgeP.textContent = userData.age;
}

const logoutProfile = async e => {
    e.preventDefault();
    await fetch('/users/logout', {
        method: 'post',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
    })
    document.location.reload();
}

const onHandleLoad = async () => {
    const request = await fetch('/users/me', {
        method: 'get',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
    })

    let data = await request.json();
    if(JSON.stringify(data) === JSON.stringify({error: "Please authenticate!"})){
        createDropdownUnauthorized();
    }
    else {
        createDropdown(data);
        const profileLinkDropdownMenu = document.querySelector('#dropdownProfile');
        const logoutLinkDropdownMenu = document.querySelector('#dropdownLogout');

        profileLinkDropdownMenu.addEventListener('click', e => profileMenu(e, data));
        logoutLinkDropdownMenu.addEventListener('click', logoutProfile);
    }
};

window.addEventListener('load', onHandleLoad);


