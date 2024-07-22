import { ComponentProps } from "react";

interface TableCell extends ComponentProps<'td'> {}

export function TableCell({...props}: TableCell){
  return (
    <td className='py-3 px-4 text-sm text-zinc-300' {...props}/>
  )
}