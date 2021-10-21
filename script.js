class PasswordGenerator {
    constructor() {
        this.bigLetters = document.getElementById("bigLetters");
        this.smallLetters = document.getElementById("smallLetters");
        this.numbers = document.getElementById("numbers");
        this.specialSigns = document.getElementById("specialSigns");
        this.passwordLength = document.getElementById("passwordLength");

        this.bigLetters.checked = true;
        this.smallLetters.checked = true;
        this.numbers.checked = true;
        this.specialSigns.checked = false;
        this.passwordLength.value = 8;
    }
    get validRanges() {
        if (this.bigLetters.checked) {
            if (this.smallLetters.checked) {
                if (this.numbers.checked) {
                    return [[65, 90], [97, 122], [48, 57]];
                }
                return [[65, 90], [97, 122]];
            }
            return [[65, 90]];
        }
        else if (this.smallLetters.checked) {
            if (this.numbers.checked) {
                return [[97, 122], [48, 57]];
            }
            return [[97, 122]];
        }
        else if (this.numbers.checked) {
            return [[48, 57]];
        }
        else if (this.specialSigns.checked) {
            return [[65, 90], [97, 122], [48, 57]];
        }
        else {
            return false;
        }
    }
    get altValidRanges() {
        let tmp = new Array();
        if (this.bigLetters.checked) {
            tmp.push([65, 90]);
        }
        if (this.smallLetters.checked) {
            tmp.push([97, 122]);
        }
        if (this.numbers.checked) {
            tmp.push([48, 57]);
        }
        if (this.specialSigns.checked) {
            tmp.push([[33, 47], [58, 64], [91, 96], [123, 126]]);
        }
        if (tmp.length === 0) {
            tmp.push([65, 90]);
            tmp.push([97, 122]);
            tmp.push([48, 57]);
        }
        return tmp;
    }
    pickRandomASCIICharacter() {
        let min = 33;
        let max = 126;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    validateCharacter(characterNum, arrayOfValidRanges) {
        let range = 0;
        for (range of arrayOfValidRanges) {
            if (characterNum >= range[0] && characterNum <= range[1]) {
                return true;
            }
            else if (typeof (range) === 'object') {
                let index = 0;
                for (index of range) {
                    if (characterNum >= index[0] && characterNum <= index[1]) {
                        return true;
                    }
                }
            }
            else {
                console.log(range);
                console.log(typeof (range[0]) === 'object');
                console.log(range[0].length);
                console.log(typeof (range[0]));
                //return false;
                return true;
            }
        }
    }
    generatePassword() {
        let i = 0, tmp, result = '';
        console.log(this.passwordLength.value);
        while (i < this.passwordLength.value) {
            tmp = this.pickRandomASCIICharacter();
            //console.log(tmp);
            //console.log(String.fromCharCode(tmp));
            if (this.validateCharacter(tmp, this.altValidRanges)) {
                result += String.fromCharCode(tmp);
                ++i;
            }
        }
        return result;
    }
    displayStates() {
        console.log(`
        A-Z ${this.bigLetters.checked}
        a-z ${this.smallLetters.checked}
        0-9 ${this.numbers.checked}
        /*... ${this.specialSigns.checked}
        Password Length: ${this.passwordLength.value}
        `);
    }
}
const p1 = new PasswordGenerator();
