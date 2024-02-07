document.addEventListener("DOMContentLoaded", function () {
  // Parse the query parameters to retrieve the data
  var queryString = window.location.search.substring(1);
  var data = JSON.parse(decodeURIComponent(queryString));

  // Use the retrieved data as needed
  console.log("Retrieved data in new webpage:", data);

  // Example: Display the retrieved data on the new webpage
  document.getElementById("inputField1").value = data.input1 || "";
  document.getElementById("inputField2").value = data.input2 || "";
  document.getElementById("selectedText").innerText = data.selectedText || "";
  document.getElementById("url").innerText = data.url || "";
});
