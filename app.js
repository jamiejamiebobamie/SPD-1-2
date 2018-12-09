var request = require('request');
var cheerio = require('cheerio');


// request('https://ballotpedia.org/Maryland_state_executive_offices', function (error, response, html) {
//  if (!error && response.statusCode == 200) {
//   var $ = cheerio.load(html);
//   //Grabs information from given page, goes to item with id #Current_officeholders
//   $('#Current_officeholders').each(function(i, element){
//    var a = $(this).parent().next().children('tbody')
//    var text = a.text();
//    var url = a.attr('href');
//    var metadata = {
//      text: text,
//      url: url
//    }
//    console.log(text);
//   });
//  }
// });

var obj1 = {};
var obj2 = {};

var tableText_USHouse = [48]

request('https://ballotpedia.org/United_States_congressional_delegations_from_Maryland', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    //Grabs information from given page, goes to item with id #U.S._House
    $('#U\\.S\\._House').each(function(i, element){
      const b = $(this).parent().next().next();
      const c = $(b).find('td');
      c.each((i, el) => {
          tableText_USHouse[i] = $(el).text().trim();
          obj1[i] = document.getElementById(tableText_Maryland[i]);
          // console.log(i)
          if((i%6) == 0) { //every 7th element is a new representative
              console.log(i);
          };
          console.log(tableText_USHouse[i])

      })
    });
  }
});

/*request('https://ballotpedia.org/Maryland', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    console.log(html);
  }
});*/



var tableText_Maryland = [48]

request('https://ballotpedia.org/Maryland_state_executive_offices', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    //Grabs information from given page, goes to item with id #Current_officeholders
    $('#Current_officeholders').each(function(i, element){
      var a = $(this).parent().next().children('tbody')
      const b = $(this).parent().next();
      const c = $(b).find('td');
      c.each((i, el) => {
          tableText_Maryland[i] = $(el).text().trim();
          obj2[i] = document.getElementById(tableText_Maryland[i]);
          // console.log(obj2[tableText_Maryland[i]])
          if((i%3) == 0) { //every 4th element is a new representative
              console.log(i);
          };
          console.log(tableText_Maryland[i]);
          res.render{'index', { msg1 : tableText_Maryland[0]});
      });

      // console.log($(this).parent().next().html())
      // var text = a.text();
      // var url = a.attr('href');
      // var metadata = {
      //     text: text,
      //     url: url
      // }
      // console.log(text);
    });
  }
});

//This one takes the articles from the given site and pulls relevant data
/*request('https://news.ycombinator.com', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('span.comhead').each(function(i, element){
      var a = $(this).prev();
      var rank = a.parent().parent().text();
      var title = a.text();
      var url = a.attr('href');
      var subtext = a.parent().parent().next().children('.subtext').children();
      var points = $(subtext).eq(0).text();
      var username = $(subtext).eq(1).text();
      var comments = $(subtext).eq(2).text();
      // Our parsed meta data object
      var metadata = {
        rank: parseInt(rank),
        title: title,
        url: url,
        points: parseInt(points),
        username: username,
        comments: parseInt(comments)
      };
      console.log(metadata);
    });
  }
});*/
