/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"


const Modal = ({ title, message, border_color, open, onOpenChange }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={`${border_color} border-2`}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {message}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={onOpenChange}>Cancelar</Button>
                    <Button type="button" variant="outline"> <Link to="/my-profile">Modifica mi perfil</Link></Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default Modal