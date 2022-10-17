const c = console.log;

// Union: khai báo một biến hoặc tham số có nhiều kiểu dữ liệu
let id: string | number;
id = '43526435';
id = 43526435;
// id = true; // Error

// Literal: Định nghĩa một `type` giới hạn các giá trị được sử dụng
type Direction = "east" | "west " | "south" | "north";
let myDirection: Direction = "east";
// let yourDirection: Direction = "foo"; // Error

type conversionDescriptor = 'as-number' | 'as-string';

// Aliases 
type combinable = number | string; 

// Sử dụng Union, Literal, Aliases
function combine(
    input1: number | string, // Union
    input2: combinable, // Aliases
    conversionType: conversionDescriptor // Literal
) {
    // Kiểm tra các điều kiện để nối chuổi hoặc cộng
    let result;
    if (typeof input1 === 'number' && typeof input2 === "number" && conversionType === 'as-number')
        result = +input1 + +input2;
    else
        result = input1.toString() + input2.toString();

    if (conversionType === 'as-number')
        result = +result;
    else if (conversionType === 'as-string')
        result = result.toString();

    return result;
}

c(combine(15, 15, 'as-number')); // 30
c(combine('Kh', 'oa', 'as-string')); // Khoa
