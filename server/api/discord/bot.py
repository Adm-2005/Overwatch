import discord
import requests
from datetime import datetime
from flask import current_app

class DiscordBot(discord.Client):
    def __init__(self, server_id: str, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.server_id = server_id

    async def on_ready(self):
        current_app.logger.info('Discord bot connected to server: %s', self.server_id)

    async def on_message(self, message):
        if message.author == self.user:
            return
        
        data = {
            'user_id': message.author.id,
            'username': message.author.username,
            'content': message.content,
            'timestamp': datetime.strptime(message.timestamp, '%d/%m/%y %H:%M:%S.%f')
        }

        response = requests.post(
            f'{current_app.config.get('API_URL')}/moderation/analyse', 
            json=data
        )
        result = response.json()

        if result['flagged']:
            await message.delete()