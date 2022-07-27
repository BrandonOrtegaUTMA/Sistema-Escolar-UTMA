export const request = (url, options) => {
    function handleErrors(response) {
        if(response.status === 403 && !options.noRedirect){
          delete localStorage.user;
          delete localStorage.token;
          window.location.href = "/";
        }else if (!response.ok) {
            return response.text().then((text) => {
              response.message = text
              throw response;
            });
        }
        return response;
    }
    if(!options.headers){
      options['headers'] = {
        'Authorization' : "Bearer "+localStorage.token
      }
    }else if(!options.headers['Authorization']){
      options['headers']['Authorization'] = "Bearer "+localStorage.token;
    }
    if(options['method'] === 'POST' && !options["file"]){
      options["headers"]["Content-Type"] = "application/json";
    }
    if(options['method'] === 'DELETE' || options['method'] === 'PUT'){
      options["headers"]["Content-Type"] = "application/json";
    }

    return fetch(url, options)
    .then( handleErrors)
    .then( response  => {
      return response
    })
    .then( (response) => {
      return response.json()
        .then((data) => {
          return { data, status: response.status }
        })
      })
    .catch(
      (error) => {
        console.log(error.message);
        return { error: error, status: error.status };
      }
    )
  }

