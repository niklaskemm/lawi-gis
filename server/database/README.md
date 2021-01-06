# database

## basic postgres+postgis on WSL2

```
sudo apt update
sudo apt upgrade

sudo apt install postgresql postgresql-contrib postgis

sudo passwd postgres

sudo service postgresql start

sudo -u postgres createdb lawi-gis

sudo -u postgres psql

# \l
# \c lawi-gis

# CREATE EXTENSION postgis;
# CREATE EXTENSION postgis_raster;
# CREATE EXTENSION postgis_topology;
# CREATE EXTENSION postgis_sfcgal;
# CREATE EXTENSION fuzzystrmatch;
# CREATE EXTENSION address_standardizer;
# CREATE EXTENSION address_standardizer_data_us;
# CREATE EXTENSION postgis_tiger_geocoder;
```

## To run seeder:

```
sequelize db:seed:all
```
