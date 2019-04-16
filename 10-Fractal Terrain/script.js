

// clase terreno
class Terrain{
  constructor(detail){
    this.size = Math.pow(2,detail) + 1;
    this.max = this.size -1;
    this.map = new Float32Array(this.size * this.size);
  }
}
