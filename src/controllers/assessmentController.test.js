const { getMockReq, getMockRes } = require('@jest-mock/express');
const { getAssessments, getAssessment, getAssessmentsByStudent } = require('./assessmentController');
const service = require('../services/assessmentService');
jest.mock('../services/assessmentService');

describe('Assessment controller', () => {
    describe('getAssessments', () => {
        const req = getMockReq();
        const { res, mockClear } = getMockRes();
        const assessments = [
            { id: 123 }, { id: 456 }
        ];
        const error = new Error('Something went wrong!');

        beforeEach(() => {
            mockClear();
        });

        it('should send status 200 when fetching data successfully', async () => {
            service.getAssessments.mockImplementationOnce(() => (assessments));
            await getAssessments(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('should send the data from the service', async () => {
            service.getAssessments.mockImplementationOnce(() => (assessments));
            await getAssessments(req, res);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res.send).toHaveBeenCalledWith({ status: 'OK', data: [
                    { id: 123 }, { id: 456 }
                ]
            });
        });

        it('should send status 500 upon error fetching data', async () => {
            service.getAssessments.mockImplementationOnce(() => { throw error });
            await getAssessments(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
        });

        it('should send the error message upon error fetching data', async () => {
            service.getAssessments.mockImplementationOnce(() => { throw error });
            await getAssessments(req, res);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', error: 'Something went wrong!' });
        });
    });

    describe('getAssessment', () => {
        const req = getMockReq({
            params: { assessmentId: 123 }
        });
        const { res, mockClear } = getMockRes();
        const assessment = { id: 123 };
        const error = new Error('Something went wrong!');

        beforeEach(() => {
            mockClear();
        });

        it('should send status 400 when the required params are missing', async () => {
            const reqWithoutParams = getMockReq();

            await getAssessment(reqWithoutParams, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', error: "Parameter ':assessmentId' cannot be empty" });
        });

        it('should send status 404 when the required assessment cannot be found', async () => {
            service.getAssessment.mockImplementationOnce(() => undefined);
            await getAssessment(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', error: 'Assessment not found' });
        });

        it('should send status 200 when fetching data successfully', async () => {
            service.getAssessment.mockImplementationOnce(() => (assessment));
            await getAssessment(req, res);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('should send the data from the service', async () => {
            service.getAssessment.mockImplementationOnce(() => (assessment));
            await getAssessment(req, res);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res.send).toHaveBeenCalledWith({ status: 'OK', data: { id: 123 } });
        });

        it('should send status 500 upon error fetching data', async () => {
            service.getAssessment.mockImplementationOnce(() => { throw error });
            await getAssessment(req, res);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
        });

        it('should send the error message upon error fetching data', async () => {
            service.getAssessment.mockImplementationOnce(() => { throw error });
            await getAssessment(req, res);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', error: 'Something went wrong!' });
        });
    });

    describe('getAssessmentsByStudent', () => {
        const req = getMockReq({
            params: { studentId: 'abc1' }
        });
        const { res, mockClear } = getMockRes();
        const assessments = [
            {
                id: 1,
                studentId: 'abc1'
            },
            {
                id: 2,
                studentId: 'abc1'
            }
        ];

        const error = new Error('Something went wrong!');

        beforeEach(() => {
            mockClear();
        });

        it('should send status 400 when the required params are missing', async () => {
            const reqWithoutParams = getMockReq();

            await getAssessmentsByStudent(reqWithoutParams, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', error: "Parameter ':studentId' cannot be empty" });
        });

        it('should send status 200 when fetching data successfully', async () => {
            service.getAssessmentsByStudent.mockImplementationOnce(() => (assessments));
            await getAssessmentsByStudent(req, res);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        it('should send the data from the service', async () => {
            service.getAssessmentsByStudent.mockImplementationOnce(() => (assessments));
            await getAssessmentsByStudent(req, res);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res.send).toHaveBeenCalledWith({ status: 'OK', data: assessments });
        });

        it('should send status 500 upon error fetching data', async () => {
            service.getAssessmentsByStudent.mockImplementationOnce(() => { throw error });
            await getAssessmentsByStudent(req, res);
            expect(res.status).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(500);
        });

        it('should send the error message upon error fetching data', async () => {
            service.getAssessmentsByStudent.mockImplementationOnce(() => { throw error });
            await getAssessmentsByStudent(req, res);
            expect(res.send).toHaveBeenCalledTimes(1);
            expect(res.send).toHaveBeenCalledWith({ status: 'FAILED', error: 'Something went wrong!' });
        });

        describe('when the request has query parameters a.k.a. "options"', () => {
            const reqWithQueryParams = getMockReq({
                params: { studentId: 'abc1' },
                query: {
                    sortByDate: 'completed',
                    lastRecordOnly: false,
                    fruit: 'banana',
                }
            });

            it('should send status 200 when fetching data successfully', async () => {
                service.getAssessmentsByStudent.mockImplementationOnce(() => (assessments));
                await getAssessmentsByStudent(reqWithQueryParams, res);
                expect(res.status).toHaveBeenCalledTimes(1);
                expect(res.status).toHaveBeenCalledWith(200);
            });

            it('should ignore non-whitelisted query params', async () => {
                service.getAssessmentsByStudent.mockImplementationOnce(() => (assessments));
                await getAssessmentsByStudent(reqWithQueryParams, res);
                expect(service.getAssessmentsByStudent).toHaveBeenCalledWith('abc1', {
                    sortByDate: 'completed',
                    lastRecordOnly: false
                });
            });
        });
    });
});