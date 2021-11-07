const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    suite('POST /api/translate with text & locale', function () {
        test('valid text & locale', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    text: 'Paracetamol takes up to an hour to work.',
                    locale: 'british-to-american'
                })
                .end(function (err, res) {
                    assert.equal(res.body.translation, '<span class=\"highlight\">Tylenol</span> takes up to an hour to work.');
                    done();
                });
        });

        test('valid text & invalid locale', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    text: 'Paracetamol takes up to an hour to work.',
                    locale: 'ABCD'
                })
                .end(function (err, res) {
                    assert.equal(res.body.error, 'Invalid value for locale field');
                    done();
                });
        });

        test('missing text', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    locale: 'british-to-american'
                })
                .end(function (err, res) {
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                });
        });

        test('missing locale', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    text: 'Paracetamol takes up to an hour to work.'
                })
                .end(function (err, res) {
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                });
        });

        test('textArea is empty', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    text: undefined,
                    locale: 'british-to-american'
                })
                .end(function (err, res) {
                    assert.equal(res.body.error, '<No text to translate');
                    done();
                });
        });

        test('no text need to be translated', function (done) {
            chai.request(server)
                .post('/api/translate')
                .send({
                    text: 'Good morning.',
                    locale: 'british-to-american'
                })
                .end(function (err, res) {
                    assert.equal(res.body.translation, 'Everything looks good to me!');
                    done();
                });
        });

    });

});
