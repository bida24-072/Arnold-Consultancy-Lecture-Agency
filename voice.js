document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const voiceBtn = document.getElementById('voice-btn');
    const voiceFeedback = document.getElementById('voice-feedback');
    const content = document.getElementById('content');
    
    // Check for browser support
    if (!('webkitSpeechRecognition' in window) {
        voiceBtn.disabled = true;
        voiceFeedback.textContent = "Voice commands not supported in your browser";
        voiceFeedback.style.display = 'block';
        return;
    }
    
    // Create speech recognition object
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    // Configuration
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    // State variables
    let isListening = false;
    let speechSynthesis = window.speechSynthesis;
    let currentUtterance = null;
    
    // Toggle voice recognition
    voiceBtn.addEventListener('click', toggleListening);
    
    function toggleListening() {
        if (isListening) {
            recognition.stop();
            voiceBtn.classList.remove('listening');
            voiceFeedback.textContent = "Microphone off";
            setTimeout(() => { voiceFeedback.style.display = 'none'; }, 2000);
        } else {
            recognition.start();
            voiceBtn.classList.add('listening');
            voiceFeedback.textContent = "Listening... Say 'help' for commands";
            voiceFeedback.style.display = 'block';
        }
        isListening = !isListening;
    }
    
    // Process speech results
    recognition.onresult = function(event) {
        const last = event.results.length - 1;
        const transcript = event.results[last][0].transcript.toLowerCase().trim();
        const confidence = event.results[last][0].confidence;
        
        // Only process if confidence is reasonable
        if (confidence > 0.5) {
            processCommand(transcript);
        }
    };
    
    // Error handling
    recognition.onerror = function(event) {
        console.error('Speech recognition error', event.error);
        voiceFeedback.textContent = "Error: " + event.error;
        voiceBtn.classList.remove('listening');
        isListening = false;
    };
    
    // Process recognized commands
    function processCommand(command) {
        voiceFeedback.textContent = "Heard: " + command;
        
        // Navigation commands
        if (command.includes('scroll down')) {
            window.scrollBy(0, 200);
            speakFeedback("Scrolling down");
        } 
        else if (command.includes('scroll up')) {
            window.scrollBy(0, -200);
            speakFeedback("Scrolling up");
        }
        else if (command.includes('go to top') || command.includes('top of page')) {
            window.scrollTo(0, 0);
            speakFeedback("Going to top");
        }
        else if (command.includes('go to bottom') || command.includes('bottom of page')) {
            window.scrollTo(0, document.body.scrollHeight);
            speakFeedback("Going to bottom");
        }
        
        // Appearance commands
        else if (command.includes('dark mode') || command.includes('dark theme')) {
            document.body.style.backgroundColor = '#333';
            document.body.style.color = '#fff';
            speakFeedback("Changed to dark mode");
        }
        else if (command.includes('light mode') || command.includes('light theme')) {
            document.body.style.backgroundColor = '#fff';
            document.body.style.color = '#333';
            speakFeedback("Changed to light mode");
        }
        else if (command.includes('bigger text') || command.includes('increase text')) {
            document.body.style.fontSize = '1.2em';
            speakFeedback("Increased text size");
        }
        else if (command.includes('normal text') || command.includes('default text')) {
            document.body.style.fontSize = '1em';
            speakFeedback("Normal text size");
        }
        
        // Content commands
        else if (command.includes('read content') || command.includes('read page')) {
            readContent();
        }
        else if (command.includes('pause reading') || command.includes('stop reading')) {
            speechSynthesis.cancel();
            speakFeedback("Stopped reading");
        }
        else if (command.startsWith('search for ')) {
            const query = command.replace('search for ', '');
            speakFeedback(`Searching for ${query}`);
            // In a real implementation, you would execute search here
        }
        
        // Control commands
        else if (command.includes('stop listening')) {
            recognition.stop();
            voiceBtn.classList.remove('listening');
            isListening = false;
            speakFeedback("Voice control off");
            voiceFeedback.style.display = 'none';
        }
        else if (command.includes('help')) {
            const helpText = "Available commands: navigation, appearance changes, content reading, and control commands";
            speakFeedback(helpText);
        }
    }
    
    // Speak feedback to user
    function speakFeedback(text) {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
    }
    
    // Read page content aloud
    function readContent() {
        const pageText = document.body.innerText
            .replace(/\s+/g, ' ')
            .replace(/\[.*?\]/g, '') // Remove brackets
            .trim();
            
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
        
        currentUtterance = new
