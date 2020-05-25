//******************** Canvas Setup ********************//
const canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.lineWidth = 1

// Set origin to bottom corner, like a normal graph
ctx.translate(0, canvas.height)
ctx.scale(1, -1)

//******************** Canvas Drawing Functions ********************//
const draw = {
    circle: function(x, y, radius, color) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        // ctx.strokeStyle = color;
        // ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
    },
    line: function(x1, y1, x2, y2, strokeWidth, color) {
        let tempStroke = ctx.lineWidth
        ctx.lineWidth = strokeWidth
        ctx.strokeStyle = color
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.lineWidth = tempStroke
    },
    rect: function(x, y, width, height, color) {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        // ctx.strokeStyle = color;
        // ctx.stroke();
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
    heart: function(x, y, cube) {
        // DRAW PIXILATED HEART MATCHING STARDEW
        // Outside #6a0005
        draw.rect(x - (cube * 4), y - (cube * 0), cube * 7, cube * 2, "#6a0005")
        draw.rect(x - (cube * 3), y - (cube * 1), cube * 2, cube * 4, "#6a0005")
        draw.rect(x + (cube * 0), y - (cube * 1), cube * 2, cube * 4, "#6a0005")
        draw.rect(x - (cube * 2), y - (cube * 2), cube * 3, cube * 1, "#6a0005")
        draw.rect(x - (cube * 1), y - (cube * 3), cube * 1, cube * 1, "#6a0005")
        // Inside #d83a01
        draw.rect(x - (cube * 3), y - (cube * 0), cube * 2, cube * 2, "#d83a01")
        draw.rect(x - (cube * 0), y - (cube * 0), cube * 2, cube * 2, "#d83a01")
        draw.rect(x - (cube * 2), y - (cube * 1), cube * 3, cube * 2, "#d83a01")
        draw.rect(x - (cube * 1), y - (cube * 2), cube * 1, cube * 1, "#d83a01")
        // Inside highlight #f16f53
        draw.rect(x - (cube * 2), y + (cube * 1), cube * 1, cube * 1, "#f16f53")
        draw.rect(x + (cube * 1), y + (cube * 1), cube * 1, cube * 1, "#f16f53")

        // draw.circle(x, y, 1, "#000000")
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
var origin = [20, 20]
// These vars must be calculated and set before calling drawAxes()
var maxHearts = 10
var maxWeeks = 16
var heartSpacing, weekSpacing

function drawAxes() {
    heartSpacing = ((canvas.height - (origin[1] * 2)) / maxHearts)
    // Draw y-axis
    draw.line(origin[0], 0, origin[0], canvas.height, 1, "#000000")
    for (let i = 0; i < maxHearts; i++) { // Heart (250 pt) dashes
        let level = heartSpacing * (i + 1) + origin[0]
        level = Math.round(level)
        draw.line(origin[0] - 12, level, origin[0] + 12, level, 1, "#000000")
        if (maxHearts <= 10) { // 50 pt dashes
            for (let d = 1; d < 5; d++) {
                let subLevel = level - ((heartSpacing / 5) * d)
                subLevel = Math.round(subLevel)
                draw.line(origin[0] - 3, subLevel, origin[0] + 3, subLevel, 1, "#000000")
            }
        }
        draw.heart(origin[0] + 1, level - 1, 2)
    }

    weekSpacing = ((canvas.width - (origin[0] * 2)) / maxWeeks)
    // Draw x-axis
    draw.line(0, origin[1], canvas.width, origin[1], 1, "#000000")
    for (let i = 0; i < maxWeeks; i++) { // Weeks dashes
        let level = weekSpacing * (i + 1) + origin[1]
        level = Math.round(level)
        draw.line(level, origin[1] - 10, level, origin[1] + 10, 1, "#000000")
        if (maxWeeks <= 12) { // Days dashes
            for (let d = 1; d < 7; d++) {
                let dayLevel = level - ((weekSpacing / 7) * d)
                dayLevel = Math.round(dayLevel)
                draw.line(dayLevel, origin[1] - 3, dayLevel, origin[1] + 3, 1, "#000000")
            }
        }
    }
}
drawAxes()