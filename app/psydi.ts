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
        '1': "这幅画是瑞士艺术家 Seline Burn 所创作的《Sweet daily life》，捕捉了日常生活中惬意而亲切的瞬间。",
        '2': "这幅画是美国艺术家 Edward Hopper 于1942年创作的《Nighthawks》，从一家街边餐馆中描绘出一座大城市的孤独。",
        '3': "这幅画是美国艺术家 Andy Warhol 于 1962 年创作的《Marilyn Monroe》，以梦露的肖像为基础，运用 Andy Warhol 独特的艺术手法，呈现出了独特的视觉效果，成为波普艺术运动中的经典之一。",
        '4': "这幅画是荷兰艺术家 Mondrian 于1930年创作的抽象艺术作品《Composition II with Red, Blue and Yellow》，代表了 Mondrian 的新艺术风格，强调几何形状的纯净和构图的平衡。",
        '5': "这幅画是俄罗斯艺术家 Kazimir Malevich 于1916年创作的《Suprematist composition》，是超现实主义的代表作之一，强调了形式和构图的重要性。",
        '6': "这幅画是美国艺术家 George Condo 于1997 年创作的《The butcher's wife》，其中卡通化的特征既可爱又畸形，完美地诠释了 George Condo 的“人造现实主义”概念。",
        '7': "这幅画是美国艺术家 George Tooker 于1956年创作的《Government Bureau》勾勒出一个充满隔间的阴冷室内，隔间内雇员茫然的眼神给人一种不安的疏远感。",
        '8': "这幅画是法国艺术家 Alfred Sisley 于1872年创作的《Bridge at Villeneuve-la-Garenne》，是印象派绘画风格的代表之一。Alfred Sisley 以描绘自然光影和户外场景而闻名，他的作品展现了对自然环境的敏感和独特的艺术视角。",
        '9': "这幅画是西班牙艺术家 Pablo Picasso 于1921年创作的油画《Nous autres musiciens (Three Musicians) 》，以明亮丰富的颜色、简化的形状和具象化的元素为特征，展现了 Pablo Picasso 在这一时期对于形式的大胆实验和对于主题的独特演绎。"
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
                // console.info(`[${finalPayload.uid}]final data`, data.ret)
                const result = data.ret.result;
                const processedResult = result.slice(1, result.length - 1)
                const mbti = data.ret.mbti
                const typeTable = data.ret.type_table
                console.log('typeTable', typeTable)
                const imageUrl = data.ret?.image_url
                let finalResult = `### Test Completed\n\nYour MBTI type is **${mbti}**. According to statistics, it accounts for ${this.MBTIStatistics[mbti]}% of the  MBTI  tests.\n\nHere is some detailed description about your personality:\n ${processedResult}`
                if (imageUrl !== 'null') {
                  finalResult += `\n\nYour MBTI Personalized Characteristic Image: ![final img](${imageUrl})` 
                }
                console.info(`[${payload.uid}]QA test done, the result is: `, finalResult);
                return {done: true, 'response_string': finalResult};
            } else {
                const q = data.ret.question
                const index = data.ret.index
                const userPostsCount = payload.messages[0].content.split(/[\n,;,；]/).length
                const phase2Index = index + 1 - userPostsCount
                var infoString = index < userPostsCount ? `> Note: This problem is based on the ${index + 1}-th user 日常动态.` : `> Note: This problem is based on the ${phase2Index}-th dialogue in the exploration phase. `
                if (phase2Index >= 1) {
                  const choiceExplanation = await kv.hget(`ucount:${payload.uid}chat:${phase2Index + 1}`, 'post');
                  infoString += `The results you selected/answered previously represent: `
                  if (phase2Index === 1) {
                    infoString += `**For visual art styles, ${choiceExplanation}**`
                  } else if (phase2Index === 2) {
                    // @ts-ignore
                    infoString += `**For the 'blob tree' psychology test, it ${choiceExplanation.slice(16)}`  
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
      kv.hset(`ucount:${uid}chat:2`, {post: '我所选的' + info + 'This choice means that ' + postList[0]});
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
        record: false,
      }
    }
  }
}

const agent = new PsyDI(process.env.PSYDI_API_URL || "placeholder")

export const getPsyDIAgent = () => {
  return agent;
};
