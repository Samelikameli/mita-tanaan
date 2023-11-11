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


const homes = [
    {
        name: "Lauttasaari",
        latitude: 60.157236,
        longitude: 24.862941
    },
    {
        name: "Kamppi",
        latitude: 60.1699,
        longitude: 24.9326
    },
    {
        name: "Kallio",
        latitude: 60.1820,
        longitude: 24.9493
    },
    {
        name: "Töölö",
        latitude: 60.1920,
        longitude: 24.9161
    },
    {
        name: "Sörnäinen",
        latitude: 60.1872,
        longitude: 24.9617
    },
    {
        name: "Pasila",
        latitude: 60.1988,
        longitude: 24.9322
    },
    {
        name: "Käpylä",
        latitude: 60.2100,
        longitude: 24.9562
    },
    {
        name: "Malmi",
        latitude: 60.2512,
        longitude: 25.0056
    },
    {
        name: "Herttoniemi",
        latitude: 60.1943,
        longitude: 25.0296
    },
    {
        name: "Kontula",
        latitude: 60.2374,
        longitude: 25.0830
    },
    {
        name: "Itäkeskus",
        latitude: 60.2093,
        longitude: 25.0830
    },
    {
        name: "Mellunmäki",
        latitude: 60.2299,
        longitude: 25.1131
    },
    {
        name: "Vuosaari",
        latitude: 60.2117,
        longitude: 25.1673
    },
    {
        name: "Kannelmäki",
        latitude: 60.2395,
        longitude: 24.8743
    },
    {
        name: "Pitäjänmäki",
        latitude: 60.2200,
        longitude: 24.8750
    },
    {
        name: "Malminkartano",
        latitude: 60.2512,
        longitude: 24.8799
    },
    {
        name: "Pohjois-Haaga",
        latitude: 60.2299,
        longitude: 24.8947
    },
    {
        name: "Huopalahti",
        latitude: 60.2221,
        longitude: 24.9051
    },
    {
        name: "Paloheinä",
        latitude: 60.2448,
        longitude: 24.9099
    },
    {
        name: "Oulunkylä",
        latitude: 60.2299,
        longitude: 24.9628
    },
    {
        name: "Pukinmäki",
        latitude: 60.2399,
        longitude: 24.9799
    },
    {
        name: "Tapanila",
        latitude: 60.2599,
        longitude: 24.9799
    },
    {
        name: "Puistola",
        latitude: 60.2599,
        longitude: 25.0299
    }
]

initializeApp()
setGlobalOptions({ region: 'europe-north1' })


async function nukeUsers() {
    const users = await admin.firestore().collection('users').get();
    for (const user of users.docs) {
        await user.ref.delete();
    }
    return;
}

async function createUsers() {
    const users = await admin.firestore().collection('users').get();
    for (const home of homes) {
        const user = {
            name: home.name,
            location: new admin.firestore.GeoPoint(home.latitude, home.longitude),
            avatar: "panda.jpg"
        }
        await admin.firestore().collection('users').add(user);
    }
    return;
}

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
    return;
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

    for (const user of users.docs) {
        const location = user.data().location;
        if (!location) {
            continue;
        }
        const distance = getDistanceFromLatLonInKm(userLocation.latitude, userLocation.longitude, location.latitude, location.longitude);
        console.log(distance + " " + user.data().name);
        if (distance < 5 && 'name' in user.data() && user.data().name !== username) {
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
    for (const user of users.docs) {
        const location = user.data().location;
        if (!location) {
            continue;
        }
        const distance = getDistanceFromLatLonInKm(userLocation.latitude, userLocation.longitude, location.latitude, location.longitude);
        if (distance < 5 && 'name' in user.data() && user.data().name !== username) {
            nearbyUsers.push(user.data());
        }
    }
    return nearbyUsers;
});


exports.nukeUsers = onRequest({ location: "europe-north1" }, async (request, response) => {
    await nukeUsers();
    response.status(200).send("OK");
});

exports.createUsers = onRequest({ location: "europe-north1" }, async (request, response) => {
    await createUsers();
    response.status(200).send("OK");
});

exports.resetPositions = onRequest({ location: "europe-north1" }, async (request, response) => {
    const users = await admin.firestore().collection('users').get();
    for (const user of users.docs) {
        for(home of homes){
            if(user.data().name === home.name){
                const data = {
                    location: new admin.firestore.GeoPoint(home.latitude, home.longitude)
                }
                await user.ref.update(data);
            }
        }
    }
    response.status(200).send("OK");
});

exports.moveUsers = onRequest({ location: "europe-north1" }, async (request, response) => {
    const longitude = Number(request.query.longitude);
    const latitude = Number(request.query.latitude);

    const steps = Number(request.query.steps)

    const users = await admin.firestore().collection('users').get();
    const userArray = [];
    for (const user of users.docs) {
        userArray.push({"data": user, "initialLocation": user.data().location});
    }

    for (var i = 1; i <= steps; i++){
        for (const user of userArray) {
            const dLat = (user.initialLocation.latitude - latitude)/steps;
            const dLon = (user.initialLocation.longitude - longitude)/steps;

            const data = {
                location: new admin.firestore.GeoPoint(user.initialLocation.latitude - dLat * i, user.initialLocation.longitude - dLon * i)
            }
            await user.data.ref.update(data);
        }
        // Wait 1 second
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    response.status(200).send(longitude + " " + latitude);
});