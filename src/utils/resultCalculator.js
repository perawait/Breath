import { questions } from '../data/questions';

// คำอธิบายสั้น archetype ภาษาไทย
const archetypeSummaries = {
  'Golden Sun': 'ผู้มุ่งมั่นและต้องการการจัดการความกดดันอย่างเร่งด่วน',
  'Blue Sky': 'ผู้กำลังค้นหาแรงบันดาลใจและความหมายในชีวิต',
  'Pink Dawn': 'ผู้เยียวยาด้วยความอ่อนโยนและมอบความอบอุ่นให้ผู้อื่น',
  'Violet Horizon': 'ผู้ต้องการความสมดุลและการฟื้นฟู'
};

export const calculateResult = (answers) => {
  const archetypeScores = {
    'Golden Sun': 0,
    'Blue Sky': 0,
    'Pink Dawn': 0,
    'Violet Horizon': 0
  };

  // นับคะแนนเฉพาะ 5 ข้อแรก แต่ละคำตอบ +1 ให้ archetype ที่แมปไว้
  answers.forEach((answer) => {
    if (!answer || !answer.questionId || answer.value == null) return;
    if (answer.questionId < 1 || answer.questionId > 5) return;

    const question = questions.find((q) => q.id === answer.questionId);
    if (!question || !question.options) return;

    const optionIndex = Number(answer.value) - 1;
    const option = question.options[optionIndex];
    if (!option || !option.archetype || !(option.archetype in archetypeScores)) return;

    archetypeScores[option.archetype] += 1;
  });

  // หาผลลัพธ์ตามคะแนนสูงสุด + tie-break
  const priorities = ['Golden Sun', 'Blue Sky', 'Pink Dawn', 'Violet Horizon'];
  const maxScore = Math.max(...Object.values(archetypeScores));

  let archetypeResult = 'Golden Sun';
  for (const name of priorities) {
    if (archetypeScores[name] === maxScore) {
      archetypeResult = name;
      break;
    }
  }

  const archetypeToType = {
    'Golden Sun': 'GOLDEN_SUN',
    'Blue Sky': 'BLUE_SKY',
    'Pink Dawn': 'PINK_DAWN',
    'Violet Horizon': 'VIOLET_HORIZON'
  };

  const type = archetypeToType[archetypeResult] || 'PINK_DAWN';

  const colors = {
    PINK_DAWN: 'from-pink-400 via-rose-300 to-orange-200',
    VIOLET_HORIZON: 'from-purple-600 via-purple-400 to-pink-400',
    BLUE_SKY: 'from-blue-400 via-sky-300 to-blue-200',
    GOLDEN_SUN: 'from-amber-400 via-yellow-300 to-orange-200'
  };

  const color = colors[type] || colors.PINK_DAWN;

  const averages = { energy: 0, motivation: 0, pressure: 0, meaning: 0 };
  const dimensions = { energy: 0, motivation: 0, pressure: 0, meaning: 0 };

  return {
    type,
    averages,
    totalAverage: 0,
    color,
    dimensions,
    archetypes: {
      'Golden Sun': archetypeScores['Golden Sun'],
      'Blue Sky': archetypeScores['Blue Sky'],
      'Pink Dawn': archetypeScores['Pink Dawn'],
      'Violet Horizon': archetypeScores['Violet Horizon'],
      result: archetypeResult,
      summary: archetypeSummaries[archetypeResult] || ''
    }
  };
};

export const getResultDetails = (resultType) => {
  const results = {
    PINK_DAWN: {
      title: "Pink Dawn",
      subtitle: "ผู้มีพลังงานเบื้องต้นในการเติบโต",
      description: "คุณอาจกำลังเริ่มต้นการเดินทางของคุณหรืออยู่ในช่วงที่กำลังค้นหาตัวเอง แม้จะมีความท้าทายบางอย่าง แต่คุณยังคงมีพื้นฐานที่ดีในการพัฒนาตนเอง",
      characteristics: [
        "มีพลังงานพื้นฐานในการทำกิจกรรม",
        "กำลังสร้างแรงจูงใจในชีวิต",
        "ต้องการการสนับสนุนในการจัดการความกดดัน",
        "กำลังค้นหาความหมายในชีวิต"
      ],
      recommendations: [
        "สร้างกิจวัตรประจำวันที่มั่นคง",
        "ตั้งเป้าหมายเล็กๆ ที่ทำได้จริง",
        "สร้างความสัมพันธ์ที่ดีกับคนรอบข้าง",
        "ให้เวลากับการพักผ่อนอย่างเพียงพอ"
      ]
    },
    VIOLET_HORIZON: {
      title: "Violet Horizon",
      subtitle: "ผู้ต้องการความสมดุลและการฟื้นฟู",
      description: "คุณอาจกำลังเผชิญกับความท้าทายที่สำคัญด้านพลังงานและความกดดัน สิ่งสำคัญคือการหาจุดสมดุลและดูแลตนเองให้มากขึ้น",
      characteristics: [
        "พลังงานหมดลงเร็ว",
        "รู้สึกกดดันจากหลายด้าน",
        "ต้องการเวลาพักผ่อนและฟื้นฟู",
        "อาจรู้สึกหมดไฟในบางครั้ง"
      ],
      recommendations: [
        "ลดภาระงานและจัดลำดับความสำคัญ",
        "ฝึกเทคนิคการจัดการความเครียด",
        "หาเวลาพักผ่อนอย่างเพียงพอ",
        "ปรึกษาผู้เชี่ยวชาญหากจำเป็น"
      ]
    },
    BLUE_SKY: {
      title: "Blue Sky",
      subtitle: "ผู้กำลังค้นหาแรงบันดาลใจและความหมาย",
      description: "คุณอาจรู้สึกสับสนเกี่ยวกับทิศทางและความหมายในชีวิต การค้นหาสิ่งที่ทำให้คุณรู้สึกมีคุณค่าจะช่วยให้คุณก้าวไปข้างหน้าได้",
      characteristics: [
        "ขาดแรงจูงใจในบางเรื่อง",
        "กำลังค้นหาความหมายในชีวิต",
        "ต้องการแรงบันดาลใจใหม่ๆ",
        "อาจรู้สึกสูญเสียทิศทาง"
      ],
      recommendations: [
        "สำรวจความสนใจและความชอบใหม่ๆ",
        "ตั้งเป้าหมายที่สอดคล้องกับค่านิยม",
        "หาพี่เลี้ยงหรือแบบอย่างที่ดี",
        "เขียนบันทึกเพื่อสำรวจตนเอง"
      ]
    },
    GOLDEN_SUN: {
      title: "Golden Sun",
      subtitle: "ผู้ต้องการการจัดการความกดดันอย่างเร่งด่วน",
      description: "คุณกำลังเผชิญกับความกดดันสูงที่อาจส่งผลต่อสุขภาพจิตและความเป็นอยู่ การหาวิธีจัดการความกดดันและขอความช่วยเหลือเป็นสิ่งสำคัญ",
      characteristics: [
        "รู้สึกกดดันสูงอย่างต่อเนื่อง",
        "อาจมีอาการวิตกกังวล",
        "ต้องการเรียนรู้การจัดการความเครียด",
        "อาจต้องการความช่วยเหลือจากผู้เชี่ยวชาญ"
      ],
      recommendations: [
        "พูดคุยกับนักจิตวิทยาหรือผู้เชี่ยวชาญ",
        "ฝึกเทคนิคการผ่อนคลาย",
        "จัดการเวลาและลำดับความสำคัญ",
        "สร้างระบบสนับสนุนที่ดี"
      ]
    }
  };

  return results[resultType] || results.PINK_DAWN;
};
