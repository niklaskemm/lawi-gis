# unpacking data
import tarfile
import gzip
import os
import shutil
from datetime import timedelta
from download import download_data
from setup import setup_date


def unpack_data():

    startdate, enddate = setup_date()
    date = startdate

    print("Starting unpacking...")
    while date < enddate:
        dest = './temp/packed/RW-{}.tar.gz'.format(
            date.strftime("%Y%m%d"))
        with gzip.open(dest, 'rb') as f_in:
            with open(dest.split(".gz")[0], 'wb') as f_out:
                shutil.copyfileobj(f_in, f_out)

        with tarfile.open(dest.split(".gz")[0], "r") as tar:
            temp_path = "./temp/unpacked/RW-{}".format(
                date.strftime("%Y%m%d"))
            if os.path.isdir(temp_path) == False:
                os.mkdir(temp_path)
            tarlist = []
            for member in tar.getmembers():
                tarlist.append(member)
            tar.extractall(temp_path, tarlist)
            tar.close()

            os.remove(dest.split(".gz")[0])

        date += timedelta(days=1)

    print("Data unpacked.")


if __name__ == "__main__":
    unpack_data()
