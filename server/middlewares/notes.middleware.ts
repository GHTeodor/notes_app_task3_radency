import {Response, NextFunction} from "express";

import {IRequestExtended} from "../interfaces";
import {ApiError} from "../errors";
import {notesService} from "../services";

class NotesMiddleware {
    public async checkIsNoteActive(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;

            const note = notesService.getById(+id);

            if (!note) {
                next(new ApiError(`Note with id: ${id} is not active, or doesn't exist.`));
                return;
            }

            req.note = note;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsNoteArchived(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;

            const note = notesService.getByIdArchived(+id);

            if (!note) {
                next(new ApiError(`Note with id: ${id} doesn't exist (or is active).`));
                return;
            }

            req.note = note;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const notesMiddleware = new NotesMiddleware();