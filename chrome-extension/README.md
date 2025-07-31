# Google Meet Transcript Summarizer

A Chrome extension that captures Google Meet transcripts and generates AI-powered summaries using OpenAI's GPT models.

## Features

- **Real-time Transcript Capture**: Automatically captures transcript data from Google Meet conversations
- **AI-Powered Summaries**: Uses OpenAI's GPT models to generate intelligent summaries
- **Multiple Summary Types**: Choose from general summaries, action items, or key points
- **Customizable Options**: Include/exclude timestamps, speakers, and key points
- **Secure API Key Storage**: Your OpenAI API key is stored securely in Chrome's sync storage
- **Modern UI**: Clean, intuitive interface with real-time statistics

## Installation

### Prerequisites

1. **OpenAI API Key**: You'll need an OpenAI API key to use this extension
   - Sign up at [OpenAI](https://platform.openai.com/)
   - Generate an API key in your account settings
   - Note: API usage will incur costs based on OpenAI's pricing

### Installing the Extension

1. **Download/Clone the Extension**
   ```bash
   git clone <repository-url>
   cd chrome-extension
   ```

2. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked"
   - Select the `chrome-extension` folder

3. **Configure API Key**
   - Click the extension icon in your Chrome toolbar
   - Enter your OpenAI API key in the popup
   - Click "Save API Key"

## Usage

### Basic Usage

1. **Join a Google Meet**
   - Navigate to a Google Meet meeting
   - The extension will automatically start capturing transcript data

2. **Generate Summary**
   - Click the extension icon
   - Configure your summary options
   - Click "Generate Summary"
   - View your AI-generated summary

### Summary Options

- **Summary Type**:
  - **General Summary**: Comprehensive overview of the meeting
  - **Action Items**: Focus on decisions and next steps
  - **Key Points**: Extract main topics and important points

- **Include Options**:
  - **Timestamps**: Add time markers to transcript entries
  - **Speakers**: Include speaker names in the transcript
  - **Key Points**: Add bullet-point takeaways to summaries

### Managing Transcripts

- **View Statistics**: See real-time counts of captured entries and meeting duration
- **Clear Transcript**: Remove all captured data to start fresh
- **Auto-save**: API key and preferences are automatically saved

## How It Works

### Transcript Capture

The extension uses multiple methods to capture Google Meet transcripts:

1. **DOM Monitoring**: Watches for transcript-related elements in the page
2. **Live Captions**: Monitors for real-time caption elements
3. **Mutation Observer**: Detects when new transcript content is added

### AI Processing

1. **Data Preparation**: Formats transcript data with optional timestamps and speaker information
2. **OpenAI API**: Sends formatted transcript to GPT-3.5-turbo for processing
3. **Summary Generation**: Receives structured summary based on selected options

## Technical Details

### Architecture

- **Content Script** (`content.js`): Runs on Google Meet pages, captures transcript data
- **Background Script** (`background.js`): Manages data storage and OpenAI API communication
- **Popup UI** (`popup.html/js`): User interface for configuration and summary generation

### Permissions

- `activeTab`: Access to current tab for transcript capture
- `storage`: Save API key and preferences
- `scripting`: Execute content scripts
- `host_permissions`: Access to Google Meet and OpenAI API

### Data Flow

1. Content script monitors Google Meet page for transcript elements
2. Captured data sent to background script via message passing
3. Background script stores data and handles OpenAI API calls
4. Popup UI communicates with background script for user interactions

## Troubleshooting

### Common Issues

**"No transcript data available"**
- Ensure you're on a Google Meet page
- Wait for transcript data to be captured (may take a few minutes)
- Check that the meeting has transcript/caption features enabled

**"OpenAI API error"**
- Verify your API key is correct
- Check your OpenAI account has sufficient credits
- Ensure you have internet connectivity

**Extension not capturing data**
- Refresh the Google Meet page
- Check browser console for any error messages
- Ensure the extension is enabled

### Debug Mode

To enable debug logging:
1. Open Chrome DevTools
2. Go to the Console tab
3. Look for messages starting with "Meet Transcript Capture"

## Security & Privacy

- **Local Processing**: All transcript data is processed locally in your browser
- **Secure Storage**: API keys are stored using Chrome's secure sync storage
- **No Data Collection**: The extension doesn't collect or transmit any personal data
- **OpenAI Privacy**: Only transcript text is sent to OpenAI for summarization

## Development

### File Structure

```
chrome-extension/
├── manifest.json          # Extension configuration
├── content.js            # Transcript capture logic
├── background.js         # Data management & API calls
├── popup.html           # User interface
├── popup.js             # UI interaction logic
├── icons/               # Extension icons
└── README.md            # This file
```

### Building

The extension is ready to use as-is. No build process required.

### Customization

- **UI Styling**: Modify CSS in `popup.html`
- **Capture Logic**: Adjust selectors in `content.js`
- **API Integration**: Modify OpenAI calls in `background.js`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- Check the troubleshooting section above
- Review browser console for error messages
- Ensure all prerequisites are met

## Changelog

### v1.0.0
- Initial release
- Basic transcript capture
- OpenAI integration
- Modern UI with real-time stats
- Multiple summary types
- Configurable options