module.exports = {
	interviewQinfo,
	post,
	posts,
	postByCoach,
	industry,
	industries,
	availabilities,
	availabilitiesByCoach,
	availabilityByUniquecheck,
	bookings,
	bookingsByCoach,
	bookingsBySeeker,
	bookingByUniquecheck,
	reviewsByCoach,
	reviewsByPost,
	ratingByCoach,
	reviewsBySeeker,
	reviewByBooking,
	responseByBooking,
	responseByReview,
	reportsByCoach,
	reportsBySeeker,
	reportByBooking,
};

function interviewQinfo() {
	return '"Welcome to InterviewQ" - love JQH';
}

// Post queries
function post(_parent, args, context) {
	return context.prisma.post({ id: args.id });
}

function posts(_parent, args, context) {
	// Create filter here
	let where = { AND: [{ isPublished: true }] };
	if (args.industry) {
		where.AND.push({ industry: { name: args.industry } });
	}
	if (args.price) {
		let prices = args.price.split(',');
		where.AND.push({ price_gte: Number(prices[0]) });
		where.AND.push({ price_lte: Number(prices[1]) });
	}
	let idx;
	if (args.tags) {
		args.tags = args.tags.toLowerCase();
		let tags = args.tags.split(',');
		idx = where.AND.push({ OR: [] });
		let nextIdx = where.AND[idx - 1].OR.push({ tags_some: { OR: [] } });
		// let idx where.AND.push({ tags_some: { OR: [] } });
		tags.forEach(tag => {
			where.AND[idx - 1].OR[0].tags_some.OR.push({ name_contains: tag.trim() });
			where.AND[idx - 1].OR.push({ desc_lc_contains: tag.trim() });
			where.AND[idx - 1].OR.push({ company_lc_starts_with: tag.trim() });
			where.AND[idx - 1].OR.push({ position_lc_contains: tag.trim() });
		});
		if (args.ids) {
			args.ids.forEach(id => {
				where.AND[idx - 1].OR.push({ coachID: id });
			});
		}
	}
	return context.prisma.posts({ where, orderBy: args.orderBy });
}

function postByCoach(_parent, args, context) {
	return context.prisma.post({ coachID: args.coach_id });
}

// Industry queries
function industry(_parent, args, context) {
	return context.prisma.posts({ where: { industry: { name: args.name } } });
}

function industries(_parent, _args, context) {
	return context.prisma.industries();
}

// Availabilities queries
function availabilities(_parents, _args, context) {
	return context.prisma.availabilities();
}

function availabilitiesByCoach(_parents, args, context) {
	return context.prisma.availabilities({ where: { coach: args.coach_id } });
}

function availabilityByUniquecheck(_parents, args, context) {
	return context.prisma.availability({
		uniquecheck: args.uniquecheck,
	});
}

// Bookings queries
function bookings(_parents, _args, context) {
	return context.prisma.bookings();
}

function bookingsByCoach(_parents, args, context) {
	return context.prisma.bookings({
		where: { coach: args.coach_id },
		orderBy: 'date_DESC',
	});
}

function bookingsBySeeker(_parents, args, context) {
	return context.prisma.bookings({
		where: { seeker: args.seeker_id },
		orderBy: 'date_DESC',
	});
}

function bookingByUniquecheck(_parents, args, context) {
	return context.prisma.booking({
		uniquecheck: args.uniquecheck,
	});
}

// Reviews queries
function reviewsByCoach(_parents, args, context) {
	return context.prisma.reviews({ where: { coach: args.coach_id } });
}

function reviewsByPost(_parents, args, context) {
	return context.prisma.post({ where: { id: args.post_id } }).reviews();
}

async function ratingByCoach(_parents, args, context) {
	const reviews = await context.prisma.reviews({
		where: { coach: args.coach_id },
	});

	const avgRating =
		reviews.reduce((acc, val) => acc + val.rating, 0) / reviews.length;

	return Math.round(avgRating * 10) / 10;
}

function reviewsBySeeker(_parents, args, context) {
	return context.prisma.reviews({ where: { seeker: args.seeker_id } });
}

function reviewByBooking(_parents, args, context) {
	return context.prisma.booking({ uniquecheck: args.uniqueBooking }).review();
}

// Response queries
function responseByBooking(_parents, args, context) {
	return context.prisma.booking({ uniquecheck: args.uniqueBooking }).response();
}

function responseByReview(_parents, args, context) {
	return context.prisma.review({ id: args.review_id }).response();
}

// Reports queries
function reportsByCoach(_parents, args, context) {
	return context.prisma.reports({ where: { coach: args.coach_id } });
}

function reportsBySeeker(_parents, args, context) {
	return context.prisma.reports({ where: { seeker: args.seeker_id } });
}

function reportByBooking(_parents, args, context) {
	return context.prisma.booking({ uniquecheck: args.uniqueBooking }).report();
}
