const c = console.log;
// ---------------------------- Partial START---------------------------- 
// Đổi tất cả các thuộc tính trong obj thành `optional`
type PersonI = {
    name: string;
    age: number;
}

let me: Partial<PersonI> = {}; // partial

// Có thể khai báo mà không cần khởi tạo thuộc tính trong object
me.age = 16;
me.name = 'Khoa';
c(me);
// ---------------------------- Partial END ---------------------------- 

// ---------------------------- Required START---------------------------- 
// Xóa `optional` của tất cả các thuộc tính

type PersonII = {
    name: string;
    age: number;
    id?: string; // optional
}

// Không có `Required`
const perII1: PersonII = {
    name: 'Teo',
    age: 13,
    id: '5678', // Không bắt buộc phải có id
}

// Có `Required`
const perII2: Required<PersonII> = {
    name: 'Khoa',
    age: 16,
    id: '12000' // Bắt buộc phải có Id 
}
// ---------------------------- Required END ---------------------------- 

// ---------------------------- Record START---------------------------- 
// Định nghĩa kiểu dữ liệu của Key và value trong object
// ---------------------------- Record END ----------------------------

// ---------------------------- Omit START----------------------------
// Xóa `key` được chọn
type PersonIII = {
    name: string;
    age: number;
    id?: string;
}

const perIII: Omit<PersonIII, 'age' | 'id'> = {
    // Xóa age & id và không thể định nghĩa
    name: 'Khoa',
    // age: 16 // Error
}
// ---------------------------- Omit END ----------------------------

// ---------------------------- Pick START----------------------------
// Lấy `key` được chọn
type Person = {
    name: string;
    age: number;
    id?: string;
}

// Lấy `name` trong Person
const bob: Pick<Person, 'name'> = {
    name: 'Khoa',
    // age: 16, Error
}

// ---------------------------- Pick END ----------------------------

// ---------------------------- Exclude START----------------------------
// Xóa 1 type khỏi `union`
type Primitive = string | number | boolean;

// Xóa `boolean` khỏi type `Primitive` 'bên trong biến'
let value: Exclude<Primitive, boolean> = 'Hello';
// value = true;  // Error
// ---------------------------- Exclude END ----------------------------

// ---------------------------- ReturnType START----------------------------
// Định dạng kiểu và cấu trúc trả về của hàm
type PersonIV = () => { name: string; age: number; }

function foo(): ReturnType<PersonIV> {
    return {
        // Trả về theo cấu trúc đã định nghĩa cho `PersonIV`
        // Nhận được name và age mà không cần tham số hoặc biến
        name: 'Teo',
        age: 21
    }
}
c(foo()); // {name: 'Teo', age: 21}


// ---------------------------- ReturnType END ----------------------------