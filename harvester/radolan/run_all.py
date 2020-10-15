from setup import setup
from download import download_data
from unpack import unpack_data
from crop import crop_data
from vectorize import vectorize_data


def run_all():
    setup()
    download_data()
    unpack_data()
    crop_data()
    vectorize_data()
    print("Done!")


if __name__ == "__main__":
    run_all()
