const service = require('../../src/services/userService');
const roleService = require('../../src/services/roleService');
const User = require('../../src/models/User');
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require('../../src/utils/constants');

jest.mock('../../src/models/User', () => {
    return {
        create: jest.fn().mockImplementation(() => { }),
        findOne: jest.fn()
    };
});

jest.mock('jsonwebtoken', () => {
    return {
        sign: jest.fn().mockReturnValue('token')
    };
});

jest.mock('../../src/services/roleService', () => {
    return {
        getRoleByName: jest.fn().mockReturnValue({ _id: '1', roleName: 'ADMIN' })
    }
});

describe('create admin', () => {
    it('creates user with role admin', async () => {
        const mockCreate = jest.fn().mockReturnValue({
            _id: '1',
            _roleId: '1',
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
        })
        User.create = mockCreate;
        const result = await service.createAdmin();

        expect(mockCreate).toHaveBeenCalledTimes(1)
        expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
            _roleId: '1',
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
        }));
        expect(result).toEqual(expect.objectContaining({
            _id: '1',
            _roleId: '1',
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD
        }))
    });
    it('throws an error if create fails', async () => {
        User.create = jest.fn().mockImplementation(() => {
            throw new Error('Cannot register admin user')
        })
        try {
            await service.createAdmin();
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(expect.stringContaining('Cannot register admin'))
        }
    });
});
describe('register user', () => {
    it('registers user with role user', async () => {
        roleService.getRoleByName = jest.fn().mockReturnValue({
            _id: '2',
            roleName: 'USER'
        })
        const mockCreate = jest.fn().mockReturnValue({
            _id: '1',
            _roleId: '2',
            email: 'test@test.test',
            password: 'hashed_password'
        })
        User.create = mockCreate;

        const mockUser = {
            email: 'test@test.test',
            password: 'hashed_password'
        }
        const result = await service.register(mockUser);

        expect(mockCreate).toHaveBeenCalledTimes(1)
        expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
            _roleId: '2',
            email: 'test@test.test',
            password: 'hashed_password'
        }));
        expect(result).toEqual(expect.objectContaining({
            _id: '1',
            _roleId: '2',
            email: 'test@test.test',
            password: 'hashed_password'
        }))
    });
});
describe('login user', () => {
    it('should login user', async () => {
        const mockValidate = jest.fn().mockReturnValue(true)
        const mockFindOne = jest.fn().mockImplementation(() => {
            return {
                _id: '1',
                _roleId: '2',
                email: 'test@test.test',
                validatePassword: mockValidate
            }
        });
        User.findOne = mockFindOne;
        const mockUser = {
            email: 'test@test.test',
            password: 'hashed_password'
        }
        const result = await service.login(mockUser);

        expect(mockFindOne).toHaveBeenCalledTimes(1);
        expect(mockFindOne).toHaveBeenCalledWith(expect.objectContaining({ email: 'test@test.test' }));
        expect(mockValidate).toHaveBeenCalledTimes(1);
        expect(mockValidate).toHaveBeenCalledWith(expect.stringContaining('hashed_password'));
        expect(result).toEqual(expect.objectContaining({
            user: expect.objectContaining({
                _id: '1',
                _roleId: '2',
                email: 'test@test.test'
            }),
            token: 'token'
        }))
    });

    it('should throw if validation of password fails', async () => {
        const mockValidate = jest.fn().mockReturnValue(false)
        const mockFindOne = jest.fn().mockReturnValue({
            _id: '1',
            _roleId: '2',
            email: 'test@test.test',
            validatePassword: mockValidate
        });
        User.findOne = mockFindOne;
        const mockUser = {
            email: 'test@test.test',
            password: 'hashed_password'
        }
        try {
            await service.login(mockUser);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(expect.stringContaining('Invalid username or password!'))
        } finally {
            expect(mockFindOne).toHaveBeenCalledTimes(1);
            expect(mockFindOne).toHaveBeenCalledWith(expect.objectContaining({ email: 'test@test.test' }));
            expect(mockValidate).toHaveBeenCalledTimes(1);
            expect(mockValidate).toHaveBeenCalledWith(expect.stringContaining('hashed_password'));
        }
    });
    it('should throw if validation of password fails', async () => {
        const mockValidate = jest.fn().mockReturnValue(true)
        const mockFindOne = jest.fn().mockReturnValue({});
        User.findOne = mockFindOne;
        const mockUser = {
            email: 'test@test.test',
            password: 'hashed_password'
        }
        try {
            await service.login(mockUser);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toEqual(expect.stringContaining("Invalid username or password!"));
        } finally {
            expect(mockFindOne).toHaveBeenCalledTimes(1);
            expect(mockFindOne).toHaveBeenCalledWith(expect.objectContaining({ email: 'test@test.test' }));
            expect(mockValidate).toHaveBeenCalledTimes(0);
        }
    });
});