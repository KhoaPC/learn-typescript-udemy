const c = console.log;
// Decorator
function Logger1(target: any, propertyName: string | symbol) {
    c(target, propertyName);
}

function Logger2(target: any, name: string | symbol, descriptor: PropertyDescriptor) {
    c(target);
    c(name);
    c(descriptor);
}

function Logger3(target: any, name: string | symbol, position: number) {
    c(target);
    c(position);
}

function WithTemplate(template: string, id: string) {
    return function<T extends {new(...arg: any[]): {}}>(constructor: T) {
      
        return class extends constructor {

            constructor(...arg: any[]) {

                super();

                const elm = document.getElementById(id);

                if (elm) {
                    elm.innerText = template;
                }
            }
        }
    }
}

@WithTemplate('Person', 'app')
class Person {
    @Logger1
    name: string;
    age: number;
    constructor(n: string, a: number) {
        this.name = n;
        this.age = a;
    }
    getYearOfBirth() {
        const date = new Date();
        const year = date.getFullYear();
        c(year - this.age);
    }
}
// const per = new Person('Khoa', 16);



// interface ValidatorConfig {
//     [property: string]: {
//       [validatableProp: string]: string[]; // ['required', 'positive']
//     };
//   }
  
// const registeredValidators: ValidatorConfig = {};
 
// array spread operator
// function Required(target: any, propName: string) {
//     registeredValidators[target.constructor.name] = {
//         ...registeredValidators[target.constructor.name],
//         [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
//     };
// }
 
// function PositiveNumber(target:t any, propName: string) {
//     registeredValidators[target.constructor.name] = {
//         ...registeredValidators[target.constructor.name],
//         [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
//     };
// }
  
//   function validate(obj: any) {
//     const objValidatorConfig = registeredValidators[obj.constructor.name];
//     if (!objValidatorConfig) {
//       return true;
//     }
//     let isValid = true;
//     for (const prop in objValidatorConfig) {
//       for (const validator of objValidatorConfig[prop]) {
//         switch (validator) {
//           case 'required':
//             isValid = isValid && !!obj[prop];
//             break;
//           case 'positive':
//             isValid = isValid && obj[prop] > 0;
//             break;
//         }
//       }
//     }
//     return isValid;
//   }
  
//   class User {
//     // @Required
//     name: string;
//     // @PositiveNumber
//     age: number;
  
//     constructor(name: string, age: number) {
//       this.name = name;
//       this.age = age;
//     }
//   }
  
//   const courseForm = document.querySelector('form')!;
//   courseForm.onsubmit = (e) => {
//     e.preventDefault();
//     const nameEl = document.getElementById('name') as HTMLInputElement;
//     const ageEl = document.getElementById('age') as HTMLInputElement;
  
//     const name = nameEl.value;
//     const age = +ageEl.value;
  
//     const createdUser = new User(name, age);
  
//     // if (!validate(createdUser)) {
//     //   alert('Invalid input, please try again!');
//     //   return;
//     // }
//     c(createdUser);
//   };
  
// function autoBind(target: any, methodName: string, descriptor: PropertyDescriptor) {
//     const originalMethod = descriptor.value;
//     const adjDescripttor: PropertyDescriptor = {
//         configurable: true,
//         get() {
//             const boundFn = originalMethod.bind(this);
//             return boundFn;
//         }
//     }
//     return adjDescripttor;
// } 