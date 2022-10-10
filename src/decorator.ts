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
    // Auto generate prop 'timeCreated'
    target.prototype.timeCreated = new Date();

    target.prototype.greet = function (someOne: string) {
        console.log(`Hello ${someOne} from prototype.greet()`);
    } // greet
}

@createPrototype
class User {
    // For passing error
    // `Property ### does not exist on type ###` by TypeScript compiler
    [decoratorGeneratedKey: string]: any; // **
    constructor(public name: string) { }
}

const user1 = new User('Khoa');
// user1.greet('Khoa');
// console.log(`User ${user1.name} was created at ${user1.timeCreated}`);
/* ------------------------------Class decorator END---------------------------- */

/* ------------------------------Method decorator START---------------------------- */
// Method Decorator được sử dụng để quan sát, sửa đổi hoặc thay thế định nghĩa của method
// Param(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor)

function replaceMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value;

    originalMethod = function () {
        c('Damned');
    }
}

class Yoo {
    @replaceMethod
    greet() {
        c('Hello');
    }
}

const yoo1 = new Yoo();
yoo1.greet();

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
