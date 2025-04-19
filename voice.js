// Voice Command Implementation
const voiceControlBtn = document.getElementById('voice-control-btn');
const voiceStatus = document.getElementById('voice-status');
const voiceCommand = document.getElementById('voice-command');
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

// Configure voice recognition
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';

let isListening = false;

// Voice control toggle
voiceControlBtn.addEventListener('click', () => {
    isListening = !isListening;
    
    if (isListening) {
        recognition.start();
        voiceStatus.textContent = "Voice control: Listening...";
        voiceControlBtn.classList.add('active');
    } else {
        recognition.stop();
        voiceStatus.textContent = "Voice control: Off";
        voiceControlBtn.classList.remove('active');
    }
});

// Process voice commands
recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const command = event.results[last][0].transcript.toLowerCase();
    voiceCommand.textContent = `Heard: "${command}"`;
    
    // Process commands
    if (command.includes('high contrast')) {
        document.body.classList.toggle('high-contrast');
        voiceCommand.textContent += " - Toggled high contrast mode";
    }
    else if (command.includes('increase text') || command.includes('larger text')) {
        if (document.body.classList.contains('xlarge-text')) {
            document.body.classList.remove('xlarge-text');
        } else if (document.body.classList.contains('large-text')) {
            document.body.classList.add('xlarge-text');
        } else {
            document.body.classList.add('large-text');
        }
        voiceCommand.textContent += " - Increased text size";
    }
    else if (command.includes('normal text') || command.includes('default text')) {
        document.body.classList.remove('large-text', 'xlarge-text');
        voiceCommand.textContent += " - Reset text size";
    }
    else if (command.includes('read page')) {
        readPageContent();
        voiceCommand.textContent += " - Reading page content";
    }
    else if (command.includes('stop')) {
        speechSynthesis.cancel();
        voiceCommand.textContent += " - Stopped reading";
    }
};

// Error handling
recognition.onerror = (event) => {
    console.error('Speech recognition error', event.error);
    voiceStatus.textContent = "Voice control: Error";
    isListening = false;
    voiceControlBtn.classList.remove('active');
};

// Read page content function
function readPageContent() {
    const mainContent = document.querySelector('main').innerText;
    const speech = new SpeechSynthesisUtterance();
    speech.text = mainContent;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}
