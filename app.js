const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.json());

const uri = "Tu_URI_MONGODB";

const client = new MongoClient(uri, {
    tls: true
  });
  
// const client = new MongoClient(uri);

let noticias;

async function conectar() {
  await client.connect();

  const db = client.db("portal_noticias");

  noticias = db.collection("noticias");

  console.log("MongoDB conectado");
}

conectar();


// ENDPOINT 1
app.get("/noticias/top", async (req, res) => {

    const hoy = new Date();

    const inicioMes = new Date(
      hoy.getFullYear(),
      hoy.getMonth(),
      1
    );
  
    const inicioMesSiguiente = new Date(
      hoy.getFullYear(),
      hoy.getMonth() + 1,
      1
    );
  
    const resultado = await noticias.aggregate([
      {
        $match: {
          estado: "Publicado",
          fecha_publicacion: {
            $gte: inicioMes,
            $lt: inicioMesSiguiente
          }
        }
      },
      {
        $sort: {
          "metricas.vistas": -1
        }
      },
      {
        $limit: 10
      }
    ]).toArray();

  res.json(resultado);
});


// ENDPOINT 2
app.get("/noticias/seccion/:seccion", async (req, res) => {

    const pagina = Number(req.query.pagina) || 1;

    const limite = 10;
  
    const resultado = await noticias.find(
      {
        seccion: req.params.seccion,
        estado: "Publicado"
      },
      {
        projection: {
          titulo: 1,
          fecha_publicacion: 1,
          "autor.nombre": 1,
          seccion: 1,
          "metricas.vistas": 1
        }
      }
    )
    .sort({
      fecha_publicacion: -1
    })
    .skip((pagina - 1) * limite)
    .limit(limite)
    .toArray();

  res.json(resultado);
});


// ENDPOINT 3
app.get("/noticias/buscar", async (req, res) => {

    const busqueda = req.query.q;

    const resultado = await noticias.find({
        $text: {
        $search: busqueda
        },
        estado: "Publicado"
    })
    .sort({
        fecha_publicacion: -1
    })
    .toArray();

  res.json(resultado);
});


app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});