(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"Animation_HTML5 Canvas copy_atlas_1", frames: [[0,0,400,300],[402,0,400,300]]}
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



(lib.Background = function() {
	this.initialize(ss["Animation_HTML5 Canvas copy_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.BlurredBG = function() {
	this.initialize(ss["Animation_HTML5 Canvas copy_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Square = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#E35963").ss(20,0,0,3).p("AmGmGIMNAAIAAMNIsNAAg");
	this.shape.setTransform(0.025,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.1,-49.1,98.30000000000001,98.30000000000001);


(lib.Redring = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EF7476").s().p("AgcA9QgCgCAAgDQgBgEAEgGQADgGAFgEIAHgHIAPgRQASgUARgKQAHgEAEAAQAIABAAAGQAAAEgIAEQgSAJgaAfIgFAHIgIAFIgJAMQgEAGgDAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQgBAAAAgBgAg6A5QgEgCADgIQADgGALgOQAZgfARgRQAYgZAagOIAGgCQAFAAACACQADAEgDAFIgHAGQgTAMgQAOQgMAKgHAJIgzA5IgDABIgDgBgAASA4QgGgCACgGQAAgCAFgFQASgQAMgFQAGgDADADQADADgCAFQgBADgFAEQgJAIgOAKQgFAEgEAAIgDgBg");
	this.shape.setTransform(-34.2248,-30.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#D8666C").ss(20,0,0,3).p("AGcAAQAACrh5B4Qh4B5irAAQiqAAh4h5Qh5h4AAirQAAiqB5h4QB4h5CqAAQCrAAB4B5QB5B4AACqg");

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EF7476").s().p("AgfBWIgBAAIgBAAIgBAAIAAgBIgBAAIgBgBIgBgBIAAgBIAAAAIgBgBIAAgBIAAgBQACgQALgNIAJgMQAJgLAKgLIAVgTIAVgUIAMgKIAIgFIABgBIABAAIABgBIAAAAIABgBIABAAIABgBIABAAIABAAIACAAIABAAIABAAIABABIAAAAIABAAIABABIABAAIAAABIABAAIABABIAAABIABACIABACIAAACIAAACIAAACIgBABIgBACIAAABIgCABIgBACIgBABIgBABIgCABIgBAAIgBACIgCABIgCAAIgBABIgDAAIgBgBIgUAQIgTAQIgQAPIgPATIgOARIgCAEIgBACIgBACIAAADIgBACIgBABIgBABIAAAAIgBABIgBAAIAAABIgBAAIgBAAIgBAAgAgyBIIgBAAIgBAAIgBAAIgBgBIgBAAIAAgBIgBAAIgBgBIAAAAIgBgBIAAgBIAAgBIgBgBIAAgBQACgQAHgOIAGgKIgKAMQgHAIgEAKIgBACIAAACIgBACIAAACIgBADIAAAAIAAABIgBABIAAABIgBABIgBAAIgBABIAAAAIgBABIgBAAIgBAAIgBAAIgBAAIgBAAIgBgBIgBAAIgBgBIAAAAIgBgBIgBgBIAAAAIgBgBIAAgBIAAgCIAAgBIAAgBQACgPAIgNIAPgUIATgWQAJgLALgKIAWgTIAYgQIAYgPQAHgEAIgBIAFAAQAJAFgDALQgDALgLAAIgDAAIgBAAQABADgBADQgBAEgDACIgEADIgBAAIAAAAIgBABIgBAAQgLAGgLAIQgIAEgGAHIgQASIgQATQgHAKgGALIgFALIgBADIgBADIgBAEIgBACIAAACIAAABIgBABIAAAAIgBABIAAABIgBAAIgBABIgBAAIAAAAIgBABIgBAAg");
	this.shape_2.setTransform(-37.5875,-26.7833);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-51.1,-51.1,102.30000000000001,102.30000000000001);


(lib.puz_btn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("Clickwav");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCC33").s().p("AgqC4QgLgVgIgTQgLgYgJgHQgIgGgKgBQgKgCgJAFQgEADgMAOQgKALgJACQgKACgJgJQgIgIgBgLQgCgPAMgaQAbACAMgEQAJgDAHgIQAGgIAAgJQgBgJgHgKIgPgPQgPgPgHgVQAUgMAXgFIAagGQAOgFAGgJQAEgFAFgMIALgNQAGgIgBgHQgCgHgKgGIgQgKQgJgIABgOQABgMAIgNQAFgIAEgCQAFgDAJAAQAQgBAIACQAPAFADALQACAHgDAMQgEAOABAGQABAKAKAHQAJAGAMgBQAQgBAYgRQAIgFAEABQAEABADAFIADAJQADAHgBAEQAAADgHAHQgXAUgHAhQgIAgAMAcQAOAiAeALQAQAGARgEQARgEAKgMQALASAKAYQACAHAAADQgBAGgIAFQgLAIgNgBQgGgBgJgDIgOgFQgQgEgcAAQgYABgOAHQgbARgCA2IgfANQgFADgEAAQgGgBgGgKg");
	this.shape.setTransform(-0.6542,-0.7643);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF9933").s().p("Ag3EBQgKgDgLgSIgnhBQgSAQgZABQgaABgTgNQgUgNgKgXQgKgWABgYQADgvAnglQgNgSgFgNQgHgTAFgQQAIgZAigNIAcgJQARgGAKgFQgOgcACgeQACgbAPgVQANgUATgJQAQgHAUgBQAWgBATAGQAUAHANAOQANAPAFASQAhgTASAHQAQAHANAeIAXA2QAJAUgBAMQgBAIgFAHQgFAIgIABIgKAAQgHgBgEABQgRAFACAfQAAAOAHAEQAFADAGgDQAGgCAEgGIAGgKQAEgGADgDQAHgGALABQAKAAAIAHQAJAGANAaIAkBKQAMAZgDANQgFASgYALQgbAIgMAIIgTAMQgMAHgKgCQgFgBgGgEIgLgIQgVgPgbAHQgEAEAEAHIAHALQAIAKgBAMQAAANgIAHQgGAFgKACIgRACQgcADgWAPIgUANQgHADgHAAIgHgBgAhqBiQAKABAIAGQAJAHALAYQAIATALAVQAGAKAGABQAEAAAFgDIAfgNQACg2AbgRQAOgHAYgBQAcAAAQAEIAOAFQAJADAGABQANABALgIQAIgFABgGQAAgDgCgHQgKgYgLgSQgKAMgRAEQgRAEgQgGQgegLgOgiQgMgcAIggQAHghAXgUQAHgHAAgDQABgEgDgHIgDgJQgDgFgEgBQgEgBgIAFQgYARgQABQgMABgIgGQgLgHgBgKQgBgGAEgOQADgMgCgHQgDgLgPgFQgIgCgQABQgJAAgFADQgEACgFAIQgIANgBAMQgBAOAJAIIAQAKQAKAGACAHQABAHgGAIIgLANQgFAMgEAFQgGAJgOAFIgaAGQgXAFgUAMQAHAVAPAPIAPAPQAHAKABAJQAAAJgGAIQgHAIgJADQgMAEgbgCQgMAaACAPQABALAIAIQAJAJAKgCQAJgCAKgLQAMgOAEgDQAHgEAIAAIAEABg");
	this.shape_1.setTransform(0.0015,0.0208);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF33").s().p("AgqC4QgLgVgIgTQgLgYgJgHQgIgGgKgBQgKgCgJAFQgEADgMAOQgKALgJACQgKACgJgJQgIgIgBgLQgCgPAMgaQAbACAMgEQAJgDAHgIQAGgIAAgJQgBgJgHgKIgPgPQgPgPgHgVQAUgMAXgFIAagGQAOgFAGgJQAEgFAFgMIALgNQAGgIgBgHQgCgHgKgGIgQgKQgJgIABgOQABgMAIgNQAFgIAEgCQAFgDAJAAQAQgBAIACQAPAFADALQACAHgDAMQgEAOABAGQABAKAKAHQAJAGAMgBQAQgBAYgRQAIgFAEABQAEABADAFIADAJQADAHgBAEQAAADgHAHQgXAUgHAhQgIAgAMAcQAOAiAeALQAQAGARgEQARgEAKgMQALASAKAYQACAHAAADQgBAGgIAFQgLAIgNgBQgGgBgJgDIgOgFQgQgEgcAAQgYABgOAHQgbARgCA2IgfANQgFADgEAAQgGgBgGgKg");
	this.shape_2.setTransform(-0.6542,-0.7643);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFCC33").s().p("Ag3EBQgKgDgLgSIgnhBQgSAQgZABQgaABgTgNQgUgNgKgXQgKgWABgYQADgvAnglQgNgSgFgNQgHgTAFgQQAIgZAigNIAcgJQARgGAKgFQgOgcACgeQACgbAPgVQANgUATgJQAQgHAUgBQAWgBATAGQAUAHANAOQANAPAFASQAhgTASAHQAQAHANAeIAXA2QAJAUgBAMQgBAIgFAHQgFAIgIABIgKAAQgHgBgEABQgRAFACAfQAAAOAHAEQAFADAGgDQAGgCAEgGIAGgKQAEgGADgDQAHgGALABQAKAAAIAHQAJAGANAaIAkBKQAMAZgDANQgFASgYALQgbAIgMAIIgTAMQgMAHgKgCQgFgBgGgEIgLgIQgVgPgbAHQgEAEAEAHIAHALQAIAKgBAMQAAANgIAHQgGAFgKACIgRACQgcADgWAPIgUANQgHADgHAAIgHgBgAhqBiQAKABAIAGQAJAHALAYQAIATALAVQAGAKAGABQAEAAAFgDIAfgNQACg2AbgRQAOgHAYgBQAcAAAQAEIAOAFQAJADAGABQANABALgIQAIgFABgGQAAgDgCgHQgKgYgLgSQgKAMgRAEQgRAEgQgGQgegLgOgiQgMgcAIggQAHghAXgUQAHgHAAgDQABgEgDgHIgDgJQgDgFgEgBQgEgBgIAFQgYARgQABQgMABgIgGQgLgHgBgKQgBgGAEgOQADgMgCgHQgDgLgPgFQgIgCgQABQgJAAgFADQgEACgFAIQgIANgBAMQgBAOAJAIIAQAKQAKAGACAHQABAHgGAIIgLANQgFAMgEAFQgGAJgOAFIgaAGQgXAFgUAMQAHAVAPAPIAPAPQAHAKABAJQAAAJgGAIQgHAIgJADQgMAEgbgCQgMAaACAPQABALAIAIQAJAJAKgCQAJgCAKgLQAMgOAEgDQAHgEAIAAIAEABg");
	this.shape_3.setTransform(0.0015,0.0208);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFCC33").s().p("AnLEuQgKgGgFgLQgIgQAHgQQAFgMATgPIAnghIAUgPQAMgHALgBQAQAAANAMQANAMAAAQQgBAUgSASQgKAKgXAQIgbAWQgQALgOABIgCAAQgLAAgKgGgAGMDKQgKgGgPgLIgYgSIgWgNQgNgIgGgJQgNgTAHgUQAHgWAWgEQAQgDATALQAMAGAUAQQAUARALAGIARAJQAJAFAFAFQAMANgCASQgBATgOAJQgLAIgOAAQgOAAgSgJgAn0A7QgIgFgFgJQgFgJAAgLQABgVASgMQALgIAbgEIA7gKIAXgCQAMAAAJAFQAJAEAGAJQAGAJABAJQABAVgSANQgLAJgZAEIg7ALQgPADgLAAQgQAAgKgGgAFFAAQgQAAgKgHQgKgHgEgMQgEgMAEgMQAHgVAagIQAMgEAhgBIBdAAQAoAAAOAPQALAMgCASQgDARgNAKQgPALglgBQhBgCghADIgYABIgEAAgAltheQgRgHgbgPIgZgNQgSgKgKgIQgOgNgCgOQgCgOAIgMQAJgNANgDQAQgDAVAJQAMAFAXANQAWAOANAFIAWAHQANAEAIAGQAMAIAEAOQAFAPgGAMQgEAKgLAGQgKAGgMABIgCAAQgSAAgXgKgADWiYQgMgNACgQQACgVAfgWQBGg2AtgVQAVgJAOABQAMACAJAJQAJAJACAMQACAMgEAMQgFAMgJAIQgHAGgMAGIgVAIQghAOgbAXIgbAXQgRALgPABIgCAAQgQAAgMgNg");
	this.shape_4.setTransform(2.7231,2.4666);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1,p:{scaleX:1,scaleY:1,x:0.0015,y:0.0208}},{t:this.shape,p:{scaleX:1,scaleY:1,x:-0.6542,y:-0.7643}}]}).to({state:[{t:this.shape_1,p:{scaleX:1.2907,scaleY:1.2907,x:0.009,y:0.058}},{t:this.shape,p:{scaleX:1.2907,scaleY:1.2907,x:-0.8373,y:-0.9553}}]},1).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_1,p:{scaleX:1,scaleY:1,x:0.0015,y:0.0208}},{t:this.shape,p:{scaleX:1,scaleY:1,x:-0.6542,y:-0.7643}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.2,-33.2,103.9,66.6);


(lib.Circle = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#D8666C").s().p("AApBAIgBAAIgBAAIgBgBIgBAAIgBgBIgBgBIAAgBIgBgBIAAgBIAAgBIAAgBIAAgCIAAgBIABgBIAAgBIABgBIACgCIACgCIADgDIACgCIABgCIABgBIAAgBIAAgBIAAgBIAAgCIABgBIABgBIAAgBIABgBIABgBIABgBIABgBIACAAIABgBIABAAIACAAIABAAIABAAIACABIABAAIABABIABABIABAAIABABIABACIAAABIABABIAAABIAAACIAAABIAAACIAAABIAAABIgBABIAAABIgBABIAAABIgBABIgBABIgBABIgBABIgBAAIgCABIgBABIgDADIgEADIgDACIgCABIgBABIgBABIgBABIgBAAIgBABIgCAAgAg8A/IgCAAIgBAAIgCgBIgBgBIgBgBIgBgBIgBgBIAAgBIAAgCIAAgBIAAgCIAAgBIAPgWIAMgQIAMgOIAOgRIANgNIACgEIABgDIACgCIACgDIADgCIABgCIABgBIABgCIABgBIABgBIABgBIABgBIABgBIAAgBIABgCIABgBIABgBIACgBIABgBIACAAIABAAIACgBIABABIABAAIACAAIABABIABAAIABABIACABIABABIAAABIABABIABABIAAABIABACIAAABIAAABIAAABIAAACIAAABIgBACIgBACIgBABIgBABIgBABIgBABIgBABIgBABIgCABIgBABIgBACIgBABIgSASIgNAPIgQASIgPAQIgOAUIgEAFIgBABIgBAAIgBABIgCAAIgBAAgAgDA4IgBAAIgCgBIgCAAIgBgBIgBgBIgCgBIgBgBIAAgCIgBgBIAAgCIAAgCIAAgCIAAgBIAAgCIAAgBIABgCIABgBIABgBIABgCIABgBIABgBIABgBIACgCIABgBIACgDIACgDIACgDIADgDIADgDIABgBIACgCIABgBIABgCIABgBIABgBIACgCIABgBIACgCIACgDIADgDIADgDIABgCIABgCIABgBIABgBIABgBIACgBIABgBIABgBIACgBIABAAIACgBIACAAIACAAIACABIACABIACABIABABIABABIABACIABABIAAACIABACIAAABIAAABIAAABIgBACIAAACIgBABIgBACIgBABIgBAAIgCABIgBABIgBABIgCACIgBABIgCABIgBACIgBABIgFAGIgGAHIgFAGIgFAEIgFAEIgBACIgBABIgBACIgBACIgCABIgBABIgBACIAAABIgBACIgBABIgBABIgBABIgCABIgBAAIgBABIgCAAg");
	this.shape.setTransform(-26.825,-21.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EF7476").s().p("AkiEjQh4h4AAirQAAiqB4h4QB4h4CqAAQCrAAB4B4QB4B4AACqQAACrh4B4Qh4B4irAAQiqAAh4h4gAjUjAIgCABIgBAAIgBABIgBABIgBACIgBABIgBABIAAABIAAABIAAACIAAABIAAAAIgBACIgBACIgDACIgCACIgCADIgCACIgBABIAAAAIgBACIAAABIgBABIAAACIAAABIABABIABABIAAABIABAAIABABIABABIABAAIABAAIABAAIABAAIACAAIABgBIABgBIABgBIABAAIACgBIADgCIADgEIAEgCIABgBIACgBIABAAIABgBIABgCIAAgBIABAAIABgBIAAgCIABAAIAAgBIABgBIAAgBIAAgCIAAgCIAAgBIgBgBIAAgBIgBgBIAAgCIgBgBIgBgBIgBgBIgBAAIgBgBIgCAAIgBAAIgCgBIgBABIgBAAIgBAAgAj2kYIgBABIgCABIgBABIgBABIgBACIgBAAIAAACIgCABIgBAAIAAABIgBACIgBACIgBABIgCABIgCADIgCADIgCACIgCADIgDAEIgMANIgOARIgMAPIgMAQIgPAWIAAABIAAABIAAACIAAACIAAABIABABIAAABIABABIACABIACAAIABABIACAAIABAAIABgBIACAAIABgBIABgBIADgEIAPgUIAOgRIARgSIAOgPIASgSIABgBIABgCIABgBIABgBIABgBIACgBIABgBIABgBIABgBIABgCIABgBIAAgCIAAgBIABgCIAAgBIAAgCIgBgBIAAgBIAAgCIgBAAIgBgBIAAgBIgBgBIgCgCIgBAAIgBgBIgCAAIgBgBIgBAAIgBAAIgCAAIgCAAIgBABgAjjjwIgCAAIgBABIgBABIgBAAIgCABIgBABIgBABIgBACIgBACIgBACIgEACIgCAEIgCADIgCACIgBACIgCACIgBABIgBABIgCABIAAACIgCABIgBACIgDADIgDADIgDADIgDADIgCACIgBABIgBACIgBACIgBABIgCABIgBABIgBABIAAACIgBABIgBACIAAACIAAABIAAACIAAABIABADIAAABIABACIABAAIABACIACABIABAAIACABIABAAIACAAIABAAIADAAIABgBIABAAIABgBIABgBIABgBIABgCIABgBIABgCIABgBIACgCIABgBIABgCIABgBIABgCIAFgEIAEgFIAGgFIAGgHIAEgGIACgCIABgBIACgBIABgBIABgCIABgCIACgBIABgBIACgBIABgBIABgBIABgBIAAgCIAAgCIAAgCIAAAAIAAgBIAAgCIAAgCIgBgCIgBgBIgBgCIgCAAIgBgBIgCgBIgCgBIgCAAIgCAAIgCABg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.1,-41.1,82.30000000000001,82.30000000000001);


(lib.Bluering = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#6684B9").ss(20,0,0,3).p("AIyAAQAADpilClQikCkjpAAQjoAAilikQikilAAjpQAAjoCkilQClikDoAAQDpAACkCkQClClAADog");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-66.2,-66.2,132.4,132.4);


(lib.BG3 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Background();
	this.instance.setTransform(-260,-195,1.3,1.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-260,-195,520,390);


(lib.BG2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Background();
	this.instance.setTransform(-260,-195,1.3,1.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-260,-195,520,390);


(lib.Cirlce2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Circle("synched",0);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D8666C").s().p("AhOCYQgNgDgCgOIAAgBQACgOAMgEQANgFAIALQAJALgIALQgFAJgKAAIgGgBgAABBDQgMgDgCgOIAAgBQABgOAMgEQANgFAIALQAJALgIALQgFAJgKAAIgGgBgABFhyQgNgEgCgNIAAgCQABgNAMgFQANgFAJALQAIALgHAMQgGAJgJAAIgGgBg");
	this.shape.setTransform(-0.5992,12.4127);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-41.1,-41.1,82.30000000000001,82.30000000000001);


// stage content:
(lib.Animation_HTML5Canvascopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,10,20,26,30,46,60,70,135,138,155,175,198,200,215,217,229,233,255,270,273,296,375,409,443,476,488,498,520,535,547,576,614,615,658];
	this.streamSoundSymbolsList[1] = [{id:"Slide",startFrame:1,endFrame:10,loop:1,offset:0}];
	this.streamSoundSymbolsList[10] = [{id:"Metallichitwav",startFrame:10,endFrame:20,loop:1,offset:0}];
	this.streamSoundSymbolsList[20] = [{id:"Slide",startFrame:20,endFrame:26,loop:1,offset:0}];
	this.streamSoundSymbolsList[26] = [{id:"Slide",startFrame:26,endFrame:30,loop:1,offset:0}];
	this.streamSoundSymbolsList[30] = [{id:"Metallichitwav",startFrame:30,endFrame:60,loop:1,offset:0}];
	this.streamSoundSymbolsList[46] = [{id:"Slide",startFrame:46,endFrame:54,loop:1,offset:0}];
	this.streamSoundSymbolsList[60] = [{id:"Hit2wav",startFrame:60,endFrame:135,loop:1,offset:0}];
	this.streamSoundSymbolsList[70] = [{id:"Breatheinwav",startFrame:70,endFrame:138,loop:1,offset:0}];
	this.streamSoundSymbolsList[135] = [{id:"Slide",startFrame:135,endFrame:175,loop:1,offset:0}];
	this.streamSoundSymbolsList[138] = [{id:"Hit2wav",startFrame:138,endFrame:155,loop:1,offset:0}];
	this.streamSoundSymbolsList[155] = [{id:"Hit2wav",startFrame:155,endFrame:175,loop:1,offset:0}];
	this.streamSoundSymbolsList[175] = [{id:"Slide",startFrame:175,endFrame:198,loop:1,offset:0}];
	this.streamSoundSymbolsList[200] = [{id:"Boingwav",startFrame:200,endFrame:210,loop:1,offset:0}];
	this.streamSoundSymbolsList[215] = [{id:"Boingwav",startFrame:215,endFrame:222,loop:1,offset:238}];
	this.streamSoundSymbolsList[217] = [{id:"Slide",startFrame:217,endFrame:221,loop:1,offset:0}];
	this.streamSoundSymbolsList[229] = [{id:"Slide",startFrame:229,endFrame:236,loop:1,offset:0}];
	this.streamSoundSymbolsList[233] = [{id:"Wompwav",startFrame:233,endFrame:270,loop:1,offset:0}];
	this.streamSoundSymbolsList[255] = [{id:"Slide",startFrame:255,endFrame:261,loop:1,offset:0}];
	this.streamSoundSymbolsList[270] = [{id:"Boingwav",startFrame:270,endFrame:282,loop:1,offset:0}];
	this.streamSoundSymbolsList[273] = [{id:"Slide",startFrame:273,endFrame:277,loop:1,offset:0}];
	this.streamSoundSymbolsList[296] = [{id:"Whimperwav",startFrame:296,endFrame:375,loop:1,offset:0}];
	this.streamSoundSymbolsList[375] = [{id:"Slide",startFrame:375,endFrame:421,loop:1,offset:0}];
	this.streamSoundSymbolsList[409] = [{id:"Boingwav",startFrame:409,endFrame:425,loop:1,offset:0}];
	this.streamSoundSymbolsList[443] = [{id:"Slide",startFrame:443,endFrame:459,loop:1,offset:1573}];
	this.streamSoundSymbolsList[476] = [{id:"Wompwav",startFrame:476,endFrame:481,loop:1,offset:0}];
	this.streamSoundSymbolsList[488] = [{id:"Slide",startFrame:488,endFrame:497,loop:1,offset:0}];
	this.streamSoundSymbolsList[498] = [{id:"Wompwav",startFrame:498,endFrame:503,loop:1,offset:0}];
	this.streamSoundSymbolsList[520] = [{id:"Boingwav",startFrame:520,endFrame:535,loop:1,offset:147}];
	this.streamSoundSymbolsList[535] = [{id:"Boingwav",startFrame:535,endFrame:547,loop:1,offset:138}];
	this.streamSoundSymbolsList[547] = [{id:"Boingwav",startFrame:547,endFrame:553,loop:1,offset:154}];
	this.streamSoundSymbolsList[576] = [{id:"Slide",startFrame:576,endFrame:600,loop:1,offset:0}];
	this.streamSoundSymbolsList[615] = [{id:"Slide",startFrame:615,endFrame:658,loop:1,offset:0}];
	this.streamSoundSymbolsList[658] = [{id:"Clickwav",startFrame:658,endFrame:701,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		playSound("Hit2wav");
	}
	this.frame_1 = function() {
		var soundInstance = playSound("Slide",0);
		this.InsertIntoSoundStreamData(soundInstance,1,10,1);
	}
	this.frame_10 = function() {
		var soundInstance = playSound("Metallichitwav",0);
		this.InsertIntoSoundStreamData(soundInstance,10,20,1);
		playSound("Hit2wav");
	}
	this.frame_20 = function() {
		var soundInstance = playSound("Slide",0);
		this.InsertIntoSoundStreamData(soundInstance,20,26,1);
	}
	this.frame_26 = function() {
		var soundInstance = playSound("Slide",0);
		this.InsertIntoSoundStreamData(soundInstance,26,30,1);
	}
	this.frame_30 = function() {
		var soundInstance = playSound("Metallichitwav",0);
		this.InsertIntoSoundStreamData(soundInstance,30,60,1);
	}
	this.frame_46 = function() {
		var soundInstance = playSound("Slide",0);
		this.InsertIntoSoundStreamData(soundInstance,46,54,1);
	}
	this.frame_60 = function() {
		var soundInstance = playSound("Hit2wav",0);
		this.InsertIntoSoundStreamData(soundInstance,60,135,1);
	}
	this.frame_70 = function() {
		var soundInstance = playSound("Breatheinwav",0);
		this.InsertIntoSoundStreamData(soundInstance,70,138,1);
	}
	this.frame_135 = function() {
		var soundInstance = playSound("Slide",0);
		this.InsertIntoSoundStreamData(soundInstance,135,175,1);
	}
	this.frame_138 = function() {
		var soundInstance = playSound("Hit2wav",0);
		this.InsertIntoSoundStreamData(soundInstance,138,155,1);
	}
	this.frame_155 = function() {
		var soundInstance = playSound("Hit2wav",0);
		this.InsertIntoSoundStreamData(soundInstance,155,175,1);
	}
	this.frame_175 = function() {
		var soundInstance = playSound("Slide",0);
		this.InsertIntoSoundStreamData(soundInstance,175,198,1);
	}
	this.frame_198 = function() {
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
		_this.puz_btn.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
	}
	this.frame_200 = function() {
		var soundInstance = playSound("Boingwav",0);
		this.InsertIntoSoundStreamData(soundInstance,200,210,1);
	}
	this.frame_215 = function() {
		var soundInstance = playSound("Boingwav",0,238);
		this.InsertIntoSoundStreamData(soundInstance,215,222,1,238);
	}
	this.frame_217 = function() {
		var soundInstance = playSound("Slide",0);
		this.InsertIntoSoundStreamData(soundInstance,217,221,1);
	}
	this.frame_229 = function() {
		var soundInstance = playSound("Slide",0);
		this.InsertIntoSoundStreamData(soundInstance,229,236,1);
	}
	this.frame_233 = function() {
		var soundInstance = playSound("Wompwav",0);
		this.InsertIntoSoundStreamData(soundInstance,233,270,1);
	}
	this.frame_255 = function() {
		var soundInstance = playSound("Slide",0);
		this.InsertIntoSoundStreamData(soundInstance,255,261,1);
	}
	this.frame_270 = function() {
		var soundInstance = playSound("Boingwav",0);
		this.InsertIntoSoundStreamData(soundInstance,270,282,1);
	}
	this.frame_273 = function() {
		var soundInstance = playSound("Slide",0);
		this.InsertIntoSoundStreamData(soundInstance,273,277,1);
	}
	this.frame_296 = function() {
		var soundInstance = playSound("Whimperwav",0);
		this.InsertIntoSoundStreamData(soundInstance,296,375,1);
	}
	this.frame_375 = function() {
		var soundInstance = playSound("Slide",0);
		this.InsertIntoSoundStreamData(soundInstance,375,421,1);
	}
	this.frame_409 = function() {
		var soundInstance = playSound("Boingwav",0);
		this.InsertIntoSoundStreamData(soundInstance,409,425,1);
	}
	this.frame_443 = function() {
		var soundInstance = playSound("Slide",0,1573);
		this.InsertIntoSoundStreamData(soundInstance,443,459,1,1573);
	}
	this.frame_476 = function() {
		var soundInstance = playSound("Wompwav",0);
		this.InsertIntoSoundStreamData(soundInstance,476,481,1);
	}
	this.frame_488 = function() {
		var soundInstance = playSound("Slide",0);
		this.InsertIntoSoundStreamData(soundInstance,488,497,1);
	}
	this.frame_498 = function() {
		var soundInstance = playSound("Wompwav",0);
		this.InsertIntoSoundStreamData(soundInstance,498,503,1);
	}
	this.frame_520 = function() {
		var soundInstance = playSound("Boingwav",0,147);
		this.InsertIntoSoundStreamData(soundInstance,520,535,1,147);
	}
	this.frame_535 = function() {
		var soundInstance = playSound("Boingwav",0,138);
		this.InsertIntoSoundStreamData(soundInstance,535,547,1,138);
	}
	this.frame_547 = function() {
		var soundInstance = playSound("Boingwav",0,154);
		this.InsertIntoSoundStreamData(soundInstance,547,553,1,154);
	}
	this.frame_576 = function() {
		var soundInstance = playSound("Slide",0);
		this.InsertIntoSoundStreamData(soundInstance,576,600,1);
	}
	this.frame_614 = function() {
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
		_this.puz_btn.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
	}
	this.frame_615 = function() {
		var soundInstance = playSound("Slide",0);
		this.InsertIntoSoundStreamData(soundInstance,615,658,1);
	}
	this.frame_658 = function() {
		var soundInstance = playSound("Clickwav",0);
		this.InsertIntoSoundStreamData(soundInstance,658,701,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(9).call(this.frame_10).wait(10).call(this.frame_20).wait(6).call(this.frame_26).wait(4).call(this.frame_30).wait(16).call(this.frame_46).wait(14).call(this.frame_60).wait(10).call(this.frame_70).wait(65).call(this.frame_135).wait(3).call(this.frame_138).wait(17).call(this.frame_155).wait(20).call(this.frame_175).wait(23).call(this.frame_198).wait(2).call(this.frame_200).wait(15).call(this.frame_215).wait(2).call(this.frame_217).wait(12).call(this.frame_229).wait(4).call(this.frame_233).wait(22).call(this.frame_255).wait(15).call(this.frame_270).wait(3).call(this.frame_273).wait(23).call(this.frame_296).wait(79).call(this.frame_375).wait(34).call(this.frame_409).wait(34).call(this.frame_443).wait(33).call(this.frame_476).wait(12).call(this.frame_488).wait(10).call(this.frame_498).wait(22).call(this.frame_520).wait(15).call(this.frame_535).wait(12).call(this.frame_547).wait(29).call(this.frame_576).wait(38).call(this.frame_614).wait(1).call(this.frame_615).wait(43).call(this.frame_658).wait(43));

	// Button
	this.puz_btn = new lib.puz_btn();
	this.puz_btn.name = "puz_btn";
	this.puz_btn.setTransform(196.45,79.4);
	new cjs.ButtonHelper(this.puz_btn, 0, 1, 2, false, new lib.puz_btn(), 3);

	this.timeline.addTween(cjs.Tween.get(this.puz_btn).to({_off:true},1).wait(194).to({_off:false,x:207.55,y:90.45,alpha:0},0).to({alpha:1},3).to({_off:true},1).wait(403).to({_off:false,x:206.55,y:96.95,alpha:0},0).to({alpha:1},2).to({alpha:0},2).to({alpha:1},3).to({alpha:0},2).to({alpha:1},3).to({_off:true},1).wait(86));

	// Circle
	this.instance = new lib.Cirlce2("synched",0);
	this.instance.setTransform(113.7,199.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({startPosition:0},0).to({rotation:120.0004,x:169.65},9,cjs.Ease.quadIn).wait(10).to({startPosition:0},0).to({rotation:40.8394,x:138.1,y:199.75},6,cjs.Ease.cubicInOut).to({rotation:120.0004,x:169.65,y:199.7},4,cjs.Ease.quartIn).wait(16).to({startPosition:0},0).to({rotation:90.0009,x:152.6},8,cjs.Ease.quadInOut).wait(8).to({regX:41.1,y:240.8},0).to({regX:41.3,regY:-0.1,scaleX:0.9539,rotation:0,skewX:90.0009,skewY:85.8318,x:152.65,y:240.95},4,cjs.Ease.quadOut).wait(23).to({startPosition:0},0).to({regX:41.4,regY:-0.3,scaleX:1.0479,skewY:95.8401,x:152.7,y:241},9,cjs.Ease.backOut).wait(16).to({startPosition:0},0).to({regX:41.1,regY:0,scaleX:1,rotation:90.0009,skewX:0,skewY:0,x:152.6,y:240.8},5,cjs.Ease.quadInOut).wait(16).to({regX:0,y:199.7},0).to({scaleX:0.9999,scaleY:0.9999,rotation:-299.9987,x:-63.5,y:199.55},20,cjs.Ease.quadIn).wait(27).to({regX:0.1,regY:0.1,rotation:-345.0001,x:450.85,y:199.65},0).to({rotation:-749.9983,x:296.85},16,cjs.Ease.quadOut).wait(19).to({startPosition:0},0).to({rotation:-764.9975,x:289.8},4,cjs.Ease.quadInOut).wait(8).to({startPosition:0},0).to({scaleX:0.9998,scaleY:0.9998,rotation:-816.1923,x:266.8},7,cjs.Ease.quadInOut).wait(19).to({startPosition:0},0).to({regX:0,rotation:-852.9004,x:259.8,y:199.85},6,cjs.Ease.quadOut).wait(12).to({startPosition:0},0).to({regX:-0.1,rotation:-900,x:230.45},4,cjs.Ease.cubicInOut).wait(19).to({regX:0,regY:-0.4,x:230.35,y:200.35},0).to({regY:0,scaleX:1.1832,scaleY:0.6468,rotation:-1080,skewX:173.6704,skewY:180,x:227.4,y:214.75},22,cjs.Ease.backInOut).wait(22).to({regY:-41.6,x:230.35,y:241.5},0).to({scaleX:0.9998,scaleY:0.9998,rotation:-900,skewX:0,skewY:0,y:241.55},22,cjs.Ease.backInOut).wait(13).to({regY:-0.3,y:200.25},0).to({regY:-0.2,rotation:-990,x:165.4,y:200.3},46,cjs.Ease.quadInOut).wait(22).to({startPosition:0},0).to({x:62.35},16,cjs.Ease.quadInOut).wait(29).to({startPosition:0},0).to({regX:0.1,regY:-0.3,scaleX:0.9997,scaleY:0.9997,rotation:-983.6889,x:69.9,y:200.45},9,cjs.Ease.quadInOut).wait(59).to({startPosition:0},0).wait(59).to({startPosition:0},0).to({regY:-0.4,rotation:-720,x:209.4,y:200.4},43,cjs.Ease.quadInOut).wait(43));

	// RedRing
	this.instance_1 = new lib.Redring("synched",0);
	this.instance_1.setTransform(461.65,200.3);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(443).to({_off:false},0).to({x:334.8},16,cjs.Ease.quadInOut).wait(17).to({regY:41.1,y:241.4},0).to({regX:0.1,regY:41.2,scaleY:0.9552,skewX:5.1021,x:334.95,y:241.5},11,cjs.Ease.backInOut).wait(11).to({startPosition:0},0).to({regY:41.4,scaleX:1.0484,scaleY:0.9057,skewX:-4.0072,x:334.9,y:241.7},10,cjs.Ease.backInOut).wait(12).to({skewX:-4.0072},0).to({regY:41.2,scaleX:0.9404,scaleY:1.0334,skewX:0,y:210.55},8,cjs.Ease.cubicOut).to({regX:0,regY:41.1,scaleX:1.0542,scaleY:0.9514,x:334.8,y:237.15},7,cjs.Ease.cubicIn).to({regX:0.1,regY:41.2,scaleX:0.9295,scaleY:1.0212,x:334.9,y:219},6,cjs.Ease.cubicOut).to({regY:41.1,scaleX:1.0378,scaleY:0.9605,y:241.45},6,cjs.Ease.cubicIn).to({scaleX:0.9729,scaleY:1,y:232.4},3,cjs.Ease.cubicOut).to({regX:0,scaleX:1,x:334.8,y:241.4},3,cjs.Ease.cubicIn).wait(23).to({regY:0,y:200.3},0).to({rotation:-360,x:209.8,y:201.3},24,cjs.Ease.quadInOut).wait(101));

	// BlueRing
	this.instance_2 = new lib.Bluering("synched",0);
	this.instance_2.setTransform(110.25,251.25,1,1.018,0,-10.7986,0,0,67);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(175).to({_off:false},0).wait(25).to({startPosition:0},0).to({regX:0.1,regY:67.1,scaleY:1.0911,skewX:10.4419,x:110.3,y:251.4},10,cjs.Ease.backOut).wait(5).to({startPosition:0},0).to({regX:0.2,regY:67.2,scaleX:0.5353,scaleY:1.1928,skewX:-11.0953,x:110.4,y:251.5},5,cjs.Ease.backOut).wait(13).to({skewX:-11.0953},0).to({regX:0.4,scaleX:0.871,scaleY:0.6354,skewX:-11.0932,x:97.95,y:251.95},5,cjs.Ease.backOut).wait(1).to({x:96.55},0).wait(1).to({x:97.95},0).wait(1).to({x:96.55},0).wait(1).to({x:97.95},0).wait(1).to({x:96.55},0).wait(1).to({x:97.95},0).wait(1).to({x:96.55},0).wait(1).to({x:97.95},0).wait(1).to({x:96.55},0).wait(1).to({x:97.95},0).wait(1).to({x:96.55},0).wait(1).to({x:97.95},0).wait(1).to({x:96.55},0).wait(1).to({x:97.95},0).wait(1).to({x:96.55},0).wait(1).to({x:97.95},0).wait(1).to({x:96.55},0).wait(1).to({x:97.95},0).wait(1).to({x:96.55},0).to({regX:0.5,regY:67.4,scaleY:0.5609,skewX:-14.7319,x:90.65,y:252.05},3,cjs.Ease.backOut).wait(5).to({startPosition:0},0).to({scaleX:0.9678,scaleY:0.4519,skewX:-14.7325},5,cjs.Ease.quintOut).to({regX:0.4,regY:67.5,scaleX:0.2714,scaleY:0.9372,skewX:-14.7315,x:-28.8,y:119.65},6,cjs.Ease.quintOut).to({_off:true},1).wait(424));

	// Sqaure
	this.instance_3 = new lib.Square("synched",0);
	this.instance_3.setTransform(327.6,241,1,1,180,0,0,-48.5,-48.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({regX:49,x:230.1},0).to({rotation:90},9,cjs.Ease.cubicIn).wait(35).to({startPosition:0},0).to({rotation:180},15,cjs.Ease.cubicIn).wait(10).to({regX:0.1,regY:-39.1,x:279,y:231.5},0).to({scaleX:0.6424,scaleY:1.23,x:279.05,y:231.55},11,cjs.Ease.quadOut).wait(5).to({startPosition:0},0).to({regX:0,regY:-39.2,scaleX:1.0764,scaleY:0.3752,x:279.1,y:231.7},7,cjs.Ease.quartOut).wait(7).to({startPosition:0},0).to({regX:0.1,regY:-39.1,scaleX:1,scaleY:1,x:279,y:231.5},14,cjs.Ease.quadInOut).wait(12).to({regX:-49.2,regY:-49.1,x:328.3,y:241.5},0).wait(1).to({regY:-48.9,y:241.3},0).to({rotation:270},11,cjs.Ease.quadIn).wait(4).to({regY:49.1,x:426.3},0).wait(1).to({startPosition:0},0).to({rotation:360},12,cjs.Ease.quadIn).to({_off:true},1).wait(545));

	// BG
	this.instance_4 = new lib.BlurredBG();

	this.instance_5 = new lib.Background();
	this.instance_5.setTransform(-62,-73,1.3,1.3);

	this.instance_6 = new lib.BG3("synched",0);
	this.instance_6.setTransform(198,122);
	this.instance_6._off = true;

	this.instance_7 = new lib.BG2("synched",0);
	this.instance_7.setTransform(143,122);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[{t:this.instance_5}]},175).to({state:[{t:this.instance_6}]},268).to({state:[{t:this.instance_7}]},16).wait(242));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(443).to({_off:false},0).to({_off:true,x:143},16,cjs.Ease.quadInOut).wait(242));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(83,77,441.70000000000005,240);
// library properties:
lib.properties = {
	id: 'F107C887E92A9F488FAF263757D2FD1C',
	width: 400,
	height: 300,
	fps: 15,
	color: "#323232",
	opacity: 1.00,
	manifest: [
		{src:"images/Animation_HTML5 Canvas copy_atlas_1.png", id:"Animation_HTML5 Canvas copy_atlas_1"},
		{src:"sounds/Boingwav.mp3", id:"Boingwav"},
		{src:"sounds/Breatheinwav.mp3", id:"Breatheinwav"},
		{src:"sounds/Clickwav.mp3", id:"Clickwav"},
		{src:"sounds/Hit2wav.mp3", id:"Hit2wav"},
		{src:"sounds/Metallichitwav.mp3", id:"Metallichitwav"},
		{src:"sounds/Slide.mp3", id:"Slide"},
		{src:"sounds/Whimperwav.mp3", id:"Whimperwav"},
		{src:"sounds/Wompwav.mp3", id:"Wompwav"}
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
an.compositions['F107C887E92A9F488FAF263757D2FD1C'] = {
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