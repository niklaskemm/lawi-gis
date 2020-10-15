from setup import setup_folder
from download import download_data
from unpack import unpack_data
from crop import crop_data
from vectorize import vectorize_data

if __name__ == "__main__":
    download_data()
    unpack_data()
    crop_data()
    vectorize_data()
    print("Done!")
