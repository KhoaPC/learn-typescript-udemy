const c = console.log;

// class decorator
function setProperty(ctr: Function) {
    ctr.prototype.id = Math.random().toString();
    ctr.prototype.dateCreated = new Date().toLocaleString();
}

@setProperty
class User {
    constructor(public name: string) { }
}

const user1 = new User('Khoa');
// c(user1);

// method decorator
function autoBind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescripttor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescripttor;
} // autoBind

class Person {
    private name: string;
    private age: number;

    constructor(n: string, a: number) {
        this.name = n;
        this.age = a;
    }
    @autoBind
    getName() {
        c(this.name);
    }
}

const person1 = new Person('Khoa', 16);
person1.getName()


// Property decorator
function propertyChange(target: any, key: string) {

    let result = target[key];

    const getFunc = function () {
        return result;
    };

    const setFunc = function (newResult: string) {
        result = `Hello ${newResult}`;

        return result;
    };

    const description = {
        enumerable: true,
        configurable: true,
        get: getFunc,
        set: setFunc
    }

    Object.defineProperty(target, key, description);
}

class PersonX {
    public firstname: string = 'Luong';

    @propertyChange
    public lastName: string = "Khoa";
}

const employeeInstance = new PersonX();
// c(employeeInstance);


// accessor decorator
function Enumerable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Object.defineProperty(target, `_${propertyKey}`, {
        writable: true
    });
}

class PersonN {
    _name: string;
    
    constructor(name: string) {
        this._name = name;
    }

    @Enumerable
    get name() {
        return this._name;
    }
}

let person = new PersonN("Khoa");
person._name = 'Tèo';
// c(person);


// parameter decorator
function LogParamenter(
    target: any,
    propertyKey: string,
    parameterIndex: number,
) {
    c('target: ',target);
    c('propertyKey: ',propertyKey);
    c('parameterIndex: ' ,parameterIndex);
}

class Demo {
    public foo(@LogParamenter a: any,  b: any) {
        c("Hi");
    }
}

const test = new Demo();
test.foo("Aaaa", "Bbbb");