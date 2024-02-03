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
    body = 'fields name, cover.image_id, platforms.name, summary; where platforms = (48,49,130,6); limit 5;'

    response = requests.post(url, headers=headers, data=body)
    
    if response.status_code == 200:
        games_data = response.json()

        for game in games_data:
            cover_id = game.get('cover', {}).get('image_id')

            game['cover_url'] = f"https://images.igdb.com/igdb/image/upload/t_cover_big/{cover_id}.jpg" if cover_id else None
        return games_data
    else:
        print(f"Oh no. Looks like something went wrong. Status code: {response.status_code}, Details: {response.text}")
        return None
