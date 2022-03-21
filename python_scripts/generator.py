import os
from pathlib import Path 
import json
import codecs
import random
from balaboba_request import generateDescription

dir = os.getcwd()
INPUT_JSON = "result.json"
OUTPUT_JSON = "result.json"
PRODUCTS_PATH = "img\products"
TEMPLATE_PAGE = "pages/template-product-page.html"
MAIN_DIR = "ToyStore"
 
def openJson():
    # Открываем JSON
    with open(INPUT_JSON, encoding='utf-8') as json_file:
        # encoding='utf-8' - для корректного отображения русских символов
        products = json.load(json_file)
    print(products)

    # Переводим массив объектов в один словарь из пар "имя_продукта" : {"описание_продукта"}
    map_products = dict()
    for product in products["items"]:             
        map_products[product["name"]] = product
    print(map_products)

    return map_products

def traverseThroughDir(map_products):
        # Путь к директории с фотографиями всех игрушек
    path = Path(os.getcwd()).joinpath(PRODUCTS_PATH)
    tree = os.walk(path)
    # Возвращает кортеж: ["полный_путь", ["все_папки_по_этому_путь"], ["все_файлы_по_этому_пути"]]

    # Выводим соответствия
    # Папка: файлы, которые в ней есть
    for root, subdirs, files in tree:
        if subdirs == []:
            folder = root.split("\\")[-1]
            vendorCode = f'SK-{random.randint(10000, 99999)}'
            description = generateDescription(folder) 
            print(f'--\nfolder = {folder}')
            
            try: 
                map_products[folder]["images"] = []
                map_products[folder]["vendor_code"] = vendorCode
                map_products[folder]["description"] = description
            except:
                map_products[folder] = {"name" : folder, "price": 1000, "description" : description, "category":["new"], "images" : [], "vendor_code" : vendorCode}
            for filename in files:
                file_path = os.path.join(root, filename).split(f'{MAIN_DIR}\\')[-1]
                # путь записываем относительно от img, обрезая часть c ...doc\\
                map_products[folder]["images"].append(file_path)
                print('\t- file %s (full path: %s)' % (filename, file_path))

def writeToJson(map_products):
        # в окончательном варианте используем не хэш-таблицу, а обычный массив с продуктами
    products = []
    for key in map_products:
        products.append(map_products[key])

    # Запись json-результата в файл
    with open("result.json", "w", encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)

    return products


def changeContent(content, product):
    changedContent = content
    changedContent = changedContent.replace("Product page", product["name"])
    changedContent = changedContent.replace("Тракторы", product["name"])
    changedContent = changedContent.replace("SK-45067", product["vendor_code"])
    changedContent = changedContent.replace("1 500", str(product["price"]))
    changedContent = changedContent.replace("/img/tractors.jpg", product["images"][0])
    changedContent = changedContent.replace("/img/tractors2.jpg", product["images"][1])
    if len(product["images"]) < 3:
        changedContent = changedContent.replace('<div class="thumb"><img src="/img/tractors3.jpg" alt="" onclick="changeSlider(this)"></div>', '')
    else:
        changedContent = changedContent.replace("/img/tractors3.jpg", product["images"][2])
    changedContent = changedContent.replace("$Описание", product["description"])
    return changedContent

def createCopies(products):
    f = codecs.open(TEMPLATE_PAGE, "r", "utf-8" )
    content = f.read()

    for product in products:
        forChange = content
        # w+ - создать, если не существует, для записи
        changedContent = changeContent(forChange, product)
        with open(f"products/{product['name']}.html", "w+",encoding='utf-8') as f:
            f.write(changedContent)

def fillCategories(map_products):
    with open("categories.json", encoding='utf-8') as json_file:
        # encoding='utf-8' - для корректного отображения русских символов
        categories = json.load(json_file)
    
    names = []
    for name in map_products:
        names.append(name)
    categories["all"] = names

    with open("categories.json", "w", encoding='utf-8') as f:
        json.dump(categories, f, ensure_ascii=False, indent=2)        

def changeCategories(map_products):
    with open("categories.json", encoding='utf-8') as json_file:
        # encoding='utf-8' - для корректного отображения русских символов
        categories = json.load(json_file)
    for name in map_products:
        map_products[name]["category"] = []
        for category in categories:
            if name in categories[category]:
                map_products[name]["category"].append(category)
def main(): 
      
    # Читаем исходный json
    map_products = openJson()

    # Пополняем информацией из каталога
    # traverseThroughDir(map_products)

    # changeCategories(map_products)

    # Записываем как окончательный результат
    products = writeToJson(map_products)
    
    # Создаем html копии
    createCopies(products)


    # # Открываем JSON
    # with open(OUTPUT_JSON, encoding='utf-8') as json_file:
    #     # encoding='utf-8' - для корректного отображения русских символов
    #     products = json.load(json_file)

    # for product in products:
    #     images = []
    #     for image in product["images"]:
    #         image = ".." + image
    #         images.append(image)
    #     product["images"] = images

    # with open(OUTPUT_JSON, "w", encoding='utf-8') as f:
    #     json.dump(products, f, ensure_ascii=False, indent=2)

main()


