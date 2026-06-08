
const { MongoClient } = require("mongodb");

const uri = "TU_URI_MONGODB";

const client = new MongoClient(uri);

async function crearSchema() {

  try {

    await client.connect();

    console.log("MongoDB conectado");

    const db = client.db("portal_noticias");

    await db.createCollection("noticias", {

      validator: {

        $jsonSchema: {

          bsonType: "object",

          required: [
            "titulo",
            "contenido",
            "seccion",
            "estado",
            "autor",
            "metricas"
          ],

          properties: {

            titulo: {
              bsonType: "string"
            },

            contenido: {
              bsonType: "string"
            },

            seccion: {
              bsonType: "string"
            },

            estado: {
              enum: ["Publicado", "Borrador"]
            },

            fecha_publicacion: {
              bsonType: ["date", "null"]
            },

            autor: {
              bsonType: "object",

              required: ["nombre"],

              properties: {

                nombre: {
                  bsonType: "string"
                }

              }
            },

            tags: {
              bsonType: "array",

              items: {

                bsonType: "object",

                required: ["nombre"],

                properties: {

                  nombre: {
                    bsonType: "string"
                  }

                }

              }
            },

            metricas: {

              bsonType: "object",

              required: ["vistas", "comentarios"],

              properties: {

                vistas: {
                  bsonType: "int"
                },

                comentarios: {
                  bsonType: "int"
                }

              }

            }

          }

        }

      }

    });

    console.log("Colección creada");

    client.close();

  } catch (error) {

    console.log(error);

  }

}

crearSchema();