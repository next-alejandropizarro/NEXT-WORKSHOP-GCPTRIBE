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



## Google App Engine


