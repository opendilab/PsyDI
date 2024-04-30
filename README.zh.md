# PsyDI
English | [简体中文(Simplified Chinese)](https://github.com/opendilab/PsyDI/blob/main/README.zh.md)
<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/banner.png"></a>
</div>

## PsyDI 简介

PsyDI 是一款多模态，交互式的心理测评聊天机器人，旨在对用户的多模态输入进行互动分析，从而探索用户的潜在认知模式，最终判定用户的 MBTI（Myers-Briggs Type Indicator）。此外，PsyDI 还为每位用户详细分析的性格分析报告和定制化的生成图。我们正在不断改进 PsyDI，并即将推出如 MBTI 画廊等新功能，期待您的宝贵反馈！

目前可以直接通过[链接](https://psydi.opendilab.org.cn/)访问 PsyDI。

## :boom: 最新消息！

- 我们正在逐步更新经典角色 MBTI 画廊：

| 角色                  | 简介                | MBTI   | 生成图 |
|----------------------------| --------------------------- | ------ | ------ |
| [约尔·福杰（间谍过家家）](http://xhslink.com/13YTRE) | 约尔·福杰是一名身怀绝技，但心地善良的杀手。她伪装成政府官员，机缘巧合下成为了《间谍过家家》中临时家庭不可或缺的一员。 | ISFJ   | <img width="120px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/yor.png"></a>     |
| [阿尼亚·福杰（间谍过家家）](http://xhslink.com/Z929fF) | 在《间谍过家家》中，阿尼亚·福杰是一个具有读心能力的小女孩。她发现了黄昏的真实身份，并用读心能力被黄昏收养，组建了临时家庭，在临时家庭的一番秘密活动中扮演了关键角色。 |ENFP       | <img width="120px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/anya.png"></a>      |
| [金克斯（英雄联盟）](http://xhslink.com/Bpt45F) | 金克丝是《英雄联盟》中的一名无政府主义者，也是一名热爱爆炸的神射手。她以混乱的风格和双持枪械在战场上释放冰雹风暴而闻名。 |ESFP     | <img width="120px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/jinx.png"></a>      |
| [维克托（英雄联盟）](http://xhslink.com/4VaTbH) | 维克多是《英雄联盟》中一位才华横溢、毫不留情的发明家，他利用先进的海克斯技术操纵战场，无情地消灭敌人。 | INTJ |  <img width="120px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/viktor.png"></a>      |


## 导航

- [PsyDI 简介](#PsyDI-简介)
- [最新消息](#boom-最新消息！)
- [导航](#导航)
- [快速开始](#star_struck-快速开始)
- [介绍](#books-介绍)
  - [评估框架](#评估框架)
  - [测试过程](#测试过程)
  - [迭代更新](#迭代更新)
- [路线图](#路线图)
- [本地运行](#本地运行)
- [致谢](#致谢)
- [引用](#引用)
- [许可证](#许可证)


## :star_struck: 快速开始

PsyDI 的使用方式很简单！按照以下步骤，您就可以开始自我发现之旅：

:rocket: **在线访问 PsyDI：** 访问我们的[网站](https://psydi.opendilab.org.cn/)直接在线访问 PsyDI。无需下载或安装！

:memo: **开始测试：**
   - 进入测验后，您可以根据提示选择最能代表您的标签，这有助于 PsyDI 根据您的标签来定制后续测试。
   - 接下来，您需要分享您最近喜欢的一首歌，以及您最近的感悟或想法，这些信息便于 PsyDI 围绕您的兴趣展开交流。

<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/init_part.png"></a>
</div>

:bulb: **探索您的个性：**
   - 在探索章节中，PsyDI 将根据您提供的标签，向您提出一系列问题，便于 PsyDI 对您基本了解。

:speech_balloon: **交互式聊天：**
   - PsyDI 将与您交互聊天，深入探讨先前提到的话题。这个互动过程通常包括 12-15 个问题，从多个角度让 PsyDI 发掘您的认知模式。

<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/choose_part.png"></a>
</div>

:sparkles: **详细分析：**
   - 最后，PsyDI 将为您提供一份详细的 MBTI 测试结果与性格分析报告。这份分析报告能够帮助您更好地发掘自己的个性倾向。
   - 此外，PsyDI 还会为您提供一张与您的气质相匹配的生成图，您可以通过生成图对自身性格有视觉上的理解。

以上是使用 PsyDI 的基本方法，现在就开始与 PsyDI 的旅程吧！

## :books: 介绍

<div align="center">
    <img width="1000px" height="auto" src="https://github.com/opendilab/PsyDI/blob/main/assets/psydi_pipeline_v2.jpg"></a>
</div>
PsyDI 的基本原理是在与用户交流的过程中逐步挖掘用户底层的认知过程。通过发掘这些认知过程，PsyDI 能够识别用户习惯的认知模式，最终确定其迈尔斯-布里格斯类型指标（MBTI）。

### 评估框架

PsyDI 借鉴了传统的心理测试量表，以 MBTI 分数表为核心判断方式。该表的每一行对应了一个 MBTI，其值表示当前用户被认为是该 MBTI 的概率，范围从 0 到 100。

### 测试过程

PsyDI 首先将用户输入的多模态信息转换为文本形式，然后通过微调后的分数模型评估这些文本表达，计算每条文本被判定为某个 MBTI 的概率。在后续测试过程中，PsyDI 将不断迭代以下三个步骤，直到确定用户的 MBTI：

1. **动态选择：**
    PsyDI 根据当前用户的 MBTI 分数表中概率最高的两个 MBTI，选择在这两个 MBTI 下得分都较高的动态。这一步骤的目的是定位当前认知方式最模糊的行为信息，并提出进一步的问题来确认其认知方式。

2. **对话交互：**
    PsyDI 从上一步骤中选出的动态出发，与用户进行多轮对话。多轮对话中有三种交互格式：多选题、迫选题和自由问答。最终多轮对话的问答过程将会整合为一句对用户的描述。

3. **表格更新：**
    PsyDI 根据这一新的描述更新用户的 MBTI 分数表。

### 迭代更新

PsyDI 通过迭代执行上述三个步骤，在每一次交互中不断加深对用户认知模式的理解，直到确认用户的 MBTI。

## 路线图
- [x] PsyDI 的在线部署
- [x] 发布所有前端代码和部署脚本
- [x] MBTI 评估画廊
- [ ] 其他语言支持（英语/韩语/日语）
- [ ] 发布后端代码示例和提示
- [ ] 发布生成的数据集和经过训练的奖励模型
- [ ] 技术报告 arxiv 链接
- [ ] 更多多模态和交互式问题和示例

## 本地运行

首先，您需要用 [`.env.example`中定义的](.env.example) 环境变量来运行 PsyDI.

> 注意：您不应提交您的 `.env` 文件，这将会其他人能够获得您的 OpenAI 和身份验证帐户的访问，将导致隐私安全问题。

然后，您需要在您的计算机上安装 node.js（建议使用 v18.17.0）和 npm。

设置好所有环境后，您可以运行以下命令来启动前端：
```bash
npm install -g pnpm
pnpm install
pnpm dev --port 3001
```

此时您的应用模板应该运行在[localhost:3001](http://localhost:3001/)上。

## 致谢

- 感谢 JAAAAACKKKKKY 对于本项目 UI/UX 设计和美术素材的贡献。
- [vercel/ai-chatbot](https://github.com/vercel/ai-chatbot)

## 反馈与贡献

您可以通过如下方式提供反馈：

- 在 Github 上[提交问题](https://github.com/opendilab/PsyDI/issues/new)
- 在 PsyDI 微信群中讨论（添加我们的微信：ding314assist）

  <img src=https://github.com/opendilab/PsyDI/blob/main/assets/wechat.jpeg width=35% />
- 通过邮件与我们联系（opendilab@pjlab.org.cn）

感谢所有对 PsyDI 后续改进的反馈和贡献，包括算法层面和系统设计。这些反馈让 PsyDI 变得更好！

## 引用

```latex
@misc{psydi,
    title={Psydi: A MBTI agent that helps you understand your personality type through a relaxed multi-modal interaction.},
    author={PsyDI Contributors},
    publisher={GitHub},
    howpublished={\url{https://github.com/opendilab/PsyDI}},
    year={2024},
}
```

## 许可证

本仓库中的所有代码都符合 Apache 2.0 许可。
