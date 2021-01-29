class Scene{
  constructor(){
    this.objects = [];
    this.light;
  }
  addSphere(sphere){
    this.objects.push(sphere);
  }
  setLight(light){
    this.light = light;
  }
}
