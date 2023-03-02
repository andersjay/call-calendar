import { zodResolver } from "@hookform/resolvers/zod";
import { Text, TextInput, Button, TextArea} from "@ignite-ui/react";
import { CalendarBlank, Clock } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ConfirmForm, FormActions, FormError, FormHeader } from "./styles";

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter no mínimo 3 caracteres'}),
  email: z.string().email({ message: 'O email deve ser válido'}),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {

  const {register, handleSubmit, formState:{ isSubmitting, errors}} = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema)
  })

  function handleConfirmScheduling(data: ConfirmFormData) {
    console.log(data)
  }

  return (
    <ConfirmForm as='form' onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          22 de abril de 2023
        </Text>
        <Text>
          <Clock />
          18:00h
        </Text>
      </FormHeader>
      
      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')}/>
        {errors.name && (
          <FormError size="sm">{errors.name.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Endereço de email</Text>
        <TextInput type='email' placeholder="jhondoe@example.com" {...register('email')}/>
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')}/>
      </label>

      <FormActions>
        <Button type="button" variant="tertiary" disabled={isSubmitting}>Cancelar</Button>
        <Button type="submit">Confirmar</Button>
      </FormActions>
    </ConfirmForm>
  )
}