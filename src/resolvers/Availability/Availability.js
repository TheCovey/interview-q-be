module.exports = {
	coach,
	__resolveReference,
};

function coach(availability) {
	return { __typename: 'User', id: availability.coach };
}

function __resolveReference(availability, context) {
	return context.prisma.availability({ id: availability.id });
}
