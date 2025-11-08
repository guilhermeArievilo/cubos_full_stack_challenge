import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddGenreForm from "../../forms/add-genre-form";

interface AddGenreDialogProps {
  open: boolean;
  onOpenChange: (status: boolean) => void;
  handleCreateGenre: (name: string) => void;
}

export default function AddGenreDialog({
  open,
  onOpenChange,
  handleCreateGenre
}: AddGenreDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Gênero</DialogTitle>
        </DialogHeader>
        <AddGenreForm handleCreateGenre={({ name }) => handleCreateGenre(name)}/>
      </DialogContent>
    </Dialog>
  );
}