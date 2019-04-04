import 'whatwg-fetch';

class HttpService {
    getUsers = () => {
        var promise = new Promise((resolve, reject ) => {
            fetch('http://localhost:3001/users').then(response => {
                resolve(response.json());
            });
        });
        
        return promise;
    }

    getProducts = () => {
        var promise = new Promise((resolve, reject) => {
            fetch('http://localhost:3001/products').then(response => {
                resolve(response.json());
            });
        });
        
        return promise;
    }
}

export default HttpService;