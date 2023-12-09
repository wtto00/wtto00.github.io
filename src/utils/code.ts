const copyButtonLabel = '复制代码';
export async function addCopyCodeBtn() {
  const codeBlocks = Array.from(document.querySelectorAll('pre'));

  for (const codeBlock of codeBlocks) {
    const wrapper = document.createElement('div');
    wrapper.className = 'code-wrapper';

    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code';
    copyButton.innerHTML = copyButtonLabel;

    codeBlock.setAttribute('tabindex', '0');
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
