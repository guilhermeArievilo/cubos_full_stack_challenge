'use client'

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { X } from "lucide-react";
import { Genre } from "../../../domain/entities/genre";
import { AddMovieFormWizardProvider, MovieWizardData } from "../../forms/add-movie/wizard/add-movie-form-wizard-context";
import SubmitButtonFormWizard from "../../forms/add-movie/buttons/submit-button-form-wizard";
import { Language } from "../../../domain/entities/language";
import { useState } from "react";
import { ContentType } from "@/core/features/upload/domain/entities/contentType";
import { RatingData } from "../../../domain/entities/rating";
import EditMovieAccordionForm, { EditMovieAccordionFormSchemaType } from "../../forms/edit-movie/edit-movie-accordion-form";
import { MovieProps } from "../../../domain/entities/movie";
import { UseFormReturn } from "react-hook-form";
import { timeStringToMinutes } from "@/lib/utils";
import { MovieStatus } from "../../../domain/entities/movieStatus";

interface EditMovieDrawerProps {
  values?: EditMovieAccordionFormSchemaType;
  onClose?: () => void;
  onOpenChange: (status: boolean) => void;
  onCreateGenre: () => void;
  onUploadFile?: (fileName: string, contentType: ContentType, file: File) => Promise<{ uploadPath: string } | null>;
  onSubmitMovie?: (data: Partial<MovieProps>) => void;
  open: boolean;
  genreDataOptions?: Genre[];
  ratingsDataOptions?: RatingData[];
  createdGenres?: Genre[];
  languageDataOptions?: Language[];
  resetTrigger?: boolean;
}

export default function EditMovieDrawer({
  values,
  onOpenChange,
  onClose,
  onCreateGenre,
  onUploadFile,
  onSubmitMovie,
  open = false,
  genreDataOptions,
  ratingsDataOptions,
  createdGenres,
  languageDataOptions,
  resetTrigger
}: EditMovieDrawerProps) {
  const [reset, setReset] = useState<boolean>(false);
  const [form, setForm] = useState<UseFormReturn<EditMovieAccordionFormSchemaType> | null>(null);

  function handleMovieSubmit() {
    if (form) {
      form.handleSubmit(submitMapper)();
      form.reset();
    }
  }

  function submitMapper(data: EditMovieAccordionFormSchemaType) {
    const valuesToUpdate: Partial<MovieProps> = {};

    if (data.title !== values?.title) {
      valuesToUpdate.title = data.title;
    }

    if (data.originalTitle !== values?.originalTitle) {
      valuesToUpdate.originalTitle = data.originalTitle;
    }

    if (data.tagline !== values?.tagline) {
      valuesToUpdate.tagline = data.tagline;
    }

    if (data.synopsis !== values?.synopsis) {
      valuesToUpdate.synopsis = data.synopsis;
    }

    if (data.duration !== values?.duration) {
      valuesToUpdate.duration = timeStringToMinutes(data.duration);
    }

    if (values?.genres) {
      if (values?.genres.length !== data.genres.length) {
        valuesToUpdate.genres = data.genres;
      } else {
        const inters = data.genres.filter(item => !values.genres.includes(item));
        if (inters.length > 0) {
          valuesToUpdate.genres = data.genres;
        }
      }
    }

    if (data.status !== values?.status) {
      valuesToUpdate.status = data.status as MovieStatus;
    }

    if (data.releaseDate !== values?.releaseDate) {
      valuesToUpdate.releaseDate = new Date(data.releaseDate);
    }

    if (data.backdropPath !== values?.backdropPath) {
      valuesToUpdate.backdropPath = data.backdropPath;
    }

    if (data.posterPath !== values?.posterPath) {
      valuesToUpdate.posterPath = data.posterPath;
    }

    if (data.trailerLink !== values?.trailerLink) {
      valuesToUpdate.trailerLink = data.trailerLink;
    }

    if (data.voteCount !== values?.voteCount) {
      valuesToUpdate.voteCount = data.voteCount;
    }

    if (data.voteAverage !== values?.voteAverage) {
      valuesToUpdate.voteAverage = data.voteAverage;
    }

    if (data.budget !== values?.budget) {
      valuesToUpdate.budget = data.budget;
    }

    if (data.revenue !== values?.revenue) {
      valuesToUpdate.revenue = data.revenue;
    }

    if (onSubmitMovie) {
      onSubmitMovie(valuesToUpdate);
    }
  }

  function handleOnClose() {
    setReset(!reset);
    if (onClose) {
      onClose();
    }
  }
  return (
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
        <EditMovieAccordionForm
          values={values}
          createdGenres={createdGenres}
          genres={genreDataOptions}
          ratings={ratingsDataOptions}
          languages={languageDataOptions}
          onCreateGenre={onCreateGenre}
          onUploadFile={onUploadFile}
          onFormReady={(form) => setForm(form)}
        />
        <DrawerFooter className="flex-row justify-end gap-4 items-end">
          <Button variant="secondary" asChild>
            <DrawerClose>
              Cancelar 
            </DrawerClose>
          </Button>
          <Button onClick={handleMovieSubmit}>
            Atualizar filme
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}