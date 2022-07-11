const service = require('../../src/services/reportService');
const Report = require('../../src/models/Report');

jest.mock('../../src/models/Report', () => {
    return {
        create: jest.fn().mockImplementation(() => { }),
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn()
    };
});

describe('report service', () => {
    it('should get all reports', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                _ownerId: '1',
                _dataId: '1',
                active: true,
                _createdOn: new Date(),
                reportMessage: 'Report message'
            }])
        Report.find = mockFind;
        const result = await service.getAll();

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ active: true }));
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: '1',
                    _ownerId: '1',
                    _dataId: '1',
                    active: true,
                    _createdOn: expect.any(Date),
                    reportMessage: 'Report message'
                })
            ])
        );
    });
    it('should get report by id', async () => {
        const mockFindById = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
                _ownerId: '1',
                _dataId: '1',
                active: true,
                _createdOn: new Date(),
                reportMessage: 'Report message'
            })
        Report.findById = mockFindById;
        const result = await service.getById('1');

        expect(mockFindById).toHaveBeenCalledTimes(1)
        expect(mockFindById).toHaveBeenCalledWith('1');
        expect(result).toEqual(
            expect.objectContaining({
                _id: '1',
                _ownerId: '1',
                _dataId: '1',
                active: true,
                _createdOn: expect.any(Date),
                reportMessage: 'Report message'
            })
        );
    });
    it('should create report', async () => {
        const mockCreate = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
                _ownerId: '1',
                _dataId: '1',
                active: true,
                _createdOn: new Date(),
                reportMessage: 'Report message'
            })
        Report.create = mockCreate;
        const mockReportData = {
            _ownerId: '1',
            _dataId: '1',
            reportMessage: 'Report message',
            active: true,
            _createdOn: new Date()
        }
        const result = await service.create(mockReportData);

        expect(mockCreate).toHaveBeenCalledTimes(1)
        expect(mockCreate).toHaveBeenCalledWith(
            expect.objectContaining({
                _ownerId: '1',
                _dataId: '1',
                active: true,
                _createdOn: expect.any(Date),
                reportMessage: 'Report message'
            })
        );
        expect(result).toEqual(
            expect.objectContaining({
                _id: '1',
                _ownerId: '1',
                _dataId: '1',
                active: true,
                _createdOn: expect.any(Date),
                reportMessage: 'Report message'
            })
        );
    });
    it('should update report', async () => {
        const mockFindByIdAndUpdate = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
                _ownerId: '1',
                _dataId: '1',
                active: true,
                _createdOn: new Date(),
                reportMessage: 'Report message'
            })
        Report.findByIdAndUpdate = mockFindByIdAndUpdate;
        const mockReportData = {
            _ownerId: '1',
            _dataId: '1',
            reportMessage: 'Report message',
            active: true,
            _createdOn: new Date()
        }
        const result = await service.update('1', mockReportData);

        expect(mockFindByIdAndUpdate).toHaveBeenCalledTimes(1)
        expect(mockFindByIdAndUpdate).toHaveBeenCalledWith('1',
            expect.objectContaining({
                _ownerId: '1',
                _dataId: '1',
                active: true,
                _createdOn: expect.any(Date),
                reportMessage: 'Report message'
            })
        );
        expect(result).toEqual(
            expect.objectContaining({
                _id: '1',
                _ownerId: '1',
                _dataId: '1',
                active: true,
                _createdOn: expect.any(Date),
                reportMessage: 'Report message'
            })
        );
    });
});