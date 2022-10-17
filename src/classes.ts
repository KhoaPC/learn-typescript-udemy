const c = console.log;

class User {
    // public có thể truy cập ở bên ngoài class
    public empName: string;
    // protected không thể truy cập bên ngoài nhưng
    // có thể truy cập bên trong class hoặc các class con của nó
    protected empCode: number;

    constructor(name: string, code: number) {
        this.empName = name;
        // Truy cập bên trong lớp
        this.empCode = code;
    }
}

// extends : khai báo lớp kế thừa
class UserAgeUpdate extends User {
    private age: number;
    constructor(name: string, code: number, age: number) {
        // super: Kế thừa class cha
        super(name, code);
        this.age = age;
        // Truy cập bên trong lớp con
        c(this.empCode);
    }
}

let user1 = new UserAgeUpdate("Teo", 123546, 21);
c(user1);
// 123456
/*
age: 21
empCode: 123546
empName: "Teo"
*/

class Person {
    // static có thể gọi trực tiếp từ class mà không cần khởi tạo
    // class.static 
    static year: number = 2022; // Person.year 
    // private không thể truy xuất bên ngoài class 
    private favoriteColor: string[] = [];

    // readonly chỉ khai báo 1 lần khi khởi tạo
    constructor(public name: string, public age: number, readonly id: string) {
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

    // Khai báo method
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

me.addFavoriteColor('Blue'); // Add
me.addFavoriteColor('Green'); // Add
me.printFavoriteColor(); //  ['Blue', 'Green']
// Sử dụng property static
c(Person.year); //2022
