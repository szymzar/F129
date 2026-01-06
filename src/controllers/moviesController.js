const moviesModel = require('../models/moviesModels');

async function getAll(req, res) {
    try {
        const { genre, sortBy, order } = req.query;
        const filter = {};
        if (genre) {
            filter.genre = { $regex: genre, $options: 'i' };
        }

        const sort = {};
        if (sortBy) {
            sort[sortBy] = order === 'desc' ? -1 : 1;
        }

        const movies = await moviesModel.getAllMovies(filter, sort);

        if (Object.keys(req.query).length > 0 && (genre || sortBy)) {
            res.render('pages/search', { movies, query: req.query, title: 'Wyniki Wyszukiwania' });
        } else {
            res.render('pages/index', { movies, query: req.query, title: 'Lista Filmów' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).render('pages/error', { message: "Wystąpił błąd serwera podczas pobierania filmów.", title: "Błąd Serwera" });
    }
}

function getAddForm(req, res) {
    res.render('pages/add', { movie: {}, error: null, title: 'Dodaj Film' });
}

async function postAdd(req, res) {
    try {
        const {
            title,
            author,
            year,
            genre,
            ageCategory,
            description,
            review
        } = req.body;

        
        if (!title || !author || !year) {
            return res.render('pages/add', {
                movie: req.body, 
                error: 'Tytuł, autor i rok są polami wymaganymi.',
                title: 'Dodaj Film'
            });
        }

        await moviesModel.addMovie(
            title,
            author,
            year,
            genre,
            ageCategory,
            description,
            review
        );

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).render('pages/error', { message: "Wystąpił błąd serwera podczas dodawania filmu.", title: "Błąd Serwera" });
    }
}

async function getEditForm(req, res) {
    try {
        const movie = await moviesModel.getMovieById(req.params.id);
        if (!movie) {
            return res.status(404).render('pages/error', { message: "Nie znaleziono filmu o podanym ID.", title: "Nie znaleziono" });
        }
        res.render('pages/edits', { movie, error: null, title: 'Edytuj Film' });
    } catch (err) {
        console.error(err);
        res.status(500).render('pages/error', { message: "Wystąpił błąd serwera podczas pobierania danych filmu.", title: "Błąd Serwera" });
    }
}

async function postEdit(req, res) {
    try {
        const {
            title,
            author,
            year,
            genre,
            ageCategory,
            description,
            review
        } = req.body;

        
        if (!title || !author || !year) {
            const movieData = req.body;
            movieData._id = req.params.id; 
            return res.render('pages/edits', {
                movie: movieData, 
                error: 'Tytuł, autor i rok są polami wymaganymi.',
                title: 'Edytuj Film'
            });
        }

        await moviesModel.updateMovie(
            req.params.id,
            title,
            author,
            year,
            genre,
            ageCategory,
            description,
            review
        );

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).render('pages/error', { message: "Wystąpił błąd serwera podczas aktualizacji filmu.", title: "Błąd Serwera" });
    }
}

async function deleteMovie(req, res) {
    try {
        await moviesModel.deleteMovie(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).render('pages/error', { message: "Wystąpił błąd serwera podczas usuwania filmu.", title: "Błąd Serwera" });
    }
}

async function getMovie(req, res) {
    try {
        const movie = await moviesModel.getMovieById(req.params.id);
        if (!movie) {
            return res.status(404).render('pages/error', { message: "Nie znaleziono filmu o podanym ID.", title: "Nie znaleziono" });
        }
        res.render('pages/movies', { movie, title: movie.title });
    } catch (err) {
        console.error(err);
        res.status(500).render('pages/error', { message: "Wystąpił błąd serwera podczas pobierania danych filmu.", title: "Błąd Serwera" });
    }
}

module.exports = {
    getAll,
    getAddForm,
    postAdd,
    getEditForm,
    postEdit,
    deleteMovie,
    getMovie
};
