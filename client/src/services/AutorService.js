import HttpService from './HttpService';
import Autor from '../Autor';

let BASE_URL = 'http://localhost:8080/api';

class AutorService {
    constructor(httpService) {
        this.httpService = new HttpService();
    }

    lista() {
        let url = `${BASE_URL}/autores`;
        return this.httpService.get(url)
            .then(autoresJSON => {
                let autores = autoresJSON.map((item) => new Autor(item.id, item.nome, item.email, item.senha));
                return autores;
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao listar autores');
            });
    }

    salva(dado) {
        let url = `${BASE_URL}/autores`;
        return this.httpService.post(url, dado)
            .then(resposta => {
                let autores = resposta.map((item) => new Autor(item.id, item.nome, item.email, item.senha));
                return autores;
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao salvar autor');
            });
    }
}

export default AutorService;