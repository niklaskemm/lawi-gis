import urllib.request
import os
from datetime import date, timedelta, datetime
from tqdm import tqdm
from pathlib import Path


def download_data():
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
        dest = './temp/packed/' + dest_name
        urllib.request.urlretrieve(url, dest)
        date_counter += timedelta(days=1)
        counter += 1

    print("Download of {} dataset(s) complete.".format(counter))


if __name__ == "__main__":
    download_data()
