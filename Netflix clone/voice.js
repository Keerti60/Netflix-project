// ==================== Voice Recognition Setup ====================
let recognition = null;
let isListening = false;

// Initialize Speech Recognition
function initVoiceRecognition() {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        console.error('Speech Recognition not supported in this browser');
        alert('Voice commands are not supported in your browser. Please use Chrome, Edge, or Safari.');
        return false;
    }
    
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onstart = handleVoiceStart;
    recognition.onresult = handleVoiceResult;
    recognition.onerror = handleVoiceError;
    recognition.onend = handleVoiceEnd;
    
    return true;
}

// ==================== Voice Event Handlers ====================
function handleVoiceStart() {
    console.log('Voice recognition started');
    isListening = true;
    showVoiceFeedback('Listening...');
    
    const voiceBtn = document.getElementById('voiceBtn');
    voiceBtn.classList.add('active');
}

function handleVoiceResult(event) {
    const transcript = event.results[0][0].transcript.toLowerCase().trim();
    console.log('Voice command:', transcript);
    
    showVoiceCommand(transcript);
    processVoiceCommand(transcript);
}

function handleVoiceError(event) {
    console.error('Voice recognition error:', event.error);
    
    let errorMessage = 'Voice command failed';
    
    switch(event.error) {
        case 'no-speech':
            errorMessage = 'No speech detected';
            break;
        case 'audio-capture':
            errorMessage = 'Microphone not found';
            break;
        case 'not-allowed':
            errorMessage = 'Microphone permission denied';
            break;
        default:
            errorMessage = `Error: ${event.error}`;
    }
    
    showVoiceCommand(errorMessage);
    setTimeout(hideVoiceFeedback, 2000);
}

function handleVoiceEnd() {
    console.log('Voice recognition ended');
    isListening = false;
    
    const voiceBtn = document.getElementById('voiceBtn');
    voiceBtn.classList.remove('active');
    
    setTimeout(hideVoiceFeedback, 2000);
}

// ==================== Voice Command Processing ====================
function processVoiceCommand(command) {
    // Navigation commands
    if (command.includes('show trending') || command.includes('trending')) {
        window.netflixApp.scrollToSection('trending');
        showVoiceCommand('Showing trending movies');
        return;
    }
    
    if (command.includes('show action') || command.includes('action movies')) {
        window.netflixApp.scrollToSection('action');
        showVoiceCommand('Showing action movies');
        return;
    }
    
    if (command.includes('show comedy') || command.includes('comedy movies')) {
        window.netflixApp.scrollToSection('comedy');
        showVoiceCommand('Showing comedy movies');
        return;
    }
    
    if (command.includes('show horror') || command.includes('horror movies')) {
        window.netflixApp.scrollToSection('horror');
        showVoiceCommand('Showing horror movies');
        return;
    }
    
    if (command.includes('show romance') || command.includes('romance movies')) {
        window.netflixApp.scrollToSection('romance');
        showVoiceCommand('Showing romance movies');
        return;
    }
    
    if (command.includes('show documentary') || command.includes('documentaries')) {
        window.netflixApp.scrollToSection('documentary');
        showVoiceCommand('Showing documentaries');
        return;
    }
    
    if (command.includes('go home') || command.includes('home')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showVoiceCommand('Going home');
        return;
    }
    
    // Search command
    if (command.includes('search')) {
        const searchQuery = command.replace('search', '').replace('for', '').trim();
        if (searchQuery) {
            searchMovies(searchQuery);
            showVoiceCommand(`Searching for "${searchQuery}"`);
        } else {
            showVoiceCommand('Please specify what to search for');
        }
        return;
    }
    
    // Play command
    if (command.includes('play')) {
        const movieName = command.replace('play', '').trim();
        if (movieName) {
            searchAndPlayMovie(movieName);
            showVoiceCommand(`Playing "${movieName}"`);
        } else {
            showVoiceCommand('Please specify a movie to play');
        }
        return;
    }
    
    // Close/Exit command
    if (command.includes('close') || command.includes('exit') || command.includes('back')) {
        const modal = document.getElementById('movieModal');
        if (modal.classList.contains('active')) {
            window.netflixApp.closeMovieModal();
            showVoiceCommand('Closing');
        }
        return;
    }
    
    // Mute/Unmute commands
    if (command.includes('mute')) {
        muteVideo();
        showVoiceCommand('Muted');
        return;
    }
    
    if (command.includes('unmute')) {
        unmuteVideo();
        showVoiceCommand('Unmuted');
        return;
    }
    
    // Help command
    if (command.includes('help') || command.includes('commands')) {
        showVoiceHelp();
        return;
    }
    
    // Default - command not recognized
    showVoiceCommand('Command not recognized. Say "help" for available commands.');
}

// ==================== Voice Command Actions ====================
async function searchMovies(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=84bbc1c699930f2c9f220c722da946b3&query=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            // Open the first result
            window.netflixApp.openMovieModal(data.results[0].id);
        } else {
            showVoiceCommand('No results found');
        }
    } catch (error) {
        console.error('Search error:', error);
        showVoiceCommand('Search failed');
    }
}

async function searchAndPlayMovie(movieName) {
    await searchMovies(movieName);
}

function muteVideo() {
    const iframe = document.querySelector('.modal-video iframe');
    if (iframe) {
        const src = iframe.src;
        if (src.includes('mute=0')) {
            iframe.src = src.replace('mute=0', 'mute=1');
        } else if (!src.includes('mute=')) {
            iframe.src = src + '&mute=1';
        }
    }
}

function unmuteVideo() {
    const iframe = document.querySelector('.modal-video iframe');
    if (iframe) {
        const src = iframe.src;
        iframe.src = src.replace('mute=1', 'mute=0');
    }
}

function showVoiceHelp() {
    const helpText = `
Available voice commands:
• "Show trending" - View trending movies
• "Show action/comedy/horror/romance" - View genre sections
• "Search [movie name]" - Search for a movie
• "Play [movie name]" - Play a specific movie
• "Go home" - Return to top
• "Close" - Close modal
• "Mute/Unmute" - Control audio
    `.trim();
    
    alert(helpText);
    showVoiceCommand('Showing help');
}

// ==================== UI Feedback Functions ====================
function showVoiceFeedback(text) {
    const feedback = document.getElementById('voiceFeedback');
    const voiceText = feedback.querySelector('.voice-text');
    voiceText.textContent = text;
    feedback.classList.add('active');
}

function hideVoiceFeedback() {
    const feedback = document.getElementById('voiceFeedback');
    feedback.classList.remove('active');
    
    // Clear command text after hiding
    setTimeout(() => {
        const commandText = document.getElementById('voiceCommand');
        commandText.textContent = '';
    }, 300);
}

function showVoiceCommand(command) {
    const commandText = document.getElementById('voiceCommand');
    commandText.textContent = command;
}

// ==================== Voice Button Handler ====================
function toggleVoiceRecognition() {
    if (!recognition) {
        const initialized = initVoiceRecognition();
        if (!initialized) return;
    }
    
    if (isListening) {
        recognition.stop();
    } else {
        try {
            recognition.start();
        } catch (error) {
            console.error('Failed to start recognition:', error);
            alert('Please wait a moment before trying again');
        }
    }
}

// ==================== Keyboard Shortcuts ====================
document.addEventListener('keydown', (event) => {
    // Press 'V' to activate voice commands
    if (event.key === 'v' || event.key === 'V') {
        if (!document.getElementById('movieModal').classList.contains('active')) {
            toggleVoiceRecognition();
        }
    }
    
    // Press 'Escape' to close modal
    if (event.key === 'Escape') {
        const modal = document.getElementById('movieModal');
        if (modal.classList.contains('active')) {
            window.netflixApp.closeMovieModal();
        }
        if (isListening) {
            recognition.stop();
        }
    }
});

// ==================== Initialize Voice Commands ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize voice recognition
    initVoiceRecognition();
    
    // Setup voice button
    const voiceBtn = document.getElementById('voiceBtn');
    voiceBtn.addEventListener('click', toggleVoiceRecognition);
    
    // Show welcome message
    setTimeout(() => {
        console.log('Voice commands ready! Click the microphone icon or press "V" to start.');
    }, 1000);
});

// ==================== Export for Testing ====================
window.voiceCommands = {
    toggleVoiceRecognition,
    processVoiceCommand,
    isListening: () => isListening
};
