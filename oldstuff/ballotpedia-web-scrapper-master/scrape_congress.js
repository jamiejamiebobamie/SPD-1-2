var request = require('request');
var cheerio = require('cheerio');

var tableText = [48]

request('https://ballotpedia.org/United_States_congressional_delegations_from_Maryland', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    //Grabs information from given page, goes to item with id #U.S._House
    $('#U\\.S\\._House').each(function(i, element){
      const b = $(this).parent().next().next();
      const c = $(b).find('td');
      c.each((i, el) => {
          tableText[i] = $(el).text().trim()
          // console.log(tableText[i])
      })
    });
  }
});

console.log(tableText)
