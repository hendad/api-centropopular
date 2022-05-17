import {Router} from 'express';
import {controlleruser} from './../controllers/Controller_user';
import {chekjwt} from './../middlewares/jwt';
import {checkrole} from './../middlewares/roles';

//get metodo de enlistar
//post crear
//put metodo de editar
 class IndexRouteruser{
     public router: Router=Router();
     constructor(){
         this.config();
     } 
     config(): void{
         this.router.get('/rol',controlleruser.listRol);
         this.router.get('/rol/:id',controlleruser.getRol);
         this.router.post('/rol', controlleruser.createrol);
         this.router.put('/rol/:id', controlleruser.editRol);
         this.router.delete('/rol/:id', controlleruser.deleteRol);
         this.router.get('/usuarios',controlleruser.listUser);
         this.router.get('/usuarios/:id', controlleruser.getUser);
         this.router.post('/usuarios', controlleruser.createUser);
         this.router.put('/usuarios/:id', controlleruser.editUser);
         this.router.delete('/usuarios/:id', controlleruser.deleteUser);
         this.router.get('/auth', controlleruser.listAuten);
         this.router.get('/auth/:id', controlleruser.getAuten);
         this.router.post('/auth', controlleruser.createAuten);
         this.router.put('/auth/:id', controlleruser.editAuten);
         this.router.delete('/auth/:id', controlleruser.deleteAuten);
     }
 }

 const indexrouteruser = new IndexRouteruser();
 export default indexrouteruser.router;

