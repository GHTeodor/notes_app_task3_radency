import React, {FC} from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
} from "@mui/material";

import Transition from "./Transition";
import {NotesTable} from "../NotesTable";
import {thead} from "../../constants";

interface IProps {
    quantity: number;
}

const ArchivedListModal: FC<IProps> = ({quantity}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                {quantity}
            </Button>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                maxWidth="xl"
            >
                <DialogTitle>{"Unarchive note(-s)"}</DialogTitle>
                <DialogContent>
                    <NotesTable thead={thead} isArchived={true}/>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export {ArchivedListModal};