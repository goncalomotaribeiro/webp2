import API_URL from './config.js'

function authHeader() {
    // checks Local Storage for user item
    let user = JSON.parse(localStorage.getItem('user'));

    // if there is a logged in user with accessToken (JWT)
    if (user && user.accessToken) {
        // return HTTP authorization header for Node.js Express back-end
        return {
            'Content-Type': 'application/json',
            'x-access-token': user.accessToken
        };
    } else {
        return { 'Content-Type': 'application/json' }; //otherwise, return an empty object
    }
}

export const ChallengeService = {
    async fetchOneChallengeByID(id) {
        const response = await fetch(`${API_URL}/challenges/${id}`, {
            method: "GET",
            headers: authHeader()
        });
        if (response.ok) {
            let data = await response.json();
            // console.log("USER SERVICE - fetch 1 USER")
            // console.log(data)
            return data;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async fetchUpdateChallenge(challenge) {
        const response = await fetch(`${API_URL}/challenges/${challenge.id}`, {
            method: "PUT",
            headers: authHeader(),
            body: JSON.stringify({
                title: challenge.title,
                description: challenge.description,
                date_in: challenge.date_in,
                date_end: challenge.date_end,
                img: challenge.img,
                rules: challenge.rules,
                id_area: challenge.id_area,
                id_category: challenge.id_category,
                id_state: challenge.id_state,
            }),
        });
        if (response.ok) {
            let data = await response.json();
            return data;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async fetchDeleteChallenge(id) {
        const response = await fetch(`${API_URL}/challenges/${id}`, {
            method: "DELETE",
            headers: authHeader(),
        });
        if (response.ok) {
            let data = await response.json();
            return data;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },


    async fetchAllChallenges() {
        const response = await fetch(`${API_URL}/challenges?size=18`, {
            method: "GET",
            headers: authHeader()
        });
        if (response.ok) {
            let data = await response.json();
            return data;
        }
        else {
            throw Error(handleResponses(response.status));
        }

    },

    async fetchCreateChallenge(challenge) {
        const response = await fetch(`${API_URL}/challenges`, {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify({
                title: challenge.title,
                description: challenge.description,
                date_ini: challenge.date_ini,
                date_end: challenge.date_end,
                img: challenge.img,
                rules: challenge.rules,
                id_area: challenge.id_area,
                id_category: challenge.id_category,
                id_state: challenge.id_state
            })
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const data =await response.json();
            throw Error(data.message)
        }
    }
}

export default ChallengeService;


function handleResponses(code) {
    let message = "";
    switch (code) {
        case 401:
            message = "Not allowed to executed this action!";
            break;
        case 403:
            message = "Forbidden access";
            break;
        default:
            message = "Unkown message";
            break;
    }
    return message;
}