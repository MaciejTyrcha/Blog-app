const request = require('supertest');

const app = require('../src/app');
const User = require('../src/models/user_model');
const {adminUser, adminUserId, userTwo, userTwoId ,userThree, userThreeId, setupDatabase} = require('./fixtures/db');

beforeEach(setupDatabase);

//Register
test('Should signup a new user with hashed password', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            userName: 'Andrew',
            email: 'randomMail@o2.pl',
            password: 'haslo1234',
            firstName: 'Maciej',
            lastName: 'Tyrcha',
            age: 50,
            isAdmin: false,
        })
        .expect(201);

    //Check if user is in database
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //check for response
    // expect(response.body).toMatchObject({
    //     user: {
    //         isAdmin: false,
    //         userName: 'Andrew',
    //         email: 'randomMail@o2.pl',
    //         firstName: 'Maciej',
    //         lastName: 'Tyrcha',
    //         age: 50,
    //     },
    //     token: user.tokens[0].token,
    // })

    //check if plain text is not stored into database
    expect(user.password).not.toBe('haslo1234');
});
test('Should not signup user with the same userName', async () => {
   await request(app)
       .post('/users')
       .send({
            userName: userTwo.userName,
            email: 'randomMail@o2.pl',
            password: 'haslo1234',
            firstName: 'Maciej',
            lastName: 'Tyrcha',
            age: 50,
            isAdmin: false,
        })
       .expect(400);
});
test('Should not signup user with the same email', async () => {
    await request(app)
        .post('/users')
        .send({
            userName: "some username",
            email: userTwo.email,
            password: 'haslo1234',
            firstName: 'Maciej',
            lastName: 'Tyrcha',
            age: 50,
            isAdmin: false,
        })
        .expect(400);
});

//Validation
test('Should not signup user without userName', async () => {
    await request(app)
        .post('/users')
        .send({
            email: "some2@gmail.com",
            password: 'haslo1234',
            firstName: 'Maciej',
            lastName: 'Tyrcha',
            age: 50,
            isAdmin: false,
        })
        .expect(400);
});
test('Should not signup user without email', async () =>{
    await request(app)
        .post('/users')
        .send({
            userName: "some username",
            password: 'haslo1234',
            firstName: 'Maciej',
            lastName: 'Tyrcha',
            age: 50,
            isAdmin: false,
        })
        .expect(400);
});
test('Should not signup user without password', async () => {
    await request(app)
        .post('/users')
        .send({
            userName: "some username",
            email: "some@o2.pl",
            firstName: 'Maciej',
            lastName: 'Tyrcha',
            age: 50,
            isAdmin: false,
        })
        .expect(400);
});
test('Should not signup user with userName length smaller than 3', async () => {
    await request(app)
        .post('/users')
        .send({
            userName: "s",
            email: "some@o2.pl",
            password: 'haslo1234',
            firstName: 'Maciej',
            lastName: 'Tyrcha',
            age: 50,
            isAdmin: false,
        })
        .expect(400);
});
test('Should not signup user with userName length higher than 20', async () => {
    await request(app)
        .post('/users')
        .send({
            userName: "012345678901234567890",
            email: "some@o2.pl",
            password: 'haslo1234',
            firstName: 'Maciej',
            lastName: 'Tyrcha',
            age: 50,
            isAdmin: false,
        })
        .expect(400);
});
test('Should not signup user with invalid email', async () => {
    await request(app)
        .post('/users')
        .send({
            userName: "ssss",
            email: "someo2.pl",
            password: 'haslo1234',
            firstName: 'Maciej',
            lastName: 'Tyrcha',
            age: 50,
            isAdmin: false,
        })
        .expect(400);
});
test('Should not signup user with password length smaller than 6', async () => {
    await request(app)
        .post('/users')
        .send({
            userName: "ssss",
            email: "some@o2.pl",
            password: '01234',
            firstName: 'Maciej',
            lastName: 'Tyrcha',
            age: 50,
            isAdmin: false,
        })
        .expect(400);
});
test('Should not signup user with password length higher than 255', async () => {
    let password = "";
    for(let i = 0 ; i <= 255 ; i++){
        password += "a";
    }
    await request(app)
        .post('/users')
        .send({
            userName: "ssss",
            email: "some@o2.pl",
            password,
            firstName: 'Maciej',
            lastName: 'Tyrcha',
            age: 50,
            isAdmin: false,
        })
        .expect(400);
});
test('Should not signup user with firstName length smaller than 2', async () => {
    await request(app)
        .post('/users')
        .send({
            userName: "qwdqw",
            email: 'randomMail@o2.pl',
            password: 'haslo1234',
            firstName: 'a',
            lastName: 'Tyrcha',
            age: 50,
            isAdmin: false,
        })
        .expect(400);
});
test('Should not signup user with firstName length higher than 50', async () => {
    let firstName = "";
    for( let i = 0 ; i <= 50; i++){
        firstName += "a";
    }
    await request(app)
        .post('/users')
        .send({
            userName: "qwdqw",
            email: 'randomMail@o2.pl',
            password: 'haslo1234',
            firstName,
            lastName: 'Tyrcha',
            age: 50,
            isAdmin: false,
        })
        .expect(400);
});
test('Should not signup user with lastName length smaller than 2', async () => {
    await request(app)
        .post('/users')
        .send({
            userName: "qwdqw",
            email: 'randomMail@o2.pl',
            password: 'haslo1234',
            firstName: "jacek",
            lastName: 'a',
            age: 50,
            isAdmin: false,
        })
        .expect(400);
});
test('Should not signup user with lastName length higher than 50', async () => {
    let lastName = "";
    for( let i = 0 ; i <= 50; i++){
        lastName += "a";
    }
    await request(app)
        .post('/users')
        .send({
            userName: "qwdqw",
            email: 'randomMail@o2.pl',
            password: 'haslo1234',
            firstName: "Jacek",
            lastName,
            age: 50,
            isAdmin: false,
        })
        .expect(400);
});
test('Should not signup user with negative age', async () => {
    await request(app)
        .post('/users')
        .send({
            userName: "qwdqw",
            email: 'randomMail@o2.pl',
            password: 'haslo1234',
            firstName: "Jacek",
            lastName: "Jarek",
            age: -1,
            isAdmin: false,
        })
        .expect(400);
});
test('Should not signup user with string as age', async () => {
    await request(app)
        .post('/users')
        .send({
            userName: "qwdqw",
            email: 'randomMail@o2.pl',
            password: 'haslo1234',
            firstName: "Jacek",
            lastName: "Jarek",
            age: "a",
            isAdmin: false,
        })
        .expect(400);
});
test('Should not signup user with isAdmin param not boolean', async () => {
    await request(app)
        .post('/users')
        .send({
            userName: "qwdqw",
            email: 'randomMail@o2.pl',
            password: 'haslo1234',
            firstName: "Jacek",
            lastName: "Jarek",
            age: 50,
            isAdmin: "a",
        })
        .expect(400);
});

//Login
test('Should login existing user', async () => {
   const response = await request(app)
       .post('/users/login').send({
            userName: userTwo.userName,
            password: userTwo.password,
   }).expect(200);

   const user = await User.findById(response.body.user._id);
   expect(response.body.token).toBe(user.tokens[1].token);
});
test('Should login admin', async () => {
   const response = await request(app)
       .post('/users/login').send({
            userName: adminUser.userName,
            password: adminUser.password,
   }).expect(200);

    const user = await User.findById(response.body.user._id);
    expect(response.body.token).toBe(user.tokens[1].token);
});
test('Should not login user with wrong userName', async () => {
   await request(app)
       .post('/users/login')
       .send({
           userName: "user which doesnt exist",
           password: userTwo.password,
       }).expect(400);
});
test('Should not login user with wrong password', async () => {
   await request(app)
       .post('/users/login')
       .send({
           userName: userTwo.userName,
           password: !userTwo.password,
       }).expect(400)
});
test('Should not login non-existing user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            userName: "user which doesnt exist",
            password: "some random password",
        }).expect(400);
});

//Delete
test('Should delete account for user', async() => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userTwoId);
    expect(user).toBeNull();
})
test('Should not delete account for non-existing user', async () => {
   await request(app)
       .delete('/users/me')
       .send()
       .expect(401);
});
test('Should admin delete others by ID ', async () => {
   await request(app)
       .delete(`/users/${userTwoId}`)
       .set("Authorization", `Bearer ${adminUser.tokens[0].token}`)
       .send()
       .expect(200);

   const user = await User.findById(userTwoId);
   expect(user).toBeNull();
});
test('Should not user delete others by ID', async () => {
   const response = await request(app)
       .delete(`/users/${userTwoId}`)
       .set("Authorization", `Bearer ${userThree.tokens[0].token}`)
       .send()
       .expect(401)

    expect(response.body).toMatchObject({
        e: 'You dont have permission!',
    });
});
test('Should not user delete himself by ID', async () => {
   const response = await request(app)
       .delete(`/users/${userTwoId}`)
       .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
       .send()
       .expect(401)

    expect(response.body).toMatchObject({
        e: 'You dont have permission!',
    });
});

//Get all
test('Should admin get all users', async () => {
    await request(app)
        .get('/users')
        .set("Authorization", `Bearer ${adminUser.tokens[0].token}`)
        .send()
        .expect(200)
});
test('Should not user get all users', async () => {
   const response = await request(app)
       .get('/users')
       .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
       .send()
       .expect(401)

    expect(response.body).toMatchObject({
        e: 'You dont have permission!',
    });
});
test('Should not get all users for non-existing user', async () => {
    const response = await request(app)
        .get('/users')
        .send()
        .expect(401)

    expect(response.body).toMatchObject({
        e: 'You dont have permission!',
    });
});

//Get single
test('Should user get himself', async () => {
    await request(app)
        .get('/users/me')
        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(200)
});
test('Should admin get user by ID', async () => {
   const response = await request(app)
       .get(`/users/${userTwoId}`)
       .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
       .send()
       .expect(200)

    expect(response.body).not.toBeNull();
});
test('Should not get user ID by other user', async() => {
   const response = await request(app)
       .get(`/users/${userTwoId}`)
       .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
       .send()
       .expect(401)

    expect(response.body).toMatchObject({
        e: 'You dont have permission!',
    });
});
test('Should not get user ID for non-existing user', async () => {
    const response = await request(app)
        .get(`/users/someID`)
        .set("Authorization", `Bearer ${adminUser.tokens[0].token}`)
        .send()
        .expect(500)

    expect(response.body).toMatchObject({
        e: 'User doesnt exist!',
    });
});

//Patch
test('Should update account for user with valid fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
        .send({
            email: 'DUPA@gmail.com',
            password: 'dupa123456',
            firstName: 'Zibi',
            lastName: 'Loko',
            age: 30,
        })
        .expect(200)
    const user = await User.findById(userThreeId);
    expect(user.email).toEqual('dupa@gmail.com');
    expect(user.firstName).toEqual('Zibi');
    expect(user.lastName).toEqual('Loko');
    expect(user.age).toEqual(30);
});
test('Should not update account for user with userName field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
        .send({
            userName: "Zbyszek",
        })
        .expect(400)
});
test('Should not update account for user with isAdmin field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userThree.tokens[0].token}`)
        .send({
            isAdmin: true,
        })
        .expect(400)
});
test('Should admin update others by ID with valid fields', async () => {
    await request(app)
        .patch(`/users/${userTwoId}`)
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send({
            email: 'DUPA@gmail.com',
            password: 'dupa123456',
            firstName: 'Zibi',
            lastName: 'Loko',
            age: 30,
        })
        .expect(200)
    const user = await User.findById(userTwoId);
    expect(user.email).toEqual('dupa@gmail.com');
    expect(user.firstName).toEqual('Zibi');
    expect(user.lastName).toEqual('Loko');
    expect(user.age).toEqual(30);
});
test('Should admin update others by ID with userName field', async () => {
    await request(app)
        .patch(`/users/${userTwoId}`)
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send({
            userName: "Zbyszek",
        })
        .expect(400)
});
test('Should admin update others by ID with isAdmin field', async () => {
    await request(app)
        .patch(`/users/${userTwoId}`)
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send({
            isAdmin: true,
        })
        .expect(400)
});