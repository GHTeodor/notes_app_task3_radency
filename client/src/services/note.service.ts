import {axiosService} from "./axios.service";
import {IRes} from "../types";
import {INote, IStatistic} from "../interfaces";
import {urls} from "../constants";

const noteService = {
    getAll: (): IRes<INote[]> => axiosService.get(urls.notes.notes),
    getAllArchived: (): IRes<INote[]> => axiosService.get(urls.notes.archived),
    getById: (id: number): IRes<INote[]> => axiosService.get(urls.notes.byId(id)),
    create: (note: INote): IRes<INote> => axiosService.post(urls.notes.notes, note),
    updateById: (id: number, note: INote): IRes<INote[]> => axiosService.patch(urls.notes.byId(id), note),
    delete: (id: number): IRes<void> => axiosService.delete(urls.notes.byId(id)),
    archiveById: (id: number): IRes<INote[]> => axiosService.get(urls.notes.archiveById(id)),
    unarchiveById: (id: number): IRes<INote[]> => axiosService.get(urls.notes.unarchiveById(id)),
    statistics: (): IRes<IStatistic> => axiosService.get(urls.notes.statistics),
};

export {
    noteService,
};