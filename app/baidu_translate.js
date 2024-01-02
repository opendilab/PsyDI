import { MD5 } from './md5'

export async function baiduTranslate(text, from, to) {
  const splitText = text.split('\n')
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  let result = []
  for (let i = 0; i < splitText.length; i++) {
    const item = splitText[i]
    if (item === "") {
        result.push("")
    } else if (item.startsWith('![alt text]')) {
        result.push(item)
    } else if (item.startsWith('#')) {
        result.push(item)
    } else {
        await delay(200)
        const translated = await singleTranslate(item, from, to)
        result.push(translated)
    }
  }
  return result.join('\n')
}

async function singleTranslate(text, from, to) {
  const appid = process.env.BAIDU_TRANSLATE_APPID || ""
  const key = process.env.BAIDU_TRANSLATE_KEY || ""
  const salt = (new Date).getTime()
  const sign = MD5(appid + text + salt + key)
  const payload = {
    'appid': appid,
    'q': text,
    'from': from,
    'to': to,
    'salt': salt,
    'sign': sign
  }
  const url = "http://api.fanyi.baidu.com/api/trans/vip/translate"
  const fullUrl = url + '?appid=' + appid + '&q=' + text + '&from=' + from + '&to=' + to + '&salt=' + salt + '&sign=' + sign

  const result = await fetch(fullUrl, {
    method: 'GET',
  })
  const res1 = await result.json()
  const res = res1["trans_result"]
  if (res == undefined) {
      console.log(text)
    console.log(payload, res1)
    throw new Error('Translation Error')
  }
  return res.map(item => item.dst).join('\n')
}
