import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { twMerge } from 'tailwind-merge'

const buttonVariant = tv({
  base: 'flex items-center justify-center gap-2 rounded-lg text-zinc-950 font-medium transition-colors',
  variants: {
    variant: {
      primary: 'bg-cyan-400',
      secondary: 'bg-zinc-900',
      icon: 'bg-zinc-950 border border-zinc-800 '
    },
    size: {
      icon: 'text-white p-2.5 rounded-xl',
      default: 'px-4 py-2 text-sm',
      full: 'w-full h-11'
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default'
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariant> {}

export function Button({size, variant, ...props}: ButtonProps){
  return (
    <button 
      className={twMerge(buttonVariant({ size, variant }))} 
      {...props} 
    />
  )
}
