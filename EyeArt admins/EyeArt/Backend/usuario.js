const moduleName = "usuario"
const md5 = require("blueimp-md5");
const router = require('express').Router();
const jwt = require('jsonwebtoken');

// -- LISTAR USUARIO --
function Register(app){
    app.get(`/${moduleName}`, (req, res) => {
        console.log('ejecutando query');
        const query = `SELECT a.idUsuario, a.Nombre, a.Apellido, a.NumeroDocumento , a.Direccion, a.Telefono, a.Correo, a.Contrasena,
        b.Descripcion as Documento, c.Descripcion as Ciudad
        FROM ${moduleName} a , tipodocumento b 
        JOIN ciudad c
        WHERE a.Ciudad_idCiudad = c.idCiudad  AND a.TipoDocumento_idTipoDocumento = b.idTipoDocumento
        ORDER BY idUsuario asc;  `
        conexion.query(query, (error, resultado) => {
            if(error) return console.error(error.message)
    
            if(resultado.length > 0) {
                res.json(resultado)
                console.log(resultado); 
            }else{
                res.json('No hay registros')
            }
            });
    })
    
// -- LISTAR MEDIANTE ID --
    app.get(`/${moduleName}/:id`,(req,res)=>{
        const {id} = req.params;
        const query = `SELECT * FROM ${moduleName} 
        WHERE idUsuario=${id}; `;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            if(resultado.length > 0){
                console.log(resultado); 
            res.json(resultado);
            }else{
                res.json('No hay registros con ese ID')
            }
        })
    })

// -- AGREGAR USUARIO --
app.post(`/${moduleName}/agregar`,(req,res)=>{
        
    const usuario = {
        Nombre: req.body.Nombre, 
        Apellido: req.body.Apellido,
        NumeroDocumento: req.body.NumeroDocumento,
        Direccion: req.body.Direccion,
        Telefono: req.body.Telefono,
        Correo: req.body.Correo,
        Contrasena: md5(req.body.Contrasena),
        TipoDocumento_idTipoDocumento: req.body.TipoDocumento_idTipoDocumento,
        Ciudad_idCiudad: req.body.Ciudad_idCiudad,
    }
    const query = `INSERT INTO ${moduleName} SET ?`;
    conexion.query(query, usuario, (error, resultado)=>{
        if(error) return console.error(error.message)

        res.json(`Se ha insertado correctamente`)
    })
})

// -- ACTUALIZAR USUARIO --
    app.put(`/${moduleName}/editar/:id`,(req,res)=>{
        const {id} = req.params;
        const {Nombre,Apellido,NumeroDocumento,Direccion,Telefono,Correo,Contrasena,TipoDocumento_idTipoDocumento,Ciudad_idCiudad} = req.body;
        const query = `UPDATE ${moduleName} SET Nombre = '${Nombre}',Apellido = '${Apellido}' ,NumeroDocumento = '${NumeroDocumento}' ,Direccion = '${Direccion}' ,Telefono = '${Telefono}',
        Correo = '${Correo}' ,Contrasena = '${Contrasena}' ,TipoDocumento_idTipoDocumento = '${TipoDocumento_idTipoDocumento}' ,Ciudad_idCiudad = '${Ciudad_idCiudad}' WHERE idUsuario=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)   
    
            res.json(`Se ha Actualizado correctamente`)
        })
    })

// -- ELIMINAR USUARIO --
    app.delete(`/${moduleName}/borrar/:id`,(req,res)=>{
        const {id} = req.params;
        const query = `DELETE FROM ${moduleName} WHERE idUsuario=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            res.json(`Se ha Eliminado correctamente`)
        });
    });

}





module.exports = {Register};
