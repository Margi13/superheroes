const service = require('../../src/services/superheroService');
const Superhero = require('../../src/models/Superhero');

jest.mock('../../src/models/Superhero', () => {
    return {
        create: jest.fn().mockImplementation(() => { }),
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    };
});
const mockSuperhero = {
    personName: 'name',
    heroName: 'hero',
    kind: 'human',
    age: 25,
    imageUrl: 'image.jpg',
    story: 'The story of the hero!',
    likes: [],
    reports: [],
    status: 1,
    _createdOn: new Date(),
    _ownerId: '1'
}
describe('get superhero', () => {
    it('should get all heroes with status 1', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                ...mockSuperhero
            }])
        Superhero.find = mockFind;
        const result = await service.getAllApproved();

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ status: 1 }));
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ _id: '1', ...mockSuperhero })
            ])
        );
    });
    it('should get all heroes with status 0', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                ...mockSuperhero,
                status: 0
            }])
        Superhero.find = mockFind;
        const result = await service.getAllPending();

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ status: 0 }));
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ _id: '1', ...mockSuperhero, status: 0 })
            ])
        );
    });
    it('should get all heroes with status -1', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                ...mockSuperhero,
                status: -1
            }])
        Superhero.find = mockFind;
        const result = await service.getAllDeclined();

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ status: -1 }));
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ _id: '1', ...mockSuperhero, status: -1 })
            ])
        );
    });
    it('should get all heroes with reports', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([
                {
                _id: '1',
                ...mockSuperhero,
                reports: ['1']
            },
            {
                _id: '2',
                ...mockSuperhero,
                heroName: 'hero2',
            }
        ])
        Superhero.find = mockFind;
        const result = await service.getAllDeclined();

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ _id: '1', ...mockSuperhero, reports: ['1'] }),
                expect.not.objectContaining({ _id: '2', ...mockSuperhero, heroName: 'hero2' })
            ])
        );
    });
    it('should get hero by id', async () => {
        const mockFindById = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                ...mockSuperhero
            }])
        Superhero.findById = mockFindById;
        const result = await service.getOne('1');

        expect(mockFindById).toHaveBeenCalledTimes(1)
        expect(mockFindById).toHaveBeenCalledWith('1');
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ _id: '1', ...mockSuperhero })
            ])
        );
    });
    it('should get own heroes', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                ...mockSuperhero
            }])
        Superhero.find = mockFind;
        const result = await service.getOwn('1');

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ _ownerId: '1' }));
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ _id: '1', ...mockSuperhero })
            ])
        );
    });
    it('should get hero by hero name', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                ...mockSuperhero
            }])
        Superhero.find = mockFind;
        const result = await service.getByHeroName('hero');

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ heroName: 'hero' }));
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ _id: '1', ...mockSuperhero })
            ])
        );
    });
});

describe('create, update, delete superhero', () => {
    it('should create superhero', async () => {
        const mockCreate = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
                ...mockSuperhero
            })
        Superhero.create = mockCreate;
        const result = await service.create(mockSuperhero);

        expect(mockCreate).toHaveBeenCalledTimes(1)
        expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({ ...mockSuperhero }));
        expect(result).toEqual(
            expect.objectContaining({ _id: '1', ...mockSuperhero })
        );
    });
    it('should update superhero', async () => {
        const mockUpdate = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
                ...mockSuperhero
            })
        Superhero.findByIdAndUpdate = mockUpdate;
        const result = await service.update('1', mockSuperhero);

        expect(mockUpdate).toHaveBeenCalledTimes(1)
        expect(mockUpdate).toHaveBeenCalledWith('1', expect.objectContaining({ ...mockSuperhero }));
        expect(result).toEqual(
            expect.objectContaining({ _id: '1', ...mockSuperhero })
        );
    });
    it('should delete superhero', async () => {
        const mockDelete = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
                ...mockSuperhero
            })
        Superhero.findByIdAndDelete = mockDelete;
        const deletedSuperhero = await service.delete('1');

        expect(mockDelete).toHaveBeenCalledTimes(1)
        expect(mockDelete).toHaveBeenCalledWith('1');
        expect(deletedSuperhero).toEqual(
            expect.objectContaining({ _id: '1', ...mockSuperhero })
        );
    });
});