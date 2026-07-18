const getUsername = (refreshToken) => {
    const decodedPayload = atob(refreshToken.split(".")[1]);
    const username = JSON.parse(decodedPayload).username;

    return username;

};

export default getUsername;