const attachNewAccessToken = (req, res, next) => {
    const originalJson = res.json.bind(res); // assigning res.json to a variable

    // overwrite res.json
    // this is executed when res.json is called 
    res.json = (body, dataName) => {
        if (res.locals.newAccessToken) {
            body = { [dataName]: body, newAccessToken: res.locals.newAccessToken };
        }
        else {
            body = { [dataName]: body }
        }

        return originalJson(body);
    };

    next();
};



export default attachNewAccessToken;