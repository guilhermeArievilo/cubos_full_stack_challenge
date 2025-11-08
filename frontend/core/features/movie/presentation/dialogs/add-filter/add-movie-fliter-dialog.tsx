import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddMovieForm from "../../forms/add-movie-form";

interface AddMovieFilterDialogProps {
  open: boolean;
  onOpenChange: (status: boolean) => void;
}



export default function AddMovieFilterDialog({ open, onOpenChange }: AddMovieFilterDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xs border-outline-variant/10">
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button variant={'secondary'} asChild>
            <DialogClose>Cancelar</DialogClose>
          </Button>
          <Button>Aplicar Flitros</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}