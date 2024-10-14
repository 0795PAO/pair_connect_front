/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const ModalConfirm = ({
    title, 
    message, 
    open, 
    onConfirm, 
    onCancel, 
    confirmButtonText = "Confirm", 
    border_color
}) => {
    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogContent className={`${border_color} border-2`}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" variant="destructive" onClick={onConfirm}>
                        {confirmButtonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalConfirm;