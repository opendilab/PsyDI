'use client'

import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { errorToaster } from '@/components/toaster'
import { IconTablerArrowLeft, IconTablerArrowRight, IconArrowRight } from '@/components/ui/icons'

const lang = process.env.NEXT_PUBLIC_PSYDI_LANG || 'zh' // default to zh

interface Texts {
  title: string;
  sectionNames: string[];
  backendSectionNames: string[];
  skip: string;
  finalHint: string;
  tagErrorInfo: string;
}

var texts: Texts = {
  title: '',
  sectionNames: [],
  backendSectionNames: [],
  skip: '',
  finalHint: '',
  tagErrorInfo: '',
}
if (lang === 'zh') {
    texts.title = "在进入测试之前，PsyDI 将先为您构筑一个简明的人格画像，请尽可能选择与您相符的标签。（默认单选，兴趣爱好和个性标签可多选）"
    texts.sectionNames = ["年龄段（单选）", "地区（单选）", "职业（单选）", "性别（单选，只影响最终人物形象图性别）", "生活态度（单选）", "科技态度（单选）", "兴趣爱好（多选）", "个性标签（多选）", "您的标签"]
    texts.backendSectionNames = ["年龄", "地区", "职业", "性别", "生活态度", "对待科技态度", "爱好", "个性标签"]
    texts.skip = "跳过【个性化标签】章节"
    texts.finalHint = "再次点击标签以取消选择，点击右下箭头进入对话"
    texts.tagErrorInfo = '请先取消已选标签再选择新标签'
} else if (lang === 'en') {
    texts.title = "Before entering the test, PsyDI will first build a concise personality portrait for you. Please select the tags that match you as much as possible." 
    texts.sectionNames = ["Age group (single pick)", "Region (single pick)", "Occupation (single pick)", "Gender (single pick, only affects the final image)", "Life-style (single pick)", "Technology (single pick)", "Hobbies (multiple pick)", "Tags (multiple pick)", "Your tags"]
    texts.backendSectionNames = ["Age", "Region", "Occupation", "Gender", "Life-style", "Attitude to technology", "Hobbies", "Personal tags"]
    texts.skip = "Skip this section (The customization level of the test will be reduced)"
    texts.finalHint = "Click the tag again to cancel"
    texts.tagErrorInfo = 'Please cancel the selected tags before selecting new tags'
}

type Tag = {
  id: number;
  name: string;
  selected: boolean;
  backendName?: string;
};

var initialTags: Tag[][] = []
if (lang === 'zh') {
  initialTags = [[
    { id: 1, name: '80后', selected: false},
    { id: 2, name: '90后', selected: false},
    { id: 3, name: '00后', selected: false},
    { id: 4, name: '其他', selected: false},
  ],
  [
    { id: 1, name: '沿海地区', selected: false},
    { id: 2, name: '内陆地区', selected: false},
    { id: 3, name: '其他', selected: false},
  ],
  [
    { id: 1, name: '上班族', selected: false},
    { id: 2, name: '学生', selected: false},
    { id: 3, name: '宅家', selected: false}, 
    { id: 4, name: '自由职业', selected: false},
    { id: 5, name: '其他', selected: false},
  ],
  [
    { id: 1, name: '男性', selected: false},
    { id: 2, name: '女性', selected: false},
    { id: 3, name: '其他', selected: false},
  ],
  [
    { id: 1, name: '环保主义者', selected: false},
    { id: 2, name: '极简主义', selected: false},
    { id: 3, name: '极繁主义', selected: false},
  ],
  [
    { id: 1, name: '科技爱好者', selected: false},
    { id: 2, name: '科技保守者', selected: false},
  ],
  [
    { id: 1, name: 'MBTI发烧友', selected: false},
    { id: 2, name: '二次元', selected: false},
    { id: 3, name: '游戏', selected: false},
    { id: 4, name: '旅游', selected: false},
    { id: 5, name: '萌宠', selected: false},
    { id: 6, name: '运动', selected: false},
    { id: 7, name: '美妆', selected: false},
    { id: 8, name: '书籍', selected: false},
    { id: 9, name: '电影', selected: false},
    { id: 10, name: '美食', selected: false},
    { id: 11, name: '时尚', selected: false},
    { id: 12, name: '养生', selected: false},
    { id: 13, name: '历史', selected: false},
  ],
  [
    { id: 1, name: '跳舞', selected: false},
    { id: 2, name: '吃货', selected: false, backendName: '探索美食'},
    { id: 3, name: '钢琴', selected: false},
    { id: 4, name: '篮球', selected: false},
    { id: 5, name: '铲屎官', selected: false, backendName: '养宠物'},
    { id: 6, name: '聚会', selected: false},
    { id: 7, name: '吉他', selected: false},
    { id: 8, name: '手工', selected: false},
    { id: 9, name: 'K歌', selected: false},
    { id: 10, name: '桌游', selected: false},
    { id: 11, name: '背包客', selected: false, backendName: '户外探险旅行'},
    { id: 12, name: '摄影', selected: false},
    { id: 13, name: '写作', selected: false},
    { id: 14, name: '技术宅', selected: false, backendName: '编程工作，极客精神'},
    { id: 15, name: '绘画', selected: false},
    { id: 16, name: '夜猫子', selected: false, backendName: '熬夜'},
    { id: 17, name: '烹饪', selected: false},
    { id: 18, name: '选择恐惧症', selected: false, backendName: '纠结选择的场景'},
    { id: 19, name: '运动达人', selected: false},
    { id: 20, name: '美妆达人', selected: false},
    { id: 21, name: '逛街', selected: false},
    { id: 22, name: '追剧', selected: false, backendName: '看电视剧'},
    { id: 23, name: '泡吧', selected: false, backendName: '去酒吧'},
    { id: 24, name: 'ACG', selected: false, backendName: '喜欢动漫、漫画、游戏'},
  ],
]
} else if (lang === 'en') {
  initialTags = [[
    { id: 1, name: '80s', selected: false},
    { id: 2, name: '90s', selected: false},
    { id: 3, name: '00s', selected: false},
    { id: 4, name: 'others', selected: false},
  ],
  [
    { id: 1, name: 'coastal regions', selected: false},
    { id: 2, name: 'inland regions', selected: false},
    { id: 3, name: 'others', selected: false},
  ],
  [
    { id: 1, name: 'white-collar workers', selected: false},
    { id: 2, name: 'student', selected: false},
    { id: 3, name: 'homebody', selected: false}, 
    { id: 4, name: 'freelancer', selected: false},
    { id: 5, name: 'others', selected: false},
  ],
  [
    { id: 1, name: 'male', selected: false},
    { id: 2, name: 'female', selected: false},
    { id: 3, name: 'others', selected: false},
  ],
  [
    { id: 1, name: 'environmentalist', selected: false},
    { id: 2, name: 'minimalism', selected: false},
    { id: 3, name: 'maximalism', selected: false},
  ],
  [
    { id: 1, name: 'tech. enthusiast', selected: false},
    { id: 2, name: 'tech. conservative', selected: false},
  ],
  [
    { id: 1, name: 'MBTI fans', selected: false},
    { id: 2, name: 'otaku', selected: false},
    { id: 3, name: 'games', selected: false},
    { id: 4, name: 'travel', selected: false},
    { id: 5, name: 'pets', selected: false},
    { id: 6, name: 'sports', selected: false},
    { id: 7, name: 'makeup', selected: false},
    { id: 8, name: 'books', selected: false},
    { id: 9, name: 'movies', selected: false},
    { id: 10, name: 'food', selected: false},
    { id: 11, name: 'fashion', selected: false},
    { id: 12, name: 'wellness', selected: false},
    { id: 13, name: 'history', selected: false},
  ],
  [
    { id: 1, name: 'dancing', selected: false},
    { id: 2, name: 'foodie', selected: false, backendName: 'food exploration'},
    { id: 3, name: 'piano', selected: false},
    { id: 4, name: 'basketball', selected: false},
    { id: 5, name: 'pet owner', selected: false, backendName: 'keeping pets'},
    { id: 6, name: 'party', selected: false},
    { id: 7, name: 'guitar', selected: false},
    { id: 8, name: 'DIY crafts', selected: false},
    { id: 9, name: 'karaoke', selected: false},
    { id: 10, name: 'board games', selected: false},
    { id: 11, name: 'backpacker', selected: false, backendName: 'outdoor adventure travel'},
    { id: 12, name: 'photography', selected: false},
    { id: 13, name: 'writing', selected: false},
    { id: 14, name: 'tech. geek', selected: false, backendName: 'programming work, geek spirit'},
    { id: 15, name: 'painting', selected: false},
    { id: 16, name: 'night owl', selected: false, backendName: 'staying up late'},
    { id: 17, name: 'cooking', selected: false},
    { id: 18, name: 'decidophobia', selected: false, backendName: 'scenes of indecision'},
    { id: 19, name: 'fitness enthusiast', selected: false},
    { id: 20, name: 'beauty guru', selected: false},
    { id: 21, name: 'shopping', selected: false},
    { id: 22, name: 'binge-watching', selected: false, backendName: 'watching TV series'},
    { id: 23, name: 'bar hopper', selected: false, backendName: 'going to a bar'},
    { id: 24, name: 'ACG', selected: false, backendName: 'likes anime, manga, and video games'},
  ],
]
}

function getSelectedTags(tags: Tag[][]) {
  const sections = tags.map((section) => section.filter((tag) => tag.selected).map((tag) => ({ id: tag.id, name: tag.name }) ))
  const unrepeatedSections = texts.backendSectionNames.map((name, index) => sections[index].map((tag) => ({ name: (tag.name == '其他' ? name + "-" + tag.name : tag.name), id: tag.id, sectionIndex: index }) ))
  const pureTags = unrepeatedSections.reduce((acc, val) => acc.concat(val), [])
  
  const sectionsBackend = tags.map((section) => section.filter((tag) => tag.selected).map((tag) => ({ id: tag.id, name: tag?.backendName || tag.name }) ))
  const sectionWithNames = texts.backendSectionNames.map((name, index) => ({ name, tags: sectionsBackend[index].map((tag) => tag.name)}))
  const stringTags = sectionWithNames.map((section) => `${section.name}: ${section.tags.join(', ')}`).join(';')
  return {'stringTags': stringTags, 'tags': pureTags}
}

export interface UserPortraitProps
  extends Pick<
    UseChatHelpers,
    | 'append'
  > {
  id?: string
}
export function UserPortrait({ append, id }: UserPortraitProps) {
  const [currentSection, setCurrentSection] = React.useState(0)
  const [tags, setTags] = React.useState<Tag[][]>(initialTags);
  const { setTheme, theme } = useTheme()
  const bgColor = theme === 'light' ? '#ffffff' : '#212121';
  const antiBgColor = theme === 'light' ? '#212121' : '#ffffff';
  const borderColor = theme === 'light' ? '#212121' : '#ffffff';
  const antiBorderColor = theme === 'light' ? '#ffffff' : '#212121';

  const handleTagClick = (clickedTagId: number) => {
    const isSelected = tags[currentSection].find((tag) => tag.id === clickedTagId)?.selected;
    const hasSectionSelected = tags[currentSection].find((tag) => tag.selected);
    if (currentSection < tags.length - 2 && hasSectionSelected && !isSelected) {
      errorToaster(texts.tagErrorInfo)
      return;
    }
    const updatedTags = tags[currentSection].map((tag) =>
      tag.id === clickedTagId ? { ...tag, selected: !tag.selected } : tag
    );
    const updatedSection = tags.map((section, index) => 
      currentSection === index ? updatedTags : section
    )
    setTags(updatedSection);
    if (!isSelected && currentSection < tags.length - 2) {  // single select mode will auto go to next section
      setTimeout(() => {
        setCurrentSection(Math.min(tags.length, currentSection + 1))
      }, 500)
    }
  };

  const handleFinalTagClick = (clickedTagId: number, sectionIndex: number) => {
    const updatedTags = tags[sectionIndex].map((tag) =>
      tag.id === clickedTagId ? { ...tag, selected: !tag.selected } : tag
    );
    const updatedSection = tags.map((section, index) => 
      sectionIndex === index ? updatedTags : section
    )
    setTags(updatedSection);
  };

  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-muted-foreground font-semibold">
          <span style={{ color: borderColor }}>{texts.title}</span> 
        </h1>
          <Button variant="link" className="h-auto p-0 mb-8 text-muted-foreground" onClick={
            async () => {
              await append({
                id,
                content: "start---",
                role: 'user'
              })
            }
          }>
            { currentSection === 0 && ( 
              <IconArrowRight className="mr-2 text-muted-foreground" />
            )}
            { currentSection === 0 && ( 
              <span className="text-muted-foreground">{texts.skip}</span>
            )}
            { currentSection !== 0 && (
              <span className="mb-1"> </span>
            )}
          </Button>
        <p className="mb-2 leading-normal text-lg font-semibold" style={{ color: borderColor, fontSize: '1.5rem'}}>
          {texts.sectionNames[currentSection]}
        </p>
    <div>
      { currentSection === tags.length ? (
        getSelectedTags(tags).tags.map((tag) => (
          <button
            key={`${tag.id}-${tag.sectionIndex}`}
            onClick={() => handleFinalTagClick(tag.id, tag.sectionIndex)}
            style={{ margin: '8px', marginLeft: '0px', backgroundColor: antiBgColor, border: `1px solid ${antiBgColor}`, borderRadius: '10px', padding: '5px', paddingLeft: '15px', paddingRight: '15px'}}
            className="text-base"
          >
            <span style={{ color: antiBorderColor}}>{tag.name}</span>
          </button>
        ))
      ) : (
        tags[currentSection].map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleTagClick(tag.id)}
            style={{ margin: '8px', marginLeft: '0px', backgroundColor: tag.selected ? antiBgColor : bgColor, border: `1px solid ${antiBgColor}`, borderRadius: '10px', padding: '5px', paddingLeft: '15px', paddingRight: '15px'}}
            className="text-base"
          >
            <span style={{ color: tag.selected ? antiBorderColor : borderColor }}>{tag.name}</span>
          </button>
        ))
      )}
    </div>
        <div className="mt-4 flex justify-between items-center">
          <Button variant="link" className="h-auto p-0 text-base items-start" onClick={
            async () => {
              setCurrentSection(Math.max(0, currentSection - 1))
            }
          }>
              <IconTablerArrowLeft className="mr-2 text-muted-foreground" />
          </Button>
          {currentSection == tags.length ? <span style={{ fontSize: '7pt' }}>{texts.finalHint}</span> : `${currentSection + 1}/${tags.length}`}
          <Button variant="link" className="h-auto p-0 text-base items-end" onClick={
            async () => {
              if (currentSection === tags.length) {
                await append({
                  id,
                  content: "start---" + getSelectedTags(tags).stringTags,
                  role: 'user'
                })
              }
              setCurrentSection(Math.min(tags.length, currentSection + 1))
            }
          }>
              <IconTablerArrowRight className="ml-2 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  )
}
