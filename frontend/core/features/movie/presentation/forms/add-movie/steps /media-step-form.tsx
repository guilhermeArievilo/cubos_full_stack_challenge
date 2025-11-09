import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/ui/shadcn-io/dropzone";
import { ContentType } from "@/core/features/upload/domain/entities/contentType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  backdropPath: z.string().min(1, 'Adicione uma foto de fundo.'),
  posterPath: z.string().min(1, 'Adicione uma poster'),
  trailerLink: z.string().min(1, 'Adicione um link do trailer do filme.'),
})

export type MediaFormSchemaType = z.infer<typeof formSchema>

interface MediaStepFormProps {
  values?: MediaFormSchemaType;
  onFormReady?: (method: UseFormReturn<MediaFormSchemaType>) => void;
  onUploadFile?: (fileName: string, contentType: ContentType, file: File) => Promise<{ uploadPath: string } | null>;
}

export default function MediaStepForm({ values, onFormReady, onUploadFile }: MediaStepFormProps) {
  const [backdrop, setBackdrop] = useState<File[] | undefined>();
  const [backdropPreview, setBackdropPreview] = useState<string | undefined>();

  const [poster, setPoster] = useState<File[] | undefined>();
  const [posterPreview, setPosterPreview] = useState<string | undefined>();

  const form = useForm<MediaFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: values || {
      trailerLink: ""
    }
  });

  async function handleDropBackdrop(files: File[]) {
    setBackdrop(files);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setBackdropPreview(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }

    if (onUploadFile !== undefined) {
      const res = await onUploadFile(files[0].name, files[0].type as ContentType, files[0]);
      form.setValue('backdropPath', res?.uploadPath ?? '');
    }
  };

  async function handleDropPoster(files: File[]) {
    setPoster(files);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setPosterPreview(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }

    if (onUploadFile !== undefined) {
      const res = await onUploadFile(files[0].name, files[0].type as ContentType, files[0]);
      form.setValue('posterPath', res?.uploadPath ?? '');
    }
  };
  
  useEffect(() => {
    if (onFormReady) {
      onFormReady(form);
    }
  }, [form, onFormReady])

  return (
    <Form {...form}>
      <form className="grid grid-cols-2 gap-4">
        <span className="col-span-2 text-xl font-semibold">Insira as mídias do filme</span>
        
        <FormField
          control={form.control}
          name="backdropPath"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Capa de fundo</FormLabel>
              <FormControl>
                <Dropzone
                  accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                  onDrop={handleDropBackdrop}
                  onError={() => toast.error("Ops, tivemos problema para fazer o upload.")}
                  src={backdrop}
                >
                  <DropzoneEmptyState />
                  <DropzoneContent>
                    {backdropPreview && (
                      <div className="h-[102px] w-full">
                        <img
                          alt="Preview"
                          className="absolute top-0 left-0 h-full w-full object-cover"
                          src={backdropPreview}
                        />
                      </div>
                    )}
                  </DropzoneContent>
                </Dropzone>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="posterPath"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Poster</FormLabel>
              <FormControl>
                <Dropzone
                  accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                  onDrop={handleDropPoster}
                  onError={() => toast.error("Ops, tivemos problema para fazer o upload.")}
                  src={poster}
                >
                  <DropzoneEmptyState />
                  <DropzoneContent>
                    {posterPreview && (
                      <div className="h-[102px] w-full">
                        <img
                          alt="Preview"
                          className="absolute top-0 left-0 h-full w-full object-cover"
                          src={posterPreview}
                        />
                      </div>
                    )}
                  </DropzoneContent>
                </Dropzone>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="trailerLink"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Link do trailer</FormLabel>
              <FormControl>
                <Input
                  placeholder="Cole o link do trailer"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}