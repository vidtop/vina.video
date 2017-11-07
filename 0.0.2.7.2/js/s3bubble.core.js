function s3bubbleGlobals() {
    var defaults = {
            api: "data"
        },
        helpers = {};
    return helpers.extend = function(og, so) {
        for (var key in so) "object" == typeof og[key] ? helpers.extend(og[key], so[key]) : og[key] = so[key];
        return og
    }, helpers.isScrolledIntoView = function(el) {
        if (el.getBoundingClientRect()) {
            var elemTop = el.getBoundingClientRect().top,
                elemBottom = el.getBoundingClientRect().bottom;
            return elemTop < window.innerHeight && elemBottom >= 0
        }
    }, helpers.setFontSize = function(options) {
        if (document.getElementById(options.id)) {
            var elw = document.getElementById(options.id).offsetWidth,
                defaults = {
                    maximum: 9999,
                    minimum: 1,
                    maxFont: 9999,
                    minFont: 1,
                    fontRatio: 35
                };
            if (options.hasOwnProperty("elements"))
                for (var elms = options.elements, i = elms.length - 1; i >= 0; i--)
                    if (elms[i].hasOwnProperty("fontRatio") && elms[i].hasOwnProperty("el")) {
                        var fontBase = (elw > defaults.maximum ? defaults.maximum : elw < defaults.minimum ? defaults.minimum : elw) / elms[i].fontRatio,
                            fontSize = fontBase > defaults.maxFont ? defaults.maxFont : fontBase < defaults.minFont ? defaults.minFont : fontBase;
                        elms[i].el.style.fontSize = fontSize + "px"
                    }
        }
    },
    helpers.copy = function copy(aObject) {
	var bObject, v, k;
	bObject = Array.isArray(aObject) ? [] : {};
	for (k in aObject) {
	    v = aObject[k];
	    bObject[k] = (typeof v === "object") ? copy(v) : v;
	}
	return bObject;
    },
    helpers.addScripts = function() {
        var ima3 = document.createElement("script");
        ima3.type = "text/javascript",
	ima3.src = "//imasdk.googleapis.com/js/sdkloader/ima3.js";
//	ima3.src = "./js/gg_ima3.js";
        var googleAnalytics = document.createElement("script");
        googleAnalytics.type = "text/javascript", googleAnalytics.async = !0,
	googleAnalytics.src = "//www.google-analytics.com/analytics.js",
	//googleAnalytics.src = "./js/gg_analytics.js",
	document.getElementsByTagName("head")[0].setAttribute("data-cast-api-enabled", "true");
        var chromeCastSDK = document.createElement("script");
        chromeCastSDK.type = "text/javascript", chromeCastSDK.async = !0,
	chromeCastSDK.src = "//www.gstatic.com/cv/js/sender/v1/cast_sender.js",
	//chromeCastSDK.src = "./js/gg_cast_sender.js",
            function() {
                try {
                    return window.self !== window.top
                } catch (e) {
                    return !0
                }
            }() || (document.head.appendChild(ima3), document.head.appendChild(googleAnalytics), document.head.appendChild(chromeCastSDK));
        var s3bubbleMain = document.getElementsByClassName("s3bubble");
        for (i = 0; i < s3bubbleMain.length; i++)
            if (s3bubbleMain[i].getAttribute("data-setup")) {
                setup = JSON.parse(s3bubbleMain[i].getAttribute("data-setup"));
		console.log('data-setup');console.log(setup);
                s3bubble(s3bubbleMain[i]).video(setup)
            }
        var s3bubbleModal = document.getElementsByClassName("s3bubble-modal");
        for (i = 0; i < s3bubbleModal.length; i++)
            if (s3bubbleModal[i].getAttribute("data-setup")) {
                setup = JSON.parse(s3bubbleModal[i].getAttribute("data-setup"));
                s3bubble("s3bubble-modal").modal(setup)
            }
        var s3bubbleService = document.getElementsByClassName("s3bubble-service");
        for (i = 0; i < s3bubbleService.length; i++)
            if (s3bubbleService[i].getAttribute("data-setup")) {
                setup = JSON.parse(s3bubbleService[i].getAttribute("data-setup"));
                s3bubble(s3bubbleService[i]).service(setup)
            }
        var s3bubbleAudio = document.getElementsByClassName("s3bubble-audio");
        for (i = 0; i < s3bubbleAudio.length; i++)
            if (s3bubbleAudio[i].getAttribute("data-setup")) {
                setup = JSON.parse(s3bubbleAudio[i].getAttribute("data-setup"));
                s3bubble(s3bubbleAudio[i]).audio(setup)
            }
        var s3bubbleLive = document.getElementsByClassName("s3bubble-live");
        for (i = 0; i < s3bubbleLive.length; i++)
            if (s3bubbleLive[i].getAttribute("data-setup")) {
                setup = JSON.parse(s3bubbleLive[i].getAttribute("data-setup"));
                s3bubble(s3bubbleLive[i]).live(setup)
            }
        var s3bubblePlaylist = document.getElementsByClassName("s3bubble-playlist");
        for (i = 0; i < s3bubblePlaylist.length; i++)
            if (s3bubblePlaylist[i].getAttribute("data-setup")) {
                setup = JSON.parse(s3bubblePlaylist[i].getAttribute("data-setup"));
                s3bubble(s3bubblePlaylist[i]).playlist(setup)
            }
        var s3bubbleLazyPlaylist = document.getElementsByClassName("s3bubble-lazy");
        for (i = 0; i < s3bubbleLazyPlaylist.length; i++)
            if (s3bubbleLazyPlaylist[i].getAttribute("data-setup")) {
                setup = JSON.parse(s3bubbleLazyPlaylist[i].getAttribute("data-setup"));
                s3bubble(s3bubbleLazyPlaylist[i]).lazy(setup)
            }
        for (var s3bubbleLinkClick = document.getElementsByClassName("s3bubble-link"), i = 0; i < s3bubbleLinkClick.length; i++) s3bubbleLinkClick[i].addEventListener("click", function() {
            var setup = JSON.parse(this.getAttribute("data-setup"));
            s3bubble("s3bubble-modal").modal(setup)
        }, !1);
        var s3bubbleDragger = document.getElementsByClassName("s3bubble-dragger");
        for (i = 0; i < s3bubbleDragger.length; i++)
            if (s3bubbleDragger[i].getAttribute("data-setup")) {
                var setup = JSON.parse(s3bubbleDragger[i].getAttribute("data-setup"));
                s3bubble(s3bubbleDragger[i]).dragger(setup)
            }
        for (var s3bubbleListClick = document.getElementsByClassName("s3bubble-list"), i = 0; i < s3bubbleListClick.length; i++) s3bubbleListClick[i].addEventListener("click", function(event) {
            event.preventDefault();
            var setup = JSON.parse(this.getAttribute("data-setup"));
            setup.hasOwnProperty("listContainerId") ? s3bubble(document.getElementById(setup.listContainerId)).video(setup) : console.log("You must add listContainerId to your data-setup that reference your container id.")
        }, !1)
    }, helpers.getData = function(data, callback) {
	console.log('getData:');console.log(data.code);
	var models = vidtop._models;

	if(data.uri == "globals") {
	    console.log("globals");
	    return models.getData(window.vidtop.config.player, function(_ee){
		console.log('_ee:');console.log(_ee);
		callback(_ee);
	    })
	}

	if(/^2PACX-/.test(data.code)) {
	    // return models.getDataPlayDetail(data.code, function(_e3){
	    // 	callback(_e3);
	    // })
	    return models.getPlayObj(data.code, function(_ee){
		_ee.post_id = data.code;
	   	console.log('_ee1:');console.log(_ee);
	   	callback(_ee);
	    });
	}
        //data.location = location.host.indexOf("www.") && location.host || location.host.replace("www.", ""),
	data.location = 'streamiumtheme.com',
	videojs.xhr({
            method: "GET" || "POST",
            body: function(object) {
                var encodedString = "";
                for (var prop in object) object.hasOwnProperty(prop) && (encodedString.length > 0 && (encodedString += "&"), encodedString += encodeURI(prop + "=" + object[prop]));
                return encodedString
            }(data),
            uri: [defaults.api, "api", data.uri, data.code].filter(function(e){return e}).join('/') + '.json',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }, function(err, resp, body) {
            if (200 === resp.statusCode) {
                var data = JSON.parse(resp.body);
                callback(data.error ? {
                    error: !0,
                    message: data.message
                } : data)
            } else 200 !== resp.statusCode && callback({
                error: !0,
                message: "Request failed.  Returned status of " + resp.statusCode
            })
        })
    }, helpers.getJson = function(data, callback) {
        var xhr = new XMLHttpRequest;
        xhr.open("GET", data.waveform), xhr.setRequestHeader("Content-Type", "application/json"), xhr.onload = function() {
            if (200 === xhr.status) {
                var data = JSON.parse(xhr.responseText);
                callback(data.error ? {
                    error: !0,
                    message: data.message
                } : data)
            } else 200 !== xhr.status && callback({
                error: !0,
                message: "Request failed.  Returned status of " + xhr.status
            })
        }, xhr.send()
    }, helpers.swipedetect = function(el, callback) {
        var swipedir, startX, startY, distX, distY, elapsedTime, startTime, touchsurface = el,
            handleswipe = callback || function(swipedir) {};
        touchsurface.addEventListener("touchstart", function(e) {
            var touchobj = e.changedTouches[0];
            swipedir = "none", dist = 0, startX = touchobj.pageX, startY = touchobj.pageY, startTime = (new Date).getTime(), e.preventDefault()
        }, !1), touchsurface.addEventListener("touchmove", function(e) {
            e.preventDefault()
        }, !1), touchsurface.addEventListener("touchend", function(e) {
            var touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX, distY = touchobj.pageY - startY, (elapsedTime = (new Date).getTime() - startTime) <= 300 && (Math.abs(distX) >= 150 && Math.abs(distY) <= 100 ? swipedir = distX < 0 ? "left" : "right" : Math.abs(distY) >= 150 && Math.abs(distX) <= 100 && (swipedir = distY < 0 ? "up" : "down")), handleswipe(swipedir), e.preventDefault()
        }, !1)
    }, helpers.s3bubbleCleanFilename = function(name) {
        if ("" === name || void 0 === name || !1 === name) return null;
        try {
            return name = decodeURIComponent(name), name = name.replace(/\\/g, ""), name = name.replace(/\_/g, " "), name = name.replace(/\-/g, " ")
        } catch (err) {
            return name = name.replace(/\\/g, ""), name = name.replace(/\_/g, " "), name = name.replace(/\-/g, " ")
        }
    }, helpers.isAndroid = function() {
        return navigator.userAgent.match(/Android/i)
    }, helpers.isBlackBerry = function() {
        return navigator.userAgent.match(/BlackBerry/i)
    }, helpers.isIOS = function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    }, helpers.isOpera = function() {
        return navigator.userAgent.match(/Opera Mini/i)
    }, helpers.isWindows = function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)
    }, helpers.isMobile = function() {
        return helpers.isAndroid() || helpers.isBlackBerry() || helpers.isIOS() || helpers.isOpera() || helpers.isWindows()
    }, helpers.getExternalService = function(url) {
        if (url.match(/(http:\/\/|https:\/\/|)(player.|www.)?(dailymotion\.com|vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), RegExp.$3.indexOf("youtu") > -1) type = "youtube";
        else if (RegExp.$3.indexOf("vimeo") > -1) type = "vimeo";
        else if (RegExp.$3.indexOf("dailymotion") > -1) var type = "dailymotion";
        return {
            type: type,
            id: RegExp.$6
        }
    }, helpers
}

function s3bubble(div) {
    var s3bubble = {};
    return videojs.browser.IS_ANY_SAFARI || (videojs.options.hls.overrideNative = !0, videojs.options.html5.nativeAudioTracks = !1, videojs.options.html5.nativeTextTracks = !1), s3bubble.playlist = function(options, callback) {
        options.hasOwnProperty("code") ? (div instanceof Element || (div = document.getElementById(div)), null !== div ? (div.children.length > 0 && (console.log("Clean up..."), videojs(div.children[0]).dispose()), s3bubbleHelpers.getData({
            uri: "playlist_codes",
            id: options.code
        }, function(_response) {
            if (_response.error) return video = document.createElement("video"), video.className = "video-js vjs-default-skin vjs-16-9", videojs.hasClass(div, "s3bubbble-prepare-16-9") && (video.style.position = "absolute", video.style.top = "0px"), div.appendChild(video), player = videojs(video), player.errorsPlugin({}), void player.error({
                code: 7,
                message: _response.message
            });
            options.codes = _response.codes, options.options = _response.options, options.meta = _response.meta, options.brand = _response.brand, options.source = _response.source, options.playlist = !0, options.hasOwnProperty("type") && "audio" === options.type ? s3bubble.audio(options, callback) : s3bubble.video(options, callback)
        })) : console.log("ERROR: Please make sure your html div has a unique id element")) : console.log("ERROR: Code is a required option")
    }, s3bubble.modal = function(options, callback) {
        if (options.hasOwnProperty("codes"))
            if (options.hasOwnProperty("modal")) {
                var text = "";
                options.modal.hasOwnProperty("text") && (text = "<p style='margin-top:10px;'>" + options.modal.text + "</p>"), options.modal.html = "<div id='" + div + "' class='s3bubbble-prepare-16-9'></div>" + text, options.hasOwnProperty("options") ? options.options.prepare = !0 : (options.options = {}, options.options.prepare = !0);
                var link = null;
                if (options.modal.hasOwnProperty("link") && (link = options.modal.link, delete options.modal.link), options.modal.hasOwnProperty("delay")) {
                    var delay = options.modal.delay;
                    delete options.modal.delay, options.modal.allowOutsideClick = !1, setTimeout(function() {
                        if (s3bubbleswal(options.modal).then(function() {
                                div && div.children.length > 0 && (console.log("Clean up..."), videojs(div.children[0]).dispose()), link && window.open(link, "_self")
                            }), !options.modal.hasOwnProperty("title")) {
                            var removeTitle = document.querySelector(".s3bubble-swal2-title");
                            null != removeTitle && removeTitle.parentNode.removeChild(removeTitle)
                        }
                        options.hasOwnProperty("type") && "audio" === options.type ? s3bubble.audio(options, callback) : s3bubble.video(options, callback)
                    }, delay)
                } else {
                    if (s3bubbleswal(options.modal).then(function() {
                            div && div.children.length > 0 && (console.log("Clean up..."), videojs(div.children[0]).dispose()), link && window.open(link, "_self")
                        }), !options.modal.hasOwnProperty("title")) {
                        var removeTitle = document.querySelector(".s3bubble-swal2-title");
                        null != removeTitle && removeTitle.parentNode.removeChild(removeTitle)
                    }
                    options.hasOwnProperty("type") && "audio" === options.type ? s3bubble.audio(options, callback) : s3bubble.video(options, callback)
                }
            } else options.hasOwnProperty("options") ? options.options.prepare = !0 : (options.options = {}, options.options.prepare = !0), s3bubbleswal({
                html: "<div id='" + div + "' class='s3bubbble-prepare-16-9'></div>",
                width: 800,
                allowOutsideClick: !1
            }).then(function() {
                div && div.children.length > 0 && (console.log("Clean up..."), videojs(div.children[0]).dispose())
            }), options.hasOwnProperty("type") && "audio" === options.type ? s3bubble.audio(options, callback) : s3bubble.video(options, callback);
        else console.log("ERROR: Code is a required option")
    }, s3bubble.audio = function(options, callback) {
        var settings, video, player;
        if (options.hasOwnProperty("codes"))
            if ("string" == typeof options.codes && (options.codes = [options.codes]), div instanceof Element || (div = document.getElementById(div)), null !== div) {
                div.children.length > 0 && (console.log("Clean up..."), videojs(div.children[0]).dispose());
                var int = 0;
                options.hasOwnProperty("setIndex") && (int = parseInt(options.setIndex)),
		s3bubbleHelpers.getData({
                    uri: "player",
                    code: options.codes[int]
                }, function(_response) {
                    if (_response.error) return video = document.createElement("video"), video.className = "video-js vjs-default-skin vjs-16-9", videojs.hasClass(div, "s3bubbble-prepare-16-9") && (video.style.position = "absolute", video.style.top = "0px"), div.appendChild(video), (player = videojs(video)).errorsPlugin({}), void player.error({
                        code: 7,
                        message: _response.message
                    });
                    (settings = s3bubbleHelpers.extend(_response, options)).index = 0, settings.length = 0, window.ga = window.ga || function() {
                        (ga.q = ga.q || []).push(arguments)
                    }, ga.l = +new Date, ga("create", settings.options.googleUaCode, "auto", "s3bubble"), ga("s3bubble.send", "pageview"), ga("s3bubble.send", "event", "s3bubble.init", "video.code", settings.options.code), ga("s3bubble.send", "event", "s3bubble.init", "video.bucket", settings.options.bucket), ga("s3bubble.send", "event", "s3bubble.init", "video.title", s3bubbleHelpers.s3bubbleCleanFilename(settings.meta.title)), ga("s3bubble.send", "event", "s3bubble.init", "video.key", settings.options.key), ga("s3bubble.send", "event", "s3bubble.init", "video.vpaid", settings.options.vpaid), (video = document.createElement("video")).className = "video-js vjs-default-skin", video.poster = settings.source.poster, video.controls = settings.options.controls, video.muted = settings.options.muted, video.preload = settings.options.preload, video.crossorigin = "anonymous", video.setAttribute("playsinline", !0), video.setAttribute("webkit-playsinline", !0), video.addEventListener("contextmenu", function(e) {
                        e.preventDefault()
                    }, !1), videojs.hasClass(div, "s3bubbble-prepare-16-9") && (video.style.position = "absolute", video.style.top = "0px"), div.appendChild(video), s3bubbleHelpers.swipedetect(div, function(swipedir) {
                        "right" === swipedir && window.history.back()
                    });
                    var videoOptions = {
			techOrder: ["youtube", "vimeo", "dailymotion"],
                        sources: [{
                            type: "video/" + service.type,
                            src: settings.codes[settings.index]
                        }],
                        autoplay: settings.options.autoplay,
                        playbackRates: settings.options.playbackRates,
                        loop: settings.options.loop,
                        nativeControlsForTouch: !1,
                        plugins: {
                            chromecast: {
                                appId: settings.options.hasOwnProperty("chromecast") ? settings.options.chromecast : "E14DC85B"
                            }
                        }
                    };
                    settings.options.hasOwnProperty("width") && (videoOptions.width = settings.options.width),
		    settings.options.hasOwnProperty("height") &&
			(videoOptions.height = settings.options.height),
		    settings.options.hasOwnProperty("height") || settings.options.hasOwnProperty("width") || (settings.options.hasOwnProperty("aspect") ? video.classList.add("vjs-" + settings.options.aspect) : video.classList.add("vjs-16-9")), settings.options.fluid && video.classList.add("vjs-s3bubble-fullscreen");
                    var css = ".vjs-default-skin.vjs-user-inactive .vjs-control-bar {opacity:1 !important;}.video-js .vjs-control-bar {display:inline-flex !important;}",
                        head = document.head || document.getElementsByTagName("head")[0],
                        style = document.createElement("style");
                    style.type = "text/css", style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css)), head.appendChild(style), (console.log('vao day'),player = videojs(video, videoOptions, function() {
                        this.one("durationchange", function() {
                            if (settings.hasOwnProperty("startTime")) {
                                var skipToPercentage = this.duration() / 100 * settings.startTime;
                                this.currentTime(Math.round(parseInt(skipToPercentage)))
                            }
                        }), settings.hasOwnProperty("popit") && this.popitPlugin(div, settings.popit), this.playlistPlugin(settings), this.airplayPlugin(), this.ga({
                            code: settings.options.code
                        }), callback && callback(this)
                    })).src(settings.source),
		    player.errorsPlugin(settings),
		    player.waveformPlugin(settings),
		    settings.source.hasOwnProperty("download") && "application/x-mpegURL" != settings.source.type &&
			(settings.meta.download = settings.source.download),
		    player.s3BubbleMetaOverlay(settings.meta),
		    player.brandPlugin(settings.brand),
		    s3bubbleHelpers.isMobile() && (player.el().getElementsByClassName("vjs-big-play-button")[0].style.display = "none"),
		    settings.hasOwnProperty("playlist") || (
			player.previewPlugin(settings.preview),
			player.buttonsPlugin(settings.buttons)
		    );
                    var startEvent = settings.options.autoplay ? "loadedmetadata" : "click";
                    (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i)) && (startEvent = "touchend"), player.one(startEvent, function(_event) {
                        this.vPaidPlugin(settings)
                    }), player.on("loadedmetadata", function(_event) {
                        this.ratesSwitcherPlugin(settings)
                    }), player.playlistSkip = function(ind) {
                        var that = this;
                        settings.index = ind;
                        var code = settings.codes.indexOf(ind); - 1 != code && (settings.index = code);
                        var getPlaylist = that.el().getElementsByClassName("vjs-s3bubble-playlist");
                        if (getPlaylist) {
                            var i, playlistChildren = getPlaylist[0].childNodes;
                            for (i = 0; i < playlistChildren.length; i++) parseInt(playlistChildren[i].getAttribute("id")) === parseInt(settings.index) ? videojs.addClass(playlistChildren[i], "vjs-selected") : videojs.removeClass(playlistChildren[i], "vjs-selected")
                        }
                        that.pause(), s3bubbleHelpers.getData({
                            uri: "player",
                            code: settings.codes[settings.index]
                        }, function(_response) {
                            _response.error ? console.log("ERROR: ", _response.message) : (settings.hasOwnProperty("playlist") ? (that.src(_response.source), that.load(), _response.brand = settings.brand, that.waveformPlugin(_response)) : (that.src(_response.source), that.load(), that.poster(_response.source.poster), that.s3BubbleMetaOverlay(_response.meta), that.updatePreview(_response.preview), _response.brand = settings.brand, that.waveformPlugin(_response)), that.play())
                        })
                    }, player.reload = function(ind) {
                        var that = this;
                        that.pause(), s3bubbleHelpers.getData({
                            uri: "player",
                            code: settings.codes[0]
                        }, function(_response) {
                            _response.error ?
				console.log("ERROR: ", _response.message) : (
				    settings.hasOwnProperty("playlist") ?
					(
					    that.src(_response.source),
					    that.load(),
					    that.waveformPlugin(_response)
					)
					: (
					    that.src(_response.source),
					    that.load(),
					    that.waveformPlugin(_response),
					    that.poster(_response.source.poster),
					    that.s3BubbleMetaOverlay(_response.meta),
					    that.updatePreview(_response.preview)),
				    that.play()
				)
                        })
                    }
                })
            } else console.log("ERROR: Please make sure your html div has a unique id element");
        else console.log("ERROR: Codes is a required option")
    },
    s3bubble.video = function(options, callback) {
	console.log('s3bubble.video');
	console.log('options:');console.log(options);
        var settings = {}, video, player;
        if (options.hasOwnProperty("codes"))
            if ("string" == typeof options.codes && (options.codes = [options.codes]), div instanceof Element || (div = document.getElementById(div)), null !== div) {
                div.children.length > 0 && (console.log("Clean up..."), videojs(div.children[0]).dispose());
                var int = 0;
		
		var models = vidtop._models;
		_api_player_handle =  function(_response) {
		    console.log('_api_player_handle');
                    if (_response.error) return video = document.createElement("video"), video.className = "video-js vjs-default-skin vjs-16-9", videojs.hasClass(div, "s3bubbble-prepare-16-9") && (video.style.position = "absolute", video.style.top = "0px"), div.appendChild(video), (player = videojs(video)).errorsPlugin({}), void player.error({
                        code: 7,
                        message: _response.message
                    });
		    console.log("_response:");console.log(_response);
                    (
			settings = s3bubbleHelpers.extend(_response, options)).index = 0,

//		    console.log(settings),

		    console.log('settings:'),console.log(settings),
		    settings.length = 0,
		    window.ga = window.ga || function() {
                        (ga.q = ga.q || []).push(arguments)
                    }, ga.l = +new Date,
		    ga("create", settings.options.googleUaCode, "auto", "s3bubble"),
		    ga("s3bubble.send", "pageview"),
		    ga("s3bubble.send", "event", "s3bubble.init", "video.code", settings.options.code),
		    ga("s3bubble.send", "event", "s3bubble.init", "video.bucket", settings.options.bucket),
		    ga("s3bubble.send", "event", "s3bubble.init", "video.title", s3bubbleHelpers.s3bubbleCleanFilename(settings.meta.title)),
		    ga("s3bubble.send", "event", "s3bubble.init", "video.key", settings.options.key),
		    ga("s3bubble.send", "event", "s3bubble.init", "video.vpaid", settings.options.vpaid),
		    (video = document.createElement("video")).className = "video-js vjs-default-skin",
		    video.crossorigin = "anonymous",
		    video.setAttribute("playsinline", !0),
		    video.setAttribute("webkit-playsinline", !0),
		    video.addEventListener("contextmenu", function(e) {
                        e.preventDefault()
                    }, !1),
		    videojs.hasClass(div, "s3bubbble-prepare-16-9") && (video.style.position = "absolute",
									video.style.top = "0px"),
		    settings.options.background && (video.className = "video-js vjs-s3bubble-background"),
		    video.controls = settings.options.controls,
		    video.muted = settings.options.muted,
		    video.preload = settings.options.preload,
		    s3bubbleHelpers.isMobile() && (video.poster = settings.source.poster), div.appendChild(video),
		    s3bubbleHelpers.swipedetect(div, function(swipedir) {
                        "right" === swipedir && window.history.back()
                    });

                    var videoOptions = {
//			techOrder: ["youtube", "vimeo", "dailymotion"],
  //                      sources: [{
                            // type: "video/" + service.type,
                            // src: settings.codes[settings.index]
//                        }],
                        autoplay: settings.options.autoplay,
                        playbackRates: settings.options.playbackRates,
                        loop: settings.options.loop,
                        nativeControlsForTouch: !1,
                        plugins: {
                            chromecast: {
                                appId: settings.options.hasOwnProperty("chromecast") ? settings.options.chromecast : "E14DC85B"
                            }
                        }
                    };
		    if(settings.options.youtube) {
			videoOptions.techOrder = ["youtube", "vimeo", "dailymotion"];
			settings.source.type = 'video/youtube';
			settings.source.src = 'https://www.youtube.com/watch?v=' + settings.options.code;
			settings.poster = 'https://img.youtube.com/vi/' + settings.options.code + '/maxresdefault.jpg'
		    }
		    console.log('videoOptions:');console.log(videoOptions);
                    settings.options.hasOwnProperty("width") && (videoOptions.width = settings.options.width), settings.options.hasOwnProperty("height") && (videoOptions.height = settings.options.height), settings.options.hasOwnProperty("height") || settings.options.hasOwnProperty("width") || (settings.options.hasOwnProperty("aspect") ? video.classList.add("vjs-" + settings.options.aspect) : video.classList.add("vjs-16-9")), settings.options.fluid && video.classList.add("vjs-s3bubble-fullscreen");
                    var sources = [];
                    sources.push(settings.source),

		    "video/quicktime" === settings.source.type && (settings.source.type = "video/mp4");			
		    "application/x-mpegURL" === settings.source.type && settings.hasOwnProperty("fallback") && sources.push(settings.fallback),
		    videoOptions.sources = sources,
		    player = videojs(video, videoOptions, function() {
			this.muted(settings.options.muted);
			var _ifrm = jQuery('.streamium-featured-background iframe');
			if(_ifrm && _ifrm.length > 0) _ifrm[0].style.top = '';
                        this.one("durationchange", function() {
                            if (settings.hasOwnProperty("startTime")) {
                                var skipToPercentage = this.duration() / 100 * settings.startTime;
                                this.currentTime(Math.round(parseInt(skipToPercentage)))
                            }
                        }), settings.hasOwnProperty("popit") && this.popitPlugin(div, settings.popit), this.playlistPlugin(settings), this.airplayPlugin(), this.ga({
                            code: settings.options.code
                        }),
			// this.getThumbs(0), this.getCaptions(0),
			// this.s3BubbleMultiAdvertsLoad(settings),
			callback && callback(this)
                    }),

                    // var sources = [];
                    // sources.push(settings.source),

		    // "video/quicktime" === settings.source.type && (settings.source.type = "video/mp4");			
		    // "application/x-mpegURL" === settings.source.type && settings.hasOwnProperty("fallback") && sources.push(settings.fallback),
		    // player.src(sources),
		    player.lazyPlugin(video, settings.source.poster),
		    player.errorsPlugin(settings),
		    settings.source.hasOwnProperty("download") && "application/x-mpegURL" != settings.source.type && (settings.meta.download = settings.source.download),
		    player.s3BubbleMetaOverlay(settings.meta), player.brandPlugin(settings.brand),
		    player.s3BubbleMultiAdvertsInit(settings), settings.hasOwnProperty("playlist") || (player.previewPlugin(settings.preview), player.buttonsPlugin(settings.buttons));
                    var startEvent = settings.options.autoplay ? "loadedmetadata" : "click";
                    (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i)) && (startEvent = "touchend"),
		    player.one(startEvent, function(_event) {
                        this.vPaidPlugin(settings)
                    }), player.on("loadedmetadata", function(_event) {
                        this.ratesSwitcherPlugin(settings)
                    })// , player.getCaptions = function(ind) {
		    // 	return;
                    //     var that = this;
                    //     s3bubbleHelpers.getData({
                    //         uri: "captions",
                    //         code: settings.codes[ind]
                    //     }, function(_response) {
                    //         if (_response.error) console.log("ERROR: ", _response.message);
                    //         else {
                    //             if (!that.el()) return;
                    //             var captionsButton = that.el().getElementsByClassName("vjs-captions-button");
                    //             if (captionsButton.length > 0) {
                    //                 that.tech_.hasOwnProperty("textTracks_") && that.tech_.textTracks_.hasOwnProperty("tracks_") && (captionsButton[0].style.display = "none", that.tech_.textTracks_.tracks_ = []);
                    //                 var captions = _response.captions;
                    //                 if (captions.length > 0) {
                    //                     captionsButton[0].style.display = "block";
                    //                     for (var i = captions.length - 1; i >= 0; i--) that.addRemoteTextTrack({
                    //                         kind: "captions",
                    //                         language: captions[i].lang,
                    //                         label: captions[i].label,
                    //                         src: captions[i].src
                    //                     }, !0)
                    //                 }
                    //             }
                    //         }
                    //     })
                    // }
		    // , player.getThumbs = function(ind) {
		    // 	return;
                    //     var that = this;
                    //     s3bubbleHelpers.getData({
                    //         uri: "thumbs",
                    //         code: settings.codes[ind]
                    //     }, function(_response) {
                    //         if (_response.error) console.log("ERROR: ", _response.message);
                    //         else {
                    //             var thumbs = _response.thumbs,
                    //                 tu = [];
                    //             if (thumbs.length > 0)
                    //                 for (var i = thumbs.length - 1; i >= 0; i--) {
                    //                     var build = thumbs[i],
                    //                         element = {
                    //                             src: build.src
                    //                         };
                    //                     tu[build.time] = element
                    //                 }
                    //             that.thumbnails(tu)
                    //         }
                    //     })
                    // }, player.playlistSkip = function(ind) {
                    //     var that = this;
                    //     settings.index = ind;
                    //     var code = settings.codes.indexOf(ind); - 1 != code && (settings.index = code);
                    //     var getPlaylist = document.body.getElementsByClassName("vjs-s3bubble-playlist");
                    //     if (getPlaylist) {
                    //         var i, playlistChildren = getPlaylist[0].childNodes;
                    //         for (i = 0; i < playlistChildren.length; i++) parseInt(playlistChildren[i].getAttribute("id")) === parseInt(settings.index) ? videojs.addClass(playlistChildren[i], "vjs-selected") : videojs.removeClass(playlistChildren[i], "vjs-selected")
                    //     }
                    //     that.pause(), s3bubbleHelpers.getData({
                    //         uri: "player",
                    //         code: settings.codes[settings.index]
                    //     }, function(_response) {

                    //         _response.error ? console.log("ERROR: ", _response.message) : (settings.hasOwnProperty("playlist") ? (that.src(_response.source), that.load(), that.s3BubbleMultiAdvertsLoad(_response), that.getThumbs(settings.index), that.getCaptions(settings.index)) : (that.src(_response.source), that.load(), _response.source.hasOwnProperty("download") && "application/x-mpegURL" != _response.source.type && (_response.meta.download = _response.source.download), that.s3BubbleMetaOverlay(_response.meta), that.s3BubbleMultiAdvertsLoad(_response), that.updatePreview(_response.preview), that.getThumbs(settings.index), that.getCaptions(settings.index)), that.play())
                    //     })
                    // }, player.reload = function(ind) {
                    //     var that = this;
                    //     that.pause(), s3bubbleHelpers.getData({
                    //         uri: "player",
                    //         code: settings.codes[0]
                    //     }, function(_response) {
                    //         _response.error ? console.log("ERROR: ", _response.message) : (settings.hasOwnProperty("playlist") ? (that.src(_response.source), that.load(), that.getThumbs(settings.index), that.getCaptions(settings.index)) : (that.src(_response.source), that.load(), _response.source.hasOwnProperty("download") && "application/x-mpegURL" != _response.source.type && (_response.meta.download = _response.source.download), that.s3BubbleMetaOverlay(_response.meta), that.updatePreview(_response.preview), that.getThumbs(settings.index), that.getCaptions(settings.index)), that.play())
                    //     })
                    // }
                };
		var models = vidtop._models;
		options.hasOwnProperty("setIndex") &&
		    (int = parseInt(options.setIndex));
		s3bubbleHelpers.getData({
                    uri: "player",
                    code: options.codes[int]
                },_api_player_handle)
            } else console.log("ERROR: Please make sure your html div has a unique id element");
        else console.log("ERROR: Codes is a required option")
    }, s3bubble.service = function(options, callback) {
	console.log("s3bubble service")
	console.log("options:");console.log(options);
        var settings, video, player;
        if (options.hasOwnProperty("codes"))
            if ("string" == typeof options.codes && (options.codes = [options.codes]), div instanceof Element || (div = document.getElementById(div)), null !== div) {
                div.children.length > 0 && (console.log("Clean up..."), videojs(div.children[0]).dispose());
                var service = s3bubbleHelpers.getExternalService(options.codes[0]);
                void 0 !== service.type ? s3bubbleHelpers.getData({
                    uri: "globals"
                }, function(_response) {
                    if (_response.error) return video = document.createElement("video"), video.className = "video-js vjs-default-skin vjs-16-9", videojs.hasClass(div, "s3bubbble-prepare-16-9") && (video.style.position = "absolute", video.style.top = "0px"), div.appendChild(video), (player = videojs(video)).errorsPlugin({}), void player.error({
                        code: 7,
                        message: _response.message
                    });
                    (settings = s3bubbleHelpers.extend(_response, options)).index = 0, settings.length = 0, window.ga = window.ga || function() {
                        (ga.q = ga.q || []).push(arguments)
                    }, ga.l = +new Date, ga("create", settings.options.googleUaCode, "auto", "s3bubble"), ga("s3bubble.send", "pageview"), ga("s3bubble.send", "event", "s3bubble.service", "video.code", settings.codes[settings.index]), video = document.createElement("video"), settings.options.background ? video.className = "video-js vjs-s3bubble-background" : video.className = "video-js vjs-default-skin vjs-16-9 " + (settings.options.fluid ? "vjs-s3bubble-fullscreen " : " "), video.poster = settings.source.poster, video.controls = settings.options.controls,
		    console.log('muttttttttttttt:' + settings.options.muted),video.muted = settings.options.muted, video.preload = settings.options.preload, video.crossorigin = "anonymous", video.setAttribute("playsinline", !0), video.setAttribute("webkit-playsinline", !0), video.addEventListener("contextmenu", function(e) {
                        e.preventDefault()
                    }, !1), videojs.hasClass(div, "s3bubbble-prepare-16-9") && (video.style.position = "absolute", video.style.top = "0px"), div.appendChild(video), s3bubbleHelpers.swipedetect(div, function(swipedir) {
                        "right" === swipedir && window.history.back()
                    }), (_videoOptions = {
                        techOrder: ["youtube", "vimeo", "dailymotion"],
                        sources: [{
                            type: "video/" + service.type,
                            src: settings.codes[settings.index]
                        }],
                        autoplay: settings.options.autoplay,
                        playbackRates: settings.options.playbackRates,
                        loop: settings.options.loop,
                        nativeControlsForTouch: !1,
                        plugins: {
                            chromecast: {
                                appId: settings.options.hasOwnProperty("chromecast") ? settings.options.chromecast : "E14DC85B"
                            }
                        }
                    }, console.log(_videoOptions),player = videojs(video, _videoOptions, function() {
                        this.one("durationchange", function() {
                            if (settings.hasOwnProperty("startTime")) {
                                var skipToPercentage = this.duration() / 100 * settings.startTime;
                                this.currentTime(Math.round(parseInt(skipToPercentage)))
                            }
                        }), this.ga({
                            code: settings.codes[settings.index]
                        }), callback && callback(this)
                    })).brandPlugin(settings.brand), settings.hasOwnProperty("meta") && (settings.source.hasOwnProperty("download") && (settings.meta.download = settings.source.download), player.s3BubbleMetaOverlay(settings.meta)), player.on("ended", function() {
                        if (parseInt(settings.index) < settings.codes.length - 1) {
                            settings.index++;
                            var service = s3bubbleHelpers.getExternalService(settings.codes[settings.index]);
                            if (void 0 === service.type) return void console.log("ERROR: Please enter the full url");
                            var vimeoFrame = player.el().getElementsByClassName("vimeoFrame")[0];
                            void 0 !== vimeoFrame && (vimeoFrame.style.display = "youtube" === service.type ? "none" : "block"), this.src({
                                type: "video/" + service.type,
                                src: settings.codes[settings.index]
                            }), this.play()
                        }
                    })
                }) : console.log("ERROR: Please enter the full url")
            } else console.log("ERROR: Please make sure your html div has a unique id element");
        else console.log("ERROR: Codes is a required option")
    }, s3bubble.lazy = function(options, callback) {
        var settings, video, player;
        options.hasOwnProperty("code") ? (div instanceof Element || (div = document.getElementById(div)), null !== div ? (div.children.length > 0 && (console.log("Clean up..."), videojs(div.children[0]).dispose()), s3bubbleHelpers.getData({
            uri: "lazy",
            code: options.code,
            types: options.types
        }, function(_response) {
            if (_response.error) return video = document.createElement("video"), video.className = "video-js vjs-default-skin vjs-16-9", videojs.hasClass(div, "s3bubbble-prepare-16-9") && (video.style.position = "absolute", video.style.top = "0px"), div.appendChild(video), (player = videojs(video)).errorsPlugin({}), void player.error({
                code: 7,
                message: _response.message
            });
            (settings = s3bubbleHelpers.extend(_response, options)).index = 0, settings.length = 0, window.ga = window.ga || function() {
                (ga.q = ga.q || []).push(arguments)
            }, ga.l = +new Date, ga("create", settings.options.googleUaCode, "auto", "s3bubble"), ga("s3bubble.send", "pageview"), video = document.createElement("video"), settings.options.background ? video.className = "video-js vjs-s3bubble-background" : video.className = "video-js vjs-default-skin vjs-16-9 " + (settings.options.fluid ? "vjs-s3bubble-fullscreen " : " "), video.controls = settings.options.controls, video.muted = settings.options.muted, video.preload = settings.options.preload, video.crossorigin = "anonymous", video.setAttribute("playsinline", !0), video.setAttribute("webkit-playsinline", !0), video.addEventListener("contextmenu", function(e) {
                e.preventDefault()
            }, !1), videojs.hasClass(div, "s3bubbble-prepare-16-9") && (video.style.position = "absolute", video.style.top = "0px"), s3bubbleHelpers.isMobile() && (video.poster = settings.source.poster), div.appendChild(video), s3bubbleHelpers.swipedetect(div, function(swipedir) {
                "right" === swipedir && window.history.back()
            }), (player = videojs(video, {
                autoplay: settings.options.autoplay,
                playbackRates: settings.options.playbackRates,
                loop: settings.options.loop,
                nativeControlsForTouch: !1,
                plugins: {
                    chromecast: {
                        appId: settings.options.hasOwnProperty("chromecast") ? settings.options.chromecast : "E14DC85B"
                    }
                }
            }, function() {
                callback && callback(this)
            })).playlistPluginLazy(settings), player.brandPlugin(settings.brand), settings.hasOwnProperty("meta") && (settings.source.hasOwnProperty("download") && (settings.meta.download = settings.source.download), player.s3BubbleMetaOverlay(settings.meta)), player.lazyPlugin(video, settings.source.poster), player.src(_response.codes[0]), player.playlistSkip = function(ind) {
                var that = this;
                settings.index = ind;
                var code = settings.codes.indexOf(ind); - 1 != code && (settings.index = code), player.src(settings.codes[ind]);
                var getPlaylist = that.el().getElementsByClassName("vjs-s3bubble-playlist-lazy");
                if (getPlaylist) {
                    var i, playlistChildren = getPlaylist[0].childNodes;
                    for (i = 0; i < playlistChildren.length; i++) parseInt(playlistChildren[i].getAttribute("id")) === parseInt(settings.index) ? videojs.addClass(playlistChildren[i], "vjs-selected") : videojs.removeClass(playlistChildren[i], "vjs-selected")
                }
                that.s3BubbleMetaOverlay(settings.codes[ind].meta), that.play()
            }, player.on("ended", function() {})
        })) : console.log("ERROR: Please make sure your html div has a unique id element")) : console.log("ERROR: Codes is a required option")
    }, s3bubble.live = function(options, callback) {
        var settings, video, player;
        options.hasOwnProperty("stream") ? (div instanceof Element || (div = document.getElementById(div)), null !== div ? (div.children.length > 0 && (console.log("Clean up..."), videojs(div.children[0]).dispose()), s3bubbleHelpers.getData({
            uri: "stream",
            code: options.stream
        }, function(_response) {
            if (_response.error) return video = document.createElement("video"), video.className = "video-js vjs-default-skin vjs-16-9", videojs.hasClass(div, "s3bubbble-prepare-16-9") && (video.style.position = "absolute", video.style.top = "0px"), div.appendChild(video), (player = videojs(video)).errorsPlugin({}), void player.error({
                code: 7,
                message: _response.message
            });
            var protocol = (settings = s3bubbleHelpers.extend(_response, options)).source.protocol,
                address = settings.source.address,
                stream = settings.source.stream;
            settings.source.streamer;
            window.ga = window.ga || function() {
                (ga.q = ga.q || []).push(arguments)
            }, ga.l = +new Date, ga("create", settings.options.googleUaCode, "auto", "s3bubble"), ga("s3bubble.send", "pageview"), ga("s3bubble.send", "event", "s3bubble.live", "video.code", stream), video = document.createElement("video"), settings.options.background ? video.className = "video-js vjs-s3bubble-background" : video.className = "video-js vjs-default-skin vjs-16-9 " + (settings.options.fluid ? "vjs-s3bubble-fullscreen " : " "), video.controls = settings.options.controls, video.muted = settings.options.muted, video.preload = settings.options.preload, video.crossorigin = "anonymous", video.setAttribute("playsinline", !0), video.setAttribute("webkit-playsinline", !0), video.addEventListener("contextmenu", function(e) {
                e.preventDefault()
            }, !1), videojs.hasClass(div, "s3bubbble-prepare-16-9") && (video.style.position = "absolute", video.style.top = "0px"), s3bubbleHelpers.isMobile() && (video.poster = settings.source.poster), div.appendChild(video), s3bubbleHelpers.swipedetect(div, function(swipedir) {
                "right" === swipedir && window.history.back()
            }), (player = videojs(video, {
                autoplay: settings.options.autoplay,
                nativeControlsForTouch: !1,
                plugins: {
                    chromecast: {
                        appId: settings.options.hasOwnProperty("chromecast") ? settings.options.chromecast : "E14DC85B"
                    }
                }
            }, function() {
                var removeProgress = this.el().getElementsByClassName("vjs-progress-control")[0];
                removeProgress.style.opacity = "0", this.el().getElementsByClassName("vjs-remaining-time-display")[0].innerHTML = "LIVE";
                var remainingTime = this.el().getElementsByClassName("vjs-remaining-time")[0];
                removeProgress.parentNode.insertBefore(remainingTime, removeProgress), this.airplayPlugin(), this.ga({
                    code: stream
                }), callback && callback(this)
            })).lazyPlugin(video, settings.source.poster), player.brandPlugin(settings.brand), "demand" === settings.type ? player.src(settings.source) : player.src({
                type: "application/x-mpegURL",
                src: protocol + "://" + address + "/hls/" + stream + ".m3u8"
            }), player.errorsPlugin(settings);
            var startEvent = settings.options.autoplay ? "loadedmetadata" : "click";
            (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i)) && (startEvent = "touchend"), player.one(startEvent, function(_event) {
                this.vPaidPlugin(settings)
            }), player.one("loadstart", function() {
                this.s3BubbleMetaOverlay(settings.meta)
            });
            var last_value = 0,
                offline_test = 0;
            player.on("timeupdate", function() {
                this.currentTime() === last_value ? (offline_test > 3 && (this.userActive(!0), this.el().getElementsByClassName("vjs-live-display")[0].innerHTML = "OFFLINE", offline_test = 0), offline_test++) : (offline_test = 0, this.el().getElementsByClassName("vjs-live-display")[0].innerHTML = "LIVE: HLS"), last_value = this.currentTime()
            })
        })) : console.log("ERROR: Please make sure your html div has a unique id element")) : console.log("ERROR: No address was sent")
    }, s3bubble.dragger = function(options) {
        function setBounds(element, x, y, w, h) {
            element.style.left = x + "px", element.style.top = y + "px", element.style.width = w + "px", element.style.height = w / 16 * 9 + 35 + "px"
        }

        function hintHide() {
            setBounds(divGhost, b.left, b.top, b.width, b.height), divGhost.style.opacity = 0
        }

        function onDown(e) {
            calc(e);
            var isResizing = rightEdge || bottomEdge || topEdge || leftEdge;
            settings.clicked = {
                x: x,
                y: y,
                cx: e.clientX,
                cy: e.clientY,
                w: b.width,
                h: b.height,
                isResizing: isResizing,
                isMoving: !isResizing && canMove(),
                topEdge: topEdge,
                leftEdge: leftEdge,
                rightEdge: rightEdge,
                bottomEdge: bottomEdge
            }
        }

        function canMove() {
            return x > 0 && x < b.width && y > 0 && y < b.height && y < 30
        }

        function calc(e) {
            b = div.getBoundingClientRect(), x = e.clientX - b.left, y = e.clientY - b.top, topEdge = y < settings.margin, leftEdge = x < settings.margin, rightEdge = x >= b.width - settings.margin, bottomEdge = y >= b.height - settings.margin, rightScreenEdge = window.innerWidth - settings.margin, bottomScreenEdge = window.innerHeight - settings.margin
        }

        function onMove(ee) {
            calc(ee), e = ee, settings.redraw = !0
        }

        function animate() {
            if (requestAnimationFrame(animate), settings.redraw)
                if (settings.redraw = !1, settings.clicked && settings.clicked.isResizing) {
                    if (settings.clicked.rightEdge && (div.style.width = Math.max(x, settings.minWidth) + "px"), settings.clicked.bottomEdge && (div.style.height = Math.max(x / 16 * 9 + 35, settings.minHeight) + "px"), settings.clicked.leftEdge) {
                        var currentWidth = Math.max(settings.clicked.cx - e.clientX + settings.clicked.w, settings.minWidth);
                        currentWidth > settings.minWidth && (div.style.width = currentWidth + "px", div.style.height = currentWidth / 16 * 9 + 35 + "px", div.style.left = e.clientX + "px")
                    }
                    hintHide()
                } else {
                    if (settings.clicked && settings.clicked.isMoving) return b.top < settings.fullMargin || b.left < settings.fullMargin || b.right > window.innerWidth - settings.fullMargin || b.bottom > window.innerHeight - settings.fullMargin ? (setBounds(divGhost, 0, 0, window.innerWidth, window.innerHeight), divGhost.style.opacity = .2) : b.top < settings.margin ? (setBounds(divGhost, 0, 0, window.innerWidth, window.innerHeight / 2), divGhost.style.opacity = .2) : b.left < settings.margin ? (setBounds(divGhost, 0, 0, window.innerWidth / 2, window.innerHeight), divGhost.style.opacity = .2) : b.right > rightScreenEdge ? (setBounds(divGhost, window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight), divGhost.style.opacity = .2) : b.bottom > bottomScreenEdge ? (setBounds(divGhost, 0, window.innerHeight / 2, window.innerWidth, window.innerWidth / 2), divGhost.style.opacity = .2) : hintHide(), preSnapped ? void setBounds(div, e.clientX - preSnapped.width / 2, e.clientY - Math.min(settings.clicked.y, preSnapped.height), preSnapped.width, preSnapped.height) : (div.style.top = e.clientY - settings.clicked.y + "px", void(div.style.left = e.clientX - settings.clicked.x + "px"));
                    rightEdge && bottomEdge || leftEdge && topEdge ? div.style.cursor = "nwse-resize" : rightEdge && topEdge || bottomEdge && leftEdge ? div.style.cursor = "nesw-resize" : rightEdge || leftEdge ? div.style.cursor = "ew-resize" : bottomEdge || topEdge ? div.style.cursor = "ns-resize" : canMove() ? div.style.cursor = "move" : div.style.cursor = "default"
                }
        }

        function onUp(e) {
            if (calc(e), settings.clicked && settings.clicked.isMoving) {
                var snapped = {
                    width: b.width,
                    height: b.height
                };
                b.top < settings.fullMargin || b.left < settings.fullMargin || b.right > window.innerWidth - settings.fullMargin || b.bottom > window.innerHeight - settings.fullMargin ? (setBounds(div, 0, 0, window.innerWidth, window.innerHeight), preSnapped = snapped) : b.top < settings.margin ? (setBounds(div, 0, 0, window.innerWidth, window.innerHeight / 2), preSnapped = snapped) : b.left < settings.margin ? (setBounds(div, 0, 0, window.innerWidth / 2, window.innerHeight), preSnapped = snapped) : b.right > rightScreenEdge ? (setBounds(div, window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight), preSnapped = snapped) : b.bottom > bottomScreenEdge ? (setBounds(div, 0, window.innerHeight / 2, window.innerWidth, window.innerWidth / 2), preSnapped = snapped) : preSnapped = null, hintHide()
            }
            settings.clicked = null
        }
        var rightEdge, bottomEdge, leftEdge, topEdge, rightScreenEdge, bottomScreenEdge, preSnapped, b, x, y, defaults = {
                title: "Drag, Resize, Snap",
                fullMargin: -10,
                margin: 4,
                clicked: null,
                width: 300,
                minWidth: 300,
                minHeight: 204,
                position: "bottomRight",
                redraw: !1
            },
            settings = s3bubbleHelpers.extend(defaults, options),
            title = document.createElement("h2");
        title.innerHTML = settings.title, div.insertBefore(title, div.childNodes[0]), div.style.width = defaults.width + "px", div.style.height = defaults.width / 16 * 9 + 35 + "px", "bottomRight" === settings.position && (div.style.bottom = "10px", div.style.right = "10px"), "bottomLeft" === settings.position && (div.style.bottom = "10px", div.style.left = "10px"), "topRight" === settings.position && (div.style.top = "10px", div.style.right = "10px"), "topLeft" === settings.position && (div.style.top = "10px", div.style.left = "10px"), div.style.display = "block", document.body.appendChild(div);
        var divGhost = document.createElement("div");
        divGhost.className = "s3bubble-dragger-ghost", document.body.appendChild(divGhost), div.addEventListener("mousedown", function(e) {
            onDown(e), e.preventDefault()
        }), document.addEventListener("mousemove", onMove), document.addEventListener("mouseup", onUp), div.addEventListener("touchstart", function(e) {
            console.log("onTouchDown", e.touches[0]), onDown(e.touches[0]), e.preventDefault()
        }), document.addEventListener("touchmove", function(e) {
            console.log("onTouchMove", e.touches[0]), onMove(e.touches[0])
        }), document.addEventListener("touchend", function(e) {
            0 == e.touches.length && onUp(e.changedTouches[0])
        });
        var e;
        animate()
    }, s3bubble
}
var s3bubbleHelpers = s3bubbleGlobals();
