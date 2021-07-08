import auth from '../middleware/auth.js';
import express from 'express';
import {createCard,getCards,deleteCard,updateCard} from '../controllers/cards.js';
const router=express.Router();
router.post('/',auth,createCard);
router.get('/',auth,getCards);
router.delete('/:id',auth,deleteCard);
router.patch('/:id',auth,updateCard);

export default router;