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
                return false;
            }
        }
    }
    generatePassword() {
        let i = 0, tmp, result = '';
        while (i < this.passwordLength.value) {
            tmp = this.pickRandomASCIICharacter();
            if (this.validateCharacter(tmp, this.validRanges)) {
                result += String.fromCharCode(tmp);
                ++i;
            }
        }
        return result;
    }
    displayPassword() {
        if (!document.getElementById('passwordOutputField')) {
            const element = document.createElement('input');
            element.setAttribute('type', 'text');
            element.setAttribute('id', 'passwordOutputField');
            document.body.appendChild(element);
        }
        const elementId = document.getElementById('passwordOutputField');
        elementId.value = this.generatePassword();
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
