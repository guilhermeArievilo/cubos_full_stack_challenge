'use client'

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { X } from "lucide-react";
import { Genre } from "../../../domain/entities/genre";
import { AddMovieFormWizardProvider } from "../../forms/add-movie/wizard/add-movie-form-wizard-context";
import AddMovieFormStepper from "../../forms/add-movie/wizard/add-movie-form-stepper";
import SubmitButtonFormWizard from "../../forms/add-movie/buttons/submit-button-form-wizard";
import { Language } from "../../../domain/entities/language";
import { useState } from "react";

interface AddMovieDrawerProps {
  open: boolean;
  onClose?: () => void;
  onOpenChange: (status: boolean) => void;
  onCreateGenre: () => void;
  genreDataOptions?: Genre[];
  createdGenres?: Genre[];
  languageDataOptions?: Language[];
}

export default function AddMovieDrawer({
  open = false,
  onOpenChange,
  onClose,
  onCreateGenre,
  genreDataOptions,
  createdGenres,
  languageDataOptions
}: AddMovieDrawerProps) {
  const [reset, setReset] = useState<boolean>(false);

  function handleOnClose() {
    setReset(!reset);
    if (onClose) {
      onClose();
    }
  }

  return (
    <AddMovieFormWizardProvider onSubmit={(data) => console.log(data)} resetTrigger={reset}>
      <Drawer open={open} onOpenChange={onOpenChange} onClose={handleOnClose} direction="right">
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
                  <AddMovieFormStepper
                    onCreateGenre={onCreateGenre}
                    genres={genreDataOptions}
                    createdGenres={createdGenres}
                    languages={languageDataOptions}
                  />
                </div>
                <DrawerFooter className="flex-row justify-end gap-4 items-end">
                  <Button variant="secondary" asChild>
                    <DrawerClose>
                      Cancelar 
                    </DrawerClose>
                  </Button>
                  <SubmitButtonFormWizard/>
                </DrawerFooter>
            </DrawerContent>
      </Drawer>
    </AddMovieFormWizardProvider>
  )
}