const moduleName = "itemscarrito"


// -- LISTAR ITEMS CARRITO --
function RegisterItemsCarrito(app){
    app.get(`/${moduleName}`, (req, res) => {
        console.log('ejecutando query');
        const query = `SELECT a.idItem, a.Cantidad, CONCAT(b.Nombre, ' ' ,B.Apellido) AS Usuario,
        c.Nombre, c.Precio , sum(c.Precio) * sum(a.Cantidad) AS Total,
        a.Carrito_idCarrito, a.Producto_idProducto
        FROM ${moduleName} a , Usuario b
        JOIN Producto c , carrito d
        WHERE d.Usuario_idUsuario = b.idUsuario AND
        a.Producto_idProducto = c.idProducto AND 
        a.Carrito_idCarrito = d.idCarrito 
        GROUP BY idItem
        ORDER BY Usuario;`
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
        const query = `SELECT a.idItem, a.Cantidad, CONCAT(b.Nombre, ' ' ,B.Apellido) AS Usuario,
        c.Nombre, c.Precio , sum(c.Precio) * sum(a.Cantidad) AS Total, a.Carrito_idCarrito, a.Producto_idProducto
        FROM ${moduleName} a , Usuario b
        JOIN Producto c , carrito d
        WHERE d.Usuario_idUsuario = b.idUsuario AND
        a.Producto_idProducto = c.idProducto AND 
        a.Carrito_idCarrito = d.idCarrito AND
        idItem = ${id};`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            if(resultado.length > 0){
                console.log(resultado); 
            res.json(resultado);
            }else{
                res.json('No hay registros con ese Carrito')
            }
        })
    })

// -- AGREGAR ITEMS CARRITO  --
app.post(`/${moduleName}/agregar`,(req,res)=>{
        
    const producto = {
        Cantidad: req.body.Cantidad,
        Carrito_idCarrito: req.body.Carrito_idCarrito,
        Producto_idProducto: req.body.Producto_idProducto,
    }
    const query = `INSERT INTO ${moduleName} SET ?`;
    conexion.query(query, producto, (error, resultado)=>{
        if(error) return console.error(error.message)

        console.log(`Se ha insertado correctamente`)
        res.json(`Se ha insertado correctamente`)
    })
})

// -- ACTUALIZAR ITEMS CARRITO  --
    app.put(`/${moduleName}/editar/:id`,(req,res)=>{
        const {id} = req.params;
        const {Cantidad, Producto_idProducto } = req.body;
        const query = `UPDATE ${moduleName} SET Cantidad = '${Cantidad}', Producto_idProducto = '${Producto_idProducto}'
                 WHERE idItem=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)   
    
            res.json(`Se ha Actualizado correctamente`)
        })
    })

// -- ELIMINAR ITEMS CARRITO  --
    app.delete(`/${moduleName}/borrar/:id`,(req,res)=>{
        const {id} = req.params;
        const query = `DELETE FROM ${moduleName} WHERE idItem=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            res.json(`Se ha Eliminado correctamente`)
        })
    })

}




module.exports = {RegisterItemsCarrito};