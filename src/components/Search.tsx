import type { CollectionEntry } from 'astro:content';
import Fuse from 'fuse.js';
import { createEffect, createMemo, createSignal, For, type JSX, Show } from 'solid-js';

import { getLocalDate, getLocalTime } from '@/utils/datetime';
import { slugify, unicodeSlugify } from '@/utils/slugify';

type Post = CollectionEntry<'blog'>['data'];

interface SearchResult {
  item: Post;
  refIndex: number;
}

export default function SearchBar() {
  let inputRef: HTMLInputElement;

  const [posts, setPosts] = createSignal<Post[]>([]);
  const [index, setIndex] = createSignal(null);
  const [inputVal, setInputVal] = createSignal('');
  const [searchResults, setSearchResults] = createSignal<SearchResult[]>([]);

  const handleChange: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event> = (e) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = createMemo(() => {
    const parsedIndex = index() ? Fuse.parseIndex(index()) : undefined;
    return new Fuse<Post>(
      posts(),
      {
        keys: ['title', 'description'],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
      },
      parsedIndex,
    );
  });
  createEffect(() => {
    fetch('/posts.json')
      .then((resp) => resp.json())
      .then(({ posts, index }) => {
        setPosts(posts);
        setIndex(index);
      });
  });

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
      <div class="relative">
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
      </div>

      <Show when={inputVal().length > 1}>
        <div class="mt-8">
          关键词 '{inputVal()}'，找到 {searchResults()?.length} 个结果
        </div>
      </Show>

      <ul>
        <For each={searchResults()}>
          {({ item: post }) => (
            <li class="my-6">
              <a
                href={`/posts/${slugify(post)}/`}
                class="inline-block text-lg font-medium c-accent underline-offset-4 decoration-dashed focus-visible:underline-offset-0 focus-visible:no-underline"
              >
                <h3
                  // eslint-disable-next-line solid/style-prop
                  style={{ 'view-transition-name': unicodeSlugify(post.title) }}
                  class="text-lg font-medium decoration-dashed hover:underline"
                >
                  {post.title}
                </h3>
              </a>
              <div class="relative z-1 flex items-center space-x-2">
                <i class="i-custom-calendar h-6 w-6 op-80" />
                <span class="text-4 italic op-80">
                  {getLocalDate(post.pubDatetime)}
                  <span aria-hidden="true"> | </span>
                  <span class="sr-only">&nbsp;at</span>
                  {getLocalTime(post.pubDatetime)}
                </span>
              </div>
              <p>{post.description}</p>
            </li>
          )}
        </For>
      </ul>
    </>
  );
}
