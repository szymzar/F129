const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router.get('/', moviesController.getAll);

router.get('/add', moviesController.getAddForm);
router.post('/add', moviesController.postAdd);

router.get('/edit/:id', moviesController.getEditForm);
router.post('/movies/:id/edit', moviesController.postEdit);

router.post('/movies/:id/delete', moviesController.deleteMovie);

router.get('/movies/:id', moviesController.getMovie);

module.exports = router;
