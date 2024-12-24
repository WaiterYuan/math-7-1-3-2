let currentEquation = '';
let currentAnswer = '';

function generateEquation() {
  const selectedDifficulty = parseInt(document.getElementById('difficulty').value, 10);
  const difficulty = selectedDifficulty === 0 ? Math.floor(Math.random() * 3) + 1 : selectedDifficulty;
  let equation = '';
  let answer = 0;

  switch (difficulty) {
    case 1:
      // 難度 1: 只有一個 x 項
      let a1, b1, c1;
      do {
        a1 = randomInt(-10, 10, true);
        b1 = randomInt(-10, 10, false);
        c1 = randomInt(-10, 10, false);
        answer = (c1 - b1) / a1;
      } while (a1 === 0 || b1 === 0 || c1 === 0 || !Number.isInteger(answer) || answer <= -5 || answer >= 5 || answer === 0);
      equation = `${formatCoefficient(a1)}x ${formatConstant(b1)} = ${c1}`;
      break;

    case 2:
      // 難度 2: 有兩個 x 項
      let a2, b2, c2, d2;
      do {
        a2 = randomInt(-10, 10, true);
        b2 = randomInt(-10, 10, false);
        c2 = randomInt(-10, 10, true);
        d2 = randomInt(-10, 10, false);
        answer = (d2 - b2) / (a2 - c2);
      } while (a2 === 0 || c2 === 0 || b2 === 0 || d2 === 0 || !Number.isInteger(answer) || answer <= -5 || answer >= 5 || answer === 0);
      equation = `${formatCoefficient(a2)}x ${formatConstant(b2)} = ${formatCoefficient(c2)}x ${formatConstant(d2)}`;
      break;

    case 3:
      // 難度 3: 含括號，括號內的 x 可有係數，且括號內必有常數
      let a3, b3, c3, d3, e3, f3, g3;
      do {
        a3 = randomInt(-5, 5, true);  // 括號外的係數 (左)
        b3 = randomInt(-5, 5, true);  // 括號內的 x 的係數 (左)
        c3 = randomInt(-5, 5, false); // 括號內的常數項 (左)
        d3 = randomInt(-5, 5, true);  // 括號外的係數 (右)
        e3 = randomInt(-5, 5, true);  // 括號內的 x 的係數 (右)
        f3 = randomInt(-5, 5, false); // 括號內的常數項 (右)
        g3 = randomInt(-10, 10, false); // 獨立常數項
        answer = (g3 - a3 * c3 + d3 * f3) / (a3 * b3 - d3 * e3);
      } while (
        a3 === 0 || b3 === 0 || d3 === 0 || e3 === 0 || c3 === 0 || f3 === 0 || 
        !Number.isInteger(answer) || answer <= -5 || answer >= 5 || answer === 0
      );

      // 組合題目
      equation = `${formatCoefficient(a3)}(${formatCoefficient(b3)}x ${formatConstant(c3)}) = ${formatCoefficient(d3)}(${formatCoefficient(e3)}x ${formatConstant(f3)}) ${formatConstant(g3)}`;
      break;

    default:
      break;
  }

  currentEquation = equation;
  currentAnswer = answer;
  document.getElementById('equation').textContent = equation;
  document.getElementById('answer').textContent = '';
}


function showAnswer() {
  if (currentAnswer !== '') {
    document.getElementById('answer').style.color = 'red'; // 設定文字顏色為紅色
    document.getElementById('answer').textContent = `答案： x = ${currentAnswer}`;
  } else {
    document.getElementById('answer').style.color = 'black'; // 恢復預設顏色
    document.getElementById('answer').textContent = '請先按隨機出題！';
  }
}

// 格式化係數，處理 1 和 -1 的顯示
function formatCoefficient(coefficient) {
  if (coefficient === 1) return '';
  if (coefficient === -1) return '-';
  return coefficient.toString();
}

// 格式化常數項，避免顯示 "+ -6" 的狀況
function formatConstant(constant) {
  if (constant > 0) {
    return `+ ${constant}`;
  } else if (constant < 0) {
    return `- ${Math.abs(constant)}`;
  }
  return '';
}

// 隨機生成整數，確保必要條件
function randomInt(min, max, excludeZero) {
  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (excludeZero && num === 0);
  return num;
}
