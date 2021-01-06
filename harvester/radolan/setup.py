from pathlib import Path
from dotenv import load_dotenv
from datetime import date, timedelta
from os import getenv, makedirs, environ
from os.path import join, dirname, exists


def setup_env():
    dotenv_path = join(dirname(__file__), '../.env')
    load_dotenv(dotenv_path=dotenv_path)


def setup_folders():

    setup_env()
    temp_path = getenv("TEMP_PATH")

    if not exists(temp_path):
        makedirs(temp_path)

    if not exists(temp_path + '/packed'):
        makedirs(temp_path + '/packed')

    if not exists(temp_path + '/unpacked'):
        makedirs(temp_path + '/unpacked')

    if not exists(temp_path + '/cropped'):
        makedirs(temp_path + '/cropped')

    if not exists(temp_path + '/vectorized'):
        makedirs(temp_path + '/vectorized')


def setup_dates():
    setup_env()
    startdate = date.today() + timedelta(days=int(getenv("LAST_N_DAYS"))*-1)
    enddate = date.today() + timedelta(days=-1)
    environ["STARTDATE"] = startdate.isoformat()
    environ["ENDDATE"] = enddate.isoformat()


def setup():
    setup_folders()
    setup_dates()


if __name__ == "__main__":
    setup()
