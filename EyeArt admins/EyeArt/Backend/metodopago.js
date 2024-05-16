const moduleName = "metodopago"


// -- LISTAR METODO PAGO  --
function RegisterMetodoPago(app){
    app.get(`/${moduleName}`, (req, res) => {
        console.log('ejecutando query');
        const query = `SELECT * FROM ${moduleName} ORDER BY idMetodoPago asc`
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
        const query = `SELECT * FROM ${moduleName} WHERE idMetodoPago=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            if(resultado.length > 0) {
                res.json(resultado)
            }else{
                res.json('No hay registros con ese id')
            }
        })
    })

// -- AGREGAR METODO PAGO  --
app.post(`/${moduleName}/agregar`,(req,res)=>{
        
    const metodopago = {
        Descripcion: req.body.Descripcion
    }
    const query = `INSERT INTO ${moduleName} SET ?`;
    conexion.query(query, metodopago, (error, resultado)=>{
        if(error) return console.error(error.message)

        res.json(`Se ha insertado correctamente`)
    })
})

// -- ACTUALIZAR METODO PAGO  --
    app.put(`/${moduleName}/editar/:id`,(req,res)=>{
        const {id} = req.params;
        const {Descripcion} = req.body;
        const query = `UPDATE ${moduleName} SET Descripcion = '${Descripcion}' WHERE idMetodoPago=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)   
    
            res.json(`Se ha Actualizado correctamente`)
        })
    })

// -- ELIMINAR METODO PAGO --
    app.delete(`/${moduleName}/borrar/:id`,(req,res)=>{
        const {id} = req.params;
        const query = `DELETE FROM ${moduleName} WHERE idMetodoPago=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            res.json(`Se ha eliminado correctamente`)
        })
    })
}




module.exports = {RegisterMetodoPago};