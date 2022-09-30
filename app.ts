// Obj & Arr 
const c = console.log;

const person: {
    name: string;
    age: number;
    favoriteAnimal: string[];
    misc: [number, string]; //tuples
} = {
    name: 'Khoa',
    age: 16,
    favoriteAnimal: ['Dog', 'Cat'],
    misc: [1, 'Hello'], 
} 

enum Role {ADMIN, AUTHOR}

c(person.name); 

let foo: string[];
let bar: any[];
foo = ['Pork', 'Chicken'];
bar = ['Pork', 'Chicken', 2, true];

person.favoriteAnimal.forEach(item => {
    c(item.toUpperCase());
    // c(item.map()); //Error
});



// run cmd
// tsc file.ts

// Không mở 2 js + ts file cùng lúc