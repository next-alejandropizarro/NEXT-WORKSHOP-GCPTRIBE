# Playing with managed services on GCP

## Prerrequisitos

### Herramientas y frameworks de desarrollo

Opcional: Únicamente sería necesario si no se trabaja desde Cloud Shell.

Hemos de instalar si es que aún no lo tenemos las siguientes herramientas.

* [Google Cloud SDK](https://cloud.google.com/sdk/install)
* [Node.js](https://nodejs.org/en/download/)

### Variables de entorno

Hemos de establecer las siguientes variables de entorno.

```bash
export PROJECT_ID=<project_id>
export BUCKET_NAME=<bucket_name>
export GCP_REGION=<region>
```

Aquí se puede consultar la [lista de regiones](https://cloud.google.com/storage/docs/locations#available_locations) disponibles.

### Proyecto en Google Cloud

Para poder realizar este workshop, necesitaremos disponer de un proyecto de Google Cloud. Este nos será facilitado al comienzo del mismo.

Una vez que tengamos este proyecto habilitado, lo primero que haremos será habilitar las APIs de Google con las que vamos a trabajar.

Para ello iremos a "APIs & Services -> Dashboard" dentro de nuestro proyecto Google Cloud. Una vez aquí habilitaremos (si es que ya no lo están) las siguientes APIs.
 * Cloud Functions API
 * Cloud Vision API
 * Cloud Pub/Sub API
 * App Engine Admin API
 * Cloud Firestore API
 * Cloud Storage
 * Google Cloud Storage JSON API

## Entorno de desarrollo

### Ejecutar en local

```node
npm install
npm start
```

## Google Cloud Storage

Para alojar las imágenes de la aplicación de ejemplo, vamos a crear un bucket de Google Cloud Storage en el cual alojaremos estas.

Para ello, desde Cloud Shell, ejecutaremos el siguiente comando.

```bash
gsutil mb -c regional -l $GCP_REGION -p $PROJECT_ID gs://$BUCKET_NAME
```

Este bucket será usado en los pasos posteriores.

## Google Cloud Fuctions

Para procesar las imágenes que se suben a la aplicación, vamos a generar una Cloud Function. Esta función será la encargada de invocar al API de Vision de Google, analizar la imagen detectando las entidades que en ella se encuentran y almacenando dicha información en Google Cloud Firestore.

 1. Para crear la función, iremos hasta "Cloud Functions" dentro de nuestro proyecto en GCP.
 2. Una vez aquí, pulsaremos sobre "Create Function", ubicado en la parte superior.
 3. A continuación, introduciremos la siguiente información.
    1. Name: Nombre de la función a crear.
    2. Trigger: Cloud Storage
    3. Event type: Finalize/Create
    4. Bucket: Seleccionaremos el bucket que hemos creado previamente.
    5. Source code: Inline editor
    6. Runtime: Node.js 8
    7. Completar el código fuente usando los ficheros [index.js](image-analyzer-cf/index.js) y [package.json](image-analyzer-cf/package.json).
    8. Function to execute: AnalyzeImage
4. Una vez introducida esta información, pulsaremos sobre "Create" para proceder a la creación de la función.
5. Una vez que Google nos avise de que esta ha sido creada, ya estará disponible para empezar a recibir peticiones.

## Google Vision API

Para este workshop, haremos uso de la funcionalidad de [detección de etiquetas](https://cloud.google.com/vision/docs/labels) sobre imágenes, para poder categorizarlas de forma automática.

## Google App Engine

A través de estos pasos, crearemos y configuraremos una aplicación React de base en App Engine:

 1. Activar Cloud Shell
 2. Clonar aplicación React, como código base:
  	* Opcional. [React App](https://es.reactjs.org/docs/create-a-new-react-app.html)
 	* Código en feature/images-drawer-upload-image-step en directorio images-drawer-react
 3. npm install && npm start
 4. Vista previa web en el puerto 3000
 5. Crear fichero configuración App Engine Standard
 	* [App Engine Node.js](https://cloud.google.com/appengine/docs/standard/nodejs/config/appref)
 6. Desplegar aplicación: `gcloud app deploy`

## Firebase

Veamos como integrar Firebase con nuestro proyecto de React, para comunicar de manera sencilla, distintos servicios de almacenamiento o base de datos que ya hemos usado antes. Además, bucearemos en la documentación de la API, para interactuar con Cloud Storage y Cloud Firestore.

 1. Ir a la [consola](https://console.firebase.google.com) de Firebase
 2. Añadir proyecto
 3. Registrar aplicación
 4. Añadir SDK de Firebase en firebase/index.js y exportar variable storage.
 	* [Firebase Storage](https://firebase.google.com/docs/storage/web/upload-files?hl=es-419)
 5. Completar código src/components/ImageUpload.jsx, usando el método put, para subir la imágen al bucket. 
 6. Comprobar con rama feature/images-drawer-gallery-step.
 7. (Opcional). Usando el componente react-grid-gallery y firebase, listar las imágenes con sus etiquetas.