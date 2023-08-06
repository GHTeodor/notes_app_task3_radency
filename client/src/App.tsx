import React, { useEffect } from 'react';

import {NotesTable} from "./components";
import {thead, theadSummary} from "./constants";
import {useAppDispatch, useAppSelector} from "./hooks";
import {noteActions} from "./redux/slice";

function App() {
    const {trigger, statistics: {keys}} = useAppSelector(state => state.noteSlice);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(noteActions.getAll());
        dispatch(noteActions.getAllArchived());
        dispatch(noteActions.statistics());
    }, [dispatch, trigger]);


    return (
        <>
            <NotesTable thead={thead}/>
            {!!keys.length && <NotesTable thead={theadSummary}/>}
        </>
    );
}

export default App;