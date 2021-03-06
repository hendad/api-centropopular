import { Request, Response } from 'express';
import pool from '../database';

class ControllerProveedores {

    //NEGOCIO
    public async getProveedores(req: Request, res: Response):Promise<void>{
        await pool.query('SELECT * FROM proveedores', (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
            res.status(404).json({text: 'Proveedores no Encontrados'});
          });
    }

    public async getIdProveedores(req: Request, res: Response):Promise<void>{
        const { id } = req.params;
        await pool.query('SELECT * FROM proveedores WHERE idProveedores = ?', [ id ], (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
            res.status(404).json({text: 'Proveedor no Existe'});
        });
    }

    public async createProveedores(req: Request, res: Response):Promise<void>{
        const { identificacion,nombre,direccion,telefono,email,estado,Cuenta_bancaria} = req.body;
        await pool.query('INSERT INTO proveedores(identificacion,nombre,direccion,telefono,email,estado,Cuenta_bancaria)VALUES(?,?,?,?,?,?,?)', 
        [ identificacion,nombre,direccion,telefono,email,estado,Cuenta_bancaria], (err, result) => {
          if(err) throw err;
          res.json({text: 'Proveedor Creado'});
        });
    }

    public async updateProveedores(req: Request, res: Response): Promise<void> {
        const { identificacion,nombre,direccion,telefono,email,estado,Cuenta_bancaria } = req.body;
        const { id } = req.params;
        await pool.query('UPDATE proveedores SET identificacion = ?, nombre = ?, direccion = ?, telefono = ?, email = ?, estado = ?, Cuenta_bancaria = ? WHERE idProveedores = ?',
        [identificacion,nombre,direccion,telefono,email,estado,Cuenta_bancaria,id],(err, result) => {
          if(err) throw err;
          res.json({text: 'Proveedor Actualizado'});
        });
    }
    public async deleteProveedores(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        if (!(id)){
            res.status(404).json({ message: 'Campos Requeridos' });
        }
        await pool.query('DELETE FROM proveedores WHERE idProveedores= ?;', [id], (err, result) => {
            if (err) throw err;
            res.json({ text: 'Proveedor eliminado' });
        });
    }

}

export const controllerproveedor = new ControllerProveedores;