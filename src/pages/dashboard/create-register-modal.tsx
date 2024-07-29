import { X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";

interface CreateRegisterModalProps {
  closeCreateRegisterModal: () => void
  createRegister: (event: FormEvent<HTMLFormElement>) => void
  setRate: (rate: string) => void
  setQuantity: (quantity: string) => void
}

export function CreateRegisterModal({ closeCreateRegisterModal, setQuantity, setRate, createRegister }: CreateRegisterModalProps){
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

        <form onSubmit={createRegister} className="space-y-4">
          <fieldset className='flex flex-col space-y-2'>
            <label htmlFor="rate" className='text-sm text-zinc-200 font-medium tracking-wide'>Taxa glicemica</label>
            <input 
              type="text" 
              id="rate" 
              name='rate' 
              onChange={(event) => setRate(event.target.value)} 
              className='bg-zinc-900 px-4 py-2 rounded-lg' 
              placeholder="125" 
            />
          </fieldset>
          <fieldset className='flex flex-col space-y-2'>
            <label htmlFor="quantity" className='text-sm text-zinc-200 font-medium tracking-wide'>quantidade de insulina aplicada (ui)</label>
            <input 
              type="text" 
              id='quantity' 
              name='quantity' 
              onChange={(event) => setQuantity(event.target.value)}
              className='bg-zinc-900 px-4 py-2 rounded-lg' 
              placeholder="16" 
            />
          </fieldset>
          <Button type='submit' className="w-full" size='md'>Registrar</Button>
        </form>
      </div>
    </div>
  )
}
