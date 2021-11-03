const voiceModule = webpackModules.findByPrototypes("setSelfDeaf");
const initialize = voiceModule.prototype.initialize;
voiceModule.prototype.initialize = function (...args) {
let setTransportOptions = this.conn.setTransportOptions;
  this.conn.setTransportOptions = function (obj) {
    console.log("Afycord Injected");
    if (obj.audioEncoder) {
      obj.audioEncoder.params = {
        surround: "7",
      };
      obj.audioEncoder.channels = 7;
    }
      if (obj.encodingVoiceBitRate < 192000) {
          obj.encodingVoiceBitRate = 320000;
    }
    if (obj.fec) {
      obj.fec = false;
    }
    return setTransportOptions.call(this, obj);
  };
