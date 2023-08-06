import {data} from "../database";
import {archivedList} from "../database/archived.list";
import {INote} from "../interfaces";

class NotesRepository {
    public getAll(): INote[] {
        return data;
    }

    public getById(id: number): INote | undefined {
        return data.find(note => note.id === id);
    }

    public getByIdArchived(id: number): INote | undefined {
        return archivedList.find(note => note.id === id);
    }

    public create(note: INote): void {
        data.push(note);
    }

    public updateById(id: number, editedNote: INote): void {
        const index = this.getIndexById(id);

        data.splice(index, 1, editedNote);
    }

    public deleteById(id: number): void {
        const index = this.getIndexById(id);

        data.splice(index, 1);
    }

    public stats() {
        return {
            notes: data,
            archived: archivedList
        };
    }

    public archive(note: INote): INote {
        const index: number = this.getIndexById(note.id);

        data.splice(index, 1);
        archivedList.push(note);
        return note;
    }

    public unarchive(note: INote) {
        const index: number = this.getIndexById(note.id, true);

        archivedList.splice(index, 1);
        data.push(note);
        return note;
    }

    public getAllArchived(): INote[] {
        return archivedList;
    }

    private getIndexById(id: number, fromArchivedList = false) {
        return (fromArchivedList ? archivedList : data)
            .findIndex(note => note.id === id);
    }
}

export const notesRepository = new NotesRepository();