const { async } = require('@firebase/util');
const { json } = require('body-parser');
const { Router } = require('express')
const router = Router();
const admin = require('firebase-admin')
    //const { BBDD } = require("../firebase");
    // autentificacion
let serviceAccount = require('../../nodejsfirebase-f7010-firebase-adminsdk-ymir0-4818666261.json');

//Init Firebase
admin.initializeApp({
    credencial: admin.credential.cert(serviceAccount),
    databaseURL: "https://nodejsfirebase-f7010-default-rtdb.firebaseio.com/"

})
const BBDD = admin.database();

//Get
router.get('/', (req, res) => {
    //console.log('genial')
    //res.send('recibido')

    BBDD.ref('contacts').once('value', (snapshot) => {
        const data = snapshot.val()
            // console.log('data: ', data)

        res.render('index', { contacts: data })

    })
})


//POST
router.post('/newContact', async(req, res) => {
    console.log(req.body)

    const newContact = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
    }
    await BBDD.ref('contacts').push(newContact);
    res.redirect(`/`)
})

router.get('/deleteContact/:id', async(req, res) => {
    console.log("eliminado: " + req.params.id)
        //res.send('eliminado')
    await BBDD.ref('contacts').child(req.params.id).remove();
    res.redirect(`/`)
        //res.send('eliminado')
})

router.get('/editContacts/:id', async(req, res) => {
    console.log("editar: " + req.params.id)
        //const doc = await DDBB.collection("contacts").doc(req.params.id).get();

    //BBDD.child('contacts')

    await BBDD.ref('contacts/' + req.params.id).on('value', snap => {
        console.log(snap.val())
        const data = snap.val()

        res.render('index', { editcontact: data, id: req.params.id })
    })


    //console.log('doc:', doc)
    //res.render("index", { editcontact: { id: doc.id, ...doc.data() } });
    // res.redirect(`/`)
})
router.get('/updateContacts/:id', async(req, res) => {
    console.log("update: " + req.params.id)
    const newContact = {
        firstname: "holaa",
        lastname: "holaaa",
        email: "holaaa",
        phone: 123
    }
    const up = await BBDD.ref('contacts').child(req.params.id).update(newContact);
    console.log('doc:', up)
    res.redirect(`/`)
})
module.exports = router