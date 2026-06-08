const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.json());

const uri = "TU_URI_MONGODB";

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


// ENDPOINT  http://localhost:3000/noticias/top
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

    let html = `
    <h1>Top 10 Noticias Más Leídas</h1>
  `;

  resultado.forEach(noticia => {

    html += `
      <hr>
      <h2>${noticia.titulo}</h2>
      <p><strong>Autor:</strong> ${noticia.autor.nombre}</p>
      <p><strong>Sección:</strong> ${noticia.seccion}</p>
      <p><strong>Vistas:</strong> ${noticia.metricas.vistas}</p>
      <p>${noticia.contenido}</p>
    `;

  });

  res.send(html);
});


// ENDPOINT 2 http://localhost:3000/noticias/seccion/Econom%C3%ADa
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

    let html = `
    <h1>Noticias de la sección: ${req.params.seccion}</h1>
    <p>Página ${pagina}</p>
  `;

  resultado.forEach(noticia => {
    html += `
      <hr>
      <h2>${noticia.titulo}</h2>
      <p><strong>Autor:</strong> ${noticia.autor.nombre}</p>
      <p><strong>Sección:</strong> ${noticia.seccion}</p>
      <p><strong>Fecha:</strong> ${noticia.fecha_publicacion}</p>
      <p><strong>Vistas:</strong> ${noticia.metricas.vistas}</p>
    `;
  });

  res.send(html);
});


// ENDPOINT 3 http://localhost:3000/noticias/buscar?q=econom%C3%ADa
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

    let html = `
    <h1>Resultados de búsqueda</h1>
    <p><strong>Término:</strong> ${busqueda}</p>
  `;

  resultado.forEach(noticia => {

    html += `
      <hr>
      <h2>${noticia.titulo}</h2>

      <p><strong>Autor:</strong> ${noticia.autor.nombre}</p>

      <p><strong>Sección:</strong> ${noticia.seccion}</p>

      <p><strong>Fecha:</strong> ${noticia.fecha_publicacion}</p>

      <p><strong>Vistas:</strong> ${noticia.metricas.vistas}</p>

      <p>${noticia.contenido}</p>
    `;

  });

  res.send(html);
});


// ENDPOINT 4 http://localhost:3000/noticias/autor/Mar%C3%ADa%20G%C3%B3mez
app.get("/noticias/autor/:autor", async (req, res) => {

  const resultado = await noticias.find({
    "autor.nombre": req.params.autor
  })
  .toArray();

  let html = `
    <h1>Noticias de ${req.params.autor}</h1>
  `;

  resultado.forEach(noticia => {

    html += `
      <hr>

      <h2>${noticia.titulo}</h2>

      <p><strong>Autor:</strong> ${noticia.autor.nombre}</p>

      <p><strong>Sección:</strong> ${noticia.seccion}</p>

      <p><strong>Estado:</strong> ${noticia.estado}</p>

      <p><strong>Fecha:</strong> ${
        noticia.fecha_publicacion
          ? noticia.fecha_publicacion
          : "Sin publicar"
      }</p>

      <p><strong>Vistas:</strong> ${noticia.metricas.vistas}</p>

      <p><strong>Comentarios:</strong> ${noticia.metricas.comentarios}</p>

      <p>${noticia.contenido}</p>
    `;

  });

  res.send(html);

});


app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});