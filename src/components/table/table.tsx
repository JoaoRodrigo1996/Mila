import { ComponentProps } from "react";

interface TableProps extends ComponentProps<'table'> {}

export function Table({...props}: TableProps){
  return (
    <section className="border-y border-zinc-800">
      <table className='w-full' {...props} />
    </section>
  )
}
