function fetchWorkData() {
  // Fetch the work data from the JSON file
  fetch("./assets/js/workdata.json")
    .then((response) => response.json())
    .then((data) => {
      workData = data;
      setupFilters(workData); // Call the function to set up filters
      displayWorkItems(workData); // Call the function to display work items
    })
    .catch((error) => console.error("Error fetching work data:", error));
}

// Call the function to fetch work data
fetchWorkData();

function setupFilters(workData) {
  const portfolioFilters = document.querySelector("#portfolio-flters");

  // Get unique categories from the data
  const categories = [
    ...new Set(workData.workItems.map((item) => item.category)),
  ];

  // Generate filter list items
  const filterItemsHTML = categories
    .map((category) => {
      return `<li data-filter=".filter-${category.toLowerCase()}">${category}</li>`;
    })
    .join("");

  portfolioFilters.innerHTML = filterItemsHTML;
}

function displayWorkItems(workData) {
  const portfolioContainer = document.querySelector(".portfolio-container");
  let portfolioItemsHTML = "";

  workData.workItems.forEach((item) => {
    portfolioItemsHTML += `
        <div class="col-lg-4 col-md-6 portfolio-item filter-${item.category.toLowerCase()}">
          <div class="portfolio-wrap">
            <img src="${item.image}" class="img-fluid" alt="${item.title}" />
            <div class="portfolio-links">
            
              <a href="${
                item.link
              }" title="More Details"><i class="bx bx-link"></i></a>
            </div>
          </div>
        </div>`;
  });

  portfolioContainer.innerHTML = portfolioItemsHTML;
}
