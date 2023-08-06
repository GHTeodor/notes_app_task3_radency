import {NextFunction, Request, Response} from "express";

import {INote, IRequestExtended} from "../interfaces";
import {notesService} from "../services";
import {ApiError} from "../errors";

class NotesController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const notes: INote[] = notesService.getAll();

            res.json(notes);
        } catch (e) {
            next(e);
        }
    }

    public async getAllArchived(req: Request, res: Response, next: NextFunction) {
        try {
            const notes: INote[] = notesService.getAllArchived();

            res.json(notes);
        } catch (e) {
            next(e);
        }
    }

    public getById(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            res.json(req.note!);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const newNote = await notesService.create(req.body);

            if (!newNote) {
                next(new ApiError("Note is not valid."));
            }

            res.json(newNote);
        } catch (e) {
            next(e);
        }
    }

    public async updateById(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const updated = await notesService.updateById(req.body, req.note!);

            if (!updated) {
                next(new ApiError("Note is not valid."));
                return;
            }

            res.json(updated);
        } catch (e) {
            next(e);
        }
    }

    public deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.params;
            notesService.deleteById(+id);

            res.status(202).end();
        } catch (e) {
            next(e);
        }
    }

    public stats(req: Request, res: Response, next: NextFunction) {
        try {
            const statistic = notesService.stats();
            res.json(statistic);
        } catch (e) {
            next(e);
        }
    }

    public archive(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const archivedNote = notesService.archive(req.note!);

            res.json(archivedNote);
        } catch (e) {
            next(e);
        }
    }

    public unarchive(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const unarchivedNote = notesService.unarchive(req.note!);

            res.json(unarchivedNote);
        } catch (e) {
            next(e);
        }
    }
}

export const notesController = new NotesController();