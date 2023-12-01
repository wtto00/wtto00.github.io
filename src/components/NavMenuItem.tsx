import { SITE } from '@/config'
import { children, type JSXElement } from 'solid-js'

interface Props {
  active?: boolean
  route: string
  spanSingle?:boolean
  aProps?: Record<string, string>
  children?: JSXElement
}

export default function NavMenuItem(props: Props) {
  const c = children(() => props.children);

  return (
    <li class={`flex items-center justify-center ${props.spanSingle?'col-span-1':'col-span-2'}`}>
      <a
        href={`${SITE.base}${props.route}`}
        classList={{ 'underline decoration-wavy decoration-2 underline-offset-4': props.active }}
        class='w-full px-4 py-3 text-center font-medium sm:my-0 sm:px-2 sm:py-1 hover:c-accent'
        {...props.aProps}
      >
        {c()}
      </a>
    </li>
  )
}

