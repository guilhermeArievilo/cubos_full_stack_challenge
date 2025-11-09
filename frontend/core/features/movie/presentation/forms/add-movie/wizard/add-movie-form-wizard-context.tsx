'use client'

import { UseFormReturn } from "react-hook-form";
import { FinancialFormSchemaType } from "../steps /financial-step-form";
import { GeralFormSchemaType } from "../steps /geral-step-form";
import { MediaFormSchemaType } from "../steps /media-step-form";
import { PopularityFormSchemaType } from "../steps /popularity-step-form";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AddMovieFormWizardContextType {
  handleSubmit: () => void;
  prev: () => void;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  setCurrentFormMethods: (current:
    UseFormReturn<GeralFormSchemaType> |
    UseFormReturn<MediaFormSchemaType> |
    UseFormReturn<PopularityFormSchemaType> |
    UseFormReturn<FinancialFormSchemaType>
  ) => void;
  fullData: GeralFormSchemaType & MediaFormSchemaType & PopularityFormSchemaType & FinancialFormSchemaType;
  steps: {
    step: number,
    title: string
  }[]
}

const AddMovieFormWizardContext = createContext<AddMovieFormWizardContextType | null>(null);

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

export type MovieWizardData = 
  GeralFormSchemaType &
  MediaFormSchemaType &
  PopularityFormSchemaType &
  FinancialFormSchemaType;

interface AddMovieFormWizardProviderProps {
  children: ReactNode,
  resetTrigger?: boolean,
  onSubmit?: (data: MovieWizardData) => void 
}

export function AddMovieFormWizardProvider({ children, onSubmit, resetTrigger }: AddMovieFormWizardProviderProps) {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [formMethods, setFormMethods] = useState<UseFormReturn<GeralFormSchemaType> | UseFormReturn<MediaFormSchemaType> | UseFormReturn<PopularityFormSchemaType> | UseFormReturn<FinancialFormSchemaType> | null>(null)
  const [fullData, setFullData] = useState<MovieWizardData | undefined>(undefined);

  const [disableAfterSubmit, setDisableAfterSubmit] = useState(false);
  
  function handleSubmit() {
    if (formMethods) {
      formMethods.handleSubmit(nextStep)();
    }
  }

  async function nextStep(data: GeralFormSchemaType | MediaFormSchemaType | PopularityFormSchemaType | FinancialFormSchemaType) {
    setCurrentStep(currentStep + 1);
    setFullData({
      ...fullData!,
      ...data
    })

    if (currentStep === steps.length) {
      if (onSubmit !== undefined) {
        onSubmit({...fullData!, ...data})
      }
      setDisableAfterSubmit(true)
    }
  }

  function prevStep() {
    setCurrentStep(currentStep - 1);
  }

  function setCurrentFormMethods(current:
    UseFormReturn<GeralFormSchemaType> |
    UseFormReturn<MediaFormSchemaType> |
    UseFormReturn<PopularityFormSchemaType> |
    UseFormReturn<FinancialFormSchemaType>
  ) {
    setFormMethods(current);
  }

  useEffect(() => {
    setCurrentStep(1);
    formMethods?.reset();
  }, [resetTrigger])
  return (
    <AddMovieFormWizardContext.Provider value={{
      handleSubmit,
      prev: prevStep,
      currentStep,
      setCurrentStep,
      setCurrentFormMethods,
      fullData: fullData!,
      steps
    }}>
      {children}
    </AddMovieFormWizardContext.Provider>
  )
}

export const useAddMovieFormWizard = () => {
  const context = useContext(AddMovieFormWizardContext);

  if (!context) {
    throw new Error("useAddMovieFormWizard should be use inside of the AddMovieFormWizardContext.")
  }

  return context;
}