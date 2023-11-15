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
          <i class="i-custom-search text-2xl"></i>
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
