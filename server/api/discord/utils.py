# external import
import discord
import asyncio 
from flask import current_app

# internal import
from api.discord.bot import DiscordBot

def start_discord_bot(server_id: str) -> None:
    intents = discord.Intents.default()
    bot = DiscordBot(server_id, intents=intents)

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.create_task(bot.start(current_app.config.get('DISCORD_TOKEN')))
    loop.run_forever()