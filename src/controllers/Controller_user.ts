import { Request, Response } from 'express';
import pool from '../database';
import md5 from 'md5';


class ControllerUser {
    //una respuesta sincronica con la base
    //public create(req: Request, res: Response){
      //  res.json({text: 'createuser'});
    //}

    //Roles
    public async listRol(req: Request, res: Response):Promise<void> {
      await pool.query('SELECT * FROM rol', (err, result) => {
        if(err) throw err;
        if(result.length){
          return res.json(result)
        }
        res.status(404).json({text: 'Roles no Encontrados'});
      });
    }

    public async getRol(req: Request, res: Response):Promise<void>{
      const { id } = req.params;
      await pool.query('SELECT * FROM rol  WHERE Id_rol = ?', [ id ], (err, result) => {
        if(err) throw err;
        if(result.length){
          return res.json(result)
        }
        res.status(404).json({text: 'Rol no existe'});
      });
    }
    public async createrol(req: Request, res: Response):Promise<void> {
      const {Tipo_rol,Descripcion,estado } = req.body;
      await pool.query('INSERT INTO rol(Tipo_rol,Descripcion,estado)VALUES(?, ?, ?)', [ Tipo_rol,Descripcion,estado ], (err, result) => {
        if(err) throw err;
        res.json({text: 'Rol Creado'});
      });
    }
    public async editRol(req: Request, res: Response):Promise<void>{
      const { Tipo_rol,Descripcion,estado } = req.body;
      const { id } = req.params;

      if (!(Tipo_rol && Descripcion && estado && id)){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('UPDATE rol SET Tipo_rol = ?, Descripcion = ?, estado = ? WHERE Id_rol = ?', [ Tipo_rol,Descripcion,estado, id ], (err, result) => {
        if(err) throw err;
        res.json({text: 'Rol editado'});
      });
    }
    public async deleteRol(req: Request, res: Response):Promise<void>{
      const { id } = req.params;

      if (!(id)){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('DELETE FROM rol WHERE Id_rol = ?', [ id ], (err, result) => {
        if(err) throw err;
        res.json({text: 'Rol eliminado'});
      });
    }
    //Usuarios
    public async listUser(req: Request, res: Response):Promise<void> {
      await pool.query('SELECT * FROM usuario', (err, result) => {
        if(err) throw err;
        if(result.length){
          return res.json(result)
        }
        res.status(404).json({text: 'Usuarios no Encontrados'});
      });
    }

    public async getUser(req: Request, res: Response):Promise<void>{
      const { id } = req.params;
      await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [ id ], (err, result) => {
        if(err) throw err;
        if(result.length){
          return res.json(result)
        }
        res.status(404).json({text: 'Usuario no existe'});
      });
    }
    public async createUser(req: Request, res: Response):Promise<void> {
      const { nombre,user,password,telefono,correo,Estado } = req.body;
      let pass = md5(password);
      if (!(nombre && user  && password && telefono && correo && Estado )){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('INSERT INTO usuario(nombre,user,password,telefono,correo,Estado)VALUES(?,?,?,?,?,?)', 
      [ nombre,user,pass,telefono,correo,Estado ], (err, result) => {
        if(err) throw err;
        res.json({text: 'Usuario Creado'});
      });
    }
    public async editUser(req: Request, res: Response):Promise<void>{
      const { nombre,user,password,telefono,correo,Estado } = req.body;
      const { id } = req.params;
      let pass = md5(password);
      if (!(nombre && user  && password && telefono && correo && Estado && id)){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('UPDATE usuario SET nombre = ? ,user = ? ,password = ?,telefono = ? ,correo = ? ,Estado = ? WHERE id_usuario = ?', 
      [ nombre,user,pass,telefono,correo,Estado, id ], (err, result) => {
        if(err) throw err;
        res.json({text: 'Usuario editado'});
      });
    }
    public async deleteUser(req: Request, res: Response):Promise<void>{
      const { id } = req.params;

      if (!(id)){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('DELETE FROM usuario WHERE id_usuario = ?', [ id ], (err, result) => {
        if(err) throw err;
        res.json({text: 'Usuario eliminado'});
      });
    }
    //Autentificacion
    public async listAuten(req: Request, res: Response):Promise<void> {
        await pool.query('SELECT * FROM autentificacion', (err, result) => {
          if (err) throw err;
          res.json(result);
        });
    }
    public async getAuten(req: Request, res: Response):Promise<void>{
      const { id } = req.params;
      await pool.query('SELECT * FROM autentificacion  WHERE idAutenticacion = ?', [ id ], (err, result) => {
        if(err) throw err;
        if(result.length){
          return res.json(result)
        }
        res.status(404).json({text: 'No autentificado' });
      });
    }
    public async createAuten(req: Request, res: Response):Promise<void> {
      const { usuario, contrasena, Usuarios_idUsuarios, Roles_idRoles } = req.body;
      let pass = md5(contrasena);
      if(!(usuario && contrasena && Usuarios_idUsuarios && Roles_idRoles)){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('INSERT INTO autentificacion(usuario,contrasena, Usuarios_idUsuarios, Roles_idRoles)VALUES( ?, ?, ?,?)', [ usuario,pass, Usuarios_idUsuarios, Roles_idRoles ], (err, result) => {
        if(err) throw err;
        res.json({text: 'Autenticacion Creada'});
      });
    }
    public async editAuten(req: Request, res: Response):Promise<void>{
      const { usuario,contrasena, Usuarios_idUsuarios, Roles_idRoles } = req.body;
      const { id } = req.params;
      let pass = md5(contrasena);
      if (!(usuario && contrasena && Usuarios_idUsuarios && Roles_idRoles && id)){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('UPDATE autentificacion SET usuario = ?, contrasena = ?, Usuarios_idUsuarios =?, Roles_idRoles =? WHERE idAutenticacion = ?', [  usuario, pass, Usuarios_idUsuarios, Roles_idRoles, id ], (err, result) => {
        if(err) throw err;
        res.json({text: 'Autenficicacion editada'});
      });
    }
    public async deleteAuten(req: Request, res: Response):Promise<void>{
      const { id } = req.params;

      if (!(id)){
        res.status(404).json({message: 'Campos Requeridos'});
      }
      await pool.query('DELETE FROM autentificacion WHERE idAutenticacion = ?', [ id ], (err, result) => {
        if(err) throw err;
        res.json({text: 'Autentificacion eliminado'});
      });
    }
}

 export const controlleruser= new ControllerUser;
