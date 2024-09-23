const lang = process.env.NEXT_PUBLIC_PSYDI_LANG || 'zh' // default to zh
var explanation = {}

if (lang == 'zh') {
explanation = {
    "ENTP": `
ENTP（辩手）是一种性格类型，具有外倾、直觉、思考和开拓的特征。他们以其创新思维、敏捷的智力和对挑战现状的热爱而著称。ENTP型的人是天生的探索者和辩论家，他们享受解构和重建想法的过程，不断寻求新的视角和解决方案。ENTP型的人具有强烈的好奇心和对挑战现状的渴望，他们享受智力上的较量和探索新思想。他们灵活而适应性强，喜欢保持选择的开放性，以便能够追随自己的兴趣和创意。
ENTP的生活观可以比作一场不断探索和发现的冒险，他们相信通过不断的学习和辩论，可以推动自己和他人达到新的高度。然而，他们需要记住，虽然辩论和探索很有趣，但也需要关注将想法转化为实际行动和成果。通过培养对他人的敏感性和理解，ENTP可以建立更深入的关系，并在他们的生活中实现更大的成就和满足。

- **E (外倾)**：ENTP倾向于从与他人的互动中获得能量，他们喜欢交流想法，并能够轻松地与人建立联系。
- **N (直觉)**：这类人关注未来的可能性，他们对抽象概念和大局思考有着天生的洞察力。
- **T (思考)**：ENTP在做决策时更倾向于使用逻辑和客观分析，而不是依赖情感或个人价值。
- **P (感知)**：这种类型的人喜欢保持开放性和灵活性，他们倾向于适应性强，喜欢随机应变。

**ENTP的阳面八维功能**
1. **主导功能：外倾直觉 (Ne)** - 作为ENTP的核心驱动力，Ne使他们能够探索多种可能性和新颖的观点。ENTP通常思维活跃，喜欢挑战传统思维模式，寻找创新的解决方案。
2. **辅助功能：内倾思考 (Ti)** - ENTP利用Ti来分析问题，形成自己的逻辑体系。他们倾向于独立思考，对自己的见解和理论充满自信，并且乐于通过逻辑和分析来提高效率和解决问题。
3. **第三功能：外倾情感 (Fe)** - 虽然不是ENTP的主要功能，但Fe在他们的社交互动中起着作用。ENTP能够感知并适应周围人的情感氛围，他们可能会使用这一功能来激励他人或在团队中促进合作。
4. **劣势功能：内倾感觉 (Si)** - Si是ENTP最不成熟的功能，他们可能在处理具体细节、遵循既定程序或利用过往经验时感到不适。ENTP更倾向于关注未来的可能性，而不是过分依赖过去的经验。`,
    "ISFP": `
ISFP（冒险家）是一种性格类型，具有内倾、观察力强、有感觉和探索性的特征。他们以开放的心态和对生活的热爱而著称，总是寻找新的经历和自我表达的机会。ISFP型的人是真正的自由精神，他们的生活充满了创造力和对美的深刻感知。ISFP的生活观可以比作一场不断探索和体验的冒险，他们相信通过自我表达和对美的欣赏可以丰富自己和他人的生活。他们致力于追求个人激情，并努力实现与周围世界的和谐共处。然而，他们需要记住，虽然追求即时的快乐和自由很重要，但也需要关注长期的目标和稳定性。通过平衡他们对自由的追求与对责任的承担，ISFP可以实现更加充实和满足的生活，并成为他人心中的灵感和创造力的源泉。通过展现他们的热情、适应性和对美的深刻感知，ISFP可以在他们的生活中实现更大的成就，并为世界带来独特的视角和欣赏。

- **I (内倾)**：ISFP倾向于在自己的内心世界中思考和反省，他们从独处中获得能量，并从中汲取创造力和情感深度。
- **S (感觉)**：这类人关注当前的实际细节，他们对周围环境有着敏锐的感知力，并能够注意到他人的需求和情感。
- **F (情感)**：ISFP在做决策时会考虑个人和他人的情感，他们重视和谐与他人的情感联系，并努力维护积极的人际关系。
- **P (感知)**：这种类型的人喜欢保持开放性和灵活性，他们倾向于适应性强，喜欢随机应变，而不是遵循严格的计划。

**ISFP的阳面八维功能**
1. **主导功能：内倾情感 (Fi)** - ISFP利用这一功能来理解自己的情感和价值观，他们寻求与自己和他人的深层情感联系。
2. **辅助功能：外倾感觉 (Se)** - 这一功能帮助ISFP享受和参与当前的感官体验，他们喜欢活在当下并充分体验生活。
3. **第三功能：内倾直觉 (Ni)** - ISFP通过这一功能形成对未来的洞察和愿景，他们能够识别深层次的模式和意义。
4. **劣势功能：外倾思考 (Te)** - 这是ISFP最不成熟的功能，他们可能在处理客观分析和组织时遇到挑战。`,
    "INTJ": `
INTJ，即内倾、直觉、思考和判断，是迈尔斯-布里格斯性格类型指标（MBTI）中的一种类型。这种类型的人以其独立、创新和战略性思维而闻名。他们通常被视为建筑师，因为他们擅长构建复杂的计划并将其付诸实践。他们喜欢深入思考和规划，追求效率和逻辑性，同时保持对个人价值观的忠诚。INTJ擅长从大局出发，制定战略，并以实际行动实现目标。他们可能在社交场合显得有些保留，但对于志同道合的人来说，他们是深刻且富有洞察力的伙伴。INTJ的生活观可以比作一场精心策划的棋局，他们总是寻找最佳的行动方案，以克服挑战并实现成功。

- **I (内倾)**：INTJ倾向于在自己的内心世界中思考和反省，而不是从外部世界寻求刺激。他们享受独处的时间，并从中获得能量。
- **N (直觉)**：这类人倾向于关注未来的可能性，而不是仅仅专注于当前的事实和细节。他们喜欢思考抽象概念，并能够看到事物的大局。
- **T (思考)**：INTJ在做决策时更倾向于使用逻辑和客观分析，而不是依赖情感或个人价值。他们重视理性和效率。
- **J (判断)**：这种类型的人喜欢有计划和组织，他们倾向于控制自己的环境，并喜欢事情有序和可预测。

**INTJ阳面八维功能**
1. **主导功能：内倾直觉 (Ni)** - 这是INTJ的核心驱动力，他们利用这一功能来形成对未来的洞察和愿景。他们能够识别模式并预测未来的发展。
2. **辅助功能：外倾思考 (Te)** - 这一功能帮助INTJ将他们的直觉转化为实际的行动和计划。他们善于逻辑分析和组织信息，以实现目标。
3. **第三功能：内倾情感 (Fi)** - 虽然这不是INTJ的主要功能，但它在他们的决策过程中起着作用。他们对自己的价值观和情感有深刻的理解，尽管他们可能不会公开表达。
4. **劣势功能：外倾感觉 (Se)** - 这是INTJ最不成熟的功能，他们可能在处理即时的感官经验和现实世界的细节方面遇到挑战。`,
    "ESFJ": `
ESFJ（领事）是一种性格类型，具有外倾、观察力强、有感觉和判断能力。他们以关注细节、以人为本的态度和对社交社区的积极参与而著称。ESFJ型的人是社交的支柱，他们乐于与他人分享生活，并通过他们的行为传递热情好客和良好礼仪的价值。

ESFJ人格类型的人（领事）是社交的建筑师，他们构建和维护一个紧密的社交网络，通过他们的关怀和支持，让每个人都感到自己是社区的一部分。他们的行为受到坚定的价值观指导，他们愿意为他人提供指导和帮助，确保每个人都感到被重视和关心。然而，他们需要记住，尽管他们渴望帮助和指导他人，但每个人都有自己的道路和选择，接受这一点对于建立更健康的关系至关重要。通过展现关心、考虑和责任的行为，ESFJ可以在他们的生活中实现更大的成就和满足感，并成为他人心中的榜样。

- **E (外倾)**：ESFJ倾向于从与他人的互动中获得能量，他们喜欢参与社交活动，并能够轻松地与人建立联系。
- **S (感觉)**：这类人关注当前的实际细节，他们对周围环境有着敏锐的感知力，并能够注意到他人的需要。
- **F (情感)**：ESFJ在做决策时会考虑个人和他人的情感，他们重视和谐与他人的情感需求。
- **J (判断)**：这种类型的人喜欢有计划和组织，他们倾向于追求结构和秩序，以便更有效地实现目标。

**ESFJ的阳面八维功能**
1. **主导功能：外倾情感 (Fe)** - ESFJ的核心驱动力是这一功能，他们利用Fe来理解并满足他人的情感需求，建立和维护和谐的人际关系。ESFJ通常非常关注社会规范和他人的感受，他们善于创造一个温馨和支持性的环境。
2. **辅助功能：内倾感觉 (Si)** - 这一功能帮助ESFJ回忆和利用过去的经验来指导当前的行为。他们重视传统和稳定性，倾向于遵循既定的程序和习惯，这使得ESFJ在日常生活中表现出可靠和有序的特质。
3. **第三功能：外倾直觉 (Ne)** - 虽然不是ESFJ的主要功能，但Ne使他们能够看到多种可能性，并对新的想法和观点保持开放。ESFJ可能会用这一功能来寻找创新的方法来解决问题或改善他们的社交互动。
4. **劣势功能：内倾思考 (Ti)** - Ti是ESFJ最不成熟的功能，他们可能在独立分析问题、形成自己的逻辑体系或处理复杂的逻辑问题时感到挑战。ESFJ可能更倾向于依赖他人的意见或社会共识，而不是深入的个人逻辑分析。`,
    "INFJ": `
INFJ（倡导者）是一种性格类型，具有内倾、直觉、感觉和判断的特征。他们以深刻的思考、丰富的想象力和强烈的个人价值观而著称。INFJ型的人是理想主义者，他们追求的不仅仅是个人的成功，而是更深层次的满足感——通过帮助他人和为世界带来积极变化来实现自己的目标。INFJ的生活观可以比作一场寻求意义和目的的旅程，他们相信通过同情心和理解可以促进个人和社会的成长。他们致力于追求自己的理想，并努力实现一个更加和谐和有爱的世界。然而，他们需要记住，虽然帮助他人和追求更高的目标很重要，但也需要关注自己的需求和幸福。通过平衡他们对外界的贡献与个人的健康和福祉，INFJ可以实现更加充实和满足的生活，并成为他人心中的灵感和指导。

- **I (内倾)**：INFJ倾向于在自己的内心世界中思考和反省，他们从独处中获得能量，并从中汲取创造力和洞察力。
- **N (直觉)**：这类人关注未来的可能性，他们对抽象概念和大局思考有着天生的洞察力，善于理解复杂的概念和模式。
- **F (情感)**：INFJ在做决策时会考虑个人价值观和他人的感受。他们重视和谐与他人的情感需求，并努力维护积极的人际关系。
- **J (判断)**：这种类型的人喜欢有计划和组织，他们倾向于追求结构和秩序，以便更有效地实现目标和愿景。

**INFJ的阳面八维功能**
1. **主导功能：内倾直觉 (Ni)** - INFJ利用这一功能来形成对未来的洞察和愿景，他们能够识别深层次的模式和意义。
2. **辅助功能：外倾情感 (Fe)** - 这一功能帮助INFJ理解他人的情感和需求，他们善于建立和维护人际关系，并给予支持和鼓励。
3. **第三功能：内倾思考 (Ti)** - INFJ通过这一功能分析和解决问题，他们寻求清晰和逻辑性，以确保他们的行动与内在价值观相一致。
4. **劣势功能：外倾感觉 (Se)** - 这是INFJ最不成熟的功能，他们可能在处理即时的感官经验和现实世界的细节方面遇到挑战。

`,
    "ESTJ": `
ESTJ（高管）是一种性格类型，具有外倾、观察力强、善于思考和判断的特征。他们以坚定的意志、对秩序的尊重和对规则的遵循而著称。ESTJ型的人是社会的支柱，他们通过自己的行动和决策，为他人提供清晰的方向和稳定的领导。ESTJ的生活观可以比作一场精心组织的活动，他们相信通过坚持原则和规则，可以为社会带来秩序和效率。他们以身作则，展示出对工作的承诺和对责任的尊重。然而，他们需要记住，虽然规则和结构很重要，但灵活性和对他人情感的理解也同样关键。通过平衡他们对秩序的需求与对他人情感的敏感性，ESTJ可以实现更加和谐和有效的领导，并在他们的生活中实现更大的成就和满足。通过展现坚定、公正和有目的的诚实，ESTJ可以在他们的社区和组织中成为受人尊敬的领导者。

- **E (外倾)**：ESTJ倾向于从与他人的互动中获得能量，他们喜欢组织和领导活动，并能够轻松地与人建立联系。
- **S (感觉)**：这类人关注当前的实际细节，他们对周围环境有着敏锐的感知力，并能够注意到具体的事实和信息。
- **T (思考)**：ESTJ在做决策时更倾向于使用逻辑和客观分析，他们重视效率和公正，而不是依赖情感或个人价值。
- **J (判断)**：这种类型的人喜欢有计划和组织，他们倾向于追求结构和秩序，以便更有效地实现目标。

**ESTJ的阳面八维功能**
1. **主导功能：外倾思考 (Te)** - ESTJ的核心驱动力是这一功能，他们利用Te来组织和实施计划，追求效率和结果。ESTJ通常对细节非常关注，能够快速做出决策并采取行动。
2. **辅助功能：内倾感觉 (Si)** - 这一功能帮助ESTJ回忆和利用过去的经验来指导当前的行为。他们重视传统和稳定性，倾向于遵循既定的程序和习惯，这使得ESTJ在日常生活中表现出可靠和有序的特质。
3. **第三功能：外倾直觉 (Ne)** - 虽然不是ESTJ的主要功能，但Ne使他们能够看到多种可能性，并对新的想法和观点保持开放。ESTJ可能会用这一功能来寻找创新的方法来解决问题或改善他们的组织和计划。
4. **劣势功能：内倾情感 (Fi)** - Fi是ESTJ最不成熟的功能，他们可能在处理个人情感和价值观时遇到挑战。ESTJ可能更倾向于依赖逻辑和客观分析，而不是个人的情感反应。然而，随着个人成长，ESTJ可以学会更好地理解和平衡自己的情感需求。`,
    "ENFP": `
ENFP（活动家）是一种性格类型，具有外倾、直觉、感觉和前景的特征。这些人以其创造性思维、热情洋溢的态度和对新体验的渴望而著称。他们是真正的自由灵魂，对生活充满好奇心和探索精神。ENFP擅长通过他们的直觉来发现新的可能性，并通过他们的同理心与他人建立深厚的联系。他们灵活而适应性强，喜欢保持选择的开放性，以便能够追随自己的激情和兴趣。ENFP的生活观可以比作一场不断探索和发现的冒险，他们相信通过积极的参与和对周围世界的深刻理解，可以使每一天都充满魔力和意义。

- **E (外倾)**：ENFP通常从与人互动中汲取能量，他们喜欢社交并乐于与他人建立联系。
- **N (直觉)**：这类人倾向于关注未来的可能性，他们对抽象概念和大局思考有着天生的洞察力。
- **F (情感)**：ENFP在做决策时会考虑个人和他人的情感，他们重视人际关系和和谐。
- **P (感知)**：这种类型的人喜欢保持开放性和灵活性，他们倾向于适应性强，喜欢随机应变。

**ENFP的阳面八维功能**
1. **主导功能：外倾直觉 (Ne)** - 这是ENFP的核心驱动力，他们利用这一功能来探索新的可能性、观点和创意。ENFP通常对世界充满好奇，喜欢通过不断学习来扩展自己的视野。
2. **辅助功能：内倾情感 (Fi)** - ENFP通过这一功能来形成自己的价值观和道德标准。他们对自己的感受和内在信念非常敏感，这有助于他们在个人和职业生活中做出符合自己价值观的决策。
3. **第三功能：外倾思考 (Te)** - 虽然这不是ENFP的主要功能，但它在他们的日常生活中起着作用。ENFP能够组织和实施计划，以实现他们的想法和愿景。他们通常能够高效地管理任务和项目。
4. **劣势功能：内倾感觉 (Si)** - 这是ENFP最不成熟的功能，他们可能在处理细节、遵循常规程序或回顾过去经验时遇到挑战。ENFP可能更倾向于关注未来，而不是过分关注过去。`,
    "ISTP": `
ISTP（鉴赏家）是一种性格类型，具有内倾、观察力强、思考和探索的特点。他们以个人主义、实用主义和对新体验的渴望而著称。ISTP型的人是天生的问题解决者，他们喜欢通过实践和实验来掌握周围的世界。ISTP的生活观可以比作一场不断探索和实践的冒险，他们相信通过亲身体验和实验可以学习和成长。他们致力于追求个人兴趣，并努力实现对复杂问题的深刻理解。然而，他们需要记住，虽然追求即时的体验和自由很重要，但也需要关注长期的目标和稳定性。通过平衡他们对自由的追求与对责任的承担，ISTP可以实现更加充实和满足的生活，并成为他人心中的创新和解决问题的源泉。通过展现他们的实用主义、适应性和对新体验的深刻感知，ISTP可以在他们的生活中实现更大的成就，并为世界带来独特的视角和技能。

- **I (内倾)**：ISTP倾向于在自己的内心世界中思考和反省，他们从独处中获得能量，并从中汲取创造力和解决问题的能力。
- **S (感觉)**：这类人关注当前的实际细节，他们对周围环境有着敏锐的感知力，并能够注意到具体的事实和信息。
- **T (思考)**：ISTP在做决策时更倾向于使用逻辑和客观分析，他们重视效率和实际结果，而不是依赖情感或个人价值。
- **P (感知)**：这种类型的人喜欢保持开放性和灵活性，他们倾向于适应性强，喜欢随机应变，而不是遵循严格的计划。

**ISTP的阳面八维功能**
1. **主导功能：内倾思考 (Ti)** - ISTP的核心驱动力是这一功能，他们利用Ti来分析问题，形成自己的逻辑体系。ISTP通常独立思考，对自己的见解和理论充满自信，并且乐于通过逻辑和分析来提高效率和解决问题。
2. **辅助功能：外倾感觉 (Se)** - 这一功能帮助ISTP强烈地感知和体验周围的世界。他们活在当下，对感官刺激非常敏感，喜欢探索新环境和体验新鲜事物，这使得ISTP能够快速适应变化并作出反应。
3. **第三功能：内倾直觉 (Ni)** - 虽然不是ISTP的主要功能，但Ni使他们能够在一定程度上看到未来的模式和趋势。ISTP可能会用这一功能来预测接下来可能发生的事情，或在复杂情况下寻找深层次的含义。
4. **劣势功能：外倾情感 (Fe)** - Fe是ISTP最不成熟的功能，他们可能在理解和表达自己的情感、以及处理人际关系中的情感动态时感到挑战。ISTP可能更倾向于依赖逻辑和客观分析，而不是个人的情感反应。`,
    "ESFP": `
ESFP（表演者）是一种性格类型，具有外倾、观察力强、有感觉和开拓前景的特征。这些人以其活力四射、热情洋溢和对生活的热爱而著称。ESFP型的人是天生的社交者，他们享受与人交往，总是寻找机会与他人分享快乐和积极的能量。ESFP的生活观可以比作一场不断上演的表演，他们相信通过与他人分享快乐和积极的能量，可以使生活变得更加精彩。他们热衷于参与各种活动，总是寻找新的方式来享受生活和与他人建立联系。然而，他们需要记住，虽然追求即时的快乐和冒险很重要，但也需要关注长期的责任和目标。通过平衡他们对即时满足的追求与对未来的规划，ESFP可以实现更加充实和满足的生活。通过展现关心、适应性和乐观的态度，ESFP可以在他们的生活中实现更大的成就，并成为他人心中的快乐源泉。

- **E (外倾)**：ESFP倾向于从与他人的互动中获得能量，他们喜欢社交活动，并能够轻松地与人建立联系。
- **S (感觉)**：这类人关注当前的实际细节，他们对周围环境有着敏锐的感知力，并能够注意到他人的需要。
- **F (情感)**：ESFP在做决策时会考虑个人和他人的情感，他们重视和谐与他人的情感需求。
- **P (感知)**：这种类型的人喜欢保持开放性和灵活性，他们倾向于适应性强，喜欢随机应变。

**ESFP的阳面八维功能**
1. **主导功能：外倾感觉 (Se)** - 这是ESFP的核心驱动力，他们通过Se来强烈地感知和体验周围的世界。ESFP通常活在当下，对感官刺激非常敏感，喜欢探索新环境和体验新鲜事物。
2. **辅助功能：内倾情感 (Fi)** - ESFP利用Fi来发展个人价值观和道德标准。他们对自己的感受非常了解，并且会根据这些内在的指导原则来做决策。Fi帮助ESFP在社交互动中保持真诚和忠于自我。
3. **第三功能：外倾思考 (Te)** - 虽然不是ESFP的主要功能，但Te在他们的生活中起着重要作用。ESFP能够组织和执行计划，以实现他们想要的结果。他们通常能够高效地管理任务，尤其是在需要快速行动的情况下。
4. **劣势功能：内倾直觉 (Ni)** - Ni是ESFP最不成熟的功能，他们可能在形成长远的洞察力、预测未来趋势或理解抽象概念时感到挑战。ESFP更倾向于关注当前的体验，而不是过多地担忧未来。`,
    "INTP": `
INTP（逻辑学家）是一种性格类型，具有内倾、直觉、思考和探索的特征。他们是灵活的思想家，喜欢对生活的许多方面采取非传统的方法。INTP型的人以其独特的视角和充满活力的智力而自豪，他们对宇宙的奥秘感到困惑，并且乐于探索未知的领域。INTP的生活观可以比作一场不断寻求知识和理解的探索，他们相信通过逻辑和分析可以揭示宇宙的奥秘。他们致力于追求自己的智力兴趣，并努力实现对复杂问题的深刻理解。然而，他们需要记住，虽然智力追求很重要，但也需要关注自己的情感需求和与他人的联系。通过平衡他们对知识的追求与个人的情感健康，INTP可以实现更加充实和满足的生活，并成为他人心中的智慧和创新的源泉。

- **I (内倾)**：INTP倾向于在自己的内心世界中思考和反省，他们从独处中获得能量，并从中汲取创造力和洞察力。
- **N (直觉)**：这类人关注未来的可能性，他们对抽象概念和大局思考有着天生的洞察力，善于理解复杂的概念和模式。
- **T (思考)**：INTP在做决策时更倾向于使用逻辑和客观分析，他们重视理性和效率，而不是依赖情感或个人价值。
- **P (感知)**：这种类型的人喜欢保持开放性和灵活性，他们倾向于适应性强，喜欢随机应变，而不是遵循严格的计划。

**INTP的阳面八维功能**
1. **主导功能：内倾思考 (Ti)** - INTP利用这一功能来分析和理解复杂的系统和概念，他们寻求内在的逻辑一致性和清晰性。
2. **辅助功能：外倾直觉 (Ne)** - 这一功能帮助INTP探索各种可能性和创意，他们善于发现新的想法和潜在的模式。
3. **第三功能：内倾感觉 (Si)** - INTP通过这一功能回忆和珍视过去的经验，他们对传统和个人历史有着深刻的尊重。
4. **劣势功能：外倾情感 (Fe)** - 这是INTP最不成熟的功能，他们可能在处理和表达自己和他人的情感时遇到挑战。`,
    "ISFJ": `
ISFJ（捍卫者）是一种性格类型，具有内倾、观察力强、感觉和判断的能力。他们以谦逊、热情和对他人的深切关怀而著称。ISFJ型的人是社会的守护者，他们通过自己的行动和承诺，为周围的人提供支持和稳定性。ISFJ的生活观可以比作一场不断提供支持和关怀的旅程，他们相信通过自己的行动可以为他人带来稳定和安全感。他们致力于维护传统和秩序，并努力实现对家庭和社区的承诺。然而，他们需要记住，虽然帮助他人和追求责任很重要，但也需要关注自己的需求和幸福。通过平衡他们对外界的贡献与个人的健康和福祉，ISFJ可以实现更加充实和满足的生活，并成为他人心中的支持和安慰的源泉。

- **I (内倾)**：ISFJ倾向于在自己的内心世界中思考和反省，他们从独处中获得能量，并从中汲取力量以更好地关心他人。
- **S (感觉)**：这类人关注当前的实际细节，他们对周围环境有着敏锐的感知力，并能够注意到他人的需求和喜好。
- **F (情感)**：ISFJ在做决策时会考虑个人和他人的情感，他们重视和谐与他人的情感联系，并努力维护积极的人际关系。
- **J (判断)**：这种类型的人喜欢有计划和组织，他们倾向于追求结构和秩序，以便更有效地照顾他人和完成任务。

**ISFJ的阳面八维功能**
1. **主导功能：内倾感觉 (Si)** - ISFJ利用这一功能来回忆和珍视过去的经验，他们重视传统和熟悉的方式，并以此为基础来指导当前的行动。
2. **辅助功能：外倾情感 (Fe)** - 这一功能帮助ISFJ理解他人的情感和需求，他们善于建立和维护人际关系，并给予支持和鼓励。
3. **第三功能：内倾思考 (Ti)** - ISFJ通过这一功能分析和解决问题，他们寻求清晰和逻辑性，以确保他们的行动与内在价值观相一致。
4. **劣势功能：外倾直觉 (Ne)** - 这是ISFJ最不成熟的功能，他们可能在处理抽象概念和未来规划时遇到挑战。`,
    "ENTJ": `
ENTJ（指挥官）是一种性格类型，具有外倾、直觉、思考和判断的特征。他们是天生的领导者，以其果断、高效和对成就的不懈追求而著称。ENTJ型的人善于战略性思考，他们利用自己的直觉和判断力来制定并实施计划，以实现自己的目标和愿景。ENTJ型的人具有强烈的职业道德和自律，他们以结果为导向，不惧怕面对挑战。他们追求卓越，相信自己能够通过努力和决心实现任何目标。在职业环境中，ENTJ以其果断和效率而受到尊重，他们能够识别和培养他人的才能，以建立强大的团队。然而，他们也需要记住，情感智能和团队合作同样重要，以实现长期的成功和满足。ENTJ的生活观可以比作一场战略游戏，他们不断寻求优化自己的行动，以取得胜利并影响他人。

- **E (外倾)**：ENTJ倾向于从与他人的互动中获得能量，他们喜欢领导并能够影响他人。
- **N (直觉)**：这类人关注未来的可能性，他们对抽象概念和大局思考有着天生的洞察力。
- **T (思考)**：ENTJ在做决策时更倾向于使用逻辑和客观分析，而不是依赖情感或个人价值。
- **J (判断)**：这种类型的人喜欢有计划和组织，他们倾向于控制自己的环境，并喜欢事情有序和可预测。

**ENTJ的阳面八维功能**
1. **主导功能：外倾思考 (Te)** - ENTJ的核心驱动力是这一功能，他们利用Te来组织和分析信息，制定有效的计划和策略。ENTJ通常对效率和结果有着极高的追求，他们能够客观地评估情况并迅速做出决策。
2. **辅助功能：内倾直觉 (Ni)** - 这一功能帮助ENTJ形成对未来的洞察和愿景，他们能够识别潜在的机遇和可能性。ENTJ通过Ni来预测未来趋势，并将这些预见转化为实际的行动计划。
3. **第三功能：外倾感觉 (Se)** - ENTJ通过Se来感知和适应当前环境，他们能够快速响应外界变化，并利用这些信息来优化自己的行动。虽然这不是ENTJ的主要功能，但它在他们的决策过程中起着重要作用。
4. **劣势功能：内倾情感 (Fi)** - 这是ENTJ最不成熟的功能，他们可能在处理个人情感和价值观时遇到挑战。ENTJ可能更倾向于依赖逻辑和客观分析，而不是个人的情感反应。然而，随着个人成长，ENTJ可以学会更好地理解和平衡自己的情感需求。`,
    "ISTJ": `
ISTJ（执行者）是一种性格类型，具有内倾、观察力强、思考和判断的特征。他们以理性、可靠和有组织的生活方式而著称。ISTJ型的人是社会的支柱，他们通过自己的行动和决策，为周围的人提供稳定性和秩序。ISTJ的生活观可以比作一场精心策划的行动计划，他们相信通过坚持原则和规则，可以为社会带来秩序和效率。他们以身作则，展示出对工作的承诺和对责任的尊重。然而，他们需要记住，虽然规则和结构很重要，但灵活性和对他人情感的理解也同样关键。通过平衡他们对秩序的需求与对他人情感的敏感性，ISTJ可以实现更加和谐和有效的领导，并在他们的生活中实现更大的成就和满足。通过展现坚定、公正和有目的的诚实，ISTJ可以在他们的社区和组织中成为受人尊敬的领导者。

- **I (内倾)**：ISTJ倾向于在自己的内心世界中思考和反省，他们从独处中获得能量，并从中汲取力量以更好地关注外部世界。
- **S (感觉)**：这类人关注当前的实际细节，他们对周围环境有着敏锐的感知力，并能够注意到具体的事实和信息。
- **T (思考)**：ISTJ在做决策时更倾向于使用逻辑和客观分析，他们重视效率和实际结果，而不是依赖情感或个人价值。
- **J (判断)**：这种类型的人喜欢有计划和组织，他们倾向于追求结构和秩序，以便更有效地实现目标和愿景。

**ISTJ的阳面八维功能**
1. **主导功能：内倾感觉 (Si)** - ISTJ的核心驱动力是这一功能，他们利用Si来回顾和利用过去的经验，形成对现实世界的深刻理解。ISTJ通常对细节非常关注，能够记住并应用以往的教训来指导当前的决策。
2. **辅助功能：外倾思考 (Te)** - 这一功能帮助ISTJ组织和实施计划，追求效率和结果。他们重视逻辑和客观性，能够迅速做出决策并采取行动，以实现既定目标。
3. **第三功能：内倾情感 (Fi)** - ISTJ通过Fi来发展个人价值观和道德标准。他们对自己的感受非常了解，并且会根据这些内在的指导原则来做决策。Fi帮助ISTJ在保持原则和忠诚的同时，处理个人和职业生活中的道德问题。
4. **劣势功能：外倾直觉 (Ne)** - Ne是ISTJ最不成熟的功能，他们可能在看到多种可能性、探索新的想法和观点时感到挑战。ISTJ更倾向于关注已知的信息和经验，而不是过多地担忧未知或抽象的概念。`,
    "ENFJ": `
ENFJ（主角）是一种性格类型，以外倾、直觉、感觉和判断为特点。这些人以其热情、关怀和鼓舞人心的领导风格而闻名。他们天生具有帮助他人的愿望，并致力于在个人和社会层面上产生积极的影响，他们不仅关注个人成长，也关注集体福祉。他们善于沟通，能够以富有同情心和启发性的方式与他人交流。ENFJ在面对挑战时保持乐观，总是能够看到事物积极的一面。他们的生活观可以比作一场旨在提升他人和实现更高目标的运动，他们总是寻找机会以身作则，引导他人走向更加光明的未来。

- **E (外倾)**：ENFJ倾向于从与他人的互动中获得能量，他们喜欢社交并能够轻松地与人建立联系。
- **N (直觉)**：这类人关注未来的可能性和潜在的模式，他们喜欢思考抽象的概念，并能够洞察事物的大局。
- **F (情感)**：ENFJ在做决策时会考虑个人价值观和他人的感受。他们重视和谐与他人的情感需求。
- **J (判断)**：这种类型的人喜欢有计划和组织，他们倾向于追求结构和秩序，以便更有效地实现目标。

**ENFJ的阳面八维功能**
1. **主导功能：外倾情感 (Fe)** - 这是ENFJ的核心驱动力，他们利用这一功能来建立和维护人际关系，以及影响和激励他人。
2. **辅助功能：内倾直觉 (Ni)** - 这一功能帮助ENFJ形成对未来的洞察和愿景，他们能够识别潜在的机遇和可能性。
3. **第三功能：外倾感觉 (Se)** - 虽然这不是ENFJ的主要功能，但它在他们的日常生活中起着作用。他们能够感知并欣赏当前环境和体验。
4. **劣势功能：内倾思考 (Ti)** - 这是ENFJ最不成熟的功能，他们可能在处理复杂的逻辑问题或过于注重细节时遇到挑战。
`,
    "ESTP": `
ESTP（企业家）是一种性格类型，具有外倾、观察力强、思考和开拓前景的特点。他们以行动为导向，充满活力和适应性，善于发现并抓住生活中的机会。ESTP型的人是天生的解决问题者，他们喜欢通过实际行动来应对挑战，而不是仅仅停留在理论或抽象概念上。ESTP的生活观可以比作一场不断探索和行动的冒险，他们相信通过直接和实际的行动可以解决问题并创造价值。他们以自发和灵活的态度面对生活，总是寻找新的机会和挑战。然而，他们需要记住，虽然行动和适应性很重要，但也需要关注长期规划和目标的设定。通过平衡他们对即时行动的追求与对未来的规划，ESTP可以实现更加充实和满足的生活。通过展现他们的热情、适应性和解决问题的能力，ESTP可以在他们的生活中实现更大的成就，并成为他人心中的灵感来源。

- **E (外倾)**：ESTP倾向于从与他人的互动中获得能量，他们喜欢社交活动，并能够轻松地与人建立联系。
- **S (感觉)**：这类人关注当前的实际细节，他们对周围环境有着敏锐的感知力，并能够注意到具体的信息和数据。
- **T (思考)**：ESTP在做决策时更倾向于使用逻辑和客观分析，他们重视效率和实际结果，而不是依赖情感或个人价值。
- **P (感知)**：这种类型的人喜欢保持开放性和灵活性，他们倾向于适应性强，喜欢随机应变。

**ESTP的阳面八维功能**
1. **主导功能：外倾感觉 (Se)** - ESTP的核心驱动力是这一功能，他们通过Se来强烈地感知和体验周围的世界。ESTP通常活在当下，对感官刺激非常敏感，喜欢探索新环境和体验新鲜事物。
2. **辅助功能：内倾思考 (Ti)** - ESTP利用Ti来分析问题，形成自己的逻辑体系。他们倾向于独立思考，对自己的见解和理论充满自信，并且乐于通过逻辑和分析来提高效率和解决问题。
3. **第三功能：外倾情感 (Fe)** - 虽然不是ESTP的主要功能，但Fe在他们的社交互动中起着作用。ESTP能够感知并适应周围人的情感氛围，他们可能会使用这一功能来激励他人或在团队中促进合作。
4. **劣势功能：内倾直觉 (Ni)** - Ni是ESTP最不成熟的功能，他们可能在形成长远的洞察力、预测未来趋势或理解抽象概念时感到挑战。ESTP更倾向于关注当前的体验，而不是过多地担忧未来。`,
    "INFP": `
INFP（调解员）是一种性格类型，具有内倾、直觉、感觉和探索的特征。他们以温和、富有同情心和深刻的创造力而著称。INFP型的人是真正的理想主义者，他们追求的是一个更加和谐、有爱的世界，并努力在个人和社会层面上实现积极的变化。INFP的生活观可以比作一场不断寻求意义和目的的旅程，他们相信通过同情心和理解可以促进个人和社会的成长。他们致力于追求自己的理想，并努力实现一个更加和谐和有爱的世界。然而，他们需要记住，虽然帮助他人和追求更高的目标很重要，但也需要关注自己的需求和幸福。通过平衡他们对外界的贡献与个人的健康和福祉，INFP可以实现更加充实和满足的生活，并成为他人心中的灵感和指导。

- **I (内倾)**：INFP倾向于在自己的内心世界中思考和反省，他们从独处中获得能量，并从中汲取创造力和洞察力。
- **N (直觉)**：这类人关注未来的可能性，他们对抽象概念和大局思考有着天生的洞察力，善于理解复杂的概念和模式。
- **F (情感)**：INFP在做决策时会考虑个人价值观和他人的感受。他们重视和谐与他人的情感需求，并努力维护积极的人际关系。
- **P (感知)**：这种类型的人喜欢保持开放性和灵活性，他们倾向于适应性强，喜欢随机应变，而不是遵循严格的计划。

**INFP的阳面八维功能**
1. **主导功能：内倾情感 (Fi)** - INFP利用这一功能来理解自己的情感和价值观，他们寻求与自己和他人的深层联系。
2. **辅助功能：外倾直觉 (Ne)** - 这一功能帮助INFP探索各种可能性和创意，他们善于发现新的想法和潜在的模式。
3. **第三功能：内倾感觉 (Si)** - INFP通过这一功能回忆和珍视过去的经验，他们对传统和个人历史有着深刻的尊重。
4. **劣势功能：外倾思考 (Te)** - 这是INFP最不成熟的功能，他们可能在需要进行客观分析和组织时遇到挑战。`,
}

} else if (lang == 'en') {
explanation = {
    "ENTP": `
ENTP (Debater) is a personality type characterized by extraversion, intuition, thinking, and prospecting. They are renowned for their innovative thinking, quick wit, and passion for challenging the status quo. ENTPs are natural explorers and debaters, enjoying the process of deconstructing and reconstructing ideas, constantly seeking new perspectives and solutions. With a strong curiosity and a desire to challenge the status quo, ENTPs relish intellectual sparring and exploring new ideas. They are flexible and adaptable, preferring to keep their options open so they can follow their interests and creativity.
The ENTP's outlook on life can be likened to an ongoing adventure of exploration and discovery. They believe that through continuous learning and debate, they can push themselves and others to new heights. However, they need to remember that while debating and exploring are fun, there is also a need to focus on turning ideas into actionable results. By cultivating sensitivity and understanding towards others, ENTPs can build deeper relationships and achieve greater accomplishments and fulfillment in their lives.

- **E (Extraversion)**：ENTPs tend to draw energy from interacting with others; they enjoy exchanging ideas and can easily connect with people.
- **N (Intuition)**：This type focuses on future possibilities and has a natural knack for abstract concepts and big-picture thinking.
- **T (Thinking)**：ENTPs lean towards using logic and objective analysis when making decisions, rather than relying on emotions or personal values.
- **P (Perception)**：Individuals of this type prefer to keep things open and flexible; they are adaptable and enjoy improvising.

**ENTP's Dominant Eight Functions**
1. **Dominant Function: Extraverted Intuition  (Ne)** - As the core driving force of ENTPs, Ne enables them to explore multiple possibilities and novel perspectives. ENTPs are typically active thinkers who enjoy challenging conventional thinking patterns and seeking innovative solutions.
2. **Auxiliary Function: Introverted Thinking  (Ti) ** - ENTPs use Ti to analyze problems and develop their own logical frameworks. They tend to think independently, are confident in their insights and theories, and enjoy improving efficiency and solving problems through logic and analysis.
3. **Tertiary Function: Extraverted Feeling  (Fe)** - Although not the primary function of ENTPs, Fe plays a role in their social interactions. ENTPs can sense and adapt to the emotional atmosphere around them, and they may use this function to motivate others or promote collaboration within a team.
4. **Inferior Function: Introverted Sensing  (Si)** - Si is the least mature function for ENTPs, and they may feel uncomfortable dealing with specific details, following established procedures, or relying on past experiences. ENTPs are more inclined to focus on future possibilities rather than relying too much on past experiences.`,
    "ISFP": `
ISFP (Adventurer) is a personality type with introverted, observant, sensory, and exploratory characteristics. They are known for their open-mindedness and love for life, always looking for new experiences and opportunities for self-expression. ISFP people are truly free spirits, and their lives are full of creativity and a deep perception of beauty. ISFP's view of life can be compared to an adventure of continuous exploration and experience. They believe that self-expression and appreciation of beauty can enrich their own and others' lives. They are committed to pursuing personal passions and striving for harmonious coexistence with the surrounding world. However, they need to remember that while pursuing immediate happiness and freedom is important, they also need to focus on long-term goals and stability. By balancing their pursuit of freedom with their commitment to responsibility, ISFPs can achieve a more fulfilling and fulfilling life, and become a source of inspiration and creativity in the hearts of others. By demonstrating their passion, adaptability, and profound perception of beauty, ISFPs can achieve greater success in their lives and bring unique perspectives and appreciation to the world.
- **I (Introverted)**：ISFP tends to think and reflect in their own inner world. They gain energy from solitude and draw creativity and emotional depth from it.
- **S (feeling)**：This type of person pays attention to current practical details, has a keen perception of the surrounding environment, and is able to notice the needs and emotions of others.
- **F (Emotion)**：ISFP considers personal and others' emotions when making decisions. They value harmonious emotional connections with others and strive to maintain positive interpersonal relationships.
- **P (Perception)**：This type of person likes to maintain openness and flexibility. They tend to be adaptable and like to adapt to changes rather than follow strict plans.

**ISFP's Dominant Eight Functions**
1. **Dominant Function: Introverted Emotions (Fi)** - ISFPs use this function to understand their own emotions and values, and they seek deep emotional connections with themselves and others.
2. **Auxiliary Function: Extraverted Sensing (Se)** - This feature helps ISFPs enjoy and participate in the current sensory experience, they like to live in the moment and fully experience life.
3. **Tertiary Function: Introverted Intuition (Ni)** - ISFP forms insights and visions for the future through this function, and they are able to recognize deep patterns and meanings.
4. **Inferior Function: Extraverted Thinking (Te)** - This is the most immature function of ISFP, and they may encounter challenges in dealing with objective analysis and organization.`,
    "INTJ": `
INTJ, which stands for introverted, intuitive, thoughtful, and judgmental, is a type of Myers-Briggs Personality Type Indicator (MBTI). People of this type are known for their independence, innovation, and strategic thinking. They are usually seen as architects because they are good at constructing complex plans and putting them into practice. They like to think deeply and plan, pursue efficiency and logic, while maintaining loyalty to personal values. INTJs are good at starting from the big picture, formulating strategies, and achieving goals with practical actions. They may appear reserved in social situations, but for like-minded people, they are profound and insightful partners. The life view of INTJs can be compared to an orchestrated chess game, and they always look for the best action plan to overcome challenges and achieve success.
- **I (Introverted) **: INTJs tend to think and reflect in their own inner world, rather than seeking stimulation from the external world. They enjoy alone time and gain energy from it.
- **N (Intuition) **: This type of person tends to focus on future possibilities rather than just current facts and details. They enjoy thinking about abstract concepts and can see the big picture of things.
- **T (Thinking)**：INTJs tend to use logic and objective analysis when making decisions, rather than relying on emotions or personal values. They value rationality and efficiency.
- **J (Judgment)**：This type of person likes to be planned and organized. They tend to control their environment and like things to be orderly and predictable.

**INTJ's Dominant Eight Functions**
1. **Dominant Function: Introverted Intuition (Ni)** - This is the core driving force of INTJs, and they use this function to form insights and visions for the future. They are able to recognize patterns and predict future developments.
2. **Auxiliary Function: Extraverted Thinking (Te)** - This feature helps INTJs translate their intuition into practical actions and plans. They are good at logical analysis and organizing information to achieve goals.
3. **Tertiary Function: Introverted Emotion (Fi)** - Although this is not the main function of INTJs, it plays a role in their decision-making process. They have a deep understanding of their values and emotions, although they may not express them publicly.
4. **Inferior Function: Extraverted Sensing (Se)** - This is the most immature function of INTJs, who may face challenges in processing immediate sensory experiences and real-world details.`,
    "ESFJ": `
ESFJ (Consul) is a personality type that is extroverted, observant, perceptual, and judgmental. They are known for their attention to detail, people-oriented attitude, and active participation in social communities. ESFJ types are the pillars of social interaction, they enjoy sharing life with others, and convey the values of hospitality and good manners through their behavior.
People with ESFJs are social architects who build and maintain a tight social network, making everyone feel part of the community through their care and support. Their behavior is guided by strong values, and they are willing to provide guidance and assistance to others, ensuring that everyone feels valued and cared for. However, they need to remember that although they desire to help and guide others, everyone has their own path and choices, and accepting this is crucial for building healthier relationships. By demonstrating caring, thoughtful, and responsible behavior, ESFJs can achieve greater achievement and satisfaction in their lives and become role models in the hearts of others.

- **E (Extroverted) **: ESFJs tend to gain energy from interacting with others, they enjoy participating in social activities, and can easily establish connections with others.
- **S (feeling) **: This type of person pays attention to current practical details, has a keen perception of the surrounding environment, and can pay attention to the needs of others.
- **F (Emotion) **: ESFJs consider personal and others' emotions when making decisions, and they value harmony and the emotional needs of others.
- **J (Judgment) **: This type of person likes to be planned and organized. They tend to pursue structure and order in order to achieve their goals more effectively.

**ESFJ's Dominant Eight Functions**
1. **Dominant Function: Extraverted Emotions (Fe)** - The core driving force of ESFJs is this function. They use Fe to understand and meet the emotional needs of others, and to establish and maintain harmonious interpersonal relationships. ESFJs are usually very concerned about social norms and the feelings of others, and they are good at creating a warm and supportive environment.
2. **Auxiliary Function: Introverted Sensation (Si)**- This function helps ESFJs recall and use past experiences to guide current behavior. They value tradition and stability, tend to follow established procedures and habits, which makes ESFJs exhibit reliable and orderly traits in daily life.
3. **Tertiary Function: Extraverted Intuition (Ne)** - Although not the main function of ESFJs, Ne enables them to see multiple possibilities and remain open to new ideas and perspectives. ESFJs may use this function to find innovative ways to solve problems or improve their social interactions.
4. **Inferior Function: Introverted thinking (Ti)** - Ti is the most immature function of ESFJs. They may feel challenged when independently analyzing problems, forming their own logical system, or dealing with complex logical problems. ESFJs may prefer to rely on the opinions of others or social consensus rather than in-depth personal logical analysis.`,
    "INFJ": `
INFJ (Advocate) is a personality type with introverted, intuitive, sensory, and judgmental characteristics. They are known for their deep thinking, rich imagination, and strong personal values. INFJ types are idealists who pursue not only personal success, but also deeper satisfaction - achieving their goals by helping others and bringing positive change to the world. The life philosophy of INFJ can be compared to a journey seeking meaning and purpose. They believe that personal and social growth can be promoted through compassion and understanding. They are committed to pursuing their ideals and striving for a more harmonious and loving world. However, they need to remember that while helping others and pursuing higher goals is important, they also need to focus on their own needs and happiness. By balancing their contributions to the outside world with their personal health and well-being, INFJs can achieve a more fulfilling and fulfilling life and become an inspiration and guide in the hearts of others.
- **I (Introverted) **: INFJs tend to think and reflect in their inner world. They gain energy from solitude and draw creativity and insight from it.
- **N (intuition) **: This type of person focuses on the possibilities of the future. They have a natural insight into abstract concepts and big-picture thinking, and are good at understanding complex concepts and patterns.
- **F (Emotion) **: INFJs consider personal values and the feelings of others when making decisions. They value harmony and the emotional needs of others, and strive to maintain positive interpersonal relationships.
- **J (Judgment) **: This type of person likes to be planned and organized. They tend to pursue structure and order in order to achieve goals and visions more effectively.

**INFJ's Dominant Eight Functions**
1. **Dominant Function：Introverted Intuition (Ni)** - INFJs use this function to form insights and visions of the future, and they are able to recognize deep patterns and meanings.
2. **Auxiliary Function: Extraverted Emotion(Fe)** - This function helps INFJs understand the emotions and needs of others, they are good at building and maintaining interpersonal relationships, and giving support and encouragement.
3. **Tertiary Function: Introverted Thinking(Ti)** - INFJs analyze and solve problems through this function, seeking clarity and logic to ensure that their actions are consistent with their intrinsic values.
4. **Inferior Function:  Extraverted Sensing(Se)** - This is the most immature function of INFJs, who may face challenges in processing immediate sensory experiences and real-world details.`,
    "ESTJ": `
ESTJ (Executive) is a personality type with characteristics of extroversion, strong observation, good thinking and judgment. They are known for their firm will, respect for order, and adherence to rules. ESTJ individuals are the pillars of society, providing clear direction and stable leadership for others through their actions and decisions. The life philosophy of ESTJ can be compared to a carefully organized activity. They believe that by adhering to principles and rules, they can bring order and efficiency to society. They lead by example, demonstrating commitment to work and respect for responsibility. However, they need to remember that while rules and structure are important, flexibility and understanding of others' emotions are equally crucial. By balancing their need for order with their sensitivity to the emotions of others, ESTJs can achieve more harmonious and effective leadership, and achieve greater achievement and satisfaction in their lives. By demonstrating firmness, fairness, and purposeful honesty, ESTJs can become respected leaders in their communities and organizations.
- **E (Extroverted) **: ESTJs tend to gain energy from interactions with others, they enjoy organizing and leading activities, and are able to easily connect with people.
- **S (feeling)**: This type of person pays attention to current practical details, has a keen perception of the surrounding environment, and can notice specific facts and information.
- **T (thinking)**: ESTJs tend to use logic and objective analysis when making decisions. They value efficiency and fairness rather than relying on emotions or personal values.
- **J (Judgment)**: This type of person likes to be planned and organized. They tend to pursue structure and order in order to achieve their goals more effectively.

**ESTJ's Dominant Eight Functions**
1. **Dominant Function: Extraverted Thinking (Te)** - The core driving force of ESTJs is this function, they use Te to organize and implement plans, pursue efficiency and results. ESTJs usually pay close attention to details, can make decisions quickly and take action.
2. **Auxiliary Function: Introverted sensation (Si)** - This function helps ESTJs recall and use past experiences to guide current behavior. They value tradition and stability, tend to follow established procedures and habits, which makes ESTJs exhibit reliable and orderly traits in daily life.
3. **Tertiary Function: Extraverted Intuition (Ne)** - Although not the main function of ESTJs, Ne enables them to see multiple possibilities and remain open to new ideas and perspectives. ESTJs may use this function to find innovative ways to solve problems or improve their organization and planning.
4. **Inferior Function: Introverted Emotion (Fi)** - Fi is the most immature function of ESTJs, and they may encounter challenges in dealing with personal emotions and values. ESTJs may be more inclined to rely on logic and objective analysis rather than personal emotional reactions. However, as individuals grow, ESTJs can learn to better understand and balance their emotional needs.`,
    "ENFP": `
ENFP (Activist) is a personality type with characteristics of extroversion, intuition, feeling, and foresight. These people are known for their creative thinking, enthusiastic attitude, and desire for new experiences. They are truly free souls, full of curiosity and exploratory spirit towards life. ENFP is good at discovering new possibilities through their intuition and establishing deep connections with others through their empathy. They are flexible and adaptable, and like to keep their choices open so that they can follow their passions and interests. The life philosophy of ENFP can be compared to an adventure of continuous exploration and discovery. They believe that through active participation and a deep understanding of the surrounding world, every day can be filled with magic and meaning.
- **E (Extroverted)**: ENFPs usually draw energy from interacting with others, they enjoy socializing and building connections with others.
- **N (intuition)**: This type of person tends to focus on future possibilities, and they have a natural insight into abstract concepts and big-picture thinking.
- **F (Emotion)**: ENFPs consider personal and other people's emotions when making decisions, and they value interpersonal relationships and harmony.
- **P (Perception)**: This type of person likes to maintain openness and flexibility. They tend to be adaptable and like to adapt to changes.

**ENFP's Dominant Eight Functions**
1. **Dominant Function: Extraverted Intuition (Ne)** - This is the core driving force of ENFPs, who use this function to explore new possibilities, perspectives, and creativity. ENFPs are usually curious about the world and enjoy expanding their horizons through continuous learning.
2. **Auxiliary Function: Introverted Emotion (Fi)** - ENFP forms their own values and moral standards through this function. They are very sensitive to their feelings and inner beliefs, which helps them make decisions that align with their values in their personal and professional lives.
3. **Tertiary Function: Extraverted Thinking (Te)** - Although this is not the main function of ENFP, it plays a role in their daily lives. ENFP can organize and implement plans to achievePresent their ideas and visions. They are usually able to efficiently manage tasks and projects.
4. **Inferior Function: Introverted Sensing (Si)** - This is the most immature function of ENFPs, who may encounter challenges when dealing with details, following routine procedures, or reviewing past experiences. ENFPs may be more inclined to focus on the future rather than the past.`,
    "ISTP": `
ISTP (Connoisseur) is a personality type with introverted, observant, thoughtful, and exploratory characteristics. They are known for their individualism, pragmatism, and desire for new experiences. ISTP individuals are natural problem solvers who enjoy mastering the world around them through practice and experimentation. ISTP's philosophy of life can be compared to an adventure of continuous exploration and practice. They believe that learning and growth can be achieved through personal experience and experimentation. They are committed to pursuing personal interests and striving for a deep understanding of complex problems. However, they need to remember that while pursuing immediate experience and freedom is important, they also need to focus on long-term goals and stability. By balancing their pursuit of freedom with their commitment to responsibility, ISTPs can achieve a more fulfilling and fulfilling life, and become a source of innovation and problem-solving in the hearts of others. By demonstrating their pragmatism, adaptability, and profound perception of new experiences, ISTPs can achieve greater success in their lives and bring unique perspectives and skills to the world.
- **I (Introverted)**: ISTP tends to think and reflect in their own inner world. They gain energy from solitude and draw creativity and problem-solving skills from it.
- **S (feeling)**: This type of person pays attention to current practical details, has a keen perception of the surrounding environment, and can notice specific facts and information.
- **T (Thinking)**:ISTP tends to use logic and objective analysis when making decisions. They value efficiency and practical results rather than relying on emotions or personal values.
- **P (Perception)**: This type of person likes to maintain openness and flexibility. They tend to be adaptable and like to adapt to changes rather than follow strict plans.

**ISTP's Dominant Eight Functions**
1. **Dominant Function: Introverted Thinking (Ti)** - The core driving force of ISTP is this function. They use Ti to analyze problems and form their own logical system. ISTP usually thinks independently, is confident in their own insights and theories, and is happy to improve efficiency and solve problems through logic and analysis.
2. **Auxiliary Function: Extraverted sensation (Se)** - This function helps ISTP strongly perceive and experience the world around them. They live in the present, are very sensitive to sensory stimulation, like to explore new environments and experience new things, which allows ISTP to quickly adapt to changes and respond.
3. **Tertiary Function: Introverted Intuition (Ni)** - Although not the main function of ISTP, Ni enables them to see future patterns and trends to some extent. ISTP may use this function to predict what may happen next or to seek deeper meanings in complex situations.
4. **Inferior Function: Extraverted Emotion (Fe)** - Fe is the least mature function of ISTP, and they may feel challenged in understanding and expressing their emotions, as well as dealing with emotional dynamics in interpersonal relationships. ISTP may be more inclined to rely on logic and objective analysis rather than personal emotional reactions. `,
    "ESFP": `
ESFP (Performer) is a personality type with the characteristics of being extroverted, observant, perceptive, and open-minded. These people are known for their vitality, enthusiasm, and love for life. ESFP type people are natural socializers who enjoy interacting with others and always look for opportunities to share happiness and positive energy with others. The life view of ESFP can be compared to a constantly staged performance. They believe that by sharing happiness and positive energy with others, life can be made more exciting. They are passionate about participating in various activities and always looking for new ways to enjoy life and connect with others. However, they need to remember that while pursuing immediate happiness and adventure is important, they also need to focus on long-term responsibilities and goals. By balancing their pursuit of instant gratification with their planning for the future, ESFPs can achieve a more fulfilling and satisfying life. By demonstrating a caring, adaptable, and optimistic attitude, ESFPs can achieve greater success in their lives and become a source of happiness in the hearts of others.
- **E (Extroverted)**: ESFPs tend to gain energy from interacting with others, they enjoy social activities, and are able to easily connect with others.
- **S (feeling)**: This type of person pays attention to current practical details, has a keen perception of the surrounding environment, and can pay attention to the needs of others.
- **F (Emotion)**: ESFPs consider personal and other people's emotions when making decisions, and they value harmony and the emotional needs of others.
- **P (Perception)**: This type of person likes to maintain openness and flexibility. They tend to be adaptable and like to adapt to changes.

**ESFP's Dominant Eight Functions**
1. **Dominant Function: Extraverted Sensing (Se)** - This is the core driving force of ESFPs, who use Se to strongly perceive and experience the world around them. ESFPs usually live in the present, are very sensitive to sensory stimulation, and enjoy exploring new environments and experiencing new things.
2. **Auxiliary Function: Introverted Emotions (Fi)** - ESFPs use Fi to develop personal values and moral standards. They are very aware of their own feelings and make decisions based on these internal guiding principles. Fi helps ESFPs maintain sincerity and loyalty to themselves in social interactions.
3. **Tertiary Function: Extraverted Thinking (Te)** - Although not the main function of ESFP, Te plays an important role in their lives. ESFP can organize and execute plans to achieve the results they want. They are usually able to manage tasks efficiently, especially in situations where quick action is required.
4. **Inferior Function: Introverted Intuition (Ni)** - Ni is the most immature function of ESFP, and they may feel challenged when forming long-term insights, predicting future trends, or understanding abstract concepts. ESFP tends to focus more on current experiences rather than worrying too much about the future.`,
    "INTP": `
INTP (Logician) is a personality type with introverted, intuitive, thinking, and exploratory characteristics. They are flexible thinkers who like to take non-traditional approaches to many aspects of life. INTP people are proud of their unique perspective and energetic intelligence. They are confused about the mysteries of the universe and enjoy exploring unknown areas. The INTP's view of life can be compared to a constant search for knowledge and understanding. They believe that the mysteries of the universe can be revealed through logic and analysis. They are committed to pursuing their intellectual interests and striving to achieve a deep understanding of complex issues. However, they need to remember that although intellectual pursuit is important, they also need to pay attention to their emotional needs and connections with others. By balancing their pursuit of knowledge with their personal emotional well-being, INTPs can achieve a more fulfilling and fulfilling life and become a source of wisdom and innovation in the hearts of others.
- **I (Introverted) **: INTP tends to think and reflect in their own inner world. They gain energy from solitude and draw creativity and insight from it.
- **N (intuition) **: This type of person focuses on the possibilities of the future. They have a natural insight into abstract concepts and big-picture thinking, and are good at understanding complex concepts and patterns.
- **T (Thinking)**: INTPs tend to use logic and objective analysis when making decisions. They value rationality and efficiency rather than relying on emotions or personal values.
- **P (Perception)**: This type of person likes to maintain openness and flexibility. They tend to be adaptable and like to improvise rather than follow strict plans.

**INTP's Dominant Eight Functions**
1. **Dominant Function: Introverted Thinking (Ti)** - INTPs use this function to analyze and understand complex systems and concepts, seeking internal logical consistency and clarity.
2. **auxiliary Function: Extraverted Intuition (Ne)** - This feature helps INTPs explore various possibilities and creativity, and they are good at discovering new ideas and potential patterns.
3. **Tertiary Function: Introverted Sensing (Si)** - INTPs recall and cherish past experiences through this function, and they have a deep respect for tradition and personal history.
4. **Inferior Function: Extraverted Emotions (Fe)** - This is the most immature function of INTP, and they may encounter challenges in processing and expressing their own and others' emotions.`,
    "ISFJ": `
ISFJ (Defender) is a personality type with introverted, observant, sensory, and judgmental abilities. They are known for their humility, enthusiasm, and deep concern for others. ISFJ individuals are guardians of society, providing support and stability to those around them through their actions and commitments. The life philosophy of ISFJ can be compared to a journey of constantly providing support and care. They believe that their actions can bring stability and security to others. They are committed to maintaining tradition and order, and striving to fulfill their commitments to their families and communities. However, they need to remember that while helping others and pursuing responsibility is important, they also need to focus on their own needs and happiness. By balancing their contributions to the outside world with their personal health and well-being, ISFJs can achieve a more fulfilling and fulfilling life and become a source of support and comfort in the hearts of others.
- **I (Introverted)**: ISFJs tend to think and reflect in their own inner world. They gain energy from solitude and draw strength from it to better care for others.
- **S (feeling)**: This type of person pays attention to current practical details, has a keen perception of the surrounding environment, and can pay attention to the needs and preferences of others.
- **F (Emotion)**: ISFJs consider personal and others' emotions when making decisions. They value harmonious emotional connections with others and strive to maintain positive interpersonal relationships.
- **J (Judgment)**: This type of person likes to be planned and organized. They tend to pursue structure and order in order to take care of others and complete tasks more effectively.

**ISFJ's Dominant Eight Functions**
1. **Dominant Function: Introverted Sensing (Si)** - ISFJs use this function to recall and cherish past experiences. They value traditional and familiar ways and use them as a basis to guide current actions.
2. **auxiliary Function: Extraverted emotion (Fe)** - This function helps ISFJs understand the emotions and needs of others, they are good at building and maintaining interpersonal relationships, and giving support and encouragement.
3. **Tertiary Function: Introverted Thinking (Ti)** - ISFJs analyze and solve problems through this function, seeking clarity and logic to ensure that their actions are consistent with their intrinsic values.
4. **Inferior Function: Extraverted intuition (Ne)** - This is the most immature function of ISFJs, and they may encounter challenges in dealing with abstract concepts and future planning.`,
    "ENTJ": `
ENTJ (Commander) is a personality type with characteristics of extroversion, intuition, thinking, and judgment. They are natural leaders known for their decisiveness, efficiency, and relentless pursuit of achievement. ENTJ individuals are good at strategic thinking and use their intuition and judgment to develop and implement plans to achieve their goals and visions. ENTJ individuals have a strong work ethic and self-discipline. They are results-oriented and not afraid to face challenges. They pursue excellence and believe that they can achieve any goal through hard work and determination. In a professional environment, ENTJs are respected for their decisiveness and efficiency. They can identify and cultivate the talents of others to build strong teams. However, they also need to remember that emotional intelligence and teamwork are equally important for long-term success and satisfaction. ENTJ's view of life can be compared to a strategic game, where they constantly seek to optimize their actions to win and influence others.
- **E (Extroverted)**: ENTJs tend to gain energy from interactions with others, they enjoy leading and being able to influence others.
- **N (intuition)**: These people focus on the possibilities of the future, and they have a natural insight into abstract concepts and big-picture thinking.
- **T (Thinking)**: ENTJ tends to use logic and objective analysis when making decisions, rather than relying on emotions or personal values.
- **J (Judgment)**: This type of person likes to be planned and organized. They tend to control their environment and like things to be orderly and predictable.

**ENTJ's Dominant Eight Functions**
1. **Dominant Function: Extraverted Thinking (Te)** - The core driving force of ENTJs is this function. They use Te to organize and analyze information, and develop effective plans and strategies. ENTJs usually have a high pursuit of efficiency and results. They can objectively evaluate situations and make decisions quickly.
2. **Auxiliary Function: Introverted Intuition (Ni)** - This feature helps ENTJs form insights and visions for the future, and they can identify potential opportunities and possibilities. ENTJs use Ni to predict future trends and translate these predictions into actual action plans.
3. **Tertiary Function: Extraverted Sensing (Se)** - ENTJs perceive and adapt to the current environment through Se, and they can quickly respond to external changes and use this information to optimize their actions. Although this is not the main function of ENTJs, it plays an important role in their decision-making process.
4. **Inferior Function: Introverted Emotion (Fi)** - This is the least mature function of ENTJs, who may encounter challenges in dealing with personal emotions and values. ENTJs may be more inclined to rely on logic and objective analysis rather than personal emotional reactions. However, as individuals grow, ENTJs can learn to better understand and balance their emotional needs.`,
    "ISTJ": `
ISTJ (Executor) is a personality type with introverted, observant, thoughtful, and judgmental characteristics. They are known for their rational, reliable, and organized lifestyle. ISTJ types are the pillars of society, providing stability and order to those around them through their actions and decisions. ISTJ's outlook on life can be compared to an orchestrated action plan. They believe that by adhering to principles and rules, they can bring order and efficiency to society. They lead by example, demonstrating commitment to work and respect for responsibility. However, they need to remember that while rules and structure are important, flexibility and understanding of others' emotions are equally crucial. By balancing their need for order with their sensitivity to the emotions of others, ISTJs can achieve more harmonious and effective leadership, and achieve greater achievement and satisfaction in their lives. By demonstrating firmness, fairness, and purposeful honesty, ISTJs can become respected leaders in their communities and organizations.
- **I (Introverted)**: ISTJs tend to think and reflect in their inner world. They gain energy from solitude and draw strength from it to better focus on the external world.
- **S (Feeling)**: This type of person pays attention to current practical details, has a keen perception of the surrounding environment, and can notice specific facts and information.
- **T (Thinking)**:ISTJs tend to use logic and objective analysis when making decisions. They value efficiency and practical results rather than relying on emotions or personal values.
- **J (Judgment)**: This type of person likes to be planned and organized. They tend to pursue structure and order in order to achieve goals and visions more effectively.

**ISTJ's Dominant Eight Functions**
1. **Dominant Function: Introverted Sensing (Si)** - The core driving force of ISTJs is this function. They use Si to review and utilize past experiences to form a deep understanding of the real world. ISTJs usually pay great attention to details and can remember and apply past lessons to guide current decisions.
2. **Auxiliary Function: Extraverted thinking (Te)** - This feature helps ISTJs organize and implement plans, pursue efficiency and results. They value logic and objectivity, and are able to make decisions and take action quickly to achieve established goals.
3. **Tertiary Function: Introverted Emotions (Fi)** - ISTJs develop personal values and moral standards through Fi. They have a deep understanding of their own feelings and make decisions based on these internal guiding principles. Fi helps ISTJs deal with moral issues in their personal and professional lives while maintaining principles and loyalty.
4. **Inferior Function: Extraverted Intuition (Ne)** - Ne is the least mature function of ISTJs, who may feel challenged when seeing multiple possibilities and exploring new ideas and perspectives. ISTJs tend to focus more on known information and experience rather than worrying too much about unknown or abstract concepts. 。`,
    "ENFJ": `
ENFJ (protagonist) is a personality type characterized by extroversion, intuition, feeling, and judgment. These people are known for their enthusiastic, caring, and inspiring leadership style. They have a natural desire to help others and are committed to making a positive impact on both personal and social levels. They not only focus on personal growth, but also collective well-being. They are good at communication and can communicate with others in a compassionate and inspiring way. ENFJ maintains optimism when facing challenges and always sees the positive side of things. Their outlook on life can be compared to a movement aimed at uplifting others and achieving higher goals. They always look for opportunities to lead by example and guide others towards a brighter future.
- **E (Extroverted)**: ENFJs tend to gain energy from interactions with others, they enjoy socializing and are able to easily connect with people.
- **N (intuition)**: This type of person focuses on future possibilities and potential patterns. They like to think about abstract concepts and can see the big picture of things.
- **F (Emotion)**: ENFJs consider personal values and the feelings of others when making decisions. They value harmony and the emotional needs of others.
- **J (Judgment)**: This type of person likes to be planned and organized. They tend to pursue structure and order in order to achieve their goals more effectively.

**ENFJ's Dominant Eight Functions**
1. **Dominant function: Extraverted emotion (Fe)** - This is the core driving force of ENFJs, and they use this function to establish and maintain interpersonal relationships, as well as influence and motivate others.
2. **Auxiliary Function: Introverted Intuition (Ni)** - This feature helps ENFJs form insights and visions for the future, and they are able to identify potential opportunities and possibilities.
3. **Tertiary Function: Extraverted Sensing (Se)** - Although this is not the main function of ENFJs, it plays a role in their daily lives. They are able to perceive and appreciate the current environment and experiences.
4. **Inferior Function: Introverted thinking (Ti)** - This is the most immature function of ENFJs, and they may encounter challenges when dealing with complex logical problems or paying too much attention to details.`,
    "ESTP": `
ESTP (Entrepreneur) is a personality type with the characteristics of extroversion, strong observation, thinking, and exploring prospects. They are action-oriented, full of vitality and adaptability, and good at discovering and seizing opportunities in life. ESTP people are natural problem solvers who like to deal with challenges through practical actions rather than just staying in theory or abstract concepts. The life philosophy of ESTP can be compared to an adventure of continuous exploration and action. They believe that problems can be solved and value can be created through direct and practical actions. They face life with a spontaneous and flexible attitude, always looking for new opportunities and challenges. However, they need to remember that although action and adaptability are important, they also need to focus on long-term planning and goal setting. By balancing their pursuit of immediate action with planning for the future, ESTPs can achieve a more fulfilling and satisfying life. By demonstrating their passion, adaptability, and problem-solving abilities, ESTPs can achieve greater success in their lives and become a source of inspiration for others.
- **E (Extroverted) **: ESTPs tend to gain energy from interactions with others, they enjoy social activities, and are able to easily connect with people.
- **S (feeling) **: This type of person pays attention to current practical details, has a keen perception of the surrounding environment, and can notice specific information and data.
- **T (Thinking) **: ESTP tends to use logic and objective analysis when making decisions. They value efficiency and practical results rather than relying on emotions or personal values.
- **P (Perception) **: This type of person likes to maintain openness and flexibility. They tend to be adaptable and like to adapt to changes.

**ESTP's Dominant Eight Functions**
1. **Dominant Function: Extraverted Sensing (Se)** - The core driving force of ESTP is this function, through which they strongly perceive and experience the world around them. ESTP usually lives in the present, is very sensitive to sensory stimulation, and likes to explore new environments and experience new things.
2. **Auxiliary Function: Introverted thinking (Ti)** - ESTP uses Ti to analyze problems and form their own logical system. They tend to think independently, are confident in their own insights and theories, and are happy to improve efficiency and solve problems through logic and analysis.
3. **Tertiary Function: Extraverted emotion (Fe)** - Although not the main function of ESTP, Fe plays a role in their social interaction. ESTP can perceive and adapt to the emotional atmosphere of the people around them, and they may use this function to motivate others or promote cooperation in teams.
4. **Inferior Function: Introverted Intuition (Ni)** - Ni is the most immature function of ESTP, and they may find it challenging to form long-term insights, predict future trends, or understand abstract concepts. ESTP tends to focus more on current experiences rather than worrying too much about the future.`,
    "INFP": `
INFP (Mediator) is a personality type with introverted, intuitive, sensory, and exploratory characteristics. They are known for their gentleness, compassion, and profound creativity. INFP individuals are true idealists who pursue a more harmonious and loving world and strive to achieve positive change on a personal and social level. INFP's view of life can be compared to a journey of constantly seeking meaning and purpose. They believe that personal and social growth can be promoted through compassion and understanding. They are committed to pursuing their ideals and striving to achieve a more harmonious and loving world. However, they need to remember that while helping others and pursuing higher goals is important, they also need to focus on their own needs and happiness. By balancing their contributions to the outside world with their personal health and well-being, INFPs can achieve a more fulfilling and fulfilling life and become an inspiration and guide in the hearts of others.
- **I (Introverted) **: INFPs tend to think and reflect in their inner world. They gain energy from solitude and draw creativity and insight from it.
- **N (Intuition) **: This type of person focuses on the possibilities of the future. They have a natural insight into abstract concepts and big-picture thinking, and are good at understanding complex concepts and patterns.
- **F (Emotion)**: INFPs consider personal values and the feelings of others when making decisions. They value harmony and the emotional needs of others, and strive to maintain positive interpersonal relationships.
- **P (Perception)**: This type of person likes to maintain openness and flexibility. They tend to be adaptable and like to improvise rather than follow strict plans.

**INFP's Dominant Eight Functions**
1. **Dominance Function: Introverted Emotions (Fi)** - INFPs use this function to understand their own emotions and values, and they seek deep connections with themselves and others.
2. **Auxiliary Function: Extraverted Intuition (Ne)** - This feature helps INFPs explore various possibilities and creativity, and they are good at discovering new ideas and potential patterns.
3. **Tertiary Function: Introverted Sensing (Si)** - INFPs recall and cherish past experiences through this function, and they have a deep respect for tradition and personal history.
4. **Inferior Function: Extraverted Thinking (Te)** - This is the most immature function of INFP, and they may encounter challenges when objective analysis and organization are needed.`,
}
}
export const mbtiExplanation = explanation;
