import {Router} from 'express';
import { Controllercliente} from './../controllers/cliente_controller';
import {chekjwt} from './../middlewares/jwt';
import { checkrole } from './../middlewares/roles';

class IndexRouterCliente {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    
    //seguridad para ver si esta autenticado o no el chekjwt, checkrole
    config(): void {
        this.router.get('/cliente',Controllercliente.getCliente);
        this.router.get('/cliente/:id',Controllercliente.getIdCliente);
        this.router.post('/cliente',[chekjwt, checkrole([1])], Controllercliente.createCliente);
        this.router.put('/cliente/:id',[chekjwt, checkrole([1])], Controllercliente.updateCliente);
        this.router.delete('/cliente/:id',[chekjwt, checkrole([1])], Controllercliente.deleteCliente);
    }
}

const indexrouterclientes = new IndexRouterCliente();
export default indexrouterclientes.router;