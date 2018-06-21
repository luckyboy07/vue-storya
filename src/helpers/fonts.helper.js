import axios from 'axios';
import $ from 'linq'
export default {
    fonts: [
        "Fjalla",
        " Roboto",
        "Lato",
        "Raleway",
        "Great Vibes",
        "Work Sans",
        "Ubuntu Condensed",
        "Gloria Hallelujah",
        "Amatic SC",
        "Source Code Pro",
        "Comfortaa",
        "Poiret One",
        "Space Mono",
        "Righteous",
        "Concert One",
        "Cookie",
        "Lobster Two",
        "Bangers",
        "Cabin Sketch",
        "Italianno",
        "Pangolin",
        "Lekton",
        "Oxygen Mono",
        "Mr De Haviland",
        "Lemonada",
        "Shrikhand",
        "Frijole",
        "Clicker Script",
        "Fira Sans",
        "Pacifico",
        "Concert One",
        "Monoton",
        "Nova Script",
        "Londrina Shadow"
    ],
    processedFonts: [],
    getFonts: function(includeCss = false) {
        if (!includeCss) {
            var arr = [];
            for (var i = 0; i < this.processedFonts.length; i++) {
                arr.push(this.processedFonts[i].name);
            }
            return arr;
        } else {
            return this.processedFonts;
        }
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
                this.fonts = null;
                var fontCss = response.data.split('@');
                for (let i = 0; i < fontCss.length; i++) {
                    var d = fontCss[i].split('\n');
                    // console.log(i, d)
                    for (var j = 0; j < d.length; j++) {
                        let f = d[j].replace(';', '');
                        if (f.includes('font-family')) {
                            let name = f.split(':')[1];
                            name = name.trim().replace("'", "");
                            name = name.slice(0, name.length - 1);

                            var include = true;
                            for (var k = 0; k < this.processedFonts.length; k++) {
                                if (name === this.processedFonts[k].name) {
                                    include = false;
                                    break;
                                }
                            }
                            if (include) {
                                this.processedFonts.push({
                                    name: name,
                                    css: '@' + fontCss[i]
                                });
                            }
                        }
                    }
                }
                console.log('fonts proc', this.processedFonts)

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
    },
    getFont(name) {
        return this.processedFonts.length > 0 ? $.from(this.processedFonts).firstOrDefault(f => f.name === name) : '';
    },
}