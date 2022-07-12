const service = require('../../src/services/documentService');
const Copyright = require('../../src/models/CopyrightDocument');

jest.mock('../../src/models/CopyrightDocument', () => {
    return {
        create: jest.fn().mockImplementation(() => { }),
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndDelete: jest.fn()
    };
});

describe('document service', () => {
    it('should get all copyrights', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                _userId: '1',
                dataId: '1',
                dataType: 'heroes',
                _createdOn: new Date()
            }])
        Copyright.find = mockFind;
        const result = await service.getAllCopyrights();

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: '1',
                    _userId: '1',
                    dataId: '1',
                    dataType: 'heroes',
                    _createdOn: expect.any(Date)
                })
            ])
        );
    });
    it('should get own copyrights', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                _userId: '1',
                dataId: '1',
                dataType: 'heroes',
                _createdOn: new Date()
            }])
        Copyright.find = mockFind;
        const result = await service.getOwnCopyrights('1');

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(mockFind).toHaveBeenCalledWith({ _userId: '1' })
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: '1',
                    _userId: '1',
                    dataId: '1',
                    dataType: 'heroes',
                    _createdOn: expect.any(Date)
                })
            ])
        );
    });
    it('should get filtered copyrights by data id and owner id', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                _userId: '1',
                dataId: '1',
                dataType: 'heroes',
                _createdOn: new Date()
            }])
        Copyright.find = mockFind;
        const result = await service.getFilteredCopyright('1', '1');

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(mockFind).toHaveBeenCalledWith({ dataId: '1', _userId: '1' })
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: '1',
                    _userId: '1',
                    dataId: '1',
                    dataType: 'heroes',
                    _createdOn: expect.any(Date)
                })
            ])
        );
    });
    it('should get one copyright by id', async () => {
        const mockFindById = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                _userId: '1',
                dataId: '1',
                dataType: 'heroes',
                _createdOn: new Date()
            }])
        Copyright.findById = mockFindById;
        const result = await service.getOneCopyright('1');

        expect(mockFindById).toHaveBeenCalledTimes(1)
        expect(mockFindById).toHaveBeenCalledWith('1')
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: '1',
                    _userId: '1',
                    dataId: '1',
                    dataType: 'heroes',
                    _createdOn: expect.any(Date)
                })
            ])
        );
    });
    it('should create copyright', async () => {
        const createdOn = new Date();
        const mockCreate = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
                _userId: '1',
                dataId: '1',
                dataType: 'heroes',
                _createdOn: createdOn
            })
        Copyright.create = mockCreate;

        const mockDocument = {
            _userId: '1',
            dataId: '1',
            dataType: 'heroes',
            _createdOn: createdOn
        }
        const result = await service.createCopyright(mockDocument);

        expect(mockCreate).toHaveBeenCalledTimes(1)
        expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
            _userId: '1',
            dataId: '1',
            dataType: 'heroes',
            _createdOn: expect.any(Date)
        }));
        expect(result).toEqual(
            expect.objectContaining({
                _id: '1',
                _userId: '1',
                dataId: '1',
                dataType: 'heroes',
                _createdOn: expect.any(Date)
            })
        );
    });
    it('should delete copyright by id', async () => {
        const mockFindByIdAndDelete = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                _userId: '1',
                dataId: '1',
                dataType: 'heroes',
                _createdOn: new Date()
            }])
        Copyright.findByIdAndDelete = mockFindByIdAndDelete;
        const deletedDocument = await service.deleteCopyright('1');

        expect(mockFindByIdAndDelete).toHaveBeenCalledTimes(1)
        expect(mockFindByIdAndDelete).toHaveBeenCalledWith('1')
        expect(deletedDocument).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: '1',
                    _userId: '1',
                    dataId: '1',
                    dataType: 'heroes',
                    _createdOn: expect.any(Date)
                })
            ])
        );
    });
});