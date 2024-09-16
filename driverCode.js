const fs = require('fs');

function convertToBase10(value, base) {
    const val = parseInt(value, base);
    console.log(`${value} in base ${base} is ${val} in base 10`);
    return val;
}

function lagrangeInterpolation(points) {
    let constantTerm = 0;

    for (let i = 0; i < points.length; i++) {
        let xi = points[i].x;
        let yi = points[i].y;

        let li = 1;
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                li *= (0 - points[j].x) / (xi - points[j].x);
            }
        }

        constantTerm += li * yi;
    }

    return constantTerm;
}

function findConstantTerm(jsonInput) {
    let points = [];

    const n = jsonInput.keys.n;
    const k = jsonInput.keys.k;

    for (let key in jsonInput) {
        if (key !== 'keys') {
            let x = parseInt(key);
            let base = parseInt(jsonInput[key].base);
            let value = jsonInput[key].value;

            let y = convertToBase10(value, base);

            points.push({ x: x, y: y });
        }
    }

    const constantTerm = lagrangeInterpolation(points);

    return constantTerm;
}

function main() {
    const filePath = 'input.json';

    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const jsonInput = JSON.parse(fileContents);

        const result = findConstantTerm(jsonInput);
        console.log("The constant term (f(0)) is:", result);

    } catch (error) {
        console.error("Error reading or parsing the JSON file:", error);
    }
}

main();
