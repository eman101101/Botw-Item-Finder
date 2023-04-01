// get the category dropdown and add an event listener to it
const categoryDropdown = document.getElementById("category");
categoryDropdown.addEventListener("change", () => {
  fetchData(); // when the dropdown is changed, fetch new data
});

async function fetchData() {
  const category = categoryDropdown.value; // get the selected category
  document.getElementById("myInput").value = ""; // clear the search input
  const response = await fetch(`https://botw-compendium.herokuapp.com/api/v2/category/${category}`);
  const data = await response.json(); // get the JSON data from the API

  const resultsElement = document.getElementById("results");
  resultsElement.innerHTML = ""; // clear the results list

  // if the category is "creatures", display both food and non-food results
  if (category === "creatures") {
    displayResults(data.data.food);
    displayResults(data.data.non_food);
  } else {
    displayResults(data.data);
  }
}

function displayResults(results) {
  const resultsElement = document.getElementById("results");
  results.forEach(item => {
    // create a new list item for each result
    const li = document.createElement("li");
    // format the item name with title case
    li.textContent = item.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    li.addEventListener("click", () => {
      showItemDetails(item); // when the item is clicked, show its details
    });
    resultsElement.appendChild(li); // add the new list item to the results list
  });
}

function showItemDetails(item) {
  const itemDetails = document.getElementById("itemDetails");
  const itemName = document.getElementById("itemName");
  const itemImage = document.getElementById("itemImage");
  const itemDescription = document.getElementById("itemDescription");

  // set the item details
  itemName.textContent = item.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  itemImage.src = item.image;
  itemDescription.textContent = item.description;

  itemDetails.style.display = "block"; // show the item details
}

function myFunction() {
  // Declare variables
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("results");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those that don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
