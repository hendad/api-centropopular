import {Router} from 'express';
import { controllernegocio} from '../controllers/Controller_negocio';
import {chekjwt} from '../middlewares/jwt';
import { checkrole } from '../middlewares/roles';

class IndexRouterNegocio {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    
    //seguridad para ver si esta autenticado o no el chekjwt, checkrole
    config(): void {
        this.router.get('/negocio',[chekjwt, checkrole([1])],controllernegocio.getNegocio);
        this.router.get('/negocio/:id',[chekjwt, checkrole([1])],controllernegocio.getIdNegocio);
        this.router.post('/negocio',[chekjwt, checkrole([1])], controllernegocio.createNegocio);
        this.router.put('/negocio/:id',[chekjwt, checkrole([1])], controllernegocio.updateNegocio);
        this.router.delete('/negocio/:id',[chekjwt, checkrole([1])], controllernegocio.deleteNegocio);
    }
}

const indexrouternegocio = new IndexRouterNegocio();
export default indexrouternegocio.router;