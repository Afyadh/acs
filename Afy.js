            const voiceModule = webpackModules.findByPrototypes("setSelfDeaf");
            const initialize = voiceModule.prototype.initialize;
            voiceModule.prototype.initialize = function (...args) {
              let resp = initialize.call(this, ...args);
              let setTransportOptions = this.conn.setTransportOptions;
              this.conn.setTransportOptions = function (obj) {
                console.log("Afycord Injected");
                if (obj.audioEncoder) {
                    obj.audioEncoder.params = { stereo: "2" }
                    obj.audioEncoder.channels = 2;
                    obj.audioEncoder.freq = 96000;
                    obj.audioEncoder.rate = 910000;
                    obj.audioEncoder.pacsize = 40;
                    obj.attenuation = true;
                    obj.attenuateWhileSpeakingSelf = true;
                    obj.attenuateWhileSpeakingOthers = false;
                    obj.attenuationFactor = 200;
                    obj.prioritySpeakerDucking = 0;
                }
                if (obj.encodingVoiceBitRate != 960000)
                {
                    obj.encodingVoiceBitRate = 960000;
                }
                if (obj.fec) {
                    obj.fec = false;
                }
                if (obj.encodingBitRate != 398000)
                {
                    obj.encodingBitRate = 398000;
                }
                return setTransportOptions.call(this, obj);
              };
              return resp;
            };
          }
        }, 200);
      }
    }, 200);
  })();
