module.exports = {
	coach,
	seeker,
	__resolveReference,
	availability,
	review,
	response,
	report,
};

function coach(booking) {
	return { __typename: 'User', id: booking.coach };
}

function seeker(booking) {
	return { __typename: 'User', id: booking.seeker };
}

function __resolveReference(booking, context) {
	return context.prisma.booking({ id: booking.id });
}

function availability(parent, _args, context) {
	return context.prisma.booking({ id: parent.id }).availability();
}

function review(parent, _args, context) {
	return context.prisma.booking({ id: parent.id }).review();
}

function response(parent, _args, context) {
	return context.prisma.booking({ id: parent.id }).response();
}

function report(parent, _args, context) {
	return context.prisma.booking({ id: parent.id }).report();
}
