export const userAuthenticated = async (controller) => {
    try {
        const access_token = localStorage.getItem('access_token');
        if (!access_token) return false;

        const url = `${process.env.REACT_APP_API_URL}/api/v1/token/`;
        const res = await fetch(url, {
            method: 'POST',
            signal: controller,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access_token}`,
            },
        });
        const j = await res.json();
        return j;
    } catch (err) {
        console.log(err);
        return false;
    }
};
