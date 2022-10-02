const c = console.log;
type combinable = number | string; //type aliases | custom type
type conversionDescriptor ='as-number' | 'as-string';  //type aliases | custom type 

function combine(
    input1: number | string, // union
    input2: combinable, 
    // conversionType: string, // literal
    conversionType: conversionDescriptor 
) {
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

c(combine(15, 15, 'as-number'));
c(combine('Kh', 'oa', 'as-string'));
