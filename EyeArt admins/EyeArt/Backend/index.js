// IMPORTAMOS ARCHIVOS JS

const carr = require("./carrito");
const categ = require("./categoria");
const city = require("./ciudad");
const factu = require("./factura");
const gestrol = require("./gestionroles");
const itemcar = require("./itemscarrito");
const metopago = require("./metodopago");
const pedido = require("./pedido");
const product = require("./producto");
const rol = require("./rol");
const doc = require("./tipodocumento");
const user = require("./usuario");
const login = require("./login");
const cors = require("cors");


const router = require('express').Router();
const checkToken = require("./midlewares");

//SWAGGER
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const mysql = require("mysql2");
conexion = mysql.createConnection({
  host: "monorail.proxy.rlwy.net",
  port: "57852",
  database: "eye",
  user: "root",
  password: "rLrPXjVruEJPvCgsvTDFzrgneDOctqFq",
});

const express = require("express");
const bodyParser = require("body-parser");
const { throws } = require("assert");
const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(bodyParser.json());
const PUERTO = 5200;

conexion.connect((error) => {
  if (error) throw error;
  console.log("Conexion a base de datos exitosa");
});

app.listen(PUERTO, () => {
  console.log("Servidor iniciado en el puerto: ", PUERTO);
});

// Swagger conf
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Creaciones E&E ART ",
      version: "0.1.0",
      description: "Esta API fue creada para la empresa E&E ART",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "E&E ART",
        url: "https://www.instagram.com/creacioneseeart?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      },
    },
    servers: [
      {
        url: "http://localhost:5200/apis",
      },
    ],
  },
  apis: ["./usuarioswagger.yaml"],
};
const specs = swaggerJsdoc(options);
app.use("/apis", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

// LLAMAMOS FUCNIONES DE LOS JS CON END POINTS

carr.RegisterCarrito(app);
categ.RegisterCategoria(app);
city.RegisterCiudad(app);
factu.RegisterFactura(app);
gestrol.RegisterGestionRoles(app);
itemcar.RegisterItemsCarrito(app);
metopago.RegisterMetodoPago(app);
pedido.RegisterPedido(app);
product.RegisterProducto(app);
rol.RegisterRol(app);
doc.RegisterTipoDocumento(app);
user.Register(app);
login.RegisterLogin(app);
