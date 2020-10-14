import urllib.request
import config
from datetime import timedelta
from setup import setup_date
from tqdm import tqdm


def download_data():
    startdate, enddate = setup_date()
    date = startdate
    days = range(config.last_n_days)
    counter = 0

    print("Starting download...")
    # loop through the days
    for day in tqdm(days, unit=" files"):
        url = 'https://opendata.dwd.de/climate_environment/CDC/grids_germany/hourly/radolan/recent/asc/RW-{}.tar.gz'.format(
            date.strftime("%Y%m%d"))
        url_split = url.split("/")
        dest_name = url_split[len(url_split) - 1]
        dest = './temp/radolan_zipped/' + dest_name
        urllib.request.urlretrieve(url, dest)
        date += timedelta(days=1)
        counter += 1

    print("Download of {} dataset(s) complete.".format(counter))


if __name__ == "__main__":
    download_data()
