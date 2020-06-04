"use strict";
/**
 * @type {{shadowRect: canvasUtils.shadowRect}}
 */
const canvasUtils = {
    /**
     * @param ctx
     * @param x
     * @param y
     * @param w
     * @param h
     * @param repeats
     * @param color
     *
     * @see https://stackoverflow.com/questions/29393591/how-to-make-a-shadow-in-html-canvas
     */
    shadowRect: function (ctx,x,y,w,h,repeats,color) {
        // set stroke & shadow to the same color
        ctx.strokeStyle=color;
        ctx.shadowColor=color;
        // set initial blur of 3px
        ctx.shadowBlur=3;
        // repeatedly overdraw the blur to make it prominent
        for(let i=0;i<repeats;i++){
            // increase the size of blur
            ctx.shadowBlur+=0.25;
            // stroke the rect (which also draws its shadow)
            ctx.strokeRect(x,y,w,h);
        }
        // cancel shadowing by making the shadowColor transparent
        ctx.shadowColor='rgba(0,0,0,0)';
        // restroke the interior of the rect for a more solid colored center
        ctx.lineWidth=2;
        ctx.strokeRect(x+2,y+2,w-4,h-4);
    },
    /**
     * @param point
     * @param circle
     * @returns {boolean}
     *
     * @see https://lavrton.com/hit-region-detection-for-html5-canvas-and-how-to-listen-to-click-events-on-canvas-shapes-815034d7e9f8/
     */
    isIntersect: (point, circle) => Math.sqrt((point.x-circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius,
};


