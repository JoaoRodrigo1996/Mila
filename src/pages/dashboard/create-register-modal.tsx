import { X } from "lucide-react";
import { Button } from "../../components/button";

interface CreateRegisterModalProps {
  closeCreateRegisterModal: () => void
}

export function CreateRegisterModal({ closeCreateRegisterModal }: CreateRegisterModalProps){
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] space-y-5 rounded-2xl py-5 px-6 shadow-lg bg-zinc-950">
        <div className="">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-wide">Criar novo registro</h2>
            <Button onClick={closeCreateRegisterModal} variant='icon' size='icon'>
              <X className='size-5 text-zinc-400' />
            </Button>
          </div>
          <p className="text-sm text-zinc-400 ">
            Digite as informações pedidas abaixo e comece a criar seu histórico.
          </p>
        </div>

        <form className="space-y-4">
          <fieldset className='flex flex-col space-y-2'>
            <label htmlFor="" className='text-sm text-zinc-200 font-medium tracking-wide'>Taxa glicemica</label>
            <input type="text" className='bg-zinc-900 px-4 py-2 rounded-lg' placeholder="125" />
          </fieldset>
          <fieldset className='flex flex-col space-y-2'>
            <label htmlFor="" className='text-sm text-zinc-200 font-medium tracking-wide'>quantidade de insulina aplicada (ui)</label>
            <input type="text" className='bg-zinc-900 px-4 py-2 rounded-lg' placeholder="16" />
          </fieldset>
          <Button type='submit' size='full'>Registrar</Button>
        </form>
      </div>
    </div>
  )
}
