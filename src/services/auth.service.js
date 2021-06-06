import API_URL from './config.js'

export const AuthService = {
    async login(user) { // payload = user (username + password)
        const response = await fetch(`${API_URL}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.accessToken)
                localStorage.setItem('user', JSON.stringify(data));
            return data;
        } else {
            const data =await response.json();
            throw Error(data.message)
        }
    },

    async logout() {
        localStorage.removeItem('user');
    },

    async register(user) {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                username: user.username,
                email: user.email,
                password: user.password,
                name: user.name,
                user_type: user.user_type
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

export default AuthService;