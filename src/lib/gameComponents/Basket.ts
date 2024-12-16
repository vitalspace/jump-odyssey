import { THREE } from "enable3d";

// Sorry for the anyScript but it works

type position = {
  x: number;
  y: number;
  z: number;
};

type rotation = {
  x: number;
  y: number;
  z: number;
};

export class Basket {
  name(name: any) {
    throw new Error("Method not implemented.");
  }
  id: number;
  head: any;
  body: any;
  position: any;
  rotation: any;
  self: any;
  basket: any;
  dot: any;
  uuid: any;

  constructor(id: number, position: position, rotation: rotation, self: any) {
    this.id = id;
    this.position = position;
    this.rotation = rotation;
    this.self = self;
  }

  init() {
    this.basket = new THREE.Group();

    this.dot = this.self.add.cylinder(
      {
        name: "dot",
        radiusTop: 0.5,
        radiusBottom: 0.5,
        height: 0.1,
        x: 0,
        y: 2.46,
        z: 2,
      },
      {
        lambert: { color: "black" },
      }
    );

    this.head = this.self.add.cylinder(
      {
        name: "head",
        width: 0.1,
        height: 0.2,
        radiusSegments: 10,
        x: 0,
        y: 2.4,
        z: 2,
      },
      {
        lambert: { color: "orange" },
      }
    );

    this.body = this.self.add.cylinder(
      {
        name: "body",
        width: 10,
        height: 5,
        radiusSegments: 10,
        radiusTop: 1,
        radiusBottom: 1,
      },
      {
        lambert: { color: "hotpink" },
      }
    );

    this.basket.name = "basket-" + this.id;
    this.basket.position.set(this.position.x, this.position.y, this.position.z);
    this.basket.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.basket.add(this.head, this.body, this.dot);
    this.self.add.existing(this.basket);
    this.self.physics.add.existing(this.basket, {
      collisionFlags: 2,
    });

    return this.basket;
  }
}
