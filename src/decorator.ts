const c = console.log;
// Param
// target: Đối tượng được decorator
// propertyKey: Tên `property` được decorator
// parameterIndex: Index của tham số được decorator
// descriptor: Object mô tả cấu hình của đối tượng được decorator

/* ------------------------------Class decorator START---------------------------- */
// Thêm `objects prototype` cho contructor của class
// Param(target)
function createPrototype(target: Function) {
    // Tự động tạo prototype property `timeCreated` cho class được decorator
    target.prototype.timeCreated = new Date().toLocaleDateString();

    // Tự động tạo prototype method `greet` cho class được decorator
    target.prototype.greet = (someOne: string) => {
        c(`Hello ${someOne} from prototype.greet()`);
    } // greet
} // createPrototype

@createPrototype
class User {
    // Bỏ qua lỗi `Property ### does not exist on type ###`
    // Key do decorator tạo ra
    [decoratorGeneratedKey: string]: any;
    constructor(public name: string) { }
}

const user1 = new User('Khoa');
user1.greet('Khoa'); // Hello Khoa from prototype.greet()
c(`User ${user1.name} was created at ${user1.timeCreated}`); // User Khoa was created at ...
/* ------------------------------Class decorator END---------------------------- */

/* ------------------------------Method decorator START---------------------------- */
// Method Decorator được sử dụng để sửa đổi hoặc thay thế định nghĩa của method
// Params(target: Object, propertyKey: string, descriptor: PropertyDescriptor)

// Sửa đổi phương thức được decorator
function modifyMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // Lấy phương thức được decorator
    let originalMethod = descriptor.value;

    // Sửa đổi phương thức được decorator
    //originalMethod ??
    descriptor.value = function (...args: any[]) { //=> ??
        // args = tham số được truyền vào khi gọi hàm được decorator      
        c('Before greet');
        // Gọi phương thức được decorator
        let result = originalMethod.apply({}, args);
        c('After greet');
        return result;
    }
}

// Thay thế phương thức được decorator
function replaceMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // Lấy phương thức được decorator
    let originalMethod = descriptor.value;
    // ??
    // Thay thế 
    descriptor.value = () => {
        c('Hi');
    }
}

class Yoo {
    // Sửa đổi 
    @modifyMethod
    greet1(message: string, name: string) {
        c(`Greet: ${message} ${name}`);
    }
    // Thay thế
    @replaceMethod
    greet2() {
        c('Hello');
    }
}

const yoo1 = new Yoo();
yoo1.greet1('Hello', 'Khoa');
// Before greet
// Greet: Hello Khoa
// After greet

yoo1.greet2(); // Hi
/* ------------------------------Method decorator END---------------------------- */

/* ------------------------------Property decorator START---------------------------- */
// Property decorator được sử dụng để sửa đổi hoặc thêm các phương thức vào class
// Param(target: Object, propertyKey: string)

// Sửa đổi property được decorator
function propertyChange(target: Object, propertyKey: string) {
    let result = '';
    // Getter
    const getFunction = () => {
        return result;
    };

    // Setter (sửa đổi property được decorator)
    // `newResult` là value của property được decorator
    const setFunction = (newResult: string) => {
        result = `Hello ${newResult}`;
        return result;
    };

    Object.defineProperty(target, propertyKey, {
        get: getFunction,
        set: setFunction
    });
}

// Thêm method cho property được decorator
function checkLengthProperty(minimum: number) {
    // Decorator factory
    return (target: Object, propertyKey: string) => {
        let result: string = '';

        // Getter
        const getFunction = () => {
            return result;
        };

        // Setter (Thêm method cho property được decorator)
        // `newResult` là value của property được decorator
        const setFunction = (newResult: string) => {
            // Kiểm tra xem length giá trị của property được decorator lớn hơn `minimum` hay không 
            if (newResult.length < minimum) {
                console.warn(`Your name should be bigger than ${minimum}`);
            }
            return result = newResult;
        }

        //
        Object.defineProperty(target, propertyKey, {
            get: getFunction,
            set: setFunction
        });
    }
}

class PersonX {
    // Thêm medhod kiểm tra property
    @checkLengthProperty(2)
    public firstname: string = 'L';
    // Thay đổi property
    @propertyChange
    public lastName: string = "Khoa";
}

const me = new PersonX();
c(me.lastName); // Hello Khoa
c(me.firstname);
// Warning: Your name should be bigger than 2 
// L
/* ------------------------------Property decorator END---------------------------- */

/* ------------------------------Accessor decorator START---------------------------- */
// Dùng để thay accessor cho property (chỉ định nghĩa cho getter hoặc setter)
// *cờ: là các thuộc tính enumerable, value, writable
/* Accessor:
- configurable: là true thì có thế cấu hình các *cờ khác và ngược lại
- enumerable: nếu là true thì thuộc tính có thể dùng trong vòng lặp, và ngược lại.
- value: là true thì ?`thuộc tính có thể xóa`? và các cờ* khác có thể thay đổi, ngược lại thì không.
- writable: nếu là true thì giá trị value của thuộc tính có thể thay đổi và ngược lại
*/
// Params(target: Object, propertyKey: string, descriptor: PropertyDescriptor)



function Enumerable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // set enumerable
    descriptor.enumerable = true;
    
}

class Person {
    [decoratorGeneratedKey: string]: any; // Key do decorator tạo ra
    _name: string;
    constructor(name: string) {
        this._name = name;
    }

    @Enumerable
    get name() {
        // In `descriptor` của class ra
        c(Object.getOwnPropertyDescriptor(Person.prototype, 'name'));
        // {set: undefined, enumerable: true, configurable: true, get: ƒ}
        return this._name;
    }

}
let person = new Person('Khoa');

for (let key in person) {
    c(key + " = " + person[key]); 
    // _name = Khoa
    // name = Khoa
}
/* ------------------------------Accessor decorator END---------------------------- */

/* ------------------------------Parameter decorator START---------------------------- */
// Parameter decorator chỉ sử dụng để kiểm tra params trong function

// Params(target: Object, propertyKey: string, parameterIndex: number)

// Quan sát tham số được decorator
function LogParamenter(target: Object, propertyKey: string, parameterIndex: number) {
    // In ra các các tham số
    c('target: ', target);
    c('propertyKey: ', propertyKey);
    c('parameterIndex: ', parameterIndex);
}

class Demo {
    // Sử dụng phía trước tham số cần decorator
    public foo(@LogParamenter a: any, b: any) {
        c(a, b);
    }
}

const test = new Demo();
test.foo("foo", "bar");
/*
target:  {constructor: ƒ, foo: ƒ}
propertyKey:  foo
parameterIndex:  0
foo bar
*/

/* ------------------------------Parameter decorator END---------------------------- */
