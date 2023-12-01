const copyButtonLabel = "复制代码";
export async function addCopyCodeBtn() {
  const codeBlocks = Array.from(document.querySelectorAll("pre"));

  for (const codeBlock of codeBlocks) {
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";

    const copyButton = document.createElement("button");
    copyButton.className = "copy-code";
    copyButton.innerHTML = copyButtonLabel;

    codeBlock.setAttribute("tabindex", "0");
    codeBlock.appendChild(copyButton);
    // wrap codebock with relative parent element
    codeBlock.parentNode?.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);

    copyButton.addEventListener("click", async () => {
      await copyCode(codeBlock, copyButton);
    });
  }

}

async function copyCode(block: HTMLPreElement, button: HTMLButtonElement) {
  const code = block.querySelector("code");
  const text = code?.innerText;
  if (!text) return

  await navigator.clipboard.writeText(text);

  // visual feedback that task is completed
  button.innerText = "已复制";

  setTimeout(() => {
    button.innerText = copyButtonLabel;
  }, 700);
}