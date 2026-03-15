import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateResult } from '../utils/resultCalculator';
import { sendWebhook } from '../lib/webhook';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;

// โครงสร้างผลลัพธ์ทั้ง 4 แบบ ตามดีไซน์
const resultConfig = {
  PINK_DAWN: {
    bg: '/Pinkbg.png',
    title: 'PINK DAWN',
    subtitle: 'ผู้เยียวยาด้วยความอ่อนโยน',
    description: `คุณคือคนที่มีหัวใจอ่อนโยน
และมักมอบความอบอุ่นให้คนรอบข้าง
เหมือนสีชมพูของรุ่งอรุณ
คุณเชื่อในพลังของความรัก ความเมตตา
และการโอบกอดกันในวันที่เหนื่อยล้า`,
    strengths: ['การเข้าใจความรู้สึกของผู้อื่น', 'ความสามารถในการปลอบโยน'],
    needs: `ให้ความอ่อนโยนกับตัวเองด้วย
ไม่ใช่แค่กับคนอื่น`,
    message: `"การรักและดูแลตัวเอง
คือของขวัญที่ดีที่สุดที่คุณให้โลกได้"`,
    buttonColor: 'text-pink-700'
  },
  VIOLET_HORIZON: {
    bg: '/Violetbg.png',
    title: 'VIOLET HORIZON',
    subtitle: 'นักฝันผู้มองหาความหมายใหม่',
    description: `คุณคือคนที่ชอบค้นหาความหมายลึกซึ้งของชีวิต
เหมือนสีม่วงอ่อนบนขอบฟ้า
คุณอาจผ่านความมืดมา
แต่คุณเลือกที่จะตีความมันใหม่
และเปลี่ยนมันเป็นบทเรียนหรือแรงบันดาลใจ`,
    strengths: ['จินตนาการ', 'การสะท้อนตัวเอง', 'ความคิดสร้างสรรค์'],
    needs: `อย่าติดอยู่กับการค้นหาความหมาย
  จนลืมใช้ชีวิตในปัจจุบัน`,
    message: `“บางครั้งคำตอบไม่ได้อยู่ที่การค้นหา
แต่อยู่ที่การได้ใช้หัวใจสัมผัสปัจจุบัน”`,
    buttonColor: 'text-purple-800'
  },
  BLUE_SKY: {
    bg: '/Bluebg.png',
    title: 'BLUE SKY',
    subtitle: 'ผู้หาความสงบในความเงียบ',
    description: `คุณคือคนที่มองหาความสงบ
เหมือนท้องฟ้าที่โปร่งใส
การพักใจของคุณคือ
การกลับเข้าสู่ความเงียบและพื้นที่ส่วนตัว
เพื่อให้ใจได้หายใจเต็มปอดอีกครั้ง`,
    strengths: ['การควบคุมอารมณ์ได้ดี', 'มองเห็นภาพกว้าง', 'คิดอย่างลึกซึ้ง'],
    needs: `อย่าลืมเปิดใจแบ่งปันบ้าง
เพราะท้องฟ้าที่สวยงาม
ก็ต่อเมื่อมีคนได้เห็นร่วมกัน`,
    message: `“ความสงบในใจคุณ
  เป็นของขวัญที่หายาก
  จงใช้มันเป็นแรงนำทาง”`,
    buttonColor: 'text-blue-800'
  },
  GOLDEN_SUN: {
    bg: '/Goldbg.png',
    title: 'GOLDEN SUN',
    subtitle: 'ผู้ให้พลังใจและความมั่นคง',
    description: `คุณคือคนที่เต็มไปด้วยพลังในการ
สร้างความมั่นคงทั้งต่อตนเองและคนรอบข้าง
หมือนแสงแดดยามเช้าที่อบอุ่นและมั่นคงอยู่เสมอ
ไม่ว่าจะเจอพายุหรือเมฆหมอก
คุณยังพยายามยืนหยัดและทำให้คนอื่นมั่นใจได้ว่า
“พรุ่งนี้จะยังมีแสงสว่างเสมอ”`,
    strengths: ['ความพากเพียร', 'ความอดทน', 'เป็นเสาหลักให้คนอื่น'],
    needs: `อย่าลืมพักบ้าง
เพราะแม้แต่ดวงอาทิตย์
ก็มีเวลาลับขอบฟ้า`,
    message: `“คุณไม่จำเป็น
ต้องแข็งแรงตลอดเวลา
การพักใจก็เป็นพลังอีกแบบหนึ่ง”`,
    buttonColor: 'text-amber-800'
  }
};

function ResultCard({ config }) {
  const navigate = useNavigate();
  const isGoldenSun = config.title === 'GOLDEN SUN';
  const isBlueSky = config.title === 'BLUE SKY';
  const isPinkDawn = config.title === 'PINK DAWN';
  const isVioletHorizon = config.title === 'VIOLET HORIZON';
  const [viewport, setViewport] = useState(() => ({
    width: window.innerWidth,
    height: window.visualViewport?.height || window.innerHeight
  }));

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.visualViewport?.height || window.innerHeight
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.visualViewport?.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.visualViewport?.removeEventListener('resize', updateViewport);
    };
  }, []);

  const scale = Math.min(viewport.width / DESIGN_WIDTH, viewport.height / DESIGN_HEIGHT);

  return (
    <div className="w-full h-[100svh] overflow-hidden flex items-center justify-center bg-black">
      <div
        className="relative"
        style={{
          width: `${DESIGN_WIDTH}px`,
          height: `${DESIGN_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        <img
          src={config.bg}
          alt=""
          className="w-full h-full object-cover block transition-opacity duration-300 ease-out"
        />
        {/* เนื้อหาซ้อนทับบนรูป */}
        <div className="absolute inset-0 flex flex-col p-4 z-10">
          <div className="max-w-sm w-full mx-auto flex flex-col flex-1 text-center text-white animate-fadeIn transition-all duration-300 ease-out pt-5 pb-4">
            <div className="flex flex-col items-center gap-1 mt-3">
              <div className="flex flex-row items-center gap-6">
                <img src="/icon.png" alt="Breath icon" className="w-20 h-25" />
                <div className="flex flex-col items-center">
                    <h1 className="text-white font-extrabold breath-font" style={{ fontSize: '42px', fontWeight: 900, WebkitTextStroke: '0.6px rgba(255,255,255,0.9)' }}>
                      <span className="mt-3 block">Breath</span>
                  </h1>
                  <h2 className="text-white font-light italic -ml-2 -mt-2" style={{ fontSize: '14px', opacity: 0.85 }}>
                    " พักใจ "
                  </h2>
                </div>
              </div>
            </div>

            <div className="px-6 mt-5 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div>
                  <p className="result-heading-font font-bold tracking-wide" style={{ fontSize: '28px' }}>
                    {config.title}
                  </p>
                  <p className="result-heading-font font-extrabold mt-1" style={{ fontSize: '16px', fontWeight: 900 }}>
                    {config.subtitle}
                  </p>
                </div>

                <div className="text-left space-y-2 text-white/90" style={{ fontSize: '14px' }}>
                  {typeof config.description === 'string' ? (
                    <p
                      className="text-center prompt-font mt-2 text-white/80 font-light"
                      style={{
                        whiteSpace: isGoldenSun || isVioletHorizon ? 'pre' : 'pre-line',
                        fontWeight: 300,
                        fontSize: isGoldenSun || isVioletHorizon ? '14px' : '17px',
                        letterSpacing: isGoldenSun || isVioletHorizon ? '0em' : '0.02em'
                      }}
                    >
                      {config.description}
                    </p>
                  ) : (
                    config.description.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))
                  )}
                </div>
              </div>

              <div className="flex flex-row gap-4 prompt-font mt-7">
                <div className="flex-1 text-left mt-[142px]">
                  <p className="font-bold" style={{ fontSize: '18px' }}>
                    จุดแข็ง
                  </p>
                  <ul className="list-disc list-inside text-white/90 font-light" style={{ fontSize: '15px', fontWeight: 300 }}>
                    {config.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  <div className="text-right mt-[207px]">
                    <p className="font-bold" style={{ fontSize: '18px' }}>
                      สิ่งที่ใจคุณต้องการ
                    </p>
                    <p className="text-white/90 font-light" style={{ fontSize: '15px', whiteSpace: 'pre-line', fontWeight: 300 }}>
                      {config.needs}
                    </p>
                  </div>
                </div>
              </div>

              <div className="prompt-font text-left space-y-1 w-full mt-3 self-start">
                <p className="font-bold" style={{ fontSize: '18px' }}>
                  ข้อความถึงคุณ
                </p>
                <p className="text-white/90 italic font-light w-full" style={{ fontSize: '15px', whiteSpace: 'pre-line', fontWeight: 300, textAlign: 'left' }}>
                  {config.message}
                </p>
              </div>
            </div>

            <p className="text-white/70 text-sm mt-2">IG: breath.exhibition</p>

          </div>
        </div>
      </div>
    </div>
  );
}

function ResultPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [answerCount, setAnswerCount] = useState(0);
  const [hasSentEnterWebhook, setHasSentEnterWebhook] = useState(false);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('assessmentAnswers');
    if (!savedAnswers) {
      navigate('/');
      return;
    }
    const answers = JSON.parse(savedAnswers);
    setAnswerCount(Array.isArray(answers) ? answers.length : 0);
    const calculatedResult = calculateResult(answers);
    setResult(calculatedResult);
  }, [navigate]);

  useEffect(() => {
    if (!result || hasSentEnterWebhook) {
      return;
    }

    sendWebhook('result_page_enter', {
      resultType: result.type,
      resultTitle: resultConfig[result.type]?.title || resultConfig.PINK_DAWN.title,
      answerCount
    });

    setHasSentEnterWebhook(true);
  }, [result, answerCount, hasSentEnterWebhook]);

  if (!result) return null;

  const config = resultConfig[result.type] || resultConfig.PINK_DAWN;
  return <ResultCard config={config} />;
}

export default ResultPage;
