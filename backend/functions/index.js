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
        avatar: "dog",
        latitude: 60.157236,
        longitude: 24.862941
    },
    {
        name: "Kamppi",
        avatar: "bear",
        latitude: 60.1699,
        longitude: 24.9326
    },
    {
        name: "Kallio",
        avatar: "cat",
        latitude: 60.1820,
        longitude: 24.9493
    },
    {
        name: "Töölö",
        avatar: "fox",
        latitude: 60.1920,
        longitude: 24.9161
    },
    {
        name: "Sörnäinen",
        avatar: "koala",
        latitude: 60.1872,
        longitude: 24.9617
    },
    {
        name: "Pasila",
        avatar: "lion",
        latitude: 60.1988,
        longitude: 24.9322
    },
    {
        name: "Käpylä",
        avatar: "panda",
        latitude: 60.2100,
        longitude: 24.9562
    },
    {
        name: "Malmi",
        avatar: "pig",
        latitude: 60.2512,
        longitude: 25.0056
    },
    {
        name: "Herttoniemi",
        avatar: "tiger",
        latitude: 60.1943,
        longitude: 25.0296
    },
    {
        name: "Kontula",
        avatar: "dog",
        latitude: 60.2374,
        longitude: 25.0830
    },
    {
        name: "Itäkeskus",
        avatar: "bear",
        latitude: 60.2093,
        longitude: 25.0830
    },
    {
        name: "Mellunmäki",
        avatar: "cat",
        latitude: 60.2299,
        longitude: 25.1131
    },
    {
        name: "Vuosaari",
        avatar: "fox",
        latitude: 60.2117,
        longitude: 25.1673
    },
    {
        name: "Kannelmäki",
        avatar: "koala",
        latitude: 60.2395,
        longitude: 24.8743
    },
    {
        name: "Pitäjänmäki",
        avatar: "lion",
        latitude: 60.2200,
        longitude: 24.8750
    },
    {
        name: "Malminkartano",
        avatar: "panda",
        latitude: 60.2512,
        longitude: 24.8799
    },
    {
        name: "Pohjois-Haaga",
        avatar: "pig",
        latitude: 60.2299,
        longitude: 24.8947
    },
    {
        name: "Huopalahti",
        avatar: "tiger",
        latitude: 60.2221,
        longitude: 24.9051
    },
    {
        name: "Paloheinä",
        avatar: "dog",
        latitude: 60.2448,
        longitude: 24.9099
    },
    {
        name: "Oulunkylä",
        avatar: "bear",
        latitude: 60.2299,
        longitude: 24.9628
    },
    {
        name: "Pukinmäki",
        avatar: "cat",
        latitude: 60.2399,
        longitude: 24.9799
    },
    {
        name: "Tapanila",
        avatar: "fox",
        latitude: 60.2599,
        longitude: 24.9799
    },
    {
        name: "Puistola",
        avatar: "koala",
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
            avatar: home.avatar
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

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

exports.onUserWrite = onDocumentWritten({ document: "users/{userId}", location: "europe-north1" }, async (event) => {

    const userData = event.data.after.data();
    const userId = event.params.userId;
    if (event.data.before.data().groups !== event.data.after.data().groups) {
        console.log("Groups changed");

        diff_add = event.data.after.data().groups.filter(x => !event.data.before.data().groups.includes(x));

        diff_remove = event.data.before.data().groups.filter(x => !event.data.after.data().groups.includes(x));

        diff_add.forEach((group) => {
            
            admin.firestore().doc("groups/" + group).get().then((doc) => {
                if (!doc.exists) {
                    admin.firestore().doc("groups/" + group).set({
                        users: [userData.name],
                        name: "New group"
                    });
                }});

            admin.firestore().doc("groups/" + group).update({
                users: admin.firestore.FieldValue.arrayUnion(userId)
            });
        });

        diff_remove.forEach((group) => {
            admin.firestore().doc("groups/" + group).update({
                users: admin.firestore.FieldValue.arrayRemove(userId)
            });
        });
    }
});


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
        for (home of homes) {
            if (user.data().name === home.name) {
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
    const latitude = Number(request.query.latitude);
    const longitude = Number(request.query.longitude);

    const steps = Number(request.query.steps)

    const users = await admin.firestore().collection('users').get();
    const userArray = [];
    for (const user of users.docs) {
        userArray.push({ "data": user, "initialLocation": user.data().location });
    }

    for (var i = 1; i <= steps; i++) {
        for (const user of userArray) {
            const dLat = (user.initialLocation.latitude - latitude) / steps;
            const dLon = (user.initialLocation.longitude - longitude) / steps;

            const data = {
                location: new admin.firestore.GeoPoint(user.initialLocation.latitude - dLat * i + randomBetween(-0.1, 0.1) * dLat, user.initialLocation.longitude - dLon * i + randomBetween(-0.1, 0.1) * dLon)
            }
            await user.data.ref.update(data);
        }
        // Wait 1 second
        //await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Wait 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Set all activities as active
    const activities = await admin.firestore().collection('activities').get();
    for (const activity of activities.docs) {
        await activity.ref.update({
            ongoing: true
        });
    }
    response.status(200).send(latitude + " " + longitude);
});