import os
from dotenv import load_dotenv
import requests

load_dotenv()

def handle_api_response(response):
    try:
        response_data = response.json()

        if isinstance(response_data, list):
            for item in response_data:
                pass
        else:
            pass

    except Exception as e:
        print(f"An error occurred while handling the API response: {str(e)}")

#Scrapped this logic for specific game search. May use this in the future
def fetch_games():
    url = "https://api.igdb.com/v4/games"
    headers = {
        "Client-ID": os.getenv('IGDB_CLIENT_ID'),
        "Authorization": f"Bearer {os.getenv('IGDB_ACCESS_TOKEN')}",
    }
    body = 'fields name, cover.image_id, platforms.name, genres.name; where platforms = (48,49,130,6); limit 20;'

    try:
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
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None
#Scrapped this logic for specific game search. May use this in the future

def search_igdb_games(query):
    url = "https://api.igdb.com/v4/games"
    headers = {
        "Client-ID": os.getenv('IGDB_CLIENT_ID'),
        "Authorization": f"Bearer {os.getenv('IGDB_ACCESS_TOKEN')}",
    }
    body = f'fields name, cover.image_id, platforms.name, genres.name; search "{query}"; limit 10;'

    try:
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
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None


def fetch_game_details(game_id):
    url = f"https://api.igdb.com/v4/games/{game_id}"
    headers = {
        "Client-ID": os.getenv('IGDB_CLIENT_ID'),
        "Authorization": f"Bearer {os.getenv('IGDB_ACCESS_TOKEN')}",
    }
    params = {
        'fields': 'name, cover.image_id, platforms.name, genres.name, summary, first_release_date, screenshots.image_id'
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            game_data = response.json()
            cover_id = game_data[0].get('cover', {}).get('image_id')
            game_data[0]['cover_url'] = f"https://images.igdb.com/igdb/image/upload/t_cover_big/{cover_id}.jpg" if cover_id else None
            
            # Extract screenshot URLs
            screenshot_urls = []
            if 'screenshots' in game_data[0]:
                for screenshot in game_data[0]['screenshots']:
                    image_id = screenshot.get('image_id')
                    if image_id:
                        screenshot_url = f"https://images.igdb.com/igdb/image/upload/t_screenshot_med/{image_id}.jpg"
                        screenshot_urls.append(screenshot_url)
            game_data[0]['screenshot_urls'] = screenshot_urls
            
            return game_data
        else:
            print(f"Oh no. Looks like something went wrong. Status code: {response.status_code}, Details: {response.text}")
            return None
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None

def fetch_igdb_game_title(igdb_game_id):
    igdb_client_id = os.getenv('IGDB_CLIENT_ID')
    igdb_access_token = os.getenv('IGDB_ACCESS_TOKEN')

    url = f"https://api.igdb.com/v4/games"

    headers = {
        'Client-ID': igdb_client_id,
        'Authorization': f'Bearer {igdb_access_token}',
    }

    body = f'fields name; where id = {igdb_game_id};'

    try:
        response = requests.post(url, headers=headers, data=body)
        response.raise_for_status()

        #Parse
        game_data = response.json()

        if game_data:
            game_title = game_data[0]['name']
            return game_title
        else:
            return "Game title not found"
    except Exception as e:
        print(f"An error occurred while fetching the game title from IGDB: {e}")
        return "Error fetching game title"
