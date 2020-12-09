from pathlib import Path
from dotenv import load_dotenv
from datetime import date, timedelta
from os import getenv, makedirs, environ
from os.path import join, dirname, exists


def setup_env():
    dotenv_path = join(dirname(__file__), '../.env')
    load_dotenv(dotenv_path=dotenv_path)


def setup_folders():
    if not exists('temp'):
        makedirs('temp')

    if not exists('temp/packed'):
        makedirs('temp/packed')

    if not exists('temp/unpacked'):
        makedirs('temp/unpacked')

    if not exists('temp/cropped'):
        makedirs('temp/cropped')

    if not exists('temp/vectorized'):
        makedirs('temp/vectorized')


def setup_dates():
    setup_env()
    startdate = date.today() + timedelta(days=int(getenv("LAST_N_DAYS"))*-1)
    enddate = date.today() + timedelta(days=-1)
    environ["STARTDATE"] = startdate.isoformat()
    environ["ENDDATE"] = enddate.isoformat()


def setup():
    setup_folders()
    setup_dates()
    print("Setup complete.")


if __name__ == "__main__":
    setup()
