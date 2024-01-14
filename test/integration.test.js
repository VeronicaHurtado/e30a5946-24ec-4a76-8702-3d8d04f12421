const request = require('supertest');
const server = require('../src/server');
describe('Assessments Routes', () => {
    describe('GET /assessments', () => {
        it('should return all Assessments', () => {
            return request(server)
                .get('/assessments')
                .expect('Content-Type', /json/)
                .expect(200)
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.data[0].id).toBeDefined();
                    expect(res.body.data.length).toBeGreaterThan(0);
                })
        });
    });

    describe('GET /assessments/:assessmentId', () => {
        it('should return only the requested Assessment', () => {
            return request(server)
                .get('/assessments/assessment1')
                .expect('Content-Type', /json/)
                .expect(200)
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.data.id).toBe('assessment1');
                })
        });
    });

    describe('GET /assessments/student/:studentId', () => {
        it('should return only the requested Assessment', () => {
            return request(server)
                .get('/assessments/student/student1')
                .expect('Content-Type', /json/)
                .expect(200)
                .then((res) => {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.data[0].id).toBe('studentReponse1');
                })
        });
    });
});