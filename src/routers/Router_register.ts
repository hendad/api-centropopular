import {Router} from 'express';
import { controllerregister } from './../controllers/Controller_register';

class RouterRegirter{
    public router: Router=Router();
    constructor() {
        this.config();
    }
    config(): void{
        this.router.post('/registar', controllerregister.createUser);
    }
}

const routerregirter = new RouterRegirter();
export default routerregirter.router;
