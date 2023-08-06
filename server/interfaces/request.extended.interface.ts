import {Request} from "express";

import {INote} from "../interfaces";

export interface IRequestExtended extends Request {
    note?: INote;
}