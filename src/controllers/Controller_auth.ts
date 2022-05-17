import { Request, Response } from 'express';
import pool from '../database';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import md5 from 'md5';
//los controladores no necesitan inicializacion 
class AuthController {
    public async login(req: Request, res: Response):Promise<void> {
   //para recoger las variables de la aplicacion
        const {user, password}= req.body;
        let pass = md5(password);
        //si NO hay algo en estos valores de una respuesta
        if (!(user&&password)){
            res.status(404).json({message: 'Usuario y Contraseña es requerido'})
        }
        //signos de ? aperson sirven para dar valor 
        await pool.query('select * from login where user = ? and password = ?', [user, pass], (err, result) => {
          if (err) throw err;
          //SI HAY EL CAMPO PONGA EL OK 
          if (result.length){
              const token= jwt.sign({id_usuario: result[0].id_usuario,
                Id_rol: result[0].Id_rol, id_negocio: result[0].id_negocio}, config.jwtSecret,{expiresIn: '1h'});

              return res.json({message: 'OK', token, Id_rol: result[0].Id_rol,id_negocio: result[0].id_negocio})
          }
          res.status(404).json({text: 'Usuario no existe'});
        });
    }
}


export const authcontroller = new AuthController;