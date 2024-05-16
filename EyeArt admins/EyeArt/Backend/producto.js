const moduleName = "producto"

// --LISTAR PRODUCTO --
function RegisterProducto(app){
    app.get(`/${moduleName}`, (req, res) => {
        console.log('ejecutando query');
        const query = `SELECT a.idProducto , a.Nombre, a.DescripcionProducto, 
        a.Precio, a.Stock, a.url_foto ,b.Descripcion 
        FROM ${moduleName} a , categoria b
        WHERE a.Categoria_idCategoria = b.idCategoria
        ORDER BY idProducto asc;`
        conexion.query(query, (error, resultado) => {
            if(error) return console.error(error.message)
    
            if(resultado.length > 0) {
                res.json(resultado)
            }else{
                res.json('No hay registros')
            }
            });
    })
    
// --LISTAR PRODUCTOS ALEATORIOS --
    app.get(`/${moduleName}/limited`, (req, res) => {
        console.log('ejecutando query');
        const query = `SELECT a.idProducto , a.Nombre, a.DescripcionProducto, 
        a.Precio, a.Stock, a.url_foto ,b.Descripcion 
        FROM ${moduleName} a , categoria b
        WHERE a.Categoria_idCategoria = b.idCategoria
        ORDER BY RAND() LIMIT 3;`
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
        const query = `SELECT * FROM ${moduleName} WHERE idProducto=${id}`;
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

// -- AGREGAR PRODUCTO --
    app.post(`/${moduleName}/agregar`,(req,res)=>{
        
        const producto = {
            Nombre: req.body.Nombre,
            DescripcionProducto: req.body.DescripcionProducto,
            Precio: req.body.Precio,
            Stock: req.body.Stock,
            Categoria_idCategoria: req.body.Categoria_idCategoria
            
        }
        const query = `INSERT INTO ${moduleName} SET ?`;
        conexion.query(query, producto, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            res.json(`Se ha insertado correctamente`)
        })
    })

// -- ACTUALIZAR PRODUCTO --
    app.put(`/${moduleName}/editar/:id`,(req,res)=>{
        const {id} = req.params;
        const {Nombre, DescripcionProducto,Precio,Stock,Categoria_idCategoria} = req.body;
        const query = `UPDATE ${moduleName} SET Nombre = '${Nombre}', DescripcionProducto = '${DescripcionProducto}' , Precio = '${Precio}',
        Stock = '${Stock}' , Categoria_idCategoria = '${Categoria_idCategoria}' WHERE idProducto=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)   
    
            res.json(`Se ha Actualizado correctamente`)
        })
    })

// -- ELIMINAR PRODUCTO --
    app.delete(`/${moduleName}/borrar/:id`,(req,res)=>{
        const {id} = req.params;
        const query = `DELETE FROM ${moduleName} WHERE idProducto=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            res.json(`Se ha eliminado correctamente`)
        })
    })
}


module.exports = {RegisterProducto};
