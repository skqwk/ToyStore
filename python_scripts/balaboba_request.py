import json
import urllib.request
import random
END_DESC = [
    " понравится вашему ребенку ведь ", 
    " отлично подходит к ", 
    " будет любимой у вашего ребенка, потому что "
    " была высоко оценена и точно придется по душе вашему ребенку, ведь "
    ]
BEGIN_DESC = [
    "Данная игрушка ",
    "Эта игрушка ",
    "Игрушка ",
]   


headers = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_4) AppleWebKit/605.1.15 '
                  '(KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    'Origin': 'https://yandex.ru',
    'Referer': 'https://yandex.ru/',
}


API_URL = 'https://zeapi.yandex.net/lab/api/yalm/text3'
def generateDescription(folder):
    query = BEGIN_DESC[random.randint(0, len(BEGIN_DESC)-1)] + f"'{folder}'" + END_DESC[random.randint(0, len(END_DESC)-1)]
    payload = {"query": query, "intro": 0, "filter": 1}
    params = json.dumps(payload).encode('utf8')
    req = urllib.request.Request(API_URL, data=params, headers=headers)
    response = urllib.request.urlopen(req)

    data = json.loads(response.read().decode('utf8'))
    text = data["text"].replace("\n", "<br>")
    return query + text