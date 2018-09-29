//Original code copyright yusuke.nakanishi - http://jsdo.it/yusuke.nakanishi
//Licensed under MIT License - http://www.opensource.org/licenses/mit-license.php
//Modified by Chuck Nelson - http://www.chucknelson.org

$(function(){
    var windowHeight, windowWidth, resizeTimeout;
    
    //draw on first load
    drawStarrySky();
    
    //bind drawing to window resize using a reasonable delay on the call (as opposed to many more calls while resizing)
    $(window).resize(function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() { drawStarrySky(); }, 200); 
    });
        
    function drawStarrySky() {        
        windowHeight = $(window).height();
        windowWidth = $(window).width();
        
        $('#starrySky').attr({height:windowHeight});
        $('#starrySky').attr({width:windowWidth});
        
        var ctx = document.getElementById('starrySky').getContext('2d');
        
        skyGradientCreate(ctx);
        smallStarCreate(ctx, 15000, 1);
        smallStarCreate(ctx, 500, 2);
        //bigStarCreate(100, 2);
        //bigStarCreate(10, 3);
        
        ctx.restore();
        ctx.save();
    }    
    
    function skyGradientCreate(context) {
        var lingrad = context.createLinearGradient(0,0,0,windowHeight);
        lingrad.addColorStop(0, '#030617');
        lingrad.addColorStop(0.6, '#030617');
        lingrad.addColorStop(1, '#372021');
       
        context.fillStyle = lingrad;
        context.fillRect(0,0,windowWidth,windowHeight);
    }
    
    function smallStarCreate(context, starNumber, starSize) {
        for(var i=0; i<starNumber; i++) {
            context.beginPath();
            var starLeft = Math.floor(Math.random()*windowWidth) + 1;
            var starTop = Math.floor(Math.random()*windowHeight) + 1;
            var colorVal01 =  Math.floor(Math.random()*106) + 150;
            var colorVal02 =  Math.floor(Math.random()*106) + 150;
            var opacityVal =  (Math.floor(Math.random()*11)) / 10;
            context.fillStyle = "rgba(" + colorVal01 + ", " + colorVal02 + ", " + 255 + ", " + opacityVal + ")";
            context.fillRect(starLeft, starTop, starSize, starSize);
            context.fill();
        }
    }
        
    function bigStarCreate(context, starNumber, starSize) {
        for(var i=0; i<starNumber; i++) {
            context.beginPath();
            var starLeft = Math.floor(Math.random()*windowWidth) + 1;
            var starTop = Math.floor(Math.random()*windowHeight) + 1;
            var colorVal01 =  Math.floor(Math.random()*106) + 150;
            var colorVal02 =  Math.floor(Math.random()*106) + 150;
            var opacityVal =  (Math.floor(Math.random()*11)) / 10;
            var colorVal =  Math.floor(Math.random()*151);
            var radgrad = context.createRadialGradient(starLeft,starTop,0,starLeft,starTop,starSize);
            radgrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
            radgrad.addColorStop(1, "rgba(" + colorVal01 + ", " + colorVal02 + ", " + 255 + ", " + opacityVal + ")");
            context.fillStyle = radgrad;
            context.arc(starLeft, starTop, starSize, 0, Math.PI * 2, true);
            context.fill();
        }
    }
    
});