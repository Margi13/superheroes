const service = require('../../src/services/likeService');
const Like = require('../../src/models/Like');

jest.mock('../../src/models/Like', () => {
    return {
        create: jest.fn().mockImplementation(() => { }),
        find: jest.fn()
    };
});

describe('like service', () => {
    it('should get likes by hero id', async () => {
        const mockFind = jest.fn()
            .mockReturnValueOnce([{
                _id: '1',
                _ownerId: '1',
                _superheroId: '1'
            }])
        Like.find = mockFind;
        const result = await service.getLikesByHeroId('1');

        expect(mockFind).toHaveBeenCalledTimes(1)
        expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({ _superheroId: '1' }));
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ _id: '1', _ownerId: '1', _superheroId: '1' })
            ])
        );
    });
    it('should create like', async () => {
        const mockCreate = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
                _ownerId: '1',
                _superheroId: '1'
            })
        Like.create = mockCreate;
        const result = await service.create({ _ownerId: '1', _superheroId: '1' });

        expect(mockCreate).toHaveBeenCalledTimes(1)
        expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({ _ownerId: '1', _superheroId: '1' }));
        expect(result).toEqual(
            expect.objectContaining({ _id: '1', _ownerId: '1', _superheroId: '1' })
        );
    });
});