const moduleName = "pedido"


// -- LISTAR PEDIDO --
function RegisterPedido(app){
    app.get(`/${moduleName}`, (req, res) => {
        console.log('ejecutando query');
        const query = `SELECT a.idPedido, CAST(Fecha AS CHAR(10)) AS Fecha, a.CodigoReferencia, a.Cantidad , a.Total, a.MetodoPago_idMetodoPago, b.Descripcion FROM ${moduleName} a 
        JOIN  metodopago b ON a.MetodoPago_idMetodoPago = b.idMetodoPago`
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
        const query = `SELECT a.idPedido, CAST(Fecha AS CHAR(10)) AS Fecha, a.CodigoReferencia, a.Cantidad , a.Total, a.MetodoPago_idMetodoPago, b.Descripcion FROM ${moduleName} a 
        JOIN  metodopago b ON a.MetodoPago_idMetodoPago = b.idMetodoPago  WHERE idPedido=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            if(resultado.length > 0) {
                res.json(resultado)
            }else{
                res.json('No hay registros con ese id')
            }
        })
    })

// -- AGREGAR PEDIDO --
app.post(`/${moduleName}/agregar`,(req,res)=>{
        
    const pedido = {
        Fecha: req.body.Fecha,
        CodigoReferencia: req.body.CodigoReferencia,
        Cantidad: req.body.Cantidad,
        Total: req.body.Total,
        Carrito_idCarrito: req.body.Carrito_idCarrito,
        MetodoPago_idMetodoPago: req.body.MetodoPago_idMetodoPago
    }
    const query = `INSERT INTO ${moduleName} SET ?`;
    conexion.query(query, pedido, (error, resultado)=>{
        if(error) return console.error(error.message)
        console.log(`Se ha insertado correctamente`)
        res.json(`Se ha insertado correctamente`)
    })
})

// -- ACTUALIZAR PEDIDO --
    app.put(`/${moduleName}/editar/:id`,(req,res)=>{
        const {id} = req.params;
        const {Fecha,  Cantidad, Total,  MetodoPago_idMetodoPago} = req.body;
        const query = `UPDATE ${moduleName} SET Fecha = '${Fecha}', Cantidad = '${Cantidad}',
        Total = '${Total}' , MetodoPago_idMetodoPago = '${MetodoPago_idMetodoPago}'     
        WHERE idPedido=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)   
                console.log(`Se ha Actualizado correctamente`);
            res.json(`Se ha Actualizado correctamente`);
        })
    })


// -- ELIMINAR PEDIDO --
    app.delete(`/${moduleName}/borrar/:id`,(req,res)=>{
        const {id} = req.params;
        const query = `DELETE FROM ${moduleName} WHERE idPedido=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
            console.log(`Se ha eliminado correctamente`);
            res.json(`Se ha eliminado correctamente`);
        })
    })
}




module.exports = {RegisterPedido};
