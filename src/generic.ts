const c = console.log;

// Khi không dùng generic
type NS = number | string;

function foo(a: NS, b: NS): [NS, NS] {
  return [a, b];
}

let arrN = foo('Hello', 456789);

// arrN[0] = arrN[0].toUpperCase(); // Error `Property 'toUpperCase' does not exist on type 'NS'`
// c(arrN[1] + 54321); // Error `Operator '+' cannot be applied to types 'NS''.

function generic<T, U>(a: T, b: U): [T, U] {
  return [a, b]
}
// Khi khởi tạo arr1 TS biết được `T` = string `U` = number
let arr1 = generic('Hi', 456789);
// Có thể sử dụng các method của `string` 
arr1[0] = arr1[0].toUpperCase();
// Và các toán từ của number
c(arr1[1] > 543210); // false 
c(arr1);
// 0: "HI"
// 1:  456789

// Khi khởi tạo arr2 TS biết được `T` = string `U` = number[] 
let arr2 = generic('Aloo 1234', [1, 2, 3]);
// Và có thể sử dụng các method của `Array`
arr2[1].push(4);
c(arr2);
// 0: "Aloo 1234"
// 1: [1, 2, 3, 4] 

const me = {
  age: 16,
  name: 'Khoa'
}
// Extends keyof để ràng buộc kiểu dữ liệu là thuộc tính của một obj
function printObjValue<T extends object, U extends keyof T>(obj: T, key: U) {
  c(`Value: ${obj[key]}`);
}
printObjValue(me, 'name');

// Extends để giới hạn kiểu dữ liệu của tham số thành kiểu dữ liệu cụ thể
class DataStorage<T extends string | number | boolean> {
  // Mảng với kiểu dự liệu được chỉ định
  private data: T[] = [];

  addItem(item: T) {
      this.data.push(item);
  }

  removeItem(item: T) {
      // Khi không tìm thấy `item` thì indexOf trả về -1
      // Nên khi -1 thì return 
      if (this.data.indexOf(item) === -1) {
          return;
      }
      this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
      return [...this.data];
  }
}
// Khởi tạo mảng number
const numberArr = new DataStorage<number>();
numberArr.addItem(100);
numberArr.addItem(200);
numberArr.removeItem(200);
c(numberArr.getItems()); // [100]

// Khởi tạo mảng string
const stringArr = new DataStorage<string>();
stringArr.addItem('Teo');
stringArr.addItem('Khoa');
stringArr.removeItem('Teo');
c(stringArr.getItems()); // ['Khoa']