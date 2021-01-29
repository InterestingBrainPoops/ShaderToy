class Camera{
  constructor(pos, dir, size){
    this.focalDistance = 2; // Just going to hardcode this, change later
    this.pos = pos; // (x,y,z) 3D pVector
    this.dir = dir; // (x,y,z) 3D pVector
    this.size = size; // [xsize, ysize] essentially the smallest resolution.
  }
  getScreen(scene){
    let ret = []
    for(let y = 0; y < this.size[1]; y++){
      let row = [];
      for(let x = 0; x < this.size[0]; x++){
        let pRay = p5.Vector.add(this.pos, p5.Vector.mult(this.dir, this.focalDistance))
        let offset = createVector();
        offset.x = this.size[0]/ (2*this.size[0]+2);
        offset.y = this.size[1]/ (2*this.size[1]+2);
        let coord = createVector(offset.x + this.size[0]/(this.size[0]+1)*x, offset.y + this.size[1]/(this.size[1]+1)*y)
        coord.sub(this.size[0]/2, 0, 0);

        pRay.add(coord)
        pRay = new Ray(this.pos, pRay);
        let record = Infinity;
        let closest;
        for(let sphere in scene.objects){
          let touchdist = pRay.checkIntersection(sphere);
          if(touchdist){
            if (touchdist < record){
              record = touchdist;
            }
          }
        }
        print(record)
        if(record != Infinity){
          let sRay = new Ray(pRay.getPoint(record), scene.light.pos);
          let record = Infinity;
          let closest;
          for(let sphere in scene.objects){
            let touchdist = sRay.checkIntersection(sphere);
            if(touchdist){
              if (touchdist < record){
                record = touchdist;
              }
            }
          }
          if(record != Infinity){
            row.push(color(0,0,0));
          }else{
            row.push(color(255,0,0));
          }
        }
      }
      ret.push(row);
    }
    return ret
  }
}