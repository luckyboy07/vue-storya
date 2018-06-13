/**
 * replace <name> with keyframe name
 */
export default {
    fade: {
        toFadeIn(id, flows, total) {
            // console.log(id, flows, total)
            var strCSS = '@keyframes fadeIn-' + id + `{
              0% {
                opacity: 0;
              }  
            `;
            var nums = 0;
            for (var i = 0; i < flows.length; i++) {
                nums += flows[i];
                var perc = Math.round((nums / total) * 100);
                var opacity = i === 1 || i === 2 ? 1 : 0;
                strCSS += `
                  ` + perc + `% {
                    opacity: ` + opacity + `;
                  }
                `;
            }

            strCSS += '}';

            return { cn: 'layerFade-' + id, css: strCSS, kfn: 'fadeIn-' + id };
        },
        toFadeOut(id, flows, total) {
            // console.log(id, flows, total)
            var strCSS = '@keyframes fadeOut-' + id + `{
        0% {
          opacity: 0;
        }  
      `;
            var nums = 0;
            for (var i = 0; i < flows.length; i++) {
                nums += flows[i];
                var perc = Math.round((nums / total) * 100);
                var opacity = i === 1 || i === 2 ? 0 : 1;
                strCSS += `
            ` + perc + `% {
              opacity: ` + opacity + `;
            }
          `;
            }

            strCSS += '}';

            return { cn: 'layerFade-' + id, css: strCSS, kfn: 'fadeOut-' + id };
        }
    },
    move: {
        getLeftToRight(id, flows, total, sp, ep) {
            var strCSS = '@keyframes slideLeftRight-' + id + `{
            0% {
              left: ` + sp + `px;
            }`;
            var nums = 0;
            for (var i = 0; i < flows.length; i++) {
                nums += flows[i];
                var perc = Math.round((nums / total) * 100);
                var left = sp;
                if (i <= 1) left = sp;
                if (i > 1) left = ep;

                strCSS += `
            ` + perc + `% {
              left: ` + left + `px;
              }
            `;
            }

            strCSS += '}';

            return { cn: 'layerMoveLeftToRight-' + id, css: strCSS, kfn: 'slideLeftRight-' + id };
        },
        getTopToBottom(id, flows, total, sp, ep) {
            var strCSS = '@keyframes slideTopBottom-' + id + `{
            0% {
              top: ` + sp + `px;
          }
          `;
            var nums = 0;
            for (var i = 0; i < flows.length; i++) {
                nums += flows[i];
                var perc = Math.round((nums / total) * 100);
                var top = sp;
                if (i <= 1) top = sp;
                if (i > 1) top = ep;

                strCSS += `
            ` + perc + `% {
              top: ` + top + `px;
              }
            `;
            }

            strCSS += '}';

            return { cn: 'layerMoveTopToBottom-' + id, css: strCSS, kfn: 'slideTopBottom-' + id };
        }
    },
    rotate: {
        toRotate(id, flows, total, rstart, rend, ss, se) {
            // console.log(id, flows, total, rstart, rend, ss, se)

            var strCSS = '@keyframes rotate-' + id + `{
                0% {
                    transform: rotate(0deg) scale(` + (parseFloat(ss) / 100) + `);
                }
            `;
            var nums = 0;
            for (var i = 0; i < flows.length; i++) {
                nums += flows[i];
                var perc = Math.round((nums / total) * 100);
                var rotation = '0deg';
                var scale = ss;

                if (i <= 1) {
                    rotation = rstart + 'deg';
                    scale = ss;
                }

                if (i > 1) {
                    rotation = rend + 'deg';
                    scale = se;
                }

                strCSS += `
            ` + perc + `% {
              transform: rotate(` + rotation + `) scale(` + (parseFloat(scale) / 100) + `);
            }
          `;
            }

            strCSS += '}';

            return { cn: 'layerRotate-' + id, css: strCSS, kfn: 'rotate-' + id };
        },
    },
    scale: {
        getScale(id, flows, total, ss, es) {
            var strCSS = '@keyframes layerScaling-' + id + `{
                0% {
                    transform: scale(` + (parseInt(ss) / 100) + `);
                }`;
            var nums = 0;
            for (var i = 0; i < flows.length; i++) {
                nums += flows[i];
                var perc = Math.round((nums / total) * 100);
                var scale = ss;
                if (i <= 1) scale = ss;
                if (i > 1) scale = es;

                strCSS += `` + perc + `% {
                        transform: scale(` + (parseInt(scale) / 100) + `);
                    }`;
            }

            strCSS += '}';

            return { cn: 'layerscale-' + id, css: strCSS, kfn: 'layerScaling-' + id };
        },
    }
}