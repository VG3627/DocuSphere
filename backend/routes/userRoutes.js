const { Router } = require('express')
const userController = require('../controllers/userController.js')

const router = Router() ;


router.post('/login',userController.login_post);
router.post('/signup',userController.signup_post);
router.get('/',userController.user_get);


module.exports = router