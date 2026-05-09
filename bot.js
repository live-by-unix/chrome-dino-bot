(function() {
    let c = 5;
    const t = setInterval(() => {
        console.clear();
        console.log("%c SCANNING OBSTACLES: " + c, "color: #00ff00; font-size: 30px; font-weight: bold;");
        c--;
        if (c < 0) {
            clearInterval(t);
            console.clear();
            console.log("%c Loaded", "color: #00ff00; font-size: 30px; font-weight: bold;");
            run();
        }
    }, 1000);

    function run() {
        const r = Runner.instance_;
        r.update = (function(orig) {
            return function() {
                orig.apply(this, arguments);
                if (this.crashed) this.restart();

                const obs = this.horizon.obstacles[0];
                if (obs) {
                    const s = this.currentSpeed;
                    const x = obs.xPos;
                    const y = obs.yPos;
                    const trigger = s * 19;

                    if (x < trigger) {
                      
                        if (y <= 75 && y >= 45) {
                            if (!this.tRex.ducking) {
                                this.tRex.setDuck(true);
                            }
                        } 
                   
                        else if (y > 75 || y < 45) {
                         
                            if (y < 45 && y > 10) { 
                               
                            } else if (!this.tRex.jumping) {
                                if (this.tRex.ducking) this.tRex.setDuck(false);
                                this.tRex.startJump(s);
                            }
                        }
                    }
                } else {
                    
                    if (this.tRex.ducking) this.tRex.setDuck(false);
                }
            };
        })(r.update);
    }
})();
