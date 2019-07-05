const { every, some, sortBy, tap, unary, once, factorial, memorized, curry } = require('./common');

test('every', () => {
    expect(every([NaN, NaN, NaN], isNaN)).toBeTruthy();
    expect(every([NaN, NaN, 4], isNaN)).toBeFalsy();
});

test('some', () => {
    expect(some([NaN, NaN, NaN], isNaN)).toBeTruthy();
    expect(some([1, 2, 3], isNaN)).toBeFalsy();
});

test('sortBy', () => {
    const people = [
        { firstname: "aaFirstName", lastname: "cclastName" },
        { firstname: "ccFirstName", lastname: "aalastName" },
        { firstname: "bbFirstName", lastname: "bblastName" }
    ];

    const sortedPeople = people.sort(sortBy('lastname'));

    const expectedPeople = [
        { firstname: "ccFirstName", lastname: "aalastName" },
        { firstname: "bbFirstName", lastname: "bblastName" },
        { firstname: "aaFirstName", lastname: "cclastName" }
    ];

    expect(sortedPeople).toStrictEqual(expectedPeople);
});

test('tap', () => {
    tap("fun")((it) => console.log("value is ", it));

    [1,2,3].forEach((a) => 
        tap(a)(() => {
            console.log(a);
        })
    )
});

test('unary', () => {
    expect(['1','2','3'].map(unary(parseInt))).toStrictEqual([1,2,3]);    
});

test('once', () => {
    let doPayment = once(() => {
        return 1;
    }); 

    expect(doPayment()).toBe(1);
    expect(doPayment()).toBeUndefined();
});

test('factorial', () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(2)).toBe(2);
    expect(factorial(3)).toBe(6);
});

test('memorized', () => {
    const fastFactorial = memorized(factorial);

    expect(fastFactorial(2)).toBe(2);
    expect(fastFactorial(2)).toBe(2);
    expect(fastFactorial(3)).toBe(6);
});

test('curry', () => {
    const multiply = (x,y,z) => x * y * z;

    expect(curry(multiply)(1,2,3)).toBe(6);
    expect(curry(multiply)(3)(2)(1)).toBe(6);

    let match = curry(function(expr, str) {
        return str.match(expr);
    });

    let hasNumber = match(/[0-9]+/);

    let filter = curry(function(f, ary){
        return ary.filter(f);
    });

    let findNumbersInArray = filter(hasNumber);

    expect(findNumbersInArray(["js", "number1"])).toStrictEqual(["number1"]);
});