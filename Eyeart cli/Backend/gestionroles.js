const moduleName = "gestionroles"


// -- LISTAR GESTION ROLES --
function RegisterGestionRoles(app){
    app.get(`/${moduleName}`, (req, res) => {
        console.log('ejecutando query');
        const query = `SELECT a.Usuario_idUsuario, a.Rol_idRol, CONCAT(b.Nombre, ' ', b.Apellido) AS Nombre , c.Descripcion
        FROM ${moduleName} a , Usuario b
        JOIN Rol c
        WHERE  a.Usuario_idUsuario = b.idUsuario AND a.Rol_idRol = c.idRol 
        ORDER BY idUsuario asc;`
        conexion.query(query, (error, resultado) => {
            if(error) return console.error(error.message)
    
            if(resultado.length > 0) {
                res.json(resultado)
            }else{
                res.json('No hay registros')
            }
            });
    })
    
// -- LISTAR MEDIANTE ID --
    app.get(`/${moduleName}/:Usuario_idUsuario`,(req,res)=>{
        const {Usuario_idUsuario} = req.params;
        const query = `SELECT a.Usuario_idUsuario, a.Rol_idRol, CONCAT(b.Nombre, ' ', b.Apellido) AS Nombre
        FROM ${moduleName} a 
        JOIN Usuario b
        ON  a.Usuario_idUsuario = b.idUsuario
        WHERE Usuario_idUsuario = ${Usuario_idUsuario};`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            if(resultado.length > 0){
                console.log(resultado); 
            res.json(resultado);
            }else{
                res.json('No hay registros con ese usuario')
            }
        })
    })

// -- AGREGAR GESTION ROLES --
app.post(`/${moduleName}/agregar`,(req,res)=>{
        
    const gestionroles = {
        Usuario_idUsuario: req.body.Usuario_idUsuario,
        Rol_idRol: req.body.Rol_idRol
    }
    const query = `INSERT INTO ${moduleName} SET ?`;
    conexion.query(query, gestionroles, (error, resultado)=>{
        if(error) return console.error(error.message)

        res.json(`Se ha insertado correctamente`)
    })
})

// -- ACTUALIZAR GESTION ROLES --
    app.put(`/${moduleName}/editar/:Usuario_idUsuario`,(req,res)=>{
        const {Usuario_idUsuario} = req.params;
        const {Rol_idRol} = req.body;
        const query = `UPDATE ${moduleName} SET Rol_idRol = '${Rol_idRol}' WHERE Usuario_idUsuario= ${Usuario_idUsuario}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)   
    
            res.json(`Se ha Actualizado correctamente`)
        })
    })


// -- ELIMINAR GESTION ROLES --
    app.delete(`/${moduleName}/borrar/:Usuario_idUsuario`,(req,res)=>{
        const {Usuario_idUsuario} = req.params;
        const query = `DELETE FROM ${moduleName} WHERE Usuario_idUsuario=${Usuario_idUsuario}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            res.json(`Se ha eliminado correctamente`)
        })
    })
}




module.exports = {RegisterGestionRoles};