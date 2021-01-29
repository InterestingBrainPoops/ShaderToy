let scene;
let camera;
let light;
async function render(lightPos) {
  let spheres = [new Sphere(1, createVector(-3, 3, -15)), new Sphere(1, createVector(3, -3, -15)), new Sphere(0.5, createVector(1, -1, -15)), new Sphere(2, createVector(3, 3, -15))]
  //let res = 1;
  background(100);
  noStroke();
  let invWidth = 1 / width;
  let invHeight = 1 / height;
  let fov = 30;
  print(-Math.PI / 2)
  let aspectratio = width / height;
  noStroke();
  let angle = tan(Math.PI * .5 * fov / 180)
  let startPos = createVector(0, 4.5, -8);
  let lims = createVector(width, height);
  print(spheres)
  for (let res = 2 ** 5; res >= 1; res /= 2) {
    fill(100)
    rect(0, 0, width, height);
    print(res)
    let totaltime = 0;
    let pixelscalculated = 0;
    let t0 = performance.now();
    for (let y = 0; y < lims.y; y += res) {
      for (let x = 0; x < lims.x; x += res) {
        //await new Promise(r => setTimeout(r, .005));
        pixelscalculated++;
        let yy = (1 - 2 * ((y + 0.5) * invHeight)) * angle;
        let xx = (2 * ((x + 0.5) * invWidth) - 1) * angle * aspectratio;
        //print(xx)
        let closest = null;
        let record = Infinity;
        let index;
        let pRay = new Ray(createVector(0, 0, 0), createVector(xx, yy, -1))
        for (let a = 0; a < spheres.length; a++) {
          let sphere = spheres[a]
          //print(sphere.r)
          if (pRay.checkIntersection(sphere)) {
            let hitdist = pRay.checkIntersection(sphere)[0];
            // print("toched this")
            if (hitdist < record) {
              // print(record)
              record = hitdist;
              closest = sphere;
              index = a;
            }
          }
        }
        if (closest) {
          // print(closest)
          let pHit = pRay.getPoint(record)
          let nHit = p5.Vector.sub(pHit, closest.pos);
          nHit.normalize();
          let inShadow = false;
          let sRay = new Ray(pRay.getPoint(pRay.checkIntersection(closest)[0]), lightPos)
          for (let a = 0; a < spheres.length; a++) {
            if (a != index) {
              if (sRay.checkIntersection(spheres[a])) {
                let sHit = sRay.checkIntersection(spheres[a]);
                if (sHit[0] < p5.Vector.sub(pHit, lightPos).mag() && sHit[0] > 0) {

                  inShadow = true;
                }
              }
            }
          }

          let deltabetween = sRay.dir.angleBetween(nHit);
          if (deltabetween > Math.PI / 2 || deltabetween < -Math.PI / 2) {
            inShadow = true;
          } else if (deltabetween < Math.PI / 2 && deltabetween > -Math.PI / 2 && !inShadow) {
            inShadow = false;
          }
          if (inShadow) {
            fill(0, 0, 0);
          } else {
            fill(0, 255, 0);
          }
        } else {
          noFill();
        }

        noStroke();
        rect(x, y, res, res);
      }
    }
    print((performance.now() - t0))
    print((performance.now() - t0) / pixelscalculated);
    await new Promise(r => setTimeout(r, 100));
  }
}
async function setup() {
  scene = new Scene();
  scene.addSphere(new Sphere(3, createVector(5, 3, -30)));
  scene.setLight((createVector(5, 5, 0)));
  createCanvas(640, 480);
  // let sphere = new Sphere(3,  createVector(0,0,-35));
  render(createVector(-2, 2, -15));
  await new Promise(r => setTimeout(r, 5000));
}


async function draw() {

}