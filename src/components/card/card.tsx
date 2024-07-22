import { ComponentProps } from "react";

interface CardProps extends ComponentProps<'div'> {
}

export function Card({...props}: CardProps){
  return (
    <div 
      className="space-y-4 border p-6 border-zinc-800 rounded-lg" 
      {...props}
    />
  )
}
