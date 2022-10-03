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


// sourceMap: view ts file in browser
// outDir: specify folder to save file
// removeComments
// noEmitOnError: no create file if error

// type checking
// strictNullChecks

// ????
// strictBindCallApply

// generateErr('Errrr', 500)

// tsc: work with all ts files in project
// tsc file.ts: work with specified file

// tsc --watch
// tsc: translate all file in project from ts -> js