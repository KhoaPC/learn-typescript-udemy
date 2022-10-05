// Obj & Arr 
const c = console.log;
enum Role {ADMIN, AUTHOR} // enumuration

const person: {
    name: string;
    age: number;
    favoriteAnimal: string[];
    misc: [number, string]; //tuples: is a predefined array of length and type of each elm
    role: number;
} = {
    name: 'Khoa',
    age: 16,
    favoriteAnimal: ['Dog', 'Cat'],
    misc: [1, 'Hello'], 
    role: Role.ADMIN,  
} 

// c(person.gender); //Error 

let foo: string[]; 
foo = ['Pork', 'Chicken'];

let bar: any[];
bar = ['Dog', 'Cat', 2, true];

person.favoriteAnimal.forEach(item => {
    c(item.toUpperCase());
    // c(item.map());
});

