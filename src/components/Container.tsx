import { cn } from '@/utils/cn'
import { DetailedHTMLProps, FC, HTMLAttributes, HTMLProps, ReactNode } from 'react'

interface ContainerProps {
  children?: ReactNode
  className?: string
  props?: HTMLProps<HTMLDivElement>
}

const Container: FC<ContainerProps> = ({children, props, className}) => {
  return (
    <div 
      {...props}
      className={cn('w-full bg-white border rounded-xl flex py-4 shadow-sm', className)}
    >
      {children}  
    </div>
  )
}

export default Container