import os
import psycopg2
import wradlib as wrl
import psycopg2.extras

from tqdm import tqdm
from setup import setup_env
from datetime import datetime


def export_data():
    setup_env()

    db_server = os.getenv("DB_SERVER")
    db_port = os.getenv("DB_PORT")
    db_username = os.getenv("DB_USERNAME")
    db_password = os.getenv("DB_PASSWORD")
    db_database = os.getenv("DB_DATABASE")
    # db_datatable = os.getenv("DB_DATATABLE")

    config = f"host='{db_server}' port={db_port} user='{db_username}' password='{db_password}' dbname='{db_database}'"

    radolan_grid_wgs84 = wrl.georef.get_radolan_grid(900, 900, wgs84=True)

    radolan_grid_wgs84_wkt = []

    for x in tqdm(radolan_grid_wgs84.tolist(), total=900):
        for y in x:
            lat = y[0]
            lon = y[1]
            wkt_representation = f"POINT ({lat} {lon})"
            radolan_grid_wgs84_wkt.append(wkt_representation)

    time = datetime.strptime(datetime.strftime(
        datetime.now(), "%Y-%m-%d %H:%M:%S"), "%Y-%m-%d %H:%M:%S")
    values = []

    for x in tqdm(radolan_grid_wgs84_wkt, total=810000):
        values.append(
            [
                x, time, time
            ]
        )

    with psycopg2.connect(config) as conn:
        with conn.cursor() as cur:
            # cur.execute("CREATE TABLE IF NOT EXISTS gridgeoms")
            # cur.execute("DELETE FROM gridgeoms")
            psycopg2.extras.execute_batch(
                cur,
                'INSERT INTO gridgeoms (geom, "createdAt", "updatedAt") VALUES (ST_GeomFromText(%s, 4326), %s, %s);',
                values
            )


if __name__ == "__main__":
    export_data()
