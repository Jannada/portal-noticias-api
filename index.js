const { MongoClient } = require("mongodb");

const uri = "TU_URI_MONGODB";

const client = new MongoClient(uri);

async function crearIndices() {

  try {

    await client.connect();

    console.log("MongoDB conectado");

    const db = client.db("portal_noticias");

    const noticias = db.collection("noticias");

    // Índice full-text
    await noticias.createIndex({
      titulo: "text",
      contenido: "text"
    });

    // Índice para top noticias
    await noticias.createIndex({
      fecha_publicacion: 1,
      "metricas.vistas": -1
    });

    // Índice por sección
    await noticias.createIndex({
      seccion: 1
    });

    // Mostrar índices creados
    const indices = await noticias.indexes();

    console.log(indices);

    client.close();

  } catch (error) {

    console.log(error);

  }

}

crearIndices();

