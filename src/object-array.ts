const c = console.log;
// Obj & Arr 

// Tuple:: mảng có số phần tử và type của từng thành phần cố định
let personX: [string, number, boolean];
personX = ['Khoa', 16, true]; 
// personX = ['Khoa', 16, 'Hi']; // Error

let arrString: string[]; // Mảng gồm các chuổi 
arrString = ['Pork', 'Chicken'];

let arrMixed: any[]; // Mảng hổn hợp
arrMixed = ['Dog', 'Cat', 2, true];

// Enum (enumuration): một nhóm các giá trị không thay đổi
enum Role { ADMIN, AUTHOR } 

const person: {
    name: string;
    age: number;
    favoriteAnimals: string[]; 
    misc: [number, string]; // tuples
    role: number;
} = {
    name: 'Khoa',
    age: 16,
    favoriteAnimals: ['Dog', 'Cat'],
    misc: [1, 'Hello'],
    // Sử dụng enum
    role: Role.ADMIN,
} 

// Xác định được kiểu dử liệu của item và đề xuất method cho kiểu dữ liệu đó
c(person.name.toUpperCase()); // KHOA
person.favoriteAnimals.forEach(item => {
   c('Favorite animals:', item.toUpperCase()); 
   // Favorite animals: DOG
   // Favorite animals: CAT
    // c(item.map()); // Error
});

