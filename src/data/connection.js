const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017'; // lub 'mongodb://mongo:27017' jeśli Docker
const client = new MongoClient(uri);

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('movies');
        console.log(' Połączono z MongoDB');
    } catch (err) {
        console.error(' Błąd połączenia z MongoDB:', err);
    }
}

function getDB() {
    if (!db) throw new Error(' Baza danych nie jest połączona!');
    return db;
}

module.exports = { connectDB, getDB };
