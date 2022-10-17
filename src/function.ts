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