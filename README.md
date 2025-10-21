# Chinese-English Translation Website

A beautiful, real-time translation website for seamless Chinese-English bidirectional translation.

## Features

- **Real-time Translation**: Get instant translations as you type with intelligent debouncing
- **Bidirectional Support**: Translate between Chinese (Simplified/Traditional) and English in both directions
- **Modern UI**: Clean, responsive design that works on desktop and mobile devices
- **Quick Examples**: Pre-loaded example phrases for quick testing
- **Copy to Clipboard**: Easily copy translations with one click
- **Language Swap**: Quickly swap source and target languages
- **Character Counter**: Track the length of your input text
- **No Sign-up Required**: Start translating immediately without any registration

## Technology Stack

- **Frontend**: Pure HTML5, CSS3, and vanilla JavaScript
- **Translation APIs**:
  - Primary: MyMemory Translation API
  - Fallback: LibreTranslate API
- **Design**: Modern gradient background with card-based layout
- **Responsive**: Mobile-first design that adapts to all screen sizes

## Supported Languages

- English
- Chinese (Simplified)
- Chinese (Traditional)

## How to Use

1. **Open the Website**: Simply open `index.html` in any modern web browser
2. **Select Languages**: Choose your source and target languages from the dropdowns
3. **Enter Text**: Type or paste text in the source text area
4. **Get Translation**: Translation appears automatically after you stop typing
5. **Copy Result**: Click the "Copy" button to copy the translation to clipboard

## Quick Start

### Option 1: Direct Browser Access
```bash
# Simply open the file in your browser
open index.html
# or
firefox index.html
# or
chrome index.html
```

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Then open http://localhost:8000 in your browser
```

## Project Structure

```
.
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Translation logic and interactivity
└── README.md          # Documentation
```

## Features in Detail

### Real-time Translation
The app uses intelligent debouncing to translate text automatically 500ms after you stop typing, providing a smooth user experience without overwhelming the translation API.

### Multiple Translation APIs
For reliability, the application uses multiple translation services:
1. **MyMemory API** (Primary): Free translation service with good quality
2. **LibreTranslate** (Fallback): Open-source alternative if primary fails

### Responsive Design
The website is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

### Browser Compatibility
Works on all modern browsers:
- Chrome/Edge (Chromium-based)
- Firefox
- Safari
- Opera

## API Information

### MyMemory Translation API
- No API key required
- Free tier available
- Good translation quality
- Rate limits apply

### LibreTranslate API
- Open-source translation API
- Public instance available
- Used as fallback
- May have rate limits on public instance

## Customization

### Changing Translation Delay
Edit `script.js` and modify the `translationDelay` value:
```javascript
this.translationDelay = 500; // milliseconds
```

### Adding More Languages
1. Add language options in `index.html`:
```html
<option value="fr">French</option>
```

2. Ensure the translation API supports the language codes

### Styling
All styles are in `styles.css`. Customize colors by modifying CSS variables:
```css
:root {
    --primary-color: #4a90e2;
    --secondary-color: #357abd;
    /* ... more variables */
}
```

## Development

### Prerequisites
- Any modern web browser
- (Optional) Local web server for better development experience

### Testing
1. Open `index.html` in a browser
2. Try the example phrases
3. Test with various Chinese and English texts
4. Test on different screen sizes

## Known Limitations

- Translation quality depends on the external APIs
- Rate limits may apply on free API tiers
- Internet connection required for translation
- Very long texts may have translation delays

## Future Enhancements

Potential features for future versions:
- Support for more languages
- Voice input/output
- Translation history
- Offline mode with local dictionary
- Custom API key support
- Dark mode toggle
- Export translations

## License

This project is open-source and available for free use.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## Support

For issues or questions:
1. Check the documentation
2. Review browser console for errors
3. Ensure internet connectivity
4. Try a different browser

## Acknowledgments

- Translation powered by MyMemory and LibreTranslate APIs
- Icons and design inspired by modern web standards
- Built with vanilla JavaScript for maximum compatibility

---

**Enjoy seamless Chinese-English translation!**
