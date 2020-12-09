import gdal
import urllib
import geopandas

from os import walk
from tqdm import tqdm
from datetime import datetime
from shapely.ops import unary_union


def get_buffer_shp():
    urllib.request.urlretrieve(
        "https://www.eea.europa.eu/data-and-maps/data/eea-reference-grids-2/gis-files/germany-shapefile/at_download/file", "./temp/germany.zip")

    germany = geopandas.read_file("zip://./temp/germany.zip")
    germany = germany.to_crs("epsg:3857")
    germany_boundary = geopandas.GeoDataFrame(
        geopandas.GeoSeries(unary_union(germany['geometry'])))
    germany_boundary = germany_boundary.rename(
        columns={0: 'geometry'}).set_geometry('geometry')

    germany_buffer = germany_boundary.buffer(2000)
    germany_buffer = germany_buffer.simplify(1000)

    # store for later use
    germany_buffer = geopandas.GeoDataFrame(germany_buffer)
    germany_buffer = germany_buffer.rename(
        columns={0: 'geometry'}).set_geometry('geometry')
    germany_buffer.crs = "epsg:3857"
    germany_buffer.to_file("./temp/germany.shp")


def create_filelist():
    filelist = []

    path = "./temp/unpacked"
    for (_, dirnames, _) in walk(path):
        for dirname in dirnames:
            dpath = path + "/" + dirname
            for (_, _, ffilenames) in walk(dpath):
                for ffilename in ffilenames:
                    filelist.append(dpath + "/" + ffilename)
    return filelist


def crop_data():
    get_buffer_shp()
    filelist = create_filelist()
    options = gdal.WarpOptions(resampleAlg=gdal.GRA_NearestNeighbour,
                               format="GTiff",
                               cutlineDSName='./temp/germany.shp',
                               dstSRS="+proj=stere +lon_0=10.0 +lat_0=90.0 +lat_ts=60.0 +a=6370040 +b=6370040 +units=m",
                               srcSRS="+proj=stere +lon_0=10.0 +lat_0=90.0 +lat_ts=60.0 +a=6370040 +b=6370040 +units=m",
                               cropToCutline=True)

    print("Starting cropping...")
    for file in tqdm(filelist, unit=" files"):
        file_split = file.split("/")
        date_time_obj = datetime.strptime(
            file_split[len(file_split)-1], 'RW_%Y%m%d-%H%M.asc')
        _ = gdal.Warp(
            "./temp/cropped/{}.tif".format(date_time_obj.strftime("%Y%m%d-%H%M")), file, options=options)
        _ = None

    print("Cropping complete.")


if __name__ == "__main__":
    crop_data()
