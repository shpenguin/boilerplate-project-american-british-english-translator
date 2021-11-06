const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {

    constructor(americanOnly, americanToBritishSpelling, americanToBritishTitles, britishOnly) {
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

        const validate = () => {
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
        }

        let solution = context, queue;

        const translator = (dictionary, input) => {
            let output = input;

            for (let [cond, subs] of dictionary) {
                const reg = new RegExp("\\b" + cond + "\\b", "ig");
                output = output.replace(reg, match => {

                    if (match) {
                        const prefix = '<span class="highlight">';
                        const suffix = '</span>';

                        if (match[0] < 'a') {
                            subs = subs[0].toUpperCase() + subs.slice(1);
                        }

                        return prefix + subs + suffix;
                    }
                });
            };

            return output;
        }

        if (loc[0] === 'a') {
            queue = [this.AeOnly, this.Ae2BeS, this.Ae2BeT];
        } else {
            queue = [this.BeOnly, this.Be2AeS, this.Be2AeT];
        }

        for (let item of queue) {
            solution = translator(item, solution);
        }

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