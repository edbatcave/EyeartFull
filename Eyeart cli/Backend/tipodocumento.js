const moduleName = "tipodocumento"


// -- LISTAR FACTURA --
function RegisterTipoDocumento(app){
    app.get(`/${moduleName}`, (req, res) => {
        console.log('ejecutando query');
        const query = `SELECT * FROM ${moduleName} ORDER BY idTipoDocumento asc`
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
        const query = `SELECT * FROM ${moduleName} WHERE idTipoDocumento=${id}`;
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

// -- AGREGAR FACTURA --
app.post(`/${moduleName}/agregar`,(req,res)=>{
        
    const tipodocumento = {
        Descripcion: req.body.Descripcion,
    }
    const query = `INSERT INTO ${moduleName} SET ?`;
    conexion.query(query, tipodocumento, (error, resultado)=>{
        if(error) return console.error(error.message)

        res.json(`Se ha insertado correctamente`)
    })
})

// -- ACTUALIZAR FACTURA --
    app.put(`/${moduleName}/editar/:id`,(req,res)=>{
        const {id} = req.params;
        const {Descripcion} = req.body;
        const query = `UPDATE ${moduleName} SET Descripcion = '${Descripcion}' WHERE idTipoDocumento=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)   
    
            res.json(`Se ha Actualizado correctamente`)
        })
    })

// -- ELIMINAR FACTURA --
    app.delete(`/${moduleName}/borrar/:id`,(req,res)=>{
        const {id} = req.params;
        const query = `DELETE FROM ${moduleName} WHERE idTipoDocumento=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            res.json(`Se ha Eliminado correctamente`)
        })
    })
}




module.exports = {RegisterTipoDocumento};