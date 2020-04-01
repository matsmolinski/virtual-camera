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

class Camera {
    constructor() {
        this.polygons = [new Polygon([new Point3D(10, 10, 20), new Point3D(20, 10, 20), new Point3D(20, 20, 20), new Point3D(10, 20, 20)]),
            new Polygon([new Point3D(10, 10, 30), new Point3D(20, 10, 30), new Point3D(20, 20, 30), new Point3D(10, 20, 30)]),
            new Polygon([new Point3D(20, 10, 20), new Point3D(20, 10, 30), new Point3D(20, 20, 30), new Point3D(20, 20, 20)]),
            new Polygon([new Point3D(10, 10, 20), new Point3D(10, 10, 30), new Point3D(10, 20, 30), new Point3D(10, 20, 20)]),

            new Polygon([new Point3D(-10, 10, 20), new Point3D(-20, 10, 20), new Point3D(-20, 20, 20), new Point3D(-10, 20, 20)]),
            new Polygon([new Point3D(-10, 10, 30), new Point3D(-20, 10, 30), new Point3D(-20, 20, 30), new Point3D(-10, 20, 30)]),
            new Polygon([new Point3D(-20, 10, 20), new Point3D(-20, 10, 30), new Point3D(-20, 20, 30), new Point3D(-20, 20, 20)]),
            new Polygon([new Point3D(-10, 10, 20), new Point3D(-10, 10, 30), new Point3D(-10, 20, 30), new Point3D(-10, 20, 20)])];
        this.distance = 100;
    }

    move(x, y, z) {
        let matrix = [
            [1, 0, 0, x],
            [0, 1, 0, y],
            [0, 0, 1, z],
            [0, 0, 0, 1]]
        this.multiply(matrix);
    }

    rotateOX(direction) {
        const angle = direction * Math.PI / 60
        let matrix = [
            [1, 0, 0, 0],
            [0, Math.cos(angle), -1 * Math.sin(angle), 0],
            [0, Math.sin(angle), Math.cos(angle), 0],
            [0, 0, 0, 1]];
        this.multiply(matrix);
    }

    rotateOY(direction) {
        const angle = direction * Math.PI / 60
        let matrix = [
            [Math.cos(angle), 0, Math.sin(angle), 0],
            [0, 1, 0, 0],
            [-1 * Math.sin(angle), 0, Math.cos(angle), 0],
            [0, 0, 0, 1]];
        this.multiply(matrix);
    }

    rotateOZ(direction) {
        const angle = direction * Math.PI / 60
        let matrix = [
            [Math.cos(angle), -1 * Math.sin(angle), 0, 0],
            [Math.sin(angle), Math.cos(angle), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]];
        this.multiply(matrix);
    }

    multiply(matrix) {
        let newPolygons = [];
        this.polygons.forEach((polygon) => {
            let newPoints = [];
            polygon.points.forEach((point) => {
                const pointVec = [point.x, point.y, point.z, 1];
                let newPoint = math.multiply(matrix, pointVec);
                newPoints.push(new Point3D(newPoint[0], newPoint[1], newPoint[2]));
            });
            newPolygons.push(new Polygon(newPoints));
        });
        this.polygons = newPolygons;
    }

}


let camera = new Camera();
let translated = false;

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === '+' || keyName === '=') {
        camera.distance = camera.distance + 10;
    }

    if (keyName === '-' && camera.distance - 10 > 0) {
        camera.distance = camera.distance - 10;
    }



    if (keyName === 'ArrowUp') {
        camera.move(0, 0, -1);
    }

    if (keyName === 'ArrowDown') {
        camera.move(0, 0, 1);
    }

    if (keyName === 'ArrowLeft') {
        camera.move(1, 0, 0);
    }

    if (keyName === 'ArrowRight') {
        camera.move(-1, 0, 0);
    }

    if (keyName === 'PageUp') {
        camera.move(0, 1, 0);
    }

    if (keyName === 'PageDown') {
        camera.move(0, -1, 0);
    }



    if (keyName === 'w') {
        camera.rotateOX(-1);
    }

    if (keyName === 's') {
        camera.rotateOX(1);
    }

    if (keyName === 'a') {
        camera.rotateOY(1);
    }

    if (keyName === 'd') {
        camera.rotateOY(-1);
    }

    if (keyName === 'q') {
        camera.rotateOZ(-1);
    }

    if (keyName === 'e') {
        camera.rotateOZ(1);
    }
    draw();
});


function draw() {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        const context = canvas.getContext('2d');
        if (!translated) {
            context.translate(canvas.width / 2, canvas.height / 2);
            translated = true;
        }
        context.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        camera.polygons.forEach((polygon) => {
            let points = [];
            polygon.points.forEach((point) => {
                projected_point = point3Dto2D(point);
                if (typeof projected_point != "undefined") {
                    points.push(projected_point);
                }
            });
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
    z = point3D.z;
    if (point3D.z < 0) {
        z = 0.000001;
    }
    x = point3D.x * (camera.distance / z);
    y = point3D.y * (camera.distance / z);
    return new Point2D(x, y);
}
