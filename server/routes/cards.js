import auth from '../middleware/auth.js';
import express from 'express';
import {createCard,getCards} from '../controllers/cards.js';
const router=express.Router();
router.post('/',auth,createCard);
router.get('/',auth,getCards);
export default router;