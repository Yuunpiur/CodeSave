export const signUp = async (username, password) => {
    try {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: { "Content-Type": "application/json" }
        };

        const fetchResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/authenticate/add-user-account`,
            requestOptions,
        );

        const { accessToken } = await fetchResponse.json();

        return accessToken;
    } catch (error) {
        console.error(error);
    }
};


export const login = async (username, password) => {
    try {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: { "Content-Type": "application/json" }
        };

        const fetchResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/authenticate/check-if-user-exist`,
            requestOptions,
        );

        const { accessToken } = await fetchResponse.json();
        return accessToken;

    } catch (error) {
        console.error(error);
    }
};