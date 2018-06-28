import appHelper from './app.helper'
import animation from './animation';
import fontHelper from './fonts.helper'
import responsiveHelper from './responsive-helper'

// import {JSZip} from 'JSZip'
// import VueLocalStorage from 'vue-localstorage'
export default {
    exportHtmlTemplatePart1: `
  <!DOCTYPE html>
  <html>
    <head>
      <title></title>
      <style type="text/css">
        body {
            margin: 0;
        }
        .lds-ripple {
            display: inline-block;
            position: relative;
            width: 64px;
            height: 64px;
        }
        .lds-ripple div {
            position: absolute;
            border: 4px solid #fff;
            opacity: 1;
            border-radius: 50%;
            margin: auto auto;
            animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        .lds-ripple div:nth-child(2) {
            animation-delay: -0.5s;
        }
        @keyframes lds-ripple {
            0% {
                top: 28px;
                left: 28px;
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                top: -1px;
                left: -1px;
                width: 58px;
                height: 58px;
                opacity: 0;
            }
        }
      .tl-container {
        width: 100%;
        cursor: auto;
        word-wrap: break-word;
      }
      #shapeContainer {
        width: 35%;
        height: 100%;
        margin: auto;
        background-image: linear-gradient(
            to bottom,
            rgba(255, 159, 63, 0.2),
            rgba(255, 159, 63, 0.8)
          ),
          url(http://coothead.co.uk/images/amy.jpg);
        background-size: auto 100%;
        background-position: center top;
      }
      svg {
        display: block;
        width: 100%;
        height: 100%;
        overflow:visible;
      }
      .circle {
        width: 100%!important;
        height: 100%!important;
        line-height: 200px;
        border-radius: 50%; /* the magic */
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        text-align: center;
        color: white;
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 700;
        margin: 0 auto 40px;
        position: absolute;
      }
      .triangle {
        /* border-left: 50px solid transparent; */
        /* border-right: 50px solid transparent; */
        /* border-bottom: 100px solid red; */
      }
      .square {
        width: 100%!important;
        height: 100%!important;
        position: absolute;
      }
      .blue {
        background-color: #3498db;  
      }
        .editor-container, .editor-box {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0px;
          margin-left: auto;
          margin-right: auto;
          left: 0px;
          right: 0px;
          transform: translateY(0px);
          border-width: 0px;
          border-style: solid;
          border-color: rgb(255, 255, 255);
          border-image: initial;
          overflow: hidden;
        }
        .rr-resizer {
          position: absolute;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          left: 0;
          top: 0;
        }
  
        .rr-content {
          width: 100%;
            height: 100%;
            z-index: 1;
        }

        .shape-container, .shape {
          width: 100%;
          height: 100%;
        }

        --CUSTOM_STYLES--
        /* cyrillic */
        @font-face {
          font-family: 'Amatic SC';
          font-style: normal;
          font-weight: 400;
          src: local('Amatic SC Regular'), local('AmaticSC-Regular'), url(http://fonts.gstatic.com/s/amaticsc/v11/TUZyzwprpvBS1izr_vOEDuSfQZQ.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        /* hebrew */
        @font-face {
          font-family: 'Amatic SC';
          font-style: normal;
          font-weight: 400;
          src: local('Amatic SC Regular'), local('AmaticSC-Regular'), url(http://fonts.gstatic.com/s/amaticsc/v11/TUZyzwprpvBS1izr_vOECOSfQZQ.woff2) format('woff2');
          unicode-range: U+0590-05FF, U+20AA, U+25CC, U+FB1D-FB4F;
        }
        /* vietnamese */
        @font-face {
          font-family: 'Amatic SC';
          font-style: normal;
          font-weight: 400;
          src: local('Amatic SC Regular'), local('AmaticSC-Regular'), url(http://fonts.gstatic.com/s/amaticsc/v11/TUZyzwprpvBS1izr_vOEBeSfQZQ.woff2) format('woff2');
          unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
        }
        /* latin-ext */
        @font-face {
          font-family: 'Amatic SC';
          font-style: normal;
          font-weight: 400;
          src: local('Amatic SC Regular'), local('AmaticSC-Regular'), url(http://fonts.gstatic.com/s/amaticsc/v11/TUZyzwprpvBS1izr_vOEBOSfQZQ.woff2) format('woff2');
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Amatic SC';
          font-style: normal;
          font-weight: 400;
          src: local('Amatic SC Regular'), local('AmaticSC-Regular'), url(http://fonts.gstatic.com/s/amaticsc/v11/TUZyzwprpvBS1izr_vOECuSf.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* vietnamese */
        @font-face {
          font-family: 'Bangers';
          font-style: normal;
          font-weight: 400;
          src: local('Bangers Regular'), local('Bangers-Regular'), url(http://fonts.gstatic.com/s/bangers/v10/FeVQS0BTqb0h60ACH5FQ2Ixi.woff2) format('woff2');
          unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
        }
        /* latin-ext */
        @font-face {
          font-family: 'Bangers';
          font-style: normal;
          font-weight: 400;
          src: local('Bangers Regular'), local('Bangers-Regular'), url(http://fonts.gstatic.com/s/bangers/v10/FeVQS0BTqb0h60ACH5BQ2Ixi.woff2) format('woff2');
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Bangers';
          font-style: normal;
          font-weight: 400;
          src: local('Bangers Regular'), local('Bangers-Regular'), url(http://fonts.gstatic.com/s/bangers/v10/FeVQS0BTqb0h60ACH55Q2A.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* latin */
        @font-face {
          font-family: 'Cabin Sketch';
          font-style: normal;
          font-weight: 400;
          src: local('Cabin Sketch Regular'), local('CabinSketch-Regular'), url(http://fonts.gstatic.com/s/cabinsketch/v11/QGYpz_kZZAGCONcK2A4bGOj8mNhN.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* latin-ext */
        @font-face {
          font-family: 'Clicker Script';
          font-style: normal;
          font-weight: 400;
          src: local('Clicker Script'), local('ClickerScript-Regular'), url(http://fonts.gstatic.com/s/clickerscript/v5/raxkHiKPvt8CMH6ZWP8PdlEq71rR0TukKQ.woff2) format('woff2');
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Clicker Script';
          font-style: normal;
          font-weight: 400;
          src: local('Clicker Script'), local('ClickerScript-Regular'), url(http://fonts.gstatic.com/s/clickerscript/v5/raxkHiKPvt8CMH6ZWP8PdlEq71rf0Ts.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* cyrillic-ext */
        @font-face {
          font-family: 'Comfortaa';
          font-style: normal;
          font-weight: 400;
          src: local('Comfortaa Regular'), local('Comfortaa-Regular'), url(http://fonts.gstatic.com/s/comfortaa/v12/1Ptsg8LJRfWJmhDAuUs4QIFqPfE.woff2) format('woff2');
          unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }
        /* cyrillic */
        @font-face {
          font-family: 'Comfortaa';
          font-style: normal;
          font-weight: 400;
          src: local('Comfortaa Regular'), local('Comfortaa-Regular'), url(http://fonts.gstatic.com/s/comfortaa/v12/1Ptsg8LJRfWJmhDAuUs4SYFqPfE.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        /* greek */
        @font-face {
          font-family: 'Comfortaa';
          font-style: normal;
          font-weight: 400;
          src: local('Comfortaa Regular'), local('Comfortaa-Regular'), url(http://fonts.gstatic.com/s/comfortaa/v12/1Ptsg8LJRfWJmhDAuUs4ToFqPfE.woff2) format('woff2');
          unicode-range: U+0370-03FF;
        }
        /* vietnamese */
        @font-face {
          font-family: 'Comfortaa';
          font-style: normal;
          font-weight: 400;
          src: local('Comfortaa Regular'), local('Comfortaa-Regular'), url(http://fonts.gstatic.com/s/comfortaa/v12/1Ptsg8LJRfWJmhDAuUs4QoFqPfE.woff2) format('woff2');
          unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
        }
        /* latin-ext */
        @font-face {
          font-family: 'Comfortaa';
          font-style: normal;
          font-weight: 400;
          src: local('Comfortaa Regular'), local('Comfortaa-Regular'), url(http://fonts.gstatic.com/s/comfortaa/v12/1Ptsg8LJRfWJmhDAuUs4Q4FqPfE.woff2) format('woff2');
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Comfortaa';
          font-style: normal;
          font-weight: 400;
          src: local('Comfortaa Regular'), local('Comfortaa-Regular'), url(http://fonts.gstatic.com/s/comfortaa/v12/1Ptsg8LJRfWJmhDAuUs4TYFq.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* latin-ext */
        @font-face {
          font-family: 'Concert One';
          font-style: normal;
          font-weight: 400;
          src: local('Concert One'), local('ConcertOne-Regular'), url(http://fonts.gstatic.com/s/concertone/v8/VEM1Ro9xs5PjtzCu-srDqSTsjP6yuQ.woff2) format('woff2');
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Concert One';
          font-style: normal;
          font-weight: 400;
          src: local('Concert One'), local('ConcertOne-Regular'), url(http://fonts.gstatic.com/s/concertone/v8/VEM1Ro9xs5PjtzCu-srDqSTijP4.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* latin */
        @font-face {
          font-family: 'Cookie';
          font-style: normal;
          font-weight: 400;
          src: local('Cookie-Regular'), url(http://fonts.gstatic.com/s/cookie/v8/syky-y18lb0tSbf9kgqS.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* cyrillic-ext */
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(http://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5VvmojLeTY.woff2) format('woff2');
          unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }
        /* cyrillic */
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(http://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvk4jLeTY.woff2) format('woff2');
          unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        /* greek-ext */
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(http://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvm4jLeTY.woff2) format('woff2');
          unicode-range: U+1F00-1FFF;
        }
        /* greek */
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(http://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5VvlIjLeTY.woff2) format('woff2');
          unicode-range: U+0370-03FF;
        }
        /* vietnamese */
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(http://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5VvmIjLeTY.woff2) format('woff2');
          unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
        }
        /* latin-ext */
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(http://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5VvmYjLeTY.woff2) format('woff2');
          unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
          font-family: 'Fira Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(http://fonts.gstatic.com/s/firasans/v8/va9E4kDNxMZdWfMOD5Vvl4jL.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* latin */
        @font-face {
          font-family: 'Frijole';
          font-style: normal;
          font-weight: 400;
          src: local('Frijole'), url(http://fonts.gstatic.com/s/frijole/v6/uU9PCBUR8oakM2BQ3xTR3w.woff2) format(…
      </style>
    </head>
    <body onload="_p()">
    <div id="loader" style="width: 100%; height: 100vh; background-color: black; margin: 0; overflow: hidden;">
        <div style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; margin: auto auto; width: 65px; height: 65px;">
            <div class="lds-ripple">
                <div></div>
            </div>
        </div>
    </div>

    <!-- REPLACE THIS PART -->
  `,
    exportHtmlTemplatePart2: function(array, original) {
        return `
    <!-- REPLACE THIS PART -->
      <!-- DO NOT REMOVE ME -->
      <script type="text/javascript">
      var defaultW, 
        defaultH = 0
        arr =` + JSON.stringify(array) + `, original = ` + JSON.stringify(original) + `;\n
        var defaultLayerValues = [];

        function fnResize() {
            var ratio = getRatio();
            var hasRatio = false;
            for (var i = 0; i < arr.ratios.length; i++) {
                if (arr.ratios[i].name == ratio) {
                    console.log('applying', arr.ratios[i].name)
                    var layers = arr.ratios[i].layers
                    for (var j = 0; j < layers.length; j++) {
                        // console.log('layers[j]:',layers[j]);
                        let attr = layers[j].attributes;
                        var elem = document.getElementById(layers[j].id)
                        elem.style.top = getPercInH(arr.ratios[i].height, layers[j].y) + 'px';
                        elem.style.left = getPercInW(arr.ratios[i].width, layers[j].x) + 'px';
                        elem.style.width = getPercInW(arr.ratios[i].width, layers[j].width) + 'px';
                        elem.style.height = getPercInH(arr.ratios[i].height, layers[j].height) + 'px';
                        var shape = elem.querySelector('.shape');
                        var im = elem.querySelector('.img-sel');
                        var tex = elem.querySelector('.tl-container');
                        if (shape) {
                            var bg = !layers[j].attributes.isGradient ? layers[j].attributes.color : 'linear-gradient(' + layers[j].attributes.gradientBackgroundData.rotation + 'deg,' + layers[j].attributes.gradientBackgroundData.sliderStyle[0].backgroundColor + ' ' + layers[j].attributes.gradientBackgroundData.value[0] + '%,' + layers[j].attributes.gradientBackgroundData.sliderStyle[1].backgroundColor + ' ' + layers[j].attributes.gradientBackgroundData.value[1] + '%)' + ', url(' + layers[j].attributes.backgroundImageUri.url + ')';
                            shape.style.opacity = attr.opacity;
                            shape.style.filter = "blur(" + attr.filterBlur + "px)";
                            if (attr.shape === 'Rectangle' || attr.shape === 'Circle') {
                                shape.style.background = bg
                                // shape.style.backgroundBlendMode = 'multiply';
                                shape.style.boxShadow = getPercInW(arr.ratios[i].width, attr.shadowSize) > 0 ? attr.shadowColor ? '1px 12px ' + getPercInW(arr.ratios[i].width, attr.shadowSize) + 'px ' + attr.shadowColor : '' : '';
                                shape.style.border = getPercInW(arr.ratios[i].width, attr.borderWidth) + 'px ' + attr.borderColor + ' ' + attr.borderStyle;
                                // shape.style.backgroundSize = 'cover
                            } else if (attr.shape === 'Triangle') {
                                shape.style.borderLeft = (getPercInW(arr.ratios[i].width, layers[j].width) / 2) - getPercInW(arr.ratios[i].width, 0.5) + 'px solid transparent';
                                shape.style.borderRight = (getPercInW(arr.ratios[i].width, layers[j].width) / 2) + 'px solid transparent';
                                shape.style.borderBottom = getPercInH(arr.ratios[i].height, layers[j].height) - getPercInH(layers[j].height, 5) + 'px solid ' + bg;
                            } else if (attr.shape === 'Trapezoid') {
                                // console.log('Trapezoid')
                                shape.style.borderBottom = getPercInH(arr.ratios[i].height, layers[j].height) - getPercInH(arr.ratios[i].height, 1) + 'px solid' + bg;
                                shape.style.borderLeft = getPercInW(arr.ratios[i].width, layers[j].width) / getPercInW(arr.ratios[i].width, 3) + 'px solid transparent';
                                shape.style.borderRight = getPercInW(arr.ratios[i].width, layers[j].width) / getPercInW(arr.ratios[i].width, 3) + 'px solid transparent';
                            } else if (attr.shape === 'Parallelogram') {
                                shape.style.width = getPercInW(arr.ratios[i].width, layers[j].width) - getPercInW(arr.ratios[i].width, 40) + 'px';
                                shape.style.height = getPercInH(arr.ratios[i].height, layers[j].height) - getPercInH(arr.ratios[i].height, 1) + 'px';
                                shape.style.background = bg;
                                shape.style.border = getPercInW(arr.ratios[i].width, attr.borderWidth) + 'px ' + attr.borderColor + ' ' + attr.borderStyle;
                            } else if (attr.shape === 'Diamond') {
                                shape.style.width = Math.max(layers[j].height, layers[j].width) + 'px';
                                shape.style.height = Math.max(layers[j].height, layers[j].width) + 'px';
                                shape.backgroundColor = bg;
                                shape.style.marginTop = Math.max(this.data.height, this.data.width) / 2 + 'px'
                                shape.style.marginBottom = Math.max(this.data.height, this.data.width) / 2 + 'px'
                            }
                        }
                        if (layers[j].type == 'image') {
                            // console.log('image', im);
                            var shadows = attr.shadowSize > 0 ? '1px 12px ' + attr.shadowSize + 'px ' + attr.shadowColor : ''
                            im.style.borderColor = attr.borderColor;
                            im.style.borderWidth = getPercInW(arr.ratios[i].width, attr.borderWidth) + 'px';
                            im.style.borderStyle = attr.borderStyle;
                            im.style.objectFit = attr.objectFit.toLowerCase();
                            im.style.opacity = layers[j].loaded ? attr.opacity : 0.5
                            im.style.rotation = attr.rotation;
                            im.style.shadowColor = attr.shadowColor;
                            im.style.sizeOption = attr.sizeOption;
                            im.style.boxShadow = attr.shadowColor ? shadows : '';
                            im.style.filter = "blur(" + attr.filterBlur + "px)";
                        }
                        if (layers[j].type == 'text') {
                            tex.style.opacity = attr.opacity;
                            tex.style.fontFamily = attr.fontFamily;
                            tex.style.fontSize = getPercInW(arr.ratios[i].width, parseInt(attr.fontSize)) + 'px';
                            tex.style.fontWeight = attr.fontWeight;
                            tex.style.fontStyle = attr.fontStyle;
                            tex.style.textDecoration = attr.textDecoration;
                            tex.style.textAlign = attr.textAlign;
                            tex.style.lineHeight = attr.lineHeight;
                            tex.style.color = attr.color;
                            tex.style.filter = "blur(" + attr.filterBlur + "px)";
                            tex.style.backgroundColor = attr.backgroundColor;
                            tex.style.border = getPercInW(arr.ratios[i].width, attr.borderSize) + 'px ' + attr.borderStyle + ' ' + attr.borderColor;
                            tex.style.textShadow = '' + getPercInW(arr.ratios[i].width, attr.shadowSize) + 'px' + ' ' + getPercInW(arr.ratios[i].width, attr.shadowSize) + 'px ' + getPercInW(arr.ratios[i].width, attr.shadowSize) + 'px ' + attr.shadowColor + ',' + getPercInW(arr.ratios[i].width, attr.shadowSize) + 'px ' + getPercInW(arr.ratios[i].width, attr.shadowSize) + 'px ' + getPercInW(arr.ratios[i].width, attr.shadowSize) + 'px ' + attr.shadowColor;
                        }
                        if (layers[j].isBackground) {
                            elem.style.height = window.innerHeight + 'px';
                            elem.style.width = window.innerWidth + 'px';
                            // console.log('elem:', elem)
                        }
                    }
                    hasRatio = true;
                }
            }
            if (!hasRatio || ratio === '1-1') {
                // apply original ratio here
                var layers = original;
                for (var i = 0; i < layers.length; i++) {
                    let attr = layers[i].attributes;
                    var elem = document.getElementById(layers[i].id)
                    elem.style.top =  getPercInH(arr.height, layers[i].y) + 'px';
                    elem.style.left = getPercInW(arr.width, layers[i].x) + 'px';
                    elem.style.width = getPercInW(arr.width,layers[i].width) + 'px';
                    elem.style.height = getPercInW(arr.height, layers[i].height) + 'px';
                    var shape = elem.querySelector('.shape');
                    var im = elem.querySelector('.img-sel');
                    var tex = elem.querySelector('.tl-container');
                    if (shape) {
                        var bg = !layers[i].attributes.isGradient ? layers[i].attributes.color : 'linear-gradient(' + layers[i].attributes.gradientBackgroundData.rotation + 'deg,' + layers[i].attributes.gradientBackgroundData.sliderStyle[0].backgroundColor + ' ' + layers[i].attributes.gradientBackgroundData.value[0] + '%,' + layers[i].attributes.gradientBackgroundData.sliderStyle[1].backgroundColor + ' ' + layers[i].attributes.gradientBackgroundData.value[1] + '%)' + ', url(' + layers[i].attributes.backgroundImageUri.url + ')';
                        shape.style.opacity = attr.opacity;
                        shape.style.filter = "blur(" + attr.filterBlur + "px)";
                        if (attr.shape === 'Rectangle' || attr.shape === 'Circle') {
                            shape.style.background = bg
                            // shape.style.backgroundBlendMode = 'multiply';
                            shape.style.boxShadow = getPercInW(arr.width, attr.shadowSize) > 0 ? attr.shadowColor ? '1px 12px ' + getPercInW(arr.width, attr.shadowSize) + 'px ' + attr.shadowColor : '' : '';
                            shape.style.border = getPercInW(arr.width, attr.borderWidth) + 'px ' + attr.borderColor + ' ' + attr.borderStyle;
                            // shape.style.backgroundSize = 'cover
                        } else if (attr.shape === 'Triangle') {
                            shape.style.borderLeft = (getPercInW(arr.width, layers[i].width) / 2) - getPercInW(arr.width, 0.5) + 'px solid transparent';
                            shape.style.borderRight = (getPercInW(arr.width, layers[i].width) / 2) + 'px solid transparent';
                            shape.style.borderBottom = getPercInH(arr.height, layers[i].height) - getPercInH(layers[i].height, 5) + 'px solid ' + bg;
                        } else if (attr.shape === 'Trapezoid') {
                            // console.log('Trapezoid')
                            shape.style.borderBottom = getPercInH(arr.height, layers[i].height) - getPercInH(arr.height, 1) + 'px solid' + bg;
                            shape.style.borderLeft = getPercInW(arr.width, layers[i].width) / getPercInW(arr.width, 3) + 'px solid transparent';
                            shape.style.borderRight = getPercInW(arr.width, layers[i].width) / getPercInW(arr.width, 3) + 'px solid transparent';
                        } else if (attr.shape === 'Parallelogram') {
                            shape.style.width = getPercInW(arr.width, layers[i].width) - getPercInW(arr.width, 40) + 'px';
                            shape.style.height = getPercInH(arr.height, layers[i].height) - getPercInH(arr.height, 1) + 'px';
                            shape.style.background = bg;
                            shape.style.border = getPercInW(arr.width, attr.borderWidth) + 'px ' + attr.borderColor + ' ' + attr.borderStyle;
                        } else if (attr.shape === 'Diamond') {
                            shape.style.width = Math.max(layers[i].height, layers[i].width) + 'px';
                            shape.style.height = Math.max(layers[i].height, layers[i].width) + 'px';
                            shape.backgroundColor = bg;
                            shape.style.marginTop = Math.max(this.data.height, this.data.width) / 2 + 'px'
                            shape.style.marginBottom = Math.max(this.data.height, this.data.width) / 2 + 'px'
                        }
                    }
                    if (layers[i].type == 'image') {
                        // console.log('image', im);
                        var shadows = attr.shadowSize > 0 ? '1px 12px ' + attr.shadowSize + 'px ' + attr.shadowColor : ''
                        im.style.borderColor = attr.borderColor;
                        im.style.borderWidth = getPercInW(arr.width, attr.borderWidth) + 'px';
                        im.style.borderStyle = attr.borderStyle;
                        im.style.objectFit = attr.objectFit.toLowerCase();
                        im.style.opacity = layers[i].loaded ? attr.opacity : 0.5
                        im.style.rotation = attr.rotation;
                        im.style.shadowColor = attr.shadowColor;
                        im.style.sizeOption = attr.sizeOption;
                        im.style.boxShadow = attr.shadowColor ? shadows : '';
                        im.style.filter = "blur(" + attr.filterBlur + "px)";
                    }
                    if (layers[i].type == 'text') {
                        tex.style.opacity = attr.opacity;
                        tex.style.fontFamily = attr.fontFamily;
                        tex.style.fontSize = getPercInW(arr.width, parseInt(attr.fontSize)) + 'px';
                        tex.style.fontWeight = attr.fontWeight;
                        tex.style.fontStyle = attr.fontStyle;
                        tex.style.textDecoration = attr.textDecoration;
                        tex.style.textAlign = attr.textAlign;
                        tex.style.lineHeight = attr.lineHeight;
                        tex.style.color = attr.color;
                        tex.style.filter = "blur(" + attr.filterBlur + "px)";
                        tex.style.backgroundColor = attr.backgroundColor;
                        tex.style.border = getPercInW(arr.width, attr.borderSize) + 'px ' + attr.borderStyle + ' ' + attr.borderColor;
                        tex.style.textShadow = '' + getPercInW(arr.width, attr.shadowSize) + 'px' + ' ' + getPercInW(arr.ratios[i].width, attr.shadowSize) + 'px ' + getPercInW(arr.ratios[i].width, attr.shadowSize) + 'px ' + attr.shadowColor + ',' + getPercInW(arr.ratios[i].width, attr.shadowSize) + 'px ' + getPercInW(arr.ratios[i].width, attr.shadowSize) + 'px ' + getPercInW(arr.ratios[i].width, attr.shadowSize) + 'px ' + attr.shadowColor;
                    }
                    if (layers[i].isBackground) {
                        elem.style.height = window.innerHeight + 'px';
                        elem.style.width = window.innerWidth + 'px';
                        // console.log('elem:', elem)
                    }
                }
            }
        }

        function getPercInW(bV, eV) {
            // console.log('getPercInW', bV, eV)
            var perc = (eV / parseInt(bV));
            // console.log('perc', perc);
            var cW = window.innerWidth;
            // console.log('cW', cW);
            // console.log(cW * perc);
            return Math.round(cW * perc);
        }

        function getPercInH(bV, eV) {
            var perc = (eV / parseInt(bV));
            var cH = window.innerHeight;
            return Math.round(cH * perc);
        }

        function getRatio() {
            var gcd = function(a, b) {
                if (b === 0) return a;

                return gcd(b, a % b);
            }
            var closestRatio = function(w, h) {
                var _gcd = gcd(w, h)
                var x = parseFloat(w / _gcd)
                var y = parseFloat(h / _gcd)
                var d = parseFloat(x / y)
                return {
                    x: x,
                    y: y,
                    d: Math.round(d)
                }
            }

            var w = Math.round(window.innerWidth),
                h = Math.round(window.innerHeight);
            var closest = closestRatio(w, h);
            console.log('closest', closest)
            var ratio = closest.x + '-' + closest.y;
            console.log('ratio', ratio)
            if (!ratioExisted(ratio)) {
                console.log('ratio not found')
                ratio = getRatioFromAspectPerc(closest);
                console.log('new ratio', ratio)
                if (!ratioExisted(ratio)) {
                    console.log('still not found------------------------')
                    var max = Math.max(w, h), min = Math.min(w,h);
                    var diff = max - min;
                    console.log('diff', diff)
                    if (diff >= 100) {
                       console.log('what')
                      if (w > h) {
                         var nw = w + diff;
                         console.log('nw',nw)
                         ratio = Math.ceil(nw / h) + '-' + ratio.split('-')[1];
                      } else if (h > w) {
                         var nh = h + diff;
                         ratio = ratio.split('-')[0] + '-' + Math.ceil(nh / w);
                      }
                    } else {
                          console.log('where')
                      var mod = w % 10 + h % 10;
                      if (w > h) {
                          ratio = Math.round((w + mod) / h) + '-' + ratio.split('-')[1];
                      } else if (h > w) {
                          ratio = ratio.split('-')[0] + '-' + Math.round((h + mod) / w);
                      }
                    }
                    
                    console.log('new ratio', ratio)
                }
            }

            if (!hasData(ratio)) {
                console.log('ratio has no data')
                // finding closest ratio/relative ratio
                ratio = getClosestRatio(ratio, w, h);
                console.log('getting closest ratio', ratio)
            }
            return ratio;
        }

        function hasData(ratio) {
            for (var i = 0; i < arr.ratios.length; i++) {
                if (arr.ratios[i].name === ratio) {
                    return true;
                }
            }
            return false;
        }

        function getClosestRatio(ratio, w, h) {
          var ratios = w > h ? getLandscapeRatios() : getPortaintRatios();
          var n = getRatioBeforeCurrent(ratios, ratio, w, h);
          console.log('getRatioBeforeCurrent result', n)
          ratio = w > h ? n + '-' + ratio.split('-')[1] : ratio.split('-')[0] + '-' + n;

          return ratio;
        }

        function getRatioBeforeCurrent(ratios, ratio, w, h) {
          console.log('getRatioBeforeCurrent', ratio)
          var x = 0;
          var sm = 0;
          var n = w > h ? parseInt(ratio.split('-')[0]) :  parseInt(ratio.split('-')[1]);
          for (var i = 0; i < ratios.length; i++) {
            x =  w > h ? ratios[i].rw : ratios[i].rh;
            console.log(ratios[i].name, n, x)

            if (x < n) {
              sm = x;
            }
          }
          console.log('found', sm)

          return sm;
        }

        function getPortaintRatios() {
            var ratios = [];
            for (var i = 0; i < arr.ratios.length; i++) {
                var name = arr.ratios[i].name;
                var n1 = parseInt(name[0]),
                    n2 = parseInt(name[2]);
                if (n2 > n1) {
                    ratios.push({
                        name: name,
                        rw: n1,
                        rh: n2
                    });
                }
            }

            return ratios;
        }

        function getLandscapeRatios() {
            var ratios = [];
            for (var i = 0; i < arr.ratios.length; i++) {
                var name = arr.ratios[i].name;
                var n1 = parseInt(name[0]),
                    n2 = parseInt(name[2]);
                if (n1 > n2) {
                    ratios.push({
                        name: name,
                        rw: n1,
                        rh: n2
                    });
                }
            }

            return ratios;
        }

        function ratioExisted(ratio) {
            var ratios = [
                '2-1', '4-1', '6-1', '8-1', '10-1',
                '1-2', '1-4', '1-6', '1-8', '1-10',
                '2-3', '3-4', '3-5', '9-16', '10-16',
                '9-18.5', '3-2', '4-3', '5-3', '16-9', '16-10'
            ];
            return ratios.includes(ratio);
        }

        function getRatioFromAspectPerc(val) {
            if (val.x === val.y) {
                return val.x + '-' + val.d;
            } else if (val.x > val.y) {
                var x = parseInt(val.x / val.y);
                if (x > 1 && x % 2 !== 0) {
                    x += 1;
                }
                return x + '-1'
            } else {
                var y = parseInt(val.y / val.x);
                if (y > 1 && y % 2 !== 0) {
                    y += 1;
                }
                return '1-' + y;
            }
        }

        function toWPercent(val) {
            return val / window.innerWidth * 100;
        }

        function toHPercent(val) {
            return val / window.innerHeight * 100;
        }

        function getLayerType(elem) {
            if (elem.className !== 'rr-content') {
                throw new Error('rr content expeected');
            }
            return elem.children[0].id;
        }

        function getFontSize(elemContent) {
            if (elemContent.children[0].id !== 'text') return 0;
            return parseInt(elemContent.children[0].style.fontSize.replace('px', ''));
        }

        function _clean(elem) {
            var count = 1;
            console.log("elem.getElementsByTagName('comment')", elem.getElementsByTagName('comment'))
            // while (count > 0) {
            //   count = elem.getElementsByTagName('comment');
            // }
        }

        function _p() {
            setTimeout(function() {
                document.getElementsByTagName('body')[0].style.overflow = 'hidden';
                document.getElementById('parent1').style.display = "block";
                document.getElementById('parent1').style.border = 'none';
                document.getElementById('loader').parentElement.removeChild(document.getElementById('loader'));
                // var gsap = new TimelineMax();
                // var elem1 = document.getElementsByClassName('rr-resizer');
                // gsap.from(elem1[0],1,{left:100,opacity:0,repeat: -1, yoyo: true});
                var editable_elements = document.querySelectorAll("[contenteditable=true]");
                var editor = document.getElementById('parent1')
                editor.style.width = '100%';
                editor.style.height = '100%';
                for (var i = 0; i < editable_elements.length; i++) {
                editable_elements[i].setAttribute("contenteditable", false);
                }
            }, 1000);
        }
        window.onload = function() {
            _p();
            fnResize();
        }
        window.addEventListener('resize', function() {
            fnResize();
        });
      </script>
      <!-- DO NOT REMOVE ME -->
    </body>
    </html>
  `
    },
    loaderTemplate: `
  `,
    /**
     * Exports the current editor content into a packed html file (.html)
     */
    exportTemplate(array, layerData) {
        // var editorElem = document.getElementsByClassName('editor-box')[0]; // clone the div element
        // var htmlContent = editorElem.outerHTML;
        // this.$_download('export-' + appHelper.generateTimestamp() + '.html', this.exportHtmlTemplatePart1 + htmlContent + this.exportHtmlTemplatePart2);

        // making responsive, cleaning html
        // var editorElem = document.getElementsByClassName('editor-box')[0].cloneNode(true); // clone the div element
        // editorElem = this.$_responsiveness(editorElem);

        return new Promise((res, rej) => {
            var animatedElements = this.createAnimation(layerData);
            var htmlContent = this.getExportingElement(array, animatedElements).outerHTML;
            var fonts = this.getUsedFonts(array, layerData); // filter font
            var cssText = this.getAnimationCss(animatedElements);
            // console.log(cssText)
            // // apped amination css  
            var content = this.exportHtmlTemplatePart1.replace('--CUSTOM_STYLES--', cssText);
            content = content.replace('--FONTS_HERE--', fonts);
            this.$_download('export-' + appHelper.generateTimestamp() + '.html', content + htmlContent + this.exportHtmlTemplatePart2(array, layerData));
            setTimeout(() => {
                res(true);
            }, 100);
        });
    },
    getExportingElement(array, animatedData) {
        // array.layers.forEach(e => {
        //     var layerelem = document.getElementById(e.id)
        //     if (layerelem) {
        //         layerelem.style.transition = 'all 400ms ease'
        //     }
        // })

        var editorElem = document.getElementsByClassName('editor-box')[0].cloneNode(true); // clone the div element
        editorElem.style.display = 'none';
        editorElem = this.$_responsiveness(editorElem, animatedData);
        return editorElem;
    },
    getHtmlString() {
        var htmlContent = this.getExportingElement().outerHTML;
        return this.exportHtmlTemplatePart1 + htmlContent + this.exportHtmlTemplatePart2;
    },
    /**
     * Generates a responsive version of the exported HTML
     * @param {The source element} elem 
     */
    $_responsiveness(elem, animatedData) {
        var canvasContainer = elem.children[0].children[0];
        canvasContainer = this.$_cleanHTML(canvasContainer, animatedData);

        return elem;
    },
    /**
     * Downloads the generated html file
     * @param {The exported htm file names} filename 
     * @param {The html element present on the editor's content} htmlContent 
     */
    $_download(filename, htmlContent) {
        // console.log('filename:', filename)
        // console.log('htmlContent:', htmlContent)
        // var zip = new JSZip();
        // var folder = zip.folder(filename);
        // var data = JSON.parse(this.$localStorage.get('canvas'));
        // folder.file(filename + '.html', htmlContent);
        // folder.file('data.json', data);
        // zip.generateAsync('string').then(function(content) {
        //     // see FileSaver.js
        //     saveAs(content, 'example.zip');
        // });
        var element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(htmlContent))
        element.setAttribute('download', filename)

        element.style.display = 'none'
        document.body.appendChild(element)

        element.click()

        document.body.removeChild(element);
    },
    /**
     * Removes unnecessary html elements
     * @param {The source parent element} elem 
     */
    $_cleanHTML(elem, animatedData) {
        var _rclass = ['rr-bar', 'rr-rotate-handle', 'rr-handle', 'h-l-g', 'layer-action-info', 'vue-progress-path'];
        var layerElems = elem.querySelectorAll('.rr-resizer');
        for (var i = 0; i < layerElems.length; i++) {
            layerElems[i].style.transition = 'all 400ms ease'
                // removing by class names
            for (var j = 0; j < _rclass.length; j++) {
                // do not stop until all elements having the same classnames as specified above 
                // are removed from the exported HTML file
                var ld = [''];
                while (ld.length > 0) {
                    for (var k = 0; k < ld.length; k++) {
                        if (ld[k].parentElement) {
                            ld[k].parentElement.removeChild(ld[k]);
                        }
                    }
                    ld = layerElems[i].querySelectorAll('.' + _rclass[j]);
                }
            }

            if (animatedData) {
                for (var key in animatedData) {
                    if (key === layerElems[i].id) {
                        // console.log('----------------------------------------', key)
                        // for (var f = 0; f < animatedData[key].animations.length; f++) {
                        //     console.log(key, animatedData[key].animations[f])
                        // }
                        // console.log(key, animatedData[key])
                        // layerElems[i].classList.add(animatedData[key].class);
                        // console.log(layerElems[i].classList)
                        layerElems[i].classList.add('animate-' + key);
                        // console.log(layerElems[i].classList)
                    }
                }
            }
        }
        return elem;
    },
    getAnimationCss(srcObj) {
        // console.log(srcObj)
        var cssText = '';
        for (var key in srcObj) {
            var keyframes = '';
            var classes = '.animate-' + key + ' { \n';
            var loop = srcObj[key].loop === 'Once' ? '1' : srcObj[key].loop;
            // console.log(loop);
            classes += 'animation: ';
            for (var i = 0; i < srcObj[key].animations.length; i++) {
                // console.log(srcObj[key])
                keyframes += srcObj[key].animations[i].css + '\n';
                classes += srcObj[key].animations[i].kfn;
                classes += ' ' + srcObj[key].ts + ' ' + loop;
                if (srcObj[key].animations[i + 1]) {
                    classes += ',';
                }
            }
            classes += '} \n';
            // console.log(classes)
            // console.log(key, srcObj[key].animations)

            cssText += keyframes + classes;
        }

        return cssText;
    },
    createAnimation(layerDataArr) {
        var animations = {};
        for (var i = 0; i < layerDataArr.length; i++) {
            animations[layerDataArr[i].id] = animation.applyAnimation(layerDataArr[i], false);
        }

        return animations;
    },

    getUsedFonts(ratioArr, originalArr) {
        var fonts = [];
        // loop original array
        if (originalArr) {
            for (var i = 0; i < originalArr.length; i++) {
                if (originalArr[i].type === 'text') {
                    var f = fontHelper.getFont(originalArr[i].attributes.fontFamily);
                    fonts.push(f.css);
                }
            }
        }
        if (ratioArr) {
            for (var i = 0; i < ratioArr.ratios.length; i++) {
                for (var j = 0; j < ratioArr.ratios[i].layers.length; j++) {
                    if (ratioArr.ratios[i].layers[j].type === 'text') {
                        console.log(ratioArr.ratios[i].layers[j])
                        var f = fontHelper.getFont(ratioArr.ratios[i].layers[j].attributes.fontFamily);
                        if (!fonts.includes(f.css)) {
                            fonts.push(f.css);
                        }
                    }
                }
            }
        }

        return fonts.join(' ');
    },
}