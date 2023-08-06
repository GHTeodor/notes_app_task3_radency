import React, {FC} from 'react';
import {Button, TableCell, TableRow} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../hooks";
import {ArchivedListModal} from "./Modals/ArchivedList";
import {noteActions} from "../redux/slice";

interface IProps {

}

const SummaryTBody: FC<IProps> = () => {
    const {statistics: {keys, archived, active}} = useAppSelector(state => state.noteSlice);
    const dispatch = useAppDispatch();

    return (
        <>
            {keys.map((key) => <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{active[key]}</TableCell>
                <TableCell>
                    <Button variant="text" onClick={()=>dispatch(noteActions.setCategory(key))}>
                        <ArchivedListModal quantity={archived[key]}/>
                    </Button>
                </TableCell>
            </TableRow>)}
        </>
    );
};

export {SummaryTBody};