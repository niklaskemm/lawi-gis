import os
import shutil

from setup import setup_env


def cleanup():

    setup_env()

    temp_path = os.getenv("TEMP_PATH")

    shutil.rmtree(temp_path, ignore_errors=True)
    print("Cleanup complete.")


if __name__ == "__main__":
    cleanup()
