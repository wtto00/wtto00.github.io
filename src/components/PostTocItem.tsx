import { createSignal } from 'solid-js';

interface Props {
  slug: string;
  text: string;
  index: number;
}

export default function PostTocItem(props: Props) {
  const [active] = createSignal(false);

  return (
    <a
      href={`#${props.slug}`}
      title={props.text}
      aria-hidden={active()}
      class={`${
        active() ? 'text-neutral-700 dark:text-neutral ' : 'text-neutral dark:text-neutral-700'
      } truncate inline-block max-w-full align-bottom hover:text-neutral`}
    >
      {props.index + 1}. {props.text}
    </a>
  );
}
