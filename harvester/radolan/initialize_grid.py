import os
import psycopg2
import psycopg2.extras
import geopandas as gpd

from tqdm import tqdm
from setup import setup_env
from shapely.wkt import dumps
from datetime import datetime


def create_values():
    setup_env()

    radolan_grid_path = os.getenv("RADOLAN_GRID_PATH")
    values = []

    print("Creating dataframe...")
    radolan_grid = gpd.read_file(radolan_grid_path).to_crs("epsg:4326")
    print("Dataframe created.")

    print("Creating values array...")
    for _, row in tqdm(radolan_grid.iterrows(), leave=False, total=len(radolan_grid), unit=" rows"):
        time = datetime.strptime(datetime.strftime(
            datetime.now(), "%Y-%m-%d %H:%M:%S"), "%Y-%m-%d %H:%M:%S")
        geom = dumps(row.geometry, rounding_precision=5)
        values.append([
            geom, geom, time, time
        ])

    print("Values array created and exported.")

    return values


def upload_data(values):
    setup_env()

    db_server = os.getenv("DB_SERVER")
    db_port = os.getenv("DB_PORT")
    db_username = os.getenv("DB_USERNAME")
    db_password = os.getenv("DB_PASSWORD")
    db_database = os.getenv("DB_DATABASE")

    config = f"host='{db_server}' port={db_port} user='{db_username}' password='{db_password}' dbname='{db_database}'"

    print("Uploading data...")
    with psycopg2.connect(config) as conn:
        with conn.cursor() as cur:
            psycopg2.extras.execute_batch(
                cur,
                'INSERT INTO gridgeoms (geom, centroid, "createdAt", "updatedAt") VALUES (ST_GeomFromText(%s, 4326), ST_Centroid(ST_GeomFromText(%s, 4326)), %s, %s);',
                values
            )
    print("Data uploaded.")


if __name__ == "__main__":
    upload_data(
        create_values()
    )
