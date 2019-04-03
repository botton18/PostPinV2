import 'whatwg-fetch';

class HttpService {
    getUsers = () => {
        fetch('http://localhost:3001/users').then(response => {
            console.log(response.json());
        });
    }
}

export default HttpService;