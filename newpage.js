document.addEventListener("DOMContentLoaded", function () {
  // Parse the query parameters to retrieve the data
  var queryString = window.location.search.substring(1);
  var data = {};
  try {
    data = JSON.parse(decodeURIComponent(queryString));
  } catch (e) {
    // Opened directly or with a malformed query string: show empty fields.
    console.warn("No valid data in query string:", e);
  }

  // Use the retrieved data as needed
  console.log("Retrieved data in new webpage:", data);

  // Example: Display the retrieved data on the new webpage
  document.getElementById("inputField1").value = data.input1 || "";
  document.getElementById("inputField2").value = data.input2 || "";
  document.getElementById("selectedText").innerText = data.selectedText || "";
  document.getElementById("url").innerText = data.url || "";
});
