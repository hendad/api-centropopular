import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexrouteruser from './routers/Router_user';
import routerauth from './routers/Router_Auth';
import indexrouternegocio from './routers/Router_Negocio';
import indexrouterproductos from './routers/Router_Productos';
import routerregirter from './routers/Router_register';
import indexrouterclientes from './routers/Router_client';
import indexRouterproveedor from './routers/Router_Proveedores';

class Server {
    public app: Application;
    //constructor inicializo variable, exprees libreria para blackend 
    //dos metodos uno de tipo config y otro routes
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

//morgan para que me salgan los errores 
//port el puerto de iicializacion de la pp 
//cors las peticiones htttp 
//expressjson las peticiones json 
//expressurlencoded acceso libre d elas peticiones para q no restringa 
    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
//para rutiear las peticiones 
    routes(): void {
        this.app.use('/admin/sudo', indexrouteruser);
         this.app.use('/register', routerregirter);
        this.app.use('/auth',routerauth);
        this.app.use('/product', indexrouterproductos);
        this.app.use('/client', indexrouterclientes);
        this.app.use('/nego', indexrouternegocio);
        this.app.use('/provider', indexRouterproveedor);
    }
//inicializar la aplicacion con el puerto 
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

//Inicializar el nuevo servidor de la constante
const server = new Server();
server.start();
