import RadolanService from "../services/RadolanService";
import { createDatetimeArray } from "./createDatetimeArray";

export async function getRadolanDataByGridId(gridId) {
  // make POST request to backend server to retrieve filtered data
  const response = await RadolanService.getRadolanByGridId(gridId);

  const datetimes = createDatetimeArray(14);
  // eslint-disable-next-line
  const values = [] as any;

  const datetimesSplit = datetimes.map(timestamp => {
    return timestamp.split(":")[0];
  });

  for (const i of response.data) {
    i.time = i.time.split(":")[0];
  }

  datetimesSplit.forEach(element => {
    values.push(0);
    for (const i of response.data) {
      if (i.time == element) {
        values.pop();
        values.push(i.value);
      }
    }
  });

  const Data = {
    datetimes: datetimes,
    values: values
  };

  return { Data };
}
