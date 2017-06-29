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
		window.location.href = "sm.html";
	}else if(_uac.browser == "chrome"){
		$('#core').css({
			"display":"block",
			"opacity":0
		});
		$('.loader').css({
			"display":"none"
		});
		$('#core').animate({"opacity": 1}, 1000, "easeOutExpo");
	}else{
		window.location.href = "safari.html";
	}

	function render() {
		setScroll();
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
	$( "#btn1" ).click(function() {
		
		var url = 'https://chrome.google.com/webstore/detail/kawaii-swap/jafihpafbkklgmkmjihaloclgbpnncac';
		window.open(url , '_blank');
	});
	$( "#btn1" ).mouseover(function() {
		_bmode = 1;
		_bttime = setTimeout(setBmode, 150);
		$("#btcircle").attr('fill', '#0077FF');
	});
	$( "#btn1" ).mouseout(function() {
		$("#btcircle").attr('fill', '#F85693');
	});
	requestAnimationFrame(render);
	$( window ).resize(function() {
		res();
		detectScroll();
		//execScroll();
	});
	$( "#overlay" ).scroll(function(e) {
		//execScroll();
	});

	$( "#scroll-target" ).click(function() {
		if(_sctarget == 2){
			var url = 'http://prty.nyc';
			window.open(url , '_blank');
		}
	});
	$( "#scroll-target" ).scroll(function(e) {
		detectScroll();
		//execScroll();
	});
	setScrollBtn();
	function setBmode(){
		_bmode = 0;
	}
	function setScrollBtn(){

		var _cnum = _sctarget+1;
		for(var i=1; i<=3; i++){
			if(_cnum != i){
				$("#c"+i+"-frame").css({
					"cursor":"pointer"
				});
				$("#c"+i+"-bt").attr('fill',"#FFFFFF" );
				$("#c"+i+"-frame").click(function() {
					_sctarget = this.id.split("-")[0].split("c")[1]-1;
					var _w = $( window ).width();
					var _h = $( window ).height();
					if(_w > _h){
						_dm = _h*0.9;
					}else{
						_dm = _w*0.9;
					}

					$( "#scroll-target" ).scrollTop(_sctarget*_dm*2);
					//setScrollBtn();
				});
			}else{
				$("#c"+i+"-frame").css({
					"cursor":"none"
				});
				$("#c"+i+"-bt").attr('fill',"#0077FF" );
				$("#c"+i+"-frame").click(function() {
					
				});
			}
		}
	}
	function detectScroll(){
		var _w = $( window ).width();
		var _h = $( window ).height();
		if(_w > _h){
			_dm = _h*0.9;
		}else{
			_dm = _w*0.9;
		}
		var _scroll = $( "#scroll-target" ).scrollTop();
		//console.log(_scroll);

		if(_scroll >= -50 && _scroll<=_dm*2/2){
			_sctarget = 0;
			//scrollMove();
			//_sctime = setTimeout(scrollMove, 50,"easeInExpo");

		}else if(_scroll > _dm*2/2 && _scroll<=_dm*2*7/4){
			_sctarget = 1;
			//scrollMove();
			//_sctime = setTimeout(scrollMove, 50,"easeInExpo");

		}else{
			_sctarget = 2;

			//scrollMove();
			//_sctime = setTimeout(scrollMove, 50,"easeInExpo");
		}

		setScrollBtn();

	}
	function setScroll(){
		var _w = $( window ).width();
		var _h = $( window ).height();
		if(_w > _h){
			_dm = _h*0.9;
		}else{
			_dm = _w*0.9;
		}
		var _dy;
		if(_sctarget==0){
			_dy = 0;
		}else if(_sctarget == 1){
			_dy = _dm;
		}else{
			_dy = _dm*2;
		}

		var _scroll = $( "#overlay" ).scrollTop();
		_scroll += (_dy-_scroll)*0.1;
		$( "#overlay" ).scrollTop(_scroll);

		var _srate = _scroll/_dm;
		if(_srate>=1){
			_srate = 1;
		}
		//console.log(_srate);
		$("#logo").css({
			"left": (_w-_dm)/2+ _dm*4/7/2+((_dm - _dm*170/995)/2-_dm*4/7/2)*_srate,
			"top": (_h-_dm)/2+ _dm/3/2+_dm*0.02 + (_dm/18-(_dm/3/2))*_srate,
			"width": _dm*3/7+(_dm*170/995-_dm*3/7)*_srate,
			"height":_dm*3/7/453*223+(_dm*170/995/453*223-_dm*3/7/453*223)*_srate,
		});
		$("#btn1").css({
			"left": (_w-_dm)/2+_dm/2-_dm*225/995/2+(_dm-(_dm*225/995) - (_dm/2-_dm*225/995/2))*_srate,
			"top": (_h-_dm)/2+_dm-_dm*0.43+((_dm-(_dm*225/995+ _dm*0.02))-(_dm-_dm*0.43))*_srate,
			"width": _dm*225/995+ _dm*0.02,
			"height": _dm*225/995+ _dm*0.02
		});
	}
/*
	function execScroll(){
		$( "#btn1" ).mouseover(function() {
		});
		$( "#btn1" ).css({
			"pointer-events":"none"
		});
		var _w = $( window ).width();
		var _h = $( window ).height();
		if(_w > _h){
			_dm = _h*0.9;
		}else{
			_dm = _w*0.9;
		}
		var _scroll = $( "#overlay" ).scrollTop();



	}
	function scrollMove(str){
		$( "#btn1" ).mouseover(function() {
			_bmode = 1;
			_bttime = setTimeout(setBmode, 150);
		});
		$( "#btn1" ).css({
			"pointer-events":"auto"
		});
		clearTimeout(_sctime);
		_sclock = 1;
		if(_sctarget == 0){
			$('#overlay').animate({scrollTop: 0}, 300, str, function() {
				_sclock = 0;
			});
		}else if(_sctarget == 1){
			$('#overlay').animate({scrollTop: _dm}, 300,str, function() {
				_sclock = 0;
			});
		}else{
			$('#overlay').animate({scrollTop: _dm*2}, 300, str, function() {
				_sclock = 0;
			});
		}
	}

*/
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
		$("#overlay").css({
			"width": _dm,
			"height":_dm,
			"left": (_w-_dm)/2,
			"top":(_h-_dm)/2
		});
		$("#wave1").css({
			"left": _dm*0.88/2,
			"top": _dm/3/2+_dm*0.23+_dm*0.02,
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
			"top": _dm/3/2+_dm*0.27+_dm*0.02,
			"width": _dm,
			"height":_dm*0.1,
			"text-align": "center",
			"font-size": 32/1000*_dm
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

		$("#howitworks").css({
			"left": 0,
			"top": _dm,
			"width": _dm,
			"height": _dm
		});
		$("#smalllogo1").css({
			"left": (_dm - _dm*170/995)/2,
			"top":  _dm/18,
			"width": _dm*170/995,
			"height":_dm*170/995/453*223
		});
		$("#creator").css({
			"left": 0,
			"top": _dm*2,
			"width": _dm,
			"height": _dm
		});
		$("#smalllogo2").css({
			"left": (_dm - _dm*170/995)/2,
			"top":  + _dm/18,
			"width": _dm*170/995,
			"height":_dm*170/995/453*223
		});

		$("#wave2").css({
			"left": _dm*0.88/2,
			"top": _dm*0.3,
			"width": _dm*0.12,
			"height":_dm*0.12/108*17
		});

		$("#wave3").css({
			"left": _dm*0.88/2,
			"top": _dm*0.3,
			"width": _dm*0.12,
			"height":_dm*0.12/108*17
		});
		$(".read").css({
			"left": 0,
			"top": _dm*0.25,
			"width": _dm,
			"height":40/1000*_dm,
			"font-size": 40/1000*_dm
		});
		$(".diagram").css({
			"top": _dm*0.37,
			"width": _dm*222/995,
			"height":_dm*274/995,
			"font-size": 22/1000*_dm
		});
		$("#diagram1").css({
			"left": _dm*0.12
		});
		$("#diagram2").css({
			"left": _dm*0.39
		});
		$("#diagram3").css({
			"left": _dm*0.66
		});
		$("#diagramimg1").css({
			"left": _dm*0.027,
			"top": _dm*0.01,
			"width": _dm/995*342/2,
			"height":_dm/995*350/2
		});
		$("#diagramimg2").css({
			"left": _dm*0.042,
			"top": _dm*0.041,
			"width": _dm/995*354/2,
			"height":_dm/995*286/2
		});
		$("#diagramimg3").css({
			"left": _dm*0.04,
			"top": 0,
			"width": _dm/995*342/2,
			"height":_dm/995*366/2
		});
		$(".caption").css({
			"top": _dm*0.22
		});
		$("#partylogo").css({
			"left": (_dm-_dm*174/995)/2,
			"top": _dm*0.36,
			"width": _dm*174/995,
			"height":_dm*75/995
		});
		$("#description").css({
			"left": (_dm-_dm*750/995)/2,
			"top": _dm*0.47,
			"width": _dm*750/995,
			"height":_dm*120/995,
			"font-size": 22/1000*_dm
		});
		$("#newsletter").css({
			"left": (_dm-_dm*460/995)/2,
			"top": _dm*0.71,
			"width": _dm*460/995,
			"height":_dm*165/995
		});
		$("#newsletter-bg").css({
			"width": _dm*460/995,
			"height":_dm*165/995,
			"opacity": 0.15,
			"border-radius": _dm*20/995
		});
		$("#newsletter-txt").css({
			"left": 0,
			"top": _dm*0.036,
			"width": _dm*460/995,
			"height":18/1000*_dm,
			"font-size": 18/1000*_dm
		});
		$("#newsletter-form").css({
			"left": (_dm*460/995-_dm*300/995)/2,
			"top": _dm*0.066,
			"width": _dm*300/995,
			"height":_dm*57/995,
			"border-radius": _dm*20/995,
			"border-width": _dm*2/995,
		});
		$("#mce-EMAIL").css({
			"left": 0,
			"top": 0,
			"width": _dm*209/995,
			"height":_dm*57/995,
			"font-size": 18/1000*_dm,
			"padding-left": 18/1000*_dm,
			"padding-top": 2/1000*_dm
		});
		$("#mc-embedded-subscribe").css({
			"left": _dm*209/995,
			"top": 0,
			"width": _dm*91/995,
			"height":_dm*57/995,
			"font-size": 18/1000*_dm,
			"padding-left": 14/1000*_dm,
			"padding-top": 10/1000*_dm
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

		$("#scroll-target").css({

			"left": (_w-_dm)/2,
			"top":(_h-_dm)/2,
			"width": _dm,
			"height": _dm
		});
		$("#scroll-target-inner").css({
			"left": 0,
			"top": 0,
			"width": _dm,
			"height": _dm*6
		});
		var footery =  _w- _w*250/1440-_w*0.03;
		$("#footer").css({
			"left": footery,
			"top": _h- _w*25/1440*18/25-_h*0.02,
			"width": _w*250/1440,
			"height":_w*25/1440
		});

		$("#carousel").css({
			"left": _w - _w*34/1440*2,
			"top": _h/2-_w*34/1440*158/34/2,
			"width": _w*34/1440,
			"height":_w*34/1440*158/34
		});
		$("#cbase").css({
			"left": 0,
			"top": 0,
			"width": _w*34/1440,
			"height":_w*34/1440*158/34
		});
		$("#cbase").css({
			"left": 0,
			"top": 0,
			"width": _w*34/1440,
			"height":_w*34/1440*158/34
		});
		$("#c1-frame").css({
			"left": _w*10.5/1440,
			"top": _w*25/1440,
			"width":_w*14/1440,
			"height":_w*14/1440
		});
		$("#c1-frame").attr('width',_w*14/1440 );
		$("#c1-frame").attr('height',_w*14/1440 );
		$("#c1-bt").attr('cx',_w*14/1440/2 );
		$("#c1-bt").attr('cy',_w*14/1440/2 );
		$("#c1-bt").attr('r',_w*14/1440/2 );
		$("#c2-frame").css({
			"left": _w*10.5/1440,
			"top": _w*72.5/1440,
			"width":_w*14/1440,
			"height":_w*14/1440
		});
		$("#c2-frame").attr('width',_w*14/1440 );
		$("#c2-frame").attr('height',_w*14/1440 );
		$("#c2-bt").attr('cx',_w*14/1440/2 );
		$("#c2-bt").attr('cy',_w*14/1440/2 );
		$("#c2-bt").attr('r',_w*14/1440/2 );
		$("#c3-frame").css({
			"left": _w*10.5/1440,
			"top": _w*120/1440,
			"width":_w*14/1440,
			"height":_w*14/1440
		});
		$("#c3-frame").attr('width',_w*14/1440 );
		$("#c3-frame").attr('height',_w*14/1440 );
		$("#c3-bt").attr('cx',_w*14/1440/2 );
		$("#c3-bt").attr('cy',_w*14/1440/2 );
		$("#c3-bt").attr('r',_w*14/1440/2 );
	}
	res();
});