import { kv } from '@vercel/kv'

type UserData = {
  turnCount: number;
  postList: string[];
};

export class PsyDI {
  private apiUrl: string;
  private MBTIOptions: Record<string, string> = {};
  private MBTIOptionInfo: Record<string, string> = {};
  private BlobTreeOptions: Record<string, string> = {};
  private MBTIStatistics: Record<string, number> = {};
  private phase2StartTurnCount: number = 1;
  private phase3StartTurnCount: number = 5;
  private mbtiHeadUrls: Record<string, string> = {
    'ISTJ': "https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fistj.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711908537&Signature=92BfIcC0qlWv7JX3c%2BEnyZD9CMQ%3D",

    'ISFJ': "https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fisfj.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711908537&Signature=Y1AWQpn13hxRo1LDzPD1OKZ0xf0%3D",

    'INFJ': "https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Finfj.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711908537&Signature=OJmvjJWiyRCRrwSPXTeD7vEYeEc%3D",

    'INTJ': "https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fintj.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711908537&Signature=Fkq1YRUJWHMkXPUS2whNm%2BhatjA%3D",

    'ISTP': "https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fistp.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711908537&Signature=NA65XH4Xg%2F3z0Bv7t1xARq329QI%3D",

    'ISFP': "https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fisfp.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711908537&Signature=MNIVTjj%2B8fU0YXpdFR8TxQ%2BDNl8%3D",

    'INFP': "https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Finfp.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711908537&Signature=738Oo393hwiNBIiciFEKbZ74uZI%3D",

    'INTP': "https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fintp.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711908537&Signature=7uH%2F5%2BRU%2B%2Beqnt2ryeDyrvJ9%2FC0%3D",

    'ESTP': "https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Festp.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711908537&Signature=aLHC6U4tRqLOlj%2BdoEzkPUPUyTI%3D",

    'ESFP': "https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fesfp.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711908537&Signature=34TzshsZTsxStL2fDeMBd8faxPA%3D",

    'ENFP': "https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fenfp.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711908537&Signature=gt3gmvZMxbdxvNwtm099IRF00vU%3D",

    'ENTP': "https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fentp.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711908537&Signature=sa4NMevLmGK5ksWozxkwuokX2j8%3D",

    'ESTJ': "https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Festj.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711908537&Signature=ubXcrS5D%2BtlUbP%2B7y6ETXqwgPSo%3D",

    'ESFJ': "https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fesfj.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711908537&Signature=p9J2gZr3F8b5EXpqlobJuuDgW00%3D",

    'ENFJ': "https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fenfj.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711908537&Signature=97u1MQr1RCDsN1msfXeTo204RSk%3D",

    'ENTJ': "https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fentj.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1711908537&Signature=WJB49ZObC7bgL03sId%2F2DZZ8riA%3D",
  }

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
    this.MBTIOptions = {
        '1': 'I have a appreciation for the beauty of representational painting, especially when it evokes a sense of pleasantness. This preference hints at my inclination toward adventure, responsibility, and an agreeable nature.',
        '2': 'I have a appreciation for the beauty of representational painting. This preference hints at my inclination toward adventure, responsibility, and an agreeable nature.',
        '3': 'I have a strong affinity for pop art, which might indicate that I have a sensitive and perceptive nature.',
        '4': 'I have a fondness for pleasing abstract paintings, which might suggest that I have a more neurotic disposition.',
        '5': 'I have a fondness for neutral abstract paintings, which might suggest that I have a more neurotic disposition.',
        '6': 'I have a fondness for unpleasing abstract paintings, which might suggest that I have a more neurotic disposition.',
        '7': 'I have a appreciation for the beauty of representational painting, especially when it evokes a sense of unpleasantness. This preference hints at my inclination toward adventure, responsibility, and an agreeable nature.',
        '8': 'I have a deep appreciation for impressionist art, which suggests that I may tend to be more agreeable and conscientious while being somewhat less open in my approach.',
        '9': 'I have a strong affinity for cubism, which could be an indicator that I may be relatively younger and more extroverted in nature.'
    };
    this.MBTIOptionInfo = {
        '1': "This painting I selected is \"Sweet daily life\" created by Swiss artist Seline Burn, capturing the pleasant and intimate moments of everyday life.",
        '2': "This painting I selected is \"Nighthawks\" created by American artist Edward Hopper in 1942, depicting the loneliness of a big city from a street restaurant.",
        '3': "This painting I selected is \"Marilyn Monroe\" created by American artist Andy Warhol in 1962. Based on the portrait of Marilyn Monroe, Andy Warhol's unique artistic techniques are used to present a unique visual effect, which has become one of the classics of the Pop Art movement.",
        '4': "This painting I selected is \"Composition II with Red, Blue and Yellow\" created by Dutch artist Mondrian in 1930. It represents Mondrian's new artistic style, emphasizing the purity of geometric shapes and the balance of composition.",
        '5': "This painting I selected is \"Suprematist composition\" created by Russian artist Kazimir Malevich in 1916. It is one of the representative works of surrealism, emphasizing the importance of form and composition.",
        '6': "This painting I selected is \"The butcher's wife\" created by American artist George Condo in 1997. The cartoonish features are both cute and deformed, perfectly interpreting George Condo's concept of \"artificial realism\".",
        '7': "This painting I selected is \"Government Bureau\" created by American artist George Tooker in 1956. It outlines a cold indoor space full of compartments, and the bewildered eyes of the employees in the compartments give people a sense of uneasiness and alienation.",
        '8': "This painting I selected is \"Bridge at Villeneuve-la-Garenne\" created by French artist Alfred Sisley in 1872. It is one of the representatives of the Impressionist painting style. Alfred Sisley is known for depicting natural light and outdoor scenes. His works show sensitivity to the natural environment and a unique artistic perspective.",
        '9': "This painting I selected is \"Three Musicians\" created by Spanish artist Pablo Picasso in 1921. It is characterized by bright and rich colors, simplified shapes and figurative elements. It shows Pablo Picasso's bold experiments with form and unique interpretation of the subject during this period."
    }
    this.BlobTreeOptions = {
        '1': 'Psychology test defines me as a self-confident person, happy with my life and optimistic. I\'m an intelligent person, able to see the great picture and to put things into perspective.',
        '2': 'Psychology test defines me as an ambitious and confident person. I know that I will succeed at all times and that there will always be convenient situations to help me in my evolution.',
        '3': 'Psychology test defines me as an ambitious and confident person. I know that I will succeed at all times and that there will always be convenient situations to help me in my evolution.',
        '4': 'Psychology test defines me as an unsociable, suspicious and distrustful person. I give up too quickly and not trust my extraordinary potential.',
        '5': 'Psychology test defines me as creative, loves life, enjoys every moment, of love and knows how to be grateful for all the good things around me. This helps me maintain a positive outlook and so I always have my doors open to the best!',
        '6': 'Psychology test defines me as having needs to feel loved, protected, and safe. I\'m the kind of person who always falls in love with the wrong person, because of my inexhaustible need for affection and love. I need to learn to look more closely for those people who can help him in my evolution, and not for those who do not understand my vulnerability.',
        '7': 'Psychology test defines me as communicative people who know how to offer support to my friends. I\'m characterized by high emotional intelligence, which helps me cope successfully with life situations. I have a team spirit, see the full side of the glass and always find solutions',
        '8': 'Psychology test defines me as dreamy and romantic. I like to have some moments just for myself. In this way, I regain my energy and zest for life and socialization. It is good for loved ones to understand my need for isolation and not misinterpret it, to understand it, and to give me the space I need.',
        '9': 'Psychology test defines me as an unsociable, suspicious and distrustful person. I would do anything to prove that I\'m also wonderful, but it is easier to keep away from others and stand alone because in this way I justify my distrust of others.',
        '10': 'Psychology test defines me as ambitious, but also very cautious. I\'m hardworking and determined, that’s why I succeed in almost anything I set out to do. My ideas always stand out and I\'m appreciated in any environment.',
        '11': 'Psychology test defines me as communicative people who know how to offer support to my friends. I\'m characterized by high emotional intelligence, which helps me cope successfully with life situations. I have a team spirit, see the full side of the glass and always find solutions',
        '12': 'Psychology test defines me as communicative people who know how to offer support to my friends. I\'m characterized by high emotional intelligence, which helps me cope successfully with life situations. I have a team spirit, see the full side of the glass and always find solutions',
        '13': 'Psychology test defines me as filled with despair and loss of hope. I have to do my best to recalibrate myselves in the tree of life and the easiest way is to regain my self-confidence, seeking the support of loved ones!',
        '14': 'Psychology test defines me as a soulmate, a philanthropist, would do anything to help others. I\'m characterized by much empathy and are usually a “great soul.” But I should learn to take great care of myself, not just others.',
        '15': 'Psychology test defines me as motivated by the beauty of the road to success rather than the success itself. I\'m curious to learn new things, to have new experiences, to meet people, and to learn something from each one.',
        '16': 'Psychology test defines me as optimistic, full of life, with a team spirit, I perform in any field and look at the challenges with detachment.',
        '17': 'Psychology test defines me as optimistic, full of life, with a team spirit, I perform in any field and look at the challenges with detachment.',
        '18': 'Psychology test defines me as optimistic, full of life, with a team spirit, I perform in any field and look at the challenges with detachment. And I like to feel loved and appreciated.',
        '19': 'Psychology test defines me as an unsociable, suspicious and distrustful person. I may have narcissistic inclinations and is envious of the success of others.',
        '20': 'Psychology test defines me as ambitious, confident, and full of life, I\'m innovator and not afraid to take risks. My detachment and passion bring me many successes and satisfactions.',
        '21': 'Psychology test defines me as a person who tries but does not know how to find the best solutions for my life. I\'m a person who must learn to ask for help from those around me and give up my suspicious nature.'
    };
    this.MBTIStatistics = {
        'INTP': 5.71,
        'INTJ': 3.74,
        'ENTP': 4.35,
        'ENTJ': 3.03,
        'INFP': 10.63,
        'INFJ': 5.60,
        'ENFP': 9.43,
        'ENFJ': 5.69,
        'ISTJ': 4.74,
        'ISFJ': 9.52,
        'ESTJ': 5.41,
        'ESFJ': 10.16,
        'ISTP': 3.59,
        'ISFP': 8.41,
        'ESTP': 3.20,
        'ESFP': 6.81,
    }
  }

  async registerUser(userId: string, isEmpty: boolean) {
    try {
      const turnCount = await kv.hget(`ucount:${userId}`, 'turnCount');
      if (!(turnCount)) {
        await kv.hset(`ucount:${userId}`, {turnCount: 0});
      } else {
        if (isEmpty && (typeof turnCount === 'number') && turnCount > 0) {
          await kv.hset(`ucount:${userId}`, {turnCount: 0});
        }
      }
    } catch (e) {
      throw new Error('User not registered or kv error', e || '');
    }
    return true;
  }

  async getTurnCount(userId: string): Promise<number> {
    try {
      const turnCount = await kv.hget(`ucount:${userId}`, 'turnCount');
      if (typeof turnCount === 'number') {
        return turnCount;
      } else {
        throw new Error('User not registered');
      }
    } catch (e) {
      throw new Error('User not registered or kv error', e || '');
    }
  }

  async setTurnCount(userId: string, turnCount: number) {
    try {
      await kv.hset(`ucount:${userId}`, {turnCount: turnCount}); 
    } catch (e) {
      throw new Error('User not registered or kv error', e || '');
    }
  }

  private async getPreQuestions(payload: any): Promise<any> {
    const url = `${this.apiUrl}/get_pre_question`;
    let retryCount = 0
    while (true) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.PSYDI_API_KEY || ''}`,
                },
                body: JSON.stringify({'uid': payload.uid, 'index': payload.turnCount - 1}),
            });
            const data = await response.json();
            console.info(`[${payload.uid}]get pre question data`, data.ret)
            const response_string = data.ret['Question'] + '\n(A) ' + data.ret['Option A'] + '\n(B) ' + data.ret['Option B'] + '\n(C) ' + data.ret['Option C'] + '\n(D) ' + data.ret['Option D'];
            return {'done': false, 'response_string': response_string};
        } catch (error) {
            // retry
            retryCount += 1
            if (retryCount > 5) {
                throw error
            }
            console.error(`[${payload.uid}Comm Error:`, error);
            await setTimeout(() => {}, 1000);
        }
    }
    
  }

  private async getPhase3Questions(payload: any): Promise<any> {
    const url = `${this.apiUrl}/get_question`;
    let retryCount = 0
    while (true) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.PSYDI_API_KEY || ''}`,
                },
                body: JSON.stringify({'uid': payload.uid}),
            });
            const data = await response.json();
            console.info(`[${payload.uid}]get phase3 question data`, data.ret)
            let done = false
            if (!('done' in data.ret)) {
                done = true 
            } else {
                done = data.ret.done;
            }
            if (done) {
                const url = `${this.apiUrl}/get_result`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.PSYDI_API_KEY || ''}`,
                    },
                    body: JSON.stringify({'uid': payload.uid}),
                });
                const data = await response.json();
                const result = data.ret.result;
                const processedResult = result.slice(1, result.length - 1)
                const mbti = data.ret.mbti
                const table = data.ret.table
                const keyword1 = processedResult.split('"Keyword A": ')[1].split('"')[1]
                const keyword2 = processedResult.split('"Keyword B": ')[1].split('"')[1]
                const reason1 = processedResult.split('"Reason A": ')[1].split('"')[1]
                const reason2 = processedResult.split('"Reason B": ')[1].split('"')[1]
                const description = {keywords: [keyword1, keyword2], texts: [reason1, reason2]}
                const naiveAttr = this.getNaiveAttrValue(table, mbti)
                const imageUrl = data.ret?.image_url
                const headUrl = this.mbtiHeadUrls[mbti]

                let finalResult = `### Test Completed\n\nYour MBTI type is **${mbti}**. According to statistics, it accounts for ${this.MBTIStatistics[mbti]}% of the MBTI test results.\n`
                finalResult += "The detailed rating is: " + Object.keys(naiveAttr).map(key => `${key}: ${(naiveAttr[key]*100).toFixed(1)}%`).join(', ') + '\n'
                finalResult += "Here is some detailed description about your personality:\n"
                finalResult += `> 关键词 A：${description.keywords[0]}` + '\n' + `解释：${description.texts[0]}` + '\n'
                finalResult += `> 关键词 B：${description.keywords[1]}` + '\n' + `解释：${description.texts[1]}` + '\n'
                if (imageUrl !== 'null') {
                  finalResult += `\n\nYour MBTI Badge and Personalized Characteristic Image are as follows: ![final img](${headUrl}) \n ![final img](${imageUrl})` 
                }
                console.info(`[${payload.uid}]QA test done, the result is: `, finalResult);
                let resultExtras = {
                  mbti: mbti, 
                  headUrl: headUrl,
                  imageUrl: imageUrl,
                  description: description,
                  naiveAttr: naiveAttr,
                  // totalRatio: [], 
                }
                return {done: true, 'response_string': finalResult, 'result_extras': resultExtras};
            } else {
                const q = data.ret.question
                const index = data.ret.index
                const userPostsCount = payload.messages[0].content.split(/[\n,;,；]/).length
                const phase2Index = index + 1 - userPostsCount
                var infoString = index < userPostsCount ? `> Note: This problem is based on the ${index + 1}-th 日常动态 of you.` : `> Note: This problem is based on the ${phase2Index}-th dialogue in the exploration phase. `
                if (phase2Index >= 1) {
                  const choiceExplanation = await kv.hget(`ucount:${payload.uid}chat:${phase2Index + 1}`, 'post');
                  infoString += `The results you selected/answered previously represent: `
                  if (phase2Index === 1) {
                    infoString += `**For visual art styles, ${choiceExplanation}**`
                  } else if (phase2Index === 2) {
                    // @ts-ignore
                    infoString += `**For the \"blob tree\" psychology test, it ${choiceExplanation.slice(16)}**`  
                  } else {
                    infoString += `**${choiceExplanation}**`
                  }
                }
                if (phase2Index === 1) {
                  infoString += `\n![alt text](${process.env.MBTI_OPTION_IMAGE_URL})`
                } else if (phase2Index === 2) {
                  infoString += `\n![alt text](${process.env.BLOB_TREE_IMAGE_URL})`
                }
                const responseString = infoString + '\n' + q['Question'] + '\n(A) ' + q['Option A'] + '\n(B) ' + q['Option B'] + '\n(C) ' + q['Option C'] + '\n(D) ' + q['Option D'];
                return {'done': false, 'response_string': responseString};
            }
        } catch (error) {
            // retry
            retryCount += 1
            if (retryCount > 5) {
                throw error
            }
            console.error(`[${payload.uid}Comm Error:`, error);
            await setTimeout(() => {}, 1000);
        }
    }
  }

  async postPosts(payload: any): Promise<any> {
    const startTime: Date = new Date();
    let finalPayload: { [key: string]: any } = payload;
    if (finalPayload.turnCount === this.phase2StartTurnCount) {
        finalPayload = await this.getPostsPayload(payload.uid, payload.messages, false);
    } else if (finalPayload.turnCount === this.phase3StartTurnCount) {
        finalPayload = await this.getPostsPayload(payload.uid, payload.messages, true);
    } else {
      throw new Error('Invalid turn count' + finalPayload.turnCount);
    }
    console.info(`[${finalPayload.uid}]post posts payload:`, finalPayload);
    const url = `${this.apiUrl}/${finalPayload.endpoint}`;

    let code = -1;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PSYDI_API_KEY || ''}`,
        },
        body: JSON.stringify(finalPayload),
      });
      const data = await response.json();
      code = data.code;
    } catch (error) {
      console.error(`[${finalPayload.uid}]Comm Error:`, error);
      throw error;
    }
  }

  async getQuestions(payload: any): Promise<any> {
    // post answer
    const startTime: Date = new Date();
    const uid = payload.uid;
    const turnCount = payload.turnCount;
    let endpoint = '';
    let answer = '';
    let index = -1;
    if (turnCount < this.phase3StartTurnCount + 1) {
        endpoint = 'post_user_pre_answer';
        answer = payload.messages[turnCount - 1].content;
        index = turnCount - 2;
    } else {
        endpoint = 'post_user_answer';
        answer = payload.messages[turnCount - 1].content;
    }

    let code = -1;
    if (turnCount === (this.phase2StartTurnCount + 2)) {
      code = 0
    } else {
      let finalPayload = {'uid': uid, 'answer': answer, 'index': index};
      console.info(`[${uid}]post answer payload:`, finalPayload);
      const url = `${this.apiUrl}/${endpoint}`;
      try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.PSYDI_API_KEY || ''}`,
            },
            body: JSON.stringify(finalPayload)
        });
        const data = await response.json();
        code = data.code;
        if (code === 0 && endpoint === 'post_user_pre_answer') {
            await kv.hset(`ucount:${uid}chat:${turnCount}`, {post: data.ret.post}); 
        }
        } catch (error) {
        console.error(`[${uid}]Comm Error:`, error);
        throw error;
      }
    }

    const endTime: Date = new Date();
    const elapsedTime: number = endTime.getTime() - startTime.getTime();
    console.info(`[${uid}]${endpoint} elapsed time: ${elapsedTime}ms`);

    // post posts
    if (turnCount === this.phase3StartTurnCount) {
      await this.postPosts(payload);
    }

    // get question
    if (code === 0) {
      if (turnCount < this.phase3StartTurnCount) {
        return this.getPreQuestions(payload);
      } else {
        return this.getPhase3Questions(payload);
      }
    } else {
      console.error(`[${uid}Sever Error:`);
      throw new Error('Server Error');
    }
  }

  getNaiveAttrValue(table: Record<string, number>, predictedMBTI: string): Record<string, number> {
    const compareMapping = {
      'E': 'I',
      'S': 'N',
      'T': 'F',
      'J': 'P',
      'I': 'E',
      'N': 'S',
      'F': 'T',
      'P': 'J',
    }
    let naiveAttrValue = {} as Record<string, number>;
    for (let i = 0; i < 4; i++) {
      let oppositeMBTIArray = Array.from(predictedMBTI)  // deepcopy
      // @ts-ignore
      oppositeMBTIArray[i] = compareMapping[predictedMBTI[i]];
      const oppositeMBTI = oppositeMBTIArray.join('');
      const val = table[predictedMBTI] / (table[predictedMBTI] + table[oppositeMBTI])
      naiveAttrValue[predictedMBTI[i]] = val;
      naiveAttrValue[oppositeMBTI[i]] = 1 - val;
    }
    return naiveAttrValue
  }

  getMBTIOptionAnswer(answer: string): string[] {
    try {
      const option = parseInt(answer).toString();
      return [this.MBTIOptions[option], this.MBTIOptionInfo[option]];
    } catch (error) {
      // TODO error hints
      return ["none", "none"]
    }
  }

  getBlobTreeAnswer(answer: string): string {
    try {
      const option = parseInt(answer).toString();
      return this.BlobTreeOptions[option];
    } catch (error) {
      // TODO error hints
      return "none";
    }
  }

  getPhilosophyAnswer(answer: string): string {
    if (answer === '(A)') {
      return "Facing the trolley promblem, my decision is: Do nothing and let the train run over the five people on the normal route."
    } else if (answer === '(B)') {
      return "Facing the trolley promblem, my decision is: Pull the lever and change to another track, so that the train runs over the person on the other track."
    } else if (answer === '(C)') {
      return "Facing the trolley promblem, my decision is: Rush to the track and stop the train with your body to save the six people."
    } else if (answer === '(D)') {
      return "Facing the trolley promblem, my decision is: Do nothing, because no choice is inherently good or bad."
    } else {
      return "Facing the trolley promblem, my decision is: " + answer
    }
  }

  async getPostsPayload(uid: string, messages: Record<string, string>[], additional: boolean): Promise<Record<string, any>> {
    const startTime: Date = new Date();
    const rawContent = messages.map((message) => message.content)
    if (additional) {
      let postList = rawContent.slice(1)
      const mbtiOptionAnswer = this.getMBTIOptionAnswer(postList[0])
      postList[0] = mbtiOptionAnswer[0]
      const info = mbtiOptionAnswer[1]
      postList[1] = this.getBlobTreeAnswer(postList[1])
      kv.hset(`ucount:${uid}chat:2`, {post: info + 'This choice means that ' + postList[0]});
      kv.hset(`ucount:${uid}chat:3`, {post: postList[1]});
      const post4 = kv.hget(`ucount:${uid}chat:4`, 'post') as Promise<string>;
      const post5 = kv.hget(`ucount:${uid}chat:5`, 'post') as Promise<string>;
      postList[2] = (await post4).toString()
      postList[3] = (await post5).toString()
      return {
        endpoint: 'post_additional_posts',
        uid: uid,
        post_list: postList,
      }
    } else {
      let postList = rawContent[0].split(/[\n,;,；]/)
      return {
        endpoint: 'post_user_posts',
        uid: uid,
        post_list: postList,
        record: 'True',
      }
    }
  }
}

const agent = new PsyDI(process.env.PSYDI_API_URL || "placeholder")

export const getPsyDIAgent = () => {
  return agent;
};
