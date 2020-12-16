from setup import setup
from crop import crop_data
from cleanup import cleanup
from unpack import unpack_data
from download import download_data
from export import create_dataframe
from vectorize import vectorize_data


def run_all():
    setup()
    download_data()
    unpack_data()
    crop_data()
    vectorize_data()
    create_dataframe()
    # cleanup()
    print("Done!")


if __name__ == "__main__":
    run_all()
