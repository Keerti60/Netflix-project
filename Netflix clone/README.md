# 🎬 Netflix Clone with Voice Commands

A premium Netflix clone that exactly replicates the Netflix website with integrated voice command functionality and real-time movie data from TMDB API.

![Netflix Clone](https://img.shields.io/badge/Netflix-Clone-E50914?style=for-the-badge&logo=netflix)
![Voice Commands](https://img.shields.io/badge/Voice-Enabled-00D9FF?style=for-the-badge&logo=google-assistant)
![TMDB API](https://img.shields.io/badge/TMDB-API-01D277?style=for-the-badge&logo=themoviedatabase)

## ✨ Features

- 🎯 **Exact Netflix UI** - Pixel-perfect replication of Netflix's current design
- 🏆 **Top 10 Trending** - Netflix-style numbered badges for top movies
- 🎭 **5 Genre Sections** - Action, Comedy, Horror, Romance, Documentaries
- 🎤 **Voice Commands** - Hands-free navigation and control
- 🎬 **Movie Trailers** - YouTube integration for movie previews
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Smooth Animations** - Netflix-quality transitions and effects

## 🚀 Quick Start

### 1. Open the Application
Simply open `index.html` in your browser:
```
file:///d:/Netflix clone/index.html
```

**Recommended Browsers**: Chrome, Edge, or Safari (for full voice support)

### 2. Grant Microphone Access
Click "Allow" when prompted for microphone permissions (required for voice commands)

### 3. Start Exploring!
- Browse movies by scrolling through sections
- Click any movie card to view details and trailers
- Click the microphone icon or press `V` to use voice commands

## 🎤 Voice Commands

### Activate Voice Control
- Click the **microphone icon** in the header
- Press the **`V`** key on your keyboard

### Available Commands

**Navigation**
- `"Show trending"` - View Top 10 trending movies
- `"Show action"` - Navigate to Action movies
- `"Show comedy"` - Navigate to Comedy movies
- `"Show horror"` - Navigate to Horror movies
- `"Show romance"` - Navigate to Romance movies
- `"Show documentary"` - Navigate to Documentaries
- `"Go home"` - Return to top of page

**Movie Control**
- `"Play [movie name]"` - Search and play a specific movie
- `"Search [query]"` - Search for movies
- `"Close"` - Close the movie modal
- `"Mute"` / `"Unmute"` - Control video audio

**Help**
- `"Help"` - Show all available commands

## 📁 Project Structure

```
d:\Netflix clone\
├── index.html          # Main HTML structure
├── styles.css          # Complete design system
├── app.js             # TMDB API integration & UI logic
└── voice.js           # Voice recognition & commands
```

## 🎨 Design Features

### Netflix-Authentic Elements
- **Color Scheme**: Netflix Black (#141414) with Red (#E50914) accents
- **Typography**: Roboto and Bebas Neue fonts
- **Animations**: Smooth hover effects (1.05x scale)
- **Layout**: Horizontal scrollable movie rows
- **Hero Banner**: Full-width featured movie with gradient overlay
- **Top 10 Badges**: Large numbered overlays (1-10)

### Responsive Breakpoints
- **Desktop**: 1920px+ (full experience)
- **Tablet**: 768px (optimized layout)
- **Mobile**: 375px (compact design)

## 🔧 Technical Details

### TMDB API Integration
- **API Key**: `84bbc1c699930f2c9f220c722da946b3`
- **Endpoints**: Trending, Genre Discovery, Movie Details, Videos
- **Image CDN**: High-quality movie posters and backdrops

### Voice Recognition
- **Technology**: Web Speech API
- **Language**: English (US)
- **Mode**: Single command recognition
- **Feedback**: Visual animations and text display

## 🎯 How to Use

### Basic Navigation
1. **Browse**: Scroll through different movie sections
2. **Hover**: See movie titles and ratings on hover
3. **Click**: Open detailed view with trailer
4. **Close**: Click X, press Escape, or click outside modal

### Voice Control Example
```
1. Press 'V' or click microphone icon
2. Wait for "Listening..." feedback
3. Say "Show action"
4. Action movies section appears
5. Say "Play John Wick"
6. John Wick modal opens with trailer
```

## 🎬 Movie Sections

1. **Top 10 Trending Movies** - Most popular movies this week
2. **Action Movies** - High-octane action films
3. **Comedy Movies** - Laugh-out-loud comedies
4. **Horror Movies** - Spine-chilling horror films
5. **Romance Movies** - Heartwarming romantic films
6. **Documentaries** - Informative documentaries

## ⌨️ Keyboard Shortcuts

- `V` - Activate voice recognition
- `Escape` - Close modal or stop listening
- Arrow keys - Scroll through movie rows (when focused)

## 🌐 Browser Compatibility

| Browser | UI Support | Voice Commands |
|---------|-----------|----------------|
| Chrome  | ✅ Full    | ✅ Full         |
| Edge    | ✅ Full    | ✅ Full         |
| Safari  | ✅ Full    | ✅ Full         |
| Firefox | ✅ Full    | ⚠️ Limited     |

## 🎓 Features Showcase

### Hero Banner
- Auto-loads trending movie as featured content
- Displays title, description, and action buttons
- Full-width background with gradient overlay

### Top 10 Section
- Shows 10 most trending movies
- Large numbered badges (1-10) in Netflix style
- Click to view details and trailers

### Genre Sections
- 5 curated genre categories
- 20 movies per section
- Horizontal scroll with navigation arrows

### Movie Modal
- YouTube trailer integration
- Movie details (rating, year, runtime)
- Full overview and description
- Smooth slide-in animation

### Voice Feedback
- Visual listening indicator
- Animated sound waves
- Command text display
- Error handling and messages

## 🔍 Troubleshooting

**Movies not loading?**
- Check internet connection (TMDB API requires network)
- Open browser console (F12) to check for errors

**Voice commands not working?**
- Grant microphone permissions
- Use Chrome, Edge, or Safari
- Speak clearly and wait for "Listening..." feedback

**Images not displaying?**
- Ensure internet connection is active
- Some movies may not have images (placeholder will show)

## 📝 Credits

- **TMDB API** - Movie data and images
- **YouTube** - Trailer videos
- **Netflix** - Design inspiration
- **Web Speech API** - Voice recognition

## 🎉 Enjoy!

Your Netflix clone is ready to use! Open `index.html` and start exploring movies with voice commands! 🎬🎤

---

**Made with ❤️ using vanilla HTML, CSS, and JavaScript**
