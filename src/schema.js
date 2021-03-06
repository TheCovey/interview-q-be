const { gql } = require('apollo-server');

const typeDefs = gql`
	# The Query type lists all the different queries (Retrieve operations) that front-end can make from this Endpoint
	# We can name these whatever we want. "Banana" words
	extend type Query {
		interviewQinfo: String!
		posts(
			industry: String
			price: String
			orderBy: String
			tags: String
			ids: [String]
		): [Post!]!
		post(id: String!): Post!
		postByCoach(coach_id: String!): Post!
		industries: [Industry]!
		industry(name: String!): [Post!]!
		availabilities: [Availability]
		availabilitiesByCoach(coach_id: String!): [Availability]
		availabilityByUniquecheck(uniquecheck: String!): Availability!
		bookings: [Booking]
		bookingsByCoach(coach_id: String!): [Booking]
		bookingsBySeeker(seeker_id: String!): [Booking]
		bookingByUniquecheck(uniquecheck: String!): Booking!
		reviewsByCoach(coach_id: String!): [Review]
		reviewsByPost(post_id: String!): [Review]
		ratingByCoach(coach_id: String!): Float
		reviewsBySeeker(seeker_id: String!): [Review]
		reviewByBooking(uniqueBooking: String!): Review
		responseByBooking(uniqueBooking: String!): Response
		responseByReview(review_id: String!): Response
		reportsByCoach(coach_id: String!): [Report]
		reportsBySeeker(seeker_id: String!): [Report]
		reportByBooking(uniqueBooking: String!): Report
	}

	# ***************************************************

	# The Mutation type lists all the different CUD (Create, Update, Delete) operations that front-end can make from this Endpoint
	type Mutation {
		createPost(
			price: Int
			position: String
			industryName: String
			description: String
			tagString: String
			company: String
			isPublished: Boolean!
		): Post!

		deletePost: Post!

		updatePost(
			id: ID!
			price: Int
			position: String
			industryName: String
			description: String
			tagString: String
			company: String
			isPublished: Boolean
		): Post!

		removeTagFromPost(id: ID!, tagID: String): Post!

		createAvailability(
			hour: Int!
			minute: Int!
			# coach: String!
			# bookingId: String
			year: Int!
			month: Int!
			day: Int!
			recurring: Boolean!
		): Availability!

		deleteAvailability(uniquecheck: String!): Availability!

		createBooking(
			year: Int!
			month: Int!
			day: Int!
			hour: Int!
			minute: Int!
			coach: String!
			# seeker: String!
			availabilityA: String!
			availabilityB: String!
			pending: Boolean
			confirmed: Boolean
			interviewGoals: String
			interviewQuestions: String
      resumeURL: String
      price: Int!
		): Booking!

		deleteBooking(uniquecheck: String!): Booking!

		createReview(
			# coach: String!
			# seeker: String!
			uniqueBooking: String!
			rating: Int!
			review: String
		): Review!

		updateReview(id: String!, rating: Int, review: String): Review!

		deleteReview(id: String!): Review!

		createResponse(
			reviewID: String!
			text: String!
			uniqueBooking: String!
		): Response!

		updateResponse(id: String!, text: String): Response!

		deleteResponse(id: String!): Response!

		createReport(
			# coach: String!
			# seeker: String!
			uniqueBooking: String!
			strengths: String!
			growthAreas: String!
			suggestions: String!
			additionalComments: String
			isSent: Boolean!
		): Report!

		updateReport(id: String!): Report!
	}

	# ***************************************************

	# All of the types below are ones that we create and are what make up the different tables in our Prisma database.

	# Every created type needs an ID, which will be a random string of characters generated by Prisma

	#The datamodel.prisma file should match this part, although that file includes @id for every primary key ID
	scalar DateTime

	type Post {
		id: ID!
		price: Int!
		position: String!
		industry: Industry!
		description: String!
		tags: [Tag]!
		coach: User!
		company: String!
		isPublished: Boolean!
		createdAt: DateTime!
		lastUpdated: DateTime!
		reviews: [Review]!
	}

	extend type User @key(fields: "id") {
		id: ID! @external
		post: Post
		availability: [Availability]
		coach_bookings: [Booking]
    seeker_bookings: [Booking]
    reviews: [Review]
	}

	type Industry {
		id: ID!
		name: String!
		posts: [Post]!
	}

	type Tag {
		id: ID!
		name: String!
		posts: [Post]!
	}

	type Availability {
		id: ID!
		hour: Int!
		minute: Int!
		coach: User!
		bookingID: String
		year: Int!
		month: Int!
		day: Int!
		uniquecheck: String!
		isOpen: Boolean!
		recurring: Boolean!
	}

	type Booking {
		id: ID!
		year: Int!
		month: Int!
		day: Int!
		hour: Int!
		minute: Int!
		coach: User!
		seeker: User!
		uniquecheck: String!
		availability: [Availability]!
		pending: Boolean
		confirmed: Boolean
		interviewGoals: String
		interviewQuestions: String
		resumeURL: String
		review: Review
		response: Response
    report: Report
    price: Int!
	}

	type Review {
		id: ID!
		coach: User!
		seeker: User!
		booking: Booking!
		rating: Int!
		review: String
		createdAt: DateTime!
		lastUpdated: DateTime!
		response: Response
		# post: Post!
	}

	type Response {
		id: ID!
		review: Review!
		text: String!
		createdAt: DateTime!
		lastUpdated: DateTime!
		booking: Booking!
	}

	type Report {
		id: ID!
		coach: User!
		seeker: User!
		booking: Booking!
		strengths: String!
		growthAreas: String!
		suggestions: String!
		additionalComments: String
		createdAt: DateTime!
		isSent: Boolean
	}
`;

module.exports = typeDefs;
