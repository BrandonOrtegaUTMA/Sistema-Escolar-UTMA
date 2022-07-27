const { Router } = require('express');
const controller = require('../controllers/teacher');


const router = Router();

router.route('/').post(controller.create);
router.route('/').get(controller.list);
router.route('/:id').get(controller.show);
router.route('/:id').delete(controller.remove);
router.route('/:id').put(controller.update);

module.exports = router;