const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const app = require('../../../index');

describe('Basic Api tests', () => {
    describe('POST /api/v1/status', () => {
        it('checks api status', () => {
            return request(app)
                .get('/api/v1/status')
                .expect(httpStatus.OK)
                .then(({ body }) => {
                    expect(body.status).to.be.equal('OK');
                });
        });
    });

    it('will try to get a invalid route', () => {
        return request(app)
            .get('/api/v1/invalidRoute')
            .expect(httpStatus.NOT_FOUND).then(() => {

            });
    });
});