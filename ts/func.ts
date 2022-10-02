// const c = console.log;

function add(n1: number, n2: number) {
    return n1 + n2;
}

// function printResult(any): void {
    // console.log(`Result ${any}`);
// }

let func: (a: number, b: number) => number;
func = add;
// func = printResult; //Error

// c(func(1,9));

function addAndHandles(
    n1: number,
    n2: number,
    callBacks: (a: number, b: number) => void
) {
    const result = n1 + n2;
    const result2 = n1 - n2;
    callBacks(result, result2);
}

addAndHandles(10, 10, (result, result2) => {
    c(result - result2);
    return;
});