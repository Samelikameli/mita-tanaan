/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require('firebase-functions/v2');

const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");
const { initializeApp } = require("firebase-admin/app");
const admin = require('firebase-admin');


initializeApp()
setGlobalOptions({ region: 'europe-north1' })


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

exports.onUserWrite = onDocumentWritten({ document: "users/{userId}", location: "europe-north1" }, async (event) => {
    const userId = event.params.userId;
    const userData = event.data.after.data();
    logger.info(`User ${userId} updated: ${JSON.stringify(userData)}`);



    logger.info(`Getting nearby users for ${userId}`);
    const userRef = admin.firestore().collection('users').doc(userId);
    const user = await userRef.get();
    const userLocation = user.data().location;
    const username = user.data().name;


    const users = await admin.firestore().collection('users').get();
    const nearbyUsers = [];
    
    for(const user of users.docs) {
        const location = user.data().location;
        if (!location) {
            continue;
        }
        const distance = getDistanceFromLatLonInKm(userLocation.latitude, userLocation.longitude, location.latitude, location.longitude);
        console.log(distance + " " + user.data().name);
        if(distance < 5 && 'name' in user.data() &&  user.data().name !== username) {
            nearbyUsers.push(user.data());
        }
    }
    console.log(nearbyUsers);
}
);


exports.getNearbyUsers = onRequest({ location: "europe-north1" }, async (request, response) => {
    const userId = request.query.userId;
    logger.info(`Getting nearby users for ${userId}`);
    const userRef = admin.firestore().collection('users').doc(userId);
    const user = await userRef.get();
    const userLocation = user.data().location;
    const username = user.data().name;

    const users = await admin.firestore().collection('users').get();
    const nearbyUsers = [];
    for(const user of users.docs) {
        const location = user.data().location;
        if (!location) {
            continue;
        }
        const distance = getDistanceFromLatLonInKm(userLocation.latitude, userLocation.longitude, location.latitude, location.longitude);
        if(distance < 5 && 'name' in user.data() && user.data().name !== username) {
            nearbyUsers.push(user.data());
        }
    }
    return nearbyUsers;
});