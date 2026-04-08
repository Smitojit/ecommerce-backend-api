const express= require('express');
const router=express.Router();

const{
    createProduct,
    getALLProducts,
    getProductById,
    updateProduct,
    deleteProduct
}=require('../controllers/productController');

const {protect}=require('../middleware/userMiddleware');
const {isAdmin}=require('../middleware/adminMiddleware');

router.get('/',getALLProducts);
router.get('/:id',getProductById);

router.post('/',protect, isAdmin, createProduct);
router.put('/:id', protect, isAdmin, updateProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);

module.exports=router;