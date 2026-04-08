const express=require('express');
const router=express.Router();

const{
    getMyCart,
    addToCart,
    removeFromCart,
    clearCart
}=require('../controllers/cartController');

const{protect}=require('../middleware/userMiddleware');

router.get('/', protect, getMyCart);
router.post('/add', protect, addToCart);
router.delete('/remove/:productId', protect, removeFromCart);
router.delete('/clear', protect, clearCart);

module.exports=router;