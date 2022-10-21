// Type casting :  gán giá trị của một biến có kiểu dữ liệu này sang kiểu dữ liệu khác
let elm = document.querySelector('.foo') as HTMLElement;
console.log((elm as HTMLAnchorElement).href);

