module.exports = { industry, coach, tags, __resolveReference, reviews };

function industry(parent, _args, context) {
	return context.prisma.post({ id: parent.id }).industry();
}

function coach(post) {
	return { __typename: 'User', id: post.coachID };
}

function tags(parent, _args, context) {
	return context.prisma.post({ id: parent.id }).tags();
}

function __resolveReference(post, context) {
	return context.prisma.post({ id: post.id });
}

function reviews(parent, _args, context) {
	return context.prisma.post({ id: parent.id }).reviews();
}
