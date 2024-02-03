import os
import requests

CLIENT_ID = os.getenv('IGDB_CLIENT_ID')
CLIENT_SECRET = os.getenv('IGDB_CLIENT_SECRET')

def get_access_token():
    url = "https://id.twitch.tv/oauth2/token"

    payload = {
        'client_id': os.getenv('IGDB_CLIENT_ID'),
        'client_secret': os.getenv('IGDB_CLIENT_SECRET'),
        'grant_type': 'client_credentials'
    }
    
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    # Make POST request to the OAuth token endpoint
    response = requests.post(url, data=payload, headers=headers)
    
    # Check if request was successful
    if response.status_code == 200:
        # Parse the response JSON and return token
        return response.json().get('access_token')
    else:
        print(f"Failed to obtain access token. Status code: {response.status_code}")
        return None

# Example usage
access_token = get_access_token()
print(access_token)