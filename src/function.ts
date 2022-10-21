const c = console.log;

// Khai báo type cho các tham số 
// và khai báo hàm sẽ trả về kiểu gì
function add(n1: number, n2: number): number {
    return n1 + n2;
}

// void: hàm không trả về 
// In ra cái gì đó
function printResult(any: any): void {
    c(`Result ${any}`);
}

// Thêm callback vào tham số
function addAndHandles(
    n1: number,
    n2: number,
    callBacks: (a: number, b: number) => void
) {
    const result1 = n1 + n2;
    const result2 = n1 - n2;
    callBacks(result1, result2);
}

addAndHandles(10, 10, (result1, result2) => {
    c(result1) // 20
    c(result2) // 0
    c(result1 * result2); // 0 
});

type NumberOrString = number | string

function fnConcatOrSum(a: number, b: number): number;
function fnConcatOrSum(a: number, b: string): string;
function fnConcatOrSum(a: string, b: number): string;
function fnConcatOrSum(a: string, b: string): string;
function fnConcatOrSum(a: NumberOrString, b: NumberOrString) {
    if (typeof a === 'string' || typeof b === 'string') // Type guard
        return a.toString() + b.toString();

    return a + b; // This is not safe if a or b is not a number
}