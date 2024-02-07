// Listen for messages from popup.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "storeData") {
    chrome.storage.local.set({ extensionData: request.data }, function () {
      console.log("Data stored:", request.data);
    });
  } else if (request.action === "retrieveData") {
    chrome.storage.local.get("extensionData", function (result) {
      sendResponse(result.extensionData || {});
    });
    // Return true to indicate that we want to send a response asynchronously
    return true;
  }
});
