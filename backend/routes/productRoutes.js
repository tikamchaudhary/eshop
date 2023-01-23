const express = require('express');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authentication');
const { createProduct, getAllProducts, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require('../controllers/productControlller');

//Creating router
const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/product/:id').get(getProductDetails);

router.route('/admin/product/create')
    .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);




router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);



// export router
module.exports = router;