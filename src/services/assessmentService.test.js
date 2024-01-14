const { getAssessments, getAssessment, getAssessmentsByStudent } = require('./assessmentService');
const dataUtils = require('../utils/data.util');
jest.mock('../utils/data.util');

describe('Assessment Service', () => {
    const error = new Error('Error fetching data.');
    const assessments = [
        {
            'id': 'abc1',
            'assessmentId': 'assessment1',
            'completed': '16/12/2019 10:46:00',
            'student': {
                'id': 'student1',
                'yearLevel': 3
            },
        },
        {
            'id': 'abc2',
            'assessmentId': 'assessment1',
            'completed': '16/12/2021 10:00:00',
            'student': {
                'id': 'student2',
                'yearLevel': 5
            },
        },
        {
            'id': 'abc3',
            'assessmentId': 'assessment2',
            'completed': '16/12/2020 11:00:00',
            'student': {
                'id': 'student1',
                'yearLevel': 3
            },
        },
        {
            'id': 'abc4',
            'assessmentId': 'not-completed-assessment',
            'student': {
                'id': 'student1',
                'yearLevel': 3
            },
        },
    ];

    describe('getAssessments', () => {
        it('should forward data read by dataUtils.readFile', async () => {
            dataUtils.readFile.mockImplementationOnce(() => (assessments));
            const response = await getAssessments();
            expect(response).toEqual(assessments);
        });

        it('should throw upon error reading the json file', async () => {
            dataUtils.readFile.mockImplementationOnce(() => { throw error });
            await expect(async () => {
                await getAssessments();
            }).rejects.toThrow();
        });
    });

    describe('getAssessment', () => {
        it('should return undefined when assessmentId param is not passed', async () => {
            const response = await getAssessment();
            expect(response).toBeUndefined();
        });

        it('should filter data read by dataUtils.readFile and return one Assessment', async () => {
            dataUtils.readFile.mockImplementationOnce(() => (assessments));
            const response = await getAssessment('abc3');
            expect(response).toEqual({
                'id': 'abc3',
                'assessmentId': 'assessment2',
                'completed': '16/12/2020 11:00:00',
                'student': {
                    'id': 'student1',
                    'yearLevel': 3
                },
            });
        });

        it('should throw upon error reading the json file', async () => {
            dataUtils.readFile.mockImplementationOnce(() => { throw error });
            await expect(async () => {
                await getAssessment('abc3');
            }).rejects.toThrow();
        });
    });

    describe('getAssessmentsByStudent', () => {

        it('should return undefined when studentId param is not passed', async () => {
            const response = await getAssessmentsByStudent();
            expect(response).toBeUndefined();
        });

        it('should filter data from dataUtils.readFile by given studentId', async () => {
            dataUtils.readFile.mockImplementationOnce(() => (assessments));
            const response = await getAssessmentsByStudent('student2');
            expect(response).toEqual([{
                'id': 'abc2',
                'assessmentId': 'assessment1',
                'completed': '16/12/2021 10:00:00',
                'student': {
                    'id': 'student2',
                    'yearLevel': 5
                },
            }]);
        });

        it('should filter data by given studentId and return only completed assessments', async () => {
            dataUtils.readFile.mockImplementationOnce(() => (assessments));
            const response = await getAssessmentsByStudent('student1');
            expect(response).toEqual([
                {
                    'id': 'abc1',
                    'assessmentId': 'assessment1',
                    'completed': '16/12/2019 10:46:00',
                    'student': {
                        'id': 'student1',
                        'yearLevel': 3
                    },
                },
                {
                    'id': 'abc3',
                    'assessmentId': 'assessment2',
                    'completed': '16/12/2020 11:00:00',
                    'student': {
                        'id': 'student1',
                        'yearLevel': 3
                    },
                }
            ]);
        });

        it('should throw upon error reading the json file', async () => {
            dataUtils.readFile.mockImplementationOnce(() => { throw error });
            await expect(async () => {
                await getAssessmentsByStudent('student2');
            }).rejects.toThrow();
        });

        describe('when options are passed', () => {
            const sortedAssessments = [
                {
                    'id': 'abc1',
                    'assessmentId': 'assessment1',
                    'completed': '16/12/2019 10:46:00',
                    'student': {
                        'id': 'student1',
                        'yearLevel': 3
                    },
                },
                {
                    'id': 'abc3',
                    'assessmentId': 'assessment2',
                    'completed': '16/12/2020 11:00:00',
                    'student': {
                        'id': 'student1',
                        'yearLevel': 3
                    },
                }
            ];

            it('should filter data by studentId and given options (sortByDate)', async () => {
                dataUtils.readFile.mockImplementationOnce(() => (assessments));
                dataUtils.sortArrayByObjectDateProperty.mockImplementationOnce(() => (sortedAssessments));
                const response = await getAssessmentsByStudent('student1', { sortByDate: 'completed' });
                expect(response).toEqual([
                    {
                        'id': 'abc1',
                        'assessmentId': 'assessment1',
                        'completed': '16/12/2019 10:46:00',
                        'student': {
                            'id': 'student1',
                            'yearLevel': 3
                        },
                    },
                    {
                        'id': 'abc3',
                        'assessmentId': 'assessment2',
                        'completed': '16/12/2020 11:00:00',
                        'student': {
                            'id': 'student1',
                            'yearLevel': 3
                        },
                    }
                ]);
            });

            it('should filter data by studentId and given options (lastRecordOnly)', async () => {
                dataUtils.readFile.mockImplementationOnce(() => (assessments));
                const response = await getAssessmentsByStudent('student1', { lastRecordOnly: 'true' });
                expect(response).toEqual(
                    {
                        'id': 'abc3',
                        'assessmentId': 'assessment2',
                        'completed': '16/12/2020 11:00:00',
                        'student': {
                            'id': 'student1',
                            'yearLevel': 3
                        },
                    }
                );
            });
        });
    });
});