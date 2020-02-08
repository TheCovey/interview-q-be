module.exports = {
	createAvailability,
	deleteAvailability,
	createBooking,
  deleteBooking,
}

const { getUserId } = require('../../../utils');

async function createAvailability(_parent, args, context) {
	const { year, month, day, hour, minute } = args;
	const coach = getUserId(context);

	const uniquecheck = [
		coach,
		year,
		month,
		day,
		hour,
		minute,
	].reduce((acc, val) => acc + '-' + val);

	return context.prisma.createAvailability({
		...args,
		coach,
		isOpen: true,
		uniquecheck,
	});
}

function deleteAvailability(_parent, args, context) {
	return context.prisma.deleteAvailability({ uniquecheck: args.uniquecheck });
}

// Mutations/Operations for Bookings
async function createBooking(_parent, args, context) {
	const {
		year,
		month,
		day,
		hour,
		minute,
		coach,
		interviewGoals,
		interviewQuestions,
    resumeURL,
    price,
  } = args;

  const date = createISOString(year, month, day, hour, minute);
	const seeker = getUserId(context);
	const uniquecheck = [coach, year, month, day, hour, minute].reduce(
		(acc, val) => acc + '-' + val,
  );
  
	await context.prisma.updateAvailability({
		data: { isOpen: false },
		where: { uniquecheck: args.availabilityA },
  });
  
	await context.prisma.updateAvailability({
		data: { isOpen: false },
		where: { uniquecheck: args.availabilityB },
	});

	return context.prisma.createBooking({
		year,
		month,
		day,
		hour,
		minute,
		coach,
    seeker,
    date,
		availability: {
			connect: [
				{ uniquecheck: args.availabilityA },
				{ uniquecheck: args.availabilityB },
			],
		},
		uniquecheck,
		interviewGoals,
		interviewQuestions,
    resumeURL,
    price
	});
}

async function deleteBooking(_parent, args, context) {
	const availability = await context.prisma
		.booking({
			uniquecheck: args.uniquecheck,
		})
		.availability();

	await context.prisma.updateAvailability({
		data: { isOpen: true },
		where: { uniquecheck: availability[0].uniquecheck },
	});
	await context.prisma.updateAvailability({
		data: { isOpen: true },
		where: { uniquecheck: availability[1].uniquecheck },
	});

	return context.prisma.deleteBooking({ uniquecheck: args.uniquecheck });
}

function createISOString(year, month, day, hour, minute) {
  const newMonth = ( month < 10 ? `0${month}` : month );
  const newDay = ( day < 10 ? `0${day}` : day );
  const newHour = ( hour < 10 ? `0${hour}` : hour );
  const newMinute = ( minute < 10 ? `0${minute}` : minute );
  return `${year}-${newMonth}-${newDay}T${newHour}:${newMinute}:00.000Z`;
}