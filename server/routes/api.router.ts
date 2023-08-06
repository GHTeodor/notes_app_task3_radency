import {Request, Response, NextFunction, Router} from "express";

import {notesRouter} from "./notes.router";

const router = Router();

router.use('/notes', notesRouter);

router.use('*', (err: any, req: Request, res: Response, next: NextFunction) =>
    res.status(err.status || 500)
        .json({
            message: err.message,
            data: err.data,
        }));

export const apiRouter = router;