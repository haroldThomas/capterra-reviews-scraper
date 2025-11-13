onst axios = require('axios');
const cheerio = require('cheerio');

// Function to fetch Capterra reviews
const fetchReviews = async (url) => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const reviews = [];

    $('.review').each((index, element) => {
      const reviewerName = $(element).find('.reviewer-name').text();
      const reviewRating = $(element).find('.review-rating').text();
      const reviewText = $(element).find('.review-text').text();
      const reviewDate = $(element).find('.review-date').text();
      const productName = $(element).find('.product-name').text();

      reviews.push({
        reviewer_name: reviewerName,
        review_rating: reviewRating,
        review_text: reviewText,
        review_date: reviewDate,
        product_name: productName,
      });
    });

    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

module.exports = { fetchReviews };