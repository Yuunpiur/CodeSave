const attachNewAccessToken = (req, res, next) => {
    const originalJson = res.json.bind(res); // assigning res.json to a variable

    // overwrite res.json
    // this is executed when we call res.json
    res.json = (body) => {
        if (res.locals.newAccessToken) {
            body = { ...body, newAccessToken: res.locals.newAccessToken };
        }
        return originalJson(body);
    };

    next();

};



export default attachNewAccessToken;