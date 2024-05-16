const moduleName = "factura"


// -- LISTAR FACTURA --
function RegisterFactura(app){
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
    app.get(`/${moduleName}/:cod`,(req,res)=>{
        const {cod} = req.params;
        const query = `SELECT * FROM ${moduleName} WHERE codReferencia=${cod}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            if(resultado.length > 0){
                console.log(resultado); 
            res.json(resultado);
            }else{
                res.json('No hay registros con ese Codigo de Referencia')
            }
        })
    })

// -- AGREGAR FACTURA --
    app.post(`/${moduleName}/agregar`,(req,res)=>{
            
        const factura = {
            Producto_idProducto: req.body.Producto_idProducto,
            Pedido_idPedido: req.body.Pedido_idPedido,
            Cantidad: req.body.Cantidad,
            CodReferencia: req.body.CodReferencia
        }
        const query = `INSERT INTO ${moduleName} SET ?`;
        conexion.query(query, factura, (error, resultado)=>{
            if(error) return console.error(error.message)

            res.json(`Se insertó correctamente`)
        })
    })

// -- ACTUALIZAR FACTURA --
    app.put(`/${moduleName}/editar/:CodReferencia`,(req,res)=>{
        const {CodReferencia} = req.params;
        const {Producto_idProducto, Pedido_idPedido, Cantidad} = req.body;
        const query = `UPDATE ${moduleName} SET Producto_idProducto = '${Producto_idProducto}', Pedido_idPedido = '${Pedido_idPedido}', 
            Cantidad = '${Cantidad}' WHERE CodReferencia = ${CodReferencia}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)   
    
            res.json("Se ha actualizado correctamente");
        })
    })


// -- ELIMINAR FACTURA --
    app.delete(`/${moduleName}/:CodReferencia`,(req,res)=>{
        const {CodReferencia} = req.params;
        const query = `DELETE FROM ${moduleName} WHERE CodReferencia=${CodReferencia}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            res.json("Se ha eliminado correctamente");
        })
    })
}



module.exports = {RegisterFactura};