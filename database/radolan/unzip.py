# unpacking data
import tarfile
import gzip
import os
import shutil
from datetime import timedelta
from download import download_data
from setup import setup_date


def unzip_data(remove=True):

    startdate, enddate = setup_date()
    date = startdate

    print("Starting unzipping...")
    while date < enddate:
        dest = './temp/radolan_zipped/RW-{}.tar.gz'.format(
            date.strftime("%Y%m%d"))
        with gzip.open(dest, 'rb') as f_in:
            with open(dest.split(".gz")[0], 'wb') as f_out:
                shutil.copyfileobj(f_in, f_out)
        if remove == True:
            os.remove(dest)

        with tarfile.open(dest.split(".gz")[0], "r") as tar:
            temp_path = "./temp/radolan_unzipped/RW-{}".format(
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

    print("Data unzipped.")


if __name__ == "__main__":
    unzip_data()
