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

module.exports.scrapeRestaurant = async (url) => {
  const res = await axios.get(url)
  const $ = cheerio.load(res.data)
  const name = $('#rstdtl-head .display-name').text().trim()
  const score = parseFloat($('#rstdtl-head .rdheader-rating__score-val-dtl').text().trim())
  const $photos = $('#column-main .js-imagebox-trigger')
  const imageUrls = []
  $photos.each(function() {
    imageUrls.push($(this).attr('href'))
  })
  let jenre = ''
  let tel = ''
  let transit = ''
  let location = null
  const $trs = $('#contents-rstdata .rstinfo-table__table tr')
  $trs.each(function() {
    const name = $(this).find('th').text().trim();
    const val = $(this).find('td').text().trim();
    if (name === 'ジャンル') {
      jenre = val
    } else if (name === 'お問い合わせ') {
      tel = val
    } else if (name === '交通手段') {
      transit = val
    } else if (name === '住所') {
      const gmapUrl = $(this).find('td .js-catalyst-rstinfo-map img').attr('data-original')
      const [, locationStr] = gmapUrl.match(/center=(.*?)&/)
      const [lat, lng] = locationStr.split(',').map(parseFloat)
      location = { lat,lng }
    }
  })

  return({name, score, jenre, transit, location, tel, imageUrls})
}
