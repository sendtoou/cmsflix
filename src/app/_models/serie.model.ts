import {Deserializable} from "./deserializable.model";

export class Serie { //implements Deserializable
  id: string;
  globalName: string;
  // title: string;
  title: {
    th: String,
    en: String,
    ch: String
  };

  // deserialize(input: any): this {
  //   Object.assign(this, input);
  //   return this;
  // }
}

// export class Availability {
//   days: string  = "";
//   hours: string = "";
// }

// export class Employee {
//   firstName: string = "";
//   lastName:  string = "";
//   email:     string = "";

//   availability = new Availability()
// }