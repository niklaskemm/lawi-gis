import os
import config
from datetime import datetime, timedelta


def setup_folder():
    if not os.path.exists('temp'):
        os.makedirs('temp')

    if not os.path.exists('temp/radolan_zipped'):
        os.makedirs('temp/radolan_zipped')

    if not os.path.exists('temp/radolan_unzipped'):
        os.makedirs('temp/radolan_unzipped')

    if not os.path.exists('temp/radolan_cropped'):
        os.makedirs('temp/radolan_cropped')

    if not os.path.exists('temp/radolan_vectorized'):
        os.makedirs('temp/radolan_vectorized')

    print("Folder setup complete.")


def setup_date():
    startdate = datetime.now() + timedelta(days=-config.last_n_days)
    enddate = datetime.now() + timedelta(days=-1)

    return startdate, enddate


if __name__ == "__main__":
    setup_folder()
    setup_date()
