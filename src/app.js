// import './scss/main.scss';

class ES6Test {
    getText() {
        return 'Hello World From ES6';
    }
}

const es6Test = new ES6Test;

console.log('Winning!');

const testje = { a: 1 };
const testje2 = { ...testje, b: 2 };

document.querySelector('h1').textContent = es6Test.getText();
