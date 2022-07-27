const { Router } = require('express');
const controller = require('../controllers/user');
const Authcontroller = require('../controllers/auth');
const multer = require('multer');
const upload = multer({ dest: 'public/documentation'})
const passport = require('passport');
require('../utility/passport');

const router = Router();

router.route('/me').post(passport.authenticate('jwt', { session: false }),(req,res)=>{res.status(200).json(req.user)});
router.route('/').post(upload.array('documentation', 12),controller.create);
router.route('/login').post(passport.authenticate('login', { session: false }),Authcontroller.login);
router.route('/recover-password').post(Authcontroller.recoverPassword);
router.route('/').get(controller.list);
router.route('/:id').get(controller.show);
router.route('/:id').delete(controller.remove);
router.route('/:id').put(controller.update);

module.exports = router;
