module.exports = { review, booking };

function review(parent, _args, context) {
	return context.prisma.response({ id: parent.id }).review();
}

function booking(parent, _args, context) {
	return context.prisma.response({ id: parent.id }).booking();
}
