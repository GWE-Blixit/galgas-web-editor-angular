export class Version {
  constructor(public M = 0, public m = 0, public r = 0) {
  }

  toString() {
      return this.M + '.' + this.m + '.' + this.r;
  }
}
