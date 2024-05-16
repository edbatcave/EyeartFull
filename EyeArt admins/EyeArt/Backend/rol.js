const moduleName = "rol"


// -- LISTAR ROL --
function RegisterRol(app){
    app.get(`/${moduleName}`, (req, res) => {
        console.log('ejecutando query');
        const query = `SELECT * FROM ${moduleName}`
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
        const query = `SELECT * FROM ${moduleName} WHERE idRol=${id}`;
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

// -- AGREGAR ROL --
app.post(`/${moduleName}/agregar`,(req,res)=>{
        
    const rol = {
        Descripcion: req.body.Descripcion,
    }
    const query = `INSERT INTO ${moduleName} SET ?`;
    conexion.query(query, rol, (error, resultado)=>{
        if(error) return console.error(error.message)

        res.json(`Se ha insertado correctamente`)
    })
})

// -- ACTUALIZAR ROL --
    app.put(`/${moduleName}/editar/:id`,(req,res)=>{
        const {id} = req.params;
        const {Descripcion} = req.body;
        const query = `UPDATE ${moduleName} SET Descripcion = '${Descripcion}' WHERE idRol=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)   
    
            res.json(`Se ha Actualizado correctamente`)
        })
    })

// -- ELIMINAR ROL --
    app.delete(`/${moduleName}/borrar/:id`,(req,res)=>{
        const {id} = req.params;
        const query = `DELETE FROM ${moduleName} WHERE idRol=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            res.json(`Se ha eliminado correctamente`)
        })
    })
}




module.exports = {RegisterRol};