'use client'
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { X } from "lucide-react";
import AddMovieForm from "../../forms/add-movie-form";
import { Genre } from "../../../domain/entities/genre";
import AddMovieFormByStep from "../../forms/add-movie/add-movie-form-by-step";

interface AddMovieDrawerProps {
  open: boolean;
  onOpenChange: (status: boolean) => void;
  onCreateGenre: () => void;
  genreDataOptions?: Genre[];
}

export default function AddMovieDrawer({
  open = false,
  onOpenChange,
  onCreateGenre,
  genreDataOptions
}: AddMovieDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent>
        <DrawerHeader className="flex-row justify-between items-center gap-4">
          <DrawerTitle>Adicionar Filme</DrawerTitle>
          <Button variant="ghost" asChild size={'icon-lg'} className="hover:bg-transparent!">
            <DrawerClose>
              <X/>
            </DrawerClose>
          </Button>
        </DrawerHeader>
        <div className="px-6 flex-1 overflow-y-auto">
          <AddMovieFormByStep onSubmit={() => console.log('ok')} onCreateGenre={onCreateGenre} genres={genreDataOptions}/>
        </div>
        <DrawerFooter className="flex-row justify-end gap-4 items-end">
          <Button variant="secondary" asChild>
            <DrawerClose>
              Cancelar 
            </DrawerClose>
          </Button>
          <Button>Adicionar Filme</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}