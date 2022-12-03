def main():
    import requests

    url = "http://localhost:8000/login/"

    data = {
        "id": 1001,
        "name": "geek",
        "passion": "coding",
    }

    response = requests.post(url, data=data, json=data)

    print("Status Code", response.status_code)


if __name__ == '__main__':
    main()
