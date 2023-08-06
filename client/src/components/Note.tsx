import React, {FC} from 'react';
import {Archive, DeleteForever, Unarchive} from '@mui/icons-material';
import {Button, TableCell, TableRow} from "@mui/material";

import {INote} from "../interfaces";
import {useAppDispatch} from "../hooks";
import {noteActions} from "../redux/slice";
import NoteFormModal from "./Modals/NoteFormModal";
import styles from "./styles.module.scss";

interface IProps {
    note: INote;
    isArchived: boolean;

}

const Note: FC<IProps> = ({note, isArchived}) => {
    const {id, name, category, content, created, dates} = note;

    const dispatch = useAppDispatch();

    return (
        <TableRow className={styles.rows}>
            <TableCell>{name}</TableCell>
            <TableCell>{created}</TableCell>
            <TableCell>{category}</TableCell>
            <TableCell>{content}</TableCell>
            <TableCell>{dates.join(', ')}</TableCell>
            {
                !isArchived
                    ?
                    <TableCell style={{display: "flex", flexWrap: "wrap"}}>

                        {/*Edit Modal*/}
                        <NoteFormModal note={note}/>

                        <Button onClick={() => dispatch(noteActions.archive({id}))}><Archive/></Button>
                        <Button onClick={() => dispatch(noteActions.deleteNote({id}))}><DeleteForever/></Button>
                    </TableCell>
                    :
                    <TableCell>
                        <Button onClick={() => dispatch(noteActions.unarchive({id}))}><Unarchive/></Button>
                    </TableCell>
            }
        </TableRow>
    );
};

export {Note};