'use client'
import { Genre } from "../../../../domain/entities/genre";
import FinancialStepForm, { FinancialFormSchemaType } from "../steps /financial-step-form";
import GeralStepForm, { GeralFormSchemaType } from "../steps /geral-step-form";
import MediaStepForm, { MediaFormSchemaType } from "../steps /media-step-form";
import PopularityStepForm, { PopularityFormSchemaType } from "../steps /popularity-step-form";
import { Stepper, StepperIndicator, StepperItem, StepperTitle, StepperTrigger } from "@/components/ui/stepper";
import { useAddMovieFormWizard } from "./add-movie-form-wizard-context";
import { Language } from "@/core/features/movie/domain/entities/language";
import { ContentType } from "@/core/features/upload/domain/entities/contentType";

interface AddMovieFormByStepProps {
  genres?: Genre[];
  createdGenres?: Genre[];
  languages?: Language[];
  onCreateGenre: () => void;
  onUploadFile?: (fileName: string, contentType: ContentType, file: File) => Promise<{ uploadPath: string } | null>;
}

export default function AddMovieFormStepper({
  genres,
  languages,
  onCreateGenre,
  createdGenres,
  onUploadFile
}: AddMovieFormByStepProps) {
  const { currentStep, setCurrentStep, steps, setCurrentFormMethods, fullData } = useAddMovieFormWizard();

  return (
    <div className="flex flex-col gap-6">
      <Stepper value={currentStep} onValueChange={setCurrentStep}>
        {steps.map(({ step }) => (
          <StepperItem key={step} step={step} className="flex-1">
            <StepperTrigger
              className="w-full flex-col items-start gap-2"
              asChild
            >
              <StepperIndicator
                asChild
                className="h-2 w-full rounded-none bg-border"
              >
                <span className="sr-only">{step}</span>
              </StepperIndicator>
            </StepperTrigger>
          </StepperItem>
        ))}
      </Stepper>
      {
        currentStep === 1 ?
        <GeralStepForm
          values={fullData}
          onFormReady={setCurrentFormMethods}
          onCreateGenre={onCreateGenre}
          genres={genres}
          createdGenres={createdGenres}
          languages={languages}
        />
        :
        currentStep === 2 ?
        <MediaStepForm
          values={fullData}
          onFormReady={setCurrentFormMethods}
          onUploadFile={onUploadFile}
        />
        :
        currentStep === 3 ?
        <PopularityStepForm values={fullData} onFormReady={setCurrentFormMethods}/>
        :
        <FinancialStepForm onFormReady={setCurrentFormMethods}/>
      }
    </div>
  )
}