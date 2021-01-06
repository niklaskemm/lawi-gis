import os
import gdal
import urllib
import geopandas

from tqdm import tqdm
from setup import setup_env
from datetime import datetime
from shapely.ops import unary_union


def get_buffer_shp():

    setup_env()

    boundaries_path = os.getenv("BOUNDARIES_PATH")
    boundaries_shp_file = os.getenv("BOUNDARIES_SHP_FILE")
    bounds = os.getenv("BOUNDS")
    temp_path = os.getenv("TEMP_PATH")

    boundaries = geopandas.read_file(
        boundaries_path + "/" + bounds + "/" + bounds
    )

    boundaries = boundaries.to_crs("epsg:3857")
    boundaries = geopandas.GeoDataFrame(
        geopandas.GeoSeries(
            unary_union(
                boundaries['geometry']
            )
        )
    )
    boundaries = boundaries.rename(
        columns={0: 'geometry'}).set_geometry('geometry')

    boundaries = boundaries.buffer(2000)
    boundaries = boundaries.simplify(1000)

    # store for later use
    boundaries = geopandas.GeoDataFrame(boundaries)
    boundaries = boundaries.rename(
        columns={0: 'geometry'}).set_geometry('geometry')
    boundaries.crs = "epsg:3857"
    boundaries.to_file(temp_path + "/" + bounds + ".shp")


def create_filelist():

    setup_env()

    temp_path = os.getenv("TEMP_PATH")

    filelist = []

    path = temp_path + "/unpacked"
    for (_, dirnames, _) in os.walk(path):
        for dirname in dirnames:
            dpath = path + "/" + dirname
            for (_, _, ffilenames) in os.walk(dpath):
                for ffilename in ffilenames:
                    filelist.append(dpath + "/" + ffilename)
    return filelist


def crop_data():

    setup_env()

    temp_path = os.getenv("TEMP_PATH")
    boundaries_path = os.getenv("BOUNDARIES_PATH")
    bounds = os.getenv("BOUNDS")

    print("Starting cropping...")
    filelist = create_filelist()
    options = gdal.WarpOptions(resampleAlg=gdal.GRA_NearestNeighbour,
                               format="GTiff",
                               cutlineDSName=boundaries_path + "/" + bounds + "/" + bounds + ".shp",
                               dstSRS="+proj=stere +lon_0=10.0 +lat_0=90.0 +lat_ts=60.0 +a=6370040 +b=6370040 +units=m",
                               srcSRS="+proj=stere +lon_0=10.0 +lat_0=90.0 +lat_ts=60.0 +a=6370040 +b=6370040 +units=m",
                               cropToCutline=True)

    for file in tqdm(filelist, unit=" files"):
        file_split = file.split("/")
        date_time_obj = datetime.strptime(
            file_split[len(file_split)-1], 'RW_%Y%m%d-%H%M.asc')
        _ = gdal.Warp(
            temp_path + "/cropped/{}.tif".format(date_time_obj.strftime("%Y%m%d-%H%M")), file, options=options)
        _ = None

    print("Cropping complete.")


if __name__ == "__main__":
    crop_data()
