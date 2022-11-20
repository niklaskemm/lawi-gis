#
# This script is in part based on prior works by the CityLAB Berlin and their "Gieß den Kiez" project
# (https://github.com/technologiestiftung/giessdenkiez-de-dwd-harvester/blob/master/harvester/harvester.py)
# as well as an introductory script for working with RADOLAN data presented at Carto Hack 2020 by
# Sebastian Meier (https://colab.research.google.com/drive/1tqc5jBqMXPdP6j1FjmJXkXEToJw9mgRo?usp=sharing)
#

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
            def is_within_directory(directory, target):
                
                abs_directory = os.path.abspath(directory)
                abs_target = os.path.abspath(target)
            
                prefix = os.path.commonprefix([abs_directory, abs_target])
                
                return prefix == abs_directory
            
            def safe_extract(tar, path=".", members=None, *, numeric_owner=False):
            
                for member in tar.getmembers():
                    member_path = os.path.join(path, member.name)
                    if not is_within_directory(path, member_path):
                        raise Exception("Attempted Path Traversal in Tar File")
            
                tar.extractall(path, members, numeric_owner=numeric_owner) 
                
            
            safe_extract(tar, temp_path_unpacked, tarlist)
            tar.close()

            os.remove(dest.split(".gz")[0])

        date_counter += timedelta(days=1)

    print("Data unpacked.")


if __name__ == "__main__":
    unpack_data()
