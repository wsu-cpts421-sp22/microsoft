import os
import json
import urllib3
import planetary_computer
import datetime
import time
from pytz import timezone
from azure.storage.blob import ContainerClient

Valid_Gas = ['CH4', 'NO2']

#input_gas = input('Enter Gas [ CH4 , O2 ]: ')
input_gas = 'CH4'
if input_gas not in Valid_Gas:
    print('invalid choice.')
    sys.exit()

if input_gas == 'CH4':
    product = 'L2__CH4___'
elif input_gas == 'O2':
    product = 'L2__NO2___'
elif input_gas == 'O3':
    product = 'L2__O3___'

def getStartDate():
    date_str = input("Enter Start Date YYYY/MM/DD:")
    date_obj = datetime.datetime.strptime(date_str,'%Y/%m/%d')
    return date_obj

def getEndDate():
    date_str = input("Enter End Date YYYY/MM/DD:")
    date_obj = datetime.datetime.strptime(date_str,'%Y/%m/%d')
    return date_obj


#day = datetime.date(2021,12,20)
#start_date = datetime.date(2021,12,20).strftime("%Y/%m/%d")
#end_date = datetime.date(2020,1,1).strftime("%Y/%m/%d")

start_date = getStartDate()
end_date = getEndDate()
d = datetime.timedelta(days=1)
date = start_date.strftime("%Y/%m/%d")
end_str = end_date.strftime("%Y/%m/%d")

def get_Token_Data():
    http = urllib3.PoolManager()
    response = http.request('GET', 'https://planetarycomputer.microsoft.com/api/sas/v1/token/sentinel5euwest/sentinel-5p')
    data = json.loads(response.data.decode('utf-8'))
    return data

def is_file_empty(file_path):
    # check if file exist and is empty
    return os.path.exists(file_path) and os.stat(file_path).st_size == 0

def getTime():
    dt = datetime.datetime.now(timezone('GMT'))
    dt_string = dt.isoformat(timespec = 'seconds').replace('-07:00', 'Z')
    return dt_string
    
def checkToken(jsonData):
    token_expiration = jsonData['msft:expiry']
    currTime = getTime()
    if token_expiration <= currTime :
        print('token expired! Current Time: ', token_expiration)
        print('token expired! expiration Time: ', currTime)
        return False
    else:
        print('token still Valid! expiration Time ', token_expiration)
        return True

def _create_dirs(dest_path):
    if not os.path.exists(dest_path):
        os.makedirs(dest_path)
    elif not os.path.isdir(dest_path):
        shutil.rmtree(dst_path)
        os.makedirs(dest_path)


sas_path = './tokens/sentinel-5p_sas.json'
is_empty = is_file_empty(sas_path)


if (is_empty == False) :
    with open(sas_path, 'r+') as f:
        data = json.load(f)
        if (checkToken(data) == True):
            sas_token=data['token']
        else:
            rows = f.readlines()[1:] #delete the first line of the json file
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

def getPrefix():
    prefix = '/'.join(['TROPOMI',product,date])
    print('Searching for prefix {}'.format(prefix))
    generator = container_client.list_blobs(name_starts_with=prefix)
    scene_paths = [blob.name for blob in generator]
    print('\nFound {} matching scenes:\n'.format(len(scene_paths)))
    for s in scene_paths:
        print(s.split('/')[-1])
    return prefix

# We cannot access and read the files directly from the blob. We will need to download it first.
def downloadbloblist(prefix):
    blob_list = container_client.list_blobs(name_starts_with=prefix)
    for blob in blob_list:
            fname = os.path.join('./mycontainer/data', blob.name)
            if (os.path.exists(fname) and os.stat(fname).st_size != 0):
                continue
            print(f'Downloading {blob.name} to {fname}')

            # get blob client which has download_blob method
            blob_client = container_client.get_blob_client(blob)
            _create_dirs(os.path.dirname(fname))
            with open(fname, "wb") as download_file:
                download_file.write(blob_client.download_blob().readall())


while date >= end_str:     
    prefix = getPrefix()
    for attempt in range(20):
        try:
            downloadbloblist(prefix)
        except ConnectionResetError:
            print("Connection failed ["+ attempt +"] ...")
            time.sleep(5)
            attempt += 1
        except:
            newT = get_Token_Data()
            time.sleep(10) #give some time to process the http request
            T = newT['token']
            attempt += 1
            container_client = ContainerClient(account_url=storage_account_url, 
                                                container_name=container_name,
                                                credential=T)
            print("\n[NEW KEY CALL] [' + time.time() + ']\n")
            
    start_date -= d
    date = start_date.strftime("%Y/%m/%d")