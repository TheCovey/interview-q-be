function post(parent, _args, context) {
	return context.prisma.post({ coachID: parent.id });
}

function reviews(parent, args, context) {
  return context.prisma.reviews({where: {coach: parent.id}})
}

module.exports = {
  post,
  reviews
};
