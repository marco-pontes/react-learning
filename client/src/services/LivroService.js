import HttpService from './HttpService';
import Livro from '../models/Livro';

let BASE_URL = 'http://localhost:8080/api';

class LivroService {
    constructor(httpService) {
        this.httpService = new HttpService();
    }

    lista() {
        let url = `${BASE_URL}/livros`;
        return this.httpService.get(url)
            .then(livrosJSON => {
                let livros = livrosJSON.map((item) => new Livro(item.id, item.titulo, item.preco, item.autor));
                return livros;
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao listar livros');
            });
    }

    salva(dado) {
        let url = `${BASE_URL}/livros`;
        return this.httpService.post(url, dado)
            .then(resposta => {
                let livros = resposta.map((item) => new Livro(item.id, item.titulo, item.preco, item.autor));
                return livros;
            })
            .catch(erro => {
                console.log(erro);
                throw new Error('Erro ao salvar livro');
            });
    }
}

export default LivroService;