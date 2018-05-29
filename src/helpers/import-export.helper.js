import appHelper from './app.helper'
export default {
    exportHtmlTemplatePart1: `
  <!DOCTYPE html>
  <html>
    <head>
      <title></title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.0/TweenMax.min.js"></script>
      <style type="text/css">
      @font-face {
        font-family: 'Domine';
        font-style: normal;
        font-weight: 400;
        src: local('Domine'), local('Domine-Regular'), url(http://fonts.gstatic.com/s/domine/v5/L0x8DFMnlVwD4h3htfqndSk.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Domine';
        font-style: normal;
        font-weight: 400;
        src: local('Domine'), local('Domine-Regular'), url(http://fonts.gstatic.com/s/domine/v5/L0x8DFMnlVwD4h3hu_qn.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin */
      @font-face {
        font-family: 'Droid Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Droid Sans Regular'), local('DroidSans-Regular'), url(http://fonts.gstatic.com/s/droidsans/v8/SlGVmQWMvZQIdix7AFxXkHNSbQ.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Fjalla One';
        font-style: normal;
        font-weight: 400;
        src: local('Fjalla One'), local('FjallaOne-Regular'), url(http://fonts.gstatic.com/s/fjallaone/v5/Yq6R-LCAWCX3-6Ky7FAFrO96kigt.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Fjalla One';
        font-style: normal;
        font-weight: 400;
        src: local('Fjalla One'), local('FjallaOne-Regular'), url(http://fonts.gstatic.com/s/fjallaone/v5/Yq6R-LCAWCX3-6Ky7FAFrOF6kg.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* devanagari */
      @font-face {
        font-family: 'Kalam';
        font-style: normal;
        font-weight: 400;
        src: local('Kalam'), local('Kalam-Regular'), url(http://fonts.gstatic.com/s/kalam/v8/YA9dr0Wd4kDdMthQOCfzsw.woff2) format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Kalam';
        font-style: normal;
        font-weight: 400;
        src: local('Kalam'), local('Kalam-Regular'), url(http://fonts.gstatic.com/s/kalam/v8/YA9dr0Wd4kDdMthfOCfzsw.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Kalam';
        font-style: normal;
        font-weight: 400;
        src: local('Kalam'), local('Kalam-Regular'), url(http://fonts.gstatic.com/s/kalam/v8/YA9dr0Wd4kDdMthROCc.woff2) format('woff2');
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
      /* cyrillic-ext */
      @font-face {
        font-family: 'Lora';
        font-style: normal;
        font-weight: 400;
        src: local('Lora Regular'), local('Lora-Regular'), url(http://fonts.gstatic.com/s/lora/v12/0QIvMX1D_JOuMwf7I-NP.woff2) format('woff2');
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
      }
      /* cyrillic */
      @font-face {
        font-family: 'Lora';
        font-style: normal;
        font-weight: 400;
        src: local('Lora Regular'), local('Lora-Regular'), url(http://fonts.gstatic.com/s/lora/v12/0QIvMX1D_JOuMw77I-NP.woff2) format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }
      /* vietnamese */
      @font-face {
        font-family: 'Lora';
        font-style: normal;
        font-weight: 400;
        src: local('Lora Regular'), local('Lora-Regular'), url(http://fonts.gstatic.com/s/lora/v12/0QIvMX1D_JOuMwX7I-NP.woff2) format('woff2');
        unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Lora';
        font-style: normal;
        font-weight: 400;
        src: local('Lora Regular'), local('Lora-Regular'), url(http://fonts.gstatic.com/s/lora/v12/0QIvMX1D_JOuMwT7I-NP.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Lora';
        font-style: normal;
        font-weight: 400;
        src: local('Lora Regular'), local('Lora-Regular'), url(http://fonts.gstatic.com/s/lora/v12/0QIvMX1D_JOuMwr7Iw.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* cyrillic-ext */
      @font-face {
        font-family: 'Merriweather';
        font-style: normal;
        font-weight: 400;
        src: local('Merriweather Regular'), local('Merriweather-Regular'), url(http://fonts.gstatic.com/s/merriweather/v19/u-440qyriQwlOrhSvowK_l5-cSZMZ-Y.woff2) format('woff2');
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
      }
      /* cyrillic */
      @font-face {
        font-family: 'Merriweather';
        font-style: normal;
        font-weight: 400;
        src: local('Merriweather Regular'), local('Merriweather-Regular'), url(http://fonts.gstatic.com/s/merriweather/v19/u-440qyriQwlOrhSvowK_l5-eCZMZ-Y.woff2) format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }
      /* vietnamese */
      @font-face {
        font-family: 'Merriweather';
        font-style: normal;
        font-weight: 400;
        src: local('Merriweather Regular'), local('Merriweather-Regular'), url(http://fonts.gstatic.com/s/merriweather/v19/u-440qyriQwlOrhSvowK_l5-cyZMZ-Y.woff2) format('woff2');
        unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Merriweather';
        font-style: normal;
        font-weight: 400;
        src: local('Merriweather Regular'), local('Merriweather-Regular'), url(http://fonts.gstatic.com/s/merriweather/v19/u-440qyriQwlOrhSvowK_l5-ciZMZ-Y.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Merriweather';
        font-style: normal;
        font-weight: 400;
        src: local('Merriweather Regular'), local('Merriweather-Regular'), url(http://fonts.gstatic.com/s/merriweather/v19/u-440qyriQwlOrhSvowK_l5-fCZM.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* cyrillic-ext */
      @font-face {
        font-family: 'Noto Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Noto Sans'), local('NotoSans'), url(http://fonts.gstatic.com/s/notosans/v7/o-0IIpQlx3QUlC5A4PNr6DRAW_0.woff2) format('woff2');
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
      }
      /* cyrillic */
      @font-face {
        font-family: 'Noto Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Noto Sans'), local('NotoSans'), url(http://fonts.gstatic.com/s/notosans/v7/o-0IIpQlx3QUlC5A4PNr4TRAW_0.woff2) format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }
      /* devanagari */
      @font-face {
        font-family: 'Noto Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Noto Sans'), local('NotoSans'), url(http://fonts.gstatic.com/s/notosans/v7/o-0IIpQlx3QUlC5A4PNr5DRAW_0.woff2) format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
      }
      /* greek-ext */
      @font-face {
        font-family: 'Noto Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Noto Sans'), local('NotoSans'), url(http://fonts.gstatic.com/s/notosans/v7/o-0IIpQlx3QUlC5A4PNr6TRAW_0.woff2) format('woff2');
        unicode-range: U+1F00-1FFF;
      }
      /* greek */
      @font-face {
        font-family: 'Noto Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Noto Sans'), local('NotoSans'), url(http://fonts.gstatic.com/s/notosans/v7/o-0IIpQlx3QUlC5A4PNr5jRAW_0.woff2) format('woff2');
        unicode-range: U+0370-03FF;
      }
      /* vietnamese */
      @font-face {
        font-family: 'Noto Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Noto Sans'), local('NotoSans'), url(http://fonts.gstatic.com/s/notosans/v7/o-0IIpQlx3QUlC5A4PNr6jRAW_0.woff2) format('woff2');
        unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Noto Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Noto Sans'), local('NotoSans'), url(http://fonts.gstatic.com/s/notosans/v7/o-0IIpQlx3QUlC5A4PNr6zRAW_0.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Noto Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Noto Sans'), local('NotoSans'), url(http://fonts.gstatic.com/s/notosans/v7/o-0IIpQlx3QUlC5A4PNr5TRA.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* cyrillic-ext */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(http://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFWJ0bbck.woff2) format('woff2');
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
      }
      /* cyrillic */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(http://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFUZ0bbck.woff2) format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }
      /* greek-ext */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(http://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFWZ0bbck.woff2) format('woff2');
        unicode-range: U+1F00-1FFF;
      }
      /* greek */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(http://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVp0bbck.woff2) format('woff2');
        unicode-range: U+0370-03FF;
      }
      /* vietnamese */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(http://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFWp0bbck.woff2) format('woff2');
        unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(http://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFW50bbck.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(http://fonts.gstatic.com/s/opensans/v15/mem8YaGs126MiZpBA-UFVZ0b.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* cyrillic-ext */
      @font-face {
        font-family: 'PT Sans';
        font-style: normal;
        font-weight: 400;
        src: local('PT Sans'), local('PTSans-Regular'), url(http://fonts.gstatic.com/s/ptsans/v9/jizaRExUiTo99u79D0-ExdGM.woff2) format('woff2');
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
      }
      /* cyrillic */
      @font-face {
        font-family: 'PT Sans';
        font-style: normal;
        font-weight: 400;
        src: local('PT Sans'), local('PTSans-Regular'), url(http://fonts.gstatic.com/s/ptsans/v9/jizaRExUiTo99u79D0aExdGM.woff2) format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }
      /* latin-ext */
      @font-face {
        font-family: 'PT Sans';
        font-style: normal;
        font-weight: 400;
        src: local('PT Sans'), local('PTSans-Regular'), url(http://fonts.gstatic.com/s/ptsans/v9/jizaRExUiTo99u79D0yExdGM.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'PT Sans';
        font-style: normal;
        font-weight: 400;
        src: local('PT Sans'), local('PTSans-Regular'), url(http://fonts.gstatic.com/s/ptsans/v9/jizaRExUiTo99u79D0KExQ.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Petit Formal Script';
        font-style: normal;
        font-weight: 400;
        src: local('Petit Formal Script'), local('PetitFormalScript-Regular'), url(http://fonts.gstatic.com/s/petitformalscript/v5/B50TF6xQr2TXJBnGOFME6u5OR83oRP5qkHDgPrgZ.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Petit Formal Script';
        font-style: normal;
        font-weight: 400;
        src: local('Petit Formal Script'), local('PetitFormalScript-Regular'), url(http://fonts.gstatic.com/s/petitformalscript/v5/B50TF6xQr2TXJBnGOFME6u5OR83oRP5qkH7gPg.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* cyrillic-ext */
      @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        src: local('Roboto'), local('Roboto-Regular'), url(http://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu72xKOzY.woff2) format('woff2');
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
      }
      /* cyrillic */
      @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        src: local('Roboto'), local('Roboto-Regular'), url(http://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu5mxKOzY.woff2) format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }
      /* greek-ext */
      @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        src: local('Roboto'), local('Roboto-Regular'), url(http://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu7mxKOzY.woff2) format('woff2');
        unicode-range: U+1F00-1FFF;
      }
      /* greek */
      @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        src: local('Roboto'), local('Roboto-Regular'), url(http://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4WxKOzY.woff2) format('woff2');
        unicode-range: U+0370-03FF;
      }
      /* vietnamese */
      @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        src: local('Roboto'), local('Roboto-Regular'), url(http://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu7WxKOzY.woff2) format('woff2');
        unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        src: local('Roboto'), local('Roboto-Regular'), url(http://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu7GxKOzY.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        src: local('Roboto'), local('Roboto-Regular'), url(http://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxK.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Signika';
        font-style: normal;
        font-weight: 400;
        src: local('Signika Regular'), local('Signika-Regular'), url(http://fonts.gstatic.com/s/signika/v8/vEFR2_JTCgwQ5ejvG18mBkho.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Signika';
        font-style: normal;
        font-weight: 400;
        src: local('Signika Regular'), local('Signika-Regular'), url(http://fonts.gstatic.com/s/signika/v8/vEFR2_JTCgwQ5ejvG1EmBg.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* cyrillic-ext */
      @font-face {
        font-family: 'Vollkorn';
        font-style: normal;
        font-weight: 400;
        src: local('Vollkorn Regular'), local('Vollkorn-Regular'), url(http://fonts.gstatic.com/s/vollkorn/v8/0yb9GDoxxrvAnPhYGxkkaE0GrQ.woff2) format('woff2');
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
      }
      /* cyrillic */
      @font-face {
        font-family: 'Vollkorn';
        font-style: normal;
        font-weight: 400;
        src: local('Vollkorn Regular'), local('Vollkorn-Regular'), url(http://fonts.gstatic.com/s/vollkorn/v8/0yb9GDoxxrvAnPhYGxktaE0GrQ.woff2) format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }
      /* greek */
      @font-face {
        font-family: 'Vollkorn';
        font-style: normal;
        font-weight: 400;
        src: local('Vollkorn Regular'), local('Vollkorn-Regular'), url(http://fonts.gstatic.com/s/vollkorn/v8/0yb9GDoxxrvAnPhYGxkqaE0GrQ.woff2) format('woff2');
        unicode-range: U+0370-03FF;
      }
      /* vietnamese */
      @font-face {
        font-family: 'Vollkorn';
        font-style: normal;
        font-weight: 400;
        src: local('Vollkorn Regular'), local('Vollkorn-Regular'), url(http://fonts.gstatic.com/s/vollkorn/v8/0yb9GDoxxrvAnPhYGxkmaE0GrQ.woff2) format('woff2');
        unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Vollkorn';
        font-style: normal;
        font-weight: 400;
        src: local('Vollkorn Regular'), local('Vollkorn-Regular'), url(http://fonts.gstatic.com/s/vollkorn/v8/0yb9GDoxxrvAnPhYGxknaE0GrQ.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Vollkorn';
        font-style: normal;
        font-weight: 400;
        src: local('Vollkorn Regular'), local('Vollkorn-Regular'), url(http://fonts.gstatic.com/s/vollkorn/v8/0yb9GDoxxrvAnPhYGxkpaE0.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
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
          /* width: 200px; */
          /* height: 200px; */
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
        }
        .editor-container, .editor-box {
          width: 508px;
          height: 423px;
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
            outline: rgb(102, 102, 102) solid 1px;
            overflow: hidden;
        }
        .rr-resizer {
          position: absolute;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            left: 0;
            top: 0;
            border: 2px solid transparent;
        }
  
        .rr-content {
          width: 100%;
            height: 100%;
            z-index: 1;
        }

        .loading-ui {
          z-index: 99999;
          position: absolute;
          width: 100%;
          height:100%;
          top: 0;
        }
        .loading-ui-img {
          width: 100%;
          height:100%;
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
        function _p() {
          // var gsap = new TimelineMax(); 
          // var elem1 = document.getElementsByClassName('rr-resizer');
          // gsap.from(elem1[0],1,{left:100,opacity:0,repeat: -1, yoyo: true});
          window.setTimeout(function() {
            var editable_elements = document.querySelectorAll("[contenteditable=true]");
            for (var i = 0; i < editable_elements.length; i++) {
              editable_elements[i].setAttribute("contenteditable", false);
            }
            // removing editor's data
            var tohide = document.getElementsByClassName('handle-tt');
            for (var i = 0; i < tohide.length; i++) {
              tohide[i].style.display="none"
            } 
            document.getElementById('loader').style.display = 'none';
          }, 1000);
        }
      </script>
      <!-- DO NOT REMOVE ME -->
    </body>
    </html>
  `,
    loaderTemplate: `
    <img class="loading-ui-img" src="https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif">
  `,
    /**
     * Exports the current editor content into a packed html file (.html)
     */
    exportTemplate() {
        var editorElem = document.getElementsByClassName('editor-box')[0]
        var htmlContent = editorElem.outerHTML;

        var newParent = document.createElement('div');
        newParent.className = 'editor-box';
        newParent.style.width = editorElem.style.width;
        newParent.style.height = editorElem.style.height;
        newParent.style.cssTex = editorElem.style.cssText;
        newParent.innerHTML = htmlContent;

        // adding the loader too the newParent div
        // creating the loading chuchu
        var div = document.createElement('div');
        div.className = 'loading-ui';
        div.id = 'loader';
        div.innerHTML = this.loaderTemplate;
        newParent.appendChild(div);

        this.$_download('export-' + appHelper.generateTimestamp() + '.html', this.exportHtmlTemplatePart1 + newParent.outerHTML + this.exportHtmlTemplatePart2);
    },
    $_download (filename, htmlContent) {
      console.log('filename:', filename)
      console.log('htmlContent:', htmlContent)
        var element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(htmlContent))
        element.setAttribute('download', filename)

        element.style.display = 'none'
        document.body.appendChild(element)

        element.click()

        document.body.removeChild(element)
    }
}