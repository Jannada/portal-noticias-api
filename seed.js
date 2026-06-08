const { MongoClient } = require("mongodb");

const uri = "TU_URI_MONGODB";
const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();
    console.log("MongoDB conectado");

    const db = client.db("portal_noticias");
    const noticias = db.collection("noticias");

    const noticiasBase = [
      {
        titulo: "Nueva reforma económica para 2026",
        contenido: "El gobierno anunció nuevas medidas para impulsar la economía nacional.",
        seccion: "Economía",
        estado: "Publicado",
        fecha_publicacion: new Date("2026-06-01"),
        autor: { nombre: "Juan Pérez" },
        tags: [{ nombre: "economía" }, { nombre: "gobierno" }],
        metricas: { vistas: 1250, comentarios: 45 }
      },
      {
        titulo: "La selección nacional gana torneo regional",
        contenido: "La selección obtuvo el campeonato tras una final muy disputada.",
        seccion: "Deportes",
        estado: "Publicado",
        fecha_publicacion: new Date("2026-06-02"),
        autor: { nombre: "Ana López" },
        tags: [{ nombre: "fútbol" }, { nombre: "selección" }],
        metricas: { vistas: 3400, comentarios: 120 }
      },
      {
        titulo: "Avances en inteligencia artificial",
        contenido: "Nuevas herramientas de inteligencia artificial llegan al mercado.",
        seccion: "Tecnología",
        estado: "Publicado",
        fecha_publicacion: new Date("2026-06-03"),
        autor: { nombre: "Carlos Ruiz" },
        tags: [{ nombre: "IA" }, { nombre: "tecnología" }],
        metricas: { vistas: 2100, comentarios: 60 }
      },
      {
        titulo: "Debate sobre reforma educativa",
        contenido: "Especialistas analizan los cambios propuestos para el sistema educativo.",
        seccion: "Educación",
        estado: "Publicado",
        fecha_publicacion: new Date("2026-06-04"),
        autor: { nombre: "María Gómez" },
        tags: [{ nombre: "educación" }],
        metricas: { vistas: 980, comentarios: 25 }
      },
      {
        titulo: "Mercados reaccionan a datos de inflación",
        contenido: "Los inversionistas siguen atentos a los indicadores económicos.",
        seccion: "Economía",
        estado: "Publicado",
        fecha_publicacion: new Date("2026-06-05"),
        autor: { nombre: "Juan Pérez" },
        tags: [{ nombre: "inflación" }, { nombre: "mercados" }],
        metricas: { vistas: 4200, comentarios: 150 }
      },
      {
        titulo: "Nuevo estadio será inaugurado este año",
        contenido: "Las autoridades deportivas confirmaron la fecha de apertura.",
        seccion: "Deportes",
        estado: "Publicado",
        fecha_publicacion: new Date("2026-06-06"),
        autor: { nombre: "Ana López" },
        tags: [{ nombre: "infraestructura" }],
        metricas: { vistas: 1700, comentarios: 30 }
      },
      {
        titulo: "Empresa tecnológica presenta nuevo dispositivo",
        contenido: "El producto incorpora funciones avanzadas de conectividad.",
        seccion: "Tecnología",
        estado: "Publicado",
        fecha_publicacion: new Date("2026-06-07"),
        autor: { nombre: "Carlos Ruiz" },
        tags: [{ nombre: "gadgets" }],
        metricas: { vistas: 2600, comentarios: 80 }
      },
      {
        titulo: "Análisis de las elecciones municipales",
        contenido: "Expertos evalúan los resultados y sus implicaciones.",
        seccion: "Política",
        estado: "Publicado",
        fecha_publicacion: new Date("2026-06-08"),
        autor: { nombre: "Laura Martínez" },
        tags: [{ nombre: "elecciones" }],
        metricas: { vistas: 3100, comentarios: 95 }
      },
      {
        titulo: "Proyecto de ley en revisión",
        contenido: "La comisión correspondiente estudia nuevas modificaciones.",
        seccion: "Política",
        estado: "Borrador",
        fecha_publicacion: null,
        autor: { nombre: "Laura Martínez" },
        tags: [{ nombre: "legislación" }],
        metricas: { vistas: 0, comentarios: 0 }
      },
      {
        titulo: "Tendencias digitales para empresas",
        contenido: "Las organizaciones adoptan nuevas estrategias tecnológicas.",
        seccion: "Tecnología",
        estado: "Publicado",
        fecha_publicacion: new Date("2026-06-09"),
        autor: { nombre: "Carlos Ruiz" },
        tags: [{ nombre: "transformación digital" }],
        metricas: { vistas: 1450, comentarios: 40 }
      },
      {
        titulo: "Preparativos para la temporada deportiva",
        contenido: "Los equipos intensifican sus entrenamientos.",
        seccion: "Deportes",
        estado: "Borrador",
        fecha_publicacion: null,
        autor: { nombre: "Ana López" },
        tags: [{ nombre: "pretemporada" }],
        metricas: { vistas: 0, comentarios: 0 }
      },
      {
        titulo: "Incremento en exportaciones nacionales",
        contenido: "Los datos muestran crecimiento sostenido durante el año.",
        seccion: "Economía",
        estado: "Publicado",
        fecha_publicacion: new Date("2026-06-10"),
        autor: { nombre: "Juan Pérez" },
        tags: [{ nombre: "exportaciones" }],
        metricas: { vistas: 2800, comentarios: 70 }
      },
      {
        titulo: "Universidades incorporan nuevas tecnologías",
        contenido: "Las instituciones educativas modernizan sus plataformas.",
        seccion: "Educación",
        estado: "Publicado",
        fecha_publicacion: new Date("2026-06-11"),
        autor: { nombre: "María Gómez" },
        tags: [{ nombre: "innovación" }],
        metricas: { vistas: 1100, comentarios: 20 }
      },
      {
        titulo: "Programa de becas en evaluación",
        contenido: "Las autoridades revisan los requisitos de acceso.",
        seccion: "Educación",
        estado: "Borrador",
        fecha_publicacion: null,
        autor: { nombre: "María Gómez" },
        tags: [{ nombre: "becas" }],
        metricas: { vistas: 0, comentarios: 0 }
      },
      {
        titulo: "Innovación y crecimiento económico",
        contenido: "La tecnología impulsa la productividad y la economía.",
        seccion: "Economía",
        estado: "Publicado",
        fecha_publicacion: new Date("2026-06-12"),
        autor: { nombre: "Juan Pérez" },
        tags: [{ nombre: "innovación" }, { nombre: "economía" }],
        metricas: { vistas: 5000, comentarios: 180 }
      }
    ];

    const secciones = ["Economía", "Deportes", "Tecnología", "Educación", "Política"];
    const autores = ["Juan Pérez", "Ana López", "Carlos Ruiz", "María Gómez", "Laura Martínez"];
    const tags = ["economía", "gobierno", "deportes", "tecnología", "educación", "política", "innovación"];

    const noticiasGeneradas = [];

    for (let i = 16; i <= 110; i++) {
      const esBorrador = i % 10 === 0;
      const seccion = secciones[i % secciones.length];

      noticiasGeneradas.push({
        titulo: `Noticia generada ${i} sobre ${seccion}`,
        contenido: `Contenido informativo de la noticia generada número ${i}, relacionada con la sección ${seccion}.`,
        seccion,
        estado: esBorrador ? "Borrador" : "Publicado",
        fecha_publicacion: esBorrador ? null : new Date(`2026-06-${((i - 1) % 28) + 1}`),
        autor: { nombre: autores[i % autores.length] },
        tags: [
          { nombre: tags[i % tags.length] },
          { nombre: seccion.toLowerCase() }
        ],
        metricas: {
          vistas: esBorrador ? 0 : Math.floor(Math.random() * 5000) + 100,
          comentarios: esBorrador ? 0 : Math.floor(Math.random() * 200)
        }
      });
    }

    await noticias.insertMany([...noticiasBase, ...noticiasGeneradas]);

    console.log("110 noticias insertadas correctamente");

  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

seed();