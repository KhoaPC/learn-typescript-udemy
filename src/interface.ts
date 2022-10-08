const c = console.log;
// type AddFunc = (a:number, b:number) => number;

interface AddFunc {
    (a: number, b:number): number;
}

let add: AddFunc;

add = (n1:number, n2: number) => {
    return n1 + n2;
}

interface Named {
    readonly name: string; // readonly: declared only once when initialized.can be accessed outside of classes but cannot be changed
    outputName?: string; // ? Optional Parameters
}

interface Greetable extends Named {
    hi(text: string): void;
}

class Person implements Greetable, Named {
    name: string;
    age: number;
    constructor(n: string, a: number) {
        this.name = n;
        this.age = a;
    }

    hi(text: string) {
        c(`${text} ${this.name}`);
    }
}

let me = new Person('Khoa', 16);
me.hi('Hi');