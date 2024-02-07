document.addEventListener("DOMContentLoaded", function () {
  var summaryButton = document.getElementById("summaryButton");
  var inputField1 = document.getElementById("inputField1");
  var inputField2 = document.getElementById("inputField2");

  // Function to display the retrieved data in the popup
  function displayData(data) {
    // Example: Display the retrieved data in console
    console.log("Retrieved data:", data);

    // Example: Update the popup UI with the retrieved data
    inputField1.value = data.input1 || "";
    inputField2.value = data.input2 || "";
  }

  // Function to retrieve stored data from background script
  function retrieveDataFromBackgroundScript(callback) {
    chrome.runtime.sendMessage({ action: "retrieveData" }, function (response) {
      callback(response);
    });
  }

  // Function to store data in local storage via background script
  function storeDataInLocalStorage(data) {
    chrome.runtime.sendMessage({ action: "storeData", data: data });
  }

  // Event listener for the summary button click
  summaryButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var currentUrl = tabs[0].url;

      // Execute content script to retrieve selected text
      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: "window.getSelection().toString();",
        },
        function (selectedText) {
          selectedText = selectedText[0] || ""; // Ensure selectedText is a string
          var inputData = {
            url: currentUrl,
            selectedText: selectedText,
            input1: inputField1.value,
            input2: inputField2.value,
          };

          // Store data in local storage via background script
          storeDataInLocalStorage(inputData);

          // Open a new tab with the new webpage and pass the data as query parameters
          var newTabUrl =
            "newpage.html?" + encodeURIComponent(JSON.stringify(inputData));
          chrome.tabs.create({ url: newTabUrl });
        }
      );
    });
  });

  // Initial retrieval of stored data from background script
  retrieveDataFromBackgroundScript(displayData);
});
