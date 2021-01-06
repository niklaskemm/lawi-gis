import os
import gzip
import shutil
import tarfile

from setup import setup
from datetime import timedelta, date
from download import download_data


def unpack_data():

    setup()

    temp_path = os.getenv("TEMP_PATH")

    startdate = date.fromisoformat(str(os.getenv("STARTDATE")))
    enddate = date.fromisoformat(str(os.getenv("ENDDATE")))
    date_counter = startdate

    print("Starting unpacking...")
    while date_counter <= enddate:
        dest = temp_path + '/packed/RW-{}.tar.gz'.format(
            date_counter.strftime("%Y%m%d"))
        with gzip.open(dest, 'rb') as f_in:
            with open(dest.split(".gz")[0], 'wb') as f_out:
                shutil.copyfileobj(f_in, f_out)

        with tarfile.open(dest.split(".gz")[0], "r") as tar:
            temp_path_unpacked = temp_path + "/unpacked/RW-{}".format(
                date_counter.strftime("%Y%m%d"))
            if os.path.isdir(temp_path_unpacked) == False:
                os.mkdir(temp_path_unpacked)
            tarlist = []
            for member in tar.getmembers():
                tarlist.append(member)
            tar.extractall(temp_path_unpacked, tarlist)
            tar.close()

            os.remove(dest.split(".gz")[0])

        date_counter += timedelta(days=1)

    print("Data unpacked.")


if __name__ == "__main__":
    unpack_data()
