import os
import psycopg2
import geopandas
import psycopg2.extras

from tqdm import tqdm
from setup import setup_env
from datetime import datetime
from shapely.wkt import dumps
from crop import create_filelist


def export_data(values):
    setup_env()

    db_server = os.getenv("DB_SERVER")
    db_port = os.getenv("DB_PORT")
    db_username = os.getenv("DB_USERNAME")
    db_password = os.getenv("DB_PASSWORD")
    db_database = os.getenv("DB_DATABASE")

    config = f"host='{db_server}' port={db_port} user='{db_username}' password='{db_password}' dbname='{db_database}'"

    with psycopg2.connect(config) as conn:
        with conn.cursor() as cur:
            cur.execute("CREATE TABLE IF NOT EXISTS radolan_temp;")
            cur.execute("DELETE FROM radolan_temp;")
            psycopg2.extras.execute_batch(
                cur,
                "INSERT INTO radolan_temp (geometry, value, measured_at) VALUES (ST_Multi(ST_Transform(ST_GeomFromText(%s, 3857), 4326)), %s, %s);",
                values
            )


def create_dataframe():
    filelist = create_filelist()

    print("Starting to create Dataframe...")
    for file in tqdm(filelist, unit=".shp-file"):
        file_split = file.split("/")
        date_time_obj = datetime.strptime(
            file_split[len(file_split)-1], 'RW_%Y%m%d-%H%M.asc')

        filename = "./temp/vectorized/{}".format(
            date_time_obj.strftime("%Y%m%d-%H%M"))

        df = geopandas.read_file(filename + ".shp")
        df = df.to_crs("epsg:3857")

        if df['geometry'].count() > 0:
            notNullValues = df[(df['rain'] > 0) & (df['rain'].notnull())]
            if len(notNullValues) > 0:
                values = []
                number_of_rows = len(notNullValues.index)
                for _, row in tqdm(notNullValues.iterrows(), leave=False, total=number_of_rows, unit=" rows"):
                    values.append(
                        [dumps(row.geometry, rounding_precision=5), row.rain, date_time_obj])
        # export_data(values)

    print("Dataframe created.")


if __name__ == "__main__":
    create_dataframe()
