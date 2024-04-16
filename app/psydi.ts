import { kv } from '@vercel/kv'
import { auth, clear, getTurnCount, setTurnCount } from '@/auth'
import { NeteaseCloud } from '@/lib/neteasecloud'
import { mbtiExplanation } from '@/app/mbti-explanation'

const lang = process.env.LANG || 'zh' // default to zh
const assert = require('assert');
assert(lang == 'zh' || lang == 'en')

var texts = {
  userMusicResponse: "",
  userPostsResponse: "",
  userPostsExamples: [] as string[], 
  explorationPhaseResponse: "",
  mbtiOptionResponse: "",
  mbtiOptionResponseSupp: "",
  mbtiOptionExtensionResponse: "",
  mbtiOptionExtensionResponseSupp: "",
  philosophyResponse: "",
  philosophyAnswers: "",
  blobTreeResponse: "",
  blobTreeResponseSupp: "",
};
if (lang === 'zh') {
    texts.userMusicResponse = "音乐是一种表达情感的通用语言，无论你来自何方，它都能让我们的心灵沟通无阻。作为沟通的第一步，您可以分享一首您最喜欢的音乐，或者您最近常听的一首歌。（系统会尝试结合曲库搜索，您可直接输入发送或等待智能搜索结果再确认）"
    texts.userPostsResponse = "接下来，让我们从日常生活聊起。最近有什么趣事吗？您有什么想法和感受？在您输入一段想法后请点击提交。（**单条或多条动态均可**，多条动态之间以中文分号分隔）\n以下是一些参考示例：\n"
    texts.userPostsExamples = [
      "> 我喜欢与不同的人聊天，分享我的经历。我也喜欢听他们的故事。与人交谈让我能发现新乐趣。",
      "> 小时候，我是一个饱读书籍和常常天马行空地想象的孩子；今天是我的幸运日",
      "> 没有什么有趣的事情，或者说，任何事物都有趣味的一面。",
      "> 我觉得似乎没有人愿意谈论对我最重要的事情，或者似乎没有人关心这些事情。如果我最终谈论到我的兴趣，似乎对方会感到烦恼或无聊。",
    ]
    texts.mbtiOptionResponse = "首先，我很好奇您对于视觉艺术的喜好。请在以下九张图片中选择您最喜欢的一张，并告诉我您选择的编号。" 
    texts.mbtiOptionResponseSupp = "（输入对应的图片编号 1-9）"
    texts.mbtiOptionExtensionResponse = "基于您上一轮的选择，请在**以下六张延伸图片**中选择一张最符合您的，告诉我对应的编号。"
    texts.mbtiOptionExtensionResponseSupp = "（输入对应的图片编号 1-6）"
    texts.philosophyResponse = "著名的“电车难题”是一个富有争议的话题。我很想听听您的想法，请选择一项最符合的，或直接告诉我您的见解。"
    texts.philosophyAnswers = "(A) 什么也不做，让列车按照正常路线碾压过这五个人。\n(B) 拉下操纵杆，改变为另一条轨道，使列车压过另一条轨道上的那个人。\n(C) 冲向轨道用肉身拦住电车救下六个人。\n(D) 什么都不做，因为没有任何一种选择本质上是好的还是坏的。"
    texts.blobTreeResponse = "然后，请在以下图片中选择一个让您感到最舒适安心的位置（blob），并告知我对应的 blob 编号。"
    texts.blobTreeResponseSupp = "（输入对应的 blob 编号 1-21）"
} else if (lang === 'en') {
    texts.userMusicResponse = "Music is a universal language that expresses emotions. No matter where you come from, it can help our hearts communicate without barriers. As the first step of communication, you can share a song you like the most, or a song you often listen to recently."
    texts.userPostsResponse = "Then, let's start with your daily life. What's new? What are your thoughts and feelings? Please submit your thoughts after you type them in (separate multiple posts with a semicolon or new line).\nHere are some examples for your reference:\n"
    texts.userPostsExamples = [
        "> I like to talk to different people and share my experiences. I also like to hear their family stories. Talking to people makes me feel connected to society.",
        "> When I was a child, I was a child who read a lot of books and often imagined wildly.",
        "> There is nothing interesting, or rather, everything has an interesting side.",
        "> I feel that no one seems to be willing to talk about the most important things to me, or that no one seems to care about them. If I eventually talk about my interests, it seems that the other party will feel annoyed or bored.",
    ];
    texts.mbtiOptionResponse = "First, I am curious about your preferences for visual arts. Please choose your favorite one from the following nine pictures and tell me the number you choose."
    texts.mbtiOptionResponseSupp = "(Enter the corresponding picture number 1-9)"
    texts.mbtiOptionExtensionResponse = "Based on your previous choice, please choose the one that best suits you from the **following six extended pictures** and tell me the corresponding picture number."
    texts.mbtiOptionExtensionResponseSupp = "(Enter the corresponding picture number 1-6)"
    texts.philosophyResponse = "The famous 'trolley problem' is a controversial topic. I would like to hear your thoughts. Please choose the one that best suits you, or tell me your thoughts directly."
    texts.philosophyAnswers = "(A) Do nothing and let the train run over the five people on the normal route. (B) Pull the lever and change to another track, so that the train runs over the person on the other track. (C) Rush to the track and stop the train with your body to save the six people. (D) Do nothing, because no choice is inherently good or bad."
    texts.blobTreeResponse = "Then, please choose a blob position from the following pictures that makes you feel most comfortable and at ease, and tell me the corresponding blob number."
    texts.blobTreeResponseSupp = "(Enter the corresponding blob number 1-21)"
}

const mbtiOptionExtensionStyles = [
	['Representational', 'Expressionism', 'Fauvism', 'GothicSurrealism', 'InkIllustration', 'Cubism'],
	['Representational', 'ByzantinePaintingStyle', 'Cubism', 'EnlightenmentEra', 'Expressionism', 'Impressionism'],
	['Popart', 'Anime', 'ChineseTraditionalPainting', 'Cubism', 'PopArt', 'RococoRevival'],
	['Abstract', 'ChineseTraditionalPainting', 'Cubism', 'Fauvism', 'Ink', 'PostImpressionism'],
	['Abstract', 'ChineseTraditionalPainting', 'Cubism', 'GraphicDesign', 'VectorIllustration', 'WatercolorIllustration'],
	['Abstract', 'AbstractExpressionism', 'Fauvism', 'InkIllustration', 'Naturalism', 'WatercolorIllustration'],
	['Representational', 'AncientEgyptianPaintingStyle', 'AncientRomanPaintingStyle', 'Cubism', 'Pointillism', 'Romanticism'],
	['Impressionist', 'AncientRomanPaintingStyle', 'Anime', 'Cubism', 'Cyberpunk', 'Rococo'],
	['Cubism', 'AncientEgyptianPaintingStyle', 'ByzantinePaintingStyle', 'Cubism', 'PostImpressionism', 'RococoRevival'],
]

function printSortedFormattedObjectStats(obj: Record<string, number>) {
  const entries = Object.entries(obj);
  entries.sort((a, b) => b[1] - a[1]);
  const topEntries = entries.slice(0, 6);
  let output = '';
  for (const [key, value] of topEntries) {
    // first item or items whose value is greater than 70
    if (output?.length === 0 || value >= 70 ) {
      output += `MBTI 类型: ${key} - 倾向: ${value.toFixed(2)}\n`;
    }
  }
  return output;
}

function replaceOptionOutsideParentheses(str: string) {
  const regexA = /(?<!\()A\)(?!\))/g
  const regexB = /(?<!\()B\)(?!\))/g
  const regexC = /(?<!\()C\)(?!\))/g
  const regexD = /(?<!\()D\)(?!\))/g

  var s1 = str.replace(regexA, '(A)');
  var s2 = s1.replace(regexB, '(B)');
  var s3 = s2.replace(regexC, '(C)');
  var s4 = s3.replace(regexD, '(D)');

  return s4
}

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export class PsyDI {
  public postTurnCount: number = 1;
  public phase2StartTurnCount: number = 2;
  public phase3StartTurnCount: number = 7;
  private apiUrl: string;
  private MBTIOptions: Record<string, string> = {};
  private MBTIOptionsInfo: Record<string, string> = {};
  private BlobTreeOptions: Record<string, string> = {};
  private MBTIOptionsTrans: Record<string, string> = {};
  private MBTIOptionsInfoTrans: Record<string, string> = {};
  private BlobTreeOptionsTrans: Record<string, string> = {};
  private MBTIStatistics: Record<string, number> = {};
  private visualArtPrefix: string = '';
  private explanationPrefix: string = '';
  private visualArtChoicePrefix: string = '';
  private musicProxy: NeteaseCloud;
  private mbtiHeadUrls: Record<string, string> = {
    'ISTJ': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fistj.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1720254910&Signature=%2FxkXEFlDVYXFVYK5oLWwVOWID6w%3D',
    'ISFJ': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fisfj.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1720254910&Signature=nqqHJBSys7rJqohJ0jr9gmt4BYU%3D',
    'INFJ': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Finfj.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1720254910&Signature=K5yFV4v7X6%2F0lpKL%2BX35QV88RdI%3D',
    'INTJ': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fintj.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1720254910&Signature=Qxgoz9Dy2XdjOZ%2FBviDSCRA%2FfEs%3D',
    'ISTP': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fistp.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1720254910&Signature=fbbhzhc2k7EUMFhR4FwKtNmtjEM%3D',
    'ISFP': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fisfp.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1720254910&Signature=cxzYjOgkc4iCL7lGtjNjt%2BaH%2FfY%3D',
    'INFP': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Finfp.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1720254910&Signature=M6Hhj4QlxXblH7bp4opRelI3i6w%3D',
    'INTP': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fintp.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1720254910&Signature=dsnX3g10Lkcj5rjID%2BwFGp2sr%2Bo%3D',
    'ESTP': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Festp.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1720254910&Signature=m%2BWkXERFFkk%2FW6lYHdhJ%2FZnd6s4%3D',
    'ESFP': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fesfp.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1720254910&Signature=YoKruBiMadzo%2FXoY2sXlLpJtKTM%3D',
    'ENFP': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fenfp.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1720254910&Signature=e3Hk53UBhh4Sv%2FLWMGESUxHLO60%3D',
    'ENTP': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fentp.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1720254910&Signature=M4WZHVZ5THJ%2FHNSSrBuuVJyECbc%3D',
    'ESTJ': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Festj.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1720254910&Signature=jhaqUg4XkqHPn%2FKn%2BlAnFM7pAQA%3D',
    'ESFJ': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fesfj.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1720254910&Signature=kFCHWhGQYgbktY8Yr5nAEyCwRpU%3D',
    'ENFJ': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fenfj.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1720254910&Signature=jKimGeWuMSjmntLgaitris1y%2FXw%3D',
    'ENTJ': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fhead%2Fentj.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1720254910&Signature=knO6vixIEvrodg2EFaOncl31VSY%3D',
  };
  private mbtiOptionExtensionUrls: Record<string, string> = {
    '1': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fextension%2F1.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1721055788&Signature=X8vmj%2FtOtToaw0XL14ArYbTLa0Y%3D',
    '2': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fextension%2F2.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1721055788&Signature=%2BVmbMDg%2BDBST%2BNEdcIyIf9xx7w4%3D',
    '3': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fextension%2F3.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1721055788&Signature=G0v0pODfKVln%2F9YWmS9zLOCoA6g%3D',
    '4': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fextension%2F4.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1721055788&Signature=wNyxppoGufvzHdPA1L4gasCgKQ0%3D',
    '5': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fextension%2F5.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1721055788&Signature=P9J7h4vDD%2FrNqqXPJMzZAPTbwqs%3D',
    '6': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fextension%2F6.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1721055788&Signature=%2FM8PqYXxyhEYtDUoyIMNl9Hm2Js%3D',
    '7': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fextension%2F7.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1721055788&Signature=2BkbDWEyhZoU0cCWP%2B7NJjOsvn4%3D',
    '8': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fextension%2F8.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1721055788&Signature=8rWpbw2SnJ%2B3gfK01QH3U6RINwQ%3D',
    '9': 'https://psydi.oss-cn-shanghai.aliyuncs.com/official_assets%2Fextension%2F9.png?x-oss-process&OSSAccessKeyId=LTAI5tJqfodvyN7cj7pHuYYn&Expires=1721055788&Signature=C1Vh4Hhry0Q8DlF5s%2Fwv%2FREt%2BbM%3D',
  }
  private musicLabelExample: Record<string, string> = {
    '曲名': '愿与愁',
    '歌手': '林俊杰',
    '曲风': '华语流行',
    '推荐标签': '抒情，紧张，悲伤，抑郁，快乐，爱情，思念，浪漫，苦情，放松，憧憬，治愈，遗憾，感人',
    '语种': '国语',
    'BPM': '72',
  };
  private userLabelExample: Record<string, string> = {
    "年龄": "00后",
    "地区": "沿海地区",
    "职业": "学生",
    "爱好": "游戏，二次元",
    "对待科技态度": "技术保守者",
  };

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
    this.MBTIOptionsInfo = {
        '1': "This painting I selected is \"Sweet daily life\" created by Swiss artist Seline Burn, capturing the pleasant and intimate moments of everyday life.",
        '2': "This painting I selected is \"Nighthawks\" created by American artist Edward Hopper in 1942, depicting the loneliness of a big city from a street restaurant.",
        '3': "This painting I selected is the work of Japanese artist Surat Tomornsak, who is an illustrator who likes the simple, naive, and fresh children. He mainly creates works in the Japanese kawaii style.", 
        '4': "This painting I selected is \"Composition II with Red, Blue and Yellow\" created by Dutch artist Mondrian in 1930. It represents Mondrian's new artistic style, emphasizing the purity of geometric shapes and the balance of composition.",
        '5': "This painting I selected is \"Suprematist composition\" created by Russian artist Kazimir Malevich in 1916. It is one of the representative works of surrealism, emphasizing the importance of form and composition.",
        '6': "This painting I selected is \"The butcher's wife\" created by American artist George Condo in 1997. The cartoonish features are both cute and deformed, perfectly interpreting George Condo's concept of \"artificial realism\".",
        '7': "This painting I selected is \"Government Bureau\" created by American artist George Tooker in 1956. It outlines a cold indoor space full of compartments, and the bewildered eyes of the employees in the compartments give people a sense of uneasiness and alienation.",
        '8': "This painting I selected is \"Bridge at Villeneuve-la-Garenne\" created by French artist Alfred Sisley in 1872. It is one of the representatives of the Impressionist painting style. Alfred Sisley is known for depicting natural light and outdoor scenes. His works show sensitivity to the natural environment and a unique artistic perspective.",
        '9': "This painting I selected is \"Three Musicians\" created by Spanish artist Pablo Picasso in 1921. It is characterized by bright and rich colors, simplified shapes and figurative elements. It shows Pablo Picasso's bold experiments with form and unique interpretation of the subject during this period."
    }
    this.BlobTreeOptions = {
        '1': 'For the "blob tree" psychology test, it defines me as a self-confident person, happy with my life and optimistic. I\'m an intelligent person, able to see the great picture and to put things into perspective.',
        '2': 'For the "blob tree" psychology test, it defines me as an ambitious and confident person. I know that I will succeed at all times and that there will always be convenient situations to help me in my evolution.',
        '3': 'For the "blob tree" psychology test, it defines me as an ambitious and confident person. I know that I will succeed at all times and that there will always be convenient situations to help me in my evolution.',
        '4': 'For the "blob tree" psychology test, it defines me as an unsociable, suspicious and distrustful person. I give up too quickly and not trust my extraordinary potential.',
        '5': 'For the "blob tree" psychology test, it defines me as creative, loves life, enjoys every moment, of love and knows how to be grateful for all the good things around me. This helps me maintain a positive outlook and so I always have my doors open to the best!',
        '6': 'For the "blob tree" psychology test, it defines me as having needs to feel loved, protected, and safe. I\'m the kind of person who always falls in love with the wrong person, because of my inexhaustible need for affection and love. I need to learn to look more closely for those people who can help him in my evolution, and not for those who do not understand my vulnerability.',
        '7': 'For the "blob tree" psychology test, it defines me as communicative people who know how to offer support to my friends. I\'m characterized by high emotional intelligence, which helps me cope successfully with life situations. I have a team spirit, see the full side of the glass and always find solutions',
        '8': 'For the "blob tree" psychology test, it defines me as dreamy and romantic. I like to have some moments just for myself. In this way, I regain my energy and zest for life and socialization. It is good for loved ones to understand my need for isolation and not misinterpret it, to understand it, and to give me the space I need.',
        '9': 'For the "blob tree" psychology test, it defines me as an unsociable, suspicious and distrustful person. I would do anything to prove that I\'m also wonderful, but it is easier to keep away from others and stand alone because in this way I justify my distrust of others.',
        '10': 'For the "blob tree" psychology test, it defines me as ambitious, but also very cautious. I\'m hardworking and determined, that’s why I succeed in almost anything I set out to do. My ideas always stand out and I\'m appreciated in any environment.',
        '11': 'For the "blob tree" psychology test, it defines me as communicative people who know how to offer support to my friends. I\'m characterized by high emotional intelligence, which helps me cope successfully with life situations. I have a team spirit, see the full side of the glass and always find solutions',
        '12': 'For the "blob tree" psychology test, it defines me as communicative people who know how to offer support to my friends. I\'m characterized by high emotional intelligence, which helps me cope successfully with life situations. I have a team spirit, see the full side of the glass and always find solutions',
        '13': 'For the "blob tree" psychology test, it defines me as filled with despair and loss of hope. I have to do my best to recalibrate myselves in the tree of life and the easiest way is to regain my self-confidence, seeking the support of loved ones!',
        '14': 'For the "blob tree" psychology test, it defines me as a soulmate, a philanthropist, would do anything to help others. I\'m characterized by much empathy and are usually a “great soul.” But I should learn to take great care of myself, not just others.',
        '15': 'For the "blob tree" psychology test, it defines me as motivated by the beauty of the road to success rather than the success itself. I\'m curious to learn new things, to have new experiences, to meet people, and to learn something from each one.',
        '16': 'For the "blob tree" psychology test, it defines me as optimistic, full of life, with a team spirit, I perform in any field and look at the challenges with detachment.',
        '17': 'For the "blob tree" psychology test, it defines me as optimistic, full of life, with a team spirit, I perform in any field and look at the challenges with detachment.',
        '18': 'For the "blob tree" psychology test, it defines me as optimistic, full of life, with a team spirit, I perform in any field and look at the challenges with detachment. And I like to feel loved and appreciated.',
        '19': 'For the "blob tree" psychology test, it defines me as an unsociable, suspicious and distrustful person. I may have narcissistic inclinations and is envious of the success of others.',
        '20': 'For the "blob tree" psychology test, it defines me as ambitious, confident, and full of life, I\'m innovator and not afraid to take risks. My detachment and passion bring me many successes and satisfactions.',
        '21': 'For the "blob tree" psychology test, it defines me as a person who tries but does not know how to find the best solutions for my life. I\'m a person who must learn to ask for help from those around me and give up my suspicious nature.'
    };
    if (lang === 'en') {
        this.MBTIOptionsTrans = this.MBTIOptions;
        this.MBTIOptionsInfoTrans = this.MBTIOptionsInfo;
        this.BlobTreeOptionsTrans = this.BlobTreeOptions;
        this.visualArtPrefix = "For visual art styles, "
        this.explanationPrefix = "The results you selected/answered previously represent: "
        this.visualArtChoicePrefix = "This choice possibly means that "
    } else if (lang === 'zh') {
        this.visualArtPrefix = "对于视觉艺术风格方面，"
        this.explanationPrefix = "您之前选择/回答的结果表明（以下为第一人称）："
        this.visualArtChoicePrefix = "这个选择可能意味着"
        this.MBTIOptionsTrans = {
            '1': '我对具有代表性的绘画的美感有很高的欣赏度，尤其是当它唤起了愉悦感的时候。这种偏好暗示了我对冒险、责任和友善的倾向。',
            '2': '我对具有代表性的绘画的美感有很高的欣赏度。这种偏好暗示了我对冒险、责任和友善的倾向。',
            '3': '我对流行艺术有很强的亲和力，这可能表明我有着敏感和有洞察力的天性。',
            '4': '我喜欢令人愉悦的抽象画，这可能表明我有着更神经质的性格。',
            '5': '我喜欢中性抽象画，这可能表明我有着更神经质的性格。',
            '6': '我喜欢令人不愉悦的抽象画，这可能表明我有着更神经质的性格。',
            '7': '我对具有代表性的绘画的美感有很高的欣赏度，尤其是当它唤起了不愉悦感的时候。这种偏好暗示了我对冒险、责任和友善的倾向。',
            '8': '我对印象派艺术有很深的欣赏度，这表明我可能在性格上更加友善和有责任心，同时在处理问题上更加开放。',
            '9': '我对立体主义有很强的亲和力，这可能表明我在性格上相对较年轻，更外向。'
        };
        this.MBTIOptionsInfoTrans = {
            '1': "这是瑞士艺术家 Seline Burn 所创作的《Sweet daily life》，捕捉了日常生活中惬意而亲切的瞬间。",
            '2': "这是美国艺术家 Edward Hopper 于1942年创作的《Nighthawks》，从一家街边餐馆中描绘出一座大城市的孤独。",
            '3': "这是日本艺术家 Surat Tomornsak 的作品，这是一位喜欢孩子们的简单、天真、新鲜的插画家。他主要创作日本 kawaii 风格的作品。",
            '4': "这是荷兰艺术家 Mondrian 于1930年创作的抽象艺术作品《Composition II with Red, Blue and Yellow》，代表了 Mondrian 的新艺术风格，强调几何形状的纯净和构图的平衡。",
            '5': "这是俄罗斯艺术家 Kazimir Malevich 于1916年创作的《Suprematist composition》，是超现实主义的代表作之一，强调了形式和构图的重要性。",
            '6': "这是美国艺术家 George Condo 于1997 年创作的《The butcher's wife》，其中卡通化的特征既可爱又畸形，完美地诠释了 George Condo 的“人造现实主义”概念。",
            '7': "这是美国艺术家 George Tooker 于1956年创作的《Government Bureau》勾勒出一个充满隔间的阴冷室内，隔间内雇员茫然的眼神给人一种不安的疏远感。",
            '8': "这是法国艺术家 Alfred Sisley 于1872年创作的《Bridge at Villeneuve-la-Garenne》，是印象派绘画风格的代表之一。Alfred Sisley 以描绘自然光影和户外场景而闻名，他的作品展现了对自然环境的敏感和独特的艺术视角。",
            '9': "这是西班牙艺术家 Pablo Picasso 于1921年创作的油画《Nous autres musiciens (Three Musicians) 》，以明亮丰富的颜色、简化的形状和具象化的元素为特征，展现了 Pablo Picasso 在这一时期对于形式的大胆实验和对于主题的独特演绎。"
        }
        this.BlobTreeOptionsTrans = {
            '1': '对于 “blob tree” 心理测试，它定义我为一个自信的人，对我的生活感到满意和乐观。我是一个聪明的人，能够看到事物宏观的愿景，并能透过现象看本质。',
            '2': '对于 “blob tree” 心理测试，它定义我为一个雄心勃勃和自信的人。我知道我总是能够成功，总会有幸运且恰当的情况帮助我进步。',
            '3': '对于 “blob tree” 心理测试，它定义我为一个雄心勃勃和自信的人。我知道我总是能够成功，总会有幸运且恰当的情况帮助我进步。',
            '4': '对于 “blob tree” 心理测试，它定义我为一个不合群、猜疑和不信任的人。我经常放弃得太快，不相信我非凡的潜力。',
            '5': '对于 “blob tree” 心理测试，它定义我为一个有创造力、热爱生活、享受每一刻、热爱和知道如何感激周围所有美好事物的人。这有助于我保持积极的态度，因此我总是对最好的事情敞开大门！',
            '6': '对于 “blob tree” 心理测试，它定义我为一个需要被爱、被保护和安全的人。我总是爱上错误的人，因为我对爱和感情的无穷需求。我需要学会更仔细地寻找那些可以帮助我进步的人，而不是那些不理解我的脆弱的人。',
            '7': '对于 “blob tree” 心理测试，它定义我为一个善于沟通的人，我知道如何为我的朋友提供支持。我以高情商著称，这有助于我成功地应对生活中的各种情况。我有团队精神，看到事物的各个方面，总是找到解决方案',
            '8': '对于 “blob tree” 心理测试，它定义我为一个梦幻和浪漫的人。我喜欢有一些属于自己的时刻。这样，我就能恢复精力和对生活和社交的热情。亲人们最好能理解我对隔离的需求，不要误解它，理解它，并给我我需要的空间。',
            '9': '对于 “blob tree” 心理测试，它定义我为一个不合群、猜疑和不信任的人。我会为了证明我也很棒而不惜一切代价，但是与其这样，不如远离他人，独自站立，因为这样我就可以证明我对他人的不信任是合理的。',
            '10': '对于 “blob tree” 心理测试，它定义我为一个雄心勃勃，但也非常谨慎的人。我勤奋而坚定，这就是为什么我几乎在任何我想做的事情上都能成功。我的想法总是脱颖而出，我在任何环境中都受到赞赏。',
            '11': '对于 “blob tree” 心理测试，它定义我为一个善于沟通的人，我知道如何为我的朋友提供支持。我以高情商著称，这有助于我成功地应对生活中的各种情况。我有团队精神，看到事物的各个方面，总是找到解决方案',
            '12': '对于 “blob tree” 心理测试，它定义我为一个善于沟通的人，我知道如何为我的朋友提供支持。我以高情商著称，这有助于我成功地应对生活中的各种情况。我有团队精神，看到事物的各个方面，总是找到解决方案',
            '13': '对于 “blob tree” 心理测试，它定义我为一个充满绝望和失去希望的人。我必须尽我所能在生活中重新校准自己，最简单的方法是恢复自信，寻求亲人的支持！',
            '14': '对于 “blob tree” 心理测试，它定义我为一个灵魂伴侣，一个慈善家，会为了帮助他人而不惜一切。我具有很强的同理心，通常是一个“伟大的灵魂”。但我应该学会照顾自己，而不仅仅是别人。',
            '15': '对于 “blob tree” 心理测试，它定义我为一个受到成功之路美丽的驱使而不是成功本身的人。我很好奇学习新事物，有新的经历，结识新的人，并从每个人身上学到一些东西。',
            '16': '对于 “blob tree” 心理测试，它定义我为一个乐观、充满生机、有团队精神的人，我在任何领域都表现出色，并且在战略上藐视一切挑战。',
            '17': '对于 “blob tree” 心理测试，它定义我为一个乐观、充满生机、有团队精神的人，我在任何领域都表现出色，并且在战略上藐视一切挑战。',
            '18': '对于 “blob tree” 心理测试，它定义我为一个乐观、充满生机、有团队精神的人，我在任何领域都表现出色，并且在战略上藐视一切挑战。而且我喜欢感受到被爱和被赞赏。',
            '19': '对于 “blob tree” 心理测试，它定义我为一个不合群、猜疑和不信任的人。我可能有自恋的倾向，嫉妒别人的成功。',
            '20': '对于 “blob tree” 心理测试，它定义我为一个雄心勃勃、自信、充满生机的人，我是创新者，不怕冒险。我的自信、进取心和激情给我带来了许多成功和满足。',
            '21': '对于 “blob tree” 心理测试，它定义我为一个努力但不知道如何为自己的生活找到最佳解决方案的人。我是一个必须学会向身边的人寻求帮助并放弃自己猜疑的人。'
        }
    }
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
    this.musicProxy = new NeteaseCloud();
  }

  async registerUser(isEmpty: boolean) {
    try {
      const session = await auth(isEmpty);
      const userId = session.user.id;
      const turnCount = await getTurnCount();
      return [userId, turnCount]
    } catch (e) {
      throw new Error('User not registered or cookie error', e || '');
    }
  }

  async getTurnCount(userId: string): Promise<number> {
    try {
      const turnCount = await getTurnCount();
      if (typeof turnCount === 'number') {
        return turnCount;
      } else {
        throw new Error('User not registered');
      }
    } catch (e) {
      throw new Error('User not registered or cookie error', e || '');
    }
  }

  async setTurnCount(userId: string, turnCount: number) {
    try {
      await setTurnCount(turnCount);
    } catch (e) {
      throw new Error('User not registered or cookie error', e || '');
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
                body: JSON.stringify({'uid': payload.uid, 'index': payload.turnCount - 3}),
            });
            const data = await response.json();
            console.info(`[${payload.uid}]get pre question data`, data.ret)
            const q = data.ret.question
            let responseString = lang == 'en' ? "(Single Select) " : "（单选）"
            if (lang == "en" ) {
                responseString += q['Question_EN'] + '\n(A) ' + q['Option A_EN'] + '\n(B) ' + q['Option B_EN'] + '\n(C) ' + q['Option C_EN'] + '\n(D) ' + q['Option D_EN'];
            } else if (lang == "zh") {
                responseString += q['Question_CN'] + '\n(A) ' + q['Option A_CN'] + '\n(B) ' + q['Option B_CN'] + '\n(C) ' + q['Option C_CN'] + '\n(D) ' + q['Option D_CN'];
            }
            return {'done': false, 'response_string': responseString};
        } catch (error) {
            // retry
            retryCount += 1
            if (retryCount > 5) {
                throw error
            }
            console.error(`[${payload.uid}]Comm Error:`, error);
            await sleep(1000);
        }
    }
    
  }

  private async getPhase3Questions(payload: any): Promise<any> {
    const url = `${this.apiUrl}/get_question`;
    let retryCount = 0
    let done = false
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
            if (!('done' in data.ret)) {
                done = true 
            } else {
                done = data.ret.done;
            }

            if (!done) {
                const question = data.ret.question
                const enPrefix = question.includes('D)') || question.includes('(D') ? "(Multi Select/Free Text) " : (question.includes('A)') || question.includes('(A') ? "(Single Select)" : "(Free Text)")
                const zhPrefix = question.includes('D)') || question.includes('D)') ? "（多选/自由回答）" : (question.includes('A)') || question.includes('(A') ? "（单选）" : "（自由回答）") 
                
                const freeText = question.includes('D)') || question.includes('(D')
                if (freeText) {
                  console.log('free text check: ', question.includes('MBTI'))
                }
                const formattedQuestion = replaceOptionOutsideParentheses(question)
                const q = lang == 'en' ? enPrefix + formattedQuestion : zhPrefix + formattedQuestion
                const index = data.ret.index
                const startOfModule = data.ret.start_of_module
                const hasMusic = data.ret?.has_music
                if (!startOfModule) {
                  return {'done': false, 'response_string': q}
                }

                const userPosts = payload.messages[1].content.split(/[\n|;|；]/)
                const userPostsCount = userPosts.length
                const prefixIndex = hasMusic ? 1 : 0
                const phase2Index = index + 1 - userPostsCount - prefixIndex

                var infoString = ''

                if (lang == 'en') {
                    infoString += "Thank you for your answer. Let's move on to the next stage.\n"
                } else if (lang == 'zh') {
                    infoString += "感谢您的回答。让我们进入下一阶段。\n"
                }
                if (hasMusic && (index == 0)) {
                    const songImage = await kv.hget(`ucount:${payload.uid}songImage`, 'songImage');
                    if (lang == 'en') {
                      infoString = `> Tip: This problem is based on the song you shared.`
                    } else if (lang == 'zh') {
                      infoString += `> 注意：这个问题是基于你分享的歌曲定制设计的。`
                    }
                    infoString += `\n![alt text](${songImage})`
                } else if (index < (userPostsCount + prefixIndex)) {
                    const post = userPosts[index - prefixIndex]
                    if (lang == 'en') {
                      infoString += `> Tip: This problem is based on the ${index - prefixIndex + 1}-th your daily post: ${post}.`
                    } else if (lang == 'zh') {
                      infoString += `> 注意：这个问题是基于你的第${index - prefixIndex + 1}条日常动态：${post}。`
                    }
                } else {
                    if (lang == 'en') {
                      infoString += `> Tip: This problem is based on the ${phase2Index}-th dialogue in the exploration phase.`
                    } else if (lang == 'zh') {
                      infoString += `> 注意：这个问题是基于你在探索阶段的第${phase2Index}条对话定制设计的。`
                    }
                }

                if (phase2Index >= 1) {
                  const choiceExplanation = await kv.hget(`ucount:${payload.uid}chat:${phase2Index + 2}`, 'post');
                  infoString += this.explanationPrefix
                  if (phase2Index === 1) {
                    infoString += `**${this.visualArtPrefix} ${choiceExplanation}**`
                  } else if (phase2Index === 2) {
                    infoString += `**${choiceExplanation}**`
                  } else {
                    infoString += `**${choiceExplanation}**`
                  }
                }
                if (phase2Index === 1) {
                  infoString += `\n![alt text](${process.env.MBTI_OPTION_IMAGE_URL})`
                } else if (phase2Index === 2) {
                  infoString += `\n![alt text](${process.env.BLOB_TREE_IMAGE_URL})`
                }
                let responseString = infoString + '\n' + q
                return {'done': false, 'response_string': responseString};
            } else {
                break
            }
        } catch (error) {
            // retry
            retryCount += 1
            if (retryCount > 5) {
                throw error
            }
            console.error(`[${payload.uid}Get Question Comm Error:`, error);
            await sleep(1000);
        }
    }
    
    let retryCount2 = 0
    while (done) {
        try {
            const url = `${this.apiUrl}/get_result`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.PSYDI_API_KEY || ''}`,
                },
                body: JSON.stringify({'uid': payload.uid, 'task': 'mbti'}),
            });
            const data = await response.json();
            const result = data.ret.result;
            const mbti = data.ret.mbti
            const table = data.ret.table
            const headUrl = this.mbtiHeadUrls[mbti]

            let finalResult = ""
            const finalIndex = (Object.keys(table).length).toString()
            if (lang == 'en') {
                finalResult += `### Test Completed\n![head img](${headUrl}) \nYour MBTI type is **${mbti}**. According to statistics, it accounts for ${this.MBTIStatistics[mbti]}% of the MBTI test results.\n`
                finalResult += `The high propensity personality types, as well as the changes in MBTI personality type scores across various assessment stages, are as follows: \n${printSortedFormattedObjectStats(table[finalIndex])}\n`
            } else if (lang == 'zh') {
                finalResult += `### 测试完成\n![head img](${headUrl}) \n你的 MBTI 人格类型推测是 **${mbti}**，根据统计，它占 MBTI 测试结果人数的${this.MBTIStatistics[mbti]}%。\n`
                // @ts-ignore
                finalResult += mbtiExplanation[mbti] + '\n'
                finalResult += `其中的高倾向人格类型，以及测评各阶段的 MBTI 人格类型评分变化情况如下：\n${printSortedFormattedObjectStats(table[finalIndex])}\n`
            }

            console.info(`[${payload.uid}]QA test done, the result is: `, finalResult);
            let resultExtras = {
                mbti: mbti, 
                headUrl: headUrl,
                table: table,
            }
            return {done: true, 'response_string': finalResult, 'result_extras': resultExtras};
        } catch (error) {
            // retry
            retryCount2 += 1
            if (retryCount2 > 5) {
                throw error
            }
            console.error(`[${payload.uid}Final Result Comm Error:`, error);
            await sleep(1000);
        }
    }
  }

  async postPosts(payload: any): Promise<any> {
    const startTime: Date = new Date();
    let finalPayload: { [key: string]: any } = payload;
    if (finalPayload.turnCount === this.phase2StartTurnCount) {
        finalPayload = await this.getPostsPayload(payload.uid, payload.messages, payload.startInfo, false);
    } else if (finalPayload.turnCount === this.phase3StartTurnCount) {
        finalPayload = await this.getPostsPayload(payload.uid, payload.messages, "", true);
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
      console.error(`[${finalPayload.uid}] Post User Posts Comm Error:`, error);
      throw error;
    }
  }

  async returnLastQuestion(uid: string): Promise<boolean> {
      const finalPayload = {'uid': uid};
      console.info(`[${uid}]post user backstep payload:`, finalPayload);
      const url = `${this.apiUrl}/post_user_backstep`;
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
        } catch (error) {
          console.error(`[${uid}]Backstep Comm Error:`, error);
          throw error;
      }
      return true;
  }

  async getQuestions(payload: any): Promise<any> {
    // 1. pre-defined questions
    const turnCount = payload.turnCount;
    if (turnCount === 0) {
      return {'done': false, 'response_string': texts.userMusicResponse};
    } else if (turnCount === this.postTurnCount) {
      return {'done': false, 'response_string': texts.userPostsResponse + texts.userPostsExamples.join('\n')};
    } else if (turnCount === (this.phase2StartTurnCount)) {
      // post user posts
      this.postPosts(payload);
      await sleep(Math.floor(Math.random() * 1000) + 1500);
      return {'done': false, 'response_string': texts.mbtiOptionResponse + `![alt text](${process.env.MBTI_OPTION_IMAGE_URL})${texts.mbtiOptionResponseSupp}`};
    } else if (turnCount === (this.phase2StartTurnCount + 1)) {
      await sleep(Math.floor(Math.random() * 1000) + 500);
      const selectedImageNum = payload.messages[turnCount - 1].content;
      const imgUrl = this.mbtiOptionExtensionUrls[selectedImageNum]
      return {'done': false, 'response_string': texts.mbtiOptionExtensionResponse + `![alt text](${imgUrl})${texts.mbtiOptionExtensionResponseSupp}`};
    } else if (turnCount === (this.phase2StartTurnCount + 2)) {
      await sleep(Math.floor(Math.random() * 1000) + 500);
      return {'done': false, 'response_string': texts.blobTreeResponse + `![alt text](${process.env.BLOB_TREE_IMAGE_URL})${texts.blobTreeResponseSupp}`};
    }

    // 2. generated questions
    // post answer
    const startTime: Date = new Date();
    const uid = payload.uid;
    let endpoint = '';
    let answer = '';
    let index = -1;
    if (turnCount < this.phase3StartTurnCount + 1) {
        endpoint = 'post_user_pre_answer';
        answer = payload.messages[turnCount - 1].content;
        index = turnCount - 4;
    } else {
        endpoint = 'post_user_answer';
        answer = payload.messages[turnCount - 1].content;
    }

    let code = -1;
    if (turnCount === (this.phase2StartTurnCount + 3)) {
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
            await kv.hset(`ucount:${uid}chat:${turnCount - 1}`, {post: data.ret.post});
        }
        } catch (error) {
          console.error(`[${uid}]Comm Error:`, error);
          throw error;
      }
    }

    const endTime: Date = new Date();
    const elapsedTime: number = endTime.getTime() - startTime.getTime();
    console.info(`[${uid}]${endpoint} elapsed time: ${elapsedTime}ms`);

    // post additional posts
    if (turnCount === this.phase3StartTurnCount) {
      this.postPosts(payload);
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

  getMBTIOptionAnswer(answer: string, answerExtension: string): string[] {
    try {
      const option = parseInt(answer).toString();
      const style = mbtiOptionExtensionStyles[parseInt(option) - 1][parseInt(answerExtension) - 1];
      const backendOption = this.MBTIOptionsTrans[option] + `style: ${style}`;
      return [backendOption, this.MBTIOptionsTrans[option], this.MBTIOptionsInfoTrans[option]];
    } catch (error) {
      // TODO error hints
      return ["none", "none", "none"]
    }
  }

  getBlobTreeAnswer(answer: string): string[] {
    try {
      const option = parseInt(answer).toString();
      return [this.BlobTreeOptionsTrans[option], this.BlobTreeOptionsTrans[option]];
    } catch (error) {
      // TODO error hints
      return ["none", "none"];
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

  async searchMusic(value: string) {
    return await this.musicProxy.searchMusic(value)
  }

  async getPostsPayload(uid: string, messages: Record<string, string>[], startInfo: string, additional: boolean): Promise<Record<string, any>> {
    const startTime: Date = new Date();
    const rawContent = messages.map((message) => message.content)
    if (additional) {
      let postList = []
      const prefix2 = rawContent.slice(2)
      const mbtiOptionAnswer = this.getMBTIOptionAnswer(prefix2[0], prefix2[1])
      const blobTreeAnswer = this.getBlobTreeAnswer(prefix2[2])
      postList.push(mbtiOptionAnswer[0])
      postList.push(blobTreeAnswer[0])

      // here set the kv to provide more details for the user
      kv.hset(`ucount:${uid}chat:3`, {post: mbtiOptionAnswer[2] + this.visualArtChoicePrefix + mbtiOptionAnswer[1]});
      kv.hset(`ucount:${uid}chat:4`, {post: blobTreeAnswer[1]});
      const post5 = kv.hget(`ucount:${uid}chat:5`, 'post') as Promise<string>;
      const post6 = kv.hget(`ucount:${uid}chat:6`, 'post') as Promise<string>;
      postList.push((await post5).toString())
      postList.push((await post6).toString())
      return {
        endpoint: 'post_additional_posts',
        uid: uid,
        post_list: postList,
      }
    } else {
      let musicLabel = null
      const songList = await this.musicProxy.searchMusicWithDetails(rawContent[0])
      if (songList?.length > 0) {
          const songInfo = await this.musicProxy.getSongInfo(songList[0].songID, songList[0].songName, songList[0].artistName)
          if (songInfo) {
            musicLabel = {
              '曲名': songInfo.songName,
              '歌手': songInfo.artistName,
              '曲风': songInfo.style,
              '推荐标签': songInfo.tags,
              '语种': songInfo.language,
              'BPM': songInfo.bpm,
            }
            kv.hset(`ucount:${uid}songImage`, {songImage: songInfo.imageUrl});
          } else {
            console.log('no song info', songList)
          }
      }
      let userLabel: Record<string, string> = {}
      if (startInfo != "") {
        const tmp = startInfo.split('start---')[1].split(';')
        for (let i = 0; i < tmp?.length; i++) {
          const [key, value] = tmp[i].split(': ')
          if (value?.length > 0) {
            userLabel[key] = value
          }
        } 
      }
      let postList = rawContent[1].split(/[\n|;|；]/)

      return {
        endpoint: 'post_user_posts',
        uid: uid,
        post_list: postList,
        music_label: musicLabel,
        label: userLabel,
      }
    }
  }
}

const agent = new PsyDI(process.env.PSYDI_API_URL || "placeholder")

export const getPsyDIAgent = () => {
  return agent;
};
