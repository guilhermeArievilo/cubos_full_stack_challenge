import { UseFormReturn } from "react-hook-form";
import { Genre } from "../../../domain/entities/genre";
import FinancialStepForm, { FinancialFormSchemaType } from "./steps /financial-step-form";
import GeralStepForm, { GeralFormSchemaType } from "./steps /geral-step-form";
import MediaStepForm, { MediaFormSchemaType } from "./steps /media-step-form";
import PopularityStepForm, { PopularityFormSchemaType } from "./steps /popularity-step-form";
import { useState } from "react";
import { Stepper, StepperIndicator, StepperItem, StepperTitle, StepperTrigger } from "@/components/ui/stepper";

interface AddMovieFormByStepProps {
  onSubmit: (data: GeralFormSchemaType &
    MediaFormSchemaType &
    PopularityFormSchemaType &
    FinancialFormSchemaType
  ) => void;
  loading?: boolean;
  genres?: Genre[];
  onCreateGenre: () => void;
}

const steps = [
  {
    step: 1,
    title: "Geral",
  },
  {
    step: 2,
    title: "Mídia",
  },
  {
    step: 3,
    title: "Popularidade",
  },
  {
    step: 4,
    title: "Financeiro",
  },
]

export default function AddMovieFormByStep({
  onSubmit,
  loading,
  genres,
  onCreateGenre
}: AddMovieFormByStepProps) {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [formMethods, setFormMethods] = useState<UseFormReturn<GeralFormSchemaType> | UseFormReturn<MediaFormSchemaType> | UseFormReturn<PopularityFormSchemaType> | UseFormReturn<FinancialFormSchemaType> | null>(null)
  const [fullData, setFullData] = useState<(GeralFormSchemaType & MediaFormSchemaType & PopularityFormSchemaType & FinancialFormSchemaType) | undefined>(undefined);

  const [disableAfterSubmit, setDisableAfterSubmit] = useState(false);

  function handleSubmit() {
    if (formMethods) {
      formMethods.handleSubmit(nextStep)();
    }
  }

  function nextStep(data: GeralFormSchemaType | MediaFormSchemaType | PopularityFormSchemaType | FinancialFormSchemaType) {
    setCurrentStep(currentStep + 1);
    setFullData({
      ...fullData!,
      ...data
    })

    if (currentStep === steps.length) {
      onSubmit({...fullData!, ...data})
      setDisableAfterSubmit(true)
    }
  }

  function prevStep() {
    setCurrentStep(currentStep - 1);
  }

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
          onFormReady={setFormMethods}
          onCreateGenre={onCreateGenre}
          genres={genres}
          />
        :
        currentStep === 2 ?
        <MediaStepForm values={fullData} onFormReady={setFormMethods}/>
        :
        currentStep === 3 ?
        <PopularityStepForm values={fullData} onFormReady={setFormMethods}/>
        :
        <FinancialStepForm onFormReady={setFormMethods}/>
      }
    </div>
  )
}