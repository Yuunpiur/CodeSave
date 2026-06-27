const attachNewAccessToken = (req, res, next) => {
    const originalJson = res.json.bind(res);

    res.json = (body) => {
        if (res.locals.newAccessToken) {
            body = { ...body, newAccessToken: res.locals.newAccessToken };
        }

        return originalJson(body);
    };

    next();

};



export default attachNewAccessToken;