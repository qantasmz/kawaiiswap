var setScreenState;
var _authStat;
$(function () {
	$("#circle").attr('d', 'M100,0c0,50-50,100-100,100c-50,0-100-50-100-100c0-50,50-100,100-100C50-100,100-50,100,0z');

	var _rx = 90;
	var _ry = 90;
	var _lx = 90;
	var _ly = 90;
	var _sd = 200;
	var _tspd = 0.001;
	var _trsn = 0;
	var _trcs = 0;
	var _tlsn = 0;
	var _tlcs = 0;

	var _brx = 45;
	var _bry = 45;
	var _blx = 45;
	var _bly = 45;
	var _btrsn = 0;
	var _btrcs = 0;
	var _btlsn = 0;
	var _btlcs = 0;
	var _btspd = 0.001;

	var _dm;
	var _sctarget = 0;
	var _sctime;
	var _sclock = 0;
	var _bmode = 0;
	var _bttime;

	$('#core').css({
		"display":"block",
		"opacity":0
	});
	$('.loader').css({
		"display":"none"
	});
	$('#core').animate({"opacity": 1}, 1000, "easeOutExpo");

	function render() {
		var _rsn = Math.sin(_trsn);
		_trsn += 0.1;
		var _rcs = Math.cos(_trcs);
		_trcs += 0.12;
		var _lsn = Math.sin(_tlsn);
		_tlsn += 0.1;
		var _lcs = Math.cos(_tlcs);
		_tlcs += 0.12;
		var _drx = 90+_rsn*100;
		var _dry = 90+_rcs*100;
		var _dlx = 90+_lsn*100;
		var _dly = 90+_lcs*100;
		_rx += (_drx-_rx)*_tspd;
		_ry += (_dry-_ry)*_tspd;
		_lx += (_dlx-_lx)*_tspd;
		_ly += (_dly-_ly)*_tspd;
		$("#circle").attr('d', 'M'+_rx+',0c0,50-50,'+_rx+'-'+_ry+','+_ry+'c-50,0-'+_ry+'-50-'+_lx+'-'+_lx+'c0-50,50-'+_lx+','+_ly+'-'+_ly+'C50-'+_ly+','+_ly+'-50,'+_rx+',0z');


		var _brsn = Math.sin(_btrsn);
		_btrsn += 0.1;
		var _brcs = Math.cos(_btrcs);
		_btrcs += 0.12;
		var _blsn = Math.sin(_btlsn);
		_btlsn += 0.1;
		var _blcs = Math.cos(_btlcs);
		_btlcs += 0.12;
		var _bdrx = 45+_brsn*50;
		var _bdry = 45+_brcs*50;
		var _bdlx = 45+_blsn*50;
		var _bdly = 45+_blcs*50;
		if(_bmode == 0){
			_brx += (_bdrx-_brx)*_btspd;
			_bry += (_bdry-_bry)*_btspd;
			_blx += (_bdlx-_blx)*_btspd;
			_bly += (_bdly-_bly)*_btspd;
		}else{
			_brx = 45+Math.random()*4-2;
			_bry = 45+Math.random()*4-2;
			_blx = 45+Math.random()*4-2;
			_bly = 45+Math.random()*4-2;
		}
		
/*
		_brx = 45+Math.random()*4-2;
		_bry = 45+Math.random()*4-2;
		_blx = 45+Math.random()*4-2;
		_bly = 45+Math.random()*4-2;
*/
		//_btspd += (0.001-_btspd)*0.4;
		//console.log(_btspd);
		$("#btcircle").attr('d', 'M'+_brx+',0c0,25-25,'+_brx+'-'+_bry+','+_bry+'c-25,0-'+_bry+'-25-'+_blx+'-'+_blx+'c0-25,25-'+_blx+','+_bly+'-'+_bly+'C25-'+_bly+','+_bly+'-25,'+_brx+',0z');
		$("#btcircle-sh").attr('d', 'M'+_brx+',0c0,25-25,'+_brx+'-'+_bry+','+_bry+'c-25,0-'+_bry+'-25-'+_blx+'-'+_blx+'c0-25,25-'+_blx+','+_bly+'-'+_bly+'C25-'+_bly+','+_bly+'-25,'+_brx+',0z');

		$("#btcircle-line").attr('stroke-width', _dm*1.5/995);
		$("#btcircle-line").attr('d', 'M'+_brx*0.93+',0c0,25-25,'+_brx*0.93+'-'+_bry*0.93+','+_bry*0.93+'c-25,0-'+_bry*0.93+'-25-'+_blx*0.93+'-'+_blx*0.93+'c0-25,25-'+_blx*0.93+','+_bly*0.93+'-'+_bly*0.93+'C25-'+_bly*0.93+','+_bly*0.93+'-25,'+_brx*0.93+',0z');
		requestAnimationFrame(render);
	}
	$( "#btn1" ).css({
		"cursor":"pointer"
	});
	$( "#btn1" ).mouseover(function() {
		_bmode = 1;
		_bttime = setTimeout(setBmode, 150);
	});

	$( "#start-over" ).click(function() {
		if(_authStat == 1){
			var properties = [
				'accessToken',
				'accessTokenSecret'
			]
			Settings.remove(properties, function() {
				var request = {
					type : "background.reloadSettings",
				};

				chrome.runtime.sendMessage(request, function(response) {
					var properties = {
						authState : Settings.AUTH_STATE_LOGIN
					};
					Settings.save(properties, function(){
						SettingsPage.setState(false, false);
					});
					//_authStat = 0;
					setScreenState();
				});
			});
		}
	});
	$( "#btn1" ).click(function() {
		if(_authStat == 0){
			var request = {
				type : "background.twitterRequestToken",
			};
			chrome.runtime.sendMessage(request, function(response) {
				var properties = {
					authState : Settings.AUTH_STATE_PIN
				};
				Settings.save(properties, function(){
					SettingsPage.setState(false, true);
				});
				//_authStat = 1;
				setScreenState();
			});
		}
		if(_authStat == 1){
			var request = {
				type : "background.twitterAccessToken",
				pin : $('#authenticationPin').val()
			};
			chrome.runtime.sendMessage(request, function(response) {
				var success = response.success;
				var status = response.status; 
				console.log("mijinkopinpinko");
				if (success){

					_authStat = 2;
					setScreenState();
					var properties = {
						authState : Settings.AUTH_STATE_COMPETED
					};

					Settings.save(properties, function(){
						SettingsPage.setState(true, false);
						alert("You're all set! Please click 'Kawaii' icon on the top-right of the browser when you want to disconnect or delete the application.");
						window.close();
						//URL.open("tutorial");
					});

				} else {
					alert("There is something wrond around Twitter authentication. Please try again later.");
				}
			});
		}
		
		if(_authStat == 2){

			var properties = [
				'accessToken',
				'accessTokenSecret'
			]
			Settings.remove(properties, function() {
				var request = {
					type : "background.reloadSettings",
				};

				chrome.runtime.sendMessage(request, function(response) {
					var properties = {
						authState : Settings.AUTH_STATE_LOGIN
					};
					Settings.save(properties, function(){
						SettingsPage.setState(false, false);
					});
					//_authStat = 0;
					setScreenState();
				});
			});
		}
		return false;
	});

	requestAnimationFrame(render);
	$( window ).resize(function() {
		res();
		execScroll();
	});
	$( "#overlay" ).scroll(function() {
		execScroll();
	});
	function setBmode(){
		_bmode = 0;
	}
	function execScroll(){
		$( "#btn1" ).mouseover(function() {
		});
		$( "#btn1" ).css({
			"pointer-events":"none"
		});
		clearTimeout(_sctime);
		var _w = $( window ).width();
		var _h = $( window ).height();
		if(_w > _h){
			_dm = _h*0.9;
		}else{
			_dm = _w*0.9;
		}
		var _scroll = $( "#overlay" ).scrollTop();
		if(_sclock ==0){
			if(_scroll >= -50 && _scroll<=_dm/2){
				_sctarget = 0;
				_sctime = setTimeout(scrollMove, 500,"easeInExpo");
			}else if(_scroll > _dm/2 && _scroll<=_dm*3/2){
				_sctarget = 1;
				_sctime = setTimeout(scrollMove, 500,"easeInExpo");
			}else{
				_sctarget = 2;
				_sctime = setTimeout(scrollMove, 500,"easeInExpo");
			}
		}
		var _srate = _scroll/_dm;
		if(_srate>=1){
			_srate = 1;
		}
		//console.log(_srate);
		$("#logo").css({
			"left": (_w-_dm)/2+ _dm*4/7/2+((_dm - _dm*170/995)/2-_dm*4/7/2)*_srate,
			"top": (_h-_dm)/2+ _dm/3/2 + (_dm/18-(_dm/3/2))*_srate,
			"width": _dm*3/7+(_dm*170/995-_dm*3/7)*_srate,
			"height":_dm*3/7/453*223+(_dm*170/995/453*223-_dm*3/7/453*223)*_srate,
		});
		var _btny;
		if(_authStat == 0 || _authStat == 2){
			_btny = (_h-_dm)/2+_dm-_dm*0.43;
		}else{
			_btny = (_h-_dm)/2+_dm-_dm*0.43+_dm*0.1;
		}
		$("#btn1").css({
			"left": (_w-_dm)/2+_dm/2-_dm*225/995/2,
			"top": _btny,
			"width": _dm*225/995+ _dm*0.02,
			"height": _dm*225/995+ _dm*0.02
		});
	}
	setScreenState = function(){
		console.log(_authStat);
		if(_authStat == 0){
			$("#btcopy").html("TWITTER<br />LOGIN!");
			$("#pin-form").css({
				"display":"none"
			});
			$("#start-over").css({
				"display":"none"
			});
		}else if(_authStat == 1){
			$("#btcopy").html("SUBMIT<br />PIN");
			$("#pin-form").css({
				"display":"block"
			});
			$("#start-over").css({
				"display":"block"
			});
		}else{
			$("#btcopy").html("TWITTER<br />DISCONNECT");
			$("#pin-form").css({
				"display":"none"
			});
			$("#start-over").css({
				"display":"none"
			});
		}
		execScroll();
	}
	function scrollMove(str){
		$( "#btn1" ).mouseover(function() {
			_bmode = 1;
			$("#btcircle").attr('fill', '#0077FF');
			_bttime = setTimeout(setBmode, 150);
		});
		$( "#btn1" ).mouseout(function() {
			$("#btcircle").attr('fill', '#F85693');
			_bttime = setTimeout(setBmode, 150);
		});
		$( "#btn1" ).css({
			"pointer-events":"auto"
		});
		clearTimeout(_sctime);
		_sclock = 1;
		if(_sctarget == 0){
			$('#overlay').animate({scrollTop: 0}, 500, str, function() {
				_sclock = 0;
			});
		}else if(_sctarget == 1){
			$('#overlay').animate({scrollTop: _dm}, 500,str, function() {
				_sclock = 0;
			});
		}else{
			$('#overlay').animate({scrollTop: _dm*2}, 500, str, function() {
				_sclock = 0;
			});
		}
	}
	function res(){
		var _w = $( window ).width();
		var _h = $( window ).height();
		$("#core").css({
			"background-size": _w/1440*800+"px "+_w/1440*800+"px"
		});
		$("#bgcircle").css({
			"width": _w,
			"height": _h
		});
		if(_w > _h){
			_dm = _h*0.9;
		}else{
			_dm = _w*0.9;
		}
		$("#overlay").css({
			"width": _dm,
			"height":_dm,
			"left": (_w-_dm)/2,
			"top":(_h-_dm)/2
		});
		$("#wave1").css({
			"left": _dm*0.88/2,
			"top": _dm/3/2+_dm*0.23,
			"width": _dm*0.12,
			"height":_dm*0.12/108*17
		});

		$("#arrow").css({
			"left": _dm*0.95/2,
			"top": _dm-_dm*0.1,
			"width": _dm*0.05,
			"height":_dm*0.05/33*16
		});
		$("#copy1").css({
			"left": 0,
			"top": _dm/3/2+_dm*0.27,
			"width": _dm,
			"height":_dm*0.1,
			"text-align": "center",
			"font-size": 32/1000*_dm
		});

		$("#pin-form").css({
			"left": _dm/2-_dm/2/2,
			"top": _dm/3/2+_dm*0.38,
			"width": _dm/2,
			"height":_dm*0.06,
			"border-radius": _dm*20/995
		});

		$("#start-over").css({
			"left": _dm/2-_dm/2/2,
			"top": _dm/3/2+_dm*0.76,
			"width": _dm/2,
			"height":_dm*0.04,
			"font-size": 26/1000*_dm
		});
		$("#authenticationPin").css({
			"left": 0,
			"top": 0,
			"width": _dm/2,
			"height":_dm*0.06,
			"font-size": 30/1000*_dm
		});

		$("#btcircle-frame").css({
			"left": 0,
			"top": 0,
			"width": _dm*225/995,
			"height": _dm*225/995
		});
		$("#btcircle-sh-frame").css({
			"left": _dm*0.01,
			"top": _dm*0.007,
			"width": _dm*225/995,
			"height": _dm*225/995
		});
		$("#lightline").css({
			"left": 0,
			"top": 0,
			"width": _dm*225/995/2,
			"height": _dm*225/995*3/4
		});
		$("#btcircle-line-frame").css({
			"left": 0,
			"top": 0,
			"width": _dm*225/995,
			"height": _dm*225/995
		});
		$("#btcopy").css({
			"left": 0,
			"top": _dm*0.08,
			"width": _dm*225/995,
			"height": 40/1000*_dm*2.3,
			"font-size": 40/1000*_dm
		});
		$("#facebook").css({
			"left": 0,
			"top": 0,
			"width": _w*9/1440,
			"height":_w*9/1440*19/9
		});
		$("#twitter").css({
			"left": _w*0.015,
			"top": 0,
			"width": _w*25/1440,
			"height":_w*25/1440*18/25
		});
		$("#copyright").css({
			"left": _w*0.04,
			"top": _w*0.04*20/250,
			"width": _w*250/1440,
			"height":_w*14/1440,
			"font-size": 14/1440*_w
		});
		var footery =  _w- _w*250/1440-_w*0.03;
		$("#footer").css({
			"left": footery,
			"top": _h- _w*25/1440*18/25-_h*0.02,
			"width": _w*250/1440,
			"height":_w*25/1440
		});
	}
	res();
	execScroll();
});