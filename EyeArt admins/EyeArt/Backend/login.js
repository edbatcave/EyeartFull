const moduleName = 'login';
const md5 = require("blueimp-md5");
const router = require('express').Router();
const jwt = require('jsonwebtoken');



function RegisterLogin(app){
// -- LISTAR USUARIO --

    app.post(`/${moduleName}`,(req, res) => {

        console.log('ejecutando query');
        const Correo = req.body.Correo;
        const Contrasena = md5(req.body.Contrasena);
        const query = 
        `SELECT a.idUsuario, 
        a.Nombre, a.Apellido, 
        a.NumeroDocumento , 
        a.Direccion, 
        a.Telefono, 
        a.Correo, 
        a.Contrasena,
        b.Descripcion as Documento,
        c.Descripcion as Ciudad,
        COALESCE(d.Descripcion, 'Cliente') as Rol
        FROM usuario a
        JOIN tipodocumento b ON a.TipoDocumento_idTipoDocumento = b.idTipoDocumento
        JOIN ciudad c ON a.Ciudad_idCiudad = c.idCiudad
        LEFT JOIN roles_usuarios r ON a.idUsuario = r.idUsuario
        LEFT JOIN rol d ON r.idRol = d.idRol
        WHERE a.Correo = '${Correo}' AND a.Contrasena = '${Contrasena}'
        ORDER BY a.idUsuario ASC;`
        conexion.query(query, (error, resultado) => {
            if(error) return console.error(error.message)
    
            if(resultado.length > 0) {
                const userData = resultado[0];
                const UserRol = userData.Rol;
                if(UserRol == 'Cliente'){
                    function createToken(userData){
                        const payload = {
                            user_id: userData.idUsuario,
                            user_nombre: userData.Nombre,
                            user_apellido: userData.Apellido,
                            user_correo: userData.Correo,
                            user_rol: userData.Rol,
                        }
                        return jwt.sign(payload, 'Cliente verificado EYEART');
                    }
                    }else if(UserRol == 'Administrador'){
                        function createToken(userData){
                            const payload = {
                                user_id: userData.idUsuario,
                                user_nombre: userData.Nombre,
                                user_apellido: userData.Apellido,
                                user_correo: userData.Correo,
                                user_rol: userData.Rol,
                            }
                            return jwt.sign(payload, 'Administrador verificado EYEART');
                        }
                    }
                res.json(
                {
                    success: 'Login Correcto', token: createToken(userData)
                })
                console.log(resultado);
                console.log('Exitoso');
                

            }else{
                res.json('No hay registros')
                console.log('Error en el Correo/Contraseña')
            }
            });

        }        
    )


}

    module.exports = {RegisterLogin};