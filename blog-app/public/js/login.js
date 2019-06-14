const inputUsername = document.querySelector('#inputUsername');
const inputPassword = document.querySelector('#inputPassword');
const loginForm = document.querySelector('#loginForm');

const loginUser = async e => {
    e.preventDefault();
    const user = {
        userName: `${inputUsername.value}`,
        password: `${inputPassword.value}`,
    };

    console.log('Przed fetchem');

    const request = await fetch('/users/login', {
        method: "post",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(user),
    })

    let data = await request.json();
    console.log(data);
    if(data._id){
        window.location = '/';
    }
}
loginForm.addEventListener('submit', loginUser);