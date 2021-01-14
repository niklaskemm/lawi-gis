import RadolanService from "../services/RadolanService";

export async function getRadolanDataAtLocation(
  LonLat,
  radolanFilter = ["rd.id", "rd.time", "rd.value"]
) {
  const radolanWKT = `POINT (${LonLat[0]} ${LonLat[1]})`;
  // make POST request to backend server to retrieve filtered data
  const response = await RadolanService.getRadolanByGeom(
    radolanFilter,
    radolanWKT
  );

  const Data = {
    radolanData: response.data.rows,
    radolanValue14: 0
  };

  const today = new Date().getTime();

  Data.radolanData.forEach(element => {
    const dtObject = new Date(element.time).getTime();
    const diffDays = (today - dtObject) / (1000 * 3600 * 24);
    if (diffDays <= 14) {
      Data.radolanValue14 += element.value;
    }
  });

  return { Data };
}
