// Mutations/Operations for Tag
module.exports = { addNewTags, deleteDisconnectedTags }
function addNewTags(array, context) {
	return array.map(async tag => {
		return await context.prisma.upsertTag({
			where: {
				name: tag.name,
			},
			create: {
				name: tag.name,
			},
			update: {
				name: tag.name,
			},
		});
	});
}

function deleteDisconnectedTags(context, tags) {
	return Promise.all(
		tags.map(async tag => {
			if (
				(await context.prisma
					.postsConnection({ where: { tags_some: { id: tag.id } } })
					.aggregate()
					.count()) === 0
			) {
				return await context.prisma.deleteTag({ id: tag.id });
			}
		}),
	);
}