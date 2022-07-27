const axios = require('axios').default;

module.exports = {

    post: async (url, body, file) => {
        const config = {
            headers: {
                'Authorization' : "Bearer "+localStorage.token,
                "Content-Type": "application/json"
            }
        }
        if(file){
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        return axios.post("http://localhost:5000/api"+url, body, config)
        .then(handleErrors)
        .then(response => {
            return response
        })
        .then((result) => {
              return result;
            }
        )      
        .catch(err => {
            return {error: err}
        });
    },
    put: async (url, body, file) => {
        const config = {
            headers: {
                'Authorization' : "Bearer "+localStorage.token,
                "Content-Type": "application/json"
            }
        }
        if(file){
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        return axios.put("http://localhost:5000/api"+url, body, config)
        
        .then(handleErrors)
        .then(response => {
            return response
        })
        .then((result) => {
              return { data: result };
            }
        )
    },
    delete: async (url) => {
        const config = {
            headers: {
                'Authorization' : "Bearer "+localStorage.token,
                "Content-Type": "application/json"
            }
        }
        return axios.delete("http://localhost:5000/api"+url, config)
        .then(handleErrors)
        .then(response => {
            return response
        })
        .then((result) => {
              return { data: result };
            }
        )      
        .catch(err => {
            return {error: err}
        });
    },
    get: async (url) => {
        const config = {
            headers: {
                'Authorization' : "Bearer "+localStorage.token,
                "Content-Type": "application/json"
            }
        }
        return axios.get("http://localhost:5000/api"+url, config)
        .then(handleErrors)
        .then(response => {
            return response
        })
        .then((result) => {
              return { data: result.data };
            }
        )      
        .catch(err => {
            return {error: err}
        });
    },
};

function handleErrors(response) {
    if(response.status === 403 ){
      delete localStorage.user;
      delete localStorage.token;
      window.location.href = "/";
    }
    return response;
}