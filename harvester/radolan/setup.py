import os
from datetime import date, timedelta
from dotenv import load_dotenv
from pathlib import Path


def setup_env():
    env_path = Path('.') / '..' / '.env.local'
    load_dotenv(dotenv_path=env_path)


def setup_folders():
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


def setup_dates():
    setup_env()
    startdate = date.today() + timedelta(days=int(os.getenv("LAST_N_DAYS"))*-1)
    enddate = date.today() + timedelta(days=-1)
    os.environ["STARTDATE"] = startdate.isoformat()
    os.environ["ENDDATE"] = enddate.isoformat()


def setup():
    setup_env()
    setup_folders()
    setup_dates()
    print("Setup complete.")


if __name__ == "__main__":
    setup()
