export class NeteaseCloud {
  private url: string;
  private utilsCookie: string;
  constructor() {
    this.url = process.env.NETEASE_SERVICE_URL || ""
    this.utilsCookie = "placeholder"
    this.login()
  }
  async login() {
    if (this.utilsCookie) {
      return
    }
    try {
      const url = `${this.url}/login/cellphone?phone=${process.env.NETEASE_PHONE}&password=${process.env.NETEASE_PASSWORD}`
      const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
      })
      if (res.status === 200) {
        const data = await res.json()
        console.log('neteasecloud login ok')
        this.utilsCookie = data.cookie
      }
    } catch (err) {
      console.error('error', err)
    }
  }
  async searchMusic(keywords: string, limit: number = 4) {
    try {
      // type: 1 song
      const url = `${this.url}/search?keywords=${keywords}&limit=${limit}&offset=0&type=1`
      const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
      })
      if (res.status === 200) {
        const data = await res.json()
        return data.result.songs.map((item: any) => {
          return {
            songID: item.id,
            songName: item.name,
            artistName: item.artists.map((a: any) => a.name).join(','), 
            albumName: item.album.name
          } 
        })
      }
    } catch (err) {
      console.error('search music error', err)
      return null
    }
  }
  async searchMusicWithDetails(details: string, limit: number = 4) {
    try {
      const spiltDetails = details.split(' - ')
      const keywords = spiltDetails[0]
      const url = `${this.url}/search?keywords=${keywords}&limit=${limit}&offset=0&type=1`
      const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
      })
      if (res.status === 200) {
        const data = await res.json()
        const result = data.result.songs.map((item: any) => {
          return {
            songID: item.id,
            songName: item.name,
            artistName: item.artists.map((a: any) => a.name).join(','), 
            albumName: item.album.name
          } 
        })
        if (spiltDetails.length > 1) {
          return result.filter((item: any) => ((item.artistName === spiltDetails[1]) && (item.albumName === spiltDetails[2])))
        } else {
          return result
        }
      }
    } catch (err) {
      console.error('search music error', err)
      return null
    }
  }
  async getSongInfo(songID: number, songName: string, artistName: string) {
    try {
      const url = `${this.url}/song/wiki/summary?id=${songID}`
      const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
      })
      if (res.status === 200) {
        const ret = await res.json()
        const data = ret.data.blocks[1].creatives
        const imageUrl = ret.data.blocks[1].uiElement.images?.[0].imageUrl || null
        return {
          songID: songID,
          songName: songName,
          artistName: artistName,
          style: data[0]?.resources[0]?.uiElement.mainTitle.title || null,
          tags: data[1]?.resources.map((item: any) => item?.uiElement.mainTitle.title).join(',') || null,
          language: data[2].uiElement.textLinks?.[0].text || null,
          bpm: data[3].uiElement.textLinks?.[0].text || null,
          imageUrl: imageUrl,
          // comment: comment.join('\n')
        }
      }
      return null
      // const res2 = await comment_music({
      //   id: songID,
      // })
      // let comment = res2.body.hotComments.map((item: any) => {
      //   return item.content
      // })
      // if (comment.length > 8) {
      //   comment = comment.slice(0, 8)
      // }
    } catch (err) {
      console.error('get song info error', err)
      return null
    }
  }
}

async function test() {
  const MusicProxy = new NeteaseCloud()
  const songList = await MusicProxy.searchMusic("愿与愁")
  console.log(songList)
  const songInfo = await MusicProxy.getSongInfo(songList[0].songID, songList[0].songName, songList[0].artistName)
  console.log(songInfo)
  // const songList2 = await MusicProxy.searchMusic("xxe290")
};
