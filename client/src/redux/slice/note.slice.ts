import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {INote, IStatistic} from "../../interfaces";
import {noteService} from "../../services/note.service";

interface IState {
    notes: INote[];
    statistics: IStatistic;
    currentArchivedCategory: string;
    trigger: boolean;
    archived: INote[];

}

const initialState: IState = {
    notes: [],
    trigger: false,
    currentArchivedCategory: "",
    statistics: {keys: [], active: {}, archived: {}},
    archived: [],
};

const getAll = createAsyncThunk<INote[], void>(
    'noteSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await noteService.getAll();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const create = createAsyncThunk<void, { note: INote; }>(
    'noteSlice/create',
    async ({note}, {rejectWithValue}) => {
        try {
            await noteService.create(note);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const update = createAsyncThunk<void, { note: INote, id: number; }>(
    'noteSlice/update',
    async ({id, note}, {rejectWithValue}) => {
        try {
            await noteService.updateById(id, note);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const deleteNote = createAsyncThunk<void, {id: number}>(
    'noteSlice/deleteNote',
    async ({id}, {rejectWithValue}) => {
        try {
            await noteService.delete(id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const statistics = createAsyncThunk<IStatistic, void>(
    'noteSlice/statistics',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await noteService.statistics();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const getAllArchived = createAsyncThunk<INote[], void>(
    'noteSlice/getAllArchived',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await noteService.getAllArchived();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const archive = createAsyncThunk<void, {id: number}>(
    'noteSlice/archive',
    async ({id}, {rejectWithValue}) => {
        try {
            await noteService.archiveById(id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const unarchive = createAsyncThunk<void, {id: number}>(
    'noteSlice/unarchive',
    async ({id}, {rejectWithValue}) => {
        try {
            await noteService.unarchiveById(id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);

const slice = createSlice({
    name: "noteSlice",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.currentArchivedCategory = action.payload;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.notes = action.payload;
            })
            .addCase(getAllArchived.fulfilled, (state, action) => {
                state.archived = action.payload;
            })
            .addCase(statistics.fulfilled, (state, action) => {
                state.statistics = action.payload;
            })
            .addMatcher(isFulfilled(create, update, deleteNote, archive, unarchive), state => {
                state.trigger = !state.trigger;
            }),
});

const {actions, reducer: noteSlice} = slice;

const noteActions = {
    ...actions,
    getAll,
    create,
    update,
    deleteNote,
    statistics,
    archive,
    unarchive,
    getAllArchived,
};

export {
    noteActions,
    noteSlice,
};