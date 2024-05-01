export function numberToLetters(number: any) {
    let result = '';
    const latinAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    while (number > 0) {
        const remainder = (number - 1) % 26;
        result = latinAlphabet[remainder] + result;
        number = Math.floor((number - 1) / 26);
    }

    return result;
}

export function generateAlphaNumericSequence(count: any) {
    const sequence = [];
    for (let i = 1; i <= count; i++) {
        sequence.push(numberToLetters(i));
    }
    return sequence;
}