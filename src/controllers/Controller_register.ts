import { Request, Response } from 'express';
import pool from '../database';
import md5 from 'md5';


class ControllerRegister {
    public async createUser(req: Request, res: Response):Promise<void> {
      const { nombre,usuarios,contrasena,telefono,correo,Estado } = req.body;
      if (!(nombre && usuarios && contrasena && telefono && correo && Estado )){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('INSERT INTO usuario(nombre,usuarios,contrasena,telefono,correo,Estado)VALUES(?,?,?,?,?,?)', [ nombre,usuarios,contrasena,telefono,correo,Estado ], (err, result) => {
        if(err) throw err;
        res.json({text: 'Usuario Creado'});
      });
    }
}

 export const controllerregister = new ControllerRegister;
