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
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.0/TweenMax.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
      <style type="text/css">
      @media (aspect-ratio: 2/1) {
        body {
          background-color: red;
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
        --FONTS_HERE--
        --RESPONSIVE_CSS_HERE--
      </style>
    </head>
    <body onload="_p()">
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
        console.log('ASDASD')
        var bw = window.innerWidth;
        var bh = window.innerHeight;
        var origwidth = 300;
        var origheight = 300;
        // console.log('bw:', bw)
        // console.log('bh:', bh)
        // console.log('bw:', bw)
        // console.log('bh:', bh)
        var maxNum = Math.max(bw, bh);
        var minNum = Math.min(bw, bh);
        var minR = minNum / maxNum;
        // console.log('maxNum:', maxNum);
        // console.log('minNum:', minNum);
        var ratio = '';
        if (minR <= 1 && minR > 0.8) {
            console.log('1:1');
            ratio = '1-1';
        }
        // 4:3 and 3:4 ratio
        else if (minR <= 0.8 && minR > 0.75) {
            if (bw > bh) {
                ratio = '4-3';
            } else {
                ratio = '3-4';
            }
        }
        // 3:2 and 2:3 ratio
        else if (minR <= 0.75 && minR > 0.6667) {
            if (bw > bh) {
                ratio = '2-3';
            } else {
                ratio = '3-2';
            }
        }
        // 5:3 and 3:5 ratio
        else if (minR <= 0.6667 && minR > 0.6) {
            if (bw > bh) {
                ratio = '5-3';
            } else {
                ratio = '3-5';
            }
        }
        // 16:9 and 9:16 ratio
        else if (minR <= 0.6 && minR > 0.5625) {
            if (bw > bh) {
                ratio = '16-9';
            } else {
                ratio = '9-16';
            }
        }
        // 16:10 and 10:16 ratio
        else if (minR <= 0.5625 && minR > 0.4864) {
            if (bw > bh) {
                ratio = '16-10';
            } else {
                ratio = '10-16';
            }
        }
        // 1:2 and 2:1 ratio
        else if (minR <= 0.4864 && minR > 0.3333) {
            if (bw > bh) {
                ratio = '2-1';
            } else {
                ratio = '1-2';
            }
        }
        // 1:4 and 4:1 ratio
        else if (minR <= 0.3333 && minR > 0.2) {
            if (bw > bh) {
                ratio = '4-1';
            } else {
                ratio = '1-4';
            }
        }
        // 1:6 and 6:1 ratio
        else if (minR <= 0.2 && minR > 0.1428) {
            if (bw > bh) {
                ratio = '6-1';
            } else {
                ratio = '1-6';
            }
        }
        // 1:8 and 8:1 ratio
        else if (minR <= 0.1428 && minR > 0.1111) {
            if (bw > bh) {
                ratio = '8-1';
            } else {
                ratio = '1-8';
            }
        }
        // 1:10 and 10:1 ratio
        else if (minR <= 0.1111 && minR > 0) {
            if (bw > bh) {
                ratio = '10-1';
            } else {
                ratio = '1-10';
            }
        }
        console.log('ratio', ratio)
        var hasRatio = false;
        for (var i = 0; i < arr.ratios.length; i++) {
          if (arr.ratios[i].name == ratio) {
            console.log('applying', arr.ratios[i].name)
              var layers = arr.ratios[i].layers
             
              for (var j = 0; j < layers.length; j++) {
                console.log('layers[j]:',layers[j]);
                  var elem = document.getElementById(layers[j].id)
                  elem.style.top = layers[j].y + 'px';
                  elem.style.left = layers[j].x + 'px';
                  elem.style.width = layers[j].width + 'px';
                  elem.style.height = layers[j].height + 'px';
                  var shape = elem.querySelector('.shape');
                  if (shape) {
                    shape.style.background = !layers[j].attributes.isGradient ? layers[j].attributes.color : 'linear-gradient('+layers[j].attributes.gradientBackgroundData.rotation+'deg,'+layers[j].attributes.gradientBackgroundData.sliderStyle[0].backgroundColor+' '+layers[j].attributes.gradientBackgroundData.value[0]+'%,'+layers[j].attributes.gradientBackgroundData.sliderStyle[1].backgroundColor+' '+layers[j].attributes.gradientBackgroundData.value[1]+'%)' +', url('+layers[j].attributes.backgroundImageUri.url+')'
                  }
                  // if(layers[j].type == 'text') {
                    
                  // }
                  if (layers[j].isBackground) {
                      elem.style.height = bh + 'px';
                      elem.style.width = bw + 'px';
                      console.log('elem:', elem)
                  }
              }
              hasRatio = true;
          }
        }

        if (!hasRatio) {
          // apply original ratio here
          var layers = original;
          console.log('default layer', layers)
          for (var j = 0; j < layers.length; j++) {
            console.log('layers[j]:',layers[j]);
            var elem = document.getElementById(layers[j].id)
            elem.style.top = layers[j].y + 'px';
            elem.style.left = layers[j].x + 'px';
            elem.style.width = layers[j].width + 'px';
            elem.style.height = layers[j].height + 'px';
            var shape = elem.querySelector('.shape');
            if (shape) {
                console.log(layers[j].attributes.isGradient, shape)
                shape.style.background = !layers[j].attributes.isGradient ? layers[j].attributes.color : 'linear-gradient('+layers[j].attributes.gradientBackgroundData.rotation+'deg,'+layers[j].attributes.gradientBackgroundData.sliderStyle[0].backgroundColor+' '+layers[j].attributes.gradientBackgroundData.value[0]+'%,'+layers[j].attributes.gradientBackgroundData.sliderStyle[1].backgroundColor+' '+layers[j].attributes.gradientBackgroundData.value[1]+'%)' +', url('+layers[j].attributes.backgroundImageUri.url+')'
            }
            if (layers[j].isBackground) {
                elem.style.height = bh + 'px';
                elem.style.width = bw + 'px';
                console.log('elem:', elem)
            }
          }
        }
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
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
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
        // removing editor's data
        // var tohide = document.getElementsByClassName('handle-tt');
        // for (var i = 0; i < tohide.length; i++) {
        //   tohide[i].style.display="none"
        //   }
        }
        window.onload = function() {
          _p();
        fnResize();
        }
        timeout = false, // holder for timeout id
        delay = 250;
        window.addEventListener('resize', function() {
          clearTimeout(timeout);
          timeout = setTimeout(fnResize, delay);
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
            var responsiveCss = responsiveHelper.generateCssToAllLayers(array.ratios, layerData);
            var cssText = this.getAnimationCss(animatedElements);
            // console.log(cssText)
            // // apped amination css  
            var content = this.exportHtmlTemplatePart1.replace('--CUSTOM_STYLES--', cssText);
            content = content.replace('--FONTS_HERE--', fonts);
            content = content.replace('--RESPONSIVE_CSS_HERE--', responsiveCss);
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
        var _rclass = ['rr-bar', 'rr-rotate-handle', 'rr-handle', 'h-l-g', 'layer-action-info'];
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

        console.log('used fonts', fonts)
        return fonts;
    },
}