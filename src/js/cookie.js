/*\
 |*|
 |*|  :: cookie.js ::
 |*|
 |*|  Features
 |*|
 |*|  1. Cookie reader/writer with full unicode support.
 |*|     2. Web Beacon implementation.
 |*|     3. Cross-Domain/HTTP
 |*|           - iframe implementation using strings
 |*|           - CORS implementation adds HTTP headers to all HTTP requests and responses
 |*|
 |*|
 |*|  Written by Robert Yarborough  ( http://www.robert-yarborough.com )


      Algorithm
 |*|
 |*|
 |*|  Use-Cases:
 |*|
 |*|  * Cookie.setItem(name, value[, end[, path[, domain[, secure]]]])
 |*|  * Cookie.getItem(name)
 |*|  * Cookie.removeItem(name[, path[, domain]])
 |*|  * Cookie.hasItem(name)
 |*|  * Cookie.keys()
 |*|
\*/
'use strict';



// Create Constructor Object to inherit from here...
var myRevealingModule = (function () {
    // create cookie object that has all method utilities needed
    var Cookie = {
        getItem: function (sKey) {
            if (!sKey) { return null; }
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                return false;
            }
            var sExpires = "";
            if (vEnd) {
                switch (vEnd.constructor) {
                    case Number:
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
            return true;
        },
        removeItem: function (sKey, sPath, sDomain) {
            if (!this.hasItem(sKey)) {
                return false;
            }
            document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
            return true;
        },
        hasItem: function (sKey) {
            if (!sKey) { return false; }
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys: function () {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
            return aKeys;
        }
    };

    var privateID = document.getElementById("cookie");

    // create closures for private methods exsposed later publicly/window scope
    // 1.   Set Cookie  ( Basic Implementation )
    function publicFunction() {
        Cookie.setItem('newCookie', 'newValue');
        if (Cookie.hasItem('newCookie')){
            console.log('has item newCookie');
        }
    }

    //  2.  Set Cookie  ( Event Listener Implementation )
    function publicGetID(){
        return privateID.addEventListener("click", function () {
            Cookie.setItem('BOBBYS', 'WORLD');
        }, true);
    }

    // 3.
    function publicCreateBeacon() {
        console.log('pixel' + 'beacon');

        //create image tag
        //var beacon = this.createElement('img');
        //append image tag to bottom of document


    }

    //<editor-fold desc="Description">
    /*function queryManager(value) {
        this.value = value;
        return value;
    }
    //</editor-fold>

    // 4.
    function publicCreateiFrame() {
        //create a.iframe.html
        var aFrame = document.createElement('iFrame');
        //add id attribute to iframe element
        aFrame.id =  'aFrame';
        //add src attribute to iframe element
        aFrame.src = 'http://a.iframe:8888'; // the // makes sure this string will work on http/https
        //add async attribute to iframe element
        aFrame.async = true;
        //create iframe document references
        //var aFrameDom = aFrame.contentWindow.document;
        //create a reference to the parent window scope
        //var parentDom = document.getElementsByTagName('body')[0];

        document.body.appendChild(aFrame);//append iframe a, to bottom of body in main html file

    }

    // Reveal public pointers to
    // private functions and properties


    /* Make a Cross-Domain request to url and callback.
    *
    * @param url {String}
    * @param method {String} HTTP verb ('GET', 'POST', 'DELETE', etc.)
    * @param data {String} request body
    * @param callback {Function} to callback on completion
    * @param errback {Function} to callback on error
    */
    function xdr(url, method, data, callback, errback) {
        var req;

        if(XMLHttpRequest) {
            req = new XMLHttpRequest();

            if('withCredentials' in req) {
                req.open(method, url, true);
                req.onerror = errback;
                req.onreadystatechange = function() {
                    if (req.readyState === 4) {
                        if (req.status >= 200 && req.status < 400) {
                            callback(req.responseText); //set cookie on domain
                        } else {
                            errback(new Error('Response returned with non-OK status'));
                        }
                    }
                };
                req.send(data);
            }
        } else if(XDomainRequest) {
            req = new XDomainRequest();
            req.open(method, url);
            req.onerror = errback;
            req.onload = function() {
                callback(req.responseText);
            };
            req.send(data);
        } else {
            errback(new Error('CORS not supported'));
        }
    }

    return {
        start: publicFunction,
        id: publicGetID,
        beacon: publicCreateBeacon,
        cors: xdr

    };

})();

//invoke the cookie when the document loads completely
function onLoad(que) {

    if (onLoad.loaded){
        window.setTimeout(que, 0);
        myRevealingModule.start();
        console.log(myRevealingModule, 'started');
    }else if (window.addEventListener){
        window.addEventListener("load", que, false);
        myRevealingModule.start();
        console.log('registering events', myRevealingModule.start);
    }else if (window.attachEvent){
        window.attachEvent("onload", que);
        console.log('ie8 and earlier use this instead');
    }
}


//This logic should be a separate module that initializes or loads this module

//set flag to indicate document has not loaded yet
onLoad.loaded = false;

//trigger event when dom element is clicked
if (document.getElementById("cookie")){
    //initialize the id event
    myRevealingModule.id();
    myRevealingModule.iframe();
    //register function to set the flag when the document does load
    onLoad(function () {
        onLoad.loaded = true;
        console.log('onLoad event has triggered!');
    });
}





