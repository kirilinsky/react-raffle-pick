import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type ContainerElement = 'div' | 'section' | 'header' | 'footer' | 'main'

export type ContainerProps<T extends ElementType = 'div'> = {
  as?: T
  children: ReactNode
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Container<T extends ContainerElement = 'div'>({
  as,
  children,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component className={twMerge('mx-auto w-full max-w-[1240px] px-4 sm:px-6', className)} {...props}>
      {children}
    </Component>
  )
}
