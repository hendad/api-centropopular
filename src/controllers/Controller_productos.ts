import { Request, Response } from 'express';
import pool from '../database';

class ControllerProducto {
    //Producto
    //get
    public async getProducto(req: Request, res: Response):Promise<void> {
        await pool.query('SELECT * FROM producto', (err, result) => {
            if(err) throw err;
            if(result.length){
              return res.json(result)
            }
            res.status(404).json({text: 'Productos no Encontrados'});
          });
    }
    //getid
    public async getidProducto(req: Request, res: Response):Promise<void> {
        const { id } = req.params;
        await pool.query('SELECT* FROM productos WHERE idProductos = ?', [ id ], (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
        res.status(404).json({text: 'Rol no existe'});
      });
    }
    //create
    public async createProducto(req: Request, res: Response):Promise<void> {
        const { nombre, costo, talla, imagen, stock, idCategoria } = req.body;
        if (!(nombre && costo && talla && imagen && stock && idCategoria)){
            res.status(404).json({message: 'Campos Requeridos'});
          }
        await pool.query('INSERT INTO productos(nombre,costo,talla,imagen,stock,idCategoria)VALUES(?,?,?,?,?,?);', [ nombre,costo,talla,imagen,stock,idCategoria ], (err, result) => {
          if(err) throw err;
          res.json({text: 'Producto Creado'});
        });
    }
    //update
    public async updateProducto(req: Request, res: Response):Promise<void> {
        const { nombre, costo, talla, imagen, stock, idCategoria  } = req.body;
        const { id } = req.params;
  
        if (!(nombre && costo && talla && imagen && stock && idCategoria && id)){
          res.status(404).json({message: 'Campos Requeridos'});
        }
        await pool.query('UPDATE productos SET nombre = ?, costo = ?, talla = ?, imagen = ?, stock = ?, idCategoria = ? WHERE idProductos = ?;',
         [ nombre, costo, talla, imagen, stock, idCategoria, id ], (err, result) => {
          if(err) throw err;
          res.json({text: 'Producto editado'});
        });
    }
    //delete
    public async deleteProducto(req: Request, res: Response):Promise<void> {
        const { id } = req.params;

      if (!(id)){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('DELETE FROM productos WHERE idProductos = ?', [ id ], (err, result) => {
        if(err) throw err;
        res.json({text: 'Producto eliminado'});
      });
    }
    //Categoria
    //get
    public async getCategoria(req: Request, res: Response):Promise<void> {
      await pool.query('SELECT * FROM categoria', (err, result) => {
        if(err) throw err;
        if(result.length){
          return res.json(result)
        }
        res.status(404).json({text: 'categoria no existe'});
      });
    }
    //getid
    public async getidCategoria(req: Request, res: Response):Promise<void> {
      const { id } = req.params;
        await pool.query('SELECT * FROM categoria where idCategoria = ?', [ id ], (err, result) => {
            if(err) throw err;
            if(result.length){
                return res.json(result)
            }
        res.status(404).json({text: 'categoria no existe'});
      });
    }
    //create
    public async createCategoria(req: Request, res: Response):Promise<void> {
      const { Nombre,Descripcion } = req.body;
      if (!(Nombre && Descripcion )){
          res.status(404).json({message: 'Campos Requeridos'});
        }
      await pool.query('INSERT INTO categoria(Nombre,Descripcion) VALUES(?,?);', [ Nombre,Descripcion ], (err, result) => {
        if(err) throw err;
        res.json({text: 'Categoria Creada'});
      });
    }
    //update
    
    public async updateCategoria(req: Request, res: Response):Promise<void> {
      const { Nombre,Descripcion } = req.body;
      const { id } = req.params;

      if (!(Nombre && Descripcion && id)){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('UPDATE categoria SET Nombre = ?, Descripcion = ? WHERE idCategoria = ?;',
       [ Nombre,Descripcion, id ], (err, result) => {
        if(err) throw err;
        res.json({text: 'Categoria editada'});
      });
    }
    //delete
    public async deleteCategoria(req: Request, res: Response):Promise<void> {
      const { id } = req.params;

      if (!(id)){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('DELETE FROM categoria WHERE idCategoria = ?;', [ id ], (err, result) => {
        if(err) throw err;
        res.json({text: 'Categoria eliminada{}'});
      });
    }
 }

export const controllerproducto = new ControllerProducto;