let pdfUrl;

chrome.webRequest.onCompleted.addListener(
  (details) => {
    pdfUrl = details.url;
    console.log(details);
  },
  {
    urls: ["*://*.studydrive.net/d/prod/documents/*"],
  }
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "getDownloadUrl") {
    sendResponse(pdfUrl);
  }
});
