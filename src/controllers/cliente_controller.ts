import { Request, Response } from 'express';
import pool from '../database';

class ControllerCliente {

    //NEGOCIO
    public async getCliente(req: Request, res: Response):Promise<void>{
        await pool.query('SELECT * FROM cliente', (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
            res.status(404).json({text: 'Clientes no Encontrados'});
          });
    }

    public async getIdCliente(req: Request, res: Response):Promise<void>{
        const { id } = req.params;
        await pool.query('SELECT * FROM cliente WHERE id_Cliente = ?', [ id ], (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
            res.status(404).json({text: 'Cliente no Existe'});
        });
    }

    public async createCliente(req: Request, res: Response):Promise<void>{
        const { nombre,identificacion,direccion,telefono,correo } = req.body;
        await pool.query('INSERT INTO cliente(nombre,identificacion,direccion,telefono,correo)VALUES(?,?,?,?,?)', 
        [nombre,identificacion,direccion,telefono,correo], (err, result) => {
          if(err) throw err;
          res.json({text: 'cliente Creado'});
        });
    }

    public async updateCliente(req: Request, res: Response): Promise<void> {
        const { nombre,identificacion,direccion,telefono,correo} = req.body;
        const { id } = req.params;
        await pool.query('UPDATE cliente SET nombre = ?, identificacion = ?, direccion = ?, telefono = ?, correo = ? WHERE id_Cliente = ?',
        [nombre,identificacion,direccion,telefono,correo,id],(err, result) => {
          if(err) throw err;
          res.json({text: 'Cliente Creado'});
        });
    }
    public async deleteCliente(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        if (!(id)){
            res.status(404).json({ message: 'Campos Requeridos' });
        }
        await pool.query('DELETE FROM cliente WHERE id_Cliente = ?;', [id], (err, result) => {
            if (err) throw err;
            res.json({ text: 'Cliente eliminado' });
        });
    }

}

export const Controllercliente = new ControllerCliente;