import { create } from "zustand";

export interface AuthState {
  isLoggedIn: boolean
  logIn: () => void
  signOut: () => void
}

export const useStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  
  logIn: () => {
    set({
      isLoggedIn: true
    })
  },

  signOut: () => {
    set({
      isLoggedIn: false
    })
  }
}))
