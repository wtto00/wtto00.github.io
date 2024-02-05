import { createSignal } from 'solid-js'

import NavMenuBtn from './NavMenuBtn'
import NavMenuItem from './NavMenuItem'
import Theme from './Theme'

interface Props {
  activeNav?: 'posts' | 'archives' | 'tags' | 'about' | 'search' | undefined
}
export default function NavMenu(props: Props) {
  const [menuExpanded, setMenuExpanded] = createSignal(false)

  return (
    <nav class="w-full flex flex-col items-center sm:ml-2 sm:flex-row sm:justify-end sm:py-0 sm:space-x-4">
      <NavMenuBtn expanded={menuExpanded()} onClick={() => setMenuExpanded(!menuExpanded())} />
      <ul
        class="grid grid-cols-2 grid-rows-4 mt-4 w-44 gap-x-2 gap-y-2 sm:(ml-0 mt-0 w-auto flex gap-x-5 gap-y-0)"
        classList={{ 'lt-sm:hidden': !menuExpanded() }}
      >
        <NavMenuItem active={props.activeNav === 'posts'} route="posts">
          文章
        </NavMenuItem>
        <NavMenuItem active={props.activeNav === 'archives'} route="archives">
          归档
        </NavMenuItem>
        <NavMenuItem active={props.activeNav === 'tags'} route="tags">
          标签
        </NavMenuItem>
        <NavMenuItem active={props.activeNav === 'about'} route="about">
          关于
        </NavMenuItem>
        <NavMenuItem
          active={props.activeNav === 'search'}
          route="search"
          spanSingle
          aProps={{
            'aria-label': 'search',
            title: 'Search',
            'aria-disabled': 'false',
          }}
        >
          <i
            class="i-custom:search mx-auto block scale-125 text-2xl sm:scale-100"
            classList={{ 'fill-accent': props.activeNav === 'search' }}
          />
        </NavMenuItem>

        <li class="col-span-1 flex items-center justify-center">
          <Theme />
        </li>
      </ul>
    </nav>
  )
}
