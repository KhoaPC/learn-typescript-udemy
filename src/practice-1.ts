const c = console.log;

// interface Host  {
//     name: string;
//     privileges: string[];
// };

// interface RoomRenter  {
//     name: string;
//     startDate: Date;
// };

// interface HostRelatives extends Host, RoomRenter {}

type Host = {
    name: string;
    privileges: string[];
};

type RoomRenter = {
    name: string;
    startDate: Date;
};

type HostRelatives = Host & RoomRenter;

const p1: HostRelatives = {
    name: 'Teo',
    privileges: ['balbla'],
    startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;


// Function overloads : 
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string')
        return `${a}${b}`;
    return a + b;
}


const result1 = add(10, 6);
const result2 = add('Kho', 'a');
// c(result1);
// c(result2.split(''));

const fetchData = {
    id: '72543',
    name: 'Boss',
    job: { title: 'CEO', decription: 'My company' }
}
c(fetchData?.job?.title); // ????

const userInput = null;

const storedData = userInput ?? 'Default';

c(storedData);
type UnknownPerson = Host | RoomRenter | HostRelatives;

function print(person: UnknownPerson) {
    c(person.name);
    if ('privileges' in person) // *in*
        c(person.privileges);
    if ('startDate' in person) // *in*
        c(person.startDate);
}

// instanceof
// print(p1);

interface Bird {
    flyingSpeed: string;
}

interface Dog {
    runningSpeed: string;
}

let fly: Bird;
fly = { flyingSpeed: '50km/h' }

let run: Dog;
run = { runningSpeed: '40km/h' }

type Animal = Bird | Dog;

function moveAnimal(animal: Animal) {
    if ('flyingSpeed' in animal)
        c(`Flying Speed: ${animal.flyingSpeed}`);

    if ('runningSpeed' in animal)
        c(`Running Speed: ${animal.runningSpeed}`);
}

moveAnimal(fly);
moveAnimal(run);

function moveAnimal2(animal: Animal) {
    if ('flyingSpeed' in animal)
        c(`Flying Speed: ${animal.flyingSpeed}`);

    if ('runningSpeed' in animal)
        c(`Running Speed: ${animal.runningSpeed}`);
}

const input = document.querySelector('input')!;
input.value = 'Hello';

interface ErrContainer {
    [prop: string]: string;
}

const err: ErrContainer = {
    email: 'Not a valid email',
    userName: ''
}