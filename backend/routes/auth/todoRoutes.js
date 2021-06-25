const express = require('express');
const todo = require('../../controllers/todoController')
const checkAuth = require('../../middleware/auth')

const router = express.Router();

router.route('/create').post(checkAuth, todo.create);
router.route('/view-all').get(checkAuth, todo.viewAll);
router.route('/view/:id?').get(checkAuth, todo.view);
router.route('/update/:id?').patch(checkAuth, todo.update);
router.route('/delete/:id?').delete(checkAuth, todo.delete);

module.exports = router;