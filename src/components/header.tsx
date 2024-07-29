import { ChevronDown, LogIn, LogOut } from "lucide-react";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";

import { Button } from "./button";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export function Header(){
  const { isSignedIn, user } = useUser()
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false)

  function toggleDropdownMenu(){
    setIsDropdownMenuOpen(state =>! state)
  }

  return (
    <header className="h-12 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <img src="/logo.svg" alt="" className="" />
        {
          isSignedIn && (
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
        isSignedIn ? (
          <div className="relative flex items-center gap-4">
            <button onClick={toggleDropdownMenu} className="group flex items-center gap-4">
              <div className="size-10 rounded-full">
                <img 
                  src={user.imageUrl} 
                  alt="Foto de perfil" 
                  className="size-10 rounded-full object-cover" 
                />
              </div>
              <ChevronDown className='size-4 text-zinc-400 group-hover:text-zinc-50' />
            </button>
            {
              isDropdownMenuOpen && (
                <div className="px-5 py-3 space-y-4 rounded-lg shadow-lg absolute -bottom-36 -left-60 w-[320px] bg-zinc-900">
                  <div className="flex gap-2">
                    <img 
                      src={user.imageUrl} 
                      alt="Foto de perfil" 
                      className="size-10 rounded-full object-cover" 
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.fullName}</span>
                      <span className="text-sm text-zinc-400">{user.emailAddresses.map(email => email.emailAddress)}</span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-zinc-700" />

                  <div className="flex items-center justify-between">
                    <SignOutButton>
                      <Button variant='secondary' size='sm' className="ml-auto">
                        Sair
                        <LogOut className="size-4" />
                      </Button>
                    </SignOutButton>
                  </div>
                </div>
              )
            }
          </div>
        ) : (
          <SignInButton mode="modal">
            <Button size='sm'>
              Entrar com o Google
              <LogIn className='size-4' />
            </Button>
          </SignInButton>
        )
      }
    </header>
  )
}
