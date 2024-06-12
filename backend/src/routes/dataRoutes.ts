
import express from 'express';
import * as dataController from '../controllers/dataController';

const router = express.Router();

router.get('/', dataController.getAllData);
router.get('/:id', dataController.getDataById);
router.post('/', dataController.addData);
router.put('/:id', dataController.updateData);
router.delete('/:id', dataController.deleteData);

export default router;
