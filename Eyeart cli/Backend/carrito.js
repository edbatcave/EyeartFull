const moduleName = "carrito"


// -- LISTAR CARRITO --
function RegisterCarrito(app){
    app.get(`/${moduleName}`, (req, res) => {
        console.log('ejecutando query');
        const query = `SELECT a.idCarrito, CONCAT(b.Nombre, ' ' , b.Apellido) AS Nombre 
        FROM ${moduleName} a
        JOIN Usuario b
        WHERE a.Usuario_idUsuario = b.idUsuario
        ORDER BY idCarrito asc;`
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
        const query = `SELECT * FROM ${moduleName} a
        WHERE idCarrito = ${id};`;
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

    // -- AGREGAR CARRITO --
    app.post(`/${moduleName}/agregar`, (req, res) => {
        const carrito = {
            Usuario_idUsuario : req.body.Usuario_idUsuario
        }
    
        const query = `INSERT INTO ${moduleName} SET ?`
        conexion.query(query, carrito, (error) => {
            if(error) return console.error(error.message)
    
            res.json(`Se insertó correctamente`)
        })
    })

    // -- ACTUALIZAR CARRITO --
    app.put(`/${moduleName}/editar/:id`, (req, res) => {
        const { id } = req.params
        const {Usuario_idUsuario} = req.body
    
        const query = `UPDATE ${moduleName} SET Usuario_idUsuario='${Usuario_idUsuario}' WHERE idCarrito='${id}';`
        conexion.query(query, (error, resultado) => {
            if(error) return console.error(error.message)

                res.json(`Se actualizó correctamente`)
             
        })
    })


    // -- ELIMINAR CARRITO --
    app.delete(`/${moduleName}/borrar/:id`,(req,res) =>{
        const { id } = req.params;
        const query = `DELETE FROM ${moduleName} WHERE idCarrito=${id};`
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)

                res.json("Se elimino el registro correctamente")
         
        })
    })
}






module.exports = {RegisterCarrito};