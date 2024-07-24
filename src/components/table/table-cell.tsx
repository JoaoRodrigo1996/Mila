import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableCell extends ComponentProps<'td'> {}

export function TableCell({className, ...props}: TableCell){
  return (
    <td className={twMerge('py-3 px-4 text-sm text-zinc-300', className)} {...props}/>
  )
}