const c = console.log;

let input1: any; // skip type check 
let input2: unknown;
let myName: string;

input2 = 'Khoa';

myName = input1; // accept
// myName = input2; ignore

if (typeof input2 === 'string')
    myName = input2; 

function generateErr(msg: string, code:number): never { // never return
    throw { message: msg, errorCode: code } 
}

// Type guards: cho phép bạn thu hẹp kiểu dữ liệu của biến trong lệnh điều kiện
// và cho phép sử dụng các method của kiểu dữ liệu đó

function doSomething(x: number | string) {
    if (typeof x === "string") { // TypeScript biết rằng `x` phải là một chuỗi
        c(x.padStart(x.length + 6, 'Hello ')); 
    } else if (typeof x === "number") { // TypeScript biết rằng `x` phải là một số
        c(x.toFixed());
    }
}

doSomething('Khoa'); // Hello Khoa
doSomething(345.546); // 346

// sourceMap: view ts file in browser
// outDir: specify folder to save file
// removeComments
// noEmitOnError: no create file if error

// type checking
// strictNullChecks

// ????
// strictBindCallApply

// tsc: work with all ts files in project
// tsc file.ts: work with specified file

// tsc --watch
// tsc: translate all file in project from ts -> js