import { X } from "lucide-react";
import { Button } from "../../components/button";

import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axios";
import { defineStatus } from "../../utils/define-status";
import { RegistersProps } from ".";

interface CreateRegisterModalProps {
  closeCreateRegisterModal: () => void
}

const bodySchema = z.object({
  rate: z.string(),
  quantity: z.string()
})

type BodySchemaData = z.infer<typeof bodySchema>

export function CreateRegisterModal({ closeCreateRegisterModal }: CreateRegisterModalProps){
  const { register, handleSubmit } = useForm<BodySchemaData>({
    resolver: zodResolver(bodySchema)
  })

  const queryClient = useQueryClient()

  const { mutateAsync: createRegisterFn } = useMutation({
    mutationFn: createRegister,
    onSuccess(_, variables){
      queryClient.getQueryData(['registers']),
      queryClient.setQueryData(['registers'], (data: RegistersProps[]) => {
        return [
          {
            date: new Date(),
            rate: variables.rate,
            quantity: variables.quantity,
            status: defineStatus(variables.rate)
          },
          ...data
        ]
      })
    }
  })

  async function createRegister(data: BodySchemaData){
    const newRegister = {
      rate: data.rate,
      quantity: data.quantity,
      date: new Date()
    }   

    await api.post('/glycemic', newRegister)
  }
  
  async function handleCreateRegister(data: BodySchemaData){
    try {
      await createRegisterFn({ rate: data.rate, quantity: data.quantity })
    }catch (error){
      console.log(error)
    }

  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] space-y-5 rounded-2xl py-5 px-6 shadow-lg bg-zinc-950">
        <div className="">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-wide">Criar novo registro</h2>
            <Button onClick={closeCreateRegisterModal} variant='tertiary' size='icon'>
              <X className='size-4 text-zinc-400' />
            </Button>
          </div>
          <p className="text-sm text-zinc-400 ">
            Digite as informações pedidas abaixo e comece a criar seu histórico.
          </p>
        </div>

        <form onSubmit={handleSubmit(handleCreateRegister)} className="space-y-4">
          <fieldset className='flex flex-col space-y-2'>
            <label htmlFor="rate" className='text-sm text-zinc-200 font-medium tracking-wide'>Taxa glicemica</label>
            <input 
              type="text" 
              id="rate" 
              className='bg-zinc-900 px-4 py-2 rounded-lg' 
              placeholder="125" 
              {...register('rate')}
            />
          </fieldset>
          <fieldset className='flex flex-col space-y-2'>
            <label htmlFor="quantity" className='text-sm text-zinc-200 font-medium tracking-wide'>quantidade de insulina aplicada (ui)</label>
            <input 
              type="text" 
              id='quantity' 
              className='bg-zinc-900 px-4 py-2 rounded-lg' 
              placeholder="16" 
              {...register('quantity')}
            />
          </fieldset>
          <Button type='submit' className="w-full" size='md'>Registrar</Button>
        </form>
      </div>
    </div>
  )
}
