const service = require('../../src/services/adminService');
const Superhero = require('../../src/models/Superhero');
const Comics = require('../../src/models/Comics');
const User = require('../../src/models/User');

jest.mock('../../src/models/Superhero', () => {
    return {
        findByIdAndUpdate: jest.fn()
    };
});
jest.mock('../../src/models/Comics', () => {
    return {
        findByIdAndUpdate: jest.fn()
    };
});
jest.mock('../../src/models/User', () => {
    return {
        findOne: jest.fn()
    };
});

describe('admin service', () => {
    it('should get admin user', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                _roleId: '1',
                email: 'email',
                password: 'pass'
            }])
        User.findOne = mockFind;
        const result = await service.getAdmin('1');

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ _roleId: '1' }));
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: '1',
                    _roleId: '1',
                    email: 'email',
                    password: 'pass'
                })
            ])
        );
    });
    it('should update status of hero to 1', async () => {
        const createdOn = new Date();
        const mockUpdate = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
                personName: 'name',
                heroName: 'hero',
                kind: 'human',
                age: 25,
                imageUrl: 'image.jpg',
                story: 'The story of the hero!',
                likes: [],
                reports: [],
                status: 1,
                _createdOn: createdOn,
                _ownerId: '1'
            })
        Superhero.findByIdAndUpdate = mockUpdate;
        const mockHero = {
            personName: 'name',
            heroName: 'hero',
            kind: 'human',
            age: 25,
            imageUrl: 'image.jpg',
            story: 'The story of the hero!',
            likes: [],
            reports: [],
            status: 1,
            _createdOn: createdOn,
            _ownerId: '1'
        }
        const result = await service.declineHero('1', mockHero);

        expect(mockUpdate).toHaveBeenCalledTimes(1)
        expect(mockUpdate).toHaveBeenCalledWith('1',
            expect.objectContaining({
                personName: 'name',
                heroName: 'hero',
                kind: 'human',
                age: 25,
                imageUrl: 'image.jpg',
                story: 'The story of the hero!',
                likes: [],
                reports: [],
                status: 1,
                _createdOn: expect.any(Date),
                _ownerId: '1'
            })
        );
        expect(result).toEqual(
            expect.objectContaining({ _id: '1', ...mockHero })
        );
    });
    it('should update status of hero to -1', async () => {
        const createdOn = new Date();
        const mockUpdate = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
                personName: 'name',
                heroName: 'hero',
                kind: 'human',
                age: 25,
                imageUrl: 'image.jpg',
                story: 'The story of the hero!',
                likes: [],
                reports: [],
                status: -1,
                _createdOn: createdOn,
                _ownerId: '1'
            })
        Superhero.findByIdAndUpdate = mockUpdate;
        const mockHero = {
            personName: 'name',
            heroName: 'hero',
            kind: 'human',
            age: 25,
            imageUrl: 'image.jpg',
            story: 'The story of the hero!',
            likes: [],
            reports: [],
            status: -1,
            _createdOn: createdOn,
            _ownerId: '1'
        }
        const result = await service.approveHero('1', mockHero);

        expect(mockUpdate).toHaveBeenCalledTimes(1)
        expect(mockUpdate).toHaveBeenCalledWith('1',
            expect.objectContaining({
                personName: 'name',
                heroName: 'hero',
                kind: 'human',
                age: 25,
                imageUrl: 'image.jpg',
                story: 'The story of the hero!',
                likes: [],
                reports: [],
                status: -1,
                _createdOn: createdOn,
                _ownerId: '1'
            })
        );
        expect(result).toEqual(
            expect.objectContaining({ _id: '1', ...mockHero })
        );
    });
    it('should update status of comics to 1', async () => {
        const createdOn = new Date();
        const mockUpdate = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
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
                _createdOn: createdOn,
                _ownerId: '1'
            })
        Comics.findByIdAndUpdate = mockUpdate;
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
            _createdOn: createdOn,
            _ownerId: '1'
        }
        const result = await service.approveComics('1', mockComics);

        expect(mockUpdate).toHaveBeenCalledTimes(1)
        expect(mockUpdate).toHaveBeenCalledWith('1',
            expect.objectContaining({
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
                _createdOn: expect.any(Date),
                _ownerId: '1'
            })
        );
        expect(result).toEqual(
            expect.objectContaining({ _id: '1', ...mockComics })
        );
    });
    it('should update status of comics to -1', async () => {
        const createdOn = new Date();
        const mockUpdate = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
                title: 'name',
                genre: 'human',
                coverPage: 'image.jpg',
                imagesUrl: ['image.jpg'],
                story: 'The story of the comics!',
                likes: [],
                reports: [],
                participants: [],
                coworkers: [],
                status: -1,
                _createdOn: createdOn,
                _ownerId: '1'
            })
        Comics.findByIdAndUpdate = mockUpdate;
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
            status: -1,
            _createdOn: createdOn,
            _ownerId: '1'
        }
        const result = await service.declineComics('1', mockComics);

        expect(mockUpdate).toHaveBeenCalledTimes(1)
        expect(mockUpdate).toHaveBeenCalledWith('1',
            expect.objectContaining({
                title: 'name',
                genre: 'human',
                coverPage: 'image.jpg',
                imagesUrl: ['image.jpg'],
                story: 'The story of the comics!',
                likes: [],
                reports: [],
                participants: [],
                coworkers: [],
                status: -1,
                _createdOn: expect.any(Date),
                _ownerId: '1'
            })
        );
        expect(result).toEqual(
            expect.objectContaining({ _id: '1', ...mockComics })
        );
    });
});