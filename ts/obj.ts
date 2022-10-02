// Obj & Arr 
// const c = console.log;
enum Role {ADMIN, AUTHOR} // enumuration

const person: {
    name: string;
    age: number;
    favoriteAnimal: string[];
    misc: [number, string]; //tuples
    role: number;
} = {
    name: 'Khoa',
    age: 16,
    favoriteAnimal: ['Dog', 'Cat'],
    misc: [1, 'Hello'], 
    role: Role.ADMIN,  
} 

//c(person.gender); //Error 

let foo: string[];
let bar: any[];
foo = ['Pork', 'Chicken'];
bar = ['Dog', 'Cat', 2, true];

person.favoriteAnimal.forEach(item => {
    c(item.toUpperCase());
    // c(item.map()); 
});

// tsc file.ts