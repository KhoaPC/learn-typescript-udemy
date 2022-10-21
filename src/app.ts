const c = console.log;

type NumberOrString = number | string

// // Function overload
// function fnConcatOrSum(a: number, b: number): number;
// function fnConcatOrSum(a: number, b: string): string;
// function fnConcatOrSum(a: string, b: number): string;
// function fnConcatOrSum(a: string, b: string): string;
// function fnConcatOrSum(a: NumberOrString, b: NumberOrString) {
//     if (typeof a === 'string' || typeof b === 'string') 
//         return a.toString() + b.toString();

//     return a + b; 
// }
