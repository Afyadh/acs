let resp = initialize.call(this, ...args);
  let setTransportOptions = this.conn.setTransportOptions;
  this.conn.setTransportOptions = function (obj) {
    console.log("Afycord Injected");
    if (obj.audioEncoder) {
      obj.audioEncoder.params = {
        surround: "1",
       };
      obj.audioEncoder.channels = 2;
    }
      if (obj.encodingVoiceBitRate < 192000) {
           bj.encodingVoiceBitRate = 320000;
    }
        if (obj.fec) {
          obj.fec = false;
    }
      return setTransportOptions.call(this, obj);
};