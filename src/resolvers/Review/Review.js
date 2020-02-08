module.exports = { coach, seeker, booking, response, post, __resolveReference };

function coach(review) {
	return { __typename: 'User', id: review.coach };
}

function seeker(review) {
	return { __typename: 'User', id: review.seeker };
}

function booking(parent, _args, context) {
	return context.prisma.review({ id: parent.id }).booking();
}

function response(parent, _args, context) {
	return context.prisma.review({ id: parent.id }).response();
}

function post(parent, _args, context) {
	return context.prisma.review({ id: parent.id }).post();
}

function __resolveReference(review, context) {
	return context.prisma.reviews({ coach: review.id });
}
