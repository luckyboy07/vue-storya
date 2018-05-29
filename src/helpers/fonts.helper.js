import axios from 'axios';
export default {
    fonts: [
        "Amasis",
        "Ayita Pro",
        "Bembo Book",
        "Burlingame",
        "Charlotte Serif",
        "Crestwood",
        "Dante eText",
        "Domine",
        "Droid Sans",
        "English 111",
        "Fjalla One",
        "Ford's Folly",
        "Harmonia Sans",
        "Kalam",
        "Lato",
        "Linotype Didot eText",
        "Lora",
        "Merriweather",
        "Neuzeit Office",
        "News Gothic BT",
        "Noto Sans",
        "Old English",
        "Open Sans",
        "Petit Formal Script",
        "PT Sans",
        "Roboto",
        "Signika",
        "Vollkorn"
    ],
    processedFonts: [],
    getFonts: function() {
        return this.processedFonts;
    },
    appendFont() {
        let head = document.head;
        let styleElem = document.createElement('style');

        var req_url = this._getFontsUri();
        if (!req_url.split('=')[1]) {
            // fixes: Failed to load http://fonts.googleapis.com/css?family=: 
            // No 'Access-Control-Allow-Origin' header is present on the requested resource.
            return;
        }
        axios.get(req_url)
            .then(response => {
                styleElem.innerHTML = response.data;
                this.fonts = [];
                let d = response.data.split('\n');
                for (let i = 0; i < d.length; i++) {
                    let f = d[i].replace(';', '');
                    if (f.includes('font-family')) {
                        let name = f.split(':')[1];
                        name = name.trim().replace("'", "");
                        name = name.slice(0, name.length - 1);
                        if (!this.processedFonts.includes(name)) {
                            this.processedFonts.push(name);
                        }
                    }
                }

                head.appendChild(styleElem);
            });
    },
    _getFontsUri() {
        var cssUri = "//fonts.googleapis.com/css?family=";
        for (let i = 0; i < this.fonts.length; i++) {
            cssUri += this._formatFontName(this.fonts[i]);
            if (i !== (this.fonts.length - 1)) {
                cssUri += "|";
            }
        }

        return cssUri;
    },
    _formatFontName(fontName) {
        if (fontName.includes(' ')) {
            return fontName.split(' ').join('+');
        }
        return fontName;
    }
}