const { Router } = require('express');
const controller = require('../controllers/students');
const multer = require('multer');
const upload = multer({ dest: 'public/documentation'})

const router = Router();

router.route('/').post(upload.array('documents', 12),controller.create);
router.route('/:id').get(controller.get);
router.route('/').get(controller.getAll);
router.route('/:id').delete(controller.delete);
router.route('/:id').put(controller.update);

module.exports = router;