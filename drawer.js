class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Point3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Line {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
}

class Polygon {
    constructor(points) {
        this.points = points;
    }
}

let polygons = [new Polygon([new Point3D(500, 200, 10), new Point3D(550, 200, 10), new Point3D(550, 100, 10), new Point3D(500, 100, 10)]),
                new Polygon([new Point3D(20, 20, 10), new Point3D(20, 20, 20), new Point3D(20, 10, 20), new Point3D(20, 10, 10)])];
let distance = 10;

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === '+' || keyName === '=') {// dla wygody gdy nie ma klawiatury numerycznej
        distance = distance + 1;
    }

    if (keyName === '-') {
        distance = distance - 1;
    }
    draw();
});


function draw() {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        /*context.fillStyle = 'rgb(200, 0, 0)';
        context.fillRect(rects[0].szerokosc, rects[0].szerokosc, rects[0].szerokosc, rects[0].wysokosc);
        context.fillStyle = 'rgb(0, 0, 200)';
        context.fillRect(300, 300, rects[1].szerokosc, rects[1].wysokosc);*/
        polygons.forEach((polygon) => {
            let points = [];
            polygon.points.forEach((element) => {
                projected_point = point3Dto2D(element);
                if (typeof projected_point != "undefined") {
                    points.push(projected_point);
                }
            });
            console.log(points);
            drawPolygon(context, points);
        });      
    }
}

function drawPolygon(context, points) {
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    points.forEach((element) => {
        context.lineTo(element.x, element.y);
    })
    context.closePath();
    context.stroke();
}

function point3Dto2D(point3D) {
    console.log(point3D)
    console.log(point3D.x)
    console.log(point3D.y)
    console.log(point3D.z)
    if (point3D.z < 0) {
        z = 0.000001
    }
    x = point3D.x * (distance / point3D.z)
    y = point3D.y * (distance / point3D.z)
    return new Point2D(x, y)
}
    