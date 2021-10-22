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
    pushCharactersFromASCIIRange(rangeStart, rangeEnd, outputArr) {
        for (let i = rangeStart; i <= rangeEnd; ++i) {
            outputArr.push(String.fromCharCode(i));
        }
    }
    get charactersForGenerator() {
        let tmp = new Array();
        if (this.bigLetters.checked) {
            this.pushCharactersFromASCIIRange(65, 90, tmp);
        }
        if (this.smallLetters.checked) {
            this.pushCharactersFromASCIIRange(97, 122, tmp);
        }
        if (this.numbers.checked) {
            this.pushCharactersFromASCIIRange(48, 57, tmp);
        }
        if (this.specialSigns.checked) {
            this.pushCharactersFromASCIIRange(33, 47, tmp);
            this.pushCharactersFromASCIIRange(58, 64, tmp);
            this.pushCharactersFromASCIIRange(91, 96, tmp);
            this.pushCharactersFromASCIIRange(123, 126, tmp);
        }
        if (tmp.length === 0) {
            this.pushCharactersFromASCIIRange(65, 90, tmp);
            this.pushCharactersFromASCIIRange(97, 122, tmp);
            this.pushCharactersFromASCIIRange(48, 57, tmp);
        }
        return tmp;
    }
    pickRandomCharFromArray(arrayOfCharacters) {
        let min = 0;
        let max = arrayOfCharacters.length;
        return Math.floor(Math.random() * (max - min) + min);
    }
    generatePassword() {
        let i = 0, result = '';
        const arrayOfChars = [...this.charactersForGenerator];
        //console.log(arrayOfChars);
        //console.log(this.charactersForGenerator);
        while (i < this.passwordLength.value) {
            result += arrayOfChars[this.pickRandomCharFromArray(arrayOfChars)];
            ++i;
        }
        return result;
    }
    displayPassword() {
        if (!document.getElementById('passwordOutputField')) {
            const element = document.createElement('input');
            element.setAttribute('type', 'text');
            element.setAttribute('id', 'passwordOutputField');
            element.setAttribute('style', 'text-align:center');
            document.getElementById('formOutput').appendChild(element);
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
