const {
  createPost,
	deletePost,
	updatePost,
	deleteIndustry,
	updateIndustry,
	removeTagFromPost,
} = require('./1_Posts_Industries_Tags');

const {
	createAvailability,
	deleteAvailability,
	createBooking,
  deleteBooking,
} = require('./2_Availabilities_Bookings');

const {
	createReview,
	updateReview,
	deleteReview,
	createResponse,
	updateResponse,
	deleteResponse,
	createReport,
	updateReport,
} = require('./3_Reviews_Responses_Reports');

module.exports = {
	createPost,
	deletePost,
	updatePost,
	deleteIndustry,
	updateIndustry,
	removeTagFromPost,
	createAvailability,
	deleteAvailability,
	createBooking,
	deleteBooking,
	createReview,
	updateReview,
	deleteReview,
	createResponse,
	updateResponse,
	deleteResponse,
	createReport,
	updateReport,
};
