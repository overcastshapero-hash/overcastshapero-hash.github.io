const presets = {
  law: {
    name: '法学跟课日',
    mainline: '民事诉讼法：先把既判力和一事不再理分清楚',
    state: '白天上课，晚上容易想去折腾工具和新工作流，看起来很忙但不一定真推进。',
    time: '60 分钟',
    risk: '觉得自己什么都没学会'
  },
  build: {
    name: '又想搭系统',
    mainline: '把 AI 和 Obsidian 工作流再重构一遍',
    state: '最近有点焦虑，想通过重搭目录、换提示词、改流程来获得掌控感，但真正该推进的课程和输出没动。',
    time: '90 分钟',
    risk: '想做一个很大的系统'
  },
  output: {
    name: '准备写输出',
    mainline: '写一篇关于 AI 数字团队和真实行动链路的项目说明',
    state: '素材和想法其实已经够了，但总觉得结构还不够完整，容易继续补资料、改提纲，不肯正式开写。',
    time: '30 分钟',
    risk: '准备写东西但迟迟不开头'
  }
};

const riskMap = {
  '开始研究新工具': {
    warning: '你现在最可能的自骗，是把“我在研究更优方案”误当成“我已经开始推进”。今天不准开新工具页，不准重做系统。',
    antiMove: '把浏览器里和当前任务无关的标签关掉，只保留这一仗需要的窗口。'
  },
  '觉得自己什么都没学会': {
    warning: '这里最危险的不是不会，而是因为羞耻感转去补更大的基础，最后连眼前这一课也没拿下。今天只求分清一个概念，不求一口吃完整门课。',
    antiMove: '先复述当前概念，再标出最容易混的点，别跳去重修整个体系。'
  },
  '想做一个很大的系统': {
    warning: '这是典型的“先搭舞台再演戏”。如果今天没有留下一个真正的结果物，那这个系统升级就是心理安慰。',
    antiMove: '把“大系统”砍成一个单页、一个脚本或一条能真实使用的最小链路。'
  },
  '准备写东西但迟迟不开头': {
    warning: '你现在不是没想清，而是把“再想清一点”当成继续不写的理由。真正缺的不是结构，而是首段。',
    antiMove: '先写 120 字导言，只回答：这东西为什么值得做。'
  }
};

const timeMap = {
  '30 分钟': { confidence: '88%' },
  '60 分钟': { confidence: '92%' },
  '90 分钟': { confidence: '95%' },
  '120 分钟': { confidence: '97%' }
};

const els = {
  form: document.getElementById('mission-form'),
  presetButtons: Array.from(document.querySelectorAll('.preset')),
  mainline: document.getElementById('mainline-input'),
  state: document.getElementById('state-input'),
  time: document.getElementById('time-input'),
  risk: document.getElementById('risk-input'),
  scenarioTitle: document.getElementById('scenario-title'),
  judgment: document.getElementById('judgment-output'),
  actions: document.getElementById('actions-output'),
  warning: document.getElementById('warning-output'),
  artifactCheck: document.getElementById('artifact-check-output'),
  artifact: document.getElementById('artifact-output'),
  copyButton: document.getElementById('copy-artifact'),
  heroTrack: document.getElementById('hero-track'),
  heroMainline: document.getElementById('hero-mainline'),
  heroState: document.getElementById('hero-state'),
  heroRisk: document.getElementById('hero-risk'),
  heroArtifact: document.getElementById('hero-artifact')
};

function normalizeText(text) {
  return (text || '').trim().replace(/\s+/g, ' ');
}

function inferTrack(mainline) {
  if (/法|诉|民|刑|课程|课堂|学习/.test(mainline)) return '法学主线';
  if (/写|文章|表达|公众号|输出/.test(mainline)) return '输出主线';
  if (/系统|工作流|网站|产品|项目/.test(mainline)) return '产品主线';
  return '执行主线';
}

function buildJudgment(mainline, risk, time) {
  const track = inferTrack(mainline);
  return `今天真正的主线不是“把所有问题一起解决”，而是先拿下「${mainline}」。这属于${track}。主线局的裁决是：保留 ${time} 给眼前这件事，其他冲动全部降级。`;
}

function buildActions(mainline, risk) {
  const track = inferTrack(mainline);
  const antiMove = riskMap[risk]?.antiMove || '只保留当前任务相关窗口，把阻力降到最低。';
  const stepOne = track === '法学主线'
    ? `先用自己的话解释「${mainline}」到底是什么，并写下最容易混淆的 1 个点。`
    : `先把「${mainline}」压成一句目标句：今天做完以后，能留下什么可展示的结果。`;
  const stepTwo = /写|文章|输出/.test(mainline)
    ? '直接开写第一段，不再继续补提纲。'
    : /系统|网站|产品|项目/.test(mainline)
      ? '只做一条最短可运行链路：一个页面、一个交互或一个可演示结果，不扩范围。'
      : '做一次小型自测或复述，把“我以为懂了”变成“我能说清楚”。';

  return [
    '先把今天定义成一场单点战斗，不再并行开新坑。',
    stepOne,
    stepTwo,
    antiMove,
    '最后把结论、动作和剩余问题沉淀成一条可回看的记录。'
  ];
}

function buildArtifactCheck(mainline, time) {
  const track = inferTrack(mainline);
  if (track === '法学主线') return `完成标准不是“看完了”，而是你能区分概念、完成一次复述，并留下 1 页 Obsidian 笔记。总时长控制在 ${time} 内。`;
  if (track === '输出主线') return `完成标准不是“想清楚了”，而是你产出一个能发出去的初稿框架，至少写出开头和 3 个一级段落。总时长控制在 ${time} 内。`;
  if (track === '产品主线') return `完成标准不是“设计得很完整”，而是你做出一个别人点开就能理解的最小 demo，并能用一句话说清它解决什么。总时长控制在 ${time} 内。`;
  return `完成标准是留下一个可验证的结果物，而不是只留下“我今天想了很多”。总时长控制在 ${time} 内。`;
}

function buildArtifact(name, mainline, state, risk, time) {
  const actions = buildActions(mainline, risk);
  const warning = riskMap[risk]?.warning || '';
  const today = new Date().toLocaleDateString('zh-CN');

  return `# ${name}｜今日作战卡\n\n- 日期：${today}\n- 今日主线：${mainline}\n- 当前状态：${normalizeText(state)}\n- 可用时间：${time}\n- 风险信号：${risk}\n\n## 主线判断\n${buildJudgment(mainline, risk, time)}\n\n## 团队派工\n1. ${actions[0]}\n2. ${actions[1]}\n3. ${actions[2]}\n4. ${actions[3]}\n5. ${actions[4]}\n\n## 反自骗提醒\n${warning}\n\n## 完成标准\n${buildArtifactCheck(mainline, time)}\n\n## 留痕模板\n- 我今天真正推进了什么：\n- 我差点跑偏到哪里：\n- 我最后留下了什么结果物：\n- 下一次接着做什么：`;
}

function renderMission(name = '自定义场景') {
  const mainline = normalizeText(els.mainline.value);
  const state = normalizeText(els.state.value);
  const time = els.time.value;
  const risk = els.risk.value;
  const track = inferTrack(mainline);
  const actions = buildActions(mainline, risk);
  const warning = riskMap[risk]?.warning || '先推进，再解释。';
  const confidence = timeMap[time]?.confidence || '92%';

  els.scenarioTitle.textContent = name;
  els.judgment.textContent = buildJudgment(mainline, risk, time);
  els.warning.textContent = warning;
  els.artifactCheck.textContent = buildArtifactCheck(mainline, time);
  els.actions.innerHTML = actions.map((item) => `<li>${item}</li>`).join('');
  els.artifact.textContent = buildArtifact(name, mainline, state, risk, time);

  els.heroTrack.textContent = track;
  els.heroMainline.textContent = mainline;
  els.heroState.textContent = `${state} 现在主线置信度 ${confidence}。`;
  els.heroRisk.textContent = riskMap[risk]?.antiMove || '只保留当前任务相关入口。';
  els.heroArtifact.textContent = /法|诉|民|刑|学习|课程/.test(mainline)
    ? '作战卡 + 1 页 Obsidian 笔记'
    : '作战卡 + 最小 demo / 初稿';
}

function setPreset(key) {
  const preset = presets[key];
  if (!preset) return;
  els.presetButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.preset === key);
  });
  els.mainline.value = preset.mainline;
  els.state.value = preset.state;
  els.time.value = preset.time;
  els.risk.value = preset.risk;
  renderMission(preset.name);
}

els.presetButtons.forEach((button) => {
  button.addEventListener('click', () => setPreset(button.dataset.preset));
});

els.form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderMission('自定义场景');
});

els.copyButton.addEventListener('click', async () => {
  const original = els.copyButton.textContent;
  try {
    await navigator.clipboard.writeText(els.artifact.textContent);
    els.copyButton.textContent = '已复制';
  } catch (error) {
    els.copyButton.textContent = '复制失败';
  }
  window.setTimeout(() => {
    els.copyButton.textContent = original;
  }, 1200);
});

renderMission('法学跟课日');
