var Color = require("color");
var PIXI = require("pixi.js");

// Backwards compatibility shims for color v3.x API changes
if (!Color.prototype.hexString) {
    Color.prototype.hexString = function() {
        return this.hex();
    };
}
if (!Color.prototype.rgbString) {
    Color.prototype.rgbString = function() {
        return this.rgb().string();
    };
}
if (!Color.prototype.rgbaString) {
    Color.prototype.rgbaString = function() {
        return this.rgb().string();
    };
}
// v3 is immutable — clone() is a no-op since every operation returns a new instance
if (!Color.prototype.clone) {
    Color.prototype.clone = function() {
        return this;
    };
}
// clearer(ratio) → fade(ratio)
if (!Color.prototype.clearer) {
    Color.prototype.clearer = function(ratio) {
        return this.fade(ratio);
    };
}

/**
 * An extension that converts the color's hex string to a hex number, e.g. #FFCC00 -> 0xFFCC00 === 16763904
 *
 * @returns {number} the color as a hex number
 */
Color.prototype.hexNumber = function() {
    return parseInt(this.hexString().replace(/^#/, ""), 16); // remove "#", then convert from string to int base 16
};


/**
 * Gets a 5x4 color matrix for ColorMatrixFilter operations (pixi v5 format).
 * Columns: r-mult, g-mult, b-mult, a-mult, offset. Rest are 0.
 *
 * @returns {Array.<number>} an array of 20 numbers representing a 5x4 color matrix
 */
Color.prototype.colorMatrix = function() {
    var r = this.red()/255;
    var g = this.green()/255;
    var b = this.blue()/255;
    var a = this.alpha();

    return [
        r, 0, 0, 0, 0,
        0, g, 0, 0, 0,
        0, 0, b, 0, 0,
        0, 0, 0, a, 0,
    ];
};

/**
 * Gets a PIXI ColorMatrixFilter set to this color
 *
 * @return {PIXI.ColorMatrixFilter} - this as a PIXI ColorMatrixFilter
 */
Color.prototype.colorMatrixFilter = function() {
    var filter = new PIXI.filters.ColorMatrixFilter();
    filter.matrix = this.colorMatrix();

    return filter;
};

/**
 * Gets the most contrasting color (black or white) relative to this color. Useful for text on this color as a background color
 * @returns {Color} either black or white
 */
Color.prototype.contrastingColor = function() {
    return this.isLight() ?
        Color("black") :
        Color("white");
};
