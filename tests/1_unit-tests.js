const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
    suite("Function translator.translate(text, locale)", function () {
        //let locale = "american-to-british";

        test("favorite to Be", (done) => {
            const text = "Mangoes are my favorite fruit.";
            const locale = "american-to-british";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bfavourite\b/ig.test(tanslation));
            assert.isFalse(/\bfavorite\b/ig.test(tanslation));
            done();
        });

        test("yogurt to Be", (done) => {
            const text = "I ate yogurt for breakfast.";
            const locale = "american-to-british";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\byoghurt\b/ig.test(tanslation));
            assert.isFalse(/\byogurt\b/ig.test(tanslation));
            done();
        });

        test("condo to Be", (done) => {
            const text = "We had a party at my friend's condo.";
            const locale = "american-to-british";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bflat\b/ig.test(tanslation));
            assert.isFalse(/\bcondo\b/ig.test(tanslation));
            done();
        });

        test("trashcan to Be", (done) => {
            const text = "Can you toss this in the trashcan for me?";
            const locale = "american-to-british";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bbin\b/ig.test(tanslation));
            assert.isFalse(/\btrashcan\b/ig.test(tanslation));
            done();
        });

        test("parking lot to Be", (done) => {
            const text = "The parking lot was full.";
            const locale = "american-to-british";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bcar park\b/ig.test(tanslation));
            assert.isFalse(/\bparking lot\b/ig.test(tanslation));
            done();
        });

        test("Rube Goldberg machine to Be", (done) => {
            const text = "Like a high tech Rube Goldberg machine.";
            const locale = "american-to-british";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bHeath Robinson device\b/ig.test(tanslation));
            assert.isFalse(/\bRube Goldberg machine\b/ig.test(tanslation));
            done();
        });

        test("play hooky to Be", (done) => {
            const text = "To play hooky means to skip class or work.";
            const locale = "american-to-british";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bbunk off\b/ig.test(tanslation));
            assert.isFalse(/\bplay hooky\b/ig.test(tanslation));
            done();
        });

        test("Mr. to Be", (done) => {
            const text = "No Mr. Bond, I expect you to die.";
            const locale = "american-to-british";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bMr\b/ig.test(tanslation));
            assert.isFalse(/\bMr\. /ig.test(tanslation));
            done();
        });

        test("Dr. to Be", (done) => {
            const text = "Dr. Grosh will see you now.";
            const locale = "american-to-british";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bDr\b/ig.test(tanslation));
            assert.isFalse(/\bDr\. /ig.test(tanslation));
            done();
        });

        test("12:15 to Be", (done) => {
            const text = "Lunch is at 12:15 today.";
            const locale = "american-to-british";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\b12\.15\b/ig.test(tanslation));
            assert.isFalse(/\b12:15\b/ig.test(tanslation));
            done();
        });

        //Now Be2Ae

        test("footie to Ae", (done) => {
            const text = "We watched the footie match for a while.";
            const locale = "british-to-american";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bsoccer\b/ig.test(tanslation));
            assert.isFalse(/\bfootie\b/ig.test(tanslation));
            done();
        });

        test("Paracetamol to Ae", (done) => {
            const text = "Paracetamol takes up to an hour to work.";
            const locale = "british-to-american";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bTylenol\b/ig.test(tanslation));
            assert.isFalse(/\bParacetamol\b/ig.test(tanslation));
            done();
        });

        test("caramelise to Ae", (done) => {
            const text = "First, caramelise the onions.";
            const locale = "british-to-american";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bcaramelize\b/ig.test(tanslation));
            assert.isFalse(/\bcaramelise\b/ig.test(tanslation));
            done();
        });

        test("bank holiday & funfair to Ae", (done) => {
            const text = "I spent the bank holiday at the funfair.";
            const locale = "british-to-american";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bpublic holiday\b/ig.test(tanslation));
            assert.isFalse(/\bbank holiday\b/ig.test(tanslation));
            assert.isTrue(/\bcarnival\b/ig.test(tanslation));
            assert.isFalse(/\bfunfair\b/ig.test(tanslation));
            done();
        });

        test("bicky & chippy to Ae", (done) => {
            const text = "I had a bicky then went to the chippy.";
            const locale = "british-to-american";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bcookie\b/ig.test(tanslation));
            assert.isFalse(/\bbicky\b/ig.test(tanslation));
            assert.isTrue(/\bfish-and-chip shop\b/ig.test(tanslation));
            assert.isFalse(/\bchippy\b/ig.test(tanslation));
            done();
        });

        test("got bits and bobs & bum bag to Ae", (done) => {
            const text = "I've just got bits and bobs in my bum bag.";
            const locale = "british-to-american";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bodds and ends\b/ig.test(tanslation));
            assert.isFalse(/\bgot bits and bobs\b/ig.test(tanslation));
            assert.isTrue(/\bfanny pack\b/ig.test(tanslation));
            assert.isFalse(/\bbum bag\b/ig.test(tanslation));
            done();
        });

        test("car boot sale to Ae", (done) => {
            const text = "The car boot sale at Boxted Airfield was called off.";
            const locale = "british-to-american";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bswap meet\b/ig.test(tanslation));
            assert.isFalse(/\bcar boot sale\b/ig.test(tanslation));
            done();
        });

        test("Mrs to Ae", (done) => {
            const text = "Have you met Mrs Kalyani?";
            const locale = "british-to-american";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bMrs\. /ig.test(tanslation));
            assert.isFalse(/\bMrs\b/ig.test(tanslation));
            done();
        });

        test("Prof to Ae", (done) => {
            const text = "Prof Joyner of King's College, London.";
            const locale = "british-to-american";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\bProf\. /ig.test(tanslation));
            assert.isFalse(/\bProf\b/ig.test(tanslation));
            done();
        });

        test("4.30 to Ae", (done) => {
            const text = "Tea time is usually around 4 or 4.30.";
            const locale = "british-to-american";
            const { tanslation } = translator.translate(text, locale);
            assert.isTrue(/\b4:30\b/ig.test(tanslation));
            assert.isFalse(/\b4\.30\b/ig.test(tanslation));
            done();
        });

        //Now highlight

        test("highlight--favorite to Be", (done) => {
            const text = "Mangoes are my favorite fruit.";
            const locale = "american-to-british";
            const { tanslation } = translator.translate(text, locale);
            const highlight = "<span class=\"highlight\">favourite</span>";
            assert.isTrue(tanslation.includes(highlight));
            done();
        });

        test("highlight--yogurt to Be", (done) => {
            const text = "I ate yogurt for breakfast.";
            const locale = "american-to-british";
            const { tanslation } = translator.translate(text, locale);
            const highlight = "<span class=\"highlight\">yoghurt</span>";
            assert.isTrue(tanslation.includes(highlight));
            done();
        });

        test("highlight--footie to Ae", (done) => {
            const text = "We watched the footie match for a while.";
            const locale = "british-to-american";
            const { tanslation } = translator.translate(text, locale);
            const highlight = "<span class=\"highlight\">soccer</span>";
            assert.isTrue(tanslation.includes(highlight));
            done();
        });

        test("highlight--Paracetamol to Ae", (done) => {
            const text = "Paracetamol takes up to an hour to work.";
            const locale = "british-to-american";
            const { tanslation } = translator.translate(text, locale);
            const highlight = "<span class=\"highlight\">Tylenol</span>";
            assert.isTrue(tanslation.includes(highlight));
            done();
        });
    });
});
