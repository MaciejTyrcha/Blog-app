const request = require('supertest');

const app = require('../src/app');
const Blog = require('../src/models/blog_model');
const {adminUser, adminUserId, userTwo, userTwoId ,userThree, userThreeId, setupDatabase, blogOne, blogOneId} = require('./fixtures/db');

beforeEach(setupDatabase);

//Register
test('Should not create new blog to non-existing', async () => {
    const response = await request(app)
                        .post('/blogs')
                        .send({
                            artist: "Soad",
                            album: "Mesmerize",
                            description: "User blog",
                            rating: 5,
                        })
                        .expect(401)
    const blog = await Blog.findById(response.body._id);
    expect(blog).toBeNull();
});
test('Should not create new blog to logged user', async () => {
    const response = await request(app)
                    .post('/blogs')
                    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
                    .send({
                        artist: "Soad",
                        album: "Mesmerize",
                        description: "User blog",
                        rating: 5,
                    })
                    .expect(401)
    const blog = await Blog.findById(response.body._id);
    expect(blog).toBeNull();
});
test('Should create new blog to admin', async () => {
    const response = await request(app)
                    .post('/blogs')
                    .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
                    .send({
                        artist: "Soad",
                        album: "Mesmerize",
                        description: "User blog",
                        rating: 5,
                    })
                    .expect(201)
});

//Validation 
test('Should not create new blog without artist', async () => {
    await request(app)
        .post('/blogs')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send({
            album: "Mesmerize",
            description: "User blog",
            rating: 5,
        })
        .expect(400)
});
test('Should not create new blog without album', async () => {
    await request(app)
        .post('/blogs')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send({
            artist: "Soad",
            description: "User blog",
            rating: 5,
        })
        .expect(400)
});
test('Should not create new blog without description', async () => {
    await request(app)
        .post('/blogs')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send({
            artist: "Soad",
            album: "Mesmerize",
            rating: 5,
        })
        .expect(400)
});
test('Should not create new blog without rating', async () => {
    await request(app)
        .post('/blogs')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send({
            artist: "Soad",
            album: "Mesmerize",
            description: "User blog",
        })
        .expect(400)
});
test('Should not create new blog with artist length smaller than 1', async () => {
    await request(app)
        .post('/blogs')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send({
            artist: "",
            album: "Mesmerize",
            description: "User blog",
            rating: 5,
        })
        .expect(400)
});
test('Should not create new blog with artist length higher than 50', async () => {
    let artist = "";
    for(let i = 0; i <= 50; i++ ){
        artist += "a";
    }
    await request(app)
        .post('/blogs')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send({
            artist,
            album: "Mesmerize",
            description: "User blog",
            rating: 5,
        })
        .expect(400)
});
test('Should not create new blog with album length smaller than 1', async () => {
    await request(app)
        .post('/blogs')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send({
            artist: "Soad",
            album: "",
            description: "User blog",
            rating: 5,
        })
        .expect(400)
});
test('Should not create new blog with album length higher than 50', async () => {
    let album = "";
    for(let i = 0; i <= 50; i++) {
        album += "a";
    }
    await request(app)
        .post('/blogs')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send({
            artist: "Soad",
            album,
            description: "User blog",
            rating: 5,
        })
        .expect(400)
});
test('Should not create new blog with rating smaller than 0', async () => {
    await request(app)
        .post('/blogs')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send({
            artist: "Soad",
            album: "Mesmerize",
            description: "User blog",
            rating: -1,
        })
        .expect(400)
});
test('Should not create new blog with rating higher than 10', async () => {
    await request(app)
        .post('/blogs')
        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
        .send({
            artist: "Soad",
            album: "Mesmerize",
            description: "User blog",
            rating: 11,
        })
        .expect(400)
});


//Delete
test('Should not non-existing delete blog by ID', async () => {
    const response = await request(app)
                        .delete(`/blogs/${blogOneId}`)
                        .send()
                        .expect(401)
    expect(response.body).toMatchObject({
        e: 'You dont have permission!',
    });
});
test('Should not user delete blog by ID', async () => {
    const response = await request(app)
                        .delete(`/blogs/${blogOneId}`)
                        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
                        .send()
                        .expect(401)
    expect(response.body).toMatchObject({
        e: 'You dont have permission!',
    });
});
test('Should admin delete blog by ID', async () => {
    const response = await request(app)
                        .delete(`/blogs/${blogOneId}`)
                        .set('Authorization', `Bearer ${adminUser.tokens[0].token}`)
                        .send()
                        .expect(200)
    const blog = await Blog.findById(response.body._id);
    expect(blog).toBeNull();
});

//Get all
test('Should non-existing user get all blogs', async () => {
    await request(app)
        .get('/blogs')
        .send()
        .expect(200)
});
test('Should user get all blogs', async () => {
    await request(app)
        .get('/blogs')
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(200)
});
test('Should admin get all blogs', async () => {
    await request(app)
        .get('/blogs')
        .set("Authorization", `Bearer ${adminUser.tokens[0].token}`)
        .send()
        .expect(200)
});

//Get single
test('Should not non-existing user get blog by ID', async () => {
    await request(app)
        .get(`/blogs/${blogOneId}`)
        .send()
        .expect(401)
});
test('Should not user get blog by ID', async () => {
    const response = await request(app)
                        .get(`/blogs/${blogOneId}`)
                        .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
                        .send()
                        .expect(401)
    expect(response.body).toMatchObject({
        e: 'You dont have permission!',
    });
});
test('Should admin get blog by ID', async () => {
    const response = await request(app)
                        .get(`/blogs/${blogOneId}`)
                        .set("Authorization", `Bearer ${adminUser.tokens[0].token}`)
                        .send()
                        .expect(200)
    const blog = await Blog.findById(response.body._id);
    expect(blog).not.toBeNull();
});

//Patch single 
test('Should not non-existing user update blog by ID', async () => {
    const response = await request(app)
                        .patch(`/blogs/${blogOneId}`)
                        .send({
                            artist: "Soad",
                            album: "Mesmerize",
                            description: "First blog",
                            rating: 5,
                        })
                        .expect(401)
    expect(response.body).toMatchObject({
        e: 'You dont have permission!',
    });
});
test('Should not user update blog by ID', async () => {
    const response = await request(app)
                        .patch(`/blogs/${blogOneId}`)
                        .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
                        .send({
                            artist: "Soad",
                            album: "Mesmerize",
                            description: "First blog",
                            rating: 5,
                        })
                        .expect(401)
    expect(response.body).toMatchObject({
        e: 'You dont have permission!',
    });
});
test('Should admin update blog by ID with valid fields', async () => {
    const response = await request(app)
                        .patch(`/blogs/${blogOneId}`)
                        .set("Authorization", `Bearer ${adminUser.tokens[0].token}`)
                        .send({
                            artist: "Soad",
                            album: "Mesmerize",
                            description: "First blog",
                            rating: 5,
                            })
                        .expect(200)
    const blog = await Blog.findById(response.body._id);
    expect(blog.artist).toEqual("Soad");
    expect(blog.album).toEqual('Mesmerize');
    expect(blog.description).toEqual('First blog');
    expect(blog.rating).toEqual(5);
});
test('Should admin update blog by ID with non-existing field', async () => {
    await request(app)
        .patch(`/blogs/${blogOneId}`)
        .set("Authorization", `Bearer ${adminUser.tokens[0].token}`)
        .send({
            bobobo: "",
        })
        .expect(400)
});
