import {Router} from 'express';
import {authcontroller} from './../controllers/Controller_auth';

//get metodo de enlistar
//post crear
//put metodo de editar
 class RouterAuth{ 
     public router: Router=Router();
     constructor(){
         this.config();
     } 
     config(): void{ 
         this.router.post('/', authcontroller.login); 
     }
 }

 const routerauth = new RouterAuth();
 export default routerauth.router;