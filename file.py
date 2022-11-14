import numpy as np
import xarray as xr
import h5netcdf
import netCDF4 as nc
import matplotlib.pyplot as plt

fn =  "mycontainer/data/TROPOMI/L2__CH4___/2021/10/15/S5P_OFFL_L2__CH4____20211015T001235_20211015T015404_20751_02_020200_20211016T160701/S5P_OFFL_L2__CH4____20211015T001235_20211015T015404_20751_02_020200_20211016T160701.nc"
ds = nc.Dataset(fn)

print(ds)
print("-------------------------------------------------------------------")
print("-------------------------------------------------------------------")
# print(ds.groups['PRODUCT'])

print(ds.groups['PRODUCT'].variables.keys())

print("-------------------------------------------------------------------")
print("-------------------------------------------------------------------")


print(ds.groups['PRODUCT'].variables['time'])

print("-------------------------------------------------------------------")
print("-------------------------------------------------------------------")

# lons = ds.groups['PRODUCT'].variables['longitude'][:][0,:,:]
# lats = ds.groups['PRODUCT'].variables['latitude'][:][0,:,:]
# ch4 = ds.groups['PRODUCT'].variables['methane_mixing_ratio'][:][0,:,:]

# print("longitudes:")
# print(lons.shape)
# print(lons)

# print("latitudes:")
# print(lats.shape)
# print(lats)

# print("CH4:")
# print(ch4.shape)
# print(ch4)

# print(ch4.__dict__)


# ch4[ds.groups['PRODUCT'].variables['qa_value'][0,:,:]<0.75]=np.nan
# ch4_units = ds.groups['PRODUCT'].variables['methane_mixing_ratio']

# print(ch4)
# print(ch4_units)


ds2 = xr.open_dataset(fn, group='/PRODUCT', engine="h5netcdf")
print(ds2)
print("-------------------------------------------------------------------")
lons = ds2.variables['longitude'][:][0,:,:]
lats = ds2.variables['latitude'][:][0,:,:]
ch4 = ds2.variables['methane_mixing_ratio'][:][0,:,:]
print("-------------------------------------------------------------------")
print("longitudes:")
print(lons.shape)

print(lons)
print("-------------------------------------------------------------------")
print("latitudes:")
print(lats.shape)
print(lats)

print("-------------------------------------------------------------------")
print("CH4:")
print(ch4.shape)
print(ch4)

print("-------------------------------------------------------------------")
print(ch4.values)
print("-------------------------------------------------------------------")


v = ch4.values
lon = ds2['longitude'].values.squeeze()
lat = ds2['latitude'].values.squeeze()
print("longitude:")
print(lon)
print("-------------------------------------------------------------------")
print("latitude:")
print(lat)
print("-------------------------------------------------------------------")
print("indices of not nan values of CH4 ")
valid_indices = np.argwhere(~np.isnan(v))

print(valid_indices)