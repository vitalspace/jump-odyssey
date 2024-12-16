// Script for the fake ground
// Sorry for the anyScript but it works

export class FakeGround {
  self: any;

  constructor(self: any) {
    this.self = self;
  }

  init() {
    const ground = this.self.add.box(
      {
        name: "fakeGround",
        width: 2,
        height: 0.1,
        depth: 2,
        x: 0,
        y: 0,
        z: 2,
      },
      {
        lambert: { color: "hotpink" },
      }
    );
    ground.visible = false; // set to true to see the ground
    this.self.add.existing(ground);
    this.self.physics.add.existing(ground, {
      collisionFlags: 2,
    });

    return ground;
  }
}
