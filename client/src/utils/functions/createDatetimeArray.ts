export function createDatetimeArray(
  date = new Date(),
  daysBefore = 14,
  includeAfter = false
) {
  // eslint-disable-next-line
  const datetimes = [] as any;

  const eventDate = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );

  const startDate = new Date(
    eventDate.setDate(eventDate.getUTCDate() - daysBefore)
  );
  
  // const endDate = new Date(eventDate.setDate(eventDate.getUTCDate() + daysBefore));
  let startDateWithHours = new Date(startDate.setHours(0));
  let i = 0;
  let hours = daysBefore * 24;

  if (includeAfter) {
    hours = hours * 2;
  }

  while (i < hours) {
    startDateWithHours = new Date(
      startDateWithHours.setHours(startDateWithHours.getHours() + 1)
    );
    datetimes.push(startDateWithHours.toISOString());
    i += 1;
  }

  return datetimes;
}
