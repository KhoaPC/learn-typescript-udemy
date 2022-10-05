const c = console.log;
//Generic
// merge<T extends object, U extends object>
function merge<T, U>(objA: T, objB: U) {
    return Object.assign(objA!, objB);
}
// <{name: string}, {age: number,  hobbies: string[]}>
const mergeObj = merge({ name: 'Khoa' }, { age: 16});
// c(mergeObj);

interface length {
    length: number
}

function printLengthEml<T extends length>(elm: T) {
    if (elm.length < 1)
        return 'No Element';
    else if (elm.length > 0)
        return `Length: ${elm.length}`;
}
// c(printLengthEml('Hello'));

// keyof
function printObjValue<T extends object, U extends keyof T>(obj: T, key: U) {
    return `Value: ${obj[key]}`;
}
// c(printObjValue({name: 'k'}, 'name'));

// 
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); 
  }

  getItems() {
    return [...this.data];
  }
}
// const numberStorage = new DataStorage<number>();
const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
// c(textStorage.getItems());



// 
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ['Max', 'Anna'];