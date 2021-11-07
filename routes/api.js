'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {

      if (Object.keys(req.body).length < 2) {
        return res.json({ error: 'Required field(s) missing' });
      }
      
      const { text, locale } = req.body;
      return res.json(translator.translate(text, locale));      
    });
};
