(function () {
    new Promise(function (res, rej) {
        var request = new XMLHttpRequest();
        request.onload = function () {
            var data = JSON.parse(this.responseText);
            res(data);
        }
        request.open('get', 'iframes.json');
        request.send();
    }).then(function (iframes) {
        function load(src) {
            var iframe = document.querySelector('div.iframe-switcher iframe');
            iframe.setAttribute('src', src);
        }
        var btns = document.querySelector('div.btns-container');
        btns.innerHTML = null;
        for (var x = 0; x < iframes.length; x++) {
            var btn = document.createElement('div');
            btn.classList.add('btn');
            btn.innerText = iframes[x].text;
            btn.setAttribute('data-num', x);
            btn.onclick = function() {
                var num = parseInt(this.getAttribute('data-num'));
                load(iframes[num].link);
            }
            btns.appendChild(btn);
        }
        load(iframes[0].link);
    });
})();