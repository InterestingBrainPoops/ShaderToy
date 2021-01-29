class Ray{
  constructor(p1, p2){
    this.pos = p1;


    this.dir = p5.Vector.sub(p2, p1).normalize();
  }
  checkIntersection(sphere){
    // The formula used here can be found here:
    // https://en.wikipedia.org/wiki/Line-sphere_intersection#Calculation_using_vectors_in_3D

    // Translating current variables into wikipedia variables.
    const p1 = p5.Vector.dot(this.dir, p5.Vector.sub(this.pos, sphere.pos)); // Part 1
    const del = p1**2 - (p5.Vector.sub(this.pos, sphere.pos).magSq() - sphere.r**2)// look for the upside down delta symbol in the wikipedia page.
    const pp1 = -p1;
    //print(del.toString());
    //print(p1.toString());
    //(pp1.toString());
    if(del < 0){
      //print("got here")
      return;
    }
    if(del == 0){
      return [pp1, 1];
    }
    if(del > 0){
      // print("Got here")
      return [pp1 - sqrt(del), pp1 + sqrt(del), 2]
    }
  }
  getPoint(dist){
    return p5.Vector.add(this.pos, p5.Vector.mult(this.dir, dist));
  }
}