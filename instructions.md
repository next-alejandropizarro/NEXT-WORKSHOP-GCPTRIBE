# Instrucciones de uso

## Prerrequisitos

### Herramientas y frameworks de desarrollo

* [Google Cloud SDK](https://cloud.google.com/sdk/install)
* [Node.js](https://nodejs.org/en/download/)

### Variables de entorno

```bash
export PROJECT_ID=<project_id>
export BUCKET_NAME=<bucket_name>
export GCP_REGION=europe-west1
```

### Loguearnos en Google Cloud con gcloud

```bash
gcloud init
```

### Crear un bucket de Google Cloud Storage

Para alojar las imágenes de la gallería, vamos a crear un bucket de Google Cloud Storage en el cual alojaremos estas.

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


