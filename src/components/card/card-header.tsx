import { ComponentProps } from "react";

interface CardHeaderProps extends ComponentProps<'div'> {}

export function CardHeader({...props}: CardHeaderProps){
  return (
    <div className="flex flex-col" {...props}/>
  )
}
