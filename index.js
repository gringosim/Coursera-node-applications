
//ESTE BLOQUE SOPORTA INSERTAR DOCUMENTOS DENTRO DE DOCUMENTOS

const mongoose=require('mongoose');

const Dishes=require('./models/dishes');
const dbname='conFusion';
const url='mongodb://localhost:27017/conFusion';
var dish_id;

const connect=mongoose.connect(url).then((client)  =>{
    console.log('Conectado al servidor');
    Dishes.create({
        name: 'ing Ezequiel',
        description:'Simeoni'
    })
    .then((dish)=>{
        console.log(dish);//esta es la promise

        return Dishes.findByIdAndUpdate(dish._id,{
            $set: {description: 'Simeoni Blengino'}
         }, {
             new: true //una vez que se actualiza, retornará el doc actualizado
        })
        .exec();//devuelve la promise y despues podemos encadenar el metodo a los otros
                //encuentra todos los documentos
    }) 
    .then((dish) => {
        console.log(dish);
        dish.comments.push({
            rating:5,
            comment:'Agrega doble apellido',
            author: 'yo'
        });
        return dish.save();
    })
    .then((dish)=>{
        console.log(dish);
        return mongoose.connection.collection('dishes').drop();//elimina los documentos
    })
    .then(() => {
        return mongoose.connection.close(); //cierra database, y está corregido por error de versiones.
    })
    .catch((err)=>{
        console.log(err);
    })

});



















/* EJERCICIO ORIGINAL ANTES DE AGREGAR SOPORTE PARA INSERTAR DOCUMENTOS DENTRO DE DOCUMENTOS


const mongoose=require('mongoose');
//mongoose.Promise=require('Bluebird'); EN ESTA VERSIÓN NUEVA DE MONGOOSE NO HACE FALTA BLUEBIRD. Es una libreria de tercera parte que mongoose soporta usar.
const Dishes=require('./models/dishes');
const dbname='conFusion';//AGREGADO por error en ejemplo debido a versiones mas nuevas de mongo
const url='mongodb://localhost:27017/conFusion';

//===============================================
//const connect=mongoose.connect(url,{
 //   useMongoClient:true
//});
//==============================================


//connect.then((db) => {
const connect=mongoose.connect(url).then((client)  =>{
    console.log('Conectado al servidor');
   // var db=client.db(dbname);//agregado por cambio de version

    var newDish = Dishes({
        name: 'Ezeeq',
        description: 'estudiante'
    });

    newDish.save()//lo guardamos
    .then((dish)=>{
        console.log(dish);//esta es la promise
        return Dishes.find({}).exec();//devuelve la promise y despues podemos encadenar el metodo a los otros
                //encuentra todos los documentos
    }) 
    .then((dishes) => {
        console.log(dishes);

        return mongoose.connection.collection('dishes').drop();//elimina los documentos
    })
    .then(() => {
        return mongoose.connection.close(); //cierra database, y está corregido por error de versiones.
    })
    .catch((err)=>{
        console.log(err);
    })

});
*/