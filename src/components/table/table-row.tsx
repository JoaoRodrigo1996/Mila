import { ComponentProps } from "react";

interface TableRow extends ComponentProps<'tr'> {}

export function TableRow({...props}: TableRow){
  return (
    <tr key={Math.random()} className='hover:bg-white/5' {...props}/>
  )
}