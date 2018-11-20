const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const app = require('../../../index');

describe('Authentication API', () => {
    let validUser;
    let invalidUser;
    beforeEach(() => {
        validUser = {
            email: 'jacare.souza@gmail.com',
            password: 'alligator'
        };

        invalidUser = {
            email: 'this_is_not_an_email',
            password: 'raphael@assun',
        };
    });

    describe('POST /api/v1/auth/login', () => {
        it('should return an access token and username if password and email matches', () => {
            return request(app)
                .post('/api/v1/auth/login')
                .send(validUser)
                .expect(httpStatus.OK)
                .then(({ body }) => {
                    expect(body).to.have.a.property('accessToken');
                    expect(body).to.have.a.property('email');
                });
        });

        it('should report error when email and password are not provided', () => {
            return request(app)
                .post('/api/v1/auth/login')
                .send({})
                .expect(httpStatus.BAD_REQUEST)
                .then((res) => {
                    const { field } = res.body.errors[0];
                    const { location } = res.body.errors[0];
                    const { messages } = res.body.errors[0];
                    expect(field[0]).to.be.equal('email');
                    expect(location).to.be.equal('body');
                    expect(messages[0]).to.include('"email"');
                });
        });

        it('should report error when the email provided is not valid', () => {
            invalidUser.email = 'this_is_not_an_email';
            return request(app)
                .post('/api/v1/auth/login')
                .send(invalidUser)
                .expect(httpStatus.BAD_REQUEST)
                .then((res) => {
                    const { field } = res.body.errors[0];
                    const { location } = res.body.errors[0];
                    const { messages } = res.body.errors[0];
                    expect(field[0]).to.be.equal('email');
                    expect(location).to.be.equal('body');
                    expect(messages[0]).to.include('"email" must be a valid email');
                });
        });
    });
});
