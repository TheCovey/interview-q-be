module.exports = { coach, seeker, booking, review };

function coach(report) {
	return { __typename: 'User', id: report.coach };
}

function seeker(report) {
	return { __typename: 'User', id: report.seeker };
}

function booking(parent, _args, context) {
	return context.prisma.report({ id: parent.id }).booking();
}

function review(parent, _args, context) {
	return context.prisma.report({ id: parent.id }).review();
}
