require("dotenv").config();
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp({
    credential: applicationDefault(),
});

const BBDD = getFirestore();

module.exports = {
    BBDD,
};