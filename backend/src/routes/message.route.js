import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersForSidebar,getmessages ,sendMessage} from '../controllers/message.controller.js';




const router = express.Router();

router.get('/users', protectRoute, getUsersForSidebar);

router.get('/:id',protectRoute, getmessages);

router.post('/send/:id',protectRoute, sendMessage); // To be implemented


export default router;