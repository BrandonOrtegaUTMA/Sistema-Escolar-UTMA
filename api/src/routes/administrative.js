const { Router } = require('express');
const controller = require('../controllers/administrative');
const multer = require('multer');
const upload = multer({ dest: 'public/documentation'})

const router = Router();

router.route('/').post(upload.array('documentation', 12),controller.create);
router.route('/').get(controller.list);
router.route('/:id').get(controller.show);
router.route('/:id').delete(controller.remove);
router.route('/:id').put(controller.update);

module.exports = router;
