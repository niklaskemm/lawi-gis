import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
from pathlib import Path


def setup_env():
    env_path = Path('.') / '../.env'
    load_dotenv(dotenv_path=env_path)


def setup_folder():
    if not os.path.exists('temp'):
        os.makedirs('temp')

    if not os.path.exists('temp/packed'):
        os.makedirs('temp/packed')

    if not os.path.exists('temp/unpacked'):
        os.makedirs('temp/unpacked')

    if not os.path.exists('temp/cropped'):
        os.makedirs('temp/cropped')

    if not os.path.exists('temp/vectorized'):
        os.makedirs('temp/vectorized')

    print("Folder setup complete.")


def setup_date():
    setup_env()
    startdate = datetime.now() + timedelta(days=int(os.getenv("LAST_N_DAYS"))*-1)
    enddate = datetime.now() + timedelta(days=-1)
    print("Date setup complete.")
    print("Start date: {}".format(startdate))
    print("End date: {}".format(enddate))

    return startdate, enddate


if __name__ == "__main__":
    setup_folder()
    setup_date()
