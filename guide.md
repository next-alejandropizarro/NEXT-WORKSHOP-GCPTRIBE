# Playing with managed services on GCP

## Prerrequisitos

### Herramientas y frameworks de desarrollo

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


### Loguearnos en Google Cloud con gcloud

Para poder interactuar con nuestro proyecto Google Cloud desde la linea de comandos, necesitaremos hacer login haciendo uso de gcloud.

```bash
gcloud init
```

### Crear un bucket de Google Cloud Storage

Para alojar las imágenes de la aplicación de ejemplo, vamos a crear un bucket de Google Cloud Storage en el cual alojaremos estas.

```bash
gsutil mb -c regional -l $GCP_REGION -p $PROJECT_ID gs://$BUCKET_NAME
```

## Entorno de desarrollo

### Ejecutar en local

```node
npm install
npm start
```

## Google Cloud Storage


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
    7. index.js y package.json: proporcionados en el repositorio.
    8. Function to execute: AnalyzeImage
4. Una vez introducida esta información, pulsaremos sobre "Create" para proceder a la creación de la función.
5. Una vez que Google nos avise de que esta ha sido creada, ya estará disponible para empezar a recibir peticiones.

## Google App Engine


## Google Vision API



## Google Firestore