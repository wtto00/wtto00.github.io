import Fuse from 'fuse.js';
import { slugify, unicodeSlugify } from '@/utils/slugify';
import type { CollectionEntry } from 'astro:content';
import { createEffect, createMemo, createSignal, type JSX, For } from 'solid-js';
import { LOCALE } from '@/config';

interface Props {
  searchList: CollectionEntry<'blog'>['data'][];
}

interface SearchResult {
  item: CollectionEntry<'blog'>['data'];
  refIndex: number;
}

export default function SearchBar(props: Props) {
  let inputRef: HTMLInputElement;

  const [inputVal, setInputVal] = createSignal('');
  const [searchResults, setSearchResults] = createSignal<SearchResult[] | null>(null);

  const handleChange: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event> = (e) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = createMemo(
    () =>
      new Fuse(props.searchList, {
        keys: ['title', 'description'],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
      }),
  );

  createEffect(() => {
    // if URL has search query,
    // insert that search query in input field
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get('q');
    if (searchStr) setInputVal(searchStr);

    // put focus cursor at the end of the string
    setTimeout(function () {
      inputRef.selectionStart = inputRef.selectionEnd = searchStr?.length || 0;
    }, 50);
  });

  createEffect(() => {
    // Add search result only if
    // input value is more than one character
    const inputResult = inputVal().length > 1 ? fuse().search(inputVal()) : [];
    setSearchResults(inputResult);

    // Update search string in URL
    if (inputVal().length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('q', inputVal());
      const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
      history.replaceState(history.state, '', newRelativePathQuery);
    } else {
      history.replaceState(history.state, '', window.location.pathname);
    }
  });

  return (
    <>
      <label class="relative block">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2 op-75">
          <i class="i-custom-search text-2xl" />
        </span>
        <input
          class="block w-full b-1 b-base b-op-40 rounded bg-fill py-3 pl-10 pr-3 focus:b-accent placeholder:italic placeholder:text-op-75 focus:outline-none"
          placeholder="输入关键字搜索..."
          type="text"
          name="search"
          value={inputVal()}
          onChange={handleChange}
          auto-complete="off"
          auto-focus
          ref={(el) => (inputRef = el)}
        />
      </label>

      {inputVal().length > 1 && (
        <div class="mt-8">
          关键词 '{inputVal()}'，找到 {searchResults()?.length} 个结果
        </div>
      )}

      <ul>
        <For each={searchResults()}>
          {(props) => (
            <li class="my-6">
              <a
                href={`/posts/${slugify(props.item)}/`}
                class="inline-block text-lg font-medium c-accent underline-offset-4 decoration-dashed focus-visible:underline-offset-0 focus-visible:no-underline"
              >
                {/* eslint-disable-next-line solid/style-prop */}
                <h3
                  class="text-lg font-medium decoration-dashed hover:underline"
                  style={{ 'view-transition-name': unicodeSlugify(props.item.title) }}
                >
                  {props.item.title}
                </h3>
              </a>
              <div class="relative z-1 flex items-center space-x-2">
                <i class="i-custom-calendar h-6 w-6 op-80" />
                <span class="text-4 italic op-80">
                  {props.item.pubDatetime.toLocaleDateString(LOCALE, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  <span aria-hidden="true"> |</span>
                  <span class="sr-only">&nbsp;at</span>
                  {props.item.pubDatetime.toLocaleTimeString(LOCALE, {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <p>{props.item.description}</p>
            </li>
          )}
        </For>
      </ul>
    </>
  );
}
