# Overwatch

## Overview
**Note: This project was created for **DU Hacks 4.0**.

**Overwatch** is an AI-powered cyber-monitoring system designed to detect and flag illicit activities and cyberbullying on messaging platforms. The system analyzes communication patterns, user behavior, and linguistic cues to identify suspicious activities, providing real-time alerts to law enforcement or platform moderators.

Overwatch consists of two key components:
1. **Embedded Wrapper** – A module that integrates with messaging platforms (e.g., Discord, Telegram) to analyze conversations in real-time.
2. **Web Interface** – A dashboard for moderators and law enforcement to review flagged messages, track offenders, and take necessary actions.

## Features
- **Real-time Message Analysis**: Uses NLP and AI models to detect harmful messages.
- **Cross-Platform Integration**: Supports Discord, Telegram, and Facebook.
- **User Behavior Profiling**: Identifies repeated offenders and potential risks.
- **Moderator Dashboard**: Provides insights, flagged messages, and action options.
- **Alert System**: Sends instant notifications when high-risk messages are detected.

## Technology Stack
- **Frontend**: React.js, TailwindCSS
- **Backend**: Flask
- **Database**: MongoDB
- **AI/ML**: PyTorch
<!-- - **Message Processing**: Redis (for real-time queue handling)
- **Search & Analytics**: Elasticsearch (for analyzing flagged messages) -->

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Python 3.8+
- Node.js 16+
- MongoDB
- Redis

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/overwatch.git
cd Overwatch/server

# Create virtual environment and install dependencies
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
pip install -r requirements.txt

# Start Flask server
python app.py
```

### Frontend Setup
```bash
cd Overwatch/client

# Install dependencies
npm install

# Start React app
npm start
```

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/moderation/analyse` | Analyzes a message and returns risk score |
| `GET` | `/moderation/flagged` | Retrieves flagged messages for review |
| `POST` | `/moderation/actions` | Allows moderators to take actions |

## AI/ML Pipeline
1. **Message Preprocessing**: Tokenization, stopword removal, and vectorization.
2. **Deep Learning Model**: Uses PyTorch-based NLP models to classify messages.
3. **Risk Scoring**: Assigns a severity score to messages.
4. **Flagging & Alerting**: High-risk messages are flagged and stored in MongoDB.
5. **Continuous Learning**: Federated learning to refine the model based on feedback.


---
**Overwatch: Keeping Digital Spaces Safe.**

