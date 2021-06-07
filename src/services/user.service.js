import API_URL from './config.js'
import store from "../store";

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

export const UserService = {
    async fetchOneUserByID(id) {
        const response = await fetch(`${API_URL}/users/${id}`, {
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

    async fetchUpdateUser(user) {
        const response = await fetch(`${API_URL}/users/${user.id}`, {
            method: "PUT",
            headers: authHeader(),
            body: JSON.stringify({
                name: user.name,
                location: user.location,
                school: user.school,
                url: user.url,
                biography: user.biography,
                profile_picture: user.profile_picture,
                id_type: user.id_type,
            }),
        });
        if (response.ok) {
            //update name of the user in localstorage
            if(store.getters.getLoggedUser.id == user.id){
                let userLocal = JSON.parse(localStorage.getItem('user'));
                userLocal.name = user.name
                localStorage.setItem("user", JSON.stringify(userLocal));
            }

            let data = await response.json();
            return data;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async fetchDeleteUser(id) {
        const response = await fetch(`${API_URL}/users/${id}`, {
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


    async fetchAllUsers() {
        const response = await fetch(`${API_URL}/users?size=8`, {
            method: "GET",
            headers: authHeader()
        });
        if (response.ok) {
            let data = await response.json();
            // console.log("USER SERVICE - fetch ALL USERS")
            return data;
        }
        else {
            // console.log("USER SERVICE - fetch ALL USERS: ERROR ");
            // console.log(response)
            throw Error(handleResponses(response.status));
        }

    },

    // // sends request to API root
    // async getPublicContent() {
    //     // return axios.get(API_URL);
    //     const response = await fetch(`${API_URL}`, {
    //         method: "GET" // requires NO authorization header
    //     });
    //     if (response.ok) {
    //         let data = await response.json();
    //         // console.log("USER SERVICE - fetch WELCOMING MESSAGE")
    //         // console.log(data) // data = "Welcome to the TUTORIALS api"
    //         return data;
    //     }
    //     else
    //         throw Error(handleResponses(response.status));
    // }
}

export default UserService;


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