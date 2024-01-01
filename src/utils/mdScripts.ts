/**
 * markdown渲染要执行的脚本
 * 主要是在博客文章页面
 */

/* --------------------------------- 复制代码 Start --------------------------------- */
const copyButtonLabel = '复制代码';
/** 代码片段添加`复制代码`按钮，并实现相应功能 */
export async function addCopyCodeBtn() {
  const codeBlocks = Array.from(document.querySelectorAll('pre'));

  for (const codeBlock of codeBlocks) {
    const wrapper = document.createElement('div');
    wrapper.className = 'code-wrapper';

    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code';
    copyButton.innerHTML = copyButtonLabel;

    if (!codeBlock.parentNode) continue;
    codeBlock.parentNode.replaceChild(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);
    wrapper.appendChild(copyButton);

    copyButton.addEventListener('click', async () => {
      await copyCode(codeBlock, copyButton);
    });
  }
}

async function copyCode(block: HTMLPreElement, button: HTMLButtonElement) {
  const code = block.querySelector('code');
  const text = code?.innerText;
  if (!text) return;

  await navigator.clipboard.writeText(text);

  // visual feedback that task is completed
  button.innerText = '已复制';

  setTimeout(() => {
    button.innerText = copyButtonLabel;
  }, 700);
}
/* --------------------------------- 复制代码 End --------------------------------- */

/* --------------------------------- 标题链接复制 Start --------------------------------- */
async function copyLink(headLink: HTMLLinkElement) {
  const href = headLink.getAttribute('href');
  if (!href) return;

  const url = new URL(href, window.location.href);
  await navigator.clipboard.writeText(url.href);

  const label = document.createElement('label');
  label.innerText = '已复制';
  label.className = 'head-copy-label';
  headLink.insertAdjacentElement('afterend', label);

  setTimeout(() => {
    label.remove();
  }, 700);
}

/** 标题链接点击是复制操作，而不是默认跳转 */
export function headLinkCopy() {
  const allHeadLink = document.querySelectorAll<HTMLLinkElement>('.head-link');
  allHeadLink.forEach((headLink) => {
    headLink.addEventListener('click', (e: Event) => {
      copyLink(headLink);
      e.preventDefault();
    });
  });
}
/* --------------------------------- 标题链接复制 End --------------------------------- */
