import wradlib as wrl
from tqdm import tqdm
import pandas as pd
import geopandas as gpd

radolan_grid_wgs84 = wrl.georef.get_radolan_grid(900, 900, wgs84=True)

df = pd.DataFrame(radolan_grid_wgs84.tolist())

print(df.head())

# radolan_grid_wgs84_900x898 = radolan_grid_wgs84.tolist()[1:][:-1]
# radolan_grid_wgs84_898x898 = []

# for row in radolan_grid_wgs84_900x898:
#     radolan_grid_wgs84_898x898.append(row[:1][:-1])

# print(radolan_grid_wgs84.shape)

# print(len(radolan_grid_wgs84_900x898))
# print(len(radolan_grid_wgs84_898x898[765]))

radolan_grid_wgs84_wkt = []

# for x in tqdm(radolan_grid_wgs84.tolist(), total=900):
#     for y in x:
#         lat = y[0]
#         lon = y[1]
#         wkt_representation = f"POINT ({lat} {lon})"
#         radolan_grid_wgs84_wkt.append(wkt_representation)

# print(len(radolan_grid_wgs84_wkt))
