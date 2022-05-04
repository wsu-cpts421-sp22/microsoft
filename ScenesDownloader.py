import os
import json
import urllib3
import planetary_computer
from azure.storage.blob import ContainerClient

Valid_Gas = ['CH4', 'NO2']

input_gas = input('Enter Gas [ CH4 , O2 ]: ')
if input_gas not in Valid_Gas:
    print('invalid choice.')
    sys.exit()

if input_gas == 'CH4':
    product = 'L2__CH4___'
elif input_gas == 'O2':
    product = 'L2__NO2___'
elif input_gas == 'O3':
    product = 'L2__O3___'

start_date = input('enter date [yyyy/mm/dd]: ')
end_date = input('enter date [yyyy/mm/dd]: ')   #not done yet will be implemented with datetime
        
date = start_date

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
        print('token still Valid! expiration Time ', curTime)
        return 1

def _create_dirs(dest_path):
    if not os.path.exists(dest_path):
        os.makedirs(dest_path)
    elif not os.path.isdir(dest_path):
        shutil.rmtree(dst_path)
        os.makedirs(dest_path)

sas_path = '/mnt/d/Wsu/microsoft/microsoft/tokens/sentinel-5p_sas.json'
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

# We cannot access and read the files directly from the blob. We will need to download it first.
blob_list = container_client.list_blobs(name_starts_with=prefix)
for blob in blob_list:
        fname = os.path.join('./mycontainer/data', blob.name)
        print(f'Downloading {blob.name} to {fname}')

        # get blob client which has download_blob method
        blob_client = container_client.get_blob_client(blob)
        _create_dirs(os.path.dirname(fname))
        with open(fname, "wb") as download_file:
            download_file.write(blob_client.download_blob().readall())