 export function NiJou(num) {
   return num ** 2;
 }
console.log(NiJou(10));

export const NAME = 'Ham';

export default class Lion { // defaultでexportされるのでこのファイルをimportするとdefault（特に指定しなくても）でLionクラスはimportされる
  static say() {
    return 'Roar'
  }
}
