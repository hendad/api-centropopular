import {Router} from 'express';
import { controllerproducto } from './../controllers/Controller_productos';
import {chekjwt} from './../middlewares/jwt';
import { checkrole } from './../middlewares/roles';

class IndexRouterProductos {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/producto',[chekjwt, checkrole([1])],controllerproducto.getProducto);
        this.router.get('/producto/:id',[chekjwt, checkrole([1])],controllerproducto.getidProducto);
        this.router.post('/producto',[chekjwt, checkrole([1])], controllerproducto.createProducto);
        this.router.put('/producto/:id',[chekjwt, checkrole([1])], controllerproducto.updateProducto);
        this.router.delete('/producto/:id',[chekjwt, checkrole([1])], controllerproducto.deleteProducto);
        this.router.get('/categoria',[chekjwt, checkrole([1])], controllerproducto.getCategoria);
        this.router.get('/categoria/:id',[chekjwt, checkrole([1])],controllerproducto.getidCategoria);
        this.router.post('/categoria',[chekjwt, checkrole([1])], controllerproducto.createCategoria);
        this.router.put('/categoria/:id',[chekjwt, checkrole([1])], controllerproducto.updateCategoria);
        this.router.delete('/categoria/:id',[chekjwt, checkrole([1])], controllerproducto.deleteCategoria);
    }
}

const indexrouterproductos = new IndexRouterProductos();
export default indexrouterproductos.router;