'use client'

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { X } from "lucide-react";

interface AddMovieDrawerProps {
  open: boolean;
  onOpenChange: (status: boolean) => void;
}

export default function AddMovieDrawer({ open = false, onOpenChange }: AddMovieDrawerProps) {
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
        <div>Teste</div>
        <DrawerFooter className="flex-1 flex-row justify-end gap-4 items-end">
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