import { Serie } from '../../_models/serie.model'
import { Deserializable } from "../../_models/deserializable.model";

export class Celeb  { //implements Deserializable
  // export interface Celeb {
  // name: string;
  name: {
    th: String,
    en: String,
    ch: String
  };
  description: {
    th: String,
    en: String,
    ch: String
  };
  filmography: Serie[];

  // deserialize(input: any): this {
  //   Object.assign(this, input);
  //   this.filmography = input.filmography.map((filmography: any) => new Serie().deserialize(filmography));
  //   // this.filmography = new Serie().deserialize(input.filmography)
  //   return this;
  // }
}

