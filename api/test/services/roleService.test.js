const service = require('../../src/services/roleService');
const Role = require('../../src/models/Role');
const { ADMIN_ROLE_NAME, USER_ROLE_NAME } = require('../../src/utils/constants');

jest.mock('../../src/models/User', () => {
    return {
        create: jest.fn().mockImplementation(() => { }),
        findOne: jest.fn()
    };
});

describe('create roles', () => {
    it('creates roles for admin and user', async () => {
        const mockCreate = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
                roleName: ADMIN_ROLE_NAME
            })
            .mockReturnValueOnce({
                _id: '2',
                roleName: USER_ROLE_NAME
            })
        Role.create = mockCreate;
        const result = await service.createRoles();

        expect(mockCreate).toHaveBeenCalledTimes(2)
        expect(mockCreate).toHaveBeenNthCalledWith(1, expect.objectContaining({
            roleName: ADMIN_ROLE_NAME
        }));
        expect(mockCreate).toHaveBeenNthCalledWith(2, expect.objectContaining({
            roleName: USER_ROLE_NAME
        }));
        expect(result).toEqual(expect.objectContaining({ ok: true }))
    });
    it('throws an error if create fails', async () => {
        Role.create = jest.fn()
        .mockReturnValueOnce({
            _id: '1',
            roleName: ADMIN_ROLE_NAME
        })
        .mockReturnValueOnce(() => {})
        let result;
        try {
            result = await service.createRoles();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(expect.stringContaining('Cannot create admin and user roles'))
        } finally {
            expect(result).toEqual(expect.objectContaining({
                type: 'error'
            }))
        }
    });
});
describe('get role by name', () => {
    it('should get role by name', async () => {
        const mockFindOne = jest.fn()
            .mockReturnValueOnce({
                _id: '1',
                roleName: ADMIN_ROLE_NAME
            })
        Role.findOne = mockFindOne;
        const result = await service.getRoleByName(ADMIN_ROLE_NAME);

        expect(mockFindOne).toHaveBeenCalledTimes(1)
        expect(mockFindOne).toHaveBeenCalledWith(expect.objectContaining({
            roleName: ADMIN_ROLE_NAME
        }));
        expect(result).toEqual(expect.objectContaining({ _id: '1', roleName: ADMIN_ROLE_NAME }))
    });
});