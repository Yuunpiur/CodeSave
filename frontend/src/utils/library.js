export const getAllFolders = async (accessToken, updateAccessToken) => {
    try {
        const requestOptions = {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        };


        const fetchResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/library/get-all-folders`,
            requestOptions
        );

        const fetchData = await fetchResponse.json();

        if (fetchData.newAccessToken) {
            updateAccessToken((fetchData.newAccessToken));

            return fetchData.allFolders;
        }

        return fetchData.allFolders;
    }
    catch (error) {
        console.error(error);
    }
}; 