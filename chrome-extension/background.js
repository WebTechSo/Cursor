// Background script for handling transcript data and OpenAI API calls
class TranscriptManager {
  constructor() {
    this.transcriptData = [];
    this.openaiApiKey = null;
    this.init();
  }

  init() {
    this.loadApiKey();
    this.setupMessageListeners();
  }

  async loadApiKey() {
    const result = await chrome.storage.sync.get(['openaiApiKey']);
    this.openaiApiKey = result.openaiApiKey;
  }

  setupMessageListeners() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      switch (message.action) {
        case 'transcriptEntry':
          this.handleTranscriptEntry(message.data);
          break;
        case 'captionEntry':
          this.handleCaptionEntry(message.data);
          break;
        case 'getTranscript':
          this.getTranscript(sendResponse);
          return true; // Keep message channel open for async response
        case 'clearTranscript':
          this.clearTranscript(sendResponse);
          return true;
        case 'generateSummary':
          this.generateSummary(message.data, sendResponse);
          return true;
        case 'saveApiKey':
          this.saveApiKey(message.apiKey, sendResponse);
          return true;
      }
    });
  }

  handleTranscriptEntry(entry) {
    // Avoid duplicates
    const exists = this.transcriptData.some(item => 
      item.text === entry.text && 
      item.timestamp === entry.timestamp
    );
    
    if (!exists) {
      this.transcriptData.push(entry);
      console.log('Background: Added transcript entry:', entry);
    }
  }

  handleCaptionEntry(entry) {
    // Avoid duplicates
    const exists = this.transcriptData.some(item => 
      item.text === entry.text && 
      item.timestamp === entry.timestamp
    );
    
    if (!exists) {
      this.transcriptData.push(entry);
      console.log('Background: Added caption entry:', entry);
    }
  }

  getTranscript(sendResponse) {
    sendResponse({ transcript: this.transcriptData });
  }

  clearTranscript(sendResponse) {
    this.transcriptData = [];
    sendResponse({ success: true });
  }

  async saveApiKey(apiKey, sendResponse) {
    try {
      await chrome.storage.sync.set({ openaiApiKey: apiKey });
      this.openaiApiKey = apiKey;
      sendResponse({ success: true });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }

  async generateSummary(options, sendResponse) {
    if (!this.openaiApiKey) {
      sendResponse({ 
        success: false, 
        error: 'OpenAI API key not configured. Please add your API key in the extension popup.' 
      });
      return;
    }

    if (this.transcriptData.length === 0) {
      sendResponse({ 
        success: false, 
        error: 'No transcript data available. Please join a Google Meet and wait for transcript data to be captured.' 
      });
      return;
    }

    try {
      // Prepare transcript text
      const transcriptText = this.prepareTranscriptText(options);
      
      // Generate summary using OpenAI
      const summary = await this.callOpenAI(transcriptText, options);
      
      sendResponse({ 
        success: true, 
        summary: summary,
        transcriptLength: this.transcriptData.length
      });
    } catch (error) {
      console.error('Error generating summary:', error);
      sendResponse({ 
        success: false, 
        error: error.message 
      });
    }
  }

  prepareTranscriptText(options = {}) {
    const { includeTimestamps = false, includeSpeakers = true } = options;
    
    return this.transcriptData.map(entry => {
      let line = '';
      
      if (includeTimestamps) {
        const time = new Date(entry.timestamp).toLocaleTimeString();
        line += `[${time}] `;
      }
      
      if (includeSpeakers && entry.speaker && entry.speaker !== 'Unknown Speaker') {
        line += `${entry.speaker}: `;
      }
      
      line += entry.text;
      return line;
    }).join('\n');
  }

  async callOpenAI(transcriptText, options = {}) {
    const { 
      summaryType = 'general',
      maxLength = 500,
      includeKeyPoints = true 
    } = options;

    let prompt = `Please provide a comprehensive summary of the following meeting transcript. `;
    
    if (summaryType === 'action-items') {
      prompt += `Focus on action items, decisions made, and next steps. `;
    } else if (summaryType === 'key-points') {
      prompt += `Extract the key points and main topics discussed. `;
    } else {
      prompt += `Provide a general summary covering the main topics, decisions, and important points. `;
    }

    if (includeKeyPoints) {
      prompt += `Also include a bullet-point list of key takeaways. `;
    }

    prompt += `Keep the summary concise (around ${maxLength} words).\n\nTranscript:\n${transcriptText}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that summarizes meeting transcripts. Provide clear, concise summaries that capture the essence of the conversation.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  }
}

// Initialize the transcript manager
const transcriptManager = new TranscriptManager();