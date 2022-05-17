import {Router} from 'express';
import { controllerproveedor} from './../controllers/Controller_proveedor';
import {chekjwt} from './../middlewares/jwt';
import { checkrole } from './../middlewares/roles';

class IndexRouterProveedor {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    
    //seguridad para ver si esta autenticado o no el chekjwt, checkrole
    config(): void {
        this.router.get('/proveedor',[chekjwt, checkrole([1])],controllerproveedor.getProveedores);
        this.router.get('/proveedor/:id',[chekjwt, checkrole([1])],controllerproveedor.getIdProveedores);
        this.router.post('/proveedor',[chekjwt, checkrole([1])], controllerproveedor.createProveedores);
        this.router.put('/proveedor/:id',[chekjwt, checkrole([1])], controllerproveedor.updateProveedores);
        this.router.delete('/proveedor/:id',[chekjwt, checkrole([1])], controllerproveedor.deleteProveedores);
    }
}

const indexRouterproveedor = new IndexRouterProveedor();
export default indexRouterproveedor.router;