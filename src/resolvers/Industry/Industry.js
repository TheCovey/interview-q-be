module.exports = { posts };

function posts(parent, _args, context) {
	return context.prisma.industry({ id: parent.id }).posts();
}
