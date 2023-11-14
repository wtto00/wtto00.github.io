import Fuse from "fuse.js";
import Card from "@/components/Card";
import slugify from "@/utils/slugify";
import type { CollectionEntry } from "astro:content";
import { createEffect, createMemo, createSignal, type JSX } from "solid-js";

export type SearchItem = {
  title: string;
  description: string;
  data: CollectionEntry<"blog">["data"];
};

interface Props {
  searchList: SearchItem[];
}

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

export default function SearchBar({ searchList }: Props) {
  let inputRef: HTMLInputElement | null = null;
  const [inputVal, setInputVal] = createSignal('');
  const [searchResults, setSearchResults] = createSignal<SearchResult[] | null>(
    null
  );

  const handleChange: JSX.InputEventHandler<HTMLInputElement, InputEvent> = (e) => {
    setInputVal(e.currentTarget.value);
  };

  const fuse = createMemo(() => new Fuse(searchList, {
    keys: ["title", "description"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.5,
  }));

  createEffect(() => {
    // if URL has search query,
    // insert that search query in input field
    const searchUrl = new URLSearchParams(window.location.search);
    const searchStr = searchUrl.get("q");
    if (searchStr) setInputVal(searchStr);

    // put focus cursor at the end of the string
    setTimeout(function () {
      inputRef.selectionStart = inputRef.selectionEnd =
        searchStr?.length || 0;
    }, 50);
  })

  createEffect(() => {
    // Add search result only if
    // input value is more than one character
    let inputResult = inputVal().length > 1 ? fuse().search(inputVal()) : [];
    setSearchResults(inputResult);

    // Update search string in URL
    if (inputVal().length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("q", inputVal());
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.replaceState(history.state, "", newRelativePathQuery);
    } else {
      history.replaceState(history.state, "", window.location.pathname);
    }
  })

  return (
    <>
      <label class="relative block">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2 op-75">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"></path>
          </svg>
        </span>
        <input
          class="block w-full rounded b b-fill 
        b-op-40 bg-fill py-3 pl-10
        pr-3 placeholder:italic placeholder:text-op-75 
        focus:b-accent focus:outline-none"
          placeholder="输入关键字搜索..."
          type="text"
          name="search"
          value={inputVal()}
          onChange={handleChange}
          auto-complete="off"
          auto-focus
          ref={inputRef}
        />
      </label>

      {inputVal().length > 1 && (
        <div class="mt-8">
          Found {searchResults()?.length}
          {searchResults()?.length && searchResults()?.length === 1
            ? " result"
            : " results"}{" "}
          for '{inputVal()}'
        </div>
      )}

      <ul>
        {searchResults() &&
          searchResults().map(({ item, refIndex }) => (
            <Card
              href={`/posts/${slugify(item.data)}`}
              frontmatter={item.data}
            />
          ))}
      </ul>
    </>
  );
}
