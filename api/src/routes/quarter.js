const { Router } = require('express');
const controller = require('../controllers/quarter');


const router = Router();

router.route('/').post(controller.create);
router.route('/list/:id').get(controller.getAll);
router.route('/:id').get(controller.get);
router.route('/:id').delete(controller.delete);
router.route('/:id').put(controller.update);

module.exports = router;