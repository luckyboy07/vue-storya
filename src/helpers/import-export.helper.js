import appHelper from './app.helper'
export default {
    exportHtmlTemplatePart1: `
  <!DOCTYPE html>
  <html>
    <head>
      <title></title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.0/TweenMax.min.js"></script>
      <style type="text/css">
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
      /* latin */
      @font-face {
        font-family: 'Gloria Hallelujah';
        font-style: normal;
        font-weight: 400;
        src: local('Gloria Hallelujah'), local('GloriaHallelujah'), url(http://fonts.gstatic.com/s/gloriahallelujah/v9/LYjYdHv3kUk9BMV96EIswT9DIbW-MIS11zM.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Great Vibes';
        font-style: normal;
        font-weight: 400;
        src: local('Great Vibes'), local('GreatVibes-Regular'), url(http://fonts.gstatic.com/s/greatvibes/v5/RWmMoKWR9v4ksMfaWd_JN9XLiaQ6DQ.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Great Vibes';
        font-style: normal;
        font-weight: 400;
        src: local('Great Vibes'), local('GreatVibes-Regular'), url(http://fonts.gstatic.com/s/greatvibes/v5/RWmMoKWR9v4ksMfaWd_JN9XFiaQ.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Italianno';
        font-style: normal;
        font-weight: 400;
        src: local('Italianno'), local('Italianno-Regular'), url(http://fonts.gstatic.com/s/italianno/v7/dg4n_p3sv6gCJkwzT6RXhpwocwM.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Italianno';
        font-style: normal;
        font-weight: 400;
        src: local('Italianno'), local('Italianno-Regular'), url(http://fonts.gstatic.com/s/italianno/v7/dg4n_p3sv6gCJkwzT6RXiJwo.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        src: local('Lato Regular'), local('Lato-Regular'), url(http://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjxAwXjeu.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        src: local('Lato Regular'), local('Lato-Regular'), url(http://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXg.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin */
      @font-face {
        font-family: 'Lobster Two';
        font-style: normal;
        font-weight: 400;
        src: local('Lobster Two'), local('LobsterTwo'), url(http://fonts.gstatic.com/s/lobstertwo/v10/BngMUXZGTXPUvIoyV6yN5-fN5qU.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* cyrillic-ext */
      @font-face {
        font-family: 'Pangolin';
        font-style: normal;
        font-weight: 400;
        src: local('Pangolin Regular'), local('Pangolin-Regular'), url(http://fonts.gstatic.com/s/pangolin/v3/cY9GfjGcW0FPpi-tWMfA79zqiA.woff2) format('woff2');
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
      }
      /* cyrillic */
      @font-face {
        font-family: 'Pangolin';
        font-style: normal;
        font-weight: 400;
        src: local('Pangolin Regular'), local('Pangolin-Regular'), url(http://fonts.gstatic.com/s/pangolin/v3/cY9GfjGcW0FPpi-tWMfJ79zqiA.woff2) format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }
      /* vietnamese */
      @font-face {
        font-family: 'Pangolin';
        font-style: normal;
        font-weight: 400;
        src: local('Pangolin Regular'), local('Pangolin-Regular'), url(http://fonts.gstatic.com/s/pangolin/v3/cY9GfjGcW0FPpi-tWMfC79zqiA.woff2) format('woff2');
        unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Pangolin';
        font-style: normal;
        font-weight: 400;
        src: local('Pangolin Regular'), local('Pangolin-Regular'), url(http://fonts.gstatic.com/s/pangolin/v3/cY9GfjGcW0FPpi-tWMfD79zqiA.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Pangolin';
        font-style: normal;
        font-weight: 400;
        src: local('Pangolin Regular'), local('Pangolin-Regular'), url(http://fonts.gstatic.com/s/pangolin/v3/cY9GfjGcW0FPpi-tWMfN79w.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* cyrillic */
      @font-face {
        font-family: 'Poiret One';
        font-style: normal;
        font-weight: 400;
        src: local('Poiret One'), local('PoiretOne-Regular'), url(http://fonts.gstatic.com/s/poiretone/v5/UqyVK80NJXN4zfRgbdfbo5pcV_cx.woff2) format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Poiret One';
        font-style: normal;
        font-weight: 400;
        src: local('Poiret One'), local('PoiretOne-Regular'), url(http://fonts.gstatic.com/s/poiretone/v5/UqyVK80NJXN4zfRgbdfbo5BcV_cx.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Poiret One';
        font-style: normal;
        font-weight: 400;
        src: local('Poiret One'), local('PoiretOne-Regular'), url(http://fonts.gstatic.com/s/poiretone/v5/UqyVK80NJXN4zfRgbdfbo55cVw.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        src: local('Raleway'), local('Raleway-Regular'), url(http://fonts.gstatic.com/s/raleway/v12/1Ptug8zYS_SKggPNyCMIT5lu.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        src: local('Raleway'), local('Raleway-Regular'), url(http://fonts.gstatic.com/s/raleway/v12/1Ptug8zYS_SKggPNyC0ITw.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Righteous';
        font-style: normal;
        font-weight: 400;
        src: local('Righteous'), local('Righteous-Regular'), url(http://fonts.gstatic.com/s/righteous/v6/1cXxaUPXBpj2rGoU7C9WhnGFucE.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Righteous';
        font-style: normal;
        font-weight: 400;
        src: local('Righteous'), local('Righteous-Regular'), url(http://fonts.gstatic.com/s/righteous/v6/1cXxaUPXBpj2rGoU7C9WiHGF.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Source Code Pro';
        font-style: normal;
        font-weight: 400;
        src: local('Source Code Pro'), local('SourceCodePro-Regular'), url(http://fonts.gstatic.com/s/sourcecodepro/v7/HI_SiYsKILxRpg3hIP6sJ7fM7PqlM-vWjMY.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Source Code Pro';
        font-style: normal;
        font-weight: 400;
        src: local('Source Code Pro'), local('SourceCodePro-Regular'), url(http://fonts.gstatic.com/s/sourcecodepro/v7/HI_SiYsKILxRpg3hIP6sJ7fM7PqlPevW.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* vietnamese */
      @font-face {
        font-family: 'Space Mono';
        font-style: normal;
        font-weight: 400;
        src: local('Space Mono'), local('SpaceMono-Regular'), url(http://fonts.gstatic.com/s/spacemono/v2/i7dPIFZifjKcF5UAWdDRYE58RWq7.woff2) format('woff2');
        unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Space Mono';
        font-style: normal;
        font-weight: 400;
        src: local('Space Mono'), local('SpaceMono-Regular'), url(http://fonts.gstatic.com/s/spacemono/v2/i7dPIFZifjKcF5UAWdDRYE98RWq7.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Space Mono';
        font-style: normal;
        font-weight: 400;
        src: local('Space Mono'), local('SpaceMono-Regular'), url(http://fonts.gstatic.com/s/spacemono/v2/i7dPIFZifjKcF5UAWdDRYEF8RQ.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* cyrillic-ext */
      @font-face {
        font-family: 'Ubuntu Condensed';
        font-style: normal;
        font-weight: 400;
        src: local('Ubuntu Condensed'), local('UbuntuCondensed-Regular'), url(http://fonts.gstatic.com/s/ubuntucondensed/v8/u-4k0rCzjgs5J7oXnJcM_0kACGMtT-3fq8Ho.woff2) format('woff2');
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
      }
      /* cyrillic */
      @font-face {
        font-family: 'Ubuntu Condensed';
        font-style: normal;
        font-weight: 400;
        src: local('Ubuntu Condensed'), local('UbuntuCondensed-Regular'), url(http://fonts.gstatic.com/s/ubuntucondensed/v8/u-4k0rCzjgs5J7oXnJcM_0kACGMtT-Tfq8Ho.woff2) format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }
      /* greek-ext */
      @font-face {
        font-family: 'Ubuntu Condensed';
        font-style: normal;
        font-weight: 400;
        src: local('Ubuntu Condensed'), local('UbuntuCondensed-Regular'), url(http://fonts.gstatic.com/s/ubuntucondensed/v8/u-4k0rCzjgs5J7oXnJcM_0kACGMtT-zfq8Ho.woff2) format('woff2');
        unicode-range: U+1F00-1FFF;
      }
      /* greek */
      @font-face {
        font-family: 'Ubuntu Condensed';
        font-style: normal;
        font-weight: 400;
        src: local('Ubuntu Condensed'), local('UbuntuCondensed-Regular'), url(http://fonts.gstatic.com/s/ubuntucondensed/v8/u-4k0rCzjgs5J7oXnJcM_0kACGMtT-Pfq8Ho.woff2) format('woff2');
        unicode-range: U+0370-03FF;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Ubuntu Condensed';
        font-style: normal;
        font-weight: 400;
        src: local('Ubuntu Condensed'), local('UbuntuCondensed-Regular'), url(http://fonts.gstatic.com/s/ubuntucondensed/v8/u-4k0rCzjgs5J7oXnJcM_0kACGMtT-7fq8Ho.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Ubuntu Condensed';
        font-style: normal;
        font-weight: 400;
        src: local('Ubuntu Condensed'), local('UbuntuCondensed-Regular'), url(http://fonts.gstatic.com/s/ubuntucondensed/v8/u-4k0rCzjgs5J7oXnJcM_0kACGMtT-Dfqw.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Work Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Work Sans'), local('WorkSans-Regular'), url(http://fonts.gstatic.com/s/worksans/v3/QGYsz_wNahGAdqQ43Rh_cqDpp_k.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Work Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Work Sans'), local('WorkSans-Regular'), url(http://fonts.gstatic.com/s/worksans/v3/QGYsz_wNahGAdqQ43Rh_fKDp.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
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
      </style>
    </head>
    <body onload="_p()">
    <!-- REPLACE THIS PART -->
  `,
    exportHtmlTemplatePart2: `
    <!-- REPLACE THIS PART -->
      <!-- DO NOT REMOVE ME -->
      <script type="text/javascript">
      var defaultW, 
        defaultH = 0;
      var defaultLayerValues = [];

      function setDefault() {
        var pElem = document.getElementsByClassName('editor-box')[0];
        var bounds = pElem.getBoundingClientRect();
        console.log(bounds);
        defaultW = bounds.width;
        defaultH = bounds.height;

        // making height and width to 100%
        pElem.style.width = '100%';
        pElem.style.height = '100%';

        var layers = pElem.querySelectorAll('.rr-resizer');
        for (var i = 0; i < layers.length; i++) {
          var layer = layers[i];
          var content = getContent(layer);
          var b = layer.getBoundingClientRect();
          defaultLayerValues.push({
            w: b.width,
            h: b.height,
            l: b.left,
            t: b.top,
            fontSize: getFontSize(content),
          });
        }

        _p();
        updateElements();
      }

      function updateElements() {
         console.log('----------------------------------------------', defaultLayerValues)
        var pElem = document.getElementsByClassName('editor-box')[0];
        var bounds = pElem.getBoundingClientRect();

        console.log('defaults', defaultW, defaultH)
        console.log('bounds', bounds.width, bounds.height);

        var multiplierW = 
          bounds.width / defaultW > 0 ?  bounds.width / defaultW : 1;
        var multiplierH = 
          bounds.height / defaultH > 0 ?  bounds.height / defaultH : 1;

        console.log('msfdf', multiplierW, multiplierH)

        var layers = pElem.querySelectorAll('.rr-resizer');
        for (var i = 0; i < layers.length; i++) {
          var layer = layers[i];
          console.log('layer', layer)
          console.log('layer lBound', defaultLayerValues[i])
          layer.style.width = (defaultLayerValues[i].w * multiplierW) + 'px';
          layer.style.height = (defaultLayerValues[i].h * multiplierH) + 'px';
          layer.style.left = (defaultLayerValues[i].l * multiplierW) + 'px'; 
          layer.style.top = (defaultLayerValues[i].t * multiplierH) + 'px';

          var content = getContent(layer);
          var type = getLayerType(content);
          console.log('type', getLayerType(content));
          if (type === 'text') {
            console.log('**************',  content.children[0].style.fontSize);
            content.children[0].style.fontSize = (defaultLayerValues[i].fontSize * multiplierW) + 'px';
          } else if (type === 'shape') {
            console.log('isPolygon(content)', isPolygon(content));
            if (isPolygon(content)) {
              // triangle
            }
          }
        }
      }
      function isPolygon(elem) {
        console.log('isSVG', elem)
        var p = elem.children[0];
        for (var i = 0; i < p.children.length; i++) {
         // if svg, look for polygon tag
         if (p.children[i].nodeName === 'svg') {
            for (var j = 0; j < p.children[i].children.length; j++) {
              if (p.children[i].children[j].nodeName === 'polygon') {
                return true;
              }
            }
         }
        }
        return false;
      }
      function getContent(elem) {
        for (var i = 0; i < elem.children.length; i++) {
          if (elem.children[i].className === 'rr-content') {
            return elem.children[i];
          }
        }
        return null;
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
        // var gsap = new TimelineMax();
        // var elem1 = document.getElementsByClassName('rr-resizer');
        // gsap.from(elem1[0],1,{left:100,opacity:0,repeat: -1, yoyo: true});
        
        var editable_elements = document.querySelectorAll("[contenteditable=true]");
        for (var i = 0; i < editable_elements.length; i++) {
        editable_elements[i].setAttribute("contenteditable", false);
        }
        // removing editor's data
        // var tohide = document.getElementsByClassName('handle-tt');
        // for (var i = 0; i < tohide.length; i++) {
        //   tohide[i].style.display="none"
        //   }
        }
      </script>
      <!-- DO NOT REMOVE ME -->
    </body>
    </html>
  `,
    loaderTemplate: `
  `,
    /**
     * Exports the current editor content into a packed html file (.html)
     */
    exportTemplate() {
        // var editorElem = document.getElementsByClassName('editor-box')[0]; // clone the div element
        // var htmlContent = editorElem.outerHTML;
        // this.$_download('export-' + appHelper.generateTimestamp() + '.html', this.exportHtmlTemplatePart1 + htmlContent + this.exportHtmlTemplatePart2);

        // making responsive, cleaning html
        // var editorElem = document.getElementsByClassName('editor-box')[0].cloneNode(true); // clone the div element
        // editorElem = this.$_responsiveness(editorElem);
        return new Promise((res, rej) => {
            var htmlContent = this.getExportingElement().outerHTML;
            this.$_download('export-' + appHelper.generateTimestamp() + '.html', this.exportHtmlTemplatePart1 + htmlContent + this.exportHtmlTemplatePart2);
            setTimeout(() => {
                res(true);
            }, 100);
        })
    },
    getExportingElement() {
        var editorElem = document.getElementsByClassName('editor-box')[0].cloneNode(true); // clone the div element
        editorElem = this.$_responsiveness(editorElem);
        return editorElem;
    },
    /**
     * Generates a responsive version of the exported HTML
     * @param {The source element} elem 
     */
    $_responsiveness(elem) {
        var canvasContainer = elem.children[0].children[0];
        canvasContainer = this.$_cleanHTML(canvasContainer);

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
    $_cleanHTML(elem) {
        var _rclass = ['rr-bar', 'rr-rotate-handle', 'rr-handle', 'p-d-g', 'layer-action-info'];
        var layerElems = elem.querySelectorAll('.rr-resizer');
        for (var i = 0; i < layerElems.length; i++) {
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
        }
        return elem;
    },
}