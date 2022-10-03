const c = console.log;

class Person {
    static year: number = 2022; // class.static
    private favoriteColor: string[] = [];

    /* private*/ constructor(public name: string, public age: number, private readonly id: string) {
        this.name = name;
        this.age = age;
        this.id = id;
    }

    public get _age() {
        return this.age;
    } // getter

    public set _age(a: number) {
        if (a <= 0 || a >= 150)
            throw new Error('Err');
        this.age = a;
    } // setter

    public sayHello(this: Person) { // Declaring this in a Function
        c(`Hello ${this.name}`);
    }

    public addFavoriteColor(color: string) {
        this.favoriteColor.push(color);
    }

    public printFavoriteColor() {
        c(this.favoriteColor);
    }
}

const me = new Person('Khoa', 16, '29092006');

me.addFavoriteColor('Blue');
me.addFavoriteColor('Green');
me.printFavoriteColor();
c(Person.year);

// class Foo extends Person{
    // constructor(id: string) {
//         super('Teo', 10,'30052012')
//     }
// }
// const foo = new Foo('9999999999');
// c(foo)