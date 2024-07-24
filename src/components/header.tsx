import { ChevronDown, LogIn } from "lucide-react";
import { Button } from "./button";
import { useStore } from "../store/auth";
import { NavLink } from "react-router-dom";

export function Header(){
  const { isLoggedIn, logIn } = useStore((store) => {
    return {
      isLoggedIn: store.isLoggedIn,
      logIn: store.logIn,
    }
  })

  return (
    <header className="h-12 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <img src="/logo.svg" alt="" className="" />
        {
          isLoggedIn && (
            <menu className="flex itemce gap-5">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-sm text-zinc-100 underline underline-offset-4 transition-colors" 
                    : "text-sm text-zinc-400 focus:underline focus:underline-offset-4 focus:text-zinc-100 hover:text-zinc-100 hover:underline hover:underline-offset-4 transition-colors"}
              >
                Página inicial
              </NavLink>
              <NavLink 
                to="/history" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-sm text-zinc-100 underline underline-offset-4 transition-colors" 
                    : "text-sm text-zinc-400 focus:underline focus:underline-offset-4 focus:text-zinc-100 hover:text-zinc-100 hover:underline hover:underline-offset-4 transition-colors"}
              >
                Histórico
              </NavLink>
            </menu>
          )
        }
      </div>

      {
        isLoggedIn ? (
          <div className="flex items-center gap-4">
            <button className="group flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium ">Rodrigo Mesquita</span>
                <span className="text-sm text-zinc-400">dev.rodrigomesquita@gmail.com</span>
              </div>
              <div className="size-10 rounded-full">
                <img 
                  src="https://github.com/JoaoRodrigo1996.png" 
                  alt="Foto de perfil" 
                  className="size-10 rounded-full object-cover" 
                />
              </div>
              <ChevronDown className='size-4 text-zinc-400 group-hover:text-zinc-50' />
            </button>
          </div>
        ) : (
          <Button onClick={logIn}>
            Fazer log in
            <LogIn className='size-4' />
          </Button>
        )
      }

    </header>
  )
}
