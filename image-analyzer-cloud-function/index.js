'use strict';

const storage = require('@google-cloud/storage')();
const vision = require('@google-cloud/vision');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

exports.AnalyzeImage = (event, context) => {
    console.log(event);
    console.log(context);

    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    client.labelDetection(`gs://${event.bucket}/${event.name}`)
    .then(results => {
        const labels = results[0].labelAnnotations;

        var docRef = admin.firestore().collection('images').doc(context.eventId);

        var setAda = docRef.set({
            name: event.name,
            labels: labels
        });
  
        console.log('Labels:');
        labels.forEach(label => console.log(label.description));
    }).catch(err => {
        console.error('ERROR.', err);
    });
};