export default {
    /**
     * Browser is Opera
     */
    isOpera() {
        return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    },
    /**
     * Browser is Firefox
     */
    isFirefox() {
        return typeof InstallTrigger !== 'undefined';
    },
    /**
     * Browser is Safari
     */
    isSafari() {
        return /constructor/i.test(window.HTMLElement) || (function(p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    },
    /**
     * Browser is IE
     */
    isIE() {
        return /*@cc_on!@*/ false || !!document.documentMode;
    },
    /**
     * Browser is M Edge
     */
    isEdge() {
        return !isIE && !!window.StyleMedia;
    },
    /**
     * Browser is G Chrome
     */
    isChrome() {
        return !!window.chrome && !!window.chrome.webstore;
    },
    /**
     * (rofl) XD
     */
    isBlink() {
        return (isChrome || isOpera) && !!window.CSS;
    },
    /**
     * Return true if browser is mobile
     */
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}