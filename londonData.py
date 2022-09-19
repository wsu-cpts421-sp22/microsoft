import sys
import requests
import json

def main():
    input_date = sys.argv[1]
    input_gas = sys.argv[2]

    print(input_date, input_gas)

    if input_gas == 'O3':
        product = 'o3'

    if input_gas == 'NO2':
        product = 'no2'

    input_year = input_date.split('/')[0]
    input_month = input_date.split('/')[1]
    input_day = input_date.split('/')[2]

    request_string = 'https://api.openaq.org/v2/measurements?date_from=' + input_year +  '-' + input_month + '-' + input_day + 'T00%3A00%3A00%2B00%3A00&date_to=' + input_year +  '-' + input_month + '-' + input_day + 'T23%3A59%3A59%2B00%3A00&limit=100&page=1&offset=0&sort=desc&parameter=' + product + '&radius=10&city=London&order_by=datetime'
    response = requests.get(request_string)
    print('response: ', response)

    print((json.dumps(response.json(), indent=4, sort_keys=True)))

if __name__ == "__main__":
    main()