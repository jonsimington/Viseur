var PIXI = require("pixi.js");

PIXI.utils.skipHello();

// Force linear filtering so textures are smooth when scaled down
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
// Enable mipmaps for power-of-2 textures (256x256 game pieces) — required for
// good quality when heavily downscaling, otherwise even LINEAR looks blocky
PIXI.settings.MIPMAP_TEXTURES = PIXI.MIPMAP_MODES.ON;

/**
 * Convience function. Takes the DisplayObject's current scale into account when setting the pivot, so you don't have to have pixel values
 * @param {number} relativeX - a scalar based on the currently scaled width, so 0.5 is the center
 * @param {number} relativeY - a scalar based on the currently scaled height, so 0.5 is the middle
 */
PIXI.DisplayObject.prototype.setRelativePivot = function setRelativePivot(relativeX, relativeY) {
    this.pivot.set(relativeX * this.width/this.scale.x, relativeY * this.height/this.scale.y);
};
