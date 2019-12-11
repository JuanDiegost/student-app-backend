const mongoose = require('mongoose');

export async function connect () {
    try {
        await mongoose.connect('mongodb://localhost:27017/workshop-uptc', {
            useNewUrlParser: true
        });
        console.log('>>> Conectado a la base de datos workshop');
    }
    catch(e) {
        console.log('Algo no esta bien');
        console.log(e);
    }
}