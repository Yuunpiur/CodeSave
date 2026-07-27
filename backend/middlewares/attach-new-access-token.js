const attachNewAccessToken = (req, res, next) => {
    const originalJson = res.json.bind(res); // assigning res.json to a variable

    // overwrite res.json
    // this is executed when res.json is called 
    res.json = ({ body, dataName, message }) => {
        if (message) {
            body = { message: message }
        }
        else if (dataName && body) {
            body = { [dataName]: body };
        }


        if (res.locals.newAccessToken) {
            body.newAccessToken = res.locals.newAccessToken
        }


        return originalJson(body);
    };

    next();
};



export default attachNewAccessToken;