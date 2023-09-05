const dlButtonEl = document.querySelectorAll(
  '[data-specific-auth-trigger="download"]'
)[0];

const parent = dlButtonEl.parentElement;
const totalDownloads = dlButtonEl.querySelector("span").textContent;

console.log("Downloads:", totalDownloads);
console.log(dlButtonEl.parentElement);

// have to create a new button, as Vue uses a virtual DOM and still
// redirects even with all attributes stripped
const newDownloadButton = document.createElement("div");
newDownloadButton.classList.add(
  "protected-auth",
  "flex",
  "h-10",
  "items-center",
  "p-2",
  "border",
  "border-solid",
  "rounded",
  "cursor-pointer",
  "border-black-500",
  "md:border-black-400",
  "hover:bg-black-100",
  "active:bg-black-200",
  "mr-3"
);

newDownloadButton.innerHTML = `
    <i class="w-5 h-5 mr-1 icon icon-downloads"></i>
    <span class="text-sm leading-tight">${totalDownloads}</span>
`;

newDownloadButton.addEventListener("click", () => {
  chrome.runtime.sendMessage("getDownloadUrl", (url) => {
    if (url) {
      window.open(url, "_blank").focus();
    }
  });
});

dlButtonEl.remove(); // remove cringe ah ah premium button

parent.insertBefore(newDownloadButton, parent.children[2]);
