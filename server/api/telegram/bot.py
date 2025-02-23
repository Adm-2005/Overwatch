import logging
import requests
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, CallbackContext, filters

class TelegramBot:
    def __init__(self, token: str, api_url: str):
        self.token = token
        self.api_url = api_url
        self.app = Application.builder().token(token).build()
        
        self.app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, self.handle_message))
        self.app.add_handler(CommandHandler('start', self.start))
        
        logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)

    async def start(self, update: Update, context: CallbackContext):
        await update.message.reply_text('Hello! I\'m a moderation bot. I\'ll monitor messages for harmful content.')

    async def handle_message(self, update: Update, context: CallbackContext):
        user = update.message.from_user
        message_content = update.message.text
        
        data = {
            'user_id': user.id,
            'username': user.username,
            'content': message_content
        }
        
        response = requests.post(f'{self.api_url}/moderation/analyse', json=data)
        result = response.json()
        
        if result.get('flagged'):
            await update.message.delete()
            await update.message.reply_text('Your message was flagged and removed.')
        
    def run(self):
        self.app.run_polling()
