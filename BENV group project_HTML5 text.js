(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"BENV group project_HTML5 text_atlas_1", frames: [[0,0,1920,1080]]},
		{name:"BENV group project_HTML5 text_atlas_2", frames: [[0,0,1920,1080]]},
		{name:"BENV group project_HTML5 text_atlas_3", frames: [[0,0,1920,1080]]},
		{name:"BENV group project_HTML5 text_atlas_4", frames: [[0,0,1920,1080],[0,1082,1132,843]]},
		{name:"BENV group project_HTML5 text_atlas_5", frames: [[0,0,624,969],[752,1378,647,627],[1428,569,477,847],[626,843,800,533],[0,1378,750,562],[626,0,516,841],[1144,0,750,567]]},
		{name:"BENV group project_HTML5 text_atlas_6", frames: [[0,1356,483,678],[937,0,482,704],[1539,694,461,682],[1421,0,456,692],[1077,706,460,697],[474,0,461,742],[605,744,470,723],[0,0,472,780],[1539,1378,492,638],[0,782,603,572]]},
		{name:"BENV group project_HTML5 text_atlas_7", frames: [[1423,1685,592,342],[0,0,446,689],[448,0,438,688],[0,691,438,694],[1319,0,429,686],[1423,1209,453,474],[440,691,426,684],[888,0,429,689],[868,691,415,675],[957,1368,464,528],[1285,691,462,516],[477,1377,478,569],[0,1387,475,604]]},
		{name:"BENV group project_HTML5 text_atlas_8", frames: [[0,0,592,342],[933,344,592,171],[594,0,592,342],[933,517,592,171],[1188,0,592,342],[892,1450,592,171],[0,1741,1268,146],[1270,1623,679,146],[711,1006,869,146],[1270,1154,731,146],[1270,1302,728,146],[0,1889,1002,146],[1004,1889,1002,146],[0,1301,437,438],[439,1289,451,335],[0,344,454,431],[456,344,475,345],[711,691,470,313],[1582,344,450,277],[375,777,334,510],[1183,690,245,306],[1782,0,252,287],[892,1154,283,273],[1696,881,248,262],[1430,690,264,269],[0,777,373,522],[1696,623,256,256]]},
		{name:"BENV group project_HTML5 text_atlas_9", frames: [[0,344,420,67],[0,275,465,67],[0,206,499,67],[0,0,227,204],[422,344,64,97],[229,0,232,181]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_34 = function() {
	this.initialize(img.CachedBmp_34);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3490,1039);


(lib.CachedBmp_33 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(img.CachedBmp_32);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2120,145);


(lib.CachedBmp_31 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_9"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_9"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_9"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(img.CachedBmp_8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1293,3894);


(lib.CachedBmp_7 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.Pngtreeupstairsofficestickman_46796431 = function() {
	this.initialize(img.Pngtreeupstairsofficestickman_46796431);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3000,3000);


(lib._1ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib._11ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._12ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib._13ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_6"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib._15ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_6"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib._16ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_7"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib._17ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_7"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib._18ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_7"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib._19ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_7"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib._1stfloorlighting = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._2ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_7"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib._20ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_7"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib._21ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_7"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib._22ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_7"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib._23ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_6"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib._24ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_6"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib._25ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_5"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib._2ndfloorbottomai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib._3ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_7"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib._3rdfloorbottomai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib._3rdfloorlighting = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._4thfloorbottomai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_7"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib._5ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_7"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib._5thfloorlighting = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._6thfloorbottomai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_6"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib._7ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_7"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib._7thfloorbottomai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_6"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib._7thfloortopai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib._8ai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_6"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap66 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap67 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_5"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap68 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_5"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap69 = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.BuildingoutlineLiftcolumnai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_5"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.Floor2t = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.Floor3t = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.Floor4t = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.Floor5t = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.Floor6t = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.Floor7t = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.Flooredu = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_5"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.GEAR = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_6"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.GroundFLoor1t = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.Locationmarker = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_8"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.mapbg = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.mapbutton = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_9"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.MaroonLift = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_9"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Naoshimaport = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Topliftbuttonai = function() {
	this.initialize(ss["BENV group project_HTML5 text_atlas_9"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.Venn2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#895159").s().p("EhKeBKfUge3ge2AABgrpUgABgrnAe3ge3UAe2ge2AroAAAUArpAAAAe2Ae2UAe2Ae3AABArnUgABArpge2Ae2Uge2Ae3grpAAAUgroAAAge2ge3g");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-674.1,-674.1,1348.3000000000002,1348.3000000000002);


(lib.venn1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#374375").s().p("EhKeBKfUge3ge2AABgrpUgABgrnAe3ge3UAe2ge2AroAAAUArpAAAAe2Ae2UAe2Ae3AABArnUgABArpge2Ae2Uge2Ae3grpAAAUgroAAAge2ge3g");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-674.1,-674.1,1348.3000000000002,1348.3000000000002);


(lib.Upbtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Topliftbuttonai();
	this.instance.setTransform(-116,-90.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-116,-90.5,232,181);


(lib.Title = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DFAEA1").s().p("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");
	this.shape.setTransform(-18.8,5.125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#895159").s().p("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");
	this.shape_1.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-501.1,-126,1002.3,252.1);


(lib.Timechange = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCC99").s().p("EibSBaUMAAAi0nME2lAAAMAAAC0ng");
	this.shape.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-993.8,-578,1987.6999999999998,1156.1);


(lib.Textnight = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_34();
	this.instance.setTransform(-872.45,-259.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-872.4,-259.8,1745,519.5);


(lib.textend = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_33();
	this.instance.setTransform(-156.05,-242.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-156,-242.1,312,484.5);


(lib.textbegin = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_32();
	this.instance.setTransform(-530.05,-36.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-530,-36.3,1060,72.5);


(lib.Text11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D4979").s().p("ANcDVQgsgrAAhAQAAhBAsgpQAsgrBDAAQBDAAArArQAtApAABBQAABAgtArQgsArhCAAQhDAAgsgrgAOFAIQgbAkAAA/QAAA8AbAlQAZAkAtAAQAsAAAbglQAZgkAAg8QAAg9gagmQgagkgsAAQgtAAgZAkgAHuDVQgtgrAAhAQAAhBAtgpQAsgrBCAAQBDAAAsArQAsApAABBQAABAgsArQgtArhCAAQhCAAgsgrgAIWAIQgaAkAAA/QAAA8AaAlQAZAkAtAAQAtAAAaglQAZgkABg8QAAg9gagmQgbgkgsAAQgtAAgZAkgAr8DYQgpgoAAhAQAAhBArguQArgsA9AAQAaAAAiALQAPAEAFAAQAMAAAHgPIANAAIAABjIgNAAQgJgngZgWQgagXgjAAQgqAAgaAgQgcAhABA0QAAA6AfAqQAfArAsAAQAdAAAdgQQAbgQAVgbIAAAUQguA/hPAAQg/AAgngogAuvDYQgWAXgQAIQgQAJgXAAQghAAgYgWQgYgWAAggQAAgdAVgTQAVgUA+gSQAngLAPgHIAAgVQgBgfgRgTQgRgSgdAAQgaAAgUAPQgVARgIAcIgPgEQAJgoAdgWQAdgYAnAAQAtAAAdAbQAbAbAAAxIAAB5QABAaADAJQADAJAKAAQAGAAAEgFQAEgFAFgRIANAAQgCAagOAQQgPAQgYAAQgiAAgNgogAvTBqQgrAPgLAOQgMAOAAAYQAAAVAMAQQANAPASAAQAQAAARgKQASgKAIgQIAAhgIgkANgA1gDWQgsgpAAhBQAAhAAqgsQApgrA7AAQAxAAAlAhQAlAgAAAuIAAAGIjRAAIAAAEQAAAvAPAjQAOAiAcAUQAbATAeAAQAbAAAUgLQAUgMAggkIAAAVQgZAhgbAOQgbAOglAAQhDAAgqgqgA08gDQgVAWgDApICbAAIAAgFQAAgmgWgVQgWgWggAAQgiAAgVAXgASSD3IAAgOQAeAAAJgJQAJgJAAgkIAAibQAAgcgKgJQgKgIgmAAIAAgOIBjgIIANAAIAAA8QAnghAWgOQAWgNAOAAQAbAAAZAWIgWAxQgsgZgXAAQgYAAgkAjIAACcQAAAXAKAIQAKAIAcAAIAAAOgAD3D3IAAgOIAPAAQAWAAAHgLQAIgLAAgfIAAl1QABgWgKgIIgGgEIgZBDIgOAAIAAgMQAAgfgOgSQgOgRgaAAQgZAAgNASQgPARAAAgIAACIIBHAAIAAAVIhHAAIAADNQABAXAJAJQAJAKAXAAIANAAIAAAOIihAAIAAgOIANAAQAWAAAIgIQAJgIAAgVIAAjSIgnAAIAAgOQAbgLAMgIIAAg4QAAhCAhgrQAhgrA4AAQAeAAAXAJIBSgJIAMAAIAAHBQAAAXAKAIQAJAIAaAAIAIAAIAAAOgAk2D3IAAgOQAdAAAJgJQAJgIAAgcIAAiMQAAgdgPgQQgQgQgaAAQgYAAgSAMQgUALgUAeIAACbQAAAWAKAIQAKAIAbAAIAAAOIiYAAIAAgOQAgAAAJgKQAKgKgBgiIAAlwQABgagKgIQgJgJggAAIAAgNIBcgKIANAAIAAELQAbgeAXgMQAVgNAcAAQApAAAbAaQAbAaAAAtIAAB9QAAAhAJALQAIAKAcAAIAAAOg");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-142.1,-25.5,284.2,51.1);


(lib.Text10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D4979").s().p("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");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-286.6,-36.2,573.2,72.5);


(lib.Text9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D4979").s().p("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");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-269.6,-37.2,539.3,74.5);


(lib.Text8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D4979").s().p("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");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-270.8,-36.8,541.6,73.69999999999999);


(lib.Text7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D4979").s().p("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");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-273.8,-37.2,547.6,74.5);


(lib.Text6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D4979").s().p("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");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-258.7,-37.2,517.5,74.5);


(lib.Text5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D4979").s().p("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");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-210,-25.5,420.1,51.1);


(lib.Text4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D4979").s().p("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");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-227,-25.5,454,51.1);


(lib.Text3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D4979").s().p("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");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-289,-25.5,578.1,51.1);


(lib.Text2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D4979").s().p("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");
	this.shape.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-287.3,-25.5,574.7,51.1);


(lib.Text1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D4979").s().p("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");
	this.shape.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-278.3,-36.2,556.7,72.5);


(lib.Tag4more = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F7C1B3").s().p("AiUCNQgmgWgWglQgVgmAAgsQAAghANgeQANgeAXgWQAXgXAegMQAegMAfAAQAgAAAeAMQAcALAXAWQAXAWAOAfQANAegBAjQABArgWAmQgVAlgmAWQgkAWgtAAQgtAAgmgWgAhqiSQgVAGgUARQgTARgOAfQgMAfAAAtQAAAnAKAeQALAeATATQATASAWAJQAWAIAYAAQAWAAAWgIQAVgHASgSQATgRAMgeQALgdAAgrQAAg9gWgjQgWgjgcgLQgcgMgaAAQgTAAgVAGgAGhCbIAAgDIAEAAQAJAAAKgIQAJgIAAgSIAAjoQAAgOgFgLQgHgKgQAAIgEAAIAAgEIC4AAIAAAxIgDAAQAAgng0AAIhAAAIAACMIA4AAQARAAANgFQANgGACgTIAEAAIAABFIgEAAQgCgMgFgGQgFgHgFgCQgFgCgFAAIgPgBIg7AAIAABtQAAANAEAJQAFAJARAAIAuAAQARAAAKgFQALgFAHgIQAFgJAEgMIADAAIgKAwgAFWCbIgGgJIgHgJIgHgJIgEgIIglg9QgMgSgLgMQgLgMgLgFQgKgFgIgBIgTgBIAABxQAAAhAhABIAAADIhiAAIAAgDQAJgBAHgCQAIgEAEgHQAFgIAAgMIAAjpQAAgSgJgIQgJgIgKAAIgFAAIAAgEIBrAAQAaAAASAIQASAIAKAMQAKANAFANQADAOAAANQABARgIAPQgGAQgPALQgPALgVADIAAABQAbANAYAoIAcAvQASAgAMAIQAMAJALABIAAADgADHiPIAACNIARAAQAdAAASgIQARgIAIgPQAIgPAAgVQAAgSgIgRQgGgSgRgLQgRgMgdAAQgMAAgIACgAlqCbIAAgDQAVgCAGgJQAIgKgCgUIgKjsIgCAAIhtEYIhnkOIAAAAIgLDaQgCASAEAKQADAKAGAFQAHAEANACIAAADIhOAAIAAgDQAPAAAIgHQAHgHADgKQADgLABgSIAMjiIgCgEIgGgHQgEgDgEgCQgGgEgGgBIgPgBIAAgEIBIAAIBgD8IBhj8IBBAAIAAAEIgNABQgEABgEAEQgHAFgCAFQgBAFgBAMQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABIAKDkQABAPAGAKQAHALAWAAIAAADg");
	this.shape.setTransform(-0.55,2.675);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D67E8B").s().p("A3GGsIAAmsQAAiwB9h+QB+h9CxAAMAg1AAAQCxAAB9B9QB+B+AACwIAAGsgAiFh7QgeAMgXAWQgXAWgNAeQgNAeAAAhQAAAsAWAmQAVAmAmAWQAmAWAtAAQAuAAAkgWQAlgWAVgmQAWglAAgsQAAgjgNgeQgOgegXgWQgXgWgcgMQgdgMggAAQggAAgeANgAGbC2IC4AAIALgxIgDAAQgEAMgGAJQgHAJgKAEQgLAFgRAAIguAAQgRAAgEgJQgFgJAAgMIAAhuIA7AAIAQABQAEAAAFACQAFADAFAGQAGAGACAMIADAAIAAhFIgDAAQgCATgOAFQgNAGgRAAIg4AAIAAiMIBAAAQA0AAAAAnIADAAIAAgxIi4AAIAAAEIAEAAQAQAAAHALQAGAKAAAOIAADoQAAASgKAIQgJAIgKAAIgEAAgADUAgQAIACAKAFQALAFALAMQAMALALATIAlA9IAFAHIAGAKIAHAJIAHAJIA4AAIAAgEQgLgBgMgIQgLgIgTggIgcgvQgYgogbgOIAAgBQAWgEAOgLQAPgLAHgOQAHgQAAgQQAAgOgEgNQgFgOgKgMQgKgNgSgIQgSgIgZAAIhsAAIAAAFIAFAAQAKAAAJAHQAJAIAAASIAADpQAAANgEAIQgFAHgHADQgHADgKAAIAAAEIBjAAIAAgEQgigBAAghIAAhxIATABgAlZhjIAKDtQACAUgHAJQgHAJgUACIAAAEIBkAAIAAgEQgWAAgGgKQgHgLAAgOIgLjlQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQABgMABgFQACgEAHgGQAFgDAEgBIAMgCIAAgEIhBAAIhhD8Ihgj8IhHAAIAAAEIAOACQAGAAAHAFQADABAEAEIAGAGIACAFIgMDhQgBATgDAKQgCAKgIAHQgIAHgOAAIAAAEIBNAAIAAgEQgNgCgHgEQgGgEgDgKQgDgKABgSIALjbIAAAAIBoEPIBtkZgAh1CsQgWgIgTgTQgTgTgKgdQgLgeAAgoQAAgsANgfQANgfAUgRQATgRAVgGQAVgHAUAAQAZAAAdAMQAbAMAWAjQAWAjAAA8QAAArgLAeQgMAegSARQgSARgWAIQgWAHgWAAQgYAAgWgIgADBAXIAAiLQAIgCAMAAQAdAAARALQARAMAHARQAHARAAASQAAAVgIAPQgIAOgRAIQgSAIgcAAg");
	this.shape_1.setTransform(0.025,0.025);

	this.instance = new lib.CachedBmp_31();
	this.instance.setTransform(-147.85,-128.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-147.8,-128.3,296,171.10000000000002);


(lib.Tag3lighting = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(-100,-13.65,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_29();
	this.instance_1.setTransform(-147.85,-42.75,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_26();
	this.instance_2.setTransform(-147.85,-128.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.instance_1},{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-147.8,-128.3,296,171.10000000000002);


(lib.Tag2function = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(-116.65,-14.25,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_22();
	this.instance_1.setTransform(-147.85,-42.75,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_19();
	this.instance_2.setTransform(-147.85,-128.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.instance_1},{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-147.8,-128.3,296,171.10000000000002);


(lib.Tag1structure = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(-125.05,-14.25,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_15();
	this.instance_1.setTransform(-147.85,-42.75,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_12();
	this.instance_2.setTransform(-147.85,-128.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.instance_1},{t:this.instance}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-147.8,-128.3,296,171.10000000000002);


(lib.Sun = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(-161.65,-156.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-161.6,-156.8,323.5,313.5);


(lib.Subtitle = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DFAEA1").s().p("AO7FpIoTpOIAAGoQAAA1AEAZQAFAaAIAMQARAXArACIAAAIIitAAIAAgIQAdgBAQgLQARgLAHgdQAGgeAAg6IAAnCIgXgaQgfgigRgKQgTgJgbgFIAAgHICBAAIILJIIAAm9QAAgygEgZQgEgZgRgPQgSgPgkgCIAAgHICtAAIAAAHQgZAEgQAHQgPAHgJAUQgIATAAAmIAAJcgAqsFeQgigJghgQQgOgFgGAAQgJAAgDAHQgDAHgFAYIgIAAIAAitIAIAAQAQBLAxAnQAxAoBGAAQA1AAAfgVQAfgTANgcQAMgcAAgcQAAg6gjglQgkglhIgmQgygcgXgPQgYgNgZgZQgYgXgPghQgPggAAgrQAAgxAagsQAagtAvgbQAvgbA8AAQAuAAAwAQQAHAEANgBQAQAAAFgUIAHAAIAACTIgHAAQgHgyglglQglgng9AAQgoAAgfATQgeATgSAgQgRAhAAApQAAAhALAZQAJAZAVATQATATAbASIBIApQBMAoAqArQArAoAABJQAAAsgXApQgXApguAaQguAahEABQgrAAgggKgEAgzAFYIAAgIQAjABASgHQATgGAAgdQABgQgKgcIgBgFIg+i3IjvAAIg3CqQgLAiAAAVQAAAdAPAKQAOAKAbgBIAAAIIijAAIAAgIQAjgDAWgWQAUgYAQgvIDCpSIAzAAIDPJOQARAvAOAUQAPAVANAGQANAEAVACIAAAIgAdMAmIDcAAIhxlGIgCAAgAWfFYIAAgIQAjABASgHQATgGAAgdQAAgQgJgcIgCgFIg9i3IjwAAIg2CqQgLAiAAAVQAAAdAOAKQAOAKAcgBIAAAIIijAAIAAgIQAjgDAVgWQAUgYAQgvIDDpSIAyAAIDPJOQARAvAPAUQAOAVANAGQANAEAWACIAAAIgAS3AmIDcAAIhwlGIgCAAgAAuFYIAAgIQAjABASgHQATgGAAgdQAAgQgJgcIgCgFIg9i3IjvAAIg2CqQgLAigBAVQAAAdAPAKQAOAKAbgBIAAAIIiiAAIAAgIQAjgDAVgWQAUgYAQgvIDDpSIAzAAIDOJOQAQAvAOAUQAPAVANAGQANAEAVACIAAAIgAi5AmIDcAAIhwlGIgCAAgA4wFYIAAgIQAigBATgRQAUgTAAgmIAAkHIixkIQgcgqgVgPQgXgNgmgCIAAgHID1AAIAAAHQgmACgKAPQgKAOAAANQgBAPATAcICQDVIB/jAQAdgsAAgWQAAgQgIgJQgHgJgIgDIgRgFIAAgHICvAAIAAAHQgfABgYAOQgYAOgNAPQgOAPgPAWIiiDzIAAETQAAAmAWASQAXATAfAAIAAAIgEgkUAFYIAAgIIAJAAQAaAAAUgSQATgUAAgmIAAoIQgBglgRgUQgSgUgegBIgIAAIAAgHIDhAAQAtAAAmAMQAlANAaAXQAaAXAOAdQAOAdAAAhQAAA/gpAnQgoAnhEARIAAACQAfAEAdAHQAcAGAXALQAYALATATQATARANAUQAMAVAHAXQAGAXABAZQAAA2gcAoQgdAmgjAUQgyAchYAAgEgiDADxQgBAZAGAQQAEARAWAMQAWAMAvAAQBeAAApg/QAbgsABg3QAAgngOggQgOgfgYgWQgZgVgkgNQgkgKgsgBIhGAAgEgiDgE6IAAEeIAtAAQA3AAAXgMQAPgIARgNQAPgNAPgbQAPgdAAgoQAAgegJgcQgLgdgSgVQgTgWgZgMQgbgMgeAAQgbAAgiAKg");
	this.shape.setTransform(4.5,3.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#895159").s().p("Egi5AKoQj3AAiviTQiviSAAjPIAAlnQAAjPCviSQCviTD3AAMBFbAAAQEBAAC1CYQC3CYAADYIAAFTQAADPivCSQivCTj4AAgAPoGNIAEAAIAApcQAAgmAIgTQAJgUAPgHQAQgHAZgEIAAgHIitAAIAAAHQAkACASAPQARAPAEAZQAEAZAAAyIAAG9IoKpIIiCAAIAAAHQAbAFATAJQARAKAfAiIAXAaIAAHCQAAA6gGAeQgHAdgRALQgQALgdABIAAAIICtAAIAAgIQgrgCgRgXQgIgMgFgaQgEgZAAg1IAAmogArCFpQAhAQAiAJQAgAKArAAQBEgBAugaQAugaAXgpQAXgpAAgsQAAhJgrgoQgqgrhMgpIhIgoQgbgSgTgTQgVgTgJgZQgLgZAAghQAAgpARghQASggAegTQAfgTAoAAQA9AAAlAnQAlAlAHAyIAHAAIAAiTIgHAAQgFAUgQAAQgNABgHgEQgwgQguAAQg8AAgvAbQgvAbgaAtQgaAsAAAxQAAArAPAgQAPAhAYAXQAZAYAYAOQAXAPAyAcQBIAmAkAlQAjAlAAA6QAAAcgMAcQgNAcgfATQgfAVg1AAQhGAAgxgoQgxgngQhLIgIAAIAACtIAIAAQAFgYADgHQADgHAJAAQAGAAAOAFgEAhgABjIA+C3IABAFQAKAcgBAQQAAAdgTAGQgSAHgjgBIAAAIIDiAAIAAgIQgVgCgNgEQgNgGgPgVQgOgUgRgvIjPpOIgzAAIjCJSQgQAvgUAYQgWAWgjADIAAAIICjAAIAAgIQgbABgOgKQgPgKAAgdQAAgVALgiIA3iqgAXMBjIA9C3IACAFQAJAcAAAQQAAAdgTAGQgSAHgjgBIAAAIIDiAAIAAgIQgWgCgMgEQgOgGgOgVQgPgUgRgvIjPpOIgyAAIjDJSQgQAvgUAYQgVAWgjADIAAAIICjAAIAAgIQgcABgOgKQgOgKAAgdQAAgVALgiIA2iqgABbBjIA9C3IACAFQAJAcAAAQQAAAdgTAGQgSAHgjgBIAAAIIDhAAIAAgIQgVgCgNgEQgNgGgPgVQgOgUgQgvIjPpOIgyAAIjDJSQgQAvgUAYQgVAWgjADIAAAIICiAAIAAgIQgbABgOgKQgOgKAAgdQAAgVALgiIA2iqgA7ZkuQAmACAXANQAVAPAcAqICxEHIAAEIQAAAmgUATQgTARgiABIAAAIIDbAAIAAgIQgfAAgXgTQgWgSAAgmIAAkUICijyQAPgWAOgPQANgPAYgOQAYgOAfgBIAAgHIivAAIAAAHIARAFQAIADAHAJQAIAJAAAQQAAAWgdAsIh/DAIiQjVQgTgcABgPQAAgNAKgOQAKgPAmgCIAAgHIj1AAgEgjnAF8IECAAQBYAAAygcQAjgUAdgmQAcgoAAg2QgBgZgGgXQgHgXgMgVQgNgUgTgRQgTgTgYgLQgXgMgcgGQgdgHgfgEIAAgCQBEgQAognQApgnAAg/QAAghgOgdQgOgdgagWQgagYglgNQgmgMgtAAIjhAAIAAAHIAIAAQAeABASAUQARAUABAlIAAIIQAAAmgTAUQgUASgaAAIgJAAgEgg3AFbQgWgMgEgRQgGgQABgZIAAj6IBGAAQAsABAkALQAkANAZAVQAYAWAOAfQAOAgAAAnQgBA3gbAsQgpA/heAAQgvAAgWgMgAd5BKIBplGIACAAIBxFGgATkBKIBqlGIACAAIBwFGgAiMBKIBqlGIACAAIBwFGgEghWAAHIAAkdQAigKAbAAQAeAAAbAMQAZAMATAWQASAVALAdQAJAcAAAeQAAAogPAdQgPAbgPANQgRANgPAIQgXALg3AAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-283.1,-68,566.2,136);


(lib.StartBtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Locationmarker();
	this.instance.setTransform(-56.5,-114,0.4844,0.4844);

	this.instance_1 = new lib.mapbutton();
	this.instance_1.setTransform(-113.5,-90);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance,p:{x:-56.5,y:-114}}]}).to({state:[{t:this.instance_1},{t:this.instance,p:{x:-57,y:-161}}]},1).to({state:[{t:this.instance_1},{t:this.instance,p:{x:-56.5,y:-114}}]},1).to({state:[{t:this.instance_1},{t:this.instance,p:{x:-56.5,y:-114}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-113.5,-161,227,275);


(lib.square = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib._1ai();
	this.instance.setTransform(-218.5,-219);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-218.5,-219,437,438);


(lib.Section = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.BuildingoutlineLiftcolumnai();
	this.instance.setTransform(-234.1,-381.55,0.9074,0.9074);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-234.1,-381.5,468.2,763.1);


(lib.Naoshimaport_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Naoshimaport();
	this.instance.setTransform(-241.9,-180.15,0.4274,0.4274);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-241.9,-180.1,483.8,360.2);


(lib.Moon = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(-445,-323.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-445,-323.3,646.5,1947);


(lib.Map = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.mapbg();
	this.instance.setTransform(-960,-540);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-960,-540,1920,1080);


(lib.LV7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GEAR();
	this.instance.setTransform(-38.25,8.9,0.739,0.739);

	this.instance_1 = new lib.Floor7t();
	this.instance_1.setTransform(327.15,-343.1,1.3026,1.3026,90);

	this.instance_2 = new lib.CachedBmp_7();
	this.instance_2.setTransform(-58.2,-431.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.2,-431.5,634,863.1);


(lib.LV6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Pngtreeupstairsofficestickman_46796431();
	this.instance.setTransform(-175.05,23.2,0.1314,0.1314);

	this.instance_1 = new lib.Floor6t();
	this.instance_1.setTransform(179.9,-331.8,1.3548,1.3548,90);

	this.instance_2 = new lib.CachedBmp_6();
	this.instance_2.setTransform(-219,-417.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-219,-417.2,438,834.5);


(lib.LV5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Flooredu();
	this.instance.setTransform(-266.95,13.15,0.7305,0.7305);

	this.instance_1 = new lib.Floor5t();
	this.instance_1.setTransform(98.4,-342.85,1.2979,1.2979,90);

	this.instance_2 = new lib.CachedBmp_5();
	this.instance_2.setTransform(-280.9,-427.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-280.9,-427.3,561.8,854.6);


(lib.LV4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap69();
	this.instance.setTransform(-307.85,30.75,1.3682,1.3682);

	this.instance_1 = new lib.Floor4t();
	this.instance_1.setTransform(123.05,-332.25,1.3377,1.3377,90);

	this.instance_2 = new lib.CachedBmp_4();
	this.instance_2.setTransform(-270.8,-409.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-307.8,-409.7,615.7,819.5);


(lib.LV3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap67();
	this.instance.setTransform(-265.6,55.8,0.6715,0.6715);

	this.instance_1 = new lib.Floor3t();
	this.instance_1.setTransform(133.95,-319.2,1.3253,1.3253,89.9954);

	this.instance_2 = new lib.CachedBmp_3();
	this.instance_2.setTransform(-265.55,-413.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-271.6,-413.6,543.2,827.3);


(lib.LV2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap66();
	this.instance.setTransform(-221.05,84.25);

	this.instance_1 = new lib.Floor2t();
	this.instance_1.setTransform(248.95,-274.75,1,1,90);

	this.instance_2 = new lib.CachedBmp_2();
	this.instance_2.setTransform(-240,-397.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-261,-397.2,522,794.5);


(lib.LV1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Bitmap68();
	this.instance.setTransform(-239.2,48,0.6859,0.6859);

	this.instance_1 = new lib.GroundFLoor1t();
	this.instance_1.setTransform(246.8,-325,1,1,90);

	this.instance_2 = new lib.CachedBmp_1();
	this.instance_2.setTransform(-254.15,-433.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-275.2,-433.4,550.5,866.9);


(lib.lowbtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Topliftbuttonai();
	this.instance.setTransform(116,90.5,1,1,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-116,-90.5,232,181);


(lib.light = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib._5thfloorlighting();
	this.instance.setTransform(-960,-550.5);

	this.instance_1 = new lib._3rdfloorlighting();
	this.instance_1.setTransform(-960,-529.5);

	this.instance_2 = new lib._1stfloorlighting();
	this.instance_2.setTransform(-960,-529.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-960,-550.5,1920,1101);


(lib.Lift = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.MaroonLift();
	this.instance.setTransform(-32,-48.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32,-48.5,64,97);


(lib.Floor7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib._7thfloortopai();
	this.instance.setTransform(-237.5,-172.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-237.5,-172.5,475,345);


(lib.Floor6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib._7thfloortopai();
	this.instance.setTransform(-234.5,-172.5,0.9875,1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-234.5,-172.5,469.1,345);


(lib.Floor5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib._7thfloortopai();
	this.instance.setTransform(-235.8,-165,0.9929,0.9565);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-235.8,-165,471.70000000000005,330);


(lib.Floor4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib._4thfloorbottomai();
	this.instance.setTransform(-235.5,-236.9,1.0195,0.9183);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-235.5,-236.9,471,473.9);


(lib.Floor3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib._7thfloortopai();
	this.instance.setTransform(-233.75,-223.9,0.9842,1.2981);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-233.7,-223.9,467.5,447.9);


(lib.Floor2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib._7thfloortopai();
	this.instance.setTransform(-229.95,-172.5,0.9683,1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-229.9,-172.5,459.9,345);


(lib.Floor1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib._2ndfloorbottomai();
	this.instance.setTransform(-225.5,-167.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-225.5,-167.5,451,335);


(lib.File = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#895159").s().p("EibfAC7IAAl1ME2/AAAIAAF1g");
	this.shape.setTransform(0,-0.0152,1,3.6453);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-995.2,-68.3,1990.4,136.7);


(lib.Textshape = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Text5("synched",0);
	this.instance.setTransform(-79,187.4);

	this.instance_1 = new lib.Text4("synched",0);
	this.instance_1.setTransform(-62.05,93.7);

	this.instance_2 = new lib.Text3("synched",0);
	this.instance_2.setTransform(0.4,0);

	this.instance_3 = new lib.Text2("synched",0);
	this.instance_3.setTransform(-1.75,-93.7);

	this.instance_4 = new lib.Text1("synched",0);
	this.instance_4.setTransform(-11.15,-176.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-289.4,-212.9,578.9,425.9);


(lib.Textfloor = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Text11("synched",0);
	this.instance.setTransform(-142.3,234.25);

	this.instance_1 = new lib.Text10("synched",0);
	this.instance_1.setTransform(0.6,151.25);

	this.instance_2 = new lib.Text9("synched",0);
	this.instance_2.setTransform(-17.5,58.55);

	this.instance_3 = new lib.Text8("synched",0);
	this.instance_3.setTransform(-15.2,-35.55);

	this.instance_4 = new lib.Text7("synched",0);
	this.instance_4.setTransform(-12.85,-128.85);

	this.instance_5 = new lib.Text6("synched",0);
	this.instance_5.setTransform(-26.55,-222.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-287.1,-259.8,574.3,519.7);


(lib.Liftbtnup = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Upbtn("synched",0);
	var instanceFilter_1 = new cjs.ColorFilter(0.5,0.5,0.5,1,0,0,0,0);
	this.instance.filters = [instanceFilter_1];
	this.instance.cache(-118,-92,236,185);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:1.1,scaleY:1.1},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1).to({startPosition:0},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(instanceFilter_1).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,0.69921875,0.69921875,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance, startFrame:1, endFrame:1, x:-118, y:-92, w:236, h:185});
	this.filterCacheList.push({instance: this.instance, startFrame:0, endFrame:0, x:-118, y:-92, w:236, h:185});
	this.filterCacheList.push({instance: this.instance, startFrame:2, endFrame:2, x:-118, y:-92, w:236, h:185});
	this.filterCacheList.push({instance: this.instance, startFrame:3, endFrame:3, x:-118, y:-92, w:236, h:185});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-127.5,-99.5,255.2,199.1);


(lib.LiftBtnlow = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.lowbtn("synched",0);
	var instanceFilter_1 = new cjs.ColorFilter(0.5,0.5,0.5,1,0,0,0,0);
	this.instance.filters = [instanceFilter_1];
	this.instance.cache(-118,-92,236,185);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:1.1,scaleY:1.1},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1).to({startPosition:0},0).wait(1));
	this.timeline.addTween(cjs.Tween.get(instanceFilter_1).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,0.69921875,0.69921875,1,0,0,0,0), 0).wait(1).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(1));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance, startFrame:1, endFrame:1, x:-118, y:-92, w:236, h:185});
	this.filterCacheList.push({instance: this.instance, startFrame:0, endFrame:0, x:-118, y:-92, w:236, h:185});
	this.filterCacheList.push({instance: this.instance, startFrame:2, endFrame:2, x:-118, y:-92, w:236, h:185});
	this.filterCacheList.push({instance: this.instance, startFrame:3, endFrame:3, x:-118, y:-92, w:236, h:185});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-127.6,-99.6,255.2,199.1);


// stage content:
(lib.BENVgroupproject_HTML5text = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,12,98,122,123,139,154,169,184,199,214,216,247,257,264,267,277,287,297,306,307,328,407,414,415,416];
	this.streamSoundSymbolsList[0] = [{id:"windblowingsfx12809wav",startFrame:0,endFrame:55,loop:1,offset:0},{id:"pop91931wav",startFrame:0,endFrame:12,loop:1,offset:0}];
	this.streamSoundSymbolsList[12] = [{id:"metalobjectslidingonwoodsurface31393wav",startFrame:12,endFrame:100,loop:1,offset:0}];
	this.streamSoundSymbolsList[98] = [{id:"pageturn102978wav",startFrame:98,endFrame:123,loop:1,offset:0}];
	this.streamSoundSymbolsList[123] = [{id:"pop91931wav",startFrame:123,endFrame:139,loop:1,offset:0},{id:"pageturn102978wav",startFrame:123,endFrame:216,loop:1,offset:0}];
	this.streamSoundSymbolsList[139] = [{id:"pop91931wav",startFrame:139,endFrame:154,loop:1,offset:0}];
	this.streamSoundSymbolsList[154] = [{id:"pop91931wav",startFrame:154,endFrame:169,loop:1,offset:0}];
	this.streamSoundSymbolsList[169] = [{id:"pop91931wav",startFrame:169,endFrame:184,loop:1,offset:0}];
	this.streamSoundSymbolsList[184] = [{id:"pop91931wav",startFrame:184,endFrame:199,loop:1,offset:0}];
	this.streamSoundSymbolsList[199] = [{id:"pop91931wav",startFrame:199,endFrame:215,loop:1,offset:0}];
	this.streamSoundSymbolsList[216] = [{id:"pageturn102978wav",startFrame:216,endFrame:247,loop:1,offset:0}];
	this.streamSoundSymbolsList[247] = [{id:"elevatordingatarencotowerdubai38520wav",startFrame:247,endFrame:257,loop:1,offset:0}];
	this.streamSoundSymbolsList[257] = [{id:"elevatordingatarencotowerdubai38520wav",startFrame:257,endFrame:267,loop:1,offset:0}];
	this.streamSoundSymbolsList[264] = [{id:"metalobjectslidingonwoodsurface31393wav",startFrame:264,endFrame:328,loop:1,offset:0}];
	this.streamSoundSymbolsList[267] = [{id:"elevatordingatarencotowerdubai38520wav",startFrame:267,endFrame:277,loop:1,offset:0}];
	this.streamSoundSymbolsList[277] = [{id:"elevatordingatarencotowerdubai38520wav",startFrame:277,endFrame:287,loop:1,offset:0}];
	this.streamSoundSymbolsList[287] = [{id:"elevatordingatarencotowerdubai38520wav",startFrame:287,endFrame:297,loop:1,offset:0}];
	this.streamSoundSymbolsList[297] = [{id:"elevatordingatarencotowerdubai38520wav",startFrame:297,endFrame:307,loop:1,offset:0}];
	this.streamSoundSymbolsList[328] = [{id:"windblowingsfx12809wav",startFrame:328,endFrame:404,loop:1,offset:0}];
	this.streamSoundSymbolsList[407] = [{id:"metalobjectslidingonwoodsurface31393wav",startFrame:407,endFrame:477,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("pop91931wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,12,1);
		var soundInstance = playSound("windblowingsfx12809wav",0);
		this.InsertIntoSoundStreamData(soundInstance,0,55,1);
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.StartBtn.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
	}
	this.frame_12 = function() {
		var soundInstance = playSound("metalobjectslidingonwoodsurface31393wav",0);
		this.InsertIntoSoundStreamData(soundInstance,12,100,1);
	}
	this.frame_98 = function() {
		var soundInstance = playSound("pageturn102978wav",0);
		this.InsertIntoSoundStreamData(soundInstance,98,123,1);
	}
	this.frame_122 = function() {
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.LightingBtn.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay(308);
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.StructureBtn.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay(123);
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.FunctionBtn.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay(216);
		});
		
		
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.MoreBtn.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay(417);
		});
	}
	this.frame_123 = function() {
		var soundInstance = playSound("pageturn102978wav",0);
		this.InsertIntoSoundStreamData(soundInstance,123,216,1);
		var soundInstance = playSound("pop91931wav",0);
		this.InsertIntoSoundStreamData(soundInstance,123,139,1);
	}
	this.frame_139 = function() {
		var soundInstance = playSound("pop91931wav",0);
		this.InsertIntoSoundStreamData(soundInstance,139,154,1);
	}
	this.frame_154 = function() {
		var soundInstance = playSound("pop91931wav",0);
		this.InsertIntoSoundStreamData(soundInstance,154,169,1);
	}
	this.frame_169 = function() {
		var soundInstance = playSound("pop91931wav",0);
		this.InsertIntoSoundStreamData(soundInstance,169,184,1);
	}
	this.frame_184 = function() {
		var soundInstance = playSound("pop91931wav",0);
		this.InsertIntoSoundStreamData(soundInstance,184,199,1);
	}
	this.frame_199 = function() {
		var soundInstance = playSound("pop91931wav",0);
		this.InsertIntoSoundStreamData(soundInstance,199,215,1);
	}
	this.frame_214 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
	}
	this.frame_216 = function() {
		var soundInstance = playSound("pageturn102978wav",0);
		this.InsertIntoSoundStreamData(soundInstance,216,247,1);
	}
	this.frame_247 = function() {
		var soundInstance = playSound("elevatordingatarencotowerdubai38520wav",0);
		this.InsertIntoSoundStreamData(soundInstance,247,257,1);
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.UpBtn.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
	}
	this.frame_257 = function() {
		var soundInstance = playSound("elevatordingatarencotowerdubai38520wav",0);
		this.InsertIntoSoundStreamData(soundInstance,257,267,1);
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.UpBtn.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
		
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.LowBtn.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(247);
		});
	}
	this.frame_264 = function() {
		var soundInstance = playSound("metalobjectslidingonwoodsurface31393wav",0);
		this.InsertIntoSoundStreamData(soundInstance,264,328,1);
	}
	this.frame_267 = function() {
		var soundInstance = playSound("elevatordingatarencotowerdubai38520wav",0);
		this.InsertIntoSoundStreamData(soundInstance,267,277,1);
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.UpBtn.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.LowBtn.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(257);
		});
	}
	this.frame_277 = function() {
		var soundInstance = playSound("elevatordingatarencotowerdubai38520wav",0);
		this.InsertIntoSoundStreamData(soundInstance,277,287,1);
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.UpBtn.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.LowBtn.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(267);
		});
	}
	this.frame_287 = function() {
		var soundInstance = playSound("elevatordingatarencotowerdubai38520wav",0);
		this.InsertIntoSoundStreamData(soundInstance,287,297,1);
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.UpBtn.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.LowBtn.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(277);
		});
	}
	this.frame_297 = function() {
		var soundInstance = playSound("elevatordingatarencotowerdubai38520wav",0);
		this.InsertIntoSoundStreamData(soundInstance,297,307,1);
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.UpBtn.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.LowBtn.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(287);
		});
	}
	this.frame_306 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.UpBtn.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.LowBtn.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(297);
		});
	}
	this.frame_307 = function() {
		playSound("pageturn102978wav");
	}
	this.frame_328 = function() {
		var soundInstance = playSound("windblowingsfx12809wav",0);
		this.InsertIntoSoundStreamData(soundInstance,328,404,1);
	}
	this.frame_407 = function() {
		var soundInstance = playSound("metalobjectslidingonwoodsurface31393wav",0);
		this.InsertIntoSoundStreamData(soundInstance,407,477,1);
	}
	this.frame_414 = function() {
		playSound("spotlight91359wav");
	}
	this.frame_415 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
	}
	this.frame_416 = function() {
		playSound("pageturn102978wav");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12).call(this.frame_12).wait(86).call(this.frame_98).wait(24).call(this.frame_122).wait(1).call(this.frame_123).wait(16).call(this.frame_139).wait(15).call(this.frame_154).wait(15).call(this.frame_169).wait(15).call(this.frame_184).wait(15).call(this.frame_199).wait(15).call(this.frame_214).wait(2).call(this.frame_216).wait(31).call(this.frame_247).wait(10).call(this.frame_257).wait(7).call(this.frame_264).wait(3).call(this.frame_267).wait(10).call(this.frame_277).wait(10).call(this.frame_287).wait(10).call(this.frame_297).wait(9).call(this.frame_306).wait(1).call(this.frame_307).wait(21).call(this.frame_328).wait(79).call(this.frame_407).wait(7).call(this.frame_414).wait(1).call(this.frame_415).wait(1).call(this.frame_416).wait(215));

	// File
	this.instance = new lib.Title("synched",0);
	this.instance.setTransform(938.3,272.1);

	this.instance_1 = new lib.File("synched",0);
	this.instance_1.setTransform(995.2,1240.85);
	this.instance_1._off = true;

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#A3606A").s().p("EihoAN4IAA7wMFDSAAAIAAbwg");
	this.shape.setTransform(941.2,1132.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#BD6F7B").s().p("EihoAN4IAA7wMFDSAAAIAAbwg");
	this.shape_1.setTransform(941.2,1132.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D67E8B").s().p("EihoAN4IAA7wMFDSAAAIAAbwg");
	this.shape_2.setTransform(941.2,1132.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},18).to({state:[]},1).to({state:[{t:this.instance_1}]},78).to({state:[{t:this.instance_1}]},12).to({state:[{t:this.shape}]},105).to({state:[{t:this.shape_1}]},92).to({state:[{t:this.shape_2}]},109).to({state:[{t:this.shape_2}]},32).wait(183));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({startPosition:0},0).to({regX:0.1,scaleX:1.5829,scaleY:1.5829,x:938.45,y:-288},18,cjs.Ease.cubicIn).to({_off:true},1).wait(611));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(98).to({_off:false},0).to({x:986.2,y:1111.6},12,cjs.Ease.cubicOut).to({_off:true},105).wait(416));

	// All_text
	this.instance_2 = new lib.Textshape("synched",0);
	this.instance_2.setTransform(-298.45,494.1);
	this.instance_2._off = true;

	this.instance_3 = new lib.LV1("synched",0);
	this.instance_3.setTransform(1495.2,-452.2);
	this.instance_3._off = true;

	this.instance_4 = new lib.LV2("synched",0);
	this.instance_4.setTransform(1481.05,-420.5);
	this.instance_4._off = true;

	this.instance_5 = new lib.LV3("synched",0);
	this.instance_5.setTransform(1506.6,-420);
	this.instance_5._off = true;

	this.instance_6 = new lib.LV4("synched",0);
	this.instance_6.setTransform(1511.85,-416);
	this.instance_6._off = true;

	this.instance_7 = new lib.LV5("synched",0);
	this.instance_7.setTransform(1521.95,-438.4);
	this.instance_7._off = true;

	this.instance_8 = new lib.LV6("synched",0);
	this.instance_8.setTransform(1460.05,-440.45);
	this.instance_8._off = true;

	this.instance_9 = new lib.LV7("synched",0);
	this.instance_9.setTransform(1299.25,-430.2);
	this.instance_9._off = true;

	this.instance_10 = new lib.Textnight("synched",0);
	this.instance_10.setTransform(971.2,1616.95,1,1,105.0002,0,0,0.1,1032.2);
	this.instance_10._off = true;
	var instance_10Filter_1 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_10.filters = [instance_10Filter_1];
	this.instance_10.cache(-874,-262,1749,524);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(123).to({_off:false},0).to({x:379.7},21,cjs.Ease.cubicOut).to({_off:true},71).wait(416));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(242).to({_off:false},0).to({y:580},5,cjs.Ease.none).wait(1).to({startPosition:0},0).to({y:1490.2},3).to({_off:true},1).wait(379));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(252).to({_off:false},0).to({y:543.75},5).wait(1).to({startPosition:0},0).to({y:1440.45},3).to({_off:true},1).wait(369));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(262).to({_off:false},0).to({y:560.2},5).wait(1).to({startPosition:0},0).to({y:1456.9},3).to({_off:true},1).wait(359));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(272).to({_off:false},0).to({y:556.25},5).wait(1).to({startPosition:0},0).to({y:1452.95},3).to({_off:true},1).wait(349));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(282).to({_off:false},0).to({y:573.85},5).wait(1).to({startPosition:0},0).to({y:1470.55},3).to({_off:true},1).wait(339));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(292).to({_off:false},0).to({y:563.8},5).wait(1).to({startPosition:0},0).to({y:1460.5},3).to({_off:true},1).wait(329));
	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(302).to({_off:false},0).to({y:578.1},4).wait(1).to({startPosition:0},0).to({y:1474.8},3).to({_off:true},1).wait(320));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(373).to({_off:false},0).to({rotation:0,y:1616.85},31,cjs.Ease.quartOut).wait(11).to({startPosition:0},0).to({scaleX:0.9999,scaleY:0.9999,rotation:-51.5397,x:971.25,y:1616.9,alpha:0},23,cjs.Ease.cubicIn).wait(193));
	this.timeline.addTween(cjs.Tween.get(instance_10Filter_1).wait(373).to(new cjs.ColorFilter(0,0,0,1,24,30,52,0), 0).wait(42).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(216));

	// Tag_3
	this.instance_11 = new lib.Tag3lighting();
	this.instance_11.setTransform(739.35,1086);
	this.instance_11._off = true;
	new cjs.ButtonHelper(this.instance_11, 0, 1, 2, false, new lib.Tag3lighting(), 3);

	this.LightingBtn = new lib.Tag3lighting();
	this.LightingBtn.name = "LightingBtn";
	this.LightingBtn.setTransform(739.35,1000.45);
	new cjs.ButtonHelper(this.LightingBtn, 0, 1, 2, false, new lib.Tag3lighting(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_11}]},106).to({state:[{t:this.LightingBtn}]},12).to({state:[{t:this.LightingBtn}]},330).wait(183));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(106).to({_off:false},0).to({_off:true,y:1000.45},12,cjs.Ease.cubicOut).wait(513));

	// Tag_4
	this.instance_12 = new lib.Subtitle("synched",0);
	this.instance_12.setTransform(952.25,816.2);

	this.instance_13 = new lib.Tag4more();
	this.instance_13.setTransform(1035.1,1086);
	this.instance_13._off = true;
	new cjs.ButtonHelper(this.instance_13, 0, 1, 2, false, new lib.Tag4more(), 3);

	this.MoreBtn = new lib.Tag4more();
	this.MoreBtn.name = "MoreBtn";
	this.MoreBtn.setTransform(1035.1,1000.45);
	new cjs.ButtonHelper(this.MoreBtn, 0, 1, 2, false, new lib.Tag4more(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_12}]}).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},18).to({state:[]},1).to({state:[{t:this.instance_13}]},90).to({state:[{t:this.MoreBtn}]},12).to({state:[{t:this.MoreBtn}]},326).wait(183));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1).to({startPosition:0},0).to({regY:0.1,scaleX:1.5654,scaleY:1.5654,y:1248.45},18,cjs.Ease.cubicIn).to({_off:true},1).wait(611));
	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(110).to({_off:false},0).to({_off:true,y:1000.45},12,cjs.Ease.cubicOut).wait(509));

	// Tag_2
	this.instance_14 = new lib.Tag2function();
	this.instance_14.setTransform(443.6,1086);
	this.instance_14._off = true;
	new cjs.ButtonHelper(this.instance_14, 0, 1, 2, false, new lib.Tag2function(), 3);

	this.FunctionBtn = new lib.Tag2function();
	this.FunctionBtn.name = "FunctionBtn";
	this.FunctionBtn.setTransform(443.6,1000.45);
	new cjs.ButtonHelper(this.FunctionBtn, 0, 1, 2, false, new lib.Tag2function(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_14}]},102).to({state:[{t:this.FunctionBtn}]},12).to({state:[{t:this.FunctionBtn}]},334).wait(183));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(102).to({_off:false},0).to({_off:true,y:1000.45},12,cjs.Ease.cubicOut).wait(517));

	// Tag_1
	this.StructureBtn = new lib.Tag1structure();
	this.StructureBtn.name = "StructureBtn";
	this.StructureBtn.setTransform(147.35,1129.7,1,1,0,0,0,-0.5,0);
	this.StructureBtn._off = true;
	new cjs.ButtonHelper(this.StructureBtn, 0, 1, 2, false, new lib.Tag1structure(), 3);

	this.timeline.addTween(cjs.Tween.get(this.StructureBtn).wait(98).to({_off:false},0).to({y:1000.45},12,cjs.Ease.cubicOut).wait(521));

	// Btn
	this.StartBtn = new lib.StartBtn();
	this.StartBtn.name = "StartBtn";
	this.StartBtn.setTransform(918.5,568);
	new cjs.ButtonHelper(this.StartBtn, 0, 1, 2, false, new lib.StartBtn(), 3);

	this.instance_15 = new lib.Textfloor("synched",0);
	this.instance_15.setTransform(2246.6,522.1);
	this.instance_15._off = true;

	this.UpBtn = new lib.Liftbtnup();
	this.UpBtn.name = "UpBtn";
	this.UpBtn.setTransform(476,392.5);
	this.UpBtn.alpha = 0;
	this.UpBtn._off = true;
	new cjs.ButtonHelper(this.UpBtn, 0, 1, 2, false, new lib.Liftbtnup(), 3);

	this.instance_16 = new lib.textend("synched",0);
	this.instance_16.setTransform(990.2,555.7);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.StartBtn).wait(1).to({regX:0.9,regY:0.2,scaleX:14.5822,scaleY:14.5822,x:1055.15,y:453.25,alpha:0},30,cjs.Ease.quartIn).to({_off:true},1).wait(599));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(163).to({_off:false},0).to({x:1546.4},25,cjs.Ease.cubicOut).to({_off:true},28).wait(415));
	this.timeline.addTween(cjs.Tween.get(this.UpBtn).wait(216).to({_off:false},0).to({alpha:1},31).wait(60).to({alpha:0},21).to({_off:true},1).wait(302));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(448).to({_off:false},0).to({alpha:1},23).wait(160));
	this.UpBtn.addEventListener("tick", AdobeAn.handleFilterCache);

	// Map
	this.instance_17 = new lib.Map("synched",0);
	this.instance_17.setTransform(960,540);

	this.LowBtn = new lib.LiftBtnlow();
	this.LowBtn.name = "LowBtn";
	this.LowBtn.setTransform(473,669.5);
	this.LowBtn.alpha = 0;
	this.LowBtn._off = true;
	new cjs.ButtonHelper(this.LowBtn, 0, 1, 2, false, new lib.LiftBtnlow(), 3);

	this.instance_18 = new lib.light("synched",0);
	this.instance_18.setTransform(998,492.5);
	this.instance_18._off = true;

	this.instance_19 = new lib.Naoshimaport_1("synched",0);
	this.instance_19.setTransform(2163.9,590.15);
	this.instance_19._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1).to({startPosition:0},0).to({regX:0.8,regY:0.8,scaleX:14.4155,scaleY:14.4155,x:1625.95,y:66.75,alpha:0},30,cjs.Ease.quartIn).to({_off:true},1).wait(599));
	this.timeline.addTween(cjs.Tween.get(this.LowBtn).wait(216).to({_off:false},0).to({alpha:1},31).wait(60).to({alpha:0},21).to({_off:true},1).wait(302));
	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(415).to({_off:false},0).wait(1).to({startPosition:0},0).to({alpha:0},31).to({_off:true},1).wait(183));
	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(448).to({_off:false},0).to({x:1462.2},23,cjs.Ease.cubicInOut).wait(160));
	this.LowBtn.addEventListener("tick", AdobeAn.handleFilterCache);

	// Building_1
	this.instance_20 = new lib.Floor7("synched",0);
	this.instance_20.setTransform(957.5,247.5);
	this.instance_20._off = true;
	var instance_20Filter_2 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_20.filters = [instance_20Filter_2];
	this.instance_20.cache(-239,-174,479,349);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(123).to({_off:false},0).to({scaleX:0.5568,scaleY:0.5846,x:941.55,y:259.75},15,cjs.Ease.cubicOut).wait(78).to({startPosition:0},0).to({x:66.3,y:259.85},31,cjs.Ease.cubicInOut).wait(50).to({startPosition:0},0).to({startPosition:0},10).to({x:951.75},21,cjs.Ease.cubicInOut).wait(24).to({startPosition:0},0).to({startPosition:0},14).to({startPosition:0},14).wait(35).to({startPosition:0},0).wait(33).to({startPosition:0},0).to({x:539.3},23,cjs.Ease.cubicInOut).wait(160));
	this.timeline.addTween(cjs.Tween.get(instance_20Filter_2).wait(123).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 15,cjs.Ease.cubicOut).wait(78).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 31,cjs.Ease.cubicInOut).wait(50).to(new cjs.ColorFilter(0.5,0.5,0.5,1,68.5,40.5,44.5,0), 10).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 21,cjs.Ease.cubicInOut).wait(24).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 14).wait(82).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(183));

	// Building_2
	this.instance_21 = new lib.Floor6();
	this.instance_21.setTransform(950.8,314.5,1,1,0,0,0,-3.7,0);
	this.instance_21._off = true;
	var instance_21Filter_3 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_21.filters = [instance_21Filter_3];
	this.instance_21.cache(-236,-174,473,349);
	new cjs.ButtonHelper(this.instance_21, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(139).to({_off:false},0).to({regX:0.1,scaleX:0.6331,scaleY:0.6105,x:924.75,y:325.25},14,cjs.Ease.cubicInOut).wait(63).to({x:49.5,y:325.35},31,cjs.Ease.cubicInOut).wait(60).to({x:934.95},21,cjs.Ease.cubicInOut).wait(120).to({x:522.5},23,cjs.Ease.cubicInOut).wait(160));
	this.timeline.addTween(cjs.Tween.get(instance_21Filter_3).wait(139).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 14,cjs.Ease.cubicInOut).wait(63).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 31,cjs.Ease.cubicInOut).wait(40).to(new cjs.ColorFilter(0.5,0.5,0.5,1,68.5,40.5,44.5,0), 10).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 10).wait(45).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 14).wait(82).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(183));

	// Building_3
	this.instance_22 = new lib.Floor5("synched",0);
	this.instance_22.setTransform(955.8,364.1,1,1,0,0,0,0,0.1);
	this.instance_22._off = true;
	var instance_22Filter_4 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_22.filters = [instance_22Filter_4];
	this.instance_22.cache(-238,-167,476,334);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(154).to({_off:false},0).to({scaleX:0.6308,scaleY:0.6385,x:925.05,y:374.3},14,cjs.Ease.cubicInOut).wait(48).to({startPosition:0},0).to({x:49.8,y:374.4},31,cjs.Ease.cubicInOut).wait(30).to({startPosition:0},0).to({startPosition:0},10).to({startPosition:0},10).wait(10).to({startPosition:0},0).to({x:935.25},21,cjs.Ease.cubicInOut).wait(24).to({startPosition:0},0).to({startPosition:0},14).to({startPosition:0},14).wait(35).to({startPosition:0},0).wait(33).to({startPosition:0},0).to({x:522.8},23,cjs.Ease.cubicInOut).wait(160));
	this.timeline.addTween(cjs.Tween.get(instance_22Filter_4).wait(154).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 14,cjs.Ease.cubicInOut).wait(48).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 31,cjs.Ease.cubicInOut).wait(30).to(new cjs.ColorFilter(0.5,0.5,0.5,1,68.5,40.5,44.5,0), 10).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 10).wait(10).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 21,cjs.Ease.cubicInOut).wait(24).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 14).wait(82).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(183));

	// Building_4
	this.instance_23 = new lib.Floor4("synched",0);
	this.instance_23.setTransform(956.5,443.9);
	this.instance_23._off = true;
	var instance_23Filter_5 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_23.filters = [instance_23Filter_5];
	this.instance_23.cache(-237,-239,475,478);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(169).to({_off:false},0).to({regY:0.1,scaleX:0.6427,scaleY:0.629,x:946.6,y:479.05},14,cjs.Ease.cubicInOut).wait(33).to({startPosition:0},0).to({x:71.35,y:479.15},31,cjs.Ease.cubicInOut).wait(20).to({startPosition:0},0).to({startPosition:0},10).to({startPosition:0},10).wait(20).to({startPosition:0},0).to({x:956.8},21,cjs.Ease.cubicInOut).wait(24).to({startPosition:0},0).to({startPosition:0},14).to({startPosition:0},14).wait(35).to({startPosition:0},0).wait(33).to({startPosition:0},0).to({x:544.35},23,cjs.Ease.cubicInOut).wait(160));
	this.timeline.addTween(cjs.Tween.get(instance_23Filter_5).wait(169).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 14,cjs.Ease.cubicInOut).wait(33).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 31,cjs.Ease.cubicInOut).wait(20).to(new cjs.ColorFilter(0.5,0.5,0.5,1,68.5,40.5,44.5,0), 10).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 10).wait(20).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 21,cjs.Ease.cubicInOut).wait(24).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 14).wait(82).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(183));

	// Building_5
	this.instance_24 = new lib.Floor3("synched",0);
	this.instance_24.setTransform(947.75,585.95,0.9743,0.7615);
	this.instance_24._off = true;
	var instance_24Filter_6 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_24.filters = [instance_24Filter_6];
	this.instance_24.cache(-236,-226,472,452);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(184).to({_off:false},0).to({scaleX:0.785,scaleY:0.6988,x:938.5,y:587},14,cjs.Ease.cubicInOut).wait(18).to({startPosition:0},0).to({x:63.25,y:587.1},31,cjs.Ease.cubicInOut).wait(10).to({startPosition:0},0).to({startPosition:0},10).to({startPosition:0},10).wait(30).to({startPosition:0},0).to({x:948.7},21,cjs.Ease.cubicInOut).wait(24).to({startPosition:0},0).to({startPosition:0},14).to({startPosition:0},14).wait(35).to({startPosition:0},0).wait(33).to({startPosition:0},0).to({x:536.25},23,cjs.Ease.cubicInOut).wait(160));
	this.timeline.addTween(cjs.Tween.get(instance_24Filter_6).wait(184).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 14,cjs.Ease.cubicInOut).wait(18).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 31,cjs.Ease.cubicInOut).wait(10).to(new cjs.ColorFilter(0.5,0.5,0.5,1,68.5,40.5,44.5,0), 10).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 10).wait(30).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 21,cjs.Ease.cubicInOut).wait(24).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 14).wait(82).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(183));

	// Building_6
	this.instance_25 = new lib.Floor2("synched",0);
	this.instance_25.setTransform(946.95,669.1,0.9869,1.0325);
	this.instance_25._off = true;
	var instance_25Filter_7 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_25.filters = [instance_25Filter_7];
	this.instance_25.cache(-232,-174,464,349);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(199).to({_off:false},0).to({scaleX:0.9218,scaleY:1.0027,x:910,y:681.95},14,cjs.Ease.cubicInOut).wait(3).to({startPosition:0},0).to({x:34.75,y:682.05},31,cjs.Ease.cubicInOut).to({startPosition:0},10).to({startPosition:0},10).wait(40).to({startPosition:0},0).to({x:920.2},21,cjs.Ease.cubicInOut).wait(24).to({startPosition:0},0).to({startPosition:0},14).to({startPosition:0},14).wait(35).to({startPosition:0},0).wait(33).to({startPosition:0},0).to({x:507.75},23,cjs.Ease.cubicInOut).wait(160));
	this.timeline.addTween(cjs.Tween.get(instance_25Filter_7).wait(199).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 14,cjs.Ease.cubicInOut).wait(3).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 31,cjs.Ease.cubicInOut).to(new cjs.ColorFilter(0.5,0.5,0.5,1,68.5,40.5,44.5,0), 10).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 10).wait(40).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 21,cjs.Ease.cubicInOut).wait(24).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 14).wait(82).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(183));

	// Building
	this.instance_26 = new lib.square("synched",0);
	this.instance_26.setTransform(956.5,509,0.0541,0.0541);
	this.instance_26.alpha = 0;

	this.instance_27 = new lib._2ai();
	this.instance_27.setTransform(730,270);

	this.instance_28 = new lib._3ai();
	this.instance_28.setTransform(726,245);

	this.instance_29 = new lib._5ai();
	this.instance_29.setTransform(718,220);

	this.instance_30 = new lib._7ai();
	this.instance_30.setTransform(720,209);

	this.instance_31 = new lib._8ai();
	this.instance_31.setTransform(711.25,195.05);

	this.instance_32 = new lib._11ai();
	this.instance_32.setTransform(719.25,184.45);

	this.instance_33 = new lib._12ai();
	this.instance_33.setTransform(720.9,161.35);

	this.instance_34 = new lib._13ai();
	this.instance_34.setTransform(741.65,176.75);

	this.instance_35 = new lib._15ai();
	this.instance_35.setTransform(738.3,165.8);

	this.instance_36 = new lib._16ai();
	this.instance_36.setTransform(747.75,168.8);

	this.instance_37 = new lib._17ai();
	this.instance_37.setTransform(750.2,169.3);

	this.instance_38 = new lib._18ai();
	this.instance_38.setTransform(763.5,167.75);

	this.instance_39 = new lib._19ai();
	this.instance_39.setTransform(770.9,170.35);

	this.instance_40 = new lib._20ai();
	this.instance_40.setTransform(759.2,172.8);

	this.instance_41 = new lib._21ai();
	this.instance_41.setTransform(751.8,170.3);

	this.instance_42 = new lib._22ai();
	this.instance_42.setTransform(748.5,184.7);

	this.instance_43 = new lib._23ai();
	this.instance_43.setTransform(748.1,158.95);

	this.instance_44 = new lib._24ai();
	this.instance_44.setTransform(740.25,137.95);

	this.instance_45 = new lib._25ai();
	this.instance_45.setTransform(720.45,75.1);

	this.instance_46 = new lib._7thfloorbottomai();
	this.instance_46.setTransform(720,142);

	this.instance_47 = new lib._6thfloorbottomai();
	this.instance_47.setTransform(720,199);

	this.instance_48 = new lib._4thfloorbottomai();
	this.instance_48.setTransform(721,409);

	this.instance_49 = new lib._3rdfloorbottomai();
	this.instance_49.setTransform(720,491);

	this.instance_50 = new lib._2ndfloorbottomai();
	this.instance_50.setTransform(720,587);

	this.instance_51 = new lib.Floor1("synched",0);
	this.instance_51.setTransform(945.5,754.5);
	this.instance_51._off = true;
	var instance_51Filter_8 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_51.filters = [instance_51Filter_8];
	this.instance_51.cache(-227,-169,455,339);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_26}]}).to({state:[{t:this.instance_26}]},22).to({state:[{t:this.instance_26}]},33).to({state:[{t:this.instance_27}]},20).to({state:[{t:this.instance_28}]},1).to({state:[{t:this.instance_29}]},1).to({state:[{t:this.instance_30}]},1).to({state:[{t:this.instance_31}]},1).to({state:[{t:this.instance_32}]},1).to({state:[{t:this.instance_33}]},1).to({state:[{t:this.instance_34}]},1).to({state:[{t:this.instance_35}]},1).to({state:[{t:this.instance_36}]},1).to({state:[{t:this.instance_37}]},1).to({state:[{t:this.instance_38}]},1).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_41}]},1).to({state:[{t:this.instance_42}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_44}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_46}]},30).to({state:[{t:this.instance_47}]},16).to({state:[{t:this.instance_47}]},15).to({state:[{t:this.instance_48}]},15).to({state:[{t:this.instance_49}]},15).to({state:[{t:this.instance_50}]},15).to({state:[{t:this.instance_51}]},17).to({state:[{t:this.instance_51}]},31).to({state:[{t:this.instance_51}]},10).to({state:[{t:this.instance_51}]},50).to({state:[{t:this.instance_51}]},21).to({state:[{t:this.instance_51}]},24).to({state:[{t:this.instance_51}]},14).to({state:[{t:this.instance_51}]},14).to({state:[{t:this.instance_51}]},35).to({state:[{t:this.instance_51}]},33).to({state:[{t:this.instance_51}]},23).wait(160));
	this.timeline.addTween(cjs.Tween.get(this.instance_26).to({alpha:1},22).to({scaleX:1,scaleY:1},33,cjs.Ease.cubicInOut).to({_off:true},20).wait(556));
	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(216).to({_off:false},0).to({x:70.25,y:754.6},31,cjs.Ease.cubicInOut).to({startPosition:0},10).wait(50).to({startPosition:0},0).to({x:955.7},21,cjs.Ease.cubicInOut).wait(24).to({startPosition:0},0).to({startPosition:0},14).to({startPosition:0},14).wait(35).to({startPosition:0},0).wait(33).to({startPosition:0},0).to({x:543.25},23,cjs.Ease.cubicInOut).wait(160));
	this.timeline.addTween(cjs.Tween.get(instance_51Filter_8).wait(216).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).to(new cjs.ColorFilter(0.5,0.5,0.5,1,68.5,40.5,44.5,0), 31,cjs.Ease.cubicInOut).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 10).wait(50).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 21,cjs.Ease.cubicInOut).wait(24).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 14).wait(82).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 0).wait(183));

	// Elevator
	this.instance_52 = new lib.textbegin("synched",0);
	this.instance_52.setTransform(970.25,848.15,0.1697,0.1697);
	this.instance_52.alpha = 0;
	this.instance_52._off = true;

	this.instance_53 = new lib.Lift("synched",0);
	this.instance_53.setTransform(847,884.5);
	this.instance_53.alpha = 0;
	this.instance_53._off = true;

	this.instance_54 = new lib.Venn2("synched",0);
	this.instance_54.setTransform(1442.9,546.8);
	this.instance_54.alpha = 0;
	this.instance_54._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(22).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1},33,cjs.Ease.cubicInOut).wait(20).to({startPosition:0},0).to({alpha:0},10).to({_off:true},1).wait(545));
	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(216).to({_off:false},0).to({alpha:1},31).wait(1).to({startPosition:0},0).to({y:808.5},9,cjs.Ease.quadInOut).wait(1).to({startPosition:0},0).to({y:704.6},9,cjs.Ease.quadInOut).wait(1).to({startPosition:0},0).to({y:609.75},9,cjs.Ease.quadInOut).wait(1).to({startPosition:0},0).to({y:511.85},9,cjs.Ease.quadInOut).wait(1).to({startPosition:0},0).to({y:394.4},9,cjs.Ease.quadInOut).wait(1).to({startPosition:0},0).to({y:268.55},9,cjs.Ease.quadInOut).to({alpha:0},21).to({_off:true},1).wait(302));
	this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(448).to({_off:false},0).to({alpha:0.5},23).wait(160));

	// Section
	this.instance_55 = new lib.Section("synched",0);
	this.instance_55.setTransform(880.1,540.55);
	this.instance_55.alpha = 0;
	this.instance_55._off = true;

	this.instance_56 = new lib.venn1("synched",0);
	this.instance_56.setTransform(530.15,546.8);
	this.instance_56.alpha = 0;
	this.instance_56._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(216).to({_off:false},0).to({alpha:1},31).wait(60).to({startPosition:0},0).to({alpha:0},21).to({_off:true},1).wait(302));
	this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(448).to({_off:false},0).to({alpha:0.5},23).wait(160));

	// Sky
	this.instance_57 = new lib.Sun("synched",0);
	this.instance_57.setTransform(916.4,1330.7,1,1,30.0243,0,0,-777.1,1023.4);
	this.instance_57._off = true;

	this.instance_58 = new lib.Moon("synched",0);
	this.instance_58.setTransform(933.55,1354.85,1,1,0,0,0,-1219.3,497.4);
	this.instance_58._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(332).to({_off:false},0).wait(1).to({regX:0,regY:0,rotation:21.417,x:2013.4899,y:661.7263},0).wait(1).to({rotation:14.1897,x:1920.6277,y:529.0155},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:8.0333,x:1828.8761,y:425.941},0).wait(1).to({rotation:2.7331,x:1741.4108,y:345.519},0).wait(1).to({scaleX:1,scaleY:1,rotation:-1.8679,x:1659.7349,y:282.5135},0).wait(1).to({rotation:-5.889,x:1584.4129,y:232.969},0).wait(1).to({rotation:-9.4234,x:1515.478,y:193.8756},0).wait(1).to({rotation:-12.5462,x:1452.6652,y:162.9284},0).wait(1).to({rotation:-15.3193,x:1395.5477,y:138.3522},0).wait(1).to({rotation:-17.7943,x:1343.616,y:118.7737},0).wait(1).to({rotation:-20.0157,x:1296.3255,y:103.1261},0).wait(1).to({rotation:-22.0219,x:1253.1223,y:90.5789},0).wait(1).to({rotation:-23.8471,x:1213.4582,y:80.4844},0).wait(1).to({rotation:-25.5218,x:1176.7979,y:72.3378},0).wait(1).to({rotation:-27.074,x:1142.6209,y:65.747},0).wait(1).to({rotation:-28.5294,x:1110.4214,y:60.41},0).wait(1).to({rotation:-29.9126,x:1079.706,y:56.0978},0).wait(1).to({rotation:-31.2467,x:1049.9899,y:52.6421},0).wait(1).to({rotation:-32.5543,x:1020.7931,y:49.9274},0).wait(1).to({rotation:-33.8577,x:991.6353,y:47.8851},0).wait(1).to({rotation:-35.1793,x:962.0311,y:46.4922},0).wait(1).to({rotation:-36.5419,x:931.4838,y:45.7714},0).wait(1).to({rotation:-37.9691,x:899.48,y:45.7955},0).wait(1).to({rotation:-39.4857,x:865.4834,y:46.6948},0).wait(1).to({rotation:-41.1182,x:828.9278,y:48.6681},0).wait(1).to({rotation:-42.8956,x:789.2112,y:51.9996},0).wait(1).to({rotation:-44.8496,x:745.6887,y:57.0822},0).wait(1).to({rotation:-47.0162,x:697.6678,y:64.4486},0).wait(1).to({rotation:-49.4361,x:644.4041,y:74.8161},0).wait(1).to({rotation:-52.1569,x:585.1028,y:89.1464},0).wait(1).to({rotation:-55.2347,x:518.9261,y:108.7296},0).wait(1).to({rotation:-58.7376,x:445.017,y:135.3024},0).wait(1).to({rotation:-62.7495,x:362.5489,y:171.217},0).wait(1).to({rotation:-67.3769,x:270.8252,y:219.6856},0).wait(1).to({rotation:-72.759,x:169.4752,y:285.1464},0).wait(1).to({rotation:-79.085,x:58.8375,y:373.8231},0).wait(1).to({rotation:-86.6236,x:-59.2651,y:494.6153},0).wait(1).to({regX:-777.1,regY:1023.4,rotation:-95.782,x:916.65,y:1330.55},0).to({_off:true},3).wait(258));
	this.timeline.addTween(cjs.Tween.get(this.instance_58).wait(373).to({_off:false},0).to({rotation:-95.5252},31,cjs.Ease.quartOut).wait(12).to({startPosition:0},0).to({regX:-1219.4,rotation:-122.504,y:1354.95,alpha:0},22,cjs.Ease.cubicIn).to({_off:true},10).wait(183));

	// BG
	this.instance_59 = new lib.Timechange("synched",0);
	this.instance_59.setTransform(993.85,560.15);
	this.instance_59.alpha = 0;
	this.instance_59._off = true;
	var instance_59Filter_9 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.instance_59.filters = [instance_59Filter_9];
	this.instance_59.cache(-996,-580,1992,1160);

	this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(352).to({_off:false},0).to({x:981.85,y:554.05,alpha:1},14).to({startPosition:0},14).wait(36).to({startPosition:0},0).to({alpha:0},31).to({_off:true},1).wait(183));
	this.timeline.addTween(cjs.Tween.get(instance_59Filter_9).wait(352).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 14).to(new cjs.ColorFilter(0,0,0,1,55,67,117,0), 14).wait(36).to(new cjs.ColorFilter(1,1,1,1,0,0,0,0), 31).wait(183));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance_10, startFrame:373, endFrame:373, x:-874, y:-262, w:1749, h:524});
	this.filterCacheList.push({instance: this.instance_10, startFrame:415, endFrame:415, x:-874, y:-262, w:1749, h:524});
	this.filterCacheList.push({instance: this.instance_20, startFrame:123, endFrame:123, x:-239, y:-174, w:479, h:349});
	this.filterCacheList.push({instance: this.instance_20, startFrame:124, endFrame:138, x:-239, y:-174, w:479, h:349});
	this.filterCacheList.push({instance: this.instance_20, startFrame:216, endFrame:216, x:-239, y:-174, w:479, h:349});
	this.filterCacheList.push({instance: this.instance_20, startFrame:217, endFrame:247, x:-239, y:-174, w:479, h:349});
	this.filterCacheList.push({instance: this.instance_20, startFrame:297, endFrame:297, x:-239, y:-174, w:479, h:349});
	this.filterCacheList.push({instance: this.instance_20, startFrame:298, endFrame:307, x:-239, y:-174, w:479, h:349});
	this.filterCacheList.push({instance: this.instance_20, startFrame:308, endFrame:328, x:-239, y:-174, w:479, h:349});
	this.filterCacheList.push({instance: this.instance_20, startFrame:352, endFrame:352, x:-239, y:-174, w:479, h:349});
	this.filterCacheList.push({instance: this.instance_20, startFrame:353, endFrame:366, x:-239, y:-174, w:479, h:349});
	this.filterCacheList.push({instance: this.instance_20, startFrame:415, endFrame:415, x:-239, y:-174, w:479, h:349});
	this.filterCacheList.push({instance: this.instance_20, startFrame:448, endFrame:448, x:-239, y:-174, w:479, h:349});
	this.filterCacheList.push({instance: this.instance_21, startFrame:139, endFrame:139, x:-236, y:-174, w:473, h:349});
	this.filterCacheList.push({instance: this.instance_21, startFrame:140, endFrame:153, x:-236, y:-174, w:473, h:349});
	this.filterCacheList.push({instance: this.instance_21, startFrame:216, endFrame:216, x:-236, y:-174, w:473, h:349});
	this.filterCacheList.push({instance: this.instance_21, startFrame:217, endFrame:247, x:-236, y:-174, w:473, h:349});
	this.filterCacheList.push({instance: this.instance_21, startFrame:287, endFrame:287, x:-236, y:-174, w:473, h:349});
	this.filterCacheList.push({instance: this.instance_21, startFrame:288, endFrame:297, x:-236, y:-174, w:473, h:349});
	this.filterCacheList.push({instance: this.instance_21, startFrame:298, endFrame:307, x:-236, y:-174, w:473, h:349});
	this.filterCacheList.push({instance: this.instance_21, startFrame:352, endFrame:352, x:-236, y:-174, w:473, h:349});
	this.filterCacheList.push({instance: this.instance_21, startFrame:353, endFrame:366, x:-236, y:-174, w:473, h:349});
	this.filterCacheList.push({instance: this.instance_21, startFrame:415, endFrame:415, x:-236, y:-174, w:473, h:349});
	this.filterCacheList.push({instance: this.instance_21, startFrame:448, endFrame:448, x:-236, y:-174, w:473, h:349});
	this.filterCacheList.push({instance: this.instance_22, startFrame:154, endFrame:154, x:-238, y:-167, w:476, h:334});
	this.filterCacheList.push({instance: this.instance_22, startFrame:155, endFrame:168, x:-238, y:-167, w:476, h:334});
	this.filterCacheList.push({instance: this.instance_22, startFrame:216, endFrame:216, x:-238, y:-167, w:476, h:334});
	this.filterCacheList.push({instance: this.instance_22, startFrame:217, endFrame:247, x:-238, y:-167, w:476, h:334});
	this.filterCacheList.push({instance: this.instance_22, startFrame:277, endFrame:277, x:-238, y:-167, w:476, h:334});
	this.filterCacheList.push({instance: this.instance_22, startFrame:278, endFrame:287, x:-238, y:-167, w:476, h:334});
	this.filterCacheList.push({instance: this.instance_22, startFrame:288, endFrame:297, x:-238, y:-167, w:476, h:334});
	this.filterCacheList.push({instance: this.instance_22, startFrame:307, endFrame:307, x:-238, y:-167, w:476, h:334});
	this.filterCacheList.push({instance: this.instance_22, startFrame:308, endFrame:328, x:-238, y:-167, w:476, h:334});
	this.filterCacheList.push({instance: this.instance_22, startFrame:352, endFrame:352, x:-238, y:-167, w:476, h:334});
	this.filterCacheList.push({instance: this.instance_22, startFrame:353, endFrame:366, x:-238, y:-167, w:476, h:334});
	this.filterCacheList.push({instance: this.instance_22, startFrame:415, endFrame:415, x:-238, y:-167, w:476, h:334});
	this.filterCacheList.push({instance: this.instance_22, startFrame:448, endFrame:448, x:-238, y:-167, w:476, h:334});
	this.filterCacheList.push({instance: this.instance_23, startFrame:169, endFrame:169, x:-237, y:-239, w:475, h:478});
	this.filterCacheList.push({instance: this.instance_23, startFrame:170, endFrame:183, x:-237, y:-239, w:475, h:478});
	this.filterCacheList.push({instance: this.instance_23, startFrame:216, endFrame:216, x:-237, y:-239, w:475, h:478});
	this.filterCacheList.push({instance: this.instance_23, startFrame:217, endFrame:247, x:-237, y:-239, w:475, h:478});
	this.filterCacheList.push({instance: this.instance_23, startFrame:267, endFrame:267, x:-237, y:-239, w:475, h:478});
	this.filterCacheList.push({instance: this.instance_23, startFrame:268, endFrame:277, x:-237, y:-239, w:475, h:478});
	this.filterCacheList.push({instance: this.instance_23, startFrame:278, endFrame:287, x:-237, y:-239, w:475, h:478});
	this.filterCacheList.push({instance: this.instance_23, startFrame:307, endFrame:307, x:-237, y:-239, w:475, h:478});
	this.filterCacheList.push({instance: this.instance_23, startFrame:308, endFrame:328, x:-237, y:-239, w:475, h:478});
	this.filterCacheList.push({instance: this.instance_23, startFrame:352, endFrame:352, x:-237, y:-239, w:475, h:478});
	this.filterCacheList.push({instance: this.instance_23, startFrame:353, endFrame:366, x:-237, y:-239, w:475, h:478});
	this.filterCacheList.push({instance: this.instance_23, startFrame:415, endFrame:415, x:-237, y:-239, w:475, h:478});
	this.filterCacheList.push({instance: this.instance_23, startFrame:448, endFrame:448, x:-237, y:-239, w:475, h:478});
	this.filterCacheList.push({instance: this.instance_24, startFrame:184, endFrame:184, x:-236, y:-226, w:472, h:452});
	this.filterCacheList.push({instance: this.instance_24, startFrame:185, endFrame:198, x:-236, y:-226, w:472, h:452});
	this.filterCacheList.push({instance: this.instance_24, startFrame:216, endFrame:216, x:-236, y:-226, w:472, h:452});
	this.filterCacheList.push({instance: this.instance_24, startFrame:217, endFrame:247, x:-236, y:-226, w:472, h:452});
	this.filterCacheList.push({instance: this.instance_24, startFrame:257, endFrame:257, x:-236, y:-226, w:472, h:452});
	this.filterCacheList.push({instance: this.instance_24, startFrame:258, endFrame:267, x:-236, y:-226, w:472, h:452});
	this.filterCacheList.push({instance: this.instance_24, startFrame:268, endFrame:277, x:-236, y:-226, w:472, h:452});
	this.filterCacheList.push({instance: this.instance_24, startFrame:307, endFrame:307, x:-236, y:-226, w:472, h:452});
	this.filterCacheList.push({instance: this.instance_24, startFrame:308, endFrame:328, x:-236, y:-226, w:472, h:452});
	this.filterCacheList.push({instance: this.instance_24, startFrame:352, endFrame:352, x:-236, y:-226, w:472, h:452});
	this.filterCacheList.push({instance: this.instance_24, startFrame:353, endFrame:366, x:-236, y:-226, w:472, h:452});
	this.filterCacheList.push({instance: this.instance_24, startFrame:415, endFrame:415, x:-236, y:-226, w:472, h:452});
	this.filterCacheList.push({instance: this.instance_24, startFrame:448, endFrame:448, x:-236, y:-226, w:472, h:452});
	this.filterCacheList.push({instance: this.instance_25, startFrame:199, endFrame:199, x:-232, y:-174, w:464, h:349});
	this.filterCacheList.push({instance: this.instance_25, startFrame:200, endFrame:213, x:-232, y:-174, w:464, h:349});
	this.filterCacheList.push({instance: this.instance_25, startFrame:216, endFrame:216, x:-232, y:-174, w:464, h:349});
	this.filterCacheList.push({instance: this.instance_25, startFrame:217, endFrame:247, x:-232, y:-174, w:464, h:349});
	this.filterCacheList.push({instance: this.instance_25, startFrame:248, endFrame:257, x:-232, y:-174, w:464, h:349});
	this.filterCacheList.push({instance: this.instance_25, startFrame:258, endFrame:267, x:-232, y:-174, w:464, h:349});
	this.filterCacheList.push({instance: this.instance_25, startFrame:307, endFrame:307, x:-232, y:-174, w:464, h:349});
	this.filterCacheList.push({instance: this.instance_25, startFrame:308, endFrame:328, x:-232, y:-174, w:464, h:349});
	this.filterCacheList.push({instance: this.instance_25, startFrame:352, endFrame:352, x:-232, y:-174, w:464, h:349});
	this.filterCacheList.push({instance: this.instance_25, startFrame:353, endFrame:366, x:-232, y:-174, w:464, h:349});
	this.filterCacheList.push({instance: this.instance_25, startFrame:415, endFrame:415, x:-232, y:-174, w:464, h:349});
	this.filterCacheList.push({instance: this.instance_25, startFrame:448, endFrame:448, x:-232, y:-174, w:464, h:349});
	this.filterCacheList.push({instance: this.instance_51, startFrame:216, endFrame:216, x:-227, y:-169, w:455, h:339});
	this.filterCacheList.push({instance: this.instance_51, startFrame:217, endFrame:247, x:-227, y:-169, w:455, h:339});
	this.filterCacheList.push({instance: this.instance_51, startFrame:248, endFrame:257, x:-227, y:-169, w:455, h:339});
	this.filterCacheList.push({instance: this.instance_51, startFrame:307, endFrame:307, x:-227, y:-169, w:455, h:339});
	this.filterCacheList.push({instance: this.instance_51, startFrame:308, endFrame:328, x:-227, y:-169, w:455, h:339});
	this.filterCacheList.push({instance: this.instance_51, startFrame:352, endFrame:352, x:-227, y:-169, w:455, h:339});
	this.filterCacheList.push({instance: this.instance_51, startFrame:353, endFrame:366, x:-227, y:-169, w:455, h:339});
	this.filterCacheList.push({instance: this.instance_51, startFrame:415, endFrame:415, x:-227, y:-169, w:455, h:339});
	this.filterCacheList.push({instance: this.instance_51, startFrame:448, endFrame:448, x:-227, y:-169, w:455, h:339});
	this.filterCacheList.push({instance: this.instance_59, startFrame:352, endFrame:352, x:-996, y:-580, w:1992, h:1160});
	this.filterCacheList.push({instance: this.instance_59, startFrame:353, endFrame:366, x:-996, y:-580, w:1992, h:1160});
	this.filterCacheList.push({instance: this.instance_59, startFrame:367, endFrame:380, x:-996, y:-580, w:1992, h:1160});
	this.filterCacheList.push({instance: this.instance_59, startFrame:417, endFrame:447, x:-996, y:-580, w:1992, h:1160});
	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-11264.4,-7189.1,26717.699999999997,15028.7);
// library properties:
lib.properties = {
	id: 'B31A11E9799D8E4FBC974373AD15D6C5',
	width: 1920,
	height: 1080,
	fps: 30,
	color: "#B8D9F1",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_34.png", id:"CachedBmp_34"},
		{src:"images/CachedBmp_32.png", id:"CachedBmp_32"},
		{src:"images/CachedBmp_8.png", id:"CachedBmp_8"},
		{src:"images/Pngtreeupstairsofficestickman_46796431.png", id:"Pngtreeupstairsofficestickman_46796431"},
		{src:"images/BENV group project_HTML5 text_atlas_1.png", id:"BENV group project_HTML5 text_atlas_1"},
		{src:"images/BENV group project_HTML5 text_atlas_2.png", id:"BENV group project_HTML5 text_atlas_2"},
		{src:"images/BENV group project_HTML5 text_atlas_3.png", id:"BENV group project_HTML5 text_atlas_3"},
		{src:"images/BENV group project_HTML5 text_atlas_4.png", id:"BENV group project_HTML5 text_atlas_4"},
		{src:"images/BENV group project_HTML5 text_atlas_5.png", id:"BENV group project_HTML5 text_atlas_5"},
		{src:"images/BENV group project_HTML5 text_atlas_6.png", id:"BENV group project_HTML5 text_atlas_6"},
		{src:"images/BENV group project_HTML5 text_atlas_7.png", id:"BENV group project_HTML5 text_atlas_7"},
		{src:"images/BENV group project_HTML5 text_atlas_8.png", id:"BENV group project_HTML5 text_atlas_8"},
		{src:"images/BENV group project_HTML5 text_atlas_9.png", id:"BENV group project_HTML5 text_atlas_9"},
		{src:"sounds/elevatordingatarencotowerdubai38520wav.mp3", id:"elevatordingatarencotowerdubai38520wav"},
		{src:"sounds/metalobjectslidingonwoodsurface31393wav.mp3", id:"metalobjectslidingonwoodsurface31393wav"},
		{src:"sounds/pageturn102978wav.mp3", id:"pageturn102978wav"},
		{src:"sounds/pop91931wav.mp3", id:"pop91931wav"},
		{src:"sounds/spotlight91359wav.mp3", id:"spotlight91359wav"},
		{src:"sounds/windblowingsfx12809wav.mp3", id:"windblowingsfx12809wav"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['B31A11E9799D8E4FBC974373AD15D6C5'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;