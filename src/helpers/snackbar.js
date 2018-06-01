export default {
    timeout: 2000,
    timer: null,
    setConfig(data) {
        if (typeof data === 'object') {
            console.log()
        }
    },
    show(message) {
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }

        if (document.getElementById('storya-snackbar')) {
            this.hide();
            this.$_setContent(message);
            window.setTimeout(() => {
                document.getElementById('storya-snackbar').style.bottom = '20px'
            }, 50);
        } else {
            var elem = document.createElement('div');
            elem.id = 'storya-snackbar';
            elem.className = 'storya-snack-bar snack-bar-bottom';
            var content = `
              <div id='snackbar-content'>
                ` + message + `
              </div>
            `;
            elem.innerHTML = content;
            document.body.appendChild(elem);

            window.setTimeout(() => {
                elem.style.bottom = '20px'
            }, 20);
        }

        this.timer = window.setTimeout(() => {
            this.hide();
        }, this.timeout);
    },
    hide() {
        var elem = document.getElementById('storya-snackbar');
        if (elem) {
            elem.style.bottom = '-100px';
        }
    },
    $_setContent(content) {
        var elem = document.getElementById('snackbar-content');
        if (elem) {
            elem.innerText = content;
        }
    }
}