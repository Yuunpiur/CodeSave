export const getAllFolders = async (accessToken) => {
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

        const allFolders = await fetchResponse.json();
        return allFolders;
    }
    catch (error) {
        console.error(error);
    }
}; 