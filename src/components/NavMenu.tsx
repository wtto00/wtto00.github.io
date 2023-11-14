import { slugifyStr } from "@/utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import { createSignal } from "solid-js";
import { SITE } from "@/config";
import LinkButton from "./LinkButton.astro";

export interface Props {
    activeNav?: 'posts' | 'tags' | 'about' | 'search'
}

export default function NavMenu({ activeNav }: Props) {
    const [menuExpanded, setMenuExpanded] = createSignal(false)

    function toggleMenuExpanded() {
        console.log(11);

        setMenuExpanded(!menuExpanded())
    }

    return (
        <nav id='nav-menu' class='flex w-full flex-col items-center sm:ml-2 sm:flex-row sm:justify-end sm:space-x-4 sm:py-0'>
            <button
                class='self-end p-1 sm:hidden focus-outline'
                aria-label={menuExpanded() ? 'Close Menu' : 'Open Menu'}
                aria-expanded={menuExpanded() ? 'true' : 'false'}
                aria-controls='menu-items'
                onClick={toggleMenuExpanded}
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    stroke-width='1.5'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    class='scale-125 h-6 w-6 fill-base hover:fill-accent'
                >
                    <line x1='7' y1='12' x2='21' y2='12' class='transition-opacity duration-75 ease-in-out' classList={{ 'op-0': menuExpanded() }}></line>
                    <line x1='3' y1='6' x2='21' y2='6' class='transition-opacity duration-75 ease-in-out' classList={{ 'op-0': menuExpanded() }}></line>
                    <line x1='12' y1='18' x2='21' y2='18' class='transition-opacity duration-75 ease-in-out' classList={{ 'op-0': menuExpanded() }}></line>
                    <line x1='18' y1='6' x2='6' y2='18' class='transition-opacity duration-75 ease-in-out' classList={{ 'op-0': !menuExpanded() }}></line>
                    <line x1='6' y1='6' x2='18' y2='18' class='transition-opacity duration-75 ease-in-out' classList={{ 'op-0': !menuExpanded() }}></line>
                </svg>
            </button>
            <ul
                id='menu-items'
                class='mt-4 grid w-44 grid-cols-2 grid-rows-4 gap-x-2 gap-y-2 sm:(flex ml-0 mt-0 w-auto gap-x-5 gap-y-0)'
                classList={{ 'hidden': !menuExpanded() }}
            >
                <li class='col-span-2 flex items-center justify-center'>
                    <a
                        href={`${SITE.base}/posts`}
                        classList={{ 'underline decoration-wavy decoration-2 underline-offset-4': activeNav === 'posts' }}
                        class='w-full px-4 py-3 text-center font-medium hover:c-accent sm:my-0 sm:px-2 sm:py-1'
                    >
                        文章
                    </a>
                </li>
                <li class='col-span-2 flex items-center justify-center'>
                    <a
                        href={`${SITE.base}/tags`}
                        classList={{ 'underline decoration-wavy decoration-2 underline-offset-4': activeNav === 'tags' }}
                        class='w-full px-4 py-3 text-center font-medium hover:c-accent sm:my-0 sm:px-2 sm:py-1'
                    >
                        标签
                    </a>
                </li>
                <li class='col-span-2 flex items-center justify-center'>
                    <a
                        href={`${SITE.base}/about`}
                        classList={{ 'underline decoration-wavy decoration-2 underline-offset-4': activeNav === 'about' }}
                        class='w-full px-4 py-3 text-center font-medium hover:c-accent sm:my-0 sm:px-2 sm:py-1'
                    >
                        关于
                    </a>
                </li>
                <li class='col-span-1 flex items-center justify-center'>
                    <a
                        href={`${SITE.base}/search`}
                        tabindex='0'
                        class={`w-auto flex px-4 py-3 text-center font-medium inline-block hover:c-accent sm:my-0 sm:px-2 sm:py-1 focus-outline p-3 sm:p-1 ${activeNav === 'search' ? 'active' : ''}`}
                        aria-label='search'
                        title='Search'
                        aria-disabled='false'
                    >
                        <i class="i-custom-search text-2xl scale-125 sm:scale-100" classList={{ 'fill-accent': activeNav === 'search' }}></i>
                    </a>
                </li>
                <li class='col-span-1 flex items-center justify-center'>
                    <button
                        id='theme-btn'
                        class='p-3 sm:p-1 focus-outline'
                        title='Toggles light & dark'
                        aria-label='auto'
                        aria-live='polite'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            id='moon-svg'
                            class='dark:hidden scale-125 hover:rotate-12 sm:scale-100 h-6 w-6 fill-base hover:fill-accent'
                        >
                            <path
                                d='M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z'
                            ></path>
                        </svg>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            id='sun-svg'
                            class='hidden dark:block scale-125 hover:rotate-12 sm:scale-100 h-6 w-6 fill-base hover:fill-accent'
                        >
                            <path
                                d='M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z'
                            ></path>
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
}
