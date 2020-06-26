const express = require('express')
const router = express.Router()
const post_controller = require('../controllers/post_controller')
const check_auth = require('../middlewares/check-auth')
const upload = require('../middlewares/upload_image')
const Authorization = require("../controllers/authorization.controller");

router.post('/', check_auth, Authorization.checkPermission, post_controller.add_post)
router.post('/addnewpost', check_auth, upload, post_controller.add_post_new)
router.put('/:postId', check_auth, upload, post_controller.update_post)
router.patch('/status/:postId', check_auth, post_controller.update_post_status)
router.delete('/:postId', check_auth, post_controller.delete_post)

router.get('/', post_controller.get_all_post)
router.get('/page/:pageNumber?', post_controller.get_all_post_with_page)
router.get('/:postId', post_controller.get_a_post)
router.get('/status/:code', post_controller.get_all_post_with_status)
router.get('/type/:typeId?/account/:hostId?', post_controller.get_all_post_with_options)
router.post('/finds/address', post_controller.get_all_post_with_address)
router.get('/account/all', check_auth, post_controller.get_all_post_of_account)


module.exports = router