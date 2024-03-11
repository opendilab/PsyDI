'use client'

import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { IconTablerArrowLeft, IconTablerArrowRight, IconArrowRight } from '@/components/ui/icons'

const lang = process.env.LANG || 'zh' // default to zh

interface Texts {
  title: string;
  sectionNames: string[];
  backendSectionNames: string[];
  skip: string;
}

var texts: Texts = {
  title: '',
  sectionNames: [],
  backendSectionNames: [],
  skip: ''
}
if (lang === 'zh') {
    texts.title = "在进入测试之前，PsyDI 将先为您构筑一个简明的人格画像，请尽可能选择更多与您相符的标签。（可多选或不选）"
    texts.sectionNames = ["年龄段", "地区", "职业", "兴趣爱好", "生活态度", "科技态度", "您的标签"]
    texts.backendSectionNames = ["年龄", "地区", "职业", "爱好", "生活态度", "对待科技态度"]
    texts.skip = "跳过该章节，直接进入测试。（低定制化）"
} else if (lang === 'en') {
    texts.title = "Before the test, PsyDI will first build a brief personality portrait for you. Please select as many tags as possible that match you. (Multiple choice or no choice)"
    texts.sectionNames = ["Age", "Region", "Occupation", "Hobbies", "Life Attitude", "Technology Attitude", "Your Tags"]
    texts.backendSectionNames = ["Age", "Region", "Occupation", "Hobbies", "Life Attitude", "Technology Attitude"]
    texts.skip = "Skip this section and go directly to the test. (The customization level of the test will be reduced)"
}

type Tag = {
  id: number;
  name: string;
  selected: boolean;
};

// TODO other language tags
const initialTags: Tag[][] = [
  [
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
    { id: 1, name: '环保主义者', selected: false},
    { id: 2, name: '极简主义', selected: false},
    { id: 3, name: '极繁主义', selected: false},
  ],
  [
    { id: 1, name: '科技爱好者', selected: false},
    { id: 2, name: '科技保守者', selected: false},
  ],
]

function getSelectedTags(tags: Tag[][]) {
  const sections = tags.map((section) => section.filter((tag) => tag.selected).map((tag) => tag.name))
  const sectionWithNames = texts.backendSectionNames.map((name, index) => ({ name, tags: sections[index] }))
  const pureTags = sections.reduce((acc, val) => acc.concat(val), [])
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
    const updatedTags = tags[currentSection].map((tag) =>
      tag.id === clickedTagId ? { ...tag, selected: !tag.selected } : tag
    );
    const updatedSection = tags.map((section, index) => 
      currentSection === index ? updatedTags : section
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
          </Button>
        <p className="mb-2 leading-normal text-lg font-semibold" style={{ color: borderColor, fontSize: '1.5rem'}}>
          {texts.sectionNames[currentSection]}
        </p>
    <div>
      { currentSection === tags.length ? (
        getSelectedTags(tags).tags.map((tag) => (
          <button
            key={tag}
            style={{ margin: '8px', marginLeft: '0px', backgroundColor: antiBgColor, border: `1px solid ${antiBgColor}`, borderRadius: '10px', padding: '5px', paddingLeft: '15px', paddingRight: '15px'}}
            className="text-base"
          >
            <span style={{ color: antiBorderColor}}>{tag}</span>
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
          {currentSection == tags.length ? "" : `${currentSection + 1}/${tags.length}`}
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
