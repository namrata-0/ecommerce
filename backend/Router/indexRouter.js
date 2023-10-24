const express = require('express')
const router = express.Router()
const cartController = require('../Controller/cartController')
const indexController = require('../Controller/indexController')
const orderController = require('../Controller/orderController')

const multer = require('multer')
const verify = require('../Middleware/verify')
const upload = multer()

router.get('/', indexController.rootApi)
router.post('/login', upload.single(), indexController.loginApi)
router.post('/register', upload.single(), indexController.registerApi)
router.get(
  '/specificUser/:email',
  upload.single(),
  verify,
  indexController.specificUser,
)
router.post(
  '/updateUser/:email',
  upload.single(),
  verify,
  indexController.updateApi,
)
router.post(
  '/users/:email/ordersBooked',
  upload?.single(),
  verify,
  orderController.ordersBookedApi,
)
router.get(
  '/orderDetails/:email',
  upload?.single(),
  orderController.showOrderApi,
)
router.get(
  '/getCartData/:email',
  upload?.single(),
  cartController.allCartDataApi,
)
router.post('/addToCart/:email', upload?.single(), cartController.addToCartApi)
router.post('/deleteCartItem/:email/', upload?.single(), cartController.deleteCartItemApi)
// router.post('/imageUpload/:email', upload.single(image), verify, indexController.imageUpload)
module.exports = router
