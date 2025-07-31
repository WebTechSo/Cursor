// Popup script for handling UI interactions
class PopupManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadSavedData();
    this.checkStatus();
    this.updateStats();
  }

  setupEventListeners() {
    // API Key management
    document.getElementById('saveApiKey').addEventListener('click', () => {
      this.saveApiKey();
    });

    // Summary generation
    document.getElementById('generateSummary').addEventListener('click', () => {
      this.generateSummary();
    });

    // Clear transcript
    document.getElementById('clearTranscript').addEventListener('click', () => {
      this.clearTranscript();
    });

    // Toggle switches
    document.getElementById('includeTimestamps').addEventListener('click', () => {
      this.toggleSwitch('includeTimestamps');
    });

    document.getElementById('includeSpeakers').addEventListener('click', () => {
      this.toggleSwitch('includeSpeakers');
    });

    document.getElementById('includeKeyPoints').addEventListener('click', () => {
      this.toggleSwitch('includeKeyPoints');
    });

    // Auto-save API key on input
    document.getElementById('apiKey').addEventListener('input', (e) => {
      this.autoSaveApiKey(e.target.value);
    });
  }

  async loadSavedData() {
    try {
      const result = await chrome.storage.sync.get([
        'openaiApiKey',
        'includeTimestamps',
        'includeSpeakers',
        'includeKeyPoints'
      ]);

      if (result.openaiApiKey) {
        document.getElementById('apiKey').value = result.openaiApiKey;
      }

      // Set toggle states
      this.setToggleState('includeTimestamps', result.includeTimestamps || false);
      this.setToggleState('includeSpeakers', result.includeSpeakers !== false); // Default to true
      this.setToggleState('includeKeyPoints', result.includeKeyPoints !== false); // Default to true
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }

  async checkStatus() {
    try {
      // Check if we're on a Google Meet page
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const isMeetPage = tab.url && tab.url.includes('meet.google.com');
      
      const statusElement = document.getElementById('status');
      const statusText = document.getElementById('statusText');
      
      if (isMeetPage) {
        statusElement.className = 'status active';
        statusText.textContent = 'Active on Google Meet';
      } else {
        statusElement.className = 'status inactive';
        statusText.textContent = 'Not on Google Meet page';
      }
    } catch (error) {
      console.error('Error checking status:', error);
    }
  }

  async updateStats() {
    try {
      const response = await chrome.runtime.sendMessage({ action: 'getTranscript' });
      const transcript = response.transcript || [];
      
      if (transcript.length > 0) {
        document.getElementById('stats').style.display = 'flex';
        document.getElementById('transcriptCount').textContent = transcript.length;
        
        // Calculate meeting duration
        if (transcript.length > 1) {
          const firstEntry = new Date(transcript[0].timestamp);
          const lastEntry = new Date(transcript[transcript.length - 1].timestamp);
          const durationMs = lastEntry - firstEntry;
          const durationMinutes = Math.round(durationMs / (1000 * 60));
          document.getElementById('meetingDuration').textContent = `${durationMinutes}m`;
        }
      } else {
        document.getElementById('stats').style.display = 'none';
      }
    } catch (error) {
      console.error('Error updating stats:', error);
    }
  }

  async saveApiKey() {
    const apiKey = document.getElementById('apiKey').value.trim();
    
    if (!apiKey) {
      this.showMessage('Please enter an API key', 'error');
      return;
    }

    try {
      const response = await chrome.runtime.sendMessage({
        action: 'saveApiKey',
        apiKey: apiKey
      });

      if (response.success) {
        this.showMessage('API key saved successfully!', 'success');
      } else {
        this.showMessage(`Error saving API key: ${response.error}`, 'error');
      }
    } catch (error) {
      this.showMessage(`Error saving API key: ${error.message}`, 'error');
    }
  }

  async autoSaveApiKey(apiKey) {
    if (apiKey && apiKey.length > 20) { // Basic validation
      try {
        await chrome.storage.sync.set({ openaiApiKey: apiKey });
      } catch (error) {
        console.error('Error auto-saving API key:', error);
      }
    }
  }

  async generateSummary() {
    const apiKey = document.getElementById('apiKey').value.trim();
    
    if (!apiKey) {
      this.showMessage('Please enter an OpenAI API key first', 'error');
      return;
    }

    // Show loading state
    document.getElementById('loading').style.display = 'block';
    document.getElementById('summaryResult').style.display = 'none';
    document.getElementById('generateSummary').disabled = true;

    try {
      const options = {
        summaryType: document.getElementById('summaryType').value,
        includeTimestamps: this.getToggleState('includeTimestamps'),
        includeSpeakers: this.getToggleState('includeSpeakers'),
        includeKeyPoints: this.getToggleState('includeKeyPoints'),
        maxLength: 500
      };

      const response = await chrome.runtime.sendMessage({
        action: 'generateSummary',
        data: options
      });

      // Hide loading state
      document.getElementById('loading').style.display = 'none';
      document.getElementById('generateSummary').disabled = false;

      if (response.success) {
        document.getElementById('summaryText').textContent = response.summary;
        document.getElementById('summaryResult').style.display = 'block';
        this.showMessage(`Summary generated successfully! (${response.transcriptLength} entries processed)`, 'success');
      } else {
        this.showMessage(`Error generating summary: ${response.error}`, 'error');
      }
    } catch (error) {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('generateSummary').disabled = false;
      this.showMessage(`Error generating summary: ${error.message}`, 'error');
    }
  }

  async clearTranscript() {
    try {
      const response = await chrome.runtime.sendMessage({ action: 'clearTranscript' });
      
      if (response.success) {
        this.showMessage('Transcript cleared successfully!', 'success');
        this.updateStats();
      } else {
        this.showMessage('Error clearing transcript', 'error');
      }
    } catch (error) {
      this.showMessage(`Error clearing transcript: ${error.message}`, 'error');
    }
  }

  toggleSwitch(elementId) {
    const element = document.getElementById(elementId);
    const isActive = element.classList.contains('active');
    
    this.setToggleState(elementId, !isActive);
    this.saveToggleState(elementId, !isActive);
  }

  setToggleState(elementId, isActive) {
    const element = document.getElementById(elementId);
    if (isActive) {
      element.classList.add('active');
    } else {
      element.classList.remove('active');
    }
  }

  getToggleState(elementId) {
    const element = document.getElementById(elementId);
    return element.classList.contains('active');
  }

  async saveToggleState(elementId, state) {
    try {
      await chrome.storage.sync.set({ [elementId]: state });
    } catch (error) {
      console.error(`Error saving toggle state for ${elementId}:`, error);
    }
  }

  showMessage(text, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = type;
    messageElement.style.display = 'block';

    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageElement.style.display = 'none';
    }, 5000);
  }

  // Method to refresh stats periodically
  startStatsRefresh() {
    setInterval(() => {
      this.updateStats();
    }, 5000); // Update every 5 seconds
  }
}

// Initialize the popup manager
const popupManager = new PopupManager();

// Start periodic stats refresh
popupManager.startStatsRefresh();