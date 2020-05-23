// JavaScript for Stardew Friendship Website

/******************** Calculate Gift Points ********************/
function calcGift(type, quality) {
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
class Graph {
    constructor(relationship, talkNum, giftNum, giftPoints, birthdayBool, birthdayPoints, winterBool, winterPoints) {
        this.relationship = relationship
        this.talkNum = talkNum
        this.giftNum = giftNum
        this.giftPoints = giftPoints
        this.birthdayBool = birthdayBool
        this.birthdayPoints = birthdayPoints
        this.winterBool = winterBool
        this.winterPoints = winterPoints
        this.graphable = true
        this.maxW = 0
        this.maxH = 0
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

    getCurrentDecay(curPoints) {
        if (this.relationship == 0 || curPoints <= (250 * 8)) // Not romanceable and Romanceable, pre-bouquet
            return -2
        else if (curPoints <= (250 * 10)) // Romanceable, post-bouquet
            return -10
        else // Romanceable, married
            return -20
    }

    calcPoints() {
        console.log("Calculating points...")

        this.setMaxHearts() // Points goal
        let day = 1
        let curPoints = 0
        
        // Birthday and Winter Star gifts act as y-intercepts
        if (this.birthdayBool)
            curPoints += this.birthdayPoints
        if (this.winterBool)
            curPoints += this.winterPoints
        
        this.points.push(curPoints)

        do {
            // Decay
            curPoints += this.getCurrentDecay(curPoints)

            // Talking
            if (((day % 7) + 1) <= this.talkNum) {
                curPoints += 20
            }


            // Gifting
            // todo
            // +10 points if two gifts are given (awarded at the end of the week)


            if (day == 14 && curPoints <= 0) {
                // Empty points array, marks as ungraphable, and leave the loop
                // this.points = []
                this.graphable = false
                break
            }

            this.points.push(curPoints)
            day++

        } while(curPoints <= (250 * this.maxH))

        // Calc maxW from days, unless ungraphable
        // TODO
        if (this.graphable) {
            this.maxW = Math.ceil(day / 7)
        }

        console.log(this.points)
    }

    getGraphable() {
        if (this.graphable && this.points.length == 0)
            this.calcPoints()
        
        return this.graphable 
    }

    getMaxWeeks() {
        if (this.graphable) {
            return this.maxW
        } else {
            return 2
        }
    }
}

/******************** Draw Graph on Canvas ********************/
function drawGraph(g) {
    if (!g.getGraphable()) {
        // Display "not graphable" text?
        return
    }

    // Setup Graph Axes
    maxHearts = g.maxH
    maxWeeks = g.getMaxWeeks()
    draw.erase()
    drawAxes()

    for (let i = 0; i < test.points.length; i++) {
        draw.circle(
            Math.round(origin[0] + ((weekSpacing / 7) * (i))),
            (origin[1] + (heartSpacing / 250) * g.points[i]),
            0.5, "#ffffff")

    }

    // todo: display max weeks (or days) below canvas, convert to years ( maybe with seasons?)

    // todo: empty then fill table with points too
}

// For testing
var test = new Graph(1, 5, 0, 0, false, 0, false, 0)
test.calcPoints()
drawGraph(test)
