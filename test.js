const axios = require("axios");
const cheerio = require("cheerio");
const urlencode = require('urlencode');
const puppeteer = require('puppeteer');
const log = console.log;


const getHtml = async () => {
  try {
    log('0');
    return await axios.get('https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=?' +  urlencode('노원') + urlencode('맛집'));

  } catch (error) {
    console.error("error timing" + error);
  }
};

getHtml()
      .then(html => {
        let ulList = [];
        let $ = cheerio.load(html.data);
        let $bodyList = $("div.place_section _3GlSn > div >  ul").children("li");

        $bodyList.each(function(i, elem) {
          ulList[i] = {
           href: $(this).find('div._1IVzZ a').attr('href')
          };

  //          const bookJson = JSON.stringify(ulList[i]);

  //          if(i==0){
  //          fs.writeFileSync('first-json.json', bookJson);
  //        }else {
  //          fs.appendFileSync('first-json.json', bookJson);
  //        }
        });
        log('1');
        //log("ARRRRRRRRRRRRRRRRR" + array + "test1=" + test1);
        let data =  ulList.filter(n => n.title);

        return data;

      }).then(res => log(res));
/*
const getHtml = async () => {
  try {
    return await axios.get("https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&sq=&o=&q="+  urlencode('노원') + urlencode('맛집'));
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.wrap_place ul").children("li");
    log($bodyList);
    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title:$(this).find('a.fn_tit').text(),
          href: $(this).find('a.fn_tit').attr('href'),
          img: $(this).find('div.wrap_thumb img').attr('src')
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => log(res));
*/
//http://www.google.co.kr/search?complete=1&hl=ko&q=
//https://map.naver.com/v5/?query=
