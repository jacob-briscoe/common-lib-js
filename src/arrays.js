
module.exports = {
    map: (array, fn) => {
        let results = [];

        for (const value of array)
            results.push(fn(value));

        return results;
    },
    filter: (array, fn) => {
        let results = [];

        for(const value of array)
            (fn(value)) ? results.push(value) : undefined;

        return results;
    },
    flatten: (array, fn) => {
        let results = [];

        for(const value of array)
            results.push.apply(results, value);
        
        return results;
    },
    reduce: (array, fn, initialValue) => {
        let accumulator;

        if(initialValue != undefined)
            accumulator = initialValue
        else
            accumulator = array[0];

        if(initialValue === undefined)
            for(let i=1;i< array.length;i++)
                accumulator = fn(accumulator, array[i]);
        else
            for(const value of array)
                accumulator = fn(accumulator, value);

        return accumulator;
    },
    zip: (leftArr, rightArr, fn) => {
        let index, results = [];

        for(index = 0; index < Math.min(leftArr.length, rightArr.length); index++)
            results.push(fn(leftArr[index], rightArr[index]));

        return results;
    }
};
