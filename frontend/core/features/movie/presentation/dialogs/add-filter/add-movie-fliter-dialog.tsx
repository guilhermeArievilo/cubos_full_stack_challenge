import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ApplyFiltersForm, { ApplyFiltersFormSchemaType } from "../../forms/apply-filters/apply-filters-form";
import { Genre } from "../../../domain/entities/genre";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

type FiltersType = {
  genre?: string;
  duration?: string;
  releaseDateStart?: string;
  releaseDateEnd?: string;
}
interface AddMovieFilterDialogProps {
  open: boolean;
  onOpenChange: (status: boolean) => void;
  genres?: Genre[];
  applyFilters?: (values: FiltersType) => void;
  filters?: FiltersType;
}



export default function AddMovieFilterDialog({
  open,
  onOpenChange,
  genres,
  applyFilters,
  filters
}: AddMovieFilterDialogProps) {
  const [form, setForm] = useState<UseFormReturn<ApplyFiltersFormSchemaType> | null>(null);

  function handleApplyFilters() {
    if (form) {
      const values = form.getValues();
      applyFilters?.(values);
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xs">
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
        </DialogHeader>
        <ApplyFiltersForm
          genres={genres}
          onFormReady={setForm}
          values={{
            ...filters,
            releaseDateStart: filters?.releaseDateStart || "",
            releaseDateEnd: filters?.releaseDateEnd || "",
          }}/>
        <DialogFooter>
          <Button variant={'secondary'} asChild>
            <DialogClose>Cancelar</DialogClose>
          </Button>
          <Button onClick={handleApplyFilters}>Aplicar Flitros</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}