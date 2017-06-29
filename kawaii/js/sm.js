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

	if(_uac.isMobile){
		
		$('#core').css({
			"display":"block",
			"opacity":0
		});
		$('.loader').css({
			"display":"none"
		});
		$('#core').animate({"opacity": 1}, 1000, "easeOutExpo");
	}else if(_uac.browser == "chrome"){
		window.location.href = "index.html";
	}else{
		window.location.href = "safari.html";
	}


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
		var _bdrx = 45+_brsn*40;
		var _bdry = 45+_brcs*40;
		var _bdlx = 45+_blsn*40;
		var _bdly = 45+_blcs*40;
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
		

		requestAnimationFrame(render);
	}

	requestAnimationFrame(render);
	$( window ).resize(function() {
		res();
	});

	function setBmode(){
		_bmode = 0;
	}


	function res(){
		var _w = $( window ).width();
		var _h = $( window ).height();

		$("#core").css({
			"width": _w,
			"height": _h,
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
		$("#logo").css({
			"left": (_w-_dm)/2+ _dm*3/7/2,
			"top": (_h-_dm)/2+ _dm/3/2+_dm*0.08,
			"width": _dm*4/7,
			"height":_dm*4/7/453*223
		});
		$("#overlay").css({
			"width": _dm,
			"height":_dm,
			"left": (_w-_dm)/2,
			"top":(_h-_dm)/2
		});
		$("#wave1").css({
			"left": _dm*0.88/2,
			"top": _dm/3/2+_dm*0.33+_dm*0.08,
			"width": _dm*0.12,
			"height":_dm*0.12/108*17
		});

		$("#copy1").css({
			"left": _dm*1/3/2,
			"top": _dm/3/2+_dm*0.37+_dm*0.08,
			"width": _dm*2/3,
			"height":_dm*0.1,
			"text-align": "center",
			"font-size": 50/1000*_dm
		});

	}
	res();
});