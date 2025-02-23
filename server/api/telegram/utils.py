# external import
import asyncio
from flask import current_app

# internal import
from api.telegram.bot import TelegramBot

def start_telegram_bot(group_id: str, bot_token: str) -> None:
    bot = TelegramBot(group_id, bot_token)

    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.create_task(bot.start())
    loop.run_forever()
