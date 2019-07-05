
module.exports = {
    every: (arr, fn) => {
        let result = true;
        for (const value of arr)
            result = result && fn(value);
        return result;
    },
    some: (arr, fn) => {
        let result = false;
        for (const value of arr)
            result = result || fn(value);
        return result;
    },
    sortBy: (property) => {
        return (a, b) => {
            return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
        };
    },
    tap: (value) => (fn) => (
        typeof(fn) === 'function' && fn(value),
        console.log(value)
    ),
    unary: (fn) => fn.length === 1 ? fn : (arg) => fn(arg),
    once: (fn) => {
        let done = false;

        return function() {
            return done ? undefined : (done = true, fn.apply(this, arguments));
        };
    },
    factorial: (n) => {
        if(n === 0)
            return 1;
        return n * module.exports.factorial(n - 1);
    },
    memorized: (fn) => {
        const lookupTable = {};
        return (arg) => lookupTable[arg] || (lookupTable[arg] = fn(arg));
    },
    curry: (fn) => {
        if(typeof fn !== 'function')
            throw Error('No function provided');
        
        return function curriedFn(...args){

            if(args.length < fn.length){
                return function() {
                    return curriedFn.apply(null, args.concat([].slice.call(arguments)));
                };
            }

            return fn.apply(null, args);
        }
    }
};

