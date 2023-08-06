import React, {FC} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Archive, DeleteForever, Unarchive} from "@mui/icons-material";

import {useAppSelector} from "../hooks";
import {Note} from "./Note";
import NoteFormModal from "./Modals/NoteFormModal";
import {theadSummary} from "../constants";
import {SummaryTBody} from "./SummaryTBody";
import {INote} from "../interfaces";
import styles from "./styles.module.scss";

interface IProps {
    thead: string[];
    isArchived?: boolean;
}

const NotesTable: FC<IProps> = ({thead: keysList, isArchived = false}) => {
    const {notes, archived, currentArchivedCategory} = useAppSelector(state => state.noteSlice);
    const archivedByCategory = archived.filter(note => note.category === currentArchivedCategory);

    const isSummary: boolean = keysList.length === theadSummary.length;

    return (
        <div className={styles.container}>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {keysList.map((k, i) => <TableCell key={i}>
                                    {k
                                        ? k
                                        : isArchived ? <Unarchive/> : <div className={styles.dFlexEnd}><Archive/> <DeleteForever/></div>}
                                </TableCell>)}
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {
                                (isSummary)
                                    ? <SummaryTBody/>
                                    : (isArchived ? archivedByCategory : notes).map((note: INote) =>
                                        <Note key={note.id} note={note} isArchived={isArchived}/>)
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/*Create Modal*/}
            {
                !isArchived && !isSummary && <NoteFormModal/>
            }
        </div>
    );
};

export {NotesTable};