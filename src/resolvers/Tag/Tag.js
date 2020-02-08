module.exports = { posts };

function posts(root, _args, context) {
	return context.prisma.tag({ id: root.id }).posts();
}
