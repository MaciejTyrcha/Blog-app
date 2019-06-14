const inputUsername = document.querySelector('#inputUsername');
const inputEmail = document.querySelector('#inputEmail');
const inputPassword = document.querySelector('#inputPassword');
const inputFirstName = document.querySelector('#inputFirstName');
const inputLastName = document.querySelector('#inputLastName');
const inputAge = document.querySelector('#inputAge');
const registerForm = document.querySelector('#registerForm');

const registerUser = async e => {
    e.preventDefault();
    const newUser = {
        userName: `${inputUsername.value}`,
        email: `${inputEmail.value}`,
        password: `${inputPassword.value}`,
        firstName: `${inputFirstName.value}`,
        lastName : `${inputLastName.value}`,
        age: `${inputAge.value}`,
    }
    const request = await fetch('/users', {
        method: "post",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(newUser),
    })

    let data = await request.json();
    console.log(data.status);
}

registerForm.addEventListener('submit', registerUser);