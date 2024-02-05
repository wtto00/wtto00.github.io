interface Props {
  expanded?: boolean
  onClick: () => void
}
export default function NavMenuBtn(props: Props) {
  return (
    <button
      class="self-end p-1 sm:hidden"
      aria-label={props.expanded ? 'Close Menu' : 'Open Menu'}
      aria-expanded={props.expanded ? 'true' : 'false'}
      aria-controls="menu-items"
      onClick={() => props.onClick()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-6 w-6 scale-125 fill-base hover:fill-accent"
      >
        <line
          x1="7"
          y1="12"
          x2="21"
          y2="12"
          class="transition-opacity duration-75 ease-in-out"
          classList={{ 'op-0': props.expanded }}
        />
        <line
          x1="3"
          y1="6"
          x2="21"
          y2="6"
          class="transition-opacity duration-75 ease-in-out"
          classList={{ 'op-0': props.expanded }}
        />
        <line
          x1="12"
          y1="18"
          x2="21"
          y2="18"
          class="transition-opacity duration-75 ease-in-out"
          classList={{ 'op-0': props.expanded }}
        />
        <line
          x1="18"
          y1="6"
          x2="6"
          y2="18"
          class="transition-opacity duration-75 ease-in-out"
          classList={{ 'op-0': !props.expanded }}
        />
        <line
          x1="6"
          y1="6"
          x2="18"
          y2="18"
          class="transition-opacity duration-75 ease-in-out"
          classList={{ 'op-0': !props.expanded }}
        />
      </svg>
    </button>
  )
}
