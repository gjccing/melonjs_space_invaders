/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // give a name
        this.name = "HUD";

        // add our child score object at the top left corner
        this.addChild(new game.HUD.ScoreItem(5, 5));
    }
});


/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({
    /**
     * constructor
     */
    init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        this.leftFont = new me.Font('Serif', 24, '#FFFFFF', "left");
        this.rightFont = new me.Font('Serif', 24, '#FFFFFF', "right");

        // local copy of the global score
        this.enemyCounter = -1;
        this.enemyVel = -1;
    },

    /**
     * update function
     */
    update : function () {
        if (this.enemyCounter !== game.playScreen.enemyManager.children.length) {
            this.enemyCounter = game.playScreen.enemyManager.children.length;
            return true;
        }

        if (this.enemyVel !== game.playScreen.enemyManager.vel) {
            this.enemyVel = game.playScreen.enemyManager.vel
            return true;
        }
         
        return false;
    },

    /**
     * draw the score
     */
    draw : function (context) {
        // draw it baby !
        this.leftFont.draw(context, this.enemyCounter, 5, 5);
        this.rightFont.draw(context, Math.abs(this.enemyVel), me.game.viewport.width-5, 5);
    }

});
