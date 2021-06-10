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

export const MyEventService = {
    async fetchOneMyEventByID(id) {
        const response = await fetch(`${API_URL}/my-events/${id}`, {
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

    async fetchOneMyEventByIDEvent(id_event, id_user) {
        const response = await fetch(`${API_URL}/my-events?id_event=${id_event}&id_user=${id_user}`, {
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

    async fetchDeleteMyEvent(id) {
        const response = await fetch(`${API_URL}/my-events/${id}`, {
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


    async fetchAllMyEvents() {
        const response = await fetch(`${API_URL}/my-events?size=18`, {
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

    async fetchCreateMyEvent(my_event) {
        const response = await fetch(`${API_URL}/my-events`, {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify({
                id_event: my_event.id_event,
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

export default MyEventService;


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