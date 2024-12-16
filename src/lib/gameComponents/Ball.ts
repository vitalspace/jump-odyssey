export class Ball {
  self: any;
  obeject: any;

  constructor(self: any) {
    this.self = self;
  }

  init() {
    this.obeject = this.self.add.sphere(
      { radius: 0.8, x: 0, y: 6.4, z: 2.5 },
      { lambert: { color: "yellow" } }
    );

    this.obeject.name = "ball";
    this.self.add.existing(this.obeject);
    this.self.physics.add.existing(this.obeject);
    // this.obeject.body.setAngularFactor(0, 0, 0);
    this.obeject.body.setLinearFactor(0, 1, 0);
    // this.obeject.body.setBounciness(0.2);
    this.obeject.body.setGravity(0, -30, 0);

    return this.obeject;
  }
}
