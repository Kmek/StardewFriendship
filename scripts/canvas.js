//******************** Canvas Setup ********************//
const canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//******************** Canvas Drawing Functions ********************//
const draw = {
    circle: function(x, y, radius, color) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
    },
    rect: function(x, y, width, height, color) {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
    },
    text: function(x, y, color, text) {
        ctx.font = "28px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    },
    pie: function(x, y, radius, startA, endA, color) {
        ctx.strokeStyle = color
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.arc(x, y, radius, startA, endA)
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.fill()
    },
    erase: function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
};

//******************** Check if XY is in the Canvas ********************//
function inCanvas(x, y) {
    if ((x >= 0 && x < canvas.width) && (y >= 0 && y < canvas.height)) {
        return true
    }
    return false
}

//******************** Draw axes ********************//
// todo