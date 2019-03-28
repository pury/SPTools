

var MAX_ANGLE = Math.PI * .88;

function getRandom(min, max) {
    var d = max - min;
    return min + Math.random() * d;
}

function getDistance(v1, v2) {
    return Math.sqrt(getDistanceSquare(v1, v2));
}

function getDistanceSquare(v1, v2) {
    var dx = v2.x - v1.x;
    var dy = v2.y - v1.y;
    return dx * dx + dy * dy;
}

function getAngleWithX_axis(v1, v2) {
    var distance = getDistance(v1, v2);
    var dx = v2.x - v1.x;
    var cosA = dx / distance;
    if (v2.y >= v1.y) {
        return Math.acos(cosA);
    } else {
        return 2 * Math.PI - Math.acos(cosA);
    }
}

function getMiddleSlope(a, b, c) {
    var a1 = getAngleWithX_axis(b, a);
    var a2 = getAngleWithX_axis(b, c);
    var a3 = (a1 + a2) / 2;
    return Math.tan(a3);
}

function getAngle(a, b, c) {
    var a1 = getAngleWithX_axis(b, a);
    var a2 = getAngleWithX_axis(b, c);
    var ret = Math.abs(a1 - a2);
    if (ret > Math.PI) {
        return Math.PI * 2 - ret;
    } else {
        return ret;
    }
}

var ON_LEFT_SIDE = 1;
var ON_RIGHT_SIDE = 2;
var ON_LINE_IN = 3;
var ON_LINE_OUT = 4;
//return point p's position regards vector v1 to v2
function getPointOnVectorSide(v1, v2, p) {
    var a1 = getAngleWithX_axis(v1, v2);
    var a2 = getAngleWithX_axis(v1, p);
    if (Math.abs(a1 - a2) < 0.001 || Math.abs(a1 - a2 - Math.PI) < 0.001) {
        if (isBetween(p.x, v1.x, v2.x) && isBetween(p.y, v1.y, v2.y)) {
            return ON_LINE_IN;
        }
        return ON_LINE_OUT;
    }
    if (a1 <= Math.PI) {
        if (a2 < a1 || a2 - a1 > Math.PI) {
            return ON_LEFT_SIDE;
        } else {
            return ON_RIGHT_SIDE;
        }
    } else {
        if (a2 > a1 || a1 - a2 > Math.PI) {
            return ON_RIGHT_SIDE;
        } else {
            return ON_LEFT_SIDE;
        }
    }
}

function threePointInOneLine(v1, v2, v3) {
    if (v1.x == v2.x) {
        return v3.x == v2.x;
    }
    if (v2.x == v3.x) {
        return v1.x == v2.x;
    }
    var k12 = (v1.y - v2.y)/(v1.x - v2.x);
    var k23 = (v3.y - v2.y)/(v3.x - v2.x);
    return Math.abs(k12 - k23) < 0.001;
}

function pointInTriangle2(p, triangle) {
    var side1 = getPointOnVectorSide(p, triangle.v1, triangle.v2);
    if (side1 == ON_LINE_IN) {
        return true;
    } else if (side1 == ON_LINE_OUT) {
        return false;
    }
    var side2 = getPointOnVectorSide(p, triangle.v2, triangle.v3);
    if (side2 == ON_LINE_IN) {
        return true;
    } else if (side2 == ON_LINE_OUT) {
        return false;
    }
    var side3 = getPointOnVectorSide(p, triangle.v3, triangle.v1);
    if (side3 == ON_LINE_IN) {
        return true;
    } else if (side3 == ON_LINE_OUT) {
        return false;
    }

    if (side1 == side2 && side2 == side3) {
        return true;
    }
    return false;
}

//return true if number m is between a and b
function isBetween(m, a, b) {
    if (m >= a && m <= b) {
        return true;
    }
    if (m >= b && m <= a) {
        return true;
    }
    return false;
}

function pointInTriangle(p, triangle) {
    var v1 = triangle.v1;
    var v2 = triangle.v2;
    var v3 = triangle.v3;
    var y1 = getXaxisCross(p.x, v1, v2);
    var y2 = getXaxisCross(p.x, v1, v3);
    var y3 = getXaxisCross(p.x, v2, v3);
    if (y1 == p.y || y2 == p.y) {
        return true;
    }
    if (isBetween(y1, v1.y, v2.y)) {
        if (isBetween(y2, v1.y, v3.y)) {
            if (isBetween(p.y, y1, y2)){
                return true;
            }
            return false;
        } else {
            if (isBetween(p.y, y1, y3)) {
                return true;
            }
            return false;
        }
    } else {
        if (isBetween(y2, v1.y, v3.y)) {
            if (isBetween(p.y, y2, y3)) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}

function getXaxisCross(x, v1, v2) {
    var y = (v1.x * v2.y - v2.x * v1.y - x * v2.y + x * v1.y) / (v1.x - v2.x);
    return y;
}

function getCrossPoint(k1, v1, k2, v2) {
    var cross_x = (v2.y - k2 * v2.x - v1.y + k1 * v1.x) / (k1 - k2);
    var cross_y = (k1 * v2.y - k2 * v1.y - k1 * k2 * (v2.x - v1.x)) / (k1 - k2);
    return new Vertex(cross_x, cross_y);
}

function getPointToLineDistance(p, start, end) {
    var a = end.y - start.y;
    var b = start.x - end.x;
    var c = end.x * start.y - start.x * end.y;
    var d = Math.abs(a * p.x + b * p.y + c) / Math.sqrt(a*a + b*b);
    return d;
}

function getCrossPoint2(start1, end1, start2, end2) {
    var a1 = end1.y - start1.y;
    var b1 = start1.x - end1.x;
    var c1 = end1.x * start1.y - start1.x * end1.y;
    var a2 = end2.y - start2.y;
    var b2 = start2.x - end2.x;
    var c2 = end2.x * start2.y - start2.x * end2.y;
    var denominator = (a2 * b1 - a1 * b2);
    if (denominator == 0) {
        return null;
    }
    var x = (b2 * c1 - b1 * c2) / denominator;
    var y = (a1 * c2 - a2 * c1) / denominator;
    return new Vertex(x, y);
}

function lineSegmentCross(p1, p2, q1, q2) {
    if (p1.equals(q1) || p1.equals(q2) || p2.equals(q1) || p2.equals(q2)) {
        return true;
    }
    var cross = getCrossPoint2(p1, p2, q1, q2);
    if (cross == null) {
        //the two line is parallel
        if (getPointOnVectorSide(p1, p2, q1) == ON_LINE_IN || getPointOnVectorSide(p1, p2, q2) == ON_LINE_IN) {
            return true;
        }
        return false;
    }
    if (isBetween(cross.x, p1.x, p2.x) && isBetween(cross.x, q1.x, q2.x) &&
        isBetween(cross.y, p1.y, p2.y) && isBetween(cross.y, q1.y, q2.y)) {
        return true;
    }
    return false;
}

function Vertex(x, y) {
    this.x = x;
    this.y = y;
    this.id = "unknown";
    this.equals = function(other) {
        if (other == null) {
            return false;
        }
        if (other.x == this.x && other.y == this.y) {
            return true;
        }
        return false;
    }

    this.toString = function() {
        return "(" + parseInt(this.x) + " | " + parseInt(this.y) + ")";
    }

    this.init = function(str) {
        var str1 = str.substring(1, str.length-1);
        var arr = str1.split("|");
        this.x = parseInt(arr[0]);
        this.y = parseInt(arr[1]);
    }

    this.emphasizeDraw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 8, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.strokeStyle = "#00aa00";
        ctx.stroke();
    }

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = "#0000ff";
        ctx.fill();
    }

    this.drawId = function(ctx) {
        ctx.font = "24px Courier New";
        ctx.fillStyle = "orange";
        ctx.fillText(this.id, this.x, this.y);
    }
}

function Triangle(v1, v2, v3) {
    this.id = "t";
    this.isObstacle = false;
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
    this.max = v1;
    this.min = v1;
    var boundX = Math.min(v1.x, v2.x, v3.x);
    var upperX = Math.max(v1.x, v2.x, v3.x);
    var boundY = Math.min(v1.y, v2.y, v3.y);
    var upperY = Math.max(v1.y, v2.y, v3.y);
    this.a1 = getAngle(v2, v1, v3);
    this.a2 = getAngle(v3, v2, v1);
    // var a3 = getAngle(v1, v3, v2);
    this.a3 = Math.PI - this.a1 - this.a2;
    this.maxAngle = Math.max(this.a1, this.a2, this.a3);
    this.isValid = this.maxAngle < MAX_ANGLE ? true : false;
    var innerPoint = new Vertex(1, 1);
    innerPoint.x = (this.v1.x/2 + this.v2.x/2 + this.v3.x) / 2;
    innerPoint.y = (this.v1.y/2 + this.v2.y/2 + this.v3.y) / 2;

    this.drawId = function(ctx) {
        ctx.font = "12px Courier New";
        ctx.fillStyle = "red";
        ctx.fillText(this.id, innerPoint.x, innerPoint.y);
    }

    this.draw = function(ctx) {
        if (this.isValid) {
            if (this.isObstacle) {
                ctx.beginPath();
                ctx.moveTo(v1.x, v1.y);
                ctx.lineTo(v2.x, v2.y);
                ctx.lineTo(v3.x, v3.y);
                ctx.lineTo(v1.x, v1.y);
                ctx.closePath();
                ctx.fillStyle = "#636363";
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.moveTo(v1.x, v1.y);
                ctx.lineTo(v2.x, v2.y);
                ctx.lineTo(v3.x, v3.y);
                ctx.lineTo(v1.x, v1.y);
                ctx.closePath();
                ctx.strokeStyle = "#ff0000";
                ctx.stroke();
                // ctx.fillStyle = "#ffffff";
                // ctx.fill();
            }
        } else {
            ctx.beginPath();
            ctx.moveTo(v1.x, v1.y);
            ctx.lineTo(v2.x, v2.y);
            ctx.lineTo(v3.x, v3.y);
            ctx.lineTo(v1.x, v1.y);
            ctx.closePath();
            ctx.fillStyle = "#a3a3a3";
            ctx.fill();
        }
        // this.drawId(ctx);
    }

    this.contains = function(p) {
        if (!isBetween(p.x, boundX, upperX) || !isBetween(p.y, boundY, upperY)) {
            return false;
        }
        return pointInTriangle2(p, this);
    }

    // this.toString = function() {
    //     return "[" + v1.toString() + ", " + v2.toString() + ", " + v3.toString() + "]";
    // }

    this.toString = function () {
        return "(" + v1.id + ", " + v2.id + ", " + v3.id + ")";
    }

    this.equals = function(other) {
        if (other == null) {
            return false;
        }
        if (this.toString() == other.toString()) {
            return true;
        }
        return false;
    }
}

function Circle(center, radius) {
    this.center = center;
    this.radius = radius;

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, 5, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = "#ffaa00";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.strokeStyle = "#ff0000";
        ctx.stroke();
    }
}

function getCircumcircle(triangle) {
    var v1 = triangle.v1;
    var v2 = triangle.v2;
    var v3 = triangle.v3;
    var circumcircleCenter;
    var circumcircleRadius;
    var m12 = new Vertex((v1.x + v2.x)/2, (v1.y + v2.y)/2);
    var m23 = new Vertex((v2.x + v3.x)/2, (v2.y + v3.y)/2);
    var k12 = (v2.x - v1.x) / (v1.y - v2.y);
    var k23 = (v3.x - v2.x) / (v2.y - v3.y);
    if (k12 == k23) {
        return null;
    }
    if (v1.y == v2.y) {
        var x = (v1.x + v2.x) / 2;
        var y = k23 * (x - m23.x) + m23.y;
        circumcircleCenter = new Vertex(x, y);
    } else if (v2.y == v3.y) {
        var x = (v3.x + v2.x) / 2;
        var y = k12 * (x - m12.x) + m12.y;
        circumcircleCenter = new Vertex(x, y);
    } else {
        circumcircleCenter = getCrossPoint(k12, m12, k23, m23);
    }
    circumcircleRadius = getDistance(circumcircleCenter, v1);

    return new Circle(circumcircleCenter, circumcircleRadius);
}

function findSimplifyPath(start, end, edges) {
    var points = [start];
    if (crossWithAllEdges(start, end, edges, 0)) {
        points.push(end);
        return points;
    }
    var leftPoint = null;
    var rightPoint;
    var leftPointMaybe;
    var rightPointMaybe;
    var begin = start;
    var i = 0;
    if (getPointToLineDistance(start, edges[0][0], edges[0][1]) < 0.1) {
        i = 1;
    }
    for (; i < edges.length; i++) {
        if (edges[i][0].equals(begin) || edges[i][1].equals(begin)) {
            continue;
        }
        if (leftPoint == null) {
            if (getPointOnVectorSide(begin, edges[i][0], edges[i][1]) == ON_LEFT_SIDE) {
                leftPoint = edges[i][1];
                rightPoint = edges[i][0];
            } else {
                leftPoint = edges[i][0];
                rightPoint = edges[i][1];
            }
            continue;
        }
        if (edges[i][0].equals(leftPoint) || edges[i][1].equals(leftPoint)) {
            if (i == edges.length - 1) {
                points.push(leftPoint);
                points.push(end);
                break;
            }
            rightPointMaybe = edges[i][0].equals(leftPoint) ? edges[i][1] : edges[i][0];
            if (getPointOnVectorSide(begin, leftPoint, rightPointMaybe) != ON_RIGHT_SIDE) {
                points.push(leftPoint);
                begin = leftPoint;
                leftPoint = null;
                if (crossWithAllEdges(begin, end, edges, i)) {
                    points.push(end);
                    break;
                }
            } else if (getPointOnVectorSide(begin, rightPoint, rightPointMaybe) == ON_LEFT_SIDE) {
                rightPoint = rightPointMaybe;
            }
        } else if (edges[i][0].equals(rightPoint) || edges[i][1].equals(rightPoint)) {
            if (i == edges.length - 1) {
                points.push(rightPoint);
                points.push(end);
                break;
            }
            leftPointMaybe = edges[i][0].equals(rightPoint) ? edges[i][1] : edges[i][0];
            if (getPointOnVectorSide(begin, rightPoint, leftPointMaybe) != ON_LEFT_SIDE) {
                points.push(rightPoint);
                begin = rightPoint;
                leftPoint = null;
                if (crossWithAllEdges(begin, end, edges, i)) {
                    points.push(end);
                    break;
                }
            } else if (getPointOnVectorSide(begin, leftPoint, leftPointMaybe) == ON_RIGHT_SIDE) {
                leftPoint = leftPointMaybe;
            }
        } else {
            var left0 = getPointOnVectorSide(begin, leftPoint, edges[i][0]);
            var right0 = getPointOnVectorSide(begin, rightPoint, edges[i][0]);
            var left1 = getPointOnVectorSide(begin, leftPoint, edges[i][1]);
            var right1 = getPointOnVectorSide(begin, rightPoint, edges[i][1]);
            if (left0 == left1 && left0 == ON_LEFT_SIDE) {
                points.push(leftPoint);
                begin = leftPoint;
                if (getPointOnVectorSide(begin, edges[i][0], edges[i][1]) == ON_LEFT_SIDE) {
                    points.push(edges[i][0]);
                    begin = edges[i][0];
                } else {
                    points.push(edges[i][1]);
                    begin = edges[i][1];
                }
                leftPoint = null;
                if (crossWithAllEdges(begin, end, edges, i)) {
                    points.push(end);
                    break;
                }
            } else if (right0 == right1 && right0 == ON_RIGHT_SIDE) {
                points.push(rightPoint);
                begin = rightPoint;
                if (getPointOnVectorSide(begin, edges[i][0], edges[i][1]) == ON_RIGHT_SIDE) {
                    points.push(edges[i][0]);
                    begin = edges[i][0];
                } else {
                    points.push(edges[i][1]);
                    begin = edges[i][1];
                }
                leftPoint = null;
                if (crossWithAllEdges(begin, end, edges, i)) {
                    points.push(end);
                    break;
                }
            } else if (left0 == ON_LEFT_SIDE && right1 == ON_LEFT_SIDE) {
                rightPoint = edges[i][1];
                if (addRightPoints(points, begin, leftPoint, rightPoint, i, end, edges)) {
                    begin = rightPoint;
                    leftPoint = null;
                    if (crossWithAllEdges(begin, end, edges, i)) {
                        points.push(end);
                        break;
                    }
                }
            } else if (left1 == ON_LEFT_SIDE && right0 == ON_LEFT_SIDE) {
                rightPoint = edges[i][0];
                if (addRightPoints(points, begin, leftPoint, rightPoint, i, end, edges)) {
                    begin = rightPoint;
                    leftPoint = null;
                    if (crossWithAllEdges(begin, end, edges, i)) {
                        points.push(end);
                        break;
                    }
                }
            } else if (right0 == ON_RIGHT_SIDE && left1 == ON_RIGHT_SIDE) {
                leftPoint = edges[i][1];
                if (addLeftPoints(points, begin, leftPoint, rightPoint, i, end, edges)) {
                    begin = leftPoint;
                    leftPoint = null;
                    if (crossWithAllEdges(begin, end, edges, i)) {
                        points.push(end);
                        break;
                    }
                }
            } else if (right1 == ON_RIGHT_SIDE && left0 == ON_RIGHT_SIDE) {
                leftPoint = edges[i][0];
                if (addLeftPoints(points, begin, leftPoint, rightPoint, i, end, edges)) {
                    begin = leftPoint;
                    leftPoint = null;
                    if (crossWithAllEdges(begin, end, edges, i)) {
                        points.push(end);
                        break;
                    }
                }
            }
        }
    }
    return points;
}
