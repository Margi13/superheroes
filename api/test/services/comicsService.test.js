const service = require('../../src/services/comicsService');
const Comics = require('../../src/models/Comics');

jest.mock('../../src/models/Comics', () => {
    return {
        create: jest.fn().mockImplementation(() => { }),
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    };
});
const mockComics = {
    title: 'name',
    genre: 'human',
    coverPage: 'image.jpg',
    imagesUrl: ['image.jpg'],
    story: 'The story of the comics!',
    likes: [],
    reports: [],
    participants: [],
    coworkers: [],
    status: 1,
    _createdOn: new Date(),
    _ownerId: '1'
}
describe('get superhero', () => {
    it('should get all comics with status 1', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                ...mockComics
            }])
        Comics.find = mockFind;
        const result = await service.getAllApproved();

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ status: 1 }));
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ _id: '1', ...mockComics })
            ])
        );
    });
    it('should get all comics with status 0', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                ...mockComics,
                status: 0
            }])
        Comics.find = mockFind;
        const result = await service.getAllPending();

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ status: 0 }));
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ _id: '1', ...mockComics, status: 0 })
            ])
        );
    });
    it('should get all comics with status -1', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                ...mockComics,
                status: -1
            }])
        Comics.find = mockFind;
        const result = await service.getAllDeclined();

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ status: -1 }));
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ _id: '1', ...mockComics, status: -1 })
            ])
        );
    });
    it('should get all comics with reports', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([
                {
                _id: '1',
                ...mockComics,
                reports: ['1']
            },
            {
                _id: '2',
                ...mockComics,
                heroName: 'hero2',
            }
        ])
        Comics.find = mockFind;
        const result = await service.getAllDeclined();

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ _id: '1', ...mockComics, reports: ['1'] }),
                expect.not.objectContaining({ _id: '2', ...mockComics, heroName: 'hero2' })
            ])
        );
    });
    it('should get comics by id', async () => {
        const mockFindById = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                ...mockComics
            }])
        Comics.findById = mockFindById;
        const result = await service.getOne('1');

        expect(mockFindById).toHaveBeenCalledTimes(1)
        expect(mockFindById).toHaveBeenCalledWith('1');
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ _id: '1', ...mockComics })
            ])
        );
    });
    it('should get own comics', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                ...mockComics
            }])
        Comics.find = mockFind;
        const result = await service.getOwn('1');

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ _ownerId: '1' }));
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ _id: '1', ...mockComics })
            ])
        );
    });
    it('should get comics by title', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                ...mockComics
            }])
        Comics.find = mockFind;
        const result = await service.getByTitle('name');

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ title: 'name' }));
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ _id: '1', ...mockComics })
            ])
        );
    });
});

describe('create, update, delete comics', () => {
    it('should create comics', async () => {
        const mockCreate = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
                ...mockComics
            })
        Comics.create = mockCreate;
        const result = await service.create(mockComics);

        expect(mockCreate).toHaveBeenCalledTimes(1)
        expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({ ...mockComics }));
        expect(result).toEqual(
            expect.objectContaining({ _id: '1', ...mockComics })
        );
    });
    it('should update comics', async () => {
        const mockUpdate = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
                ...mockComics
            })
        Comics.findByIdAndUpdate = mockUpdate;
        const result = await service.update('1', mockComics);

        expect(mockUpdate).toHaveBeenCalledTimes(1)
        expect(mockUpdate).toHaveBeenCalledWith('1', expect.objectContaining({ ...mockComics }));
        expect(result).toEqual(
            expect.objectContaining({ _id: '1', ...mockComics })
        );
    });
    it('should delete comics', async () => {
        const mockDelete = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
                ...mockComics
            })
        Comics.findByIdAndDelete = mockDelete;
        const deletedSuperhero = await service.delete('1');

        expect(mockDelete).toHaveBeenCalledTimes(1)
        expect(mockDelete).toHaveBeenCalledWith('1');
        expect(deletedSuperhero).toEqual(
            expect.objectContaining({ _id: '1', ...mockComics })
        );
    });
});