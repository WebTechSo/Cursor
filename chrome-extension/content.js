// Content script for Google Meet transcript capture
class MeetTranscriptCapture {
  constructor() {
    this.transcript = [];
    this.isCapturing = false;
    this.lastTranscriptElement = null;
    this.init();
  }

  init() {
    // Wait for the page to load
    this.waitForTranscriptElements();
    this.setupMessageListener();
  }

  waitForTranscriptElements() {
    const checkForTranscript = () => {
      // Look for transcript elements in Google Meet
      const transcriptElements = document.querySelectorAll('[data-message-text]');
      const transcriptContainer = document.querySelector('[data-is-muted="false"]');
      
      if (transcriptElements.length > 0 || transcriptContainer) {
        this.startCapturing();
      } else {
        // Check again in 2 seconds
        setTimeout(checkForTranscript, 2000);
      }
    };

    checkForTranscript();
  }

  startCapturing() {
    if (this.isCapturing) return;
    
    this.isCapturing = true;
    console.log('Meet Transcript Capture: Started capturing');
    
    // Set up mutation observer to watch for new transcript entries
    this.setupTranscriptObserver();
    
    // Also check for existing transcript elements
    this.captureExistingTranscripts();
  }

  setupTranscriptObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            this.checkForTranscriptContent(node);
          }
        });
      });
    });

    // Observe the entire document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  checkForTranscriptContent(element) {
    // Look for transcript-related elements
    const transcriptSelectors = [
      '[data-message-text]',
      '[data-speaker-id]',
      '.transcript-entry',
      '.meeting-transcript',
      '[role="log"]',
      '[aria-label*="transcript"]'
    ];

    transcriptSelectors.forEach(selector => {
      const elements = element.querySelectorAll ? element.querySelectorAll(selector) : [];
      if (element.matches && element.matches(selector)) {
        elements.push(element);
      }
      
      elements.forEach(el => {
        this.processTranscriptElement(el);
      });
    });
  }

  processTranscriptElement(element) {
    if (!element || element === this.lastTranscriptElement) return;
    
    this.lastTranscriptElement = element;
    
    // Extract text content
    const text = element.textContent || element.innerText;
    if (text && text.trim()) {
      const timestamp = new Date().toISOString();
      const transcriptEntry = {
        text: text.trim(),
        timestamp: timestamp,
        speaker: this.extractSpeaker(element)
      };
      
      this.transcript.push(transcriptEntry);
      console.log('Captured transcript entry:', transcriptEntry);
      
      // Send to background script
      chrome.runtime.sendMessage({
        action: 'transcriptEntry',
        data: transcriptEntry
      });
    }
  }

  extractSpeaker(element) {
    // Try to extract speaker information
    const speakerElement = element.querySelector('[data-speaker-id]') || 
                          element.querySelector('.speaker-name') ||
                          element.querySelector('[aria-label*="speaker"]');
    
    if (speakerElement) {
      return speakerElement.textContent.trim();
    }
    
    // Check if element has speaker-related attributes
    const speakerId = element.getAttribute('data-speaker-id') || 
                     element.getAttribute('aria-label');
    
    return speakerId || 'Unknown Speaker';
  }

  captureExistingTranscripts() {
    // Capture any existing transcript elements
    const transcriptElements = document.querySelectorAll('[data-message-text], [data-speaker-id]');
    transcriptElements.forEach(element => {
      this.processTranscriptElement(element);
    });
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'getTranscript') {
        sendResponse({ transcript: this.transcript });
      } else if (message.action === 'clearTranscript') {
        this.transcript = [];
        sendResponse({ success: true });
      }
    });
  }

  // Method to get current transcript
  getTranscript() {
    return this.transcript;
  }

  // Method to clear transcript
  clearTranscript() {
    this.transcript = [];
    this.lastTranscriptElement = null;
  }
}

// Initialize the transcript capture
const transcriptCapture = new MeetTranscriptCapture();

// Alternative method: Monitor for live captions
class LiveCaptionCapture {
  constructor() {
    this.captions = [];
    this.init();
  }

  init() {
    this.monitorLiveCaptions();
  }

  monitorLiveCaptions() {
    // Look for live caption elements
    const captionSelectors = [
      '.live-caption',
      '[data-live-caption]',
      '.caption-text',
      '[aria-label*="caption"]'
    ];

    setInterval(() => {
      captionSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          const text = element.textContent || element.innerText;
          if (text && text.trim()) {
            const captionEntry = {
              text: text.trim(),
              timestamp: new Date().toISOString(),
              type: 'live-caption'
            };
            
            // Avoid duplicates
            const exists = this.captions.some(c => c.text === captionEntry.text);
            if (!exists) {
              this.captions.push(captionEntry);
              chrome.runtime.sendMessage({
                action: 'captionEntry',
                data: captionEntry
              });
            }
          }
        });
      });
    }, 1000);
  }

  getCaptions() {
    return this.captions;
  }
}

// Initialize live caption capture
const liveCaptionCapture = new LiveCaptionCapture();