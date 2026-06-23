

export const dashboard = (accessToken) => {
    try {
        const requestOptions = {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                accessToken: accessToken
            }),
            headers: { "Content-Type": "application/json" }
        };
        console.log("STOP?");

        /* const fetchResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/dashboard/load-all-data`,
            requestOptions,
        ); */

        // const { accessToken } = await fetchResponse.json();

        // return accessToken;
    } catch (error) {
        console.error(error);
    }
}; 