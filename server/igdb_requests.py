import requests

def fetch_games(access_token):
    url = "https://api.igdb.com/v4/games"
    headers = {
        "Client-ID": "wa7bs60p9egyilqkrc1ewfadfo0wf9",  # IGDB Client ID
        "Authorization": f"Bearer {access_token}",
    }
    body = 'fields name, genres.name, platforms.name, summary; search "Sly Cooper"; limit 5;'

    response = requests.post(url, headers=headers, data=body)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Oh no. Looks like something went wrong. Status code: {response.status_code}, Details: {response.text}")
        return None
