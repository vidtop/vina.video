TinyCore.Module.start('models_vidtop');

window.vidtop = {
    config_key: '2PACX-1vSZbM_FEoeFWBFaEEsOH9DJkGkqwgPLD8kaY6vnwwLfU1iKxpXmUiZGzNMGAJBL1YGbTWODsdg2zoqi'
}
vidtop._models = TinyCore.Module.instantiate('models_vidtop');
vidtop._cache = lru(100);
var models = vidtop._models;

window.onhashchange = _page_render;
window.onload = _page_render;
window._render_def = {};
for (var i in _) _[i][Unlimit](true);
vidtop._models.getData[Unlimit](true);

var _tmpl_data_header;
    // {
//     logo: {
//         img: 'http://streamiumtheme.com/wp-content/uploads/2017/10/if_woocommerce_1010057-2.png',
//         name: 'Streamium',
//         link: '/#'
//     },
//     menus: [{
//             name: 'TV',
//             link: '/#g/tv',
//             childs: [{
//                 name: 'Box Sets',
//                 link: '/#c/box-sets'
//             }]
//         },
//         {
//             name: 'My Account',
//             link: '/#a/1234'
//         }
//     ]
// }

function _get_render(_hash, _def, _cb) {
    _hash && nanoajax.ajax({
        url: './_' + _hash + '.html'
    }, function(_code, _res) {
        if (typeof window['render'] == "undefined") window['render'] = {};
        if (typeof window.render[_hash] == "undefined") window.render[_hash] = doT.template(_res, undefined, _def);
        _cb(window.render[_hash]);
    })
}

function _get_tmpl(_hash, _def, _data, _cb) {
    var _tmplc = vidtop._cache.get(_hash);
    if(_tmplc) {
	_cb(_tmplc(_data));
    } else
    _get_render(_hash, _def, function(_tmpl) {
	vidtop._cache.set(_hash, _tmpl);
        _cb(_tmpl(_data));
    })
}
function _home_render(_gd_key, _cb) {
    models.getData(_gd_key, function(_e1) {
	console.log("e1:");console.log(_e1);
	_e1[_.map](
	    function(_e2, _cb2){
		models.getData(_e2.gd_key, function(_e3){
		    var _type = _e2.type == 'channel'?'category':_e2.type;
		    console.log("e3:");console.log(_e3);
		    switch(_type) {
		    case 'featured':
			_e3[_.map](function(_e4, _cb4){
			    console.log("_e4");console.log(_e4);
			    models.getData(_e4.gd_key, function(_e44){
				var _t111 = Object.assign(_e4,_e44[0]);
				var _gd_key_id =  _e4.gd_key;
				_t111.post = {ID:  _gd_key_id};
				_t111.href = vidtop.config.domain + '/#p/' +  _gd_key_id;
				_t111.link = _t111.href;
				_t111.content = _t111.text;
				_t111.post_id = _gd_key_id;
				_cb4(null, _t111);
			    })
			}, function(_er, _ee4){
			    console.log("ee4:");console.log(_ee4);
			    _cb2(null, {type: _type, val: _ee4})
			})
			break;
		    default:
			_cb2(null, {
			    type: _type,
			    val: {
				meta: Object.assign(_e2, {
				    count: _e3.length,
				    home: vidtop.config.domain + '/#',
				    link: vidtop.config.domain +  '/#' + (_e2.type == 'channel'?'i/':'c/') + _e2.catSlug
				}),
				data:_e3.map(function(_t111){
				    var _gd_key_id =  _e2.gd_key + '.' + _t111.id; 
				    _t111.post = {ID:  _gd_key_id};
				    _t111.href = vidtop.config.domain +  '/#p/' +  _gd_key_id;
				    _t111.link = _t111.href;
				    _t111.content = _t111.text;
				    _t111.post_id = _gd_key_id;
				    return _t111;
				})
			    }
			}
			    );
		    }

		})
	    },
	    function(_er, _ee){
		console.log('ee');console.log(_ee);
		var _ee1 = _ee.reduce(function(_obj, _ee2){
		    _obj[_ee2.type] = _obj[_ee2.type] || [];
		    if(_ee2.type == 'featured')
			_obj[_ee2.type] = _ee2.val;
		    else
			_obj[_ee2.type].push(_ee2.val);
		    return _obj;
		}, {});
		console.log("_ee1");console.log(_ee1);
		_cb(_ee1);
	    })
    })

}

function _page_streamium_object(_hashesr, _cb) {
    var _hash = _hashesr[0];
    console.log(vidtop.config);
    console.log(_hashesr.join('|'));
    var _gd_key = objectPath.get(vidtop.config, _hashesr.join('|'));
    console.log('_gd_key:' + _gd_key);

    if (!_gd_key && /^2PACX-/.test(_hashesr[1])) {
        _gd_key = _hashesr[1];
    }
    switch (_hash) {
    case 'i':
        window.streamium_object = {
            "ajax_url": "data",
            "is_home": "1",
            "tile_count": "6",
            "read_more": "read more",
            "autoplay_slider": "1"
        };
        if (_gd_key) {
            _home_render(
                _gd_key,
                function(_res) {
                    console.log('step 1:');
                    console.log(_res);
                    window.streamium_object._data = _res;
		    _get_tmpl('hf',
                              _render_def, {
                                  data: _res.featured
                              },
                              function(_res) {
                                  //					  console.log('___res');console.log(_res);
                                  _render_def['home_featured'] = _res;
                                  _cb();
                              })
                })
        } else
            _cb();
        break;
    case 'c':
        console.log('_hash:' + _hashesr[1]);
        window.streamium_object = {
            "ajax_url": "data",
            "query": {
                "name": _hashesr[1],
            },
            "is_archive": "1",
            "is_tax": "1",
            "tile_count": "6",
            "read_more": "read more",
            "autoplay_slider": "0"
        };

        if (_gd_key) {
            models.getData(_gd_key, function(_e2) {
                console.log('e2');
                console.log(_e2);
		var _e22 =  _e2.map(function(_t111) {
		    var _gd_key_id =  _gd_key + '.' + _t111.id;
		    _t111.post = {ID:  _gd_key_id};
		    _t111.href = vidtop.config.domain +  '/#p/' +  _gd_key_id;
		    _t111.link = _t111.href;
		    _t111.content = _t111.text;
                    return _t111;
		});
                window.streamium_object._data = {
		    category: [{data: _e22
			       }]};
                _cb();
            })
        } else
            _cb();
        break;

    case 'p':
        _tmpl_data['postid'] = _hashesr[1];
        window.streamium_object = {
            "ajax_url": "data",
            "query": {
                "ID": _hashesr[1]
            },
            "tile_count": "6",
            "read_more": "read more",
            "autoplay_slider": "0"
        }
	models.getPlayObj(_gd_key, function(_e3){
	    _e3.post_id = _hashesr[1];
	    window.video_post_object = _e3;
	    _cb();
	})
      
            break;
        case 's':
            var _kw = location.search.replace('?s=', '');
            _tmpl_data['keyword'] = _kw;
            window.streamium_object = {
                "ajax_url": "data",
                "search": {
                    "s": _kw
                },
                "is_search": "1",
                "tile_count": "6",
                "read_more": "read more",
                "autoplay_slider": "0"
            };
            _cb();
            break;
    }
}

function _page_render() {
    var _hashes = window.location.hash.split('?')[0].split('#')[1];
    var _hashesr = [];
    if (_hashes)
        _hashesr = _hashes.split('/')

    if (!_hashesr[0] || _hashesr[0] == "/") {
        _hashesr[0] = "i";
    }
    var _hash = _hashesr[0];

    _tmpl_data = {};

    [
        function(_cb) {
            models.getData(window.vidtop.config_key, function(_dd) {
                window.vidtop.config = _.reduce(_dd, function(_o, _o1) {

		    if(_o1['name'] == 'domain') _o1['value'] = '';
                    objectPath.set(_o, _o1['name'], _o1['value']);
		    if(_o1['name'] == 'player') _o['player'] = _o1['value'].split('.')[0];
                    return _o;
                }, {});
                _cb();
            })
        },
        function(_cb9) {
            [
                function(_cb) {
                    _page_streamium_object(_hashesr, function() {
                        console.log(window.streamium_object);
                        _cb();
                    })
                },
              
                function(_cb) {
                    if (_hash == 'p' || _render_def['header']) return _cb();
                    _get_tmpl('h',
			      _render_def,
			      JSON.parse(window.vidtop.config.menu),
			      //_tmpl_data_header,
			      function(_res) {
                        _render_def['header'] = _res;
                        _cb();
                    })
                },
                function(_cb) {
                    if (_hash == 'p' || _render_def['footer']) return _cb();
                    _get_tmpl('f', _render_def, {}, function(_res) {
                        _render_def['footer'] = _res;
                        _cb();
                    })
                },
                function(_cb) {
                    if (_hash == 'c' || _hash == 'p')
                        //	|| _render_def['home_featured'])
                        return _cb();
                    var _gd_key_featured = objectPath.get(vidtop.config, _hashesr.join('_') + '_featured');
                    console.log('check feature:' + _hashesr.join('_'));
                    _render_me = function(_featured, _cb) {
                        // if (_render_def['home_featured']) {
                        //     _cb();
                        // } else {
                            _get_tmpl('hf',
                                _render_def, {
                                    data: _featured
                                },
                                function(_res) {
                                    //					  console.log('___res');console.log(_res);
				    _render_def['home_featured'] = _res;
                                    _cb();
                                })
//                        }
                    }
                    if (_gd_key_featured) {
                        console.log('gd_key_featured:' + _gd_key_featured);
                        // if (vidtop.cache.get(_gd_key_featured)) {
                        //     window.streamium_object._featured = vidtop.cache.get(_gd_key_featured);
                        //     _render_me(streamium_object._featured, _cb);
                        // } else {
                            models.getData(_gd_key_featured, function(_hf_data) {

                                // console.log('hf_data:');
                                // console.log(_hf_data);
                                // vidtop.cache.set(
                                //     _gd_key_featured,
                                //     _hf_data);
                                // console.log('_featured:');
                                // console.log(vidtop.cache.get(_gd_key_featured));
                                window.streamium_object._featured = _hf_data;
				    //vidtop.cache.get(_gd_key_featured);
                                _render_me(_hf_data, _cb);
                            })
//                        }
                    } else
                        _cb();

    
                }
            ][_.parallel](function() {
		console.log("_hash:" + _hash);
//                if (_render_def[_hash]) return _cb9();
                _get_tmpl(_hash, _render_def, _tmpl_data, function(_res) {
		    _render_def[_hash] = _res;
                    _cb9();
                })
            })
        }
    ][_.series](function() {
        if (_hash == 'c')
            jQuery('main').empty();
        var _el = document.querySelector('#page_container');
        morphdom(_el, _render_def[_hash]);
        jQuery(".menu-item-has-children").children("a").off("click");
        _page_reload();
        s3bubbleHelpers.addScripts();

        if (_hash == 'i' || _hash == 'g') {
            setTimeout(function() {
                var _el = document.querySelector('.slick-list.draggable');
                _el && _el.setAttribute("style", "overflow: hidden;");
		//_el && _el.setAttribute("style", "height: 816px; overflow: hidden;");
            }, 1000)
        }
        setTimeout(function() {
            if (window._bLazy) window._bLazy.revalidate();
            else {
                window._bLazy = new Blazy({
                    selector: '.lazy',
                    success: function(ele) {}
                })
            }
        }, 1000);
        window.ga && window.ga('send', 'pageview', {
            'page': location.pathname + location.search + location.hash
        });
    })
}

(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-107275469-1', 'auto');
ga('send', 'pageview');
