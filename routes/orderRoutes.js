const express=require('express');
const router=express.Router();

const{
    createOrder,
    getOrderById,
    getMyOrders,
    updateOrderById,
    deleteOrderById
}=require('../controllers/orderController');

const{protect}=require('../middleware/userMiddleware');
const{isAdmin}=require('../middleware/adminMiddleware');

router.post('/',protect, createOrder);
router.get('/my_orders',protect, getMyOrders);
router.get('/:id',protect, getOrderById);
router.put('/:id', protect, isAdmin, updateOrderById);
router.delete('/:id', protect, isAdmin, deleteOrderById);

module.exports=router;