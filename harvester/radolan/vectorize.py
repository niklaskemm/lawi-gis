import os
import gdal

from tqdm import tqdm
from setup import setup_env
from gdal import ogr, osr
from datetime import datetime
from crop import create_filelist


def vectorize_data():

    setup_env()

    temp_path = os.getenv("TEMP_PATH")

    filelist = create_filelist()

    print("Starting vectorization...")
    for file in tqdm(filelist, unit=" file"):
        file_split = file.split("/")
        date_time_obj = datetime.strptime(
            file_split[len(file_split)-1], 'RW_%Y%m%d-%H%M.asc')

        filename_input = temp_path + "/cropped/{}".format(
            date_time_obj.strftime("%Y%m%d-%H%M"))
        filename_output = temp_path + "/vectorized/{}".format(
            date_time_obj.strftime("%Y%m%d-%H%M"))

        source = gdal.Open(filename_input + ".tif")
        band = source.GetRasterBand(1)
        _ = band.ReadAsArray()

        driver = ogr.GetDriverByName("ESRI Shapefile")

        if os.path.exists(filename_output + ".shp"):
            driver.DeleteDataSource(filename_output + ".shp")

        target = driver.CreateDataSource(filename_output + ".shp")

        srs = osr.SpatialReference()
        srs.ImportFromProj4(
            "+proj=stere +lon_0=10.0 +lat_0=90.0 +lat_ts=60.0 +a=6370040 +b=6370040 +units=m")

        targetLayer = target.CreateLayer("radolan", srs=srs)
        targetField = ogr.FieldDefn("rain", ogr.OFTInteger)
        targetLayer.CreateField(targetField)

        gdal.Polygonize(band, None, targetLayer, 0, [], callback=None)

        target.Destroy()
        source = None
        _ = None

    print("Vectorization complete.")


if __name__ == "__main__":
    vectorize_data()
