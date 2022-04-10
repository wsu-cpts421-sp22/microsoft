import os
import fsspec
import json
import urllib3
import xarray as xr
import numpy as np
from azure.storage.blob import ContainerClient
from datetime import datetime, timezone

# Not used directly, but needs to be installed to read NetCDF files with xarray
import h5netcdf

input_date = input('enter date [yyyy/mm/dd]: ')
input_gas = input('enter your choice of Gas (O3 / NO2 / CH4): ')

if input_gas == 'CH4':
    product = 'L2__CH4___'
else:
    if input_gas == 'NO2':
        product = 'L2__NO2___'
    else:
        product = 'L2__O3____'

# Let's look at ozone concentration from mid-day on Jan 1, 2021
#product = 'L2__O3____'
date = input_date

print('checking Auth Token ...')

def get_Token_Data():
    http = urllib3.PoolManager()
    response = http.request('GET', 'https://planetarycomputer.microsoft.com/api/sas/v1/token/sentinel5euwest/sentinel-5p')
    data = json.loads(response.data.decode('utf-8'))
    return data

def is_file_empty(file_path):
    # check if file exist and is empty
    return os.path.exists(file_path) and os.stat(file_path).st_size == 0

def getTime():
    dt = datetime().now().astimezone(timezone.pst)
    dt_string = dt.isoformat(timespec = 'milliseconds').replace('+00:00', 'Z')
    return dt_string
    
def checkToken(jsonData):
    token_expiration = jsonData['msft:expiry']
    currTime = getTime()
    if token_expiration <= currTime :
        print('token expired! expiration Time: ', currTime)
        return 0
    else:
        print('token still Valid! expiration Time ', currTime)
        return 1

sas_path = './tokens/sentinel-5p_sas.json'
is_empty = is_file_empty(sas_path)

if is_empty != 0:
    with open(sas_path, 'r+') as f:
        data = json.load(f)
        if checkToken(data):
            sas_token=data['token']
        else:
            newData = get_Token_Data()
            sas_token = newData['token']
            f.seek(0)
            json.dump(newData, f)
else:
    with open(sas_path, 'r+') as f:
        newData = get_Token_Data()
        sas_token = newData['token']
        f.seek(0)
        json.dump(newData, f)

print('Token is Valid')

storage_account_name = 'sentinel5euwest'
container_name = 'sentinel-5p'
storage_account_url = 'https://' + storage_account_name + '.blob.core.windows.net/'

container_client = ContainerClient(account_url=storage_account_url, 
                                                container_name=container_name,
                                                credential=sas_token)

prefix = '/'.join(['TROPOMI',product,date])
print('Searching for prefix {}'.format(prefix))
generator = container_client.list_blobs(name_starts_with=prefix)
scene_paths = [blob.name for blob in generator]
print('\nFound {} matching scenes:\n'.format(len(scene_paths)))
for s in scene_paths:
    print(s.split('/')[-1])


#Print metadata of one scene

#different gas use different sc_mode, default CH4
sc_mode = 'OFFL'
if (product == 'L2__NO2___'):
    sc_mode = 'NRTI'
#need to add sc_mode for the other gases. will probably move this part to the beginning

offl_scenes = [s for s in scene_paths if sc_mode in s]
scene_path = offl_scenes[len(offl_scenes) // 2]
url = storage_account_url + container_name + '/' + scene_path
print('Processing image at URL:\n{}'.format(url))

#sign URL
import planetary_computer
import pystac
import rasterio #this seems to break when called

#item: pystac.Item = ... # no idea what goes here been trying multiple things but still stuck
b4_href = planetary_computer.sign(url) #i think this sign the url directly

print(b4_href)
#this print a url if clicked would download the scene


##print metadata
import warnings; warnings.filterwarnings('ignore')

with fsspec.open(b4_href) as f:
    ds = xr.open_dataset(f)
print(ds)