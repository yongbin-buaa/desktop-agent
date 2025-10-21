// Translation Website - Main JavaScript

class TranslationApp {
    constructor() {
        this.sourceText = document.getElementById('source-text');
        this.translationOutput = document.getElementById('translation-output');
        this.sourceLang = document.getElementById('source-lang');
        this.targetLang = document.getElementById('target-lang');
        this.charCount = document.getElementById('char-count');
        this.loading = document.getElementById('loading');
        this.notification = document.getElementById('notification');

        this.translationTimeout = null;
        this.translationDelay = 500; // milliseconds

        this.init();
    }

    init() {
        // Event listeners
        this.sourceText.addEventListener('input', () => this.handleInput());
        this.sourceLang.addEventListener('change', () => this.handleTranslate());
        this.targetLang.addEventListener('change', () => this.handleTranslate());

        document.getElementById('swap-languages').addEventListener('click', () => this.swapLanguages());
        document.getElementById('clear-input').addEventListener('click', () => this.clearInput());
        document.getElementById('copy-translation').addEventListener('click', () => this.copyTranslation());

        // Example buttons
        document.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.sourceText.value = e.target.dataset.text;
                this.handleInput();
            });
        });

        // Initialize language selector based on text detection
        this.updateCharCount();
    }

    handleInput() {
        this.updateCharCount();

        // Clear previous timeout
        if (this.translationTimeout) {
            clearTimeout(this.translationTimeout);
        }

        // Set new timeout for translation (debounce)
        this.translationTimeout = setTimeout(() => {
            this.handleTranslate();
        }, this.translationDelay);
    }

    updateCharCount() {
        const count = this.sourceText.value.length;
        this.charCount.textContent = count;
    }

    async handleTranslate() {
        const text = this.sourceText.value.trim();

        if (!text) {
            this.translationOutput.textContent = 'Translation will appear here...';
            this.translationOutput.classList.add('empty');
            return;
        }

        this.showLoading(true);

        try {
            const translation = await this.translate(
                text,
                this.sourceLang.value,
                this.targetLang.value
            );

            this.translationOutput.textContent = translation;
            this.translationOutput.classList.remove('empty');
        } catch (error) {
            console.error('Translation error:', error);
            this.translationOutput.textContent = 'Error: Unable to translate. Please try again.';
            this.translationOutput.classList.remove('empty');
        } finally {
            this.showLoading(false);
        }
    }

    async translate(text, sourceLang, targetLang) {
        // Check if source and target are the same
        if (sourceLang === targetLang) {
            return text;
        }

        // Try multiple translation APIs
        try {
            return await this.translateWithMyMemory(text, sourceLang, targetLang);
        } catch (error) {
            console.error('MyMemory API failed:', error);
            // Fallback to LibreTranslate if available
            try {
                return await this.translateWithLibreTranslate(text, sourceLang, targetLang);
            } catch (fallbackError) {
                console.error('LibreTranslate API failed:', fallbackError);
                throw new Error('All translation services failed');
            }
        }
    }

    async translateWithMyMemory(text, sourceLang, targetLang) {
        // MyMemory Translation API (free, no key required)
        const langPair = `${sourceLang}|${targetLang}`;
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('MyMemory API request failed');
        }

        const data = await response.json();

        if (data.responseStatus !== 200) {
            throw new Error('MyMemory API returned error status');
        }

        return data.responseData.translatedText;
    }

    async translateWithLibreTranslate(text, sourceLang, targetLang) {
        // LibreTranslate API (free public instance)
        // Note: This is a fallback and may have rate limits
        const url = 'https://libretranslate.de/translate';

        // Convert language codes
        const sourceCode = this.convertToLibreTranslateCode(sourceLang);
        const targetCode = this.convertToLibreTranslateCode(targetLang);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                source: sourceCode,
                target: targetCode,
                format: 'text'
            })
        });

        if (!response.ok) {
            throw new Error('LibreTranslate API request failed');
        }

        const data = await response.json();
        return data.translatedText;
    }

    convertToLibreTranslateCode(code) {
        // Convert language codes to LibreTranslate format
        const mapping = {
            'zh-CN': 'zh',
            'zh-TW': 'zh',
            'en': 'en'
        };
        return mapping[code] || code;
    }

    swapLanguages() {
        // Swap language selection
        const tempLang = this.sourceLang.value;
        this.sourceLang.value = this.targetLang.value;
        this.targetLang.value = tempLang;

        // Swap text if translation exists
        const currentTranslation = this.translationOutput.textContent;
        if (currentTranslation && !this.translationOutput.classList.contains('empty')) {
            this.sourceText.value = currentTranslation;
            this.handleInput();
        }
    }

    clearInput() {
        this.sourceText.value = '';
        this.translationOutput.textContent = 'Translation will appear here...';
        this.translationOutput.classList.add('empty');
        this.updateCharCount();
    }

    async copyTranslation() {
        const translation = this.translationOutput.textContent;

        if (!translation || this.translationOutput.classList.contains('empty')) {
            this.showNotification('Nothing to copy!');
            return;
        }

        try {
            await navigator.clipboard.writeText(translation);
            this.showNotification('Translation copied to clipboard!');
        } catch (error) {
            console.error('Copy failed:', error);
            this.showNotification('Failed to copy. Please try again.');
        }
    }

    showLoading(show) {
        if (show) {
            this.loading.classList.remove('hidden');
        } else {
            this.loading.classList.add('hidden');
        }
    }

    showNotification(message) {
        this.notification.textContent = message;
        this.notification.classList.remove('hidden');

        setTimeout(() => {
            this.notification.classList.add('hidden');
        }, 3000);
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TranslationApp();
});
