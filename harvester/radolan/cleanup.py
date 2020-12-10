import shutil


def cleanup():
    shutil.rmtree('./temp', ignore_errors=True)
    print("Cleanup complete.")


if __name__ == "__main__":
    cleanup()
