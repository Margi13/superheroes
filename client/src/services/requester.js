export const request = async (method, url, data) => {
    let promise = null;
    if (method === 'GET') {
        promise = fetch(url);
    } else {
        promise = fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': getToken()
            },
            body: JSON.stringify(data)
        })
    }
    return promise.then(responseHandler);
}
function getToken() {
    try {
        let userItem = localStorage.getItem('user');
        if (!userItem) {
            throw new Error('You must be authenticated');
        }

        let userData = JSON.parse(userItem);
        return userData.accessToken;
    }
    catch (error) {
        console.log(error);
    }
}
async function responseHandler(res) {
    let jsonData = await res.json();
    if (res.ok) {
        return Object.values(jsonData);
    } else {
        throw jsonData;
    }
}

export const get = request.bind(null, 'GET');
export const put = request.bind(null, 'PUT');
export const post = request.bind(null, 'POST');
