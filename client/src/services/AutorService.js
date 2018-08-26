import HttpService from './HttpService';

let BASE_URL = 'http://localhost:8080/api';

class AutorService {
    constructor(httpService) {
        this.httpService = new HttpService();
    }

    lista() {
        let url = `${BASE_URL}/autores`;
        return this.httpService.get(url);
    }
}

export default AutorService;