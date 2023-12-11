import { createSignal } from 'solid-js';

interface Props {
  slug: string;
  text: string;
  index: string | number;
}

export default function PostTocItem(props: Props) {
  const [active] = createSignal(false);

  function goHead(e: MouseEvent) {
    const head = document.querySelector(`#${props.slug}`);
    if (head) {
      head.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
    e.preventDefault();
  }

  return (
    <a
      title={props.text}
      aria-hidden={active()}
      class={`${
        active() ? 'op-100' : 'op-50 hover:op-100'
      } truncate text-sm inline-block max-w-full cursor-pointer c-base`}
      onClick={goHead}
    >
      {props.index}. {props.text}
    </a>
  );
}
