// Write the Google Ads tag script to the HTML document
document.write('<script async src="https://www.googletagmanager.com/gtag/js?id=AW-11110331608"></script>');
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'AW-11110331608');

export function gtag_report_conversion(url) {
    var callback = function () {
        if (typeof (url) != 'undefined') {
            window.location = url;
        }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-11110331608/Kh6nCKOL6Y8YENjp6LEp',
        'event_callback': callback
    });
    return false;
}