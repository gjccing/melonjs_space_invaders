game.HelpScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.ColorLayer("background", "#000000"), 0);

        me.game.world.addChild(new (me.Renderable.extend ({
            // constructor
            init : function () {
                this._super(me.Renderable, 'init', [0, 0, me.game.viewport.width, me.game.viewport.height]);
                this.titleFont = new me.Font('Serif', 72, '#FFFFFF', "center");
                this.helpFont = new me.Font('Serif', 24, '#FFFFFF', "left");
                this.btnFont = new me.Font('Serif', 32, '#FFFFFF', "center");
            },
            draw : function (renderer) {
                this.titleFont.draw(renderer, "HELP", me.game.viewport.width / 2, 100);
                this.helpFont.draw(renderer, "Key A & LEFT ... move left", me.game.viewport.width / 2 - 150, 250);
                this.helpFont.draw(renderer, "Key D & RIGHT ... move right", me.game.viewport.width / 2 - 150, 300);
                this.helpFont.draw(renderer, "Key SPACE ... shoot", me.game.viewport.width / 2 - 150, 350);
                this.btnFont.draw(renderer, "PRESS ENTER TO RESUME", me.game.viewport.width / 2, 500);
            },
            update : function (dt) {
              return true;
            },
            onDestroyEvent : function () {
            }
        })), 2);

        me.input.bindKey(me.input.KEY.ENTER, "resume", true);
        me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);
        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
            if (action === "resume") {
                me.state.change(me.state.PLAY);
            }
        });
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.pointer.LEFT);
        me.event.unsubscribe(this.handler);
    }
});
