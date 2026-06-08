
##DESCRIPCIÓN DEL PROBLEMA
El problema que se presenta es que el canal de noticias digitales, ubicado en la República Dominicana, no tiene actualmente una manera eficiente y rápida de consultar las noticias, tanto para los lectores como para los editores y/o periodistas. Estos necesitan realizar búsquedas de distintos tipos, por clasificaciones y las 10 noticias más leídas del mes (top noticias del mes), además de la necesidad de búsquedas más rápidas que presentan. Actualmente no disponen de las opciones mencionadas, por lo que puede resultar agotador y mucho trabajo, tanto para los usuarios como para los editores y/o periodistas, encontrar una noticia específica. Usar el portal tal cual como se describe actualmente resulta en una mala experiencia para los usuarios y puede provocar la pérdida de lectores. 
La propuesta consiste en la implementación de una solución basada MongoDB, un motor documental NoSQL que permite almacenar las noticias en un documento BSON. Estas noticias para ser almacenadas deben cumplir con las reglas de validación que fueron definidas en el JSON Schema. Se definieron las consultas que satisfacen las principales necesidades del negocio y de los usuarios y se utilizaron índices para optimizar las peticiones.
El resultado esperado de implementar la solución es la mejora de la velocidad y eficiencia de las consultas y por lo tanto la experiencia de usuarios. Además, se espera que con esta implementación el número de lectores aumente y que los patrocinios incrementen gradualmente. 


##STACK UTILIZADO
- Node.js
- Express.js
- MongoDB Atlas

##CÓMO EJECUTAR EL PROYECTO

###Clonar repositorio

```bash
git clone https://github.com/Jannada/portal-noticias-api.git
cd portal-noticias-api

###instalar dependencias 
npm install

###Reemplazar la cadena de conexión
Reemplazar const uri = "TU_URI_MONGODB"; por tu propia cadena de conexión de ATLAS.

###Crear SCHEMA
node schema.js

###Crear indices 
node indexes.js

###Insertar datos de prueba
node seed.js

###Ejecutar API
node app.js
Si todo funciona correctamente aparecerá:

Servidor en puerto 3000
MongoDB conectado

##Endpoints

Top 10 noticias

GET /noticias/top

Buscar noticias

GET /noticias/buscar?q=economia

Noticias por sección

GET /noticias/seccion/Economía

Noticias por autor

GET /noticias/autor/María Gómez


## Arquitectura de la mini-app

La mini-aplicación sigue una arquitectura de cliente-servidor donde el usuario realiza peticiones desde un navegador o desde Postman hacia la API. Esta fue desarrollada utilizando Express.js. Esta API recibe las solicitudes y ejecuta las consultas correspondientes sobre MongoDB Atlas usando el MongoDB Driver de Node.js.

La base de datos utilizada es `portal_noticias` y la colección principal es `noticias`, donde se almacenan los artículos del periódico digital.

## Justificación de la arquitectura

Se utilizó Express para construir una API REST sencilla con el objetivo de verificar las funcionalidades principales del CMS las cuales son:
•	Búsqueda de noticias.
•	Listado por sección.
•	Búsqyeda full-text.
•	Top 10 noticias.
MongoDB Atlas fue seleccionado por su flexibilidad y la inclusión de subdocumentos anidados como se ve en “autor”, “métricas” y “tags”.
Express recibe las peticiones realizadas y devuelve las respuestas, mientras que MongoDB Atlas almacena la información y también la consulta.
