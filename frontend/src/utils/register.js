export const addUserAccount = async (email, password) => {
    try {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: { "Content-Type": "application/json" },
        };

        const fetchResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/authenticate/add-user-account`,
            requestOptions,
        );

        const { userAdded } = await fetchResponse.json();
        return userAdded;



    } catch (error) {
        console.error(error);
    }
};


export const userExist = async (email, password) => {
    try {
        const requestOptions = {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: { "Content-Type": "application/json" },
        };

        const fetchResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/authenticate/check-if-user-exist`,
            requestOptions,
        );

        const { userExist } = await fetchResponse.json();
        return userExist;

    } catch (error) {
        console.error(error);
    }
};