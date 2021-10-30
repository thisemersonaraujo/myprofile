const mongoose = require('mongoose');

class Connection {
    constructor() {
        this.dataBaseConnectionMongoDB();
    }

    dataBaseConnectionMongoDB() {
        const URI = "mongodb://localhost/myprofiledb";
        this.mongoDBConnection = mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Conexão estabelecida com sucesso com o mongoDB!");
        })
        .catch((error) => {
            console.log(`Erro ao estabelecer conexão com mongoDB: ${error}`);
        });
    }
}

module.exports = new Connection();