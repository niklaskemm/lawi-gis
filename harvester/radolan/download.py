#
# This script is in part based on prior works by the CityLAB Berlin and their "Gieß den Kiez" project
# (https://github.com/technologiestiftung/giessdenkiez-de-dwd-harvester/blob/master/harvester/harvester.py)
# as well as an introductory script for working with RADOLAN data presented at Carto Hack 2020 by
# Sebastian Meier (https://colab.research.google.com/drive/1tqc5jBqMXPdP6j1FjmJXkXEToJw9mgRo?usp=sharing)
#

import os
import urllib.request

from tqdm import tqdm
from pathlib import Path
from setup import setup
from datetime import date, timedelta, datetime


def download_data():

    setup()

    temp_path = os.getenv("TEMP_PATH")

    startdate = date.fromisoformat(str(os.getenv("STARTDATE")))
    date_counter = startdate
    days = int(os.getenv("LAST_N_DAYS"))
    counter = 0

    print("Starting download...")
    for _ in tqdm(range(days), unit=" files"):
        url = 'https://opendata.dwd.de/climate_environment/CDC/grids_germany/hourly/radolan/recent/asc/RW-{}.tar.gz'.format(
            date_counter.strftime("%Y%m%d"))
        url_split = url.split("/")
        dest_name = url_split[len(url_split) - 1]
        dest = temp_path + '/packed/' + dest_name
        urllib.request.urlretrieve(url, dest)
        date_counter += timedelta(days=1)
        counter += 1

    print("Download of {} dataset(s) complete.".format(counter))


if __name__ == "__main__":
    download_data()
