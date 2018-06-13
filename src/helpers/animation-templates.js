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
          }
          `;
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
        toRotate(id, flows, total, rstart, rend) {
            console.log(id, flows, total, rstart, rend)

            var strCSS = '@keyframes rotate-' + id + `{
        0% {
          transform: rotate(0deg) scale(1);
        }
      `;
            var nums = 0;
            for (var i = 0; i < flows.length; i++) {
                nums += flows[i];
                var perc = Math.round((nums / total) * 100);
                var rotation = '0deg';
                if (i <= 1) rotation = rstart + 'deg';
                if (i > 1) rotation = rend + 'deg';

                strCSS += `
            ` + perc + `% {
              transform: rotate(` + rotation + `);
            }
          `;
            }

            strCSS += '}';

            return { cn: 'layerRotate-' + id, css: strCSS, kfn: 'rotate-' + id };
        },
    }
}