const axios = require('axios')
const cheerio = require('cheerio')

module.exports.scrapeOPSite = async (url) => {
  const res = await axios.get(url)
  const $ = cheerio.load(res.data)
  const imgUrl = $('.mdMN01Img img').attr('src')
  const title = $('.MdMN04Txt').text()
  const number = $('.MdMN05Txt').text().split(' ')[1]
  const description = $('.MdMN06Desc').text()
  return { imgUrl, title, number, description }
}
