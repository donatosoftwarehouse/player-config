/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable no-redeclare */
window.Codo = function (sel) {
  'use strict';
  var el = [];
  if (sel) {
    if (typeof sel === 'string') {
      el = document.querySelectorAll(sel);
    } else {
      el.push(sel);
    }
  }
  return {
    get: function () {
      return el;
    },
    domReady: function (cb) {
      if (!cb) {
        return;
      }
      if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', cb);
      } else {
        document.attachEvent('onreadystatechange', function () {
          if (document.readyState === 'interactive') {
            cb();
          }
        });
      }
    },
    script: function (src, cb, passObj) {
      //var isLoaded = false;
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.onreadystatechange = function (isLoaded) {
        if (
          (this.readyState == 'complete' || this.readyState == 'loaded') &&
          !isLoaded
        ) {
          if (cb) {
            cb(true, passObj);
          }
          isLoaded = true;
        }
      };
      s.onload = function () {
        if (cb) {
          cb(true, passObj);
        }
      };
      s.onerror = function () {
        if (cb) {
          cb(false, passObj);
        }
      };
      s.src = src;
      document.getElementsByTagName('head')[0].appendChild(s);
    },
    link: function (src) {
      var l = document.createElement('link');
      l.rel = 'stylesheet';
      l.type = 'text/css';
      l.href = src;
      document.getElementsByTagName('head')[0].appendChild(l);
    },
    load: function (obj, cb, passObj) {
      var request = new XMLHttpRequest();
      request.open(obj.action || 'GET', obj.url, true);
      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 400) {
            // Success!
            if (el[0]) {
              el[0].innerHTML = this.responseText;
            } else {
              cb(this.responseText, passObj);
              return this.responseText;
            }
          } else {
            cb('error', passObj);
          }
        }
      };
      if (obj.contentType) {
        request.setRequestHeader('Content-Type', obj.contentType);
      }
      request.send();
    },
    on: function (act, cb, bbl) {
      if (!el[0]) {
        return;
      }
      for (var i = 0; i < el.length; i++) {
        if (el[i].addEventListener) {
          el[i].addEventListener(act, cb, bbl || false);
        } else {
          el[i].attachEvent('on' + act, cb);
        }
      }
      return el;
    },
    off: function (act, cb) {
      if (!el[0]) {
        return;
      }
      for (var i = 0; i < el.length; i++) {
        if (el[i].removeEventListener) {
          el[i].removeEventListener(act, cb);
        } else {
          el[i].detachEvent('on' + act, cb);
        }
      }
      return el;
    },
    add: function (obj) {
      if (!el[0]) {
        return;
      }
      var elem = [];
      for (var i = 0; i < el.length; i++) {
        var newEl = document.createElement(obj.el);
        for (var key in obj) {
          if (key != 'el') {
            if (newEl.key) {
              newEl.key = obj[key];
            } else if (key == 'className') {
              newEl.className = obj[key];
            } else if (key == 'style') {
              newEl.style.cssText = obj[key];
            } else if (key == 'innerHTML') {
              newEl.innerHTML = obj[key];
            } else {
              newEl.setAttribute(key, obj[key]);
            }
          }
        }
        if (el[i]) {
          el[i].appendChild(newEl);
        }
      }
      return newEl;
    },
    remove: function () {
      if (!el[0]) {
        return;
      }
      for (var i = 0; i < el.length; i++) {
        el[i].parentNode.removeChild(el[i]);
        el[i] = undefined;
      }
    },
    addClass: function (clsName) {
      if (!el[0]) {
        return;
      }
      for (var i = 0; i < el.length; i++) {
        if (el[i].classList) {
          el[i].classList.add(clsName);
        } else {
          el[i].className += ' ' + clsName;
        }
      }
    },
    removeClass: function (clsName) {
      if (!el[0]) {
        return;
      }
      for (var i = 0; i < el.length; i++) {
        if (el[i].classList) {
          el[i].classList.remove(clsName);
        } else {
          el[i].className = el[i].className.replace(
            new RegExp(
              '(^|\\b)' + clsName.split(' ').join('|') + '(\\b|$)',
              'gi'
            ),
            ' '
          );
        }
      }
    },
    toggle: function () {
      if (!el[0]) {
        return;
      }
      if (el[0].style.display == 'block') {
        el[0].style.display = 'none';
      } else {
        el[0].style.display = 'block';
      }
    },
    getTop: function () {
      if (!el[0]) {
        return;
      }
      return el[0].getBoundingClientRect().top;
    },
    getLeft: function () {
      if (!el[0]) {
        return;
      }
      return el[0].getBoundingClientRect().left;
    },
    getWidth: function () {
      if (!el[0]) {
        return;
      }
      return el[0].clientWidth || el[0].offsetWidth;
    },
    getHeight: function () {
      if (!el[0]) {
        return;
      }
      return el[0].clientHeight || el[0].offsetHeight;
    },
    screen: function () {
      var obj = {};
      obj.width = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      obj.height = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );
      return obj;
    },
    scrollX: function () {
      return window.pageXOffset !== undefined
        ? window.pageXOffset
        : (document.documentElement || document.parentNode || document)
            .scrollLeft;
    },
    scrollY: function () {
      return window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement || document.parentNode || document)
            .scrollTop;
    },
    mouse: function (e) {
      e = e || window.event;
      var pageX = e.pageX;
      var pageY = e.pageY;
      if (pageX === undefined) {
        pageX =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        pageY =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }
      var obj = {};
      obj.x = pageX;
      obj.y = pageY;
      return obj;
    },
    fadeIn: function (len, pos) {
      if (!el[0]) {
        return;
      }
      var cnt = 0;
      len = len || 2;
      pos = pos || 100;
      el[0].style.display = 'block';
      el[0].style.visibility = 'visible';
      var tick = function () {
        cnt += len;
        el[0].style.opacity = cnt / 100;
        el[0].style.filter = 'alpha(opacity=' + cnt + ')';
        if (cnt < pos) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
            setTimeout(tick, 16);
        }
      };
      tick();
    },
    fadeOut: function (len, pos) {
      if (!el[0]) {
        return;
      }
      var cnt = 100;
      len = len || 2;
      pos = pos || 0;
      var tick = function () {
        cnt -= len;
        el[0].style.opacity = cnt / 100;
        el[0].style.filter = 'alpha(opacity=' + cnt + ')';
        if (cnt > pos) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
            setTimeout(tick, 16);
        } else {
          el[0].style.display = 'none';
        }
      };
      tick();
    },
    log: function (msg) {
      if (window.console) {
        console.log(msg);
      }
    },
    isTouch: function () {
      return !!('ontouchstart' in window);
    },
    isMobile: function () {
      if (
        /webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      }
    },
    isIphone: function () {
      return navigator.userAgent.match(/iPhone|iPod/i);
    },
    // isAndroidOrWindows: function() {
    //     return navigator.userAgent.match(/Android|IEMobile/i);
    // },
    isFlash: function () {
      var support = false;
      //   if ('ActiveXObject' in window) {
      //     try {
      //       support = !!new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
      //     } catch (e) {
      //       support = false;
      //     }
      //   } else {
      //     support = !!navigator.mimeTypes['application/x-shockwave-flash'];
      //   }
      return support;
    },
    p: function () {
      return location.protocol;
    },
    h: function () {
      return location.hostname;
    },
    getScriptTag: function (file) {
      var arr = document.scripts;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].attributes.src) {
          if (arr[i].attributes.src.value.search(file) > -1) {
            return arr[i];
          }
        }
      }
    },
    getVideoHeight: function (nW, vW, vH) {
      return nW / (vW / vH);
    },
    secsToTime: function (secs) {
      var seper1 = ':',
        seper2 = ':';
      var hours = Math.floor(secs / (60 * 60));
      if (hours < 10) {
        hours = '0' + hours;
      }
      if (hours === '00') {
        hours = '';
        seper1 = '';
      }
      var divisor_for_minutes = secs % (60 * 60);
      var minutes = Math.floor(divisor_for_minutes / 60);
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      var divisor_for_seconds = divisor_for_minutes % 60;
      var seconds = Math.round(divisor_for_seconds);
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return hours + seper1 + minutes + seper2 + seconds;
    }
  };
};
if (!document.querySelectorAll) {
  (function (d, s) {
    (d = document), (s = d.createStyleSheet());
    d.querySelectorAll = function (r, c, i, j, a) {
      (a = d.all),
        (c = []),
        (r = r.replace(/\[for\b/gi, '[htmlFor').split(','));
      for (i = r.length; i--; ) {
        s.addRule(r[i], 'k:v');
        for (j = a.length; j--; ) {
          a[j].currentStyle.k && c.push(a[j]);
        }
        s.removeRule(0);
      }
      return c;
    };
  })();
}
window.window.CodoPlayerAPI = [];
window.CodoPlayer = function (playlistObj, settingsObj, placeHolder) {
  'use strict';
  // Instance object
  function Instance(_playlistObj, _settingsObj, _placeHolder) {
    // Defaults
    if (!playlistObj) {
      playlistObj = {};
    }
    if (!settingsObj) {
      settingsObj = {};
    }
    if (!settingsObj.controls) {
      settingsObj.controls = {};
    }

    var clips;

    var clickType = window.Codo().isTouch() ? 'touchstart' : 'click';

    var l = (function () {
      var h = window.Codo().h(),
        p = window.Codo().p();
      var l = [
          [108, 111, 99, 97, 108, 104, 111, 115, 116],
          [49, 50, 55, 46, 48, 46, 48, 46, 49],
          ['{{DOMAIN_MARKER}}'],
          [102, 105, 108, 101]
        ],
        ls = ['', '', '', ''];
      for (var i = 0; i < l[0].length; i++) {
        ls[0] += String.fromCharCode(l[0][i]);
      }
      for (var i = 0; i < l[1].length; i++) {
        ls[1] += String.fromCharCode(l[1][i]);
      }
      for (var i = 0; i < l[2].length; i++) {
        ls[2] += String.fromCharCode(l[2][i]);
      }
      for (var i = 0; i < l[3].length; i++) {
        ls[3] += String.fromCharCode(l[3][i]);
      }
      return h.search(ls[0]) > -1 ||
        h.search(ls[1]) > -1 ||
        h.search(ls[2]) > -1 ||
        p.search(ls[3]) > -1
        ? true
        : false;
    })();

    var logoSrc = '';
    var System = function (settingsObj) {
      // ID, Class
      var id,
        className = 'codo-player';
      if (settingsObj.id) {
        id = settingsObj.id;
      } else {
        id = 'codo-player-' + window.CodoPlayerAPI.length;
      }
      //   var rootPath = window
      //     .Codo()
      //     .getScriptTag('CodoPlayer.js')
      //     .src.replace('CodoPlayer.js', '');
      // System obj
      var rootPath = '';
      var system = {
        instance: window.CodoPlayerAPI.length,
        id: id,
        className: className,
        DOM: {
          parent: undefined,
          container: undefined,
          containerScreen: undefined,
          containerScreenCanvas: undefined,
          overlay: undefined,
          controls: undefined
        },
        settings: {
          responsive: (function () {
            return settingsObj.responsive;
          })(),
          style: settingsObj.style || 'standard',
          ratio: settingsObj.ratio || [16, 9],
          width: !settingsObj.responsive && settingsObj.width,
          height: !settingsObj.responsive && settingsObj.height,
          currentWidth: undefined,
          currentHeight: undefined,
          mediaWidth: undefined,
          mediaHeight: undefined,
          autoplay: settingsObj.autoplay,
          poster: settingsObj.poster,
          volume: (function () {
            return settingsObj.volume === 0
              ? 0
              : (function () {
                  if (!settingsObj.volume) {
                    return 80;
                  } else {
                    return settingsObj.volume;
                  }
                })();
          })(),
          loop: settingsObj.loop,
          preload: (function () {
            if (window.Codo().isTouch()) {
              return true;
            } else {
              return settingsObj.preload === false ? false : true;
            }
          })(),
          engine: settingsObj.engine || 'auto',
          loader: settingsObj.loader || rootPath + 'loader.gif',
          logo: settingsObj.logo,
          cuepoints: settingsObj.cuepoints,
          playlist: settingsObj.playlist,
          priority: settingsObj.priority || 'src'
        },
        playlist: {},
        about: {
          product: '{{name}} {{kind}} {{version}}' // pro
        },
        media: {},
        system: {
          initClickMade: false,
          firstClipOver: false,
          initPlayMade: false,
          isFullScreen: false,
          rootPath: rootPath
        },
        plugins: settingsObj.plugins || {},
        play: function (_playlistObj, _autoplay) {
          if (_playlistObj) {
            system.playlist.set(_playlistObj, _autoplay);
          } else {
            if (!system.settings.preload) {
              if (!system.system.initClickMade) {
                system.media.toggle();
                if (window.Codo().isTouch()) {
                  system.media.getParent().play();
                }
              } else {
                system.media.toggle();
              }
              system.system.initClickMade = true;
            } else {
              system.media.toggle();
            }
          }
        },
        pause: function () {
          system.media.pause();
        },
        resize: function (w, h) {
          if (w && h) {
            system.settings.width = system.settings.currentWidth = w;
            system.settings.height = system.settings.currentHeight = h;
          } else {
            if (system.settings.mediaWidth && system.settings.mediaHeight) {
              system.settings.width = system.settings.currentWidth = window
                .Codo(system.DOM.parent.parentNode)
                .getWidth();
              system.settings.height = system.settings.currentHeight = window
                .Codo()
                .getVideoHeight(
                  system.settings.width,
                  system.settings.mediaWidth,
                  system.settings.mediaHeight
                );
            }
          }
          if (system.media.getPoster || system.media.getParent) {
            if (system.settings.mediaWidth && system.settings.mediaHeight) {
              util.resize(
                system.media.getPoster(),
                system.settings.mediaWidth,
                system.settings.mediaHeight
              );
              util.resize(
                system.media.getParent(),
                system.settings.mediaWidth,
                system.settings.mediaHeight
              );
            }
          } else {
            util.resize(
              null,
              system.settings.currentWidth,
              system.settings.currentHeight
            );
          }
        },
        destroy: function () {
          // system.media.destroy();
          window.Codo(parent).remove();
          for (var i = 0; i < window.CodoPlayerAPI.length; i++) {
            if (window.CodoPlayerAPI[i].instance === system.instance) {
              window.CodoPlayerAPI.splice(system.instance, 1);
            }
          }
        },
        onReady: settingsObj.onReady
      };
      // System controls obj
      system.settings.controls = {
        hideDelay: settingsObj.controls.hideDelay || 5,
        fadeDelay: settingsObj.controls.fadeDelay || 20,
        show: (function () {
          var show = settingsObj.controls.show || 'auto';
          if (window.Codo().isTouch()) {
            show = 'never';
          }
          if (window.Codo().isMobile()) {
            show = 'never';
          }
          if (window.Codo().isTouch() && !window.Codo().isMobile()) {
            show = 'always';
          }
          return show;
        })(),
        all: (function () {
          return settingsObj.controls.all === false ? false : true;
        })(),
        play: (function () {
          return settingsObj.controls.play === false ? false : true;
        })(),
        seek: (function () {
          return settingsObj.controls.seek === false ? false : true;
        })(),
        seeking: (function () {
          return settingsObj.controls.seeking === false ? false : true;
        })(),
        volume: (function () {
          if (window.Codo().isTouch()) {
            return;
          }
          if (settingsObj.controls.volume) {
            return settingsObj.controls.volume;
          } else if (settingsObj.controls.volume !== false) {
            return 'horizontal';
          }
        })(),
        fullscreen: (function () {
          return settingsObj.controls.fullscreen === false ||
            window.Codo().isMobile()
            ? false
            : true;
        })(),
        title: (function () {
          return settingsObj.controls.title === false ? false : true;
        })(),
        time: (function () {
          return settingsObj.controls.time === false ? false : true;
        })(),
        hd: (function () {
          return settingsObj.controls.hd === false ? false : true;
        })(),
        playBtn: (function () {
          if (window.Codo().isMobile()) {
            return false;
          } else {
            return settingsObj.controls.playBtn === false ? false : true;
          }
        })(),
        loadingText: settingsObj.controls.loadingText || 'Loading...',
        foreColor: settingsObj.controls.foreColor || 'white',
        backColor: settingsObj.controls.backColor || '#454545',
        bufferColor: settingsObj.controls.bufferColor || '#666666',
        progressColor: settingsObj.controls.progressColor || '#ff0000'
      };

      return system;
    };
    var onBeforeLoadCallBk = [];
    var onLoadCallBk = [];
    var onMetaDataCallBk = [];
    var onPlayCallBk = [];
    var onPauseCallBk = [];
    var onEndCallBk = [];
    var onProgressCallBk = [];
    var onBufferCallBk = [];
    var onSeekStartCallBk = [];
    var onSeekEndCallBk = [];
    var onVolumeChange = [];
    var onFullScreenEnterCallBk = [];
    var onFullScreenExitCallBk = [];
    var onErrorCallBk = [];
    var onClipBegin = [];
    var onClipFirstQuarter = [];
    var onClipSecondQuarter = [];
    var onClipThirdQuarter = [];
    var onClipEnd = [];
    var onCuepoint = [];

    var Controller = function () {
      function Set(_clip, _autoplay, _key) {
        if (!_clip) {
          return;
        }

        _key = _key || _clip.priority;

        if (errorCtrl) {
          errorCtrl.off();
        }
        if (controls) {
          controls.reset();
          controls.pause();
          controls.title(system.settings.controls.loadingText);
          controls.setVolume(system.settings.volume);
          if (system.settings.controls.hd) {
            if (!_clip['src'] || !_clip['srcHD']) {
              _key = 'src';
              controls.hd.off();
              controls.hd.hide();
            } else if (_clip['src'] && _clip['srcHD']) {
              controls.hd.show();
              if (_key === 'srcHD') {
                controls.hd.on();
              } else {
                controls.hd.off();
              }
            }
          }
          controls.on();
        }

        if (loader) {
          loader.on();
        }

        if (_clip) {
          _clip.engine = _clip.engine || 'auto';
          if (_clip[_key]) {
            if (_clip[_key].length > 0) {
              for (var i = 0; i < _clip[_key].length; i++) {
                var src = _clip[_key][i];
                if (_clip.engine == 'youtube') {
                  _clip.activeUrl = src;
                  _clip.platformName = 'YOUTUBE';
                  _clip.mediaType = 'video';
                  if (_clip.platformName != system.media.platformName) {
                    if (system.media.destroy) {
                      system.media.destroy();
                    }
                    system.media = new YOUTUBE(
                      _clip,
                      _clip.mediaType,
                      _autoplay,
                      _key
                    );
                  } else {
                    system.media.play(_clip, _autoplay, _key);
                  }
                  return;
                }
                if (_clip.rtmp) {
                  _clip.engine = 'flash';
                  _clip.activeUrl = src;
                  _clip.platformName = 'videoSWF';
                  _clip.mediaType = 'video';
                  if (_clip.platformName != system.media.platformName) {
                    if (system.media.destroy) {
                      system.media.destroy();
                    }
                    system.media = new SWF(
                      _clip,
                      _clip.mediaType,
                      _autoplay,
                      _key
                    );
                  } else {
                    system.media.play(_clip, _autoplay, _key);
                  }
                  return;
                }
                var v = document.createElement('video');
                var s = document.createElement('audio');
                var ext = src.match(/\.[0-9a-z]+$/i);
                ext = ext ? ext[0].replace('.', '') : 'mp4';

                if (v.canPlayType) {
                  if (
                    v.canPlayType('video/' + ext).length > 0 ||
                    ext == 'm3u8'
                  ) {
                    if (_clip.engine == 'html5' || _clip.engine == 'auto') {
                      _clip.activeUrl = src;
                      _clip.platformName = 'videoHTML5';
                      _clip.mediaType = 'video';
                      if (ext == 'm3u8') {
                        _clip.m3u8 = true;
                      }
                      if (_clip.platformName != system.media.platformName) {
                        if (system.media.destroy) {
                          system.media.destroy();
                        }
                        system.media = new HTML5(
                          _clip,
                          _clip.mediaType,
                          _autoplay,
                          _key
                        );
                      } else {
                        system.media.play(_clip, _autoplay, _key);
                      }
                      return;
                    }
                  } else if (s.canPlawindow.YType('audio/' + ext).length > 0) {
                    if (_clip.engine == 'html5' || _clip.engine == 'auto') {
                      _clip.activeUrl = src;
                      _clip.platformName = 'audioHTML5';
                      _clip.mediaType = 'audio';
                      if (_clip.platformName != system.media.platformName) {
                        if (system.media.destroy) {
                          system.media.destroy();
                        }
                        system.media = new HTML5(
                          _clip,
                          _clip.mediaType,
                          _autoplay,
                          _key
                        );
                      } else {
                        system.media.play(_clip, _autoplay, _key);
                      }
                      return;
                    }
                  }
                }
                if (ext == 'mp4' || ext == 'flv') {
                  if (_clip.engine == 'flash' || _clip.engine == 'auto') {
                    _clip.activeUrl = src;
                    _clip.platformName = 'videoSWF';
                    _clip.mediaType = 'video';
                    system.media = new SWF(
                      _clip,
                      _clip.mediaType,
                      _autoplay,
                      _key
                    );
                    // if(_clip.platformName != system.media.platformName) {
                    //     if (system.media.destroy) {
                    //         system.media.destroy();
                    //     }
                    //     system.media = new SWF(_clip, _clip.mediaType, _autoplay, _key);
                    // } else {
                    //     system.media.play(_clip, _autoplay, _key);
                    // }
                    return;
                  }
                } else if (ext == 'mp3' || ext == 'wav') {
                  if (_clip.engine == 'flash' || _clip.engine == 'auto') {
                    _clip.activeUrl = src;
                    _clip.platformName = 'audioSWF';
                    _clip.mediaType = 'audio';
                    if (_clip.platformName != system.media.platformName) {
                      if (system.media.destroy) {
                        system.media.destroy();
                      }
                      system.media = new SWF(
                        _clip,
                        _clip.mediaType,
                        _autoplay,
                        _key
                      );
                    } else {
                      system.media.play(_clip, _autoplay, _key);
                    }
                    return;
                  }
                }
              }
            }
          }
        }
        errorCtrl.on('source not recognized');
        for (var i = 0; i < onErrorCallBk.length; i++) {
          if (onErrorCallBk[i]) {
            onErrorCallBk[i]();
          }
        }
      }
      return {
        set: function (_clip, _autoplay, _key) {
          Set(_clip, _autoplay, _key);
        }
      };
    };
    var Playlist = function (system) {
      var playlist = {
        breakTime: '0',
        currentIndex: '0',
        set: function (_playlistObj, _autoplay, _index) {
          if (_index) {
            this.currentIndex = _index;
          } else {
            this.currentIndex = '0';
          }
          this.clips = Parse(_playlistObj);
          for (var i = 0; i < this.clips.length; i++) {
            if (this.clips[i].srcHD) {
              this.clips[i].srcHD = ParseHD(this.clips[i].srcHD);
            }
          }
          this.next(this.currentIndex, _autoplay);
        },
        next: function (_currentIndex, _autoplay) {
          this.breakTime = '0';
          if (!l && loader && loader.getImage().src.length != 4670) {
            errorCtrl.on();
            return;
          }
          if (
            _currentIndex &&
            _currentIndex >= 0 &&
            _currentIndex < this.clips.length
          ) {
            this.currentIndex = _currentIndex;
          } else {
            if (this.currentIndex < this.clips.length - 1) {
              this.currentIndex++;
            } else {
              this.currentIndex = '0';
            }
          }

          if (system.settings.playlist) {
            Draw();
          }
          controller.set(this.clips[this.currentIndex], _autoplay);
        },
        same: function (key) {
          this.breakTime = system.media.getCurrentTime
            ? system.media.getCurrentTime()
            : '0';
          controller.set(this.clips[this.currentIndex], 'autoplay', key);
        },
        getCurrentClip: function () {
          return this.clips[this.currentIndex];
        }
      };

      function Parse(source) {
        if (!source) {
          return;
        } else {
          var clips = [];

          if (typeof source == 'string') {
            clips.push({
              src: [source]
            });
          } else if (typeof source == 'object') {
            if (source[0]) {
              for (var i = 0; i < source.length; i++) {
                if (typeof source[i] == 'string') {
                  clips.push(source[i]);
                } else if (typeof source[i] == 'object') {
                  if (source[i].src) {
                    if (typeof source[i].src == 'string') {
                      clips.push(source[i]);
                      clips[clips.length - 1].src = [source[i].src];
                    } else if (source[i].src[0]) {
                      clips.push(source[i]);
                    }
                  }
                }
              }
            } else {
              if (source.src) {
                if (typeof source.src == 'string') {
                  clips.push(source);
                  clips[clips.length - 1].src = [source.src];
                } else if (source.src[0]) {
                  clips.push(source);
                }
              }
            }
          }

          for (i = 0; i < clips.length; i++) {
            clips[i].id = i;
            clips[i].hasPrevious = i !== 0 ? true : false;
            clips[i].hasNext = i < clips.length - 1 ? true : false;
            clips[i].poster = clips[i].poster || system.settings.poster;
            clips[i].engine = clips[i].engine || system.settings.engine;
            clips[i].rtmp = clips[i].rtmp || system.settings.rtmp;
            clips[i].cuepoints =
              clips[i].cuepoints || system.settings.cuepoints;
            clips[i].priority = clips[i].priority || system.settings.priority;
          }

          return clips;
        }
      }

      function ParseHD(source) {
        if (!source) {
          return false;
        } else {
          var tempArr = [],
            i;
          if (typeof source == 'string') {
            tempArr.push(source);
          } else if (typeof source == 'object') {
            if (source[0]) {
              for (i = 0; i < source.length; i++) {
                if (typeof source[i] == 'string') {
                  tempArr.push(source[i]);
                } else if (typeof source[i] == 'object') {
                  if (source[i].src) {
                    if (typeof source[i].src == 'string') {
                      tempArr.push(source[i]);
                      tempArr[tempArr.length - 1].src = [source[i].src];
                    } else if (source[i].src[0]) {
                      tempArr.push(source[i]);
                    }
                  }
                }
              }
            } else {
              if (source.src) {
                if (typeof source.src == 'string') {
                  tempArr.push(source);
                  tempArr[tempArr.length - 1].src = [source.src];
                } else if (source.src[0]) {
                  tempArr.push(source);
                }
              }
            }
          }
          return tempArr;
        }
      }

      var playlistWrap;
      function Draw(_currentIndex) {
        if (playlistWrap) {
          window.Codo(playlistWrap).remove();
        }
        playlistWrap = window.Codo(system.DOM.parent).add({
          el: 'div',
          className: system.className + '-playlist-wrap'
        });
        var ul = window.Codo(playlistWrap).add({
          el: 'ul',
          className: system.className + '-playlist-ul',
          style: 'position: relative; width: 100%;'
        });
        for (var i = 0; i < playlist.clips.length; i++) {
          var ulLi = window.Codo(ul).add({
            el: 'li',
            style: 'cursor: pointer; overflow: auto;'
          });
          var ulLiSpan1 = window.Codo(ulLi).add({
            el: 'span',
            className: system.className + '-playlist-ul-id',
            style: 'float: left;',
            innerHTML: playlist.clips[i].id + 1
          });
          var ulLiSpan2 = window.Codo(ulLi).add({
            el: 'span',
            className: system.className + '-playlist-ul-title',
            style: 'float: left;',
            innerHTML: playlist.clips[i].title || ''
          });
          // IE8 click fix
          ulLi.setAttribute('data-row', i);
          ulLiSpan1.setAttribute('data-row', i);
          ulLiSpan2.setAttribute('data-row', i);
          window.Codo(ulLi).on(clickType, function (e) {
            if (e.stopPropagation && e.preventDefault) {
              e.stopPropagation();
              e.preventDefault();
            }
            e = e || window.event;
            var target = e.target || e.srcElement;

            // If Advertising Plugin plays AD, skip loading another clip
            if (
              system.plugins &&
              system.plugins.advertising &&
              system.plugins.advertising.isAd
            ) {
              return;
            }

            system.system.initClickMade = true;
            system.playlist.next(target.getAttribute('data-row'), 'autoplay');
            if (window.Codo().isTouch()) {
              system.media.play();
            }
          });
        }
        var liArr = ul.getElementsByTagName('li');
        for (var i = 0; i < liArr.length; i++) {
          window
            .Codo(liArr[i])
            .removeClass(system.className + '-playlist-currentClip');
          if (liArr[i].getAttribute('data-row') == playlist.currentIndex) {
            window
              .Codo(liArr[i])
              .addClass(system.className + '-playlist-currentClip');
          }
        }
      }

      return playlist;
    };
    var Controls = function (system) {
      var controlsTimer, delayTimer;
      var isMouseOverScr = false;
      var mouseOverControls = false;
      var controlsAlpha = 100;
      var controlsInOut = function (act) {
        switch (act) {
          case 'in':
            clearTimeout(controlsTimer);
            clearTimeout(delayTimer);
            controlsAlpha = 100;
            wrap.style.opacity = controlsAlpha / 100;
            wrap.style.filter = 'alpha(opacity=' + controlsAlpha + ')';
            break;
          case 'out':
            delayTimer = setTimeout(function () {
              controlsTimer = setInterval(function () {
                if (controlsAlpha >= 0 && isMouseOverScr == false) {
                  wrap.style.opacity = controlsAlpha / 100;
                  wrap.style.filter = 'alpha(opacity=' + controlsAlpha + ')';
                  controlsAlpha -= 10;
                } else {
                  clearInterval(controlsTimer);
                  clearTimeout(delayTimer);
                }
              }, 20);
            }, system.settings.controls.hideDelay * 1000);
            break;
        }
      };

      var wrap = (system.DOM.controls = window.Codo(system.DOM.container).add({
        el: 'div',
        className: system.className + '-controls-wrap',
        style: 'display: none;'
      }));

      if (system.settings.controls.show != 'never') {
        wrap.style.display = 'block';
      }

      window.Codo(wrap).on('mouseover', function () {
        mouseOverControls = true;
      });
      window.Codo(wrap).on('mouseout', function () {
        mouseOverControls = false;
      });

      var controlShadeDiv = window.Codo(wrap).add({
        el: 'div',
        id: system.id + '-controls-shade',
        className: system.className + '-controls-shade'
      });
      var controlsDiv = window.Codo(wrap).add({
        el: 'div',
        id: system.id + '-controls',
        className: system.className + '-controls'
      });

      // Play button
      if (system.settings.controls.play) {
        var playBtn = window.Codo(controlsDiv).add({
          el: 'div',
          className: system.className + '-controls-play-button'
        });
        window.Codo(playBtn).on(clickType, function (e) {
          if (e.stopPropagation && e.preventDefault) {
            e.stopPropagation();
            e.preventDefault();
          }
          if (!system.media.toggle) {
            return;
          }
          if (!system.settings.preload) {
            if (!system.system.initClickMade) {
              system.media.toggle();
              if (window.Codo().isTouch()) {
                system.media.getParent().play();
              }
            } else {
              system.media.toggle();
            }
            system.system.initClickMade = true;
          } else {
            system.media.toggle();
          }
        });
      }
      // eo Play button

      // Title text
      if (system.settings.controls.title) {
        var controlTitle = window.Codo(controlsDiv).add({
          el: 'div',
          id: system.id + '-controls-title-text',
          className: system.className + '-controls-title-text'
        });
      }
      // eo Title text

      // Fullscreen button
      if (system.settings.controls.fullscreen) {
        var fullScrBtn = window.Codo(controlsDiv).add({
          el: 'div',
          className: system.className + '-controls-fullscreen-off-button'
        });

        window.Codo(fullScrBtn).on(clickType, function (e) {
          if (e.stopPropagation && e.preventDefault) {
            e.stopPropagation();
            e.preventDefault();
          }
          if (system.media.toggleFullScreen) {
            system.media.toggleFullScreen(e);
          }
        });
      }
      // eo Fullscreen button

      // Volume slider
      var volumeActive = false;
      if (system.settings.controls.volume) {
        var volumeWrap = window.Codo(controlsDiv).add({
          el: 'div',
          className:
            system.className +
            '-controls-volume-' +
            system.settings.controls.volume
        });
        var volumeBar = window.Codo(volumeWrap).add({
          el: 'div',
          className:
            system.className +
            '-controls-volume-' +
            system.settings.controls.volume +
            '-bar'
        });
        var volumeHandle = window.Codo(volumeBar).add({
          el: 'div',
          className: system.className + '-controls-volume-handle'
        });
        window.Codo(volumeWrap).on('mousedown', function (e) {
          volumeActive = true;
          MouseVolume(e);
        });
        window.Codo(volumeHandle).on('dblclick', function (e) {
          ToggleMute();
        });
      }

      var isMute, volumeMute;
      function ToggleMute() {
        if (!isMute) {
          Mute();
          isMute = true;
        } else {
          Unmute();
          isMute = false;
        }
      }

      function Mute() {
        volumeMute = system.media.getVolume();
        system.media.setVolume('0');
      }

      function Unmute() {
        system.media.setVolume(volumeMute);
      }

      function MouseVolume(e) {
        var fakeVol, realVol;
        if (system.settings.controls.volume == 'horizontal') {
          var mousePos = window.Codo().mouse(e).x;
          var wrapPos = window.Codo(volumeWrap).getLeft();
          var wrapSize = window.Codo(volumeWrap).getWidth();
          var fakeVol = Math.round(mousePos - wrapPos);
        } else if (system.settings.controls.volume == 'vertical') {
          var mousePos = window.Codo().mouse(e).y;
          var wrapPos = window.Codo(volumeWrap).getTop();
          var wrapSize = window.Codo(volumeWrap).getHeight();
          var fakeVol = Math.round(wrapPos - mousePos + wrapSize);
        }
        if (fakeVol >= 0 && fakeVol <= wrapSize) {
          realVol = Math.round((100 * fakeVol) / wrapSize);
          if (system.media.setVolume) {
            system.media.setVolume(realVol);
          }
        }
      }

      function SetVolume(vol) {
        if (system.media.isMetaDataLoaded && system.media.isMetaDataLoaded()) {
          if (system.settings.controls.volume && !window.Codo().isTouch()) {
            if (system.settings.controls.volume == 'horizontal') {
              var wrapSize = window.Codo(volumeWrap).getWidth();
            } else if (system.settings.controls.volume == 'vertical') {
              var wrapSize = window.Codo(volumeWrap).getHeight();
            }
            if (vol >= 0 && vol <= 100) {
              var slider = Math.round((wrapSize * vol) / 100);
              if (system.settings.controls.volume == 'horizontal') {
                volumeBar.style.width = slider + 'px';
              } else if (system.settings.controls.volume == 'vertical') {
                volumeBar.style.marginTop = wrapSize - slider + 'px';
                volumeBar.style.height = slider + 'px';
              }
            }
          }
        } else {
          if (system.settings.controls.volume == 'horizontal') {
            volumeBar.style.width = vol + '%';
          } else if (system.settings.controls.volume == 'vertical') {
            volumeBar.style.marginTop = wrapSize - vol + '%';
            volumeBar.style.height = vol + '%';
          }
        }
      }
      // eo Volume slider

      // HD text
      if (system.settings.controls.hd) {
        var HD = (function () {
          var state = system.settings.priority === 'srcHD' ? true : false;

          var hdText = window.Codo(controlsDiv).add({
            el: 'div',
            className: system.className + '-controls-hd-text',
            innerHTML: 'HD',
            style: 'display: none;'
          });
          window.Codo(hdText).on(clickType, function (e) {
            if (e.stopPropagation && e.preventDefault) {
              e.stopPropagation();
              e.preventDefault();
            }
            if (!state) {
              SetHD(true);
              state = true;
            } else {
              SetHD(false);
              state = false;
            }
          });

          function SetHD(_state) {
            if (_state) {
              window.Codo(hdText).addClass('active');
              system.playlist.getCurrentClip().priority = 'srcHD';
              system.playlist.same('srcHD');
              state = _state;
            } else {
              window.Codo(hdText).removeClass('active');
              system.playlist.getCurrentClip().priority = 'src';
              system.playlist.same('src');
              state = _state;
            }
          }
          return {
            on: function () {
              state = true;
              window.Codo(hdText).addClass('active');
            },
            off: function () {
              state = false;
              window.Codo(hdText).removeClass('active');
            },
            show: function () {
              hdText.style.display = 'block';
            },
            hide: function () {
              hdText.style.display = 'none';
            },
            setHD: function (_state) {
              SetHD(_state);
            }
          };
        })();
      }
      // eo HD text

      // Time text
      if (system.settings.controls.time) {
        var timeText = window.Codo(controlsDiv).add({
          el: 'div',
          className: system.className + '-controls-time-text',
          innerHTML:
            window.Codo().secsToTime(0) + ' / ' + window.Codo().secsToTime(0)
        });
      }
      // eo Time text

      // Seek slider
      var seekActive = false;
      if (system.settings.controls.seek) {
        var seekWrap = window.Codo(controlsDiv).add({
          el: 'div',
          className: system.className + '-controls-seek'
        });
        var seekBufferBar = window.Codo(seekWrap).add({
          el: 'div',
          className: system.className + '-controls-seek-buffer-bar',
          style: 'width: 0px;'
        });
        var seekProgressBar = window.Codo(seekWrap).add({
          el: 'div',
          className: system.className + '-controls-seek-progress-bar',
          style: 'width: 0px;'
        });
        var seekHandle = window.Codo(seekProgressBar).add({
          el: 'div',
          className: system.className + '-controls-seek-handle'
        });
        window.Codo(seekWrap).on('mousedown', function (e) {
          if (
            system.media.isMetaDataLoaded &&
            system.media.isMetaDataLoaded() &&
            system.settings.controls.seeking
          ) {
            seekActive = true;
            if (system.media.setCurrentTime) {
              system.media.setCurrentTime(controls.seek(e));
            }
          }
        });
      }
      // eo Seek slider

      window.Codo(document).on('mouseup', function (e) {
        volumeActive = false;
        if (seekActive && system.settings.controls.seeking) {
          if (system.media.setCurrentTime) {
            system.media.setCurrentTime(controls.seek(e));
          }
          seekActive = false;
        }
      });
      var thread;
      window.Codo(document).on('mousemove', function (e) {
        if (seekActive) {
          controls.seek(e);
        }
        if (volumeActive) {
          MouseVolume(e);
        }

        var mouseX = window.Codo().mouse(e).x - window.Codo().scrollX();
        var mouseY = window.Codo().mouse(e).y - window.Codo().scrollY();
        var top, left, right, bottom;
        if (fullscreen.getState()) {
          top = 0;
          left = 0;
          right = window.Codo().screen().width;
          bottom = window.Codo().screen().height;
        } else {
          top = window.Codo(system.DOM.container).getTop();
          left = window.Codo(system.DOM.container).getLeft();
          right = left + system.settings.currentWidth;
          bottom = top + system.settings.currentHeight;
        }
        if (
          mouseX >= left &&
          mouseX <= right &&
          mouseY >= top &&
          mouseY <= bottom
        ) {
          if (system.settings.controls.seek) {
            window.Codo(seekWrap).addClass('hover');
          }
          if (!isMouseOverScr && system.system.initClickMade) {
            isMouseOverScr = true;
            controlsInOut('in');
          }
          clearTimeout(thread);
          if (
            system.settings.controls.show != 'always' &&
            !mouseOverControls &&
            fullscreen.getState()
          ) {
            thread = setTimeout(function () {
              isMouseOverScr = false;
              controlsInOut('out');
            }, 500);
          }
        } else {
          if (system.settings.controls.seek) {
            window.Codo(seekWrap).removeClass('hover');
          }
          if (
            isMouseOverScr &&
            !mouseOverControls &&
            system.system.initClickMade
          ) {
            if (system.playlist.getCurrentClip()) {
              if (
                system.settings.controls.show != 'always' &&
                system.playlist.getCurrentClip().mediaType != 'audio'
              ) {
                isMouseOverScr = false;
                clearTimeout(thread);
                controlsInOut('out');
              }
            }
          }
        }
      });

      function SetValues() {
        if (system.settings.controls.time) {
          if (
            (system.playlist.getCurrentClip() &&
              system.playlist.getCurrentClip().rtmp) ||
            (system.playlist.getCurrentClip() &&
              system.playlist.getCurrentClip().m3u8)
          ) {
            timeText.innerHTML = 'LIVE';
          } else if (
            system.media.getCurrentTime() &&
            system.media.getDuration()
          ) {
            timeText.innerHTML =
              window.Codo().secsToTime(system.media.getCurrentTime()) +
              ' / ' +
              window.Codo().secsToTime(system.media.getDuration());
          }
        }
      }

      return {
        reset: function () {
          if (seekProgressBar) {
            seekProgressBar.style.width = 0;
          }
          if (seekBufferBar) {
            seekBufferBar.style.width = 0;
          }
        },
        on: function () {
          if (system.settings.controls.show != 'never') {
            controlsInOut('in');
            if (
              system.settings.controls.show != 'always' &&
              system.system.initClickMade
            ) {
              controlsInOut('out');
            }
          }
        },
        off: function (noFade) {
          if (noFade != 'nofade') {
            controlsInOut('out');
          } else {
            wrap.style.display = 'none';
          }
        },
        play: function () {
          if (system.settings.controls.play) {
            window
              .Codo(playBtn)
              .addClass(system.className + '-controls-pause-button');
          }
        },
        pause: function () {
          if (system.settings.controls.play) {
            window
              .Codo(playBtn)
              .removeClass(system.className + '-controls-pause-button');
          }
        },
        title: function (text) {
          if (system.settings.controls.title) {
            if (controlTitle) {
              if (text) {
                controlTitle.innerHTML = text;
              } else {
                return controlTitle.innerHTML;
              }
            }
          }
        },
        time: function () {
          SetValues();
        },
        hd: system.settings.controls.hd ? HD : undefined,
        progress: function (progress) {
          if (system.settings.controls.seek) {
            if (!seekActive) {
              var dur = progress ? system.media.getDuration() : 0.1;
              if (seekProgressBar && dur && system.playlist.getCurrentClip()) {
                var w = !system.playlist.getCurrentClip().rtmp
                  ? (window.Codo(seekWrap).getWidth() * (progress || 0)) / dur
                  : 0;
                seekProgressBar.style.width = w + 'px';
              }
              SetValues();
            }
          }
        },
        buffer: function (buffer) {
          if (system.settings.controls.seek) {
            var dur = buffer ? system.media.getDuration() : 0.1;
            if (seekBufferBar && dur) {
              seekBufferBar.style.width =
                (window.Codo(seekWrap).getWidth() * (buffer || 0)) / dur + 'px';
            }
          }
        },
        seek: function (e) {
          if (
            system.settings.controls.seek &&
            !system.playlist.getCurrentClip().rtmp
          ) {
            var seekVal;
            if (system.media.getDuration) {
              var inputX =
                window.Codo().mouse(e).x - window.Codo(seekWrap).getLeft();
              seekVal =
                (system.media.getDuration() * inputX) /
                window.Codo(seekWrap).getWidth();
              if (inputX >= 0 && inputX <= seekWrap.offsetWidth) {
                seekProgressBar.style.width = inputX + 'px';
                if (
                  system.settings.controls.time &&
                  seekVal &&
                  system.media.getDuration()
                ) {
                  timeText.innerHTML =
                    window.Codo().secsToTime(seekVal) +
                    ' / ' +
                    window.Codo().secsToTime(system.media.getDuration());
                }
              }
            }
            return seekVal;
          }
        },
        setVolume: function (val) {
          if (system.settings.controls.volume) {
            SetVolume(val || '0');
          }
        },
        showFullScreen: function () {
          if (system.settings.controls.fullscreen) {
            window
              .Codo(fullScrBtn)
              .addClass(system.className + '-controls-fullscreen-on-button');
          }
        },
        hideFullScreen: function () {
          if (system.settings.controls.fullscreen) {
            window
              .Codo(fullScrBtn)
              .removeClass(system.className + '-controls-fullscreen-on-button');
          }
        }
      };
    };
    var Loader = function () {
      var alpha = 0;
      var step = 10;
      var error = false;
      var loadingWrap = window.Codo(system.DOM.container).add({
        el: 'div',
        id: system.id + '-loading-wrap',
        className: system.className + '-loading-wrap',
        style:
          'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #000; opacity: 0; filter: alpha(opacity=0); visibility: hidden;'
      });
      var imgW, imgH, loadingImg;
      var img = new Image();
      img.src = logoSrc;
      img.onload = function () {
        imgW = img.width;
        imgH = img.height;
        loadingImg = window.Codo(loadingWrap).add({
          el: 'img',
          src: img.src,
          style:
            'position: absolute; top: ' +
            (system.settings.currentHeight / 2 - imgH / 2) +
            'px; left: ' +
            (system.settings.currentWidth / 2 - imgW / 2) +
            'px;'
        });
      };
      img.onerror = function () {
        error = true;
        img = null;
        loadingImg = window.Codo(loadingImg).remove();
      };
      var timer;
      return {
        getImage: function () {
          return img;
        },
        resize: function (w, h) {
          if (loadingImg) {
            loadingImg.style.top = h / 2 - imgH / 2 + 'px';
            loadingImg.style.left = w / 2 - imgW / 2 + 'px';
          }
        },
        on: function () {
          clearInterval(timer);
          if (overlay && overlay.getState()) {
            overlay.off();
          }
          var max = 80;
          loadingWrap.style.opacity = alpha / 100;
          loadingWrap.style.filter = 'alpha(opacity=' + alpha + ')';
          loadingWrap.style.visibility = 'visible';
          timer = setInterval(function () {
            if (alpha < max) {
              alpha += step;
              loadingWrap.style.opacity = alpha / 100;
              loadingWrap.style.filter = 'alpha(opacity=' + alpha + ')';
            } else {
              loadingWrap.style.opacity = max / 100;
              loadingWrap.style.filter = 'alpha(opacity=' + max + ')';
              clearInterval(timer);
            }
          }, 20);
        },
        off: function (param) {
          clearInterval(timer);
          if (param == 'cover') {
            if (overlay && !overlay.getState()) {
              overlay.on();
            }
          }
          var max = 0;
          loadingWrap.style.opacity = alpha / 100;
          loadingWrap.style.filter = 'alpha(opacity=' + alpha + ')';
          timer = setInterval(function () {
            if (alpha > max) {
              alpha -= step;
              loadingWrap.style.opacity = alpha / 100;
              loadingWrap.style.filter = 'alpha(opacity=' + alpha + ')';
            } else {
              loadingWrap.style.opacity = max / 100;
              loadingWrap.style.filter = 'alpha(opacity=' + max + ')';
              loadingWrap.style.visibility = 'hidden';
              clearInterval(timer);
            }
          }, 20);
        }
      };
    };
    var Overlay = function () {
      var isScreenOn = false;
      var playBtnW, playBtnH, menuAreaW, menuAreaH;

      var alpha = 0;
      var step = 25;

      function Toggle() {
        if (!system.media.toggle) {
          return;
        }
        if (!system.settings.preload) {
          if (!system.system.initClickMade) {
            system.media.toggle();
            overlay.off();
            if (loader) {
              loader.on();
            }
            if (window.Codo().isTouch()) {
              system.media.getParent().play();
            }
          } else {
            system.media.toggle();
          }
          system.system.initClickMade = true;
        } else {
          system.media.toggle();
        }
      }

      var screenWrap = (system.DOM.overlay = window
        .Codo(system.DOM.container)
        .add({
          el: 'div',
          className: system.className + '-overlay-wrap',
          style:
            'position: absolute; top: 0; left: 0; width: 100%; height: 100%;'
        }));

      window.Codo(screenWrap).on(clickType, function (e) {
        if (e.stopPropagation && e.preventDefault) {
          e.stopPropagation();
          e.preventDefault();
        }
        Toggle();
      });

      var screenWrapBg = window.Codo(screenWrap).add({
        el: 'div',
        className: system.className + '-overlay-wrap-bg',
        style:
          'position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity:0; filter: alpha(opacity=0); visibility: hidden; cursor: pointer;'
      });
      if (system.settings.controls.playBtn) {
        var playBtn = window.Codo(screenWrapBg).add({
          el: 'div',
          className: system.className + '-overlay-play-button',
          style: 'cursor: pointer;'
        });

        var menuArea = window.Codo(system.DOM.container).add({
          el: 'div',
          className: system.className + '-overlay-menu',
          style:
            'position: absolute; min-width: 200px; max-width: 80%; max-height: 60%; vertical-align: middle; font-size: 20px; text-shadow: 0px 0px 1px #000; background: black; background: rgba(0,0,0,.8); visibility: hidden; text-align: center;'
        });

        var menuTitle = window.Codo(menuArea).add({
          el: 'div',
          className: system.className + '-overlay--menu-title',
          style:
            'line-height: 20px; padding: 0 2px; background: #454545; text-align: right; cursor: pointer;',
          innerHTML: '&#10006;'
        });

        window.Codo(menuTitle).on(clickType, function (e) {
          if (e.stopPropagation && e.preventDefault) {
            e.stopPropagation();
            e.preventDefault();
          }
          window.Codo(menuArea).fadeOut(20);
        });

        var menuContext = window.Codo(menuArea).add({
          el: 'a',
          href: 'http://codoplayer.com/?ref=' + location.href,
          target: '_blank',
          style:
            'position: relative; width: 100%; color: white; background: url(' +
            logoSrc +
            ') no-repeat center 20px; margin: 0; padding: 50px 0 20px; text-decoration: none; display: block;',
          innerHTML: '{{version}} {{kind}}'
        });

        var timer = setInterval(function () {
          playBtnW = window.Codo(playBtn).getWidth();
          playBtnH = window.Codo(playBtn).getHeight();
          menuAreaW = window.Codo(menuArea).getWidth();
          menuAreaH = window.Codo(menuArea).getHeight();
          if (playBtnW > 0 && playBtnH > 0) {
            playBtn.style.top =
              (system.settings.currentHeight - playBtnH) / 2 + 'px';
            playBtn.style.left =
              (system.settings.currentWidth - playBtnW) / 2 + 'px';
            menuArea.style.top =
              (system.settings.currentHeight - menuAreaH) / 2 + 'px';
            menuArea.style.left =
              (system.settings.currentWidth - menuAreaW) / 2 + 'px';
            clearInterval(timer);
          }
        }, 20);
        setTimeout(function () {
          clearInterval(timer);
        }, 30000);
      }

      var timer2;

      return {
        resize: function (w, h) {
          if (playBtn && playBtnW && playBtnH) {
            playBtn.style.top = (h - playBtnH) / 2 + 'px';
            playBtn.style.left = (w - playBtnW) / 2 + 'px';
            menuArea.style.top = (h - menuAreaH) / 2 + 'px';
            menuArea.style.left = (w - menuAreaW) / 2 + 'px';
          }
        },
        menu: function () {
          window.Codo(menuArea).fadeIn(20);
        },
        on: function () {
          clearInterval(timer2);
          isScreenOn = true;
          var max = 100;
          screenWrapBg.style.opacity = alpha / 100;
          screenWrapBg.style.filter = 'alpha(opacity=' + alpha + ')';
          screenWrapBg.style.visibility = 'visible';
          timer2 = setInterval(function () {
            if (alpha < max) {
              alpha += step;
              screenWrapBg.style.opacity = alpha / 100;
              screenWrapBg.style.filter = 'alpha(opacity=' + alpha + ')';
            } else {
              screenWrapBg.style.opacity = max / 100;
              screenWrapBg.style.filter = 'alpha(opacity=' + max + ')';
              clearInterval(timer2);
            }
          }, 20);
        },
        off: function () {
          clearInterval(timer2);
          isScreenOn = false;
          var max = 0;
          screenWrapBg.style.opacity = alpha / 100;
          screenWrapBg.style.filter = 'alpha(opacity=' + alpha + ')';
          timer2 = setInterval(function () {
            if (alpha > max) {
              alpha -= step;
              screenWrapBg.style.opacity = alpha / 100;
              screenWrapBg.style.filter = 'alpha(opacity=' + alpha + ')';
            } else {
              screenWrapBg.style.opacity = max / 100;
              screenWrapBg.style.filter = 'alpha(opacity=' + max + ')';
              screenWrapBg.style.visibility = 'hidden';
              clearInterval(timer2);
            }
          }, 20);
        },
        getState: function () {
          return isScreenOn;
        }
      };
    };
    var ErrorCtrl = function (system) {
      var errorWrap = window.Codo(system.DOM.container).add({
        el: 'div',
        id: system.id + '-error-wrap',
        className: system.className + '-error-wrap',
        style:
          'position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: none;'
      });
      return {
        on: function (text) {
          text = text || '';
          window.Codo().log('Error: ' + text);
          controls.title('Error: ' + text);
          if (l && loader) {
            loader.off();
          }
          //errorWrap.style.display = "block";
          var curClip = system.playlist.getCurrentClip();
          if (curClip && curClip.hasNext) {
            if (!system.system.initPlayMade) {
              var timer = setTimeout(function () {
                if (curClip.id == system.playlist.getCurrentClip().id) {
                  system.system.firstClipOver = true;
                  system.playlist.next();
                  clearTimeout(timer);
                }
              }, 3000);
            }
          }
        },
        off: function () {
          //errorWrap.style.display = "none";
        }
      };
    };
    var Util = function () {
      return {
        resize: function (el, w, h, f) {
          var videoRatio = w / h;
          var targetRatio =
            system.settings.currentWidth / system.settings.currentHeight;
          var videoWidth = (system.settings.mediaWidth =
            targetRatio > videoRatio
              ? system.settings.currentHeight * videoRatio
              : system.settings.currentWidth);
          var videoHeight = (system.settings.mediaHeight =
            targetRatio > videoRatio
              ? system.settings.currentHeight
              : system.settings.currentWidth / videoRatio);
          if (!f && !fullscreen.getState()) {
            system.DOM.parent.style.width = system.DOM.container.style.width =
              system.settings.currentWidth + 'px';
            system.DOM.parent.style.minHeight =
              system.DOM.container.style.height =
                system.settings.currentHeight + 'px';
          }
          if (el) {
            el.width = videoWidth;
            el.height = videoHeight;
            el.style.width = videoWidth + 'px';
            el.style.height = videoHeight + 'px';
            el.style.top =
              system.settings.currentHeight / 2 - videoHeight / 2 + 'px';
            el.style.left =
              system.settings.currentWidth / 2 - videoWidth / 2 + 'px';
            if (el.resize) {
              el.resize(videoWidth, videoHeight);
            }
          }
          if (loader) {
            loader.resize(
              system.settings.currentWidth,
              system.settings.currentHeight
            );
          }
          if (overlay) {
            overlay.resize(
              system.settings.currentWidth,
              system.settings.currentHeight
            );
          }
        }
      };
    };
    var FullScreen = function (system) {
      var isFullScr = false;
      var pre;
      if (system.DOM.container.requestFullScreen) {
        pre = 'f';
      } else if (system.DOM.container.mozRequestFullScreen) {
        pre = 'moz';
      } else if (system.DOM.container.webkitRequestFullScreen) {
        pre = 'webkit';
      }
      if (pre) {
        window.Codo(document).on(pre + 'fullscreenchange', function (e) {
          var dom = false;
          if (document.fullscreenElement) {
            dom = true;
          } else if (document.mozFullScreenElement) {
            dom = true;
          } else if (document.webkitFullscreenElement) {
            dom = true;
          }
          if (!dom) {
            system.media.fullScreenExit();
          }
        });
      }

      window.Codo(window).on('orientationchange', function (e) {
        Set(true, e);
      });

      function Set(on, e) {
        if (on) {
          isFullScr = true;
          if (system.DOM.container.requestFullScreen) {
            system.DOM.container.requestFullScreen();
          } else if (system.DOM.container.mozRequestFullScreen) {
            system.DOM.container.mozRequestFullScreen();
          } else if (system.DOM.container.webkitRequestFullScreen) {
            system.DOM.container.webkitRequestFullScreen();
          }
          if (pre && e) {
            system.settings.currentWidth = screen.width;
            system.settings.currentHeight = screen.height;
          } else {
            system.settings.currentWidth = window.Codo().screen().width;
            system.settings.currentHeight = window.Codo().screen().height;
          }
          system.DOM.container.style.position = 'fixed';
          system.DOM.container.style.top = 0 + 'px';
          system.DOM.container.style.left = 0 + 'px';
          system.DOM.container.style.width = 100 + '%';
          system.DOM.container.style.height = 100 + '%';
          system.DOM.container.style.zIndex = 999999999;
          if (controls) {
            controls.showFullScreen();
          }
        } else {
          isFullScr = false;
          if (document.cancelFullScreen) {
            document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
          system.settings.currentWidth = system.settings.width;
          system.settings.currentHeight = system.settings.height;
          system.DOM.container.style.position = 'relative';
          system.DOM.container.style.width =
            system.settings.currentWidth + 'px';
          system.DOM.container.style.height =
            system.settings.currentHeight + 'px';
          system.DOM.container.style.zIndex = 0;
          if (controls) {
            controls.hideFullScreen();
          }
        }
        if (
          (!system.settings.preload && !system.system.initPlayMade) ||
          system.playlist.getCurrentClip().mediaType == 'audio'
        ) {
          util.resize(
            system.media.getPoster(),
            system.settings.mediaWidth,
            system.settings.mediaHeight,
            'fullscreen'
          );
        } else if (system.playlist.getCurrentClip().mediaType == 'video') {
          util.resize(
            system.media.getParent(),
            system.settings.mediaWidth,
            system.settings.mediaHeight,
            'fullscreen'
          );
        }
        system.system.isFullScreen = isFullScr;
      }
      return {
        on: function (e) {
          Set(true, e);
        },
        off: function (e) {
          Set(false, e);
        },
        getState: function () {
          return isFullScr;
        }
      };
    };
    var HTML5 = function (clip, mediaType, autoplay) {
      var isPlaying = false,
        isMetaDataLoaded = false,
        metaObj = {},
        platform,
        poster,
        buffering = false,
        clipBegin = false,
        clipQuarter = false,
        clipCuepoint = false,
        containerScreenCanvas = system.DOM.containerScreenCanvas;
      containerScreenCanvas.innerHTML = '';
      platform = window.Codo(containerScreenCanvas).add({
        el: mediaType,
        style: 'position: absolute; top: 0; left: 0;'
      });
      window.Codo(containerScreenCanvas).add({
        el: 'div',
        style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;'
      });
      if (!system.settings.preload && !system.system.initClickMade) {
        if (clip.poster) {
          var img = new Image();
          img.src = clip.poster;
          img.onload = function () {
            poster = window.Codo(containerScreenCanvas).add({
              el: 'img',
              src: img.src,
              style: 'position: absolute; top: 0; left: 0;'
            });
            util.resize(poster, img.width, img.height);
            if (system.settings.responsive) {
              system.resize();
            }
          };
        }
        controls.title(clip.title || ' ');
        if (loader) {
          loader.off('cover');
        }
      } else {
        Load();
      }

      function Load() {
        OnBeforeLoad();
        isMetaDataLoaded = false;
        clipBegin = false;
        clipQuarter = false;
        clipCuepoint = false;
        if (loader) {
          loader.on();
        }
        controls.title(system.settings.controls.loadingText);
        controls.setVolume(system.settings.volume || '0');
        setTimeout(function () {
          if (clip.activeUrl.search('relative://') > -1) {
            platform.src =
              system.system.rootPath +
              clip.activeUrl.replace('relative://', '');
          } else {
            platform.src = clip.activeUrl;
          }
          platform.load();
          OnLoad();
          if (window.Codo().isTouch()) {
            OnMetaData();
          }
        }, 500);
      }
      var Update = (function () {
        var timer;
        return {
          start: function () {
            clearInterval(timer);
            var curQ;
            var curC;
            timer = setInterval(function () {
              OnBuffer();
              OnProgress();
              var dur = Math.round(platform.duration);
              var cur = Math.round(platform.currentTime);
              var q1 = Math.round(dur / 4);
              var q2 = Math.round(dur / 2);
              var q3 = Math.round(dur - dur / 4);
              if (clipQuarter) {
                if (cur > (curQ || q1)) {
                  clipQuarter = false;
                }
              }
              if (clipCuepoint) {
                if (cur > curC) {
                  clipCuepoint = false;
                }
              }
              switch (cur) {
                case Math.round(dur / 4):
                  if (!clipQuarter) {
                    clipQuarter = true;
                    curQ = q1;
                    OnClipFirstQuarter();
                  }
                  break;
                case Math.round(dur / 2):
                  if (!clipQuarter) {
                    clipQuarter = true;
                    curQ = q2;
                    OnClipSecondQuarter();
                  }
                  break;
                case Math.round(dur - dur / 4):
                  if (!clipQuarter) {
                    clipQuarter = true;
                    curQ = q3;
                    OnClipThirdQuarter();
                  }
                  break;
              }
              if (clip.cuepoints && !clipCuepoint) {
                if (clip.cuepoints.indexOf(cur) != -1) {
                  clipCuepoint = true;
                  curC = clip.cuepoints[clip.cuepoints.indexOf(cur)];
                  OnCuepoint();
                }
              }
            }, 20);
          },
          end: function () {
            clearInterval(timer);
          },
          once: function () {
            OnBuffer();
            OnProgress();
          }
        };
      })();

      function Toggle() {
        if (!isPlaying) {
          Play();
        } else {
          Pause();
        }
      }

      function Play() {
        // if (window.Codo().isAndroidOrWindows()) {
        //     location.href = clip.activeUrl;
        //     return;
        // }
        if (isMetaDataLoaded) {
          system.system.initClickMade =
            system.system.initPlayMade =
            isPlaying =
              true;
          platform.play();
          controls.play();
        } else if (!system.settings.preload) {
          Load(system.playlist.getCurrentClip());
        }
      }

      function Pause() {
        if (isMetaDataLoaded) {
          isPlaying = false;
          platform.pause();
          controls.pause();
        }
      }

      function SetVolume(vol) {
        if (isMetaDataLoaded) {
          platform.volume = vol / 100;
        } else {
          system.settings.volume = vol;
          controls.setVolume(vol || '0');
        }
      }

      function GetVolume() {
        if (isMetaDataLoaded) {
          return Math.round(platform.volume * 100);
        }
      }

      function GetDuration() {
        if (isMetaDataLoaded) {
          return platform.duration;
        }
      }

      function SetCurrentTime(newTime) {
        if (isMetaDataLoaded) {
          platform.currentTime = newTime;
        }
      }

      function GetCurrentTime() {
        return platform.currentTime || '0';
      }

      function ToggleFullScreen(e) {
        if (!fullscreen.getState()) {
          FullScreenEnter(e);
        } else {
          FullScreenExit(e);
        }
      }

      function FullScreenEnter(e) {
        fullscreen.on(e);
        Update.once();
        OnFullScreenEnter();
      }

      function FullScreenExit(e) {
        fullscreen.off(e);
        Update.once();
        OnFullScreenExit();
      }

      function Destroy() {
        Update.end();
        system.media = {};
        window.Codo(platform).off('loadedmetadata', OnMetaData);
        window.Codo(platform).off('play', OnPlay);
        window.Codo(platform).off('pause', OnPause);
        window.Codo(platform).off('ended', OnEnd);
        window.Codo(platform).off('progress', OnBuffer);
        window.Codo(platform).off('seeking', OnSeekStart);
        window.Codo(platform).off('seeked', OnSeekEnd);
        window.Codo(platform).off('volumechange', OnVolumeChange);
        window.Codo(platform).off('error', OnError);
        if (poster) {
          window.Codo(poster).remove();
        }
        if (platform) {
          window.Codo(platform).remove();
        }
      }

      function OnBeforeLoad() {
        for (var i = 0; i < onBeforeLoadCallBk.length; i++) {
          if (onBeforeLoadCallBk[i]) {
            onBeforeLoadCallBk[i]();
          }
        }
      }

      function OnLoad() {
        for (var i = 0; i < onLoadCallBk.length; i++) {
          if (onLoadCallBk[i]) {
            onLoadCallBk[i](system);
          }
        }
      }

      function OnPlay() {
        if (isMetaDataLoaded) {
          isPlaying = true;
          if (overlay) {
            overlay.off();
          }
          if (!buffering) {
            controls.play();
          }
          Update.start();
          if (!clipBegin) {
            clipBegin = true;
            OnClipBegin();
          }
          for (var i = 0; i < onPlayCallBk.length; i++) {
            if (onPlayCallBk[i]) {
              onPlayCallBk[i](platform.currentTime);
            }
          }
        }
      }

      function OnPause() {
        if (isMetaDataLoaded && metaObj.duration - platform.currentTime > 0.1) {
          isPlaying = false;
          if (!buffering) {
            if (overlay) {
              overlay.on();
            }
            controls.pause();
          }
          for (var i = 0; i < onPauseCallBk.length; i++) {
            if (onPauseCallBk[i]) {
              onPauseCallBk[i](platform.currentTime);
            }
          }
        }
      }

      function OnEnd() {
        isPlaying = false;
        system.system.firstClipOver = true;
        controls.pause();
        Update.end();
        if (loader) {
          loader.on();
        }
        OnClipEnd();
        system.playlist.next();
        for (var i = 0; i < onEndCallBk.length; i++) {
          if (onEndCallBk[i]) {
            onEndCallBk[i]();
          }
        }
      }

      function OnVolumeChange() {
        system.settings.volume = GetVolume();
        controls.setVolume(system.settings.volume || '0');
        for (var i = 0; i < onVolumeChange.length; i++) {
          if (onVolumeChange[i]) {
            onVolumeChange[i](system.settings.volume);
          }
        }
      }

      function OnBuffer() {
        if (isMetaDataLoaded) {
          try {
            controls.buffer(platform.buffered.end(0));
            for (var i = 0; i < onBufferCallBk.length; i++) {
              if (onBufferCallBk[i]) {
                onBufferCallBk[i](platform.buffered.end(0));
              }
            }
          } catch (e) {}
        }
      }

      function OnProgress() {
        if (platform.currentTime) {
          controls.progress(platform.currentTime);
          for (var i = 0; i < onProgressCallBk.length; i++) {
            if (onProgressCallBk[i]) {
              onProgressCallBk[i](platform.currentTime);
            }
          }
        }
      }

      function OnSeekStart() {
        Update.end();
        for (var i = 0; i < onSeekStartCallBk.length; i++) {
          if (onSeekStartCallBk[i]) {
            onSeekStartCallBk[i](platform.currentTime);
          }
        }
      }

      function OnSeekEnd() {
        Update.start();
        for (var i = 0; i < onSeekEndCallBk.length; i++) {
          if (onSeekEndCallBk[i]) {
            onSeekEndCallBk[i](platform.currentTime);
          }
        }
      }

      function OnError() {
        isPlaying = false;
        Update.end();
        var errorMsg = mediaType + ' not found';
        errorCtrl.on(errorMsg);
        for (var i = 0; i < onErrorCallBk.length; i++) {
          if (onErrorCallBk[i]) {
            onErrorCallBk[i](errorMsg);
          }
        }
      }

      function OnMetaData() {
        isMetaDataLoaded = true;
        if (mediaType == 'video') {
          metaObj.width = platform.videoWidth || system.settings.currentWidth;
          metaObj.height =
            platform.videoHeight || system.settings.currentHeight;
          metaObj.duration = platform.duration;
          if (poster) {
            poster = window.Codo(poster).remove();
          }
          util.resize(platform, metaObj.width, metaObj.height);
        } else if (mediaType == 'audio') {
          metaObj.duration = platform.duration;
          if (clip.poster) {
            var img = new Image();
            img.src = clip.poster;
            img.onload = function () {
              metaObj.width = img.width;
              metaObj.height = img.height;
              if (poster) {
                poster = window.Codo(poster).remove();
              }
              poster = window.Codo(containerScreenCanvas).add({
                el: 'img',
                src: img.src,
                style: 'position: absolute; top: 0; left: 0;'
              });
              util.resize(poster, img.width, img.height);
            };
          }
        }

        if (system.playlist.breakTime !== '0') {
          SetCurrentTime(system.playlist.breakTime);
        }

        if (autoplay) {
          Play();
        } else {
          if (!system.system.firstClipOver) {
            if (!system.settings.preload || system.settings.autoplay) {
              Play();
            }
          } else {
            if (clip.hasPrevious || system.settings.loop) {
              Play();
            }
          }
        }

        if (isPlaying) {
          if (loader) {
            loader.off();
          }
        } else {
          if (loader) {
            loader.off('cover');
          }
        }
        controls.title(clip.title || ' ');
        controls.time();
        platform.volume = system.settings.volume / 100;
        Update.once();
        for (var i = 0; i < onMetaDataCallBk.length; i++) {
          if (onMetaDataCallBk[i]) {
            onMetaDataCallBk[i](metaObj);
          }
        }
      }

      function OnFullScreenEnter() {
        for (var i = 0; i < onFullScreenEnterCallBk.length; i++) {
          if (onFullScreenEnterCallBk[i]) {
            onFullScreenEnterCallBk[i]();
          }
        }
      }

      function OnFullScreenExit() {
        for (var i = 0; i < onFullScreenExitCallBk.length; i++) {
          if (onFullScreenExitCallBk[i]) {
            onFullScreenExitCallBk[i]();
          }
        }
      }

      function OnClipBegin() {
        for (var i = 0; i < onClipBegin.length; i++) {
          if (onClipBegin[i]) {
            onClipBegin[i]();
          }
        }
      }

      function OnClipFirstQuarter() {
        for (var i = 0; i < onClipFirstQuarter.length; i++) {
          if (onClipFirstQuarter[i]) {
            onClipFirstQuarter[i]();
          }
        }
      }

      function OnClipSecondQuarter() {
        for (var i = 0; i < onClipSecondQuarter.length; i++) {
          if (onClipSecondQuarter[i]) {
            onClipSecondQuarter[i]();
          }
        }
      }

      function OnClipThirdQuarter() {
        for (var i = 0; i < onClipThirdQuarter.length; i++) {
          if (onClipThirdQuarter[i]) {
            onClipThirdQuarter[i]();
          }
        }
      }

      function OnClipEnd() {
        for (var i = 0; i < onClipEnd.length; i++) {
          if (onClipEnd[i]) {
            onClipEnd[i]();
          }
        }
      }

      function OnCuepoint() {
        for (var i = 0; i < onCuepoint.length; i++) {
          if (onCuepoint[i]) {
            onCuepoint[i]();
          }
        }
      }
      window.Codo(platform).on('loadedmetadata', OnMetaData);
      window.Codo(platform).on('play', OnPlay);
      window.Codo(platform).on('pause', OnPause);
      window.Codo(platform).on('ended', OnEnd);
      window.Codo(platform).on('progress', OnBuffer);
      window.Codo(platform).on('seeking', OnSeekStart);
      window.Codo(platform).on('seeked', OnSeekEnd);
      window.Codo(platform).on('volumechange', OnVolumeChange);
      window.Codo(platform).on('error', OnError);
      return {
        platformName: mediaType == 'video' ? 'videoHTML5' : 'audioHTML5',
        isPlaying: function () {
          return isPlaying;
        },
        isMetaDataLoaded: function () {
          return isMetaDataLoaded;
        },
        onBeforeLoad: function (callBk) {
          if (callBk) {
            onBeforeLoadCallBk.push(callBk);
          }
        },
        onLoad: function (callBk) {
          if (callBk) {
            onLoadCallBk.push(callBk);
          }
        },
        onMetaData: function (callBk) {
          if (callBk) {
            onMetaDataCallBk.push(callBk);
          }
        },
        onPlay: function (callBk) {
          if (callBk) {
            onPlayCallBk.push(callBk);
          }
        },
        onPause: function (callBk) {
          if (callBk) {
            onPauseCallBk.push(callBk);
          }
        },
        onEnd: function (callBk) {
          if (callBk) {
            onEndCallBk.push(callBk);
          }
        },
        onBuffer: function (callBk) {
          if (callBk) {
            onBufferCallBk.push(callBk);
          }
        },
        onProgress: function (callBk) {
          if (callBk) {
            onProgressCallBk.push(callBk);
          }
        },
        onSeekStart: function (callBk) {
          if (callBk) {
            onSeekStartCallBk.push(callBk);
          }
        },
        onSeekEnd: function (callBk) {
          if (callBk) {
            onSeekEndCallBk.push(callBk);
          }
        },
        onVolumeChange: function (callBk) {
          if (callBk) {
            onVolumeChange.push(callBk);
          }
        },
        onFullScreenEnter: function (callBk) {
          if (callBk) {
            onFullScreenEnterCallBk.push(callBk);
          }
        },
        onFullScreenExit: function (callBk) {
          if (callBk) {
            onFullScreenExitCallBk.push(callBk);
          }
        },
        onError: function (callBk) {
          if (callBk) {
            onErrorCallBk.push(callBk);
          }
        },
        getParent: function () {
          return platform;
        },
        getPoster: function () {
          return poster;
        },
        toggle: function () {
          Toggle();
        },
        play: function (_clip, _autoplay) {
          if (_clip) {
            clip = _clip;
            autoplay = _autoplay;
            Load();
          } else {
            Play();
          }
        },
        pause: function () {
          Pause();
        },
        setVolume: function (volume) {
          SetVolume(volume);
        },
        getVolume: function () {
          return GetVolume();
        },
        getDuration: function () {
          return GetDuration();
        },
        setCurrentTime: function (newTime) {
          SetCurrentTime(newTime);
        },
        getCurrentTime: function () {
          return GetCurrentTime();
        },
        toggleFullScreen: function (e) {
          ToggleFullScreen(e);
        },
        fullScreenEnter: function () {
          FullScreenEnter();
        },
        fullScreenExit: function () {
          FullScreenExit();
        },
        destroy: function () {
          Destroy();
        },
        onClipBegin: function (callBk) {
          if (callBk) {
            onClipBegin.push(callBk);
          }
        },
        onClipFirstQuarter: function (callBk) {
          if (callBk) {
            onClipFirstQuarter.push(callBk);
          }
        },
        onClipSecondQuarter: function (callBk) {
          if (callBk) {
            onClipSecondQuarter.push(callBk);
          }
        },
        onClipThirdQuarter: function (callBk) {
          if (callBk) {
            onClipThirdQuarter.push(callBk);
          }
        },
        onClipEnd: function (callBk) {
          if (callBk) {
            onClipEnd.push(callBk);
          }
        },
        onCuepoint: function (callBk) {
          if (callBk) {
            onCuepoint.push(callBk);
          }
        }
      };
    };
    var SWF = function (clip, mediaType, autoplay) {
      var isPlaying = false,
        isMetaDataLoaded = false,
        metaObj = {},
        platform,
        poster,
        buffering = false,
        clipBegin = false,
        clipQuarter = false,
        clipCuepoint = false,
        containerScreenCanvas = system.DOM.containerScreenCanvas;

      containerScreenCanvas.innerHTML = '';
      if (!window.Codo().isFlash()) {
        errorCtrl.on('Flash plugin not found');
      }
      containerScreenCanvas.innerHTML =
        "<object id='" +
        system.id +
        '-' +
        mediaType +
        "-swf' name='" +
        system.id +
        '-' +
        mediaType +
        "-swf' width='" +
        system.settings.currentWidth +
        "' height='" +
        system.settings.currentHeight +
        "' type='application/x-shockwave-flash' data='" +
        system.system.rootPath +
        "module.swf' style='position: absolute; top: 0; left: 0;'><param name='movie' value='" +
        system.system.rootPath +
        "module.swf'><param name='quality' value='high'><param name='allowScriptAccess' value='always'><param name='swliveconnect' value='true'><param name='wmode' value='transparent'><param name='flashVars' value='instance=" +
        system.instance +
        '&mediaType=' +
        mediaType +
        "'></object>";
      platform = window
        .Codo('#' + system.id + '-' + mediaType + '-swf')
        .get()[0];
      window.Codo(containerScreenCanvas).add({
        el: 'div',
        style:
          'position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: black; opacity: 0; filter: alpha(opacity=0);'
      });

      function OnSwfLoaded() {
        platform.initClip(system.settings, system.playlist.getCurrentClip());
        if (!clip.rtmp) {
          swfLoaded();
        }
      }

      function OnRtmpLoaded() {
        swfLoaded();
      }

      function swfLoaded() {
        if (!system.settings.preload && !system.system.initClickMade) {
          if (clip.poster) {
            var img = new Image();
            img.src = clip.poster;
            img.onload = function () {
              poster = window.Codo(containerScreenCanvas).add({
                el: 'img',
                src: img.src,
                style: 'position: absolute; top: 0; left: 0;'
              });
              util.resize(poster, img.width, img.height);
              if (system.settings.responsive) {
                system.resize();
              }
              //overlay.on();
            };
          }
          controls.title(clip.title || ' ');
          if (loader) {
            loader.off('cover');
          }
        } else {
          Load();
        }
      }

      function Load() {
        OnBeforeLoad();
        isMetaDataLoaded = false;
        clipBegin = false;
        clipQuarter = false;
        clipCuepoint = false;
        if (loader) {
          loader.on();
        }
        controls.title(system.settings.controls.loadingText);
        controls.setVolume(system.settings.volume || '0');
        if (clip.activeUrl.search('relative://') > -1) {
          platform.setSrc(
            system.system.rootPath + clip.activeUrl.replace('relative://', '')
          );
        } else {
          platform.setSrc(clip.activeUrl);
        }
        OnLoad();
        if (window.Codo().isTouch()) {
          OnMetaData();
        }
      }
      var Update = (function () {
        var timer;
        return {
          start: function () {
            clearInterval(timer);
            var curQ;
            var curC;
            timer = setInterval(function () {
              if (platform.getDuration) {
                var dur = Math.round(platform.getDuration());
              } else {
                return;
              }
              if (platform.getCurrentTime) {
                var cur = Math.round(platform.getCurrentTime());
              } else {
                return;
              }
              OnProgress();
              var q1 = Math.round(dur / 4);
              var q2 = Math.round(dur / 2);
              var q3 = Math.round(dur - dur / 4);
              if (clipQuarter) {
                if (cur > (curQ || q1)) {
                  clipQuarter = false;
                }
              }
              if (clipCuepoint) {
                if (cur > curC) {
                  clipCuepoint = false;
                }
              }
              switch (cur) {
                case Math.round(dur / 4):
                  if (!clipQuarter) {
                    clipQuarter = true;
                    curQ = q1;
                    OnClipFirstQuarter();
                  }
                  break;
                case Math.round(dur / 2):
                  if (!clipQuarter) {
                    clipQuarter = true;
                    curQ = q2;
                    OnClipSecondQuarter();
                  }
                  break;
                case Math.round(dur - dur / 4):
                  if (!clipQuarter) {
                    clipQuarter = true;
                    curQ = q3;
                    OnClipThirdQuarter();
                  }
                  break;
              }
              if (clip.cuepoints && !clipCuepoint) {
                if (clip.cuepoints.indexOf(cur) != -1) {
                  clipCuepoint = true;
                  curC = clip.cuepoints[clip.cuepoints.indexOf(cur)];
                  OnCuepoint();
                }
              }
            }, 100);
          },
          end: function () {
            clearInterval(timer);
          },
          once: function () {
            OnProgress();
          }
        };
      })();

      function Toggle() {
        if (!isPlaying) {
          Play();
        } else {
          Pause();
        }
      }

      function Play(_clip) {
        if (isMetaDataLoaded) {
          system.system.initClickMade =
            system.system.initPlayMade =
            isPlaying =
              true;
          platform.playClip();
          if (clip.rtmp) {
            OnPlay();
          }
          controls.play();
        } else if (!system.settings.preload) {
          Load(system.playlist.getCurrentClip());
        }
      }

      function Pause() {
        if (isMetaDataLoaded) {
          isPlaying = false;
          platform.pauseClip();
          if (clip.rtmp) {
            OnPause();
          }
          controls.pause();
        }
      }

      function SetVolume(vol) {
        if (isMetaDataLoaded) {
          platform.setVolume(vol / 100 || '0');
        } else {
          system.settings.volume = vol;
          controls.setVolume(vol || '0');
        }
        OnVolumeChange(vol);
      }

      function GetVolume() {
        if (isMetaDataLoaded) {
          return Math.round(platform.getVolume() * 100);
        }
      }

      function GetDuration() {
        if (isMetaDataLoaded && platform.getDuration) {
          return platform.getDuration();
        }
      }

      function SetCurrentTime(newTime) {
        if (isMetaDataLoaded) {
          platform.setCurrentTime(newTime);
        }
      }

      function GetCurrentTime() {
        if (!platform.getCurrentTime) {
          return;
        }
        return platform.getCurrentTime() || '0';
      }

      function ToggleFullScreen(e) {
        if (!fullscreen.getState()) {
          FullScreenEnter(e);
        } else {
          FullScreenExit(e);
        }
      }

      function FullScreenEnter(e) {
        fullscreen.on(e);
        Update.once();
        OnFullScreenEnter();
      }

      function FullScreenExit(e) {
        fullscreen.off(e);
        Update.once();
        OnFullScreenExit();
      }

      function Destroy() {
        Update.end();
        system.API = {};
        if (poster) {
          window.Codo(poster).remove();
        }
        if (platform) {
          window.Codo(platform).remove();
        }
      }

      function OnBeforeLoad() {
        for (var i = 0; i < onBeforeLoadCallBk.length; i++) {
          if (onBeforeLoadCallBk[i]) {
            onBeforeLoadCallBk[i]();
          }
        }
      }

      function OnLoad() {
        for (var i = 0; i < onLoadCallBk.length; i++) {
          if (onLoadCallBk[i]) {
            onLoadCallBk[i]();
          }
        }
      }

      function OnPlay() {
        if (isMetaDataLoaded) {
          isPlaying = true;
          if (overlay) {
            overlay.off();
          }
          if (!buffering) {
            controls.play();
          }
          Update.start();
          if (!clipBegin) {
            clipBegin = true;
            OnClipBegin();
          }
          for (var i = 0; i < onPlayCallBk.length; i++) {
            if (onPlayCallBk[i]) {
              onPlayCallBk[i](platform.getCurrentTime());
            }
          }
        }
      }

      function OnPause() {
        if (isMetaDataLoaded) {
          isPlaying = false;
          if (!buffering) {
            if (overlay) {
              overlay.on();
            }
            controls.pause();
          }
          for (var i = 0; i < onPauseCallBk.length; i++) {
            if (onPauseCallBk[i]) {
              onPauseCallBk[i](platform.getCurrentTime());
            }
          }
        }
      }

      function OnEnd() {
        isPlaying = false;
        system.system.firstClipOver = true;
        controls.pause();
        Update.end();
        if (loader) {
          loader.on();
        }
        OnClipEnd();
        system.playlist.next();
        for (var i = 0; i < onEndCallBk.length; i++) {
          if (onEndCallBk[i]) {
            onEndCallBk[i]();
          }
        }
      }

      function OnBuffer(buffer) {
        if (isMetaDataLoaded) {
          controls.buffer(buffer);
          for (var i = 0; i < onBufferCallBk.length; i++) {
            if (onBufferCallBk[i]) {
              onBufferCallBk[i](buffer);
            }
          }
        }
      }

      function OnProgress() {
        if (platform.getCurrentTime && platform.getCurrentTime()) {
          controls.progress(platform.getCurrentTime());
          for (var i = 0; i < onProgressCallBk.length; i++) {
            if (onProgressCallBk[i] && platform.getCurrentTime) {
              onProgressCallBk[i](platform.getCurrentTime());
            }
          }
        }
      }

      function OnSeekStart() {
        Update.end();
        for (var i = 0; i < onSeekStartCallBk.length; i++) {
          if (onSeekStartCallBk[i]) {
            onSeekStartCallBk[i](platform.getCurrentTime());
          }
        }
      }

      function OnSeekEnd() {
        Update.start();
        for (var i = 0; i < onSeekEndCallBk.length; i++) {
          if (onSeekEndCallBk[i]) {
            onSeekEndCallBk[i](platform.getCurrentTime());
          }
        }
      }

      function OnVolumeChange(vol) {
        system.settings.volume = vol;
        controls.setVolume(vol || '0');
        for (var i = 0; i < onVolumeChange.length; i++) {
          if (onVolumeChange[i]) {
            onVolumeChange[i](system.settings.volume);
          }
        }
      }

      function OnError() {
        isPlaying = false;
        Update.end();
        var errorMsg = mediaType + ' not found';
        errorCtrl.on(errorMsg);
        for (var i = 0; i < onErrorCallBk.length; i++) {
          if (onErrorCallBk[i]) {
            onErrorCallBk[i](errorMsg);
          }
        }
      }

      function OnMetaData(_metaObj) {
        isMetaDataLoaded = true;
        if (mediaType == 'video') {
          metaObj = _metaObj;
          if (poster) {
            poster = window.Codo(poster).remove();
          }
          util.resize(platform, metaObj.width, metaObj.height);
        } else if (mediaType == 'audio') {
          if (clip.poster) {
            var img = new Image();
            img.src = clip.poster;
            img.onload = function () {
              metaObj.width = img.width;
              metaObj.height = img.height;
              if (poster) {
                poster = window.Codo(poster).remove();
              }
              poster = window.Codo(containerScreenCanvas).add({
                el: 'img',
                src: img.src,
                style: 'position: absolute; top: 0; left: 0;'
              });
              util.resize(poster, img.width, img.height);
            };
          }
        }

        if (system.playlist.breakTime !== '0') {
          SetCurrentTime(system.playlist.breakTime);
        }

        if (autoplay) {
          Play();
        } else {
          if (!system.system.firstClipOver) {
            if (!system.settings.preload || system.settings.autoplay) {
              Play();
            }
          } else {
            if (clip.hasPrevious || system.settings.loop) {
              Play();
            }
          }
        }

        if (isPlaying) {
          if (loader) {
            loader.off();
          }
        } else {
          if (loader) {
            loader.off('cover');
          }
        }
        controls.title(clip.title || ' ');
        controls.time();
        platform.setVolume(system.settings.volume / 100 || '0');
        Update.once();
        for (var i = 0; i < onMetaDataCallBk.length; i++) {
          if (onMetaDataCallBk[i]) {
            onMetaDataCallBk[i](metaObj);
          }
        }
      }

      function OnFullScreenEnter() {
        for (var i = 0; i < onFullScreenEnterCallBk.length; i++) {
          if (onFullScreenEnterCallBk[i]) {
            onFullScreenEnterCallBk[i]();
          }
        }
      }

      function OnFullScreenExit() {
        for (var i = 0; i < onFullScreenExitCallBk.length; i++) {
          if (onFullScreenExitCallBk[i]) {
            onFullScreenExitCallBk[i]();
          }
        }
      }

      function OnClipBegin() {
        for (var i = 0; i < onClipBegin.length; i++) {
          if (onClipBegin[i]) {
            onClipBegin[i]();
          }
        }
      }

      function OnClipFirstQuarter() {
        for (var i = 0; i < onClipFirstQuarter.length; i++) {
          if (onClipFirstQuarter[i]) {
            onClipFirstQuarter[i]();
          }
        }
      }

      function OnClipSecondQuarter() {
        for (var i = 0; i < onClipSecondQuarter.length; i++) {
          if (onClipSecondQuarter[i]) {
            onClipSecondQuarter[i]();
          }
        }
      }

      function OnClipThirdQuarter() {
        for (var i = 0; i < onClipThirdQuarter.length; i++) {
          if (onClipThirdQuarter[i]) {
            onClipThirdQuarter[i]();
          }
        }
      }

      function OnClipEnd() {
        for (var i = 0; i < onClipEnd.length; i++) {
          if (onClipEnd[i]) {
            onClipEnd[i]();
          }
        }
      }

      function OnCuepoint() {
        for (var i = 0; i < onCuepoint.length; i++) {
          if (onCuepoint[i]) {
            onCuepoint[i]();
          }
        }
      }
      return {
        platformName: mediaType == 'video' ? 'videoSWF' : 'audioSWF',
        isPlaying: function () {
          return isPlaying;
        },
        isMetaDataLoaded: function () {
          return isMetaDataLoaded;
        },
        onBeforeLoad: function (callBk) {
          if (callBk) {
            onBeforeLoadCallBk.push(callBk);
          }
        },
        onLoad: function (callBk) {
          if (callBk) {
            onLoadCallBk.push(callBk);
          }
        },
        onMetaData: function (callBk) {
          if (callBk) {
            onMetaDataCallBk.push(callBk);
          }
        },
        onPlay: function (callBk) {
          if (callBk) {
            onPlayCallBk.push(callBk);
          }
        },
        onPause: function (callBk) {
          if (callBk) {
            onPauseCallBk.push(callBk);
          }
        },
        onEnd: function (callBk) {
          if (callBk) {
            onEndCallBk.push(callBk);
          }
        },
        onBuffer: function (callBk) {
          if (callBk) {
            onBufferCallBk.push(callBk);
          }
        },
        onProgress: function (callBk) {
          if (callBk) {
            onProgressCallBk.push(callBk);
          }
        },
        onSeekStart: function (callBk) {
          if (callBk) {
            onSeekStartCallBk.push(callBk);
          }
        },
        onSeekEnd: function (callBk) {
          if (callBk) {
            onSeekEndCallBk.push(callBk);
          }
        },
        onVolumeChange: function (callBk) {
          if (callBk) {
            onVolumeChange.push(callBk);
          }
        },
        onFullScreenEnter: function (callBk) {
          if (callBk) {
            onFullScreenEnterCallBk.push(callBk);
          }
        },
        onFullScreenExit: function (callBk) {
          if (callBk) {
            onFullScreenExitCallBk.push(callBk);
          }
        },
        onError: function (callBk) {
          if (callBk) {
            onErrorCallBk.push(callBk);
          }
        },
        system: {
          onSwfLoaded: function () {
            OnSwfLoaded();
          },
          onRtmpLoaded: function () {
            OnRtmpLoaded();
          },
          onPlay: function () {
            OnPlay();
          },
          onPause: function () {
            OnPause();
          },
          onEnd: function () {
            OnEnd();
          },
          onWaiting: function () {
            //OnWaiting();
          },
          onSeekStart: function () {
            OnSeekStart();
          },
          onSeekEnd: function () {
            OnSeekEnd();
          },
          onBuffer: function (buffer) {
            OnBuffer(buffer);
          },
          onMetaData: function (metaObj) {
            OnMetaData(metaObj);
          },
          onError: function () {
            OnError();
          }
        },
        getParent: function () {
          return platform;
        },
        getPoster: function () {
          return poster;
        },
        toggle: function () {
          Toggle();
        },
        play: function (_clip, _autoplay) {
          if (_clip) {
            clip = _clip;
            autoplay = _autoplay;
            Load();
          } else {
            Play();
          }
        },
        pause: function () {
          Pause();
        },
        setVolume: function (volume) {
          SetVolume(volume);
        },
        getVolume: function (val) {
          return GetVolume();
        },
        getDuration: function () {
          return GetDuration();
        },
        setCurrentTime: function (newTime) {
          SetCurrentTime(newTime);
        },
        getCurrentTime: function () {
          return GetCurrentTime();
        },
        toggleFullScreen: function (e) {
          ToggleFullScreen(e);
        },
        fullScreenEnter: function (e) {
          FullScreenEnter(e);
        },
        fullScreenExit: function (e) {
          FullScreenExit(e);
        },
        destroy: function () {
          Destroy();
        },
        onClipBegin: function (callBk) {
          if (callBk) {
            onClipBegin.push(callBk);
          }
        },
        onClipFirstQuarter: function (callBk) {
          if (callBk) {
            onClipFirstQuarter.push(callBk);
          }
        },
        onClipSecondQuarter: function (callBk) {
          if (callBk) {
            onClipSecondQuarter.push(callBk);
          }
        },
        onClipThirdQuarter: function (callBk) {
          if (callBk) {
            onClipThirdQuarter.push(callBk);
          }
        },
        onClipEnd: function (callBk) {
          if (callBk) {
            onClipEnd.push(callBk);
          }
        },
        onCuepoint: function (callBk) {
          if (callBk) {
            onCuepoint.push(callBk);
          }
        }
      };
    };

    var YOUTUBE = function (clip, type, autoplay) {
      var isPlaying = false,
        isMetaDataLoaded = false,
        metaObj = {},
        platform,
        poster,
        buffering = false,
        clipBegin = false,
        clipQuarter = false,
        clipCuepoint = false,
        isPauseFix = false,
        playerReady = false,
        parentEl,
        containerScreenCanvas = system.DOM.containerScreenCanvas;

      containerScreenCanvas.innerHTML = '';

      window.Codo(containerScreenCanvas).add({
        el: 'div',
        id: system.id + '-youtube-iframe',
        style: 'position: absolute; top: 0; left: 0;'
      });
      window.Codo().script('//www.youtube.com/iframe_api');
      var loadTimer = setInterval(function () {
        if (window.window.YTiframeReady) {
          platform = new window.YT.Player(system.id + '-youtube-iframe', {
            width: system.settings.currentWidth,
            height: system.settings.currentHeight,
            playerVars: {
              controls: 0,
              showinfo: 0
            },
            events: {
              onReady: function (event) {
                playerReady = true;
                parentEl = window
                  .Codo('#' + system.id + '-youtube-iframe')
                  .get()[0];
                if (!system.settings.preload && !system.system.initClickMade) {
                  if (clip.poster) {
                    var img = new Image();
                    img.src = clip.poster;
                    img.onload = function () {
                      poster = window.Codo(containerScreenCanvas).add({
                        el: 'img',
                        src: img.src,
                        style: 'position: absolute; top: 0; left: 0;'
                      });
                      util.resize(poster, img.width, img.height);
                      if (system.settings.responsive) {
                        system.resize();
                      }
                      //overlay.on();
                    };
                  }
                  controls.title(clip.title || ' ');
                  if (loader) {
                    loader.off('cover');
                  }
                } else {
                  Load();
                }
              },
              onStateChange: function (event) {
                switch (event.data) {
                  case window.YT.PlayerState.PLAYING:
                    if (!isMetaDataLoaded) {
                      OnMetaData();
                    } else {
                      OnPlay();
                    }
                    break;
                  case window.YT.PlayerState.PAUSED:
                    if (!isPauseFix) {
                      isPauseFix = true;
                    } else {
                      OnPause();
                    }
                    break;
                  case window.YT.PlayerState.ENDED:
                    OnEnd();
                    break;
                }
              },
              onError: function (code) {
                OnError(code);
              }
            }
          });
          clearInterval(loadTimer);
        }
      }, 100);

      function Load() {
        if (playerReady) {
          OnBeforeLoad();
          isMetaDataLoaded = false;
          isPauseFix = false;
          clipBegin = false;
          clipQuarter = false;
          clipCuepoint = false;
          if (loader) {
            loader.on();
          }
          controls.title(system.settings.controls.loadingText);
          controls.setVolume(system.settings.volume || '0');
          setTimeout(function () {
            platform.loadVideoById(clip.activeUrl);
            OnLoad();
            if (window.Codo().isTouch()) {
              OnMetaData();
            }
          }, 500);
        }
      }
      var Update = (function () {
        var timer;
        return {
          start: function () {
            clearInterval(timer);
            var curQ;
            var curC;
            timer = setInterval(function () {
              OnBuffer();
              OnProgress();
              var dur = Math.round(platform.getDuration());
              var cur = Math.round(platform.getCurrentTime());
              var q1 = Math.round(dur / 4);
              var q2 = Math.round(dur / 2);
              var q3 = Math.round(dur - dur / 4);
              if (clipQuarter) {
                if (cur > (curQ || q1)) {
                  clipQuarter = false;
                }
              }
              if (clipCuepoint) {
                if (cur > curC) {
                  clipCuepoint = false;
                }
              }
              switch (cur) {
                case Math.round(dur / 4):
                  if (!clipQuarter) {
                    clipQuarter = true;
                    curQ = q1;
                    OnClipFirstQuarter();
                  }
                  break;
                case Math.round(dur / 2):
                  if (!clipQuarter) {
                    clipQuarter = true;
                    curQ = q2;
                    OnClipSecondQuarter();
                  }
                  break;
                case Math.round(dur - dur / 4):
                  if (!clipQuarter) {
                    clipQuarter = true;
                    curQ = q3;
                    OnClipThirdQuarter();
                  }
                  break;
              }
              if (clip.cuepoints && !clipCuepoint) {
                if (clip.cuepoints.indexOf(cur) != -1) {
                  clipCuepoint = true;
                  curC = clip.cuepoints[clip.cuepoints.indexOf(cur)];
                  OnCuepoint();
                }
              }
            }, 100);
          },
          end: function () {
            clearInterval(timer);
          },
          once: function () {
            OnBuffer();
            OnProgress();
          }
        };
      })();

      function Toggle() {
        if (!isPlaying) {
          Play();
        } else {
          Pause();
        }
      }

      function Play(_clip) {
        if (isMetaDataLoaded) {
          system.system.initClickMade =
            system.system.initPlayMade =
            isPlaying =
              true;
          platform.playVideo();
          controls.play();
        } else if (!system.settings.preload) {
          Load(system.playlist.getCurrentClip());
        }
      }

      function Pause() {
        if (isMetaDataLoaded) {
          isPlaying = false;
          platform.pauseVideo();
          controls.pause();
        }
      }

      function SetVolume(vol) {
        if (isMetaDataLoaded) {
          platform.setVolume(vol);
        } else {
          system.settings.volume = vol;
          controls.setVolume(vol || '0');
        }
        OnVolumeChange(vol);
      }

      function GetVolume() {
        if (isMetaDataLoaded) {
          return platform.getVolume();
        }
      }

      function GetDuration() {
        if (isMetaDataLoaded) {
          return platform.getDuration();
        }
      }

      function SetCurrentTime(newTime) {
        if (isMetaDataLoaded) {
          platform.seekTo(newTime);
        }
      }

      function GetCurrentTime() {
        return platform.getCurrentTime() || '0';
      }

      function ToggleFullScreen(e) {
        if (!fullscreen.getState()) {
          FullScreenEnter(e);
        } else {
          FullScreenExit(e);
        }
      }

      function FullScreenEnter(e) {
        fullscreen.on(e);
        Update.once();
        OnFullScreenEnter();
      }

      function FullScreenExit(e) {
        fullscreen.off(e);
        Update.once();
        OnFullScreenExit();
      }

      function Destroy() {
        Update.end();
        system.API = {};
        if (poster) {
          window.Codo(poster).remove();
        }
        if (parentEl) {
          window.Codo(parentEl).remove();
        }
      }

      function OnBeforeLoad() {
        for (var i = 0; i < onBeforeLoadCallBk.length; i++) {
          if (onBeforeLoadCallBk[i]) {
            onBeforeLoadCallBk[i]();
          }
        }
      }

      function OnLoad() {
        for (var i = 0; i < onLoadCallBk.length; i++) {
          if (onLoadCallBk[i]) {
            onLoadCallBk[i]();
          }
        }
      }

      function OnPlay() {
        if (isMetaDataLoaded) {
          isPlaying = true;
          if (overlay) {
            overlay.off();
          }
          if (!buffering) {
            controls.play();
          }
          Update.start();
          if (!clipBegin) {
            clipBegin = true;
            OnClipBegin();
          }
          for (var i = 0; i < onPlayCallBk.length; i++) {
            if (onPlayCallBk[i]) {
              onPlayCallBk[i](platform.getCurrentTime());
            }
          }
        }
      }

      function OnPause() {
        if (
          isMetaDataLoaded &&
          platform.getDuration() - platform.getCurrentTime() > 0.1
        ) {
          isPlaying = false;
          if (!buffering) {
            if (overlay) {
              overlay.on();
            }
            controls.pause();
          }
          for (var i = 0; i < onPauseCallBk.length; i++) {
            if (onPauseCallBk[i]) {
              onPauseCallBk[i](platform.getCurrentTime());
            }
          }
        }
      }

      function OnEnd() {
        isPlaying = false;
        system.system.firstClipOver = true;
        controls.pause();
        Update.end();
        //Loading.on();
        OnClipEnd();
        system.playlist.next();
        for (var i = 0; i < onEndCallBk.length; i++) {
          if (onEndCallBk[i]) {
            onEndCallBk[i]();
          }
        }
      }

      function OnVolumeChange(vol) {
        system.settings.volume = vol;
        controls.setVolume(vol || '0');
        for (var i = 0; i < onVolumeChange.length; i++) {
          if (onVolumeChange[i]) {
            onVolumeChange[i](system.settings.volume);
          }
        }
      }

      function OnBuffer() {
        if (isMetaDataLoaded) {
          controls.buffer(
            (platform.getVideoLoadedFraction() * 100 * platform.getDuration()) /
              100
          );
          for (var i = 0; i < onBufferCallBk.length; i++) {
            if (onBufferCallBk[i]) {
              onBufferCallBk[i](
                (platform.getVideoLoadedFraction() *
                  100 *
                  platform.getDuration()) /
                  100
              );
            }
          }
        }
      }

      function OnProgress() {
        if (platform.getCurrentTime && platform.getCurrentTime()) {
          controls.progress(platform.getCurrentTime());
          for (var i = 0; i < onProgressCallBk.length; i++) {
            if (onProgressCallBk[i]) {
              onProgressCallBk[i](platform.getCurrentTime());
            }
          }
        }
      }

      function OnSeekStart() {
        Update.end();
        for (var i = 0; i < onSeekStartCallBk.length; i++) {
          if (onSeekStartCallBk[i]) {
            onSeekStartCallBk[i](platform.getCurrentTime());
          }
        }
      }

      function OnSeekEnd() {
        Update.start();
        for (var i = 0; i < onSeekEndCallBk.length; i++) {
          if (onSeekEndCallBk[i]) {
            onSeekEndCallBk[i](platform.getCurrentTime());
          }
        }
      }

      function OnError() {
        isPlaying = false;
        Update.end();
        var errorMsg = type + ' not found';
        errorCtrl.on(errorMsg);
        for (var i = 0; i < onErrorCallBk.length; i++) {
          if (onErrorCallBk[i]) {
            onErrorCallBk[i](errorMsg);
          }
        }
      }

      function OnMetaData() {
        isMetaDataLoaded = true;
        metaObj.width = system.settings.currentWidth; //platform.videoWidth;
        metaObj.height = system.settings.currentHeight; //platform.videoHeight;
        metaObj.duration = platform.getDuration();
        if (poster) {
          poster = window.Codo(poster).remove();
        }
        util.resize(parentEl, metaObj.width, metaObj.height);
        platform.pauseVideo();

        if (system.playlist.breakTime !== '0') {
          SetCurrentTime(system.playlist.breakTime);
        }

        if (autoplay) {
          Play();
        } else {
          if (!system.system.firstClipOver) {
            if (!system.settings.preload || system.settings.autoplay) {
              Play();
            }
          } else {
            if (clip.hasPrevious || system.settings.loop) {
              Play();
            }
          }
        }
        if (isPlaying) {
          if (loader) {
            loader.off();
          }
        } else {
          if (loader) {
            loader.off('cover');
          }
        }
        controls.title(clip.title || ' ');
        controls.time();
        platform.setVolume(system.settings.volume);
        Update.once();
        for (var i = 0; i < onMetaDataCallBk.length; i++) {
          if (onMetaDataCallBk[i]) {
            onMetaDataCallBk[i](metaObj);
          }
        }
      }

      function OnFullScreenEnter() {
        for (var i = 0; i < onFullScreenEnterCallBk.length; i++) {
          if (onFullScreenEnterCallBk[i]) {
            onFullScreenEnterCallBk[i]();
          }
        }
      }

      function OnFullScreenExit() {
        for (var i = 0; i < onFullScreenExitCallBk.length; i++) {
          if (onFullScreenExitCallBk[i]) {
            onFullScreenExitCallBk[i]();
          }
        }
      }

      function OnClipBegin() {
        for (var i = 0; i < onClipBegin.length; i++) {
          if (onClipBegin[i]) {
            onClipBegin[i]();
          }
        }
      }

      function OnClipFirstQuarter() {
        for (var i = 0; i < onClipFirstQuarter.length; i++) {
          if (onClipFirstQuarter[i]) {
            onClipFirstQuarter[i]();
          }
        }
      }

      function OnClipSecondQuarter() {
        for (var i = 0; i < onClipSecondQuarter.length; i++) {
          if (onClipSecondQuarter[i]) {
            onClipSecondQuarter[i]();
          }
        }
      }

      function OnClipThirdQuarter() {
        for (var i = 0; i < onClipThirdQuarter.length; i++) {
          if (onClipThirdQuarter[i]) {
            onClipThirdQuarter[i]();
          }
        }
      }

      function OnClipEnd() {
        for (var i = 0; i < onClipEnd.length; i++) {
          if (onClipEnd[i]) {
            onClipEnd[i]();
          }
        }
      }

      function OnCuepoint() {
        for (var i = 0; i < onCuepoint.length; i++) {
          if (onCuepoint[i]) {
            onCuepoint[i]();
          }
        }
      }
      return {
        platformName: 'YOUTUBE',
        isPlaying: function () {
          return isPlaying;
        },
        isMetaDataLoaded: function () {
          return isMetaDataLoaded;
        },
        onBeforeLoad: function (callBk) {
          if (callBk) {
            onBeforeLoadCallBk.push(callBk);
          }
        },
        onLoad: function (callBk) {
          if (callBk) {
            onLoadCallBk.push(callBk);
          }
        },
        onMetaData: function (callBk) {
          if (callBk) {
            onMetaDataCallBk.push(callBk);
          }
        },
        onPlay: function (callBk) {
          if (callBk) {
            onPlayCallBk.push(callBk);
          }
        },
        onPause: function (callBk) {
          if (callBk) {
            onPauseCallBk.push(callBk);
          }
        },
        onEnd: function (callBk) {
          if (callBk) {
            onEndCallBk.push(callBk);
          }
        },
        onBuffer: function (callBk) {
          if (callBk) {
            onBufferCallBk.push(callBk);
          }
        },
        onProgress: function (callBk) {
          if (callBk) {
            onProgressCallBk.push(callBk);
          }
        },
        onSeekStart: function (callBk) {
          if (callBk) {
            onSeekStartCallBk.push(callBk);
          }
        },
        onSeekEnd: function (callBk) {
          if (callBk) {
            onSeekEndCallBk.push(callBk);
          }
        },
        onVolumeChange: function (callBk) {
          if (callBk) {
            onVolumeChange.push(callBk);
          }
        },
        onFullScreenEnter: function (callBk) {
          if (callBk) {
            onFullScreenEnterCallBk.push(callBk);
          }
        },
        onFullScreenExit: function (callBk) {
          if (callBk) {
            onFullScreenExitCallBk.push(callBk);
          }
        },
        onError: function (callBk) {
          if (callBk) {
            onErrorCallBk.push(callBk);
          }
        },
        getParent: function () {
          return parentEl;
        },
        getPoster: function () {
          return poster;
        },
        toggle: function () {
          Toggle();
        },
        play: function (_clip, _autoplay) {
          if (_clip) {
            clip = _clip;
            autoplay = _autoplay;
            Load();
          } else {
            Play();
          }
        },
        pause: function () {
          Pause();
        },
        setVolume: function (volume) {
          SetVolume(volume);
        },
        getVolume: function () {
          return GetVolume();
        },
        getDuration: function () {
          return GetDuration();
        },
        setCurrentTime: function (newTime) {
          SetCurrentTime(newTime);
        },
        getCurrentTime: function () {
          return GetCurrentTime();
        },
        toggleFullScreen: function (e) {
          ToggleFullScreen(e);
        },
        fullScreenEnter: function (e) {
          FullScreenEnter(e);
        },
        fullScreenExit: function (e) {
          FullScreenExit(e);
        },
        destroy: function () {
          Destroy();
        },
        onClipBegin: function (callBk) {
          if (callBk) {
            onClipBegin.push(callBk);
          }
        },
        onClipFirstQuarter: function (callBk) {
          if (callBk) {
            onClipFirstQuarter.push(callBk);
          }
        },
        onClipSecondQuarter: function (callBk) {
          if (callBk) {
            onClipSecondQuarter.push(callBk);
          }
        },
        onClipThirdQuarter: function (callBk) {
          if (callBk) {
            onClipThirdQuarter.push(callBk);
          }
        },
        onClipEnd: function (callBk) {
          if (callBk) {
            onClipEnd.push(callBk);
          }
        },
        onCuepoint: function (callBk) {
          if (callBk) {
            onCuepoint.push(callBk);
          }
        }
      };
    };
    // System start
    var system = new System(settingsObj);
    var util = new Util(system);
    //  Playlist API
    system.playlist = new Playlist(system);

    // Add style
    // window
    //   .Codo()
    //   .link(
    //     system.system.rootPath +
    //       'styles/' +
    //       system.settings.style +
    //       '/style.css'
    //   );

    // Parent style
    var parentStyle =
      'position: relative; width: 100%; height: 100%; cursor: default; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-font-smoothing: antialiased; visibility: hidden; overflow: hidden;';
    if (!placeHolder) {
      //  Inline
      document.write(
        "<div id='" +
          system.id +
          "' class='" +
          system.className +
          "' style='" +
          parentStyle +
          "'></div>"
      );
    } else {
      //  Dynamic
      if (!window.Codo(placeHolder).get()[0]) {
        return;
      }

      window.Codo(placeHolder).add({
        el: 'div',
        id: system.id,
        className: system.className,
        style: parentStyle
      });
    }

    // Assign parent container
    var parent = (system.DOM.parent = document.getElementById(system.id));

    //  Post system fix
    system.settings.width = system.settings.currentWidth =
      system.settings.width || window.Codo(parent).getWidth();
    system.settings.height = system.settings.currentHeight =
      system.settings.height ||
      window
        .Codo()
        .getVideoHeight(
          system.settings.width,
          system.settings.ratio[0],
          system.settings.ratio[1]
        );

    parent.style.width = system.settings.width + 'px';
    parent.style.minHeight = system.settings.height + 'px';

    //  Containers
    var container = window.Codo(parent).add({
      el: 'div',
      className: system.className + '-container',
      style:
        'position: relative; margin: 0; padding: 0; width: ' +
        system.settings.width +
        'px; height: ' +
        system.settings.height +
        'px;'
    });
    system.DOM.container = container;

    var containerScreen = window.Codo(container).add({
      el: 'div',
      className: system.className + '-container-screen',
      style:
        'position: absolute; top: 0; left: 0; width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;'
    });
    system.DOM.containerScreen = containerScreen;

    system.DOM.containerScreenCanvas = window.Codo(containerScreen).add({
      el: 'div',
      className: system.className + '-container-screen-canvas',
      style:
        'position: absolute; top: 0; left: 0; width: 100%; height: 100%; margin: 0; padding: 0;'
    });

    // Add logo
    if (l && system.settings.logo) {
      window.Codo(container).add({
        el: 'img',
        src: system.settings.logo,
        className: system.className + '-container-logo',
        style: 'position: absolute; top: 20px; right: 20px;'
      });
    }

    //  Config
    var loader = true;
    var overlay = true;

    //  Overlay is dependant on loader, so if loader is off, overlay must be triggered explicitly
    if (loader) {
      loader = new Loader(system);
    }
    if (overlay) {
      overlay = new Overlay(system);
    }
    if (!loader && overlay) {
      overlay.on();
    }

    //  Must haves'
    var controller = new Controller(system);
    var controls = new Controls(system);
    var errorCtrl = new ErrorCtrl(system);
    var fullscreen = new FullScreen(system);

    //  Context menu
    window.Codo(system.DOM.parent).on('contextmenu', function (e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue;
      }
      if (overlay) {
        overlay.menu();
      }
    });

    if (!system.plugins.advertising) {
      system.playlist.set(playlistObj, system.settings.autoplay);
    }

    var keys = 0,
      currKey = 0;
    for (var key in system.plugins) {
      keys++;
    }

    //  Load plugins
    for (var key in system.plugins) {
      if (system.plugins[key]) {
        window.Codo().script(
          system.system.rootPath +
            'plugins/' +
            key +
            '/codo-player-' +
            key +
            '.js',
          function (success, key) {
            if (key == 'advertising') {
              if (!success) {
                if (system.plugins[key].fallback) {
                  system.plugins[key].fallback(system);
                } else {
                  system.playlist.set(playlistObj, system.settings.autoplay);
                }
              } else {
                system.plugins[key].initCover = window
                  .Codo(system.DOM.container)
                  .add({
                    el: 'div',
                    className: system.className + '-advertising-init-cover',
                    style:
                      'position: absolute; top: 0; left: 0; width: 100%; height: 100%; visibility: visible; cursor: pointer; opacity: 0; filter: alpha(opacity=0);'
                  });
                system.plugins[key].autoplay = system.settings.autoplay;
                system.settings.preload = system.settings.autoplay = false;
                system.playlist.set(playlistObj, system.settings.autoplay);
                if (system.plugins[key].system) {
                  system.plugins[key].system.init(system);
                }
              }
            }
            currKey++;
            if (keys == currKey) {
              if (system.onReady) {
                system.onReady(system);
              }
            }
          },
          key
        );
      }
    }

    if (!keys) {
      if (system.onReady) {
        system.onReady(system);
      }
    }

    return system;
  }

  if (!window.CodoPlayerAPI.length) {
    var keyboardEv =
      keyboardEv ||
      function (e) {
        if (window.CodoPlayerAPI.length === 1) {
          if (e.target.nodeName == 'INPUT' || e.target.nodeName == 'TEXTAREA') {
            return;
          }
          e = e || window.event;
          var pl = window.CodoPlayerAPI[0];
          var volume = pl.media.getVolume();
          var seek = pl.media.getCurrentTime();
          switch (e.keyCode) {
            case 70:
              e.preventDefault();
              pl.media.toggleFullScreen(e);
              break;
            case 32:
              e.preventDefault();
              pl.media.toggle();
              break;
            case 38:
              e.preventDefault();
              if (volume <= 100) {
                volume = volume + 10;
                if (volume > 100) {
                  volume = 100;
                }
                pl.media.setVolume(volume);
              }
              break;
            case 40:
              e.preventDefault();
              if (volume >= 0) {
                volume = volume - 10;
                if (volume < 0) {
                  volume = 0;
                }
                pl.media.setVolume(volume);
              }
              break;
            case 39:
              e.preventDefault();
              if (
                pl.settings.controls.seeking &&
                seek <= pl.media.getDuration()
              ) {
                seek = seek + 5;
                pl.media.setCurrentTime(seek);
              }
              break;
            case 37:
              e.preventDefault();
              if (pl.settings.controls.seeking && seek >= 0) {
                seek = seek - 5;
                pl.media.setCurrentTime(seek);
              }
              break;
          }
        }
      };
    window.Codo(document).off('keydown', keyboardEv);
    window.Codo(document).on('keydown', keyboardEv);
  }

  window.Codo(window).on('resize', function (e) {
    for (var i = 0; i < window.CodoPlayerAPI.length; i++) {
      var pl = window.CodoPlayerAPI[i];
      if (!pl.system.isFullScreen && pl.settings.responsive) {
        pl.resize();
      }
    }
  });

  // Current instance
  var player = new Instance(playlistObj, settingsObj, placeHolder);

  // Push new instance into array
  window.CodoPlayerAPI.push(player);

  return player;
};

window.window.window.YTiframeReady = false;
window.onYouTubeIframeAPIReady = function () {
  window.window.YTiframeReady = true;
};

export default window.CodoPlayer;
