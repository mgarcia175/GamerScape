import os
from dotenv import load_dotenv
import requests

load_dotenv()

def fetch_games():
    url = "https://api.igdb.com/v4/games"
    headers = {
        "Client-ID": os.getenv('IGDB_CLIENT_ID'),
        "Authorization": f"Bearer {os.getenv('IGDB_ACCESS_TOKEN')}",
    }
    body = 'fields name, genres.name, platforms.name, summary; search "Sly Cooper"; limit 5;'

    response = requests.post(url, headers=headers, data=body)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Oh no. Looks like something went wrong. Status code: {response.status_code}, Details: {response.text}")
        return None
