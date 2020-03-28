class Prostokat {
    constructor(wysokosc, szerokosc) {
        this.wysokosc = wysokosc;
        this.szerokosc = szerokosc;
    }
}

let rects = [new Prostokat(100, 100), new Prostokat(50, 50)];

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'w') {
        rects[0].szerokosc += 10;
    }
    draw();
});


function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, rects[0].szerokosc, rects[0].wysokosc);
        ctx.fillStyle = 'rgb(0, 0, 200)';
        ctx.fillRect(300, 300, rects[1].szerokosc, rects[1].wysokosc);
    }
}