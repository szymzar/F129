const { ObjectId } = require('mongodb');
const { getDB } = require('../data/connection');

async function getAllMovies(filter = {}, sort = { createdAt: -1 }) {
    const db = getDB();
  
    if (Object.keys(sort).length === 0) {
        sort = { createdAt: -1 };
    }
    return await db.collection('movies').find(filter).sort(sort).toArray();
}

async function getMovieById(id) {
    const db = getDB();
    return await db.collection('movies').findOne({ _id: new ObjectId(id) });
}

async function addMovie(title,author,year,genre,ageCategory,description,review) {
    const db = getDB();
    await db.collection('movies').insertOne({ title,author,year,genre,ageCategory,description,review });
}

async function updateMovie(id, title,author,year,genre,ageCategory,description,review) {
    const db = getDB();
    await db.collection('movies').updateOne(
        { _id: new ObjectId(id) },
        { $set: { title,author,year,genre,ageCategory,description,review } }
    );
}

async function deleteMovie(id) {
    const db = getDB();
    await db.collection('movies').deleteOne({ _id: new ObjectId(id) });
}

module.exports={getAllMovies,getMovieById,addMovie,updateMovie,deleteMovie};
