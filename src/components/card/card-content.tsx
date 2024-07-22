import { ComponentProps } from "react";

interface CardContent extends ComponentProps<'div'>{}

export function CardContent({...props}: CardContent){
  return (
    <div className="" {...props} />
  )
}
