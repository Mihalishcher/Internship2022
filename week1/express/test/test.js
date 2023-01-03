/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../src/components/Users/model');
const server = require('../src/server/server');

const user = {
    firstName: 'Mihail',
    lastName: 'Shcherbakov',
    email: 'www1991@mail.com',
    password: '11111111',
};

const task = {
    title: 'Find info about migaration DB',
    description: 'Find information about migration MongoDB collections',
    estimatedTime: 6,
    createdBy: 'Project manager',
};
// eslint-disable-next-line no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe('Tasks component', () => {
    let id = '';
    let taskId = '';
    let token = '';

    before('Create user', (done) => {
        chai.request(server)
            .post('/v1/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    before('Get user token', (done) => {
        chai.request(server)
            .post('/v1/users/sign-in')
            .send({ email: user.email, password: user.password })
            .end((err, res) => {
                res.should.have.status(200);
                token = res.body.token;
                id = res.body.id;
                done();
            });
    });

    after('Delete created user after all tests', async () => {
        await User.findByIdAndDelete(id);
    });

    describe('\x1b[36mPOST /v1/task/', () => {
        it('\x1b[32mit should create 6 tasks', (done) => {
            for (let i = 0; i < 6; i += 1) {
                chai.request(server)
                    .post('/v1/task')
                    .set({ Authorization: `Bearer ${token}` })
                    .send(task)
                    // eslint-disable-next-line no-loop-func
                    .end((_error, res) => {
                        // eslint-disable-next-line no-underscore-dangle
                        taskId = res.body._id;
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('assignee').and.to.be.a('string');
                        res.body.should.have.property('title').and.to.be.a('string');
                        res.body.should.have.property('description').and.to.be.a('string');
                        res.body.should.have.property('createdBy').and.to.be.a('string');
                        res.body.should.have.property('estimatedTime').and.to.be.a('number');
                    });
            }
            done();
        });

        it('\x1b[32mit should throw Authorization error', (done) => {
            chai.request(server)
                .post('/v1/task')
                .set({ Authorization: 'Bearer ' })
                .send(task)
                .end((error, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
    });
    describe('\x1b[36mGET /v1/task/', () => {
        it('\x1b[32mit should get five tasks', (done) => {
            chai.request(server)
                .get('/v1/task?page=0')
                .set({ Authorization: `Bearer ${token}` })
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('tasks').and.to.be.a('array').to.have.lengthOf(5);
                    res.body.should.have.property('totalTasks').and.to.be.a('number');
                    done();
                });
        });

        it('\x1b[32mit should throw Authorization error', (done) => {
            chai.request(server)
                .get('/v1/task?page=0')
                .set({ Authorization: 'Bearer ' })
                .end((error, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
    });

    describe('\x1b[36mGET /v1/task/all', () => {
        it('\x1b[32mit should get all tasks of user', (done) => {
            chai.request(server)
                .get('/v1/task/all')
                .set({ Authorization: `Bearer ${token}` })
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('tasks').and.to.be.a('array').to.have.lengthOf(6);
                    res.body[0].should.have.property('name').and.to.be.a('string');
                    res.body[0].should.have.property('totalTasks').and.to.be.a('number').to.equal(6);
                    res.body[0].should.have.property('totalEstimation').and.to.be.a('number').to.equal(36);
                    done();
                });
        });

        it('\x1b[32mit should throw Authorization error', (done) => {
            chai.request(server)
                .get('/v1/task/all')
                .set({ Authorization: 'Bearer ' })
                .end((error, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
    });
    describe('\x1b[36mDELETE /v1/task/:id', () => {
        it('\x1b[32mit should delete 1 task', (done) => {
            console.log(taskId);
            chai.request(server)
                .delete(`/v1/task/${taskId}`)
                .set({ Authorization: `Bearer ${token}` })
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('assignee').and.to.be.a('string');
                    res.body.should.have.property('title').and.to.be.a('string');
                    res.body.should.have.property('description').and.to.be.a('string');
                    res.body.should.have.property('estimatedTime').and.to.be.a('number').to.equal(6);
                    res.body.should.have.property('createdBy').and.to.be.a('string');
                    done();
                });
        });

        it('\x1b[32mit should throw Authorization error', (done) => {
            chai.request(server)
                .delete(`/v1/task/${taskId}`)
                .set({ Authorization: 'Bearer ' })
                .end((error, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
    });
    describe('\x1b[36mDELETE /v1/task/', () => {
        it('\x1b[32mit should delete all tasks (5)', (done) => {
            console.log(taskId);
            chai.request(server)
                .delete('/v1/task/')
                .set({ Authorization: `Bearer ${token}` })
                .end((error, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('deletedCount').and.to.be.a('number').to.equal(5);
                    done();
                });
        });

        it('\x1b[32mit should throw Authorization error', (done) => {
            chai.request(server)
                .delete('/v1/task/')
                .set({ Authorization: 'Bearer ' })
                .end((error, res) => {
                    res.should.have.status(403);
                    done();
                });
        });
    });
});
