namespace App {
    export function autoBind(target: any, methodName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        console.log(descriptor)
        const adjDescripttor: PropertyDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        }
        return adjDescripttor;
    } // autoBind
}