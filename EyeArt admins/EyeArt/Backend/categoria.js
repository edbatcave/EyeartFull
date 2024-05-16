const moduleName = "categoria"


// -- LISTAR CATEGORIA --
function RegisterCategoria(app){
    app.get(`/${moduleName}`, (req, res) => {
        console.log('ejecutando query');
        const query = `SELECT * FROM ${moduleName}`
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
    app.get(`/${moduleName}/:id`,(req,res)=>{
        const {id} = req.params;
        const query = `SELECT * FROM ${moduleName} WHERE idCategoria=${id}`;
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

// -- AGREGAR CATEGORIA --
app.post(`/${moduleName}/agregar`,(req,res)=>{
        
    const categoria = {
        Descripcion: req.body.Descripcion,
    }
    const query = `INSERT INTO ${moduleName} SET ?`;
    conexion.query(query, categoria, (error, resultado)=>{
        if(error) return console.error(error.message)

        res.json(`Se insertó correctamente`)

    })
})

// -- ACTUALIZAR CATEGORIA --
    app.put(`/${moduleName}/editar/:id`,(req,res)=>{
        const {id} = req.params;
        const {Descripcion} = req.body;
        const query = `UPDATE ${moduleName} SET Descripcion = '${Descripcion}' WHERE idCategoria=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)   
    
                console.log("Se ha actualizado correctamente"); 
                res.json("Se ha actualizado correctamente");
        
        })
    })


// -- ELIMINAR CATEGORIA --
    app.delete(`/${moduleName}/borrar/:id`,(req,res)=>{
        const {id} = req.params;
        const query = `DELETE FROM ${moduleName} WHERE idCategoria=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
        
                res.json('Se ha eliminado correctamente')
        })
    })
}




module.exports = {RegisterCategoria};