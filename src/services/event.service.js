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

export const EventService = {
    async fetchOneEventByID(id) {
        const response = await fetch(`${API_URL}/events/${id}`, {
            method: "GET",
            headers: authHeader()
        });
        if (response.ok) {
            let data = await response.json();
            // console.log("EVENT SERVICE - fetch 1 EVENT")
            // console.log(data)
            return data;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async fetchUpdateEvent(event) {
        const response = await fetch(`${API_URL}/events/${event.id}`, {
            method: "PUT",
            headers: authHeader(),
            body: JSON.stringify({
                title: event.title,
                description: event.description,
                edition: event.edition,
                date: event.date,
                img: event.img,
                url: event.url,
                id_area: event.id_area,
                id_category: event.id_category,
                id_state: event.id_state
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

    async fetchDeleteEvent(id) {
        const response = await fetch(`${API_URL}/events/${id}`, {
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


    async fetchAllEvents() {
        const response = await fetch(`${API_URL}/events?size=8`, {
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

    async fetchCreateEvent(event) {
        const response = await fetch(`${API_URL}/events`, {
            method: "POST",
            headers: authHeader(),
            body: JSON.stringify({
                title: event.title,
                description: event.description,
                edition: event.edition,
                date: event.date,
                img: event.img,
                url: event.url,
                id_area: event.id_area,
                id_category: event.id_category,
                id_state: event.id_state
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

export default EventService;


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