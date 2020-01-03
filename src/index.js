import _ from 'lodash'; 
// import style from './style.css';
// console.log(style.toString());
import './style.css'; // importしてるcssをcss-loaderがバンドルしてくれる

import logo from './logo.png'
import minilogo from './minilogo.png'

// 関数のimportは{}でかこう。
// import { NAME, NiJou } from './utilities' // .jsは省略可能
// console.log(NiJou(22));
// console.log(NAME);
// import * as utilities from './utilities'
// console.log(utilities.NiJou(222));
// console.log(utilities.NAME);
// import {NAME as NAME_OF_HAM} from './utilities'
// console.log(NAME_OF_HAM);

import Tiger from './utilities'
console.log(Tiger.say());

function component() {
  const element = document.createElement('div');
  const array = ["Hello", 'webpack'];
  element.innerHTML = _.join(array, ' ');
  return element;
}

document.body.appendChild(component());
document.body.classList.add('haikei');

const image1 = new Image()
image1.src = logo
document.body.appendChild(image1)

const image2 = new Image()
image2.src = minilogo
document.body.appendChild(image2)
