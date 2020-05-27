// JavaScript for Stardew Friendship Website

/******************** Calculate Gift Points ********************/
function calcGift(quality, type) {
    let points = 0
    let qualityCheck = false

    switch(type) {
        case "loved": 
            points = 80
            qualityCheck = true
            break
        case "liked":
            points = 45
            qualityCheck = true
            break
        case "neutral":
            points = 20
            break
        case "disliked":
            points = -20
            break
        case "hated":
            points = -40
            break
    }

    if (qualityCheck) 
        switch(quality) {
            case "silver":
                points *= 1.1
                break
            case "gold":
                points *= 1.25
                break
            case "iridium": 
                points *= 1.5
                break
        }

    return points
}

/******************** Graph Class ********************/
var mainGraph

class Graph {
    constructor(relationship, talkNum, giftNum, giftPoints, birthdayBool, birthdayPoints, winterBool, winterPoints, timeout) {
        this.relationship = relationship
        this.talkNum = talkNum
        this.giftNum = giftNum
        this.giftPoints = giftPoints
        this.birthdayBool = birthdayBool
        this.birthdayPoints = birthdayPoints
        this.winterBool = winterBool
        this.winterPoints = winterPoints
        this.timeout = timeout
        this.graphable = true
        this.reachedHeart8 = false
        this.reachedHeart10 = false
        this.maxW = 0
        this.maxH = 0
        this.day = 0
    }

    points = []

    setMaxHearts() {
        switch(this.relationship) {
            case 0: // Not romanceable
                this.maxH = 10
                break
            case 1: // Romanceable, pre-bouquet
                this.maxH = 8
                break
            case 2: // Romanceable, post-bouquet
                this.maxH = 10
                break
            case 3: // Romanceable, married
                this.maxH = 14
                break
        }
    }

    getCurrentDecay() {
        if (this.relationship == 0 // Not romanceable
            || !this.reachedHeart8) { // Romanceable, pre-bouquet
            return -2
        } else if (!this.reachedHeart10) { // Romanceable, post-bouquet
            return -10
        } else // Romanceable, married
            return -20
    }

    calcPoints() {
        this.setMaxHearts() // Points goal
        this.day = 0
        let curPoints = 0
        this.reachedHeart8 = false
        this.reachedHeart10 = false
        
        // Birthday and Winter Star gifts act as y-intercepts
        if (this.birthdayBool)
            curPoints += (this.birthdayPoints * 8)
        if (this.winterBool)
            curPoints += (this.winterPoints * 5)
        
        this.points.push(curPoints)

        do {
            // Decay
            curPoints += this.getCurrentDecay()
            if (!this.reachedHeart8 && this.relationship != 0 && curPoints >= (250 * 8)) 
                this.reachedHeart8 = true
            else if (!this.reachedHeart10 && this.relationship > 1 && curPoints >= (250 * 10))
                this.reachedHeart10 = true

            // Talking
            if (((this.day % 7) + 1) <= this.talkNum) {
                curPoints += 20
            }

            // Gifting
            if (((this.day % 7) + 1) <= this.giftNum) {
                curPoints += this.giftPoints
            }
            // +10 points if two gifts are given (awarded at the end of the week)
            if (this.giftNum == 2 && (this.day % 7) == 0 && this.day != 0) {
                curPoints += 10
            }

            // If function doesn't have a positive trend, prevent infinity loop, or if relationship 3 is selected
            if (this.day == this.timeout) {
                // Empty points array, marks as ungraphable, and leave loop
                console.log("Graph.calcPoints() timed out...")
                this.graphable = false
                break
            }

            this.points.push(curPoints)
            this.day++

        } while(curPoints <= (250 * this.maxH))

        // Calc maxW from days
        this.maxW = Math.ceil((this.day + 1) / 7)
    }

    getGraphable() {
        if (this.graphable && this.points.length == 0)
            this.calcPoints()
        
        return this.graphable 
    }

    getMaxWeeks() {
        return this.maxW
    }
}

/******************** Draw Graph on Canvas ********************/
function drawGraph(g) {
    if (!g.getGraphable()) {
        // Display "not graphable" text?
        graphOutput(("Timed out on day <mark>" + g.day + "</mark>"))
    } else {
        // Display max days below canvas, convert to years and seasons
        let t = ("Would reach max hearts in <mark>" + g.day + "</mark> days. ")
        let y = Math.floor(g.day / 112)
        let s = ((g.day % 112) / 28).toFixed(3)
        if (y > 0 || s > 0) 
            t += "This is equal to <mark>" + y + "</mark> years and <mark>" + s + "</mark> seasons in-game."

        graphOutput(t)
    }

    // Setup Graph Axes
    maxHearts = g.maxH
    maxWeeks = g.getMaxWeeks()
    draw.erase()
    drawAxes()

    emptyPointsTable()

    for (let i = 0; i < g.points.length; i++) {
        if (g.graphable)
            draw.circle(
                Math.round(origin[0] + ((weekSpacing / 7) * (i))),
                (origin[1] + (heartSpacing / 250) * g.points[i]),
                1, "#ffffff")
        
        // Also fill the points table
        addPointsRow(i, g.points[i])
    }
}

/******************** Draw Equation on Desmos ********************/
// Setup Desmos
var elt = document.getElementById('calculator')
var calculator = Desmos.GraphingCalculator(elt)
calculator.updateSettings({ 
    xAxisLabel: 'Time (Days)', 
    yAxisLabel: 'Points',
    
})
calculator.setMathBounds({
    left: 0,
    right: 20,
    bottom: 0,
    top: 2500
})

// Update new math bounds function
function setMathBoundsDesmos() {
    calculator.setMathBounds({
        left: 0,
        right: (maxWeeks * 8),
        bottom: 0,
        top: (maxHearts * 270)
    })
}

// Send model data to desmos
document.getElementById("sendToDesmosBtn").onclick = function() {
    // Check if it is graphable before sending data to desmos
    graphBtn.click()

    setMathBoundsDesmos()

    // Set points
    calculator.setExpression({
        id: 'points',
        type: 'table',
        columns: [
        {
            latex: 'x',
            values: ([...Array(mainGraph.points.length).keys()])
        },
        {
            latex: 'y',
            values: (mainGraph.points)
        }]
    })
}

// Send points equation to desmos
document.getElementById("pointsEquationBtn").onclick = function() {
    setMathBoundsDesmos()

    // Set equation
    calculator.setExpression({ id: 'graph1', latex: "p(x)=18*\\sin((x-2.5)*((2*\\pi)/7))+12.285x+15", color: Desmos.Colors.ORANGE })
}

// Send points rate of change equation to desmos
document.getElementById("rateEquationBtn").onclick = function() {
    setMathBoundsDesmos()

    // Set equation
    calculator.setExpression({ id: 'graph2', latex: "r(x)=((36\\pi)/7)*\\cos((x-2.5)*((2\\pi)/7))+12.285", color: Desmos.Colors.PURPLE })
}

// Send acceleration equation to desmos
document.getElementById("accelEquationBtn").onclick = function() {
    setMathBoundsDesmos()

    // Set equation
    calculator.setExpression({ id: 'graph3', latex: "a(x)=((-72\\pi^2)/49)*\\sin((x-2.5)*((2\\pi)/7))", color: Desmos.Colors.RED })
}

// Send changed parameter equation to desmos
document.getElementById("viewChangedParamBtn").onclick = function() {
    setMathBoundsDesmos()

    // Set equation
    calculator.setExpression({ id: 'graph4', latex: "p(x)=18*\\sin((x-2.5)*((2*\\pi)/7))+20x+15", color: Desmos.Colors.BLUE })
}