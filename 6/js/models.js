TinyCore.Module.define('models_vidtop', [], function(){
//    var _cache = Cache();
    var _ttl = 600000;
    return {
	onStart: function(params){

	},
	getDataItem: function(key, _t111) {
	    var _gd_key_id =  key + '.' + _t111.id;
	    _t111.post = {ID: _gd_key_id};
	    _t111.href = '#p/' + _gd_key_id;
	    _t111.link = '#p/' + _gd_key_id;
	    _t111.content = _t111.text;
	    _t111.post_id = _gd_key_id;
	    return _t111;
	},
	getDataList: function(key, callback){
	    var that = this;
	    that.getData(key, function(_e3) {
		callback(
		    _e3.filter(function(_e) {
			return _e;
		    }).map(function(_e){return that.getDataItem(key, _e)})
		)
            })
	},
	getPlayObj: function(_gd_key, _cb){
	    console.log('getPlayObj:' + _gd_key);
	    var that = this;
	    if (_gd_key) {
		var _m_gd_key_ar = _gd_key.split('.');
		var _gd_key_m = _m_gd_key_ar[0];

		var _gd_key_id = _m_gd_key_ar[1];
		that.getData(_gd_key_m, function(_e2_) {
		    console.log('_e2_:');console.log(_e2_)
                    var _e2 = _e2_.filter(function(_e3){
			return _e3.id == _gd_key_id;
		    })[0];
		    console.log('e2'); console.log(_e2);

		    that.getDataPlayDetail(_e2, _cb);
//					   function(_e3) {
			//_e3.post_id = _hashesr[1];
			//window.video_post_object = _e3;
		    // 	_cb(_e3);
		    // })
		    
		})
	    } else _cb();
	},
	getDataPlayDetail: function(_e2, callback){
	    console.log('_e2222222');console.log(_e2);
	    this.getData(_e2.player, function(_e3_) {
		var _e3 = _e3_.constructor === Array?_e3_[0]:_e3_;
//		if (_e3.options.youtube){
		if (_e2.src_type == 'youtube'){
                    var _vcode = _e2.src_play;
		    Object.assign(_e3.meta, {
			title: _e2.title,
			subTitle: _e2.subTitle
		    });
		    Object.assign(_e3, {
			codes: ['https://www.youtube.com/watch?v=' + _vcode],
			poster : 'https://img.youtube.com/vi/' + _vcode + '/maxresdefault.jpg',
			preview : {"previewSeconds": "0", "previewLink": "", "previewTitle": "", "previewDescription": ""}
		    });
		    _e3.options.youtube = 1;
		    _e3.options.code = _e2.src_play;
		}
		console.log("_e3");console.log(_e3);
		callback(_e3);
	    })
	},

	_getDataHandler:  function(_res, key, _id, callback){
	    var _tmp = _res.filter(function(_e){return _e.status});
	    var _val;
		if(_id)
		    _val = _tmp.filter(function(_e){ return _e.id == _id});
		else
		    _val = _tmp;
		
		callback(_val);
	},
	getData: function(key, callback){
//	    if(_cache[key]) return callback(_cache[key]);
	    var that = this;
	    var _id, key1;
	    if(/\./.test(key)) {
		var _keyr = key.split('.');
		_id = _keyr[1];
		key1 = _keyr[0]
	    } else {
		key1 = key;
	    }
	    var _url = 'https://docs.google.com/spreadsheets/d/e/' + key1 +'/pub?output=csv';
	    //  if(_cache[key1]) {
	    // 	that._getDataHandler(_cache[key1], key, _id, callback);
	    // } else
		that._api(_url, function(_val){
		    //_cache[key1] = _val;
		    that._getDataHandler(_val, key, _id, callback);
		});
	},

	_csvJSON: function csvJSON(lines){

	    var result = [];
	    var headers=lines[0];
	    for(var i = 1; i < lines.length; i++) {
		var obj = {};
		var currentline = lines[i];
		var currentlinei;
		for(var j = 0; j < headers.length; j++) {
		    currentlinei = currentline[j];
		    objectPath.set(obj, headers[j], currentlinei);
		    //obj[headers[j]] = currentlinei;
		}
		result.push(obj);
	    }
//	    console.log(result);
	    return result;
	},
	_api: function(input, callback){
	    var self = this;
	    var config = buildConfig();
	    var start = now();
	    var end;
	    Papa.parse(input, config);
	    function printStats(msg) {
		if (msg)
		    console.log(msg);
		console.log("       Time:", (end - start || "(Unknown; your browser does not support the Performance API)"), "ms");

	    }
	    function buildConfig() {
		return {
		    delimiter: "",	// auto-detect
		    newline: "",	// auto-detect
		    quoteChar: '"',
		    header: false,
		    dynamicTyping: true,
		    preview: 0,
		    encoding: "",
		    worker: false,
		    comments: false,
		    skipEmptyLines: false,
		    chunk: undefined,
		    fastMode: undefined,
		    beforeFirstChunk: undefined,
		    withCredentials: undefined,
		    step: undefined,
		    complete: completeFn,
		    error: errorFn,
		    download: true
		};
	    }


	    function completeFn(results) {
		end = now();
		printStats("Parse complete");
		var json_results = self._csvJSON(results.data);
		callback(json_results);
	    }

	    function errorFn(err, file) {
		end = now();
		console.log("ERROR:", err, file);
	    }


	    function now() {
		return typeof window.performance !== 'undefined' ?
		    window.performance.now() :
		    0;
	    }
	}
    }
})
