namespace App {
    export function autoBind(target: any, methodName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const adjDescripttor: PropertyDescriptor = {
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        }
        return adjDescripttor;
    } // autoBind
}