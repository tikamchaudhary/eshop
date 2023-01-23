const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/authentication");
const { createOrder, getOrderDetails, getMyOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/orderController");

//Creating router
const router = express.Router();

router.route("/order/create").post(isAuthenticatedUser, createOrder);

router.route("/orders/me").get(isAuthenticatedUser, getMyOrders);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.route("/admin/order/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getOrderDetails)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatus)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

// export router
module.exports = router;
