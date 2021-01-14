export function createDatetimeArray(days) {
  // eslint-disable-next-line
  const datetimes:Array<any> = [];

  const now = new Date();
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );

  const startDate = new Date(today.setDate(today.getUTCDate() - 14));
  let startDateWithHours = new Date(startDate.setHours(0));

  let i = 0;
  const hoursBefore = days * 24;
  while (i < hoursBefore) {
    startDateWithHours = new Date(
      startDateWithHours.setHours(startDateWithHours.getHours() + 1)
    );
    datetimes.push(startDateWithHours.toISOString());
    i += 1;
  }
  return datetimes;
}
