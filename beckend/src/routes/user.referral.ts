import express from 'express';
import { invitationForReferral, assignReferral, getDataForTree } from '../controllers/referral.controller';

const router = express.Router();

router.post('/invite', invitationForReferral);
router.post('/accept/:token', assignReferral); // Assuming you want to handle acceptance as well
router.post('/tree' , getDataForTree)

export default router;