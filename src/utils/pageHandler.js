onst { fetchReviews } = require('../scraper');

// Function to handle pagination and scrape all pages
const handlePagination = async (startUrl) => {
  let allReviews = [];
  let currentPageUrl = startUrl;

  while (currentPageUrl) {
    console.log(`Scraping reviews from: ${currentPageUrl}`);
    const reviews = await fetchReviews(currentPageUrl);
    allReviews = [...allReviews, ...reviews];

    const nextPage = getNextPageUrl(currentPageUrl);
    if (!nextPage) break;

    currentPageUrl = nextPage;
  }

  return allReviews;
};

// Function to get the next page URL (implement your pagination logic here)
const getNextPageUrl = (currentUrl) => {
  const nextPagePattern = /page=(\d+)/;
  const match = currentUrl.match(nextPagePattern);
  
  if (match) {
    const nextPageNumber = parseInt(match[1], 10) + 1;
    return currentUrl.replace(nextPagePattern, `page=${nextPageNumber}`);
  }
  return null;
};

module.exports = { handlePagination };