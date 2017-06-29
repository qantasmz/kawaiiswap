$(function () {

	var _data;
	var _prevnum = 0;
	var _brx = 85;
	var _bry = 85;
	var _blx = 85;
	var _bly = 85;

	var _btrsn = 0;
	var _btrcs = 0;
	var _btlsn = 0;
	var _btlcs = 0;
	var _btspd = 0.001;
	var _bmode = 0;
	var _btmode = 0;
	var _ctmode = 0;
	var _prevw=0;
	var _dprevw=0;
	var _prevh=0;
	var _dprevh=0;
	var _stat = 0;
	var _twseed = 90;
var _pv = 0;

	var _bbrx = 50;
	var _bbry = 50;
	var _bblx = 50;
	var _bbly = 50;

	var _cbrx = 30;
	var _cbry = 30;
	var _cblx = 30;
	var _cbly = 30;
	var _img_tag;
	var _gifLink;
	var _calCount = 0;
	var _cal_arr = ["#FF0000","#FFFF00","#00FFFF","#0000FF","#00FF00","#FF00FF","#F0000F"];

	var _api_arr = ["fluffy","kitten","kittens playing","puppy","puppy fail","baby animals"]
	var _tcnt = 0;
	var _isProcess = 0;
	render();
	var fa = document.createElement('style');
	fa.type = 'text/css';
	fa.textContent = '@font-face { font-family: misobold; src: url("'+ chrome.extension.getURL('css/fonts/miso-bold.otf')
        + '") format("opentype"); }';
	document.head.appendChild(fa);

	var ft = document.createElement('style');
	ft.type = 'text/css';
	ft.textContent = '@font-face { font-family: misoreg; src: url("'+ chrome.extension.getURL('css/fonts/miso-regular.otf')
        + '") format("opentype"); }';
	document.head.appendChild(ft);
	$('#tweet-box-home-timeline').on('DOMSubtreeModified propertychange', function() {
		if(_isProcess == 0){
			shuffleGif();
/*
			var _len = document.getElementById('tweet-box-home-timeline').childNodes.length;
			if(_len >0){
				for(var i=0; i<_len; i++){
					censor($(document.getElementById('tweet-box-home-timeline').childNodes[i]),i,$(document.getElementById('tweet-box-home-timeline').childNodes[i]).text());
				}
			}
			*/

			censor('tweet-box-global',$('#tweet-box-home-timeline').text());
		}
		
	});
	$('#tweet-box-global').on('DOMSubtreeModified propertychange', function() {
		if(_isProcess == 0){
			shuffleGif();
			censor('tweet-box-global',$('#tweet-box-global').text());
		}
		
	});
	
	//censor('tweet-box-global',$('#tweet-box-home-timeline').text());
	//censor('tweet-box-global',$('#tweet-box-global').text());

	function censor(target,txt){
		var _html = txt;
		var _ext_arr = new Array();
		for(var i=0; i<_ng_arr.length; i++){
			if ( _html.indexOf(_ng_arr[i]) != -1) {
				var _ext = 0;
				for(var j=0; j<_ext_arr.length; j++){
					if(_ng_arr[i] == _ext_arr[j]){
						_ext = 1;
					}
				}
				if(_ext == 0){
					_isProcess = 1;
					/*
					var selection = window.getSelection();
					var range = document.createRange(); 
					if(selection.anchorOffset){
					console.log(selection.isCollapsed);
					console.log(s+":"+selection.anchorOffset);
					}
					var _add = "<span class='ngword'>"+_ng_arr[i]+"</span>"
					_html = _html.split(_ng_arr[i]).join(_add);

					target.html(_html);
					var _stag = "<span class='ngword'></span>";
					range.setStart(selection.anchorNode, selection.anchorOffset);

  					range.setEnd(selection.anchorNode, selection.anchorOffset);

					selection.removeAllRanges(); 
					selection.addRange(range);

					*/



					_ext_arr.push(_ng_arr[i]);
					_isProcess = 0;
				}
			}
		}
		var _res = "";
		var _isare = "is";
		var _word = "word";
		if(_ext_arr.length >1){
			_isare = "are";
			_word = "words";
		}
		_res += "Wait, are you sure you want to post <br />";
		for(var i=0; i<_ext_arr.length; i++){
			if(i<4){
				_res += '"';
				_res += _ext_arr[i];
				_res += '"';
				if(i != _ext_arr.length-1&&i != 4){
					_res += ', ';
				}else{
					_res += ' ';
				}
			}else if(i==4){
				_res += 'etc. ';
			}
		}
		_res += " ?";
		if(_ext_arr.length>0){
			$("#kawaiicopy").html(_res);
			if(_stat == 0){
				_stat = 1;
				expandBubble();
			}
		}else{
			$("#kawaiicopy").html("Wait, are you sure you want to post that?");
			console.log(_stat);
			if(_stat == 1){
				shrinkBubble();
			}
		}

	}
	function render() {


		var _brsn = Math.sin(_btrsn);
		_btrsn += 0.1;
		var _brcs = Math.cos(_btrcs);
		_btrcs += 0.12;
		var _blsn = Math.sin(_btlsn);
		_btlsn += 0.1;
		var _blcs = Math.cos(_btlcs);
		_btlcs += 0.12;
		var _bdrx = _twseed*0.95+_brsn*_twseed;
		var _bdry = _twseed*0.95+_brcs*_twseed;
		var _bdlx = _twseed*0.95+_blsn*_twseed;
		var _bdly = _twseed*0.95+_blcs*_twseed;
		if(_bmode == 0){
			_brx += (_bdrx-_brx)*_btspd;
			_bry += (_bdry-_bry)*_btspd;
			_blx += (_bdlx-_blx)*_btspd;
			_bly += (_bdly-_bly)*_btspd;
		}else{
			_brx = _twseed*0.95+Math.random()*4-2;
			_bry = _twseed*0.95+Math.random()*4-2;
			_blx = _twseed*0.95+Math.random()*4-2;
			_bly = _twseed*0.95+Math.random()*4-2;
		}
		
/*
		_brx = 45+Math.random()*4-2;
		_bry = 45+Math.random()*4-2;
		_blx = 45+Math.random()*4-2;
		_bly = 45+Math.random()*4-2;
*/
		//_btspd += (0.001-_btspd)*0.4;
		
		if(_pv < _brx){
			_pv = _brx;
		}

		$("#basecircle-sh-frame").attr('width',_twseed*2+ "px");
		$("#basecircle-sh-frame").attr('height',_twseed*2+ "px");
		$('#basecircle-sh-frame').removeAttr('viewBox');
		$('#basecircle-sh-frame').each(function () {
			$(this)[0].setAttribute('viewBox', '0 0 '+_twseed*2+" "+_twseed*2)
		});
		$("#basecircle-sh-frame").attr('enable-background',"new 0 0 "+_twseed*2+" "+_twseed*2);

		$("#basecircle-frame").attr('width',_twseed*2+ "px");
		$("#basecircle-frame").attr('height',_twseed*2+ "px");
		$('#basecircle-frame').removeAttr('viewBox');
		$('#basecircle-frame').each(function () {
			$(this)[0].setAttribute('viewBox', '0 0 '+_twseed*2+" "+_twseed*2)
		});
		$("#basecircle-frame").attr('enable-background',"new 0 0 "+_twseed*2+" "+_twseed*2);


		$("#basecircle").attr('transform', 'matrix(1.0,0.0,-0.0,1.0,'+_twseed+','+_twseed+')');
		$("#basecircle-sh").attr('transform', 'matrix(1.0,0.0,-0.0,1.0,'+_twseed+','+_twseed+')');
		$("#basecircle").attr('d', 'M'+_brx+',0c0,'+_twseed/2+'-'+_twseed/2+','+_brx+'-'+_bry+','+_bry+'c-'+_twseed/2+',0-'+_bry+'-'+_twseed/2+'-'+_blx+'-'+_blx+'c0-'+_twseed/2+','+_twseed/2+'-'+_blx+','+_bly+'-'+_bly+'C'+_twseed/2+'-'+_bly+','+_bly+'-'+_twseed/2+','+_brx+',0z');
		$("#basecircle-sh").attr('d', 'M'+_brx+',0c0,'+_twseed/2+'-'+_twseed/2+','+_brx+'-'+_bry+','+_bry+'c-'+_twseed/2+',0-'+_bry+'-'+_twseed/2+'-'+_blx+'-'+_blx+'c0-'+_twseed/2+','+_twseed/2+'-'+_blx+','+_bly+'-'+_bly+'C'+_twseed/2+'-'+_bly+','+_bly+'-'+_twseed/2+','+_brx+',0z');

		
		var _bbdrx = 58*0.95+_brsn*58;
		var _bbdry = 58*0.95+_brcs*58;
		var _bbdlx = 58*0.95+_blsn*58;
		var _bbdly = 58*0.95+_blcs*58;
		if(_btmode == 0){
			_bbrx += (_bbdrx-_bbrx)*_btspd;
			_bbry += (_bbdry-_bbry)*_btspd;
			_bblx += (_bbdlx-_bblx)*_btspd;
			_bbly += (_bbdly-_bbly)*_btspd;
		}else{
			_bbrx = 58*0.95+Math.random()*4-2;
			_bbry = 58*0.95+Math.random()*4-2;
			_bblx = 58*0.95+Math.random()*4-2;
			_bbly = 58*0.95+Math.random()*4-2;
		}

		$("#btcircle-ex").attr('d', 'M'+_bbrx+',0c0,29-29,'+_bbrx+'-'+_bbry+','+_bbry+'c-29,0-'+_bbry+'-29-'+_bblx+'-'+_bblx+'c0-29,29-'+_bblx+','+_bbly+'-'+_bbly+'C29-'+_bbly+','+_bbly+'-29,'+_bbrx+',0z');
		$("#btcircle-ex-sh").attr('d', 'M'+_bbrx+',0c0,29-29,'+_bbrx+'-'+_bbry+','+_bbry+'c-29,0-'+_bbry+'-29-'+_bblx+'-'+_bblx+'c0-29,29-'+_bblx+','+_bbly+'-'+_bbly+'C29-'+_bbly+','+_bbly+'-29,'+_bbrx+',0z');

		$("#btcircle-ex-line").attr('d', 'M'+_bbrx*0.93+',0c0,29-29,'+_bbrx*0.93+'-'+_bbry*0.93+','+_bbry*0.93+'c-29,0-'+_bbry*0.93+'-29-'+_bblx*0.93+'-'+_bblx*0.93+'c0-29,29-'+_bblx*0.93+','+_bbly*0.93+'-'+_bbly*0.93+'C29-'+_bbly*0.93+','+_bbly*0.93+'-29,'+_bbrx*0.93+',0z');

		var _cbdrx = 30*0.95+_brsn*30;
		var _cbdry = 30*0.95+_brcs*30;
		var _cbdlx = 30*0.95+_blsn*30;
		var _cbdly = 30*0.95+_blcs*30;
		if(_ctmode == 0){
			_cbrx += (_cbdrx-_cbrx)*_btspd;
			_cbry += (_cbdry-_cbry)*_btspd;
			_cblx += (_cbdlx-_cblx)*_btspd;
			_cbly += (_cbdly-_cbly)*_btspd;
		}else{
			_cbrx = 30*0.95+Math.random()*4-2;
			_cbry = 30*0.95+Math.random()*4-2;
			_cblx = 30*0.95+Math.random()*4-2;
			_cbly = 30*0.95+Math.random()*4-2;
		}

		$("#closebt-p").attr('d', 'M'+_cbrx+',0c0,15-15,'+_cbrx+'-'+_cbry+','+_cbry+'c-15,0-'+_cbry+'-15-'+_cblx+'-'+_cblx+'c0-15,15-'+_cblx+','+_cbly+'-'+_cbly+'C15-'+_cbly+','+_cbly+'-15,'+_cbrx+',0z');
		$("#closebt-sh").attr('d', 'M'+_cbrx+',0c0,15-15,'+_cbrx+'-'+_cbry+','+_cbry+'c-15,0-'+_cbry+'-15-'+_cblx+'-'+_cblx+'c0-15,15-'+_cblx+','+_cbly+'-'+_cbly+'C15-'+_cbly+','+_cbly+'-15,'+_cbrx+',0z');

		var _cal;
		_calCount += 1;
		$(".ngword").css({
			color: _cal_arr[_calCount]
		});
		if(_calCount == 7){
			_calCount = 0;
		}

		requestAnimationFrame(render);
	}
	
	urlDetect(document.URL);
	/*
	if (!window.top.listenerLoaded) {
	
		window.top.listenerLoaded = true;
	

		chrome.extension.onMessage.addListener(function(request, sender,
			sendResponse) {

			return true;
		
		});


		var request = {
			type : "background.getURL",
			url: document.URL
		};
		chrome.runtime.sendMessage(request, function(response) {
				
		});

	}
	*/

	function urlDetect(url){
		var u_arr = url.split("https://twitter.com");
		if(u_arr.length == 2){
			var c_arr = u_arr[1].split("/i/");
			if(c_arr.length < 2){
				//setGiphy();
				Settings.init(function(){

					if(Settings.properties["accessToken"]!=null){
						_data = new Array();
						setGiphy();
					}else{	
						console.log("no-login");
					}
				});
			}
		}
	}

	var layOver;
	function setLayOver(){
		layOver = $('<div>', {
			id:  'layOverDiv'
		});
		layOver.css({
			"position": "fixed",
			"top": $(window).height()-250,
			"left": $(window).width()-250,
			"width": 250,
			"height": 250,
			"z-index":120000,
			"overflow":"hidden",
			"opacity":0
		});
		layOver.animate({"opacity": 1}, 800, "easeOutExpo", function() {
			$( "#struc" ).click(function() {
				if(_stat == 0){
					_stat = 1;
					expandBubble();
				}
				//_bttime = setTimeout(setBmode, 150);
			});
			$( "#kawaiilogo" ).click(function() {
				if(_stat == 0){
					_stat = 1;
					expandBubble();
				}
				//_bttime = setTimeout(setBmode, 150);
			});
		});

		layOver.append('<div id="tgd"></div><div id="struc"><svg id="basecircle-sh-frame" x="0px" y="0px" width="180px" height="180px" viewbox="0 0 180 180" enable-background="new 0 0 180 180"><path id="basecircle-sh" fill="#F6E2E6" transform="matrix(1.0,0.0,-0.0,1.0,90,90)" d="M90,0c0,45-45,90-90,90c-45,0-90-45-90-90c0-45,45-90,90-90C45-90,90-45,90,0z"/></svg><svg id="basecircle-frame" x="0px" y="0px" width="180px" height="180px" viewbox="0 0 180 180" enable-background="new 0 0 180 180"><path id="basecircle" fill="#FFFFFF" transform="matrix(1.0,0.0,-0.0,1.0,90,90)" d="M90,0c0,45-45,90-90,90c-45,0-90-45-90-90c0-45,45-90,90-90C45-90,90-45,90,0z"/></svg></div>');
		layOver.append('<div id="kawaiicopy">Wait, are you sure you want to post that?</div>');

		var _csvg = chrome.extension.getURL("img/closex.svg")
		var _cimg = '<img src="'+_csvg+'" id="closex">';
		layOver.append('<div id="closebt"><svg id="closebt-sh-frame" x="0px" y="0px" width="80px" height="80px" viewbox="0 0 80 80" enable-background="new 0 0 80 80"><path id="closebt-sh" fill="#967A60" transform="matrix(1.0,0.0,-0.0,1.0,35,35)" d="M30,0c0,15-15,30-30,30c-15,0-30-15-30-30c0-15,15-30,30-30C15-30,30-15,30,0z"/></svg><svg id="closebt-frame" x="0px" y="0px" width="80px" height="80px" viewbox="0 0 80 80" enable-background="new 0 0 80 80"><path id="closebt-p" fill="#FFFFFF" stroke="#967A60" stroke-width="1" transform="matrix(1.0,0.0,-0.0,1.0,35,35)" d="M30,0c0,15-15,30-30,30c-15,0-30-15-30-30c0-15,15-30,30-30C15-30,30-15,30,0z"/></svg><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="26px" height="26px" viewBox="0 0 26 26" version="1.1" id="closex"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g id="closepath0" transform="translate(-19.000000, -16.000000)" stroke="#967A60" stroke-width="4"><g id="x" transform="translate(21.000000, 18.000000)"><path d="M0,0 L21.3733727,21.3733727" id="closepath1" fill="#967A60"></path><path d="M21.3733727,0 L0,21.3733727" id="closepath2" fill="#967A60"></path></g></g></g></svg></div>');
		layOver.append(_img_tag);
		layOver.append('<div id="btn1"><svg id="btcircle-ex-sh-frame" x="0px" y="0px" width="115px" height="115px" viewBox="0 0 115 115" enable-background="new 0 0 115 115"><path id="btcircle-ex-sh" fill="#F1B4CD" transform="matrix(1.0,0.0,-0.0,1.0,58,58)" d="M58,0c0,29-29,58-58,58c-29,0-58-29-58-58c0-29,29-58,58-58C29-58,58-29,58,0z"/></svg><svg id="btcircle-ex-frame" x="0px" y="0px" width="115px" height="115px" viewBox="0 0 115 115" enable-background="new 0 0 115 115"><path id="btcircle-ex" fill="#F85693" transform="matrix(1.0,0.0,-0.0,1.0,58,58)" d="M58,0c0,29-29,58-58,58c-29,0-58-29-58-58c0-29,29-58,58-58C29-58,58-29,58,0z"/></svg><div id="lightline"><svg id="btcircle-ex-line-frame" x="0px" y="0px" width="130px" height="130px" viewBox="0 0 130 130" enable-background="new 0 0 130 130"><path id="btcircle-ex-line" fill="none" stroke="white" stroke-width="2" transform="matrix(1.0,0.0,-0.0,1.0,58,58)" d="M58,0c0,29-29,58-58,58c-29,0-58-29-58-58c0-29,29-58,58-58C29-58,58-29,58,0z"/></svg></div><div id="btcopy">POST<br />KAWAII<br />INSTEAD!</div></div>');

		var _svg = chrome.extension.getURL("img/logo.svg")
		layOver.append('<img src="'+_svg+'" id="kawaiilogo">');

		var _svg = chrome.extension.getURL("img/refresh.svg")
		layOver.append('<img src="'+_svg+'" id="kawaiirefresh">');

		$('body').append(layOver);
		
		$( window ).resize(function() {
			var _pw;
			if($(window).width() > 1235){
				_pw = 650;
			}else{
				_pw = 450;
			}
			if(_stat == 1){
				layOver.css({
					"top": 120,
					"left": $(window).width()-_pw
				});
			}else{
				layOver.css({
					"top": $(window).height()-250,
					"left": $(window).width()-250
				});
			}
		});

		setTimeout(setShape, 1);
	}

	function setBmode(){
		_btmode = 0;
	}


	function setCmode(){
		_ctmode = 0;
	}
	function expandBubble(){
		_bmode = 1;

		$('#struc').css({
			"cursor": "auto"

		});
		$('#kawaiilogo').css({
			"cursor": "auto"

		});
		$('#layOverDiv').css({
			"width": 600,
			"height": 600
		});
		$('#tgd').stop();
		$('#tgd').animate({"left": 420/2},
                {
                    duration: 1000,
                    easing: 'easeOutExpo',
                    step : function(s){
				_twseed = s;
                    },
                    complete: function() {
                    }
                });
		$('#layOverDiv').stop();
		var _pw;
		if($(window).width() > 1235){
			_pw = 650;
		}else{
			_pw = 450;
		}
		$('#layOverDiv').animate({"top": 120,"left": $(window).width()-_pw}, 1000, "easeOutExpo", function() {
			_bmode = 0;

			$('#closebt').css({
				"width": 60,
				"height": 60,
				"left": 420-62,
				"top": 96-25,
				"display":"block",
				"opacity":0
			});
			$('#closebt').animate({"opacity": 1}, 800, "easeOutExpo");

			var _diff = parseInt($("#gifImg").css("width").split("px")[0])/2-50-50;
			if(_diff < -15){
				_diff = -15;
			}


			_diff = 10;
			$('#btn1').css({
				"width": 130,
				"height": 130,
				"left": 520/2+_diff,
				"top": 300,
				"display":"block",
				"opacity":0,
				"cursor": "pointer"
			});
			$('#btn1').animate({"opacity": 1}, 800, "easeOutExpo");
			$('#kawaiicopy').css({
				"width": 550,
				"height": 20,
				"left": 25-75,
				"top": 150-35,
				"display":"block",
				"text-align":"center",
				"opacity":0,
				"letter-spacing":0.4,
				"line-height": '1.2em'
			});
			$('#kawaiicopy').animate({"opacity": 1}, 800, "easeOutExpo");
			$('#gifImg').css({
				"left": 510/2-parseInt($("#gifImg").css("width").split("px")[0])/2-38,
				"top": 550/2-parseInt($("#gifImg").css("height").split("px")[0])/2+60-83,
				"display":"block",
				"opacity":0
			});
			$('#gifImg').animate({"opacity": 1}, 800, "easeOutExpo");

			$('#kawaiirefresh').css({
				"width": 40,
				"height": 40,
				"left": 470/2-33,
				"top": 460-105,
				"display":"block",
				"opacity":0,
				"cursor": "pointer"
			});
			$('#kawaiirefresh').animate({"opacity": 1}, 800, "easeOutExpo");
		});
		$('#kawaiilogo').animate({"width": 90,"height": 44,"top":90-35,"left":(510-90)/2-30}, 1000, "easeOutExpo", function() {
		});

	}
	function shrinkBubble(){
		_bmode = 1;
		
		$('#kawaiicopy').stop();
		$('#kawaiicopy').animate({"opacity": 0}, 600, "easeOutExpo", function() {
			$('#kawaiicopy').css({
				"display":"none"
			});
		

		});
		$('#closebt').stop();
		$('#closebt').animate({"opacity": 0}, 600, "easeOutExpo", function() {
			$('#closebt').css({
				"display":"none"
			});
		});
		$('#btn1').stop();
		$('#btn1').animate({"opacity": 0}, 600, "easeOutExpo", function() {
			$('#btn1').css({
				"display":"none"
			});
		});
		$('#kawaiirefresh').stop();
		$('#kawaiirefresh').animate({"opacity": 0}, 600, "easeOutExpo", function() {
			$('#kawaiirefresh').css({
				"display":"none"
			});
		});
		$('#gifImg').stop();
		$('#gifImg').animate({"opacity": 0}, 600, "easeOutExpo", function() {
			$('#gifImg').css({
				"display":"none"
			});


			$('#struc').css({
				"cursor": "pointer"
			});
			$('#kawaiilogo').css({
				"cursor": "pointer"
			});

			$('#tgd').stop();
			$('#tgd').animate({"left": 90},
			{
				duration: 1000,
				easing: 'easeOutExpo',
				step : function(s){
					_twseed = s;
				},
				complete: function() {
			}
			});
			$('#layOverDiv').stop();
			$('#layOverDiv').animate({"top": $(window).height()-250,"left": $(window).width()-250}, 1000, "easeOutExpo", function() {
				_bmode = 0;
				_stat = 0;
				$('#layOverDiv').css({
					"width": 250,
					"height": 250
				});
			});
			$('#kawaiilogo').animate({"width": 140,"height": 64,"top":65,"left":35}, 1000, "easeOutExpo", function() {
			});
		});

	}
	function setShape(){
		
		$( "#btn1" ).data('link_url', _gifLink);
		$( "#btn1" ).click(function() {
			 var res = confirm("Are you ready to post Kawaii stuff?");
			if( res == true ) {
				var request = {
					type : "background.statusUpdate",
					url: $(this).data('link_url')
				};
				chrome.runtime.sendMessage(request, function(response) {

					$('#tweet-box-home-timeline').text("");
					$('#tweet-box-global').text("");
					//alert("Congrats! You just tweeted something Kawaii instead of negative!");
					window.location.reload();
				});
      			}else {
			}
			
		});


		$( "#kawaiirefresh" ).mouseover(function() {
			$('#kawaiirefresh').css({
				"opacity":0.5
			});
			//$('#kawaiirefresh').animate({"opacity": 1}, 500, "easeOutExpo");
		});
		$( "#kawaiirefresh" ).mouseout(function() {
			$('#kawaiirefresh').css({
				"opacity":1
			});
			//$('#kawaiirefresh').animate({"opacity": 1}, 500, "easeOutExpo");
		});
		$( "#kawaiirefresh" ).click(function() {
			shuffleGif();
		});

		$( "#btn1" ).mouseover(function() {
			_btmode = 1;

			$("#btcircle-ex").attr('fill', '#0077FF');
			 setTimeout(setBmode, 150);
		});
		$( "#btn1" ).mouseout(function() {
			$("#btcircle-ex").attr('fill', '#F85693');
			 setTimeout(setBmode, 150);
		});
		$( "#closebt" ).mouseover(function() {
			_ctmode = 1;
			$("#closebt-p").attr('fill', '#967A60');
			$("#closepath0").attr('stroke', '#FFFFFF');
			$("#closepath1").attr('fill', '#FFFFFF');
			$("#closepath2").attr('fill', '#FFFFFF');
			 setTimeout(setCmode, 150);
		});
		$( "#closebt" ).mouseout(function() {
			$("#closebt-p").attr('fill', '#FFFFFF');
			$("#closepath0").attr('stroke', '#967A60');
			$("#closepath1").attr('fill', '#967A60');
			$("#closepath2").attr('fill', '#967A60');
			 setTimeout(setCmode, 150);
		});
		$('#kawaiirefresh').css({
			"margin":0,
			"position":"absolute",
			"display":"none"
		});
		$('#btn1').css({
			"margin":0,
			"position":"absolute",
			"display":"none"
		});
		$('#btcircle-ex-frame').css({
			"margin":0,
			"position":"absolute"
		});
		$('#btcircle-ex-sh-frame').css({
			"top": 5,
			"left": 5,
			"margin":0,
			"position":"absolute"
		});
		$('#lightline').css({
			"margin":0,
			"position":"absolute",
			"overflow":"hidden",
			"width": 115/2,
			"height": 115*3/4
		});
		$('#btcircle-ex-line-frame').css({
			"margin":0,
			"position":"absolute"
		});
		$('#btcopy').css({
			"margin":0,
			"position":"absolute",
			"font-family": 'misobold',
			"text-align": 'center',
			"line-height": '1.05em',
			"color":"#FFFFFF",
			"top": 30,
			"width": 120,
			"height": 75,
			"letter-spacing": 1,
			"font-size": 18
		});
		$('#closebt').css({
			"margin":0,
			"position":"absolute",
			"display":"none",
			"cursor":"pointer"
		});
		$('#closebt-frame').css({
			"top": 5,
			"left": 5,
			"margin":0,
			"position":"absolute"
		});
		$('#closebt-sh-frame').css({
			"top": 8,
			"left": 8,
			"margin":0,
			"position":"absolute"
		});
		$('#closex').css({
			"top": 27,
			"left": 27,
			"margin":0,
			"pointer-events": "none",
			"position":"absolute"
		});


		$( "#closebt" ).click(function() {
			if(_stat == 1){
				shrinkBubble();
			}
			//_bttime = setTimeout(setBmode, 150);
		});
/*
		$( "#closebt" ).mouseover(function() {
			$('#closebt').css({
				"opacity":0
			});
			$('#closebt').animate({"opacity": 1}, 1000, "easeOutExpo");
		});
*/
		$('#kawaiicopy').css({
			"position":"absolute"
		});
		$('#tgd').css({
			"top": 0,
			"left": 90,
			"width": 0,
			"height": 0,
			"position":"absolute"
		});	
		$('#struc').css({
			"cursor": "pointer",
			"top": 0,
			"position":"absolute",
			"font-family": 'misobold',
			"font-size": 22
		});	
	

		$('#basecircle-frame').css({
			"top": 10,
			"left": 10,
			"position":"absolute"
		});
		$('#basecircle-sh-frame').css({
			"top": 17,
			"left": 17,
			"position":"absolute"
		});
		$('#kawaiilogo').css({
			"cursor": "pointer",
			"width": 140,
			"height": 64,
			"top": 65,
			"left": 35,
			"position":"absolute"
		});

		$('#kawaiicopy').css({
			"color": "#967A60",
			"top": 0,
			"position":"absolute",
			"font-family": 'misobold',
			"font-size": 19,
			"display":"none"
		});	

	}

	function shuffleGif(){
		var _len = _data.length;
		var _pid = Math.floor(Math.random()*(_len-0.01));
		if(_len > 1){
			while(_pid == _prevnum){
				_pid = Math.floor(Math.random()*(_len-0.01));
			}
		}
		_prevnum = _pid;
		_gifLink = _data[_pid].bitly_gif_url;
		var _img = _data[_pid].images.downsized_large.url;
		var _wid = _data[_pid].images.downsized_large.width;
		var _hgt = _data[_pid].images.downsized_large.height;

		$( "#btn1" ).data('link_url', _gifLink);
		var _rate = 1;
		if(_wid >280){
			_rate = 280/_wid;
		}
		if(_hgt*_rate >170){
			_rate = 170/_hgt;
		}

		_img_tag.attr("src","");
		_img_tag.attr("src",_img);
		_img_tag.attr("width",_wid*_rate);
		_img_tag.attr("height",_hgt*_rate);

		_img_tag.css({
			"left": 510/2-_wid*_rate/2-38,
			"width": _wid*_rate,
			"height": _hgt*_rate
		});


		var _diff = _wid*_rate/2-50-50;
		if(_diff < -15){
			_diff = -15;
		}

		_diff = 10;
		$('#btn1').css({
			"width": 130,
			"height": 130,
			"left": 520/2+_diff,
			"top": 300,
			"display":"block",
			"cursor": "pointer"
		});
	}
	function setGiphy(){
		var giphyAPI = "https://api.giphy.com/v1/gifs/search";
		$.getJSON( giphyAPI, {
			q: _api_arr[_tcnt],
			api_key: "dc6zaTOxFJmzC"
		})
		.done(function( data ) {
			var _str = JSON.stringify(data);

			//_data = data.data;

			var _dt = data.data;
			for(var i=0; i<_dt.length; i++){
				_data.push(_dt[i]);
			}

			_tcnt += 1;
			if(_tcnt == _api_arr.length){
				
				var _len = _data.length;
				var _pid = Math.floor(Math.random()*(_len-0.01));
				_gifLink = _data[_pid].bitly_gif_url;
				var _img = _data[_pid].images.downsized_large.url;
				var _wid = _data[_pid].images.downsized_large.width;
				var _hgt = _data[_pid].images.downsized_large.height;
				var _rate = 1;
				if(_wid >280){
					_rate = 280/_wid;
				}
				if(_hgt*_rate >170){
					_rate = 170/_hgt;
				}
				_img_tag = $('<img>', {
					src: _img,
					width: _wid*_rate,
					height: _hgt*_rate,
					id:  'gifImg'
				})
				_img_tag.css({
					"position": "absolute",
					"width": _wid*_rate,
					"height": _hgt*_rate,
					"display":"none",
					"border-width": 7,
					"border-color": "#F6E2E6",
					"border-style":"solid"
				});
				setLayOver();
			}else{
				setGiphy();
			}
			//$("#layOverDiv").append(_img_tag);
/*
			for(var i=0; i<_len; i++){
				var _link = data.data[i].bitly_gif_url;
				var _img = data.data[i].images.fixed_width_small.url;
				var _wid = data.data[i].images.fixed_width_small.width;
				var _hgt = data.data[i].images.fixed_width_small.height;
				var _img_tag = $('<img>', {
					src: _img,
					width: _wid,
					height: _hgt,
					id:  'img'+i
				})
				_img_tag.css({
					"float": "left",
					"width": _wid,
					"height": _hgt
				});
				_img_tag.data('link_url', _link);
				_img_tag.click(function() {
					var request = {
						type : "background.statusUpdate",
						url: $(this).data('link_url')
					};
					chrome.runtime.sendMessage(request, function(response) {
				
					});
				});
				layOver.append(_img_tag);
			
			}
*/
		});
	}
});