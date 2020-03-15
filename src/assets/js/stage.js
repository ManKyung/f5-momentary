function getStage(stage, row, randomCount, totalCount) {
  let start = stage.length;
  let end = stage.length + 4;
  let pvTime = 1;
  for (let i = start; i < end; i++) {
    if (i % 4 === 0) {
      pvTime = 1;
    } else if (i % 4 === 1) {
      pvTime = 0.8;
    } else if (i % 4 === 2) {
      pvTime = 0.5;
    } else if (i % 4 === 3) {
      pvTime = 0.3;
    }
    console.log(pvTime)
    stage.push({
      level: i,
      previewTime: pvTime,
      row: row,
      randomCount: randomCount,
      totalCount: totalCount,
    })
  }
  return stage;
}

function generator() {
  let stage = [];
  stage.push({
    level: 0,
  })
  stage = getStage(stage, 2, 2, 4);
  stage = getStage(stage, 2, 3, 6);
  for (let i = 3; i <= 6; i++) {
    stage = getStage(stage, 3, i, 9);
  }
  for (let i = 4; i <= 9; i++) {
    stage = getStage(stage, 3, i, 12);
  }
  for (let i = 4; i <= 12; i++) {
    stage = getStage(stage, 4, i, 16);
  }
  for (let i = 4; i <= 14; i++) {
    stage = getStage(stage, 4, i, 20);
  }
  for (let i = 4; i <= 18; i++) {
    stage = getStage(stage, 4, i, 24);
  }
  for (let i = 5; i <= 18; i++) {
    stage = getStage(stage, 5, i, 25);
  }
  for (let i = 5; i <= 20; i++) {
    stage = getStage(stage, 5, i, 30);
  }
  for (let i = 5; i <= 25; i++) {
    stage = getStage(stage, 5, i, 35);
  }
  for (let i = 6; i <= 18; i++) {
    stage = getStage(stage, 6, i, 24);
  }
  for (let i = 6; i <= 24; i++) {
    stage = getStage(stage, 6, i, 30);
  }
  for (let i = 6; i <= 28; i++) {
    stage = getStage(stage, 6, i, 36);
  }

  for (const i in stage) {
    console.log(stage[i])
  }
  return stage;
}

export default generator();
