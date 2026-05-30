export const addUserAccount = async (email, password) => {
    try {
        console.log(email, password);
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

    } catch (error) {
        console.error(error);
    }
};