//import { login_cellphone, cloudsearch } from 'NeteaseCloudMusicApi'
const { login_cellphone, cloudsearch, ugc_song_get, song_wiki_summary, comment_music } = require('NeteaseCloudMusicApi');


class NeteaseCloud {
  private utilsCookie: string;
  constructor() {
    this.utilsCookie = ""
    this.login()
  }
  async login() {
    try {
      const res = await login_cellphone({
        phone: process.env.NETEASE_PHONE,
        password: process.env.NETEASE_PASSWORD,
      })
      this.utilsCookie = res.body.cookie
    } catch (err) {
      console.error('error', err)
    }
  }
  async searchMusic(keywords: string) {
    try {
      const res = await cloudsearch({
        keywords: keywords,
        limit: 8,
        offset: 0,
        type: 1,  // song
      })
      const data = res.body.result.songs.map((item: any) => {
        return {
          songID: item.id,
          songName: item.name,
          artistName: item.ar.map((a: any) => a.name).join(','), 
          albumName: item.al.name
        } 
      })
      return data
    } catch (err) {
      console.error('error', err)
      return null
    }
  }
  async GetSongInfo(songID: number) {
    try {
      const res = await song_wiki_summary({
        id: songID,
      })
      const data = res.body.data.blocks[1].creatives
      const res2 = await comment_music({
        id: songID,
      })
      let comment = res2.body.hotComments.map((item: any) => {
        return item.content
      })
      if (comment.length > 8) {
        comment = comment.slice(0, 8)
      }
      return {
        songID: songID,
        style: data[0].resources[0].uiElement.mainTitle.title,
        tags: data[1].resources.map((item: any) => item.uiElement.mainTitle.title).join(','),
        language: data[2].uiElement.textLinks[0].text,
        bpm: data[3].uiElement.textLinks[0].text,
        comment: comment.join('\n')
      }
    } catch (err) {
      console.error('error', err)
      return null
    }
  }
}
const MusicProxy = new NeteaseCloud()
async function test() {
  const songList = await MusicProxy.searchMusic("愿与愁")
  const songInfo = await MusicProxy.GetSongInfo(songList[0].songID)
  console.log(songInfo)
  const songList2 = await MusicProxy.searchMusic("xxe290")
};
test()
