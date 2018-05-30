export default {
    $_gridLineContainer: null,
    showLine() {
        console.log()
    },
    /**
     * Create Grid Lines
     */
    createGridLines(canvasData, parentElem, lineCount) {
        // vertical grid lines
        var vc = canvasData.width / 50;
        var ve = document.createElement('div');
        ve.id = 'vguideline';
        ve.style.width = canvasData.width + 'px';
        ve.style.height = canvasData.height + 'px';
        ve.style.position = 'absolute';
        ve.style.top = '0';
        ve.style.display = 'flex';
        for (var j = 1; j <= vc; j++) {
            var _cel = document.createElement('div');
            _cel.style.width = "2px";
            _cel.style.height = "100%";
            _cel.style.marginLeft = j > 1 ? (canvasData.width / 50) * 5 + 'px' : 0;
            _cel.style.borderRight = 'thin dashed #808080';
            // _cel.style.zIndex = '9';
            ve.appendChild(_cel);
        }
        parentElem.appendChild(ve);

        // horizaontal grid lines
        var hc = canvasData.height / 50;
        var he = document.createElement('div');
        he.id = 'hguideline';
        he.style.width = canvasData.width + 'px';
        he.style.position = 'absolute';
        he.style.top = '0';

        for (var i = 1; i <= hc; i++) {
            var _cel = document.createElement('div');
            _cel.style.width = "100%";
            _cel.style.height = "2px";
            _cel.style.marginTop = i > 1 ? (canvasData.height / 50) * 5 + 'px' : 0;
            _cel.style.borderTop = 'thin dashed #808080';
            // _cel.style.zIndex = '98910';
            he.appendChild(_cel);
        }
        parentElem.appendChild(he);
    },
    showGridLines(show) {
        if (show) {
            document.getElementById('hguideline').style.display = 'block';
            document.getElementById('vguideline').style.display = 'flex';
        } else {
            document.getElementById('hguideline').style.display = 'none';
            document.getElementById('vguideline').style.display = 'none';
        }
    },
}