export const dashboard = async (accessToken) => {
    try {
        const requestOptions = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        };

        const fetchResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/dashboard/load-all-data`,
            requestOptions
        );

        const { newAccessToken } = await fetchResponse.json();
        return newAccessToken;

    } catch (error) {
        console.error(error);
    }
}; 