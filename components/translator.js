const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {

    constructor() {
        this.AeOnly = Object.entries(americanOnly).sort((a, b) => b[0].length - a[0].length);;
        this.BeOnly = Object.entries(britishOnly).sort((a, b) => b[0].length - a[0].length);;
        this.Ae2BeS = Object.entries(americanToBritishSpelling).sort((a, b) => b[0].length - a[0].length);
        this.Ae2BeT = Object.entries(americanToBritishTitles).sort((a, b) => b[0].length - a[0].length);
        this.Be2AeS = this.Ae2BeS.map(val => [val[1], val[0]]);
        this.Be2AeT = this.Ae2BeT.map(val => [val[1], val[0]]);
    }

    translate(context, loc) {

        if (!context || !loc) {
            return { error: 'Required field(s) missing' };
        }

        /*const validate = () => {
            const locations = [
                "american-to-british",
                "british-to-american"
            ];

            if (context = '') {
                return { error: 'No text to translate' };
            }

            if (!locations.includes(loc)) {
                return { error: 'Invalid value for locale field' };
            }

            return null;
        };

        const flag = validate();

        if (flag) {
            return flag;
        }*/

        if (context === '') {
            return { error: 'No text to translate' };
        }

        const locations = [
            "american-to-british",
            "british-to-american"
        ];

        if (!locations.includes(loc)) {
            return { error: 'Invalid value for locale field' };
        }

        let solution = context, code0 = ':', code1 = '.';
        let queue = [this.AeOnly, this.Ae2BeS, this.Ae2BeT];

        const converter = (dictionary, input) => {
            let output = input;

            for (let [cond, subs] of dictionary) {
                const reg = new RegExp("\\b" + cond + "\\b", "ig");
                output = output.replace(reg, match => {
                    const prefix = '<span class="highlight">';
                    const suffix = '</span>';

                    if (match[0] < 'a') {
                        subs = subs[0].toUpperCase() + subs.slice(1);
                    }

                    return prefix + subs + suffix;
                });
            };

            return output;
        };

        const timeShuttle = (string, cond, subs) => {
            let result = string;
            const reg = new RegExp("\\b(\\d?\\d)" + cond + "(\\d\\d?)\\b", "g");

            return result.replace(reg, (match, match0, match1) => {
                let hour = +match0, minute = +match1;

                if (hour < 13 && minute < 60) {
                    const prefix = '<span class="highlight">';
                    const suffix = '</span>';
                    return prefix + match0 + subs + match1 + suffix;
                }
            });
        };

        if (loc[0] === 'b') {
            queue = [this.BeOnly, this.Be2AeS, this.Be2AeT];
            [code1, code0] = [code0, code1];
        }

        for (let item of queue) {
            solution = converter(item, solution);
        }

        solution = timeShuttle(solution, code0, code1);

        if (solution === context) {
            solution = "Everything looks good to me!";
        }

        return {
            text: context,
            solution: solution
        };
    }
}

module.exports = Translator;