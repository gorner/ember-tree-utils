import { Promise } from "rsvp";
import { later } from "@ember/runloop";

export default function delay(ms) {
  ms = ms || 1500;
  return new Promise(function (resolve) {
    later(this, resolve, ms);
  });
}
