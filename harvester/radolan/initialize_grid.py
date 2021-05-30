#
# This script is in part based on prior works by the CityLAB Berlin and their "Gieß den Kiez" project
# (https://github.com/technologiestiftung/giessdenkiez-de-dwd-harvester/blob/master/harvester/harvester.py)
# as well as an introductory script for working with RADOLAN data presented at Carto Hack 2020 by
# Sebastian Meier (https://colab.research.google.com/drive/1tqc5jBqMXPdP6j1FjmJXkXEToJw9mgRo?usp=sharing)
#

import os
import psycopg2
import psycopg2.extras
import geopandas as gpd

from tqdm import tqdm
from setup import setup_env
from shapely.wkt import dumps


def create_values():
    setup_env()

    radolan_path = os.getenv("RADOLAN_PATH")

    radolan_grid_path = radolan_path + '/radolan_grid'
    values = []

    print("Creating dataframe...")
    radolan_grid = gpd.read_file(radolan_grid_path).to_crs("epsg:4326")
    print("Dataframe created.")

    print("Creating values list...")
    for _, row in tqdm(radolan_grid.iterrows(), leave=False, total=len(radolan_grid), unit=" rows"):
        geom = dumps(row.geometry, rounding_precision=5)
        values.append([
            geom, geom
        ])

    print("Values list created.")

    return values


def upload_data(values):
    setup_env()

    db_server = os.getenv("DB_SERVER")
    db_port = os.getenv("DB_PORT")
    db_username = os.getenv("DB_USERNAME")
    db_password = os.getenv("DB_PASSWORD")
    db_database = os.getenv("DB_DATABASE")

    config = f"host='{db_server}' port={db_port} user='{db_username}' password='{db_password}' dbname='{db_database}'"

    try:
        conn = psycopg2.connect(config)
        print("Connection to database established.")
    except:
        print("Could not establish database connection!")

    print("Uploading data...")

    with conn.cursor() as cur:
        psycopg2.extras.execute_batch(
            cur,
            'INSERT INTO gridgeoms (geom, centroid, "createdAt", "updatedAt") VALUES (ST_GeomFromText(%s, 4326), ST_Centroid(ST_GeomFromText(%s, 4326)), CURRENT_TIMESTAMP(0), CURRENT_TIMESTAMP(0));',
            values
        )
        conn.commit()

    print("Data uploaded.")

    conn.close()
    print("Connection closed.")


if __name__ == "__main__":
    upload_data(
        create_values()
    )
