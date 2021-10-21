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
