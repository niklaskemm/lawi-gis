from setup import setup_folder
from download import download_data
from unzip import unzip_data
from crop import crop_data
from vectorize import vectorize_data

if __name__ == "__main__":
    setup_folder()
    download_data()
    unzip_data(False)
    crop_data()
    vectorize_data()
    print("Done!")
