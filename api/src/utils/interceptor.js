exports.mockRequest = () => {
    const req = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req
}

exports.mockResponse = () => {
    const res = {};
    res.send = jest.fn().mochReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

exports.mockNext = () => jest.fn();