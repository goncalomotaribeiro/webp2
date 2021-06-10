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

export const SubmissionService = {
    async fetchOneSubmissionByID(id) {
        const response = await fetch(`${API_URL}/submissions/${id}`, {
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

    async fetchOneSubmissionByIDChallenge(id_challenge, id_user) {
        const response = await fetch(`${API_URL}/submissions?id_challenge=${id_challenge}&id_user=${id_user}`, {
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

    async fetchSubmissionsByIDUser(id) {
        const response = await fetch(`${API_URL}/submissions?id_user=${id}`, {
            method: "GET",
            headers: authHeader()
        });
        if (response.ok) {
            let data = await response.json();
            // console.log("SUBMISSION SERVICE - fetch 1 SUBMISSION")
            // console.log(data)
            return data;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async fetchUpdateSubmission(submission) {
        const response = await fetch(`${API_URL}/submissions/${submission.id}`, {
            method: "PUT",
            headers: authHeader(),
            body: JSON.stringify({
                url: submission.url,
                date: submission.date,
                classification: submission.classification
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

    async fetchDeleteSubmission(id) {
        const response = await fetch(`${API_URL}/submissions/${id}`, {
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


    async fetchAllSubmissions() {
        const response = await fetch(`${API_URL}/submissions?size=10`, {
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

    async fetchCreateSubmission(submission) {
        const response = await fetch(`${API_URL}/challenges/${submission.id_challenge}/submissions`, {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify({
                url: submission.url,
                date: submission.date,
                classification: submission.classification
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

export default SubmissionService;


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