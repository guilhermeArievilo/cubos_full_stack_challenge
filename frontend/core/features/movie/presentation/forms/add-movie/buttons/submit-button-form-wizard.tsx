import { Button } from "@/components/ui/button";
import { useAddMovieFormWizard } from "../wizard/add-movie-form-wizard-context";

export default function SubmitButtonFormWizard() {
  const { handleSubmit, currentStep, steps } = useAddMovieFormWizard();
  return (
    <Button onClick={handleSubmit}>
      { currentStep < steps.length ? 'Próximo' : 'Adicionar filme' }
    </Button>
  )
}