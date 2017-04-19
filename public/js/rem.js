/**
 * Created by me on 2017/4/12.
 */
//1rem 约等于  100px(UI width=640px)
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        var html = document.documentElement;
        var windowWidth = html.clientWidth;
        console.log('windowWidth: ' + windowWidth);
        html.style.fontSize = windowWidth / 3.2 + 'px';
    }, false);
})();