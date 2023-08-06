import dayjs from "dayjs";

import {notesRepository} from "../repositories";
import {INote} from "../interfaces";
import {archivedList} from "../database/archived.list";
import {noteSchema} from "../helpers";

class NotesService {

    public getAll(): INote[] {
        return notesRepository.getAll();
    }

    public getAllArchived() {
        return notesRepository.getAllArchived();
    }

    public getById(id: number): INote | undefined {
        return notesRepository.getById(id);
    }

    public async create(note: INote) {
        const newNote: INote = {
            ...note,
            id: Math.random(),
            created: dayjs().format("MMMM D, YYYY"),
        };

        const isValid: boolean = await this.yupValidator(newNote);
        if (!isValid) {
            return false;
        }

        notesRepository.create(newNote);
        return newNote;
    }

    public async updateById(updatedData: INote, noteForEdit: INote) {
        const editedNote = {
            ...noteForEdit,
            ...updatedData,
            id: noteForEdit.id,
            created: noteForEdit.created,
        };

        const isValid: boolean = await this.yupValidator(editedNote);
        if (!isValid) {
            return "Note is not valid.";
        }

        notesRepository.updateById(noteForEdit.id, editedNote);
        return editedNote;
    }

    public deleteById(id: number): void {
        notesRepository.deleteById(id);
    }

    public stats() {
        const {notes} = notesRepository.stats();

        const archivedCategoryCounter = archivedList.reduce((acc: { [key: string]: number }, {category}) => ({
            ...acc,
            [category]: ++acc[category] || 1,
        }), {});


        const active = (category: string): number => notes.filter(n => n.category === category).length;
        const archivedKeys = Object.keys(archivedCategoryCounter);
        const activeList = archivedKeys?.reduce((acc, archivedKey) => ({...acc, [archivedKey]: active(archivedKey)}), {});

        return {
            keys: archivedKeys,
            archived: archivedCategoryCounter,
            active: activeList,
        };
    }

    public archive(note: INote): INote {
        return notesRepository.archive(note);
    }

    public unarchive(note: INote): INote {
        return notesRepository.unarchive(note);
    }

    public getByIdArchived(id: number): INote | undefined {
        return notesRepository.getByIdArchived(id);
    }

    private yupValidator = async (note: INote) => await noteSchema.isValid(note);
}

export const notesService = new NotesService();