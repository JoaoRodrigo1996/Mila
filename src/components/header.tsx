import { Bell } from "lucide-react";

export function Header(){
  return (
    <header className="h-12 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <img src="/logo.svg" alt="" className="" />
        <menu className="flex itemce gap-5">
          <li><a href="/" className="text-sm text-zinc-400 focus:underline focus:underline-offset-4 focus:text-zinc-100 hover:text-zinc-100 hover:underline hover:underline-offset-4 transition-colors">Página inicial</a></li>
          <li><a href="/history" className="text-sm text-zinc-400 focus:underline focus:underline-offset-4 focus:text-zinc-100 hover:text-zinc-100 hover:underline hover:underline-offset-4 transition-colors">Histórico</a></li>
        </menu>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center gap-3">
          <button className='text-zinc-400 hover:text-zinc-100 transition-colors'>
            <Bell className="size-5" />
          </button>
        </div>

        <div className="h-6 w-px bg-zinc-800" />

        <button className="size-8 rounded-full">
          <img 
            src="https://github.com/JoaoRodrigo1996.png" 
            alt="Foto de perfil" 
            className="size-8 rounded-full object-cover" 
          />
        </button>
      </div>
    </header>
  )
}
