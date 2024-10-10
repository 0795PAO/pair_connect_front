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

const ContactsModal = ({
    onCancel,
    open,
    email,
    discord_link,
    github_link,
    linkedin_link,

}) => {
    return (
        <Dialog open={open} onOpenChange={onCancel}>
            <DialogContent d>
                <DialogHeader>
                    <DialogTitle className="my-4">Contactos Developer:</DialogTitle>
                    <DialogDescription>
                        <ul className="text-foreground flex flex-col gap-4">
                            <li><span className="font-bold">Email:</span> <span>{email}</span></li>
                            <li><span className="font-bold">Discord:</span> <span>{discord_link}</span></li>
                            <li><span className="font-bold">Github:</span> <span>{github_link}</span></li>
                            <li><span className="font-bold">Linkedin:</span> <span>{linkedin_link}</span></li>
                        </ul>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button type="button" variant="destructive" onClick={onCancel}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ContactsModal ;