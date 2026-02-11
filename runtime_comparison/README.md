# CoPE-VideoLM Website

Interactive runtime comparison showcase for CoPE-VideoLM.

## Project Structure

```
CoPE-Website/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All CSS styles
├── js/
│   ├── app.js              # Main application entry point
│   └── modules/
│       ├── ui.js           # UI utilities and DOM manipulation
│       ├── carousel.js     # Video carousel navigation
│       └── animation.js    # Chat animation sequences
├── data/
│   └── config.js           # Video data and configuration
└── assets/
    ├── cope_logo.png
    ├── cope_logo_transparent.png
    ├── llava_logo.png
    ├── video_example1.mp4
    └── video_example2.mp4
```

## Module Overview

### `js/app.js`
Main application entry point that:
- Initializes the application
- Sets up event listeners
- Coordinates between modules
- Handles keyboard shortcuts

### `js/modules/ui.js`
UI utilities including:
- Bubble creation for chat messages
- Typewriter effect for text animation
- Chat window scrolling
- Time and status updates
- Control button management

### `js/modules/carousel.js`
Video carousel functionality:
- Carousel initialization and navigation
- Dot indicators management
- Video switching logic
- UI updates for carousel state

### `js/modules/animation.js`
Chat animation sequences:
- Animation state management
- Question/answer sequence timing
- Typewriter effects coordination
- Timer tracking and cleanup

### `data/config.js`
Configuration and data:
- Video carousel data structure
- Conversation scripts for each video
- Timing configurations (delays, speeds)
- Model-specific settings

## Adding New Videos

To add a new video to the carousel, edit `data/config.js`:

```javascript
export const videoCarousel = [
  // ... existing videos
  {
    videoSrc: "assets/your_video.mp4",
    caption: "Your Video Caption",
    conversations: [
      {
        key: "q1",
        label: "Question 1",
        phone1: {
          question: "Your question here",
          answer: "LLaVA-Video answer",
        },
        phone2: {
          question: "Your question here",
          answer: "CoPE-VideoLM answer",
        },
      },
      // Add more Q&A pairs...
    ]
  }
];
```

## Keyboard Shortcuts

- **Space**: Start/Pause animation
- **Cmd/Ctrl + R**: Reset animation
- **H**: Toggle control panel visibility
- **Arrow Left/Right**: Navigate between videos (when animation stopped)

## Development

This project uses ES6 modules. To run locally, you'll need a local server due to CORS restrictions. You can use:

```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server)
npx http-server

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Browser Compatibility

- Modern browsers with ES6 module support
- Chrome, Firefox, Safari, Edge (latest versions)
- JavaScript modules must be enabled

## Configuration

### Timing Adjustments

Edit `data/config.js` to adjust timing:

```javascript
// Response delays (Time-to-First-Token)
export const phoneDelays = {
  phone1: 2.39, // LLaVA-Video TTFT in seconds
  phone2: 0.33, // CoPE-VideoLM TTFT in seconds
};

// Answer typing speeds (total duration in ms)
export const answerTypingSpeeds = {
  phone1: 1390,
  phone2: 1330,
};
```

## License

[Add your license information here]
