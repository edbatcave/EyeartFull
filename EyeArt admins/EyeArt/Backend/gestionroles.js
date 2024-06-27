const moduleName = "roles_usuarios"


// -- LISTAR GESTION ROLES --
function RegisterGestionRoles(app){
    app.get(`/${moduleName}`, (req, res) => {
        console.log('ejecutando query');
        const query = `SELECT a.idUsuario, b.Nombre, b.Apellido, 
        COALESCE(c.Descripcion, 'Cliente') as Rol 
        FROM eye.${moduleName} a  
        LEFT JOIN usuario b ON a.idUsuario = b.idUsuario 
        LEFT JOIN rol c ON a.idRol = c.idRol
        ORDER BY a.idUsuario;`
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
        const query = `SELECT a.idUsuario, b.Nombre, b.Apellido, 
        COALESCE(c.Descripcion, 'Cliente') as Rol 
        FROM eye.roles_usuarios a  
        LEFT JOIN usuario b ON a.idUsuario = b.idUsuario 
        LEFT JOIN rol c ON a.idRol = c.idRol WHERE a.idUsuario = ${Usuario_idUsuario}
        ORDER BY a.idUsuario;`;
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
        idUsuario: req.body.idUsuario,
        idRol: req.body.idRol
    }
    const query = `INSERT INTO ${moduleName} SET ?`;
    conexion.query(query, gestionroles, (error, resultado)=>{
        if(error) return console.error(error.message)

        res.json(`Se ha insertado correctamente`)
    })
})

// -- ACTUALIZAR GESTION ROLES --
    app.put(`/${moduleName}/editar/:Usuario_idUsuario`,(req,res)=>{
        const {idUsuario} = req.params;
        const {idRol} = req.body;
        const query = `UPDATE ${moduleName} SET Rol_idRol = '${idRol}' WHERE Usuario_idUsuario= ${idUsuario}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)   
    
            res.json(`Se ha Actualizado correctamente`)
        })
    })


// -- ELIMINAR GESTION ROLES --
    app.delete(`/${moduleName}/borrar/:Usuario_idUsuario`,(req,res)=>{
        const {idUsuario} = req.params;
        const query = `DELETE FROM ${moduleName} WHERE Usuario_idUsuario=${idUsuario}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            res.json(`Se ha eliminado correctamente`)
        })
    })
}




module.exports = {RegisterGestionRoles};
