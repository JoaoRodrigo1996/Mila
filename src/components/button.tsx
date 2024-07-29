import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { twMerge } from 'tailwind-merge'

const buttonVariant = tv({
  base: 'px-4 py-2 flex items-center justify-center gap-2 rounded-lg text-zinc-50 font-medium transition-colors',
  variants: {
    variant: {
      primary: 'bg-blue-600',
      secondary: 'bg-zinc-800',
      tertiary: 'bg-transparent border border-zinc-800'
    },
    size: {
      icon: 'p-2.5 rounded-xl',
      xs: 'h-8 text-xs',
      sm: 'h-10 text-sm',
      md: 'h-12',
      lg: 'h-16'
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md'
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariant> {}

export function Button({size, variant, className, ...props}: ButtonProps){
  return (
    <button 
      className={twMerge(buttonVariant({ size, variant }), className)} 
      {...props} 
    />
  )
}
