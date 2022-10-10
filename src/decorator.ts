const c = console.log;

// Param
// target: Hàm được decorator
// propertyKey: Tên `property` được decorator
// parameterIndex: Index của tham số được decorator
// descriptor: Object mô tả cấu hình của đối tượng được decorator

/* ------------------------------Class decorator START---------------------------- */
// Nó chỉnh sửa hoặc thêm `objects prototype` cho contructor của class
// param(target)
function createPrototype(target: Function) {
    // Tạo `objects prototype`
    target.prototype.greet = function () {
        return 'Hello ';
    }
}

@createPrototype
class User {
    constructor(public name: string) { }
}

const user1 = new User('Khoa');
c(user1);
c(user1.constructor.prototype.greet() + user1.name);
/* ------------------------------Class decorator END---------------------------- */

/* ------------------------------Method decorator START---------------------------- */
// Method Decorator được sử dụng để quan sát, sửa đổi hoặc thay thế định nghĩa của method
// Param(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor)

function autoBind(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescripttor: PropertyDescriptor = {
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    }
    return adjDescripttor;
}

class Person {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    @autoBind
    getName() {
        c(this.name);
    }
}

const person1 = new Person('Khoa');
person1.getName();
/* ------------------------------Method decorator END---------------------------- */

/* ------------------------------Property decorator START---------------------------- */
// Property decorator được sử dụng để quan sát, sửa đổi hoặc thêm các phương thức hoặc thuộc tính vào class
// Param(target: Object, propertyKey: string)
function propertyChange(target: Object, propertyKey: string) {
    let result = propertyKey;

    const getFunction = function () {
        return result;
    };

    const setFunction = function (newResult: string) {
        result = `Hello ${newResult}`;
        return result;
    };

    const description = {
        get: getFunction,
        set: setFunction
    }

    Object.defineProperty(target, propertyKey, description);
}

class PersonX {
    public firstname: string = 'Luong';

    @propertyChange
    public lastName: string = "Khoa";
}

const me = new PersonX();
c(me);
/* ------------------------------Property decorator END---------------------------- */

/* ------------------------------Accessor decorator START---------------------------- */
// Dùng để thay accessor cho property (chỉ định nghĩa cho getter hoặc setter)
/* Accessor:
- configurable
- enumerable
- value
- writable
*/
// Param(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor)
function writable(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    Object.defineProperty(target, `_${propertyKey}`, {
        writable: true
    });
}

class PersonN {
    _name: string;

    constructor(name: string) {
        this._name = name;
    }

    @writable
    get name() {
        return this._name;
    }
}

let person = new PersonN("Khoa");
person._name = 'Tèo';
c(person);
/* ------------------------------Accessor decorator END---------------------------- */

/* ------------------------------Parameter decorator START---------------------------- */
// Parameter decorator chỉ sử dụng để kiểm tra params trong function 

// Param(target: Object, propertyKey: string, parameterIndex: number) 

function LogParamenter(target: Object, propertyKey: string, parameterIndex: number) {
    c('target: ', target);
    c('propertyKey: ', propertyKey);
    c('parameterIndex: ', parameterIndex);
}

class Demo {
    public foo(@LogParamenter a: any, b: any) {
        c("Hi");
    }
}

const test = new Demo();
test.foo("Aaaa", "Bbbb");
/* ------------------------------Parameter decorator END---------------------------- */
