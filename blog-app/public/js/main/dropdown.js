class Dropdown {
    constructor(){
        this.dropdownOptions = document.querySelector('#dropdownOptions');
        this.dropdownMenu = document.querySelector('#headerMenu .dropdown-menu');
    }

    createDropdownUnauthorized() {
        this.dropdownOptions.textContent = 'Account';
        while(this.dropdownMenu.firstChild){
            this.dropdownMenu.removeChild(this.dropdownMenu.firstChild);
        }
        const firstA =  document.createElement('a');
        firstA.id = 'dropdownRegister';
        firstA.className = 'dropdown-item';
        firstA.textContent = 'Register';
        firstA.href = "/register";
        this.dropdownMenu.appendChild(firstA);
    }

    createDropdown(data) {
        this.dropdownOptions.textContent = data.firstName;
        while(this.dropdownMenu.firstChild){
            this.dropdownMenu.removeChild(this.dropdownMenu.firstChild);
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

        this.dropdownMenu.appendChild(firstA);
        this.dropdownMenu.appendChild(secondA);
    }

    async onHandleLoad () {
        const request = await fetch('/users/me', {
            method: 'get',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
        })

        let data = await request.json();
        if(JSON.stringify(data) === JSON.stringify({error: "Please authenticate!"})){
            dropdown.createDropdownUnauthorized();
        }
        else {
            dropdown.createDropdown(data);
            const profileLinkDropdownMenu = document.querySelector('#dropdownProfile');
            const logoutLinkDropdownMenu = document.querySelector('#dropdownLogout');

            profileLinkDropdownMenu.addEventListener('click', e => profileMenu.showProfileMenu(e, data));
            logoutLinkDropdownMenu.addEventListener('click', e => logout.logoutProfile(e));
        }
    }
}

const dropdown = new Dropdown();

window.addEventListener('load', dropdown.onHandleLoad);

