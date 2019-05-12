'use strict';

const Vision = require('@google-cloud/vision');
const Firestore = require('@google-cloud/firestore');

exports.AnalyzeImage = (event, context) => {
    console.log(event);
    console.log(context);

    // Create a new client
    const firestore = new Firestore();
    const vision = new Vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    vision
        .labelDetection(`gs://${event.bucket}/${event.name}`)
        .then(results => {
            const labels = results[0].labelAnnotations;

            // Create a new empty document
            const document = firestore.doc(`images/${context.eventId}`);

            // Enter new data into the document
            document.set({
                name: event.name,
                labels: labels
            });
        }).catch(err => {
            console.error('ERROR.', err);
        });
};