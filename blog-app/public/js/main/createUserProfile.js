class CreateUserProfile {
    constructor() {
        this.profileSectionUsernameP = document.querySelector('#userData p:nth-of-type(1)');
        this.profileSectionEmailP = document.querySelector('#userData p:nth-of-type(2)');
        this.profileSectionFirstnameP = document.querySelector('#userData p:nth-of-type(3)');
        this.profileSectionLastnameP = document.querySelector('#userData p:nth-of-type(4)');
        this.profileSectionAgeP = document.querySelector('#userData p:nth-of-type(5)');
    }
    createUserDataProfile(data){
        this.profileSectionUsernameP.textContent = data.userName;
        this.profileSectionEmailP.textContent = data.email;
        this.profileSectionFirstnameP.textContent = data.firstName;
        this.profileSectionLastnameP.textContent = data.lastName;
        this.profileSectionAgeP.textContent = data.age;
    }
}

const createUserProfile = new CreateUserProfile();