import {Router} from "express";

import {notesController} from "../controllers";
import {notesMiddleware} from "../middlewares";

const router = Router();

router.get('/stats', notesController.stats);
router.get('/archived', notesController.getAllArchived);

router.get('/', notesController.getAll);
router.post('/', notesController.create);

router.get('/:id', notesMiddleware.checkIsNoteActive, notesController.getById);
router.patch('/:id', notesMiddleware.checkIsNoteActive, notesController.updateById);
router.delete('/:id', notesMiddleware.checkIsNoteActive, notesController.deleteById);

router.get('/archive/:id', notesMiddleware.checkIsNoteActive, notesController.archive);
router.get('/unarchive/:id', notesMiddleware.checkIsNoteArchived, notesController.unarchive);

export const notesRouter = router;