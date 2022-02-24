import cleanDeep from "clean-deep";
import equalDeep from "fast-deep-equal";
import mixinDeep from "mixin-deep";
import _ from "lodash";

const clean = (obj) => cleanDeep(obj);
const equal = (obj1, obj2) => equalDeep(obj1, obj2);
const mixin = (target, ...rest) => mixinDeep(target, ...rest);
const isEmpty = (obj) => _.isEmpty(obj);

export default {
  clean,
  equal,
  mixin,
  isEmpty,
};
