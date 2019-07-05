const { map, filter, flatten, reduce, zip } = require('./arrays');

test('map', () => {
    const expectedMapping = [{ title: 'C# 6.0', author: 'ANDREW TROELSEN' },
    { title: 'Efficient Learning Machines', author: 'Rahul Khanna' }];

    expect(map(apressBooks, (book) => {
        return {
            title: book.title,
            author: book.author
        };
    })).toEqual(expect.arrayContaining(expectedMapping));
});

test('filter', () => {
    const expectedMapping = [
        {
            "id": 111,
            "title": "C# 6.0",
            "author": "ANDREW TROELSEN",
            "rating": [4.7],
            "reviews": [{ good: 4, excellent: 12 }]
        }
    ];

    expect(filter(apressBooks, (book) => book.rating[0] > 4.5))
        .toEqual(expect.arrayContaining(expectedMapping));

    const mapAndFilter = [
        { title: 'C# 6.0', author: 'ANDREW TROELSEN' }
    ];

    expect(map(filter(apressBooks, (book) => book.rating[0] > 4.5), (book) => {
        return {
            title: book.title,
            author: book.author
        };
    })).toEqual(expect.arrayContaining(mapAndFilter));
});

test('flatten', () => {
    const expectedMapping = [{
        id: 111,
        title: 'C# 6.0',
        author: 'ANDREW TROELSEN',
        rating: [4.7],
        reviews: [{ good: 4, excellent: 12 }]
    }];

    let goodRatingCriteria = (book) => book.rating[0] > 4.5;

    expect(filter(flatten(
        map(apressBooksByDetails, (book) => {
            return book.bookDetails;
        })
    ), goodRatingCriteria)).toEqual(expect.arrayContaining(expectedMapping));
});

test('reduce', () => {
    const useless = [2,5,6,1,10];
    expect(reduce(useless, (acc, val) => acc + val)).toBe(24);
    expect(reduce(useless, (acc, val) => acc * val)).toBe(600);
});

test('zip', () => {
    expect(zip([1,2,3], [4,5,6], (x, y) => x+y)).toEqual(expect.arrayContaining([5,7,9]));
});


const apressBooks = [
    {
        "id": 111,
        "title": "C# 6.0",
        "author": "ANDREW TROELSEN",
        "rating": [4.7],
        "reviews": [{ good: 4, excellent: 12 }]
    },
    {
        "id": 222,
        "title": "Efficient Learning Machines",
        "author": "Rahul Khanna",
        "rating": [4.5],
        "reviews": []
    },
    {
        "id": 333,
        "title": "Pro AngularJS",
        "author": "Adam Freeman",
        "rating": [4.0],
        "reviews": []
    },
    {
        "id": 444,
        "title": "Pro ASP.NET",
        "author": "Adam Freeman",
        "rating": [4.2],
        "reviews": [{ good: 14, excellent: 12 }]
    }
];

const apressBooksByDetails = [
    {
        name: "beginners",
        bookDetails: [
            {
                "id": 111,
                "title": "C# 6.0",
                "author": "ANDREW TROELSEN",
                "rating": [4.7],
                "reviews": [{ good: 4, excellent: 12 }]
            },
            {
                "id": 222,
                "title": "Efficient Learning Machines",
                "author": "Rahul Khanna",
                "rating": [4.5],
                "reviews": []
            }
        ]
    },
    {
        name: "pro",
        bookDetails: [
            {
                "id": 333,
                "title": "Pro AngularJS",
                "author": "Adam Freeman",
                "rating": [4.0],
                "reviews": []
            },
            {
                "id": 444,
                "title": "Pro ASP.NET",
                "author": "Adam Freeman",
                "rating": [4.2],
                "reviews": [{ good: 14, excellent: 12 }]
            }
        ]
    }
];
