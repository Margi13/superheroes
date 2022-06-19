export const request = async (method, url, data, needAuth) => {
    let promise = null;
    if (method === 'GET') {
        if (needAuth) {
            promise = fetch(url, {
                headers: {
                    'X-Authorization': getToken()
                },
            });
        } else {
            promise = fetch(url);
        }
    } else if (needAuth) {
        promise = fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': getToken()
            },
            body: JSON.stringify(data ? data : {})
        })
    } else {
        promise = fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data ? data : {})
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
    if (res.status !== 200) {
        return res;
    }
    try {
        let jsonData = await res.json();
        if (res.ok) {
            return jsonData;
        } else {
            throw jsonData;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export const get = request.bind(null, 'GET');
export const put = request.bind(null, 'PUT');
export const post = request.bind(null, 'POST');
export const remove = request.bind(null, 'DELETE');
