const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {

    constructor() {
        this.AeOnly = Object.entries(americanOnly);
        this.BeOnly = Object.entries(britishOnly);
        this.Ae2BeS = Object.entries(americanToBritishSpelling);
        this.Ae2BeT = Object.entries(americanToBritishTitles).map(val => [val[0].slice(0, -1) + "\\.", val[1]]);
        this.Be2AeS = this.Ae2BeS.map(val => [val[1], val[0]]);
        this.Be2AeT = Object.entries(americanToBritishTitles).map(val => [val[1], val[0]]);
    }

    translate(context, loc) {
        const locations = [
            "american-to-british",
            "british-to-american"
        ];
        
        if (context === '') {
            return { error: 'No text to translate' };
        }        

        if (!locations.includes(loc)) {
            return { error: 'Invalid value for locale field' };
        }

        let solution = context, code0 = ':', code1 = '.';
        let queue = [this.AeOnly, this.Ae2BeS, this.Ae2BeT];        

        if (loc[0] === 'b') {
            queue = [this.BeOnly, this.Be2AeS, this.Be2AeT];
            [code1, code0] = [code0, '\\.'];
        }

        let dict = [];
        queue.forEach(item => item.forEach(val => dict.push(val)));
        dict = dict.sort((a, b) => b[0].length - a[0].length);
        let sum = 0;

        const converter = (dictionary, input) => {
            let output = input;

            for (let [cond, subs] of dictionary) {
                const next = (cond.slice(-1) === '.') ? "(?=\\s)" : "\\b";
                const reg = new RegExp("\\b" + cond + next, "ig");
                output = output.replace(reg, match => {
                    const prefix = '<span class="highlight">';
                    const suffix = '</span>';
                    sum++;

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

                if (hour < 25 && minute < 60) {
                    const prefix = '<span class="highlight">';
                    const suffix = '</span>';
                    sum++;
                    return prefix + match0 + subs + match1 + suffix;
                }
            });
        };

        solution = converter(dict, solution);
        solution = timeShuttle(solution, code0, code1);

        if (sum === 0) {
            solution = "Everything looks good to me!";
        }

        return {
            text: context,
            translation: solution
        };
    }
}

module.exports = Translator;