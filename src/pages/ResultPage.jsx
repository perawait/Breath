import { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateResult } from '../utils/resultCalculator';
import { sendWebhook } from '../lib/webhook';

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;

const resultConfig = {
  PINK_DAWN: {
    bg: '/Pinkbg.png',
    title: 'PINK DAWN',
    subtitle: 'ผู้เยียวยาด้วยความอ่อนโยน',
    description: `คุณคือคนที่มีหัวใจอ่อนโยน\nและมักมอบความอบอุ่นให้คนรอบข้าง\nเหมือนสีชมพูของรุ่งอรุณ\nคุณเชื่อในพลังของความรัก ความเมตตา\nและการโอบกอดกันในวันที่เหนื่อยล้า`,
    strengths: ['การเข้าใจความรู้สึกของผู้อื่น', 'ความสามารถในการปลอบโยน'],
    needs: `ให้ความอ่อนโยนกับตัวเองด้วย\nไม่ใช่แค่กับคนอื่น`,
    message: `"การรักและดูแลตัวเอง\nคือของขวัญที่ดีที่สุดที่คุณให้โลกได้"`,
    buttonColor: 'text-pink-700',
    styles: {
      strengthsFontSize: '14px',
      strengthsMarginTop: 'mt-[142px]',
      strengthsWhitespace: 'wrap',
      needsFontSize: '14px',
      needsWhitespace: 'pre',
      needsLineHeight: 1.5,
      needsMaxWidth: 'auto',
      needsClasses: 'pr-12 -translate-x-8',
      needsHeadingClasses: '',
      needsHeadingTransform: 'translateX(-30px)',
      needsContentClasses: '',
      needsContentTransform: 'none',
      descriptionFontSize: '17px',
      descriptionWhitespace: 'pre-line'
    }
  },
  VIOLET_HORIZON: {
    bg: '/Violetbg.png',
    title: 'VIOLET HORIZON',
    subtitle: 'นักฝันผู้มองหาความหมายใหม่',
    description: `คุณคือคนที่ชอบค้นหาความหมายลึกซึ้งของชีวิต\nเหมือนสีม่วงอ่อนบนขอบฟ้า\nคุณอาจผ่านความมืดมา\nแต่คุณเลือกที่จะตีความมันใหม่\nและเปลี่ยนมันเป็นบทเรียนหรือแรงบันดาลใจ`,
    strengths: ['จินตนาการ', 'การสะท้อนตัวเอง', 'ความคิดสร้างสรรค์'],
    needs: `อย่าติดอยู่กับการค้นหาความหมาย\nจนลืมใช้ชีวิตในปัจจุบัน`,
    message: `“บางครั้งคำตอบไม่ได้อยู่ที่การค้นหา\nแต่อยู่ที่การได้ใช้หัวใจสัมผัสปัจจุบัน”`,
    buttonColor: 'text-purple-800',
    styles: {
      strengthsFontSize: '15px',
      strengthsMarginTop: 'mt-[130px]',
      strengthsWhitespace: 'wrap',
      needsFontSize: '15px',
      needsWhitespace: 'pre',
      needsLineHeight: 1.4,
      needsMaxWidth: 'auto',
      needsClasses: '-translate-x-[30px]', 
      needsHeadingClasses: '',
      needsContentClasses: '-translate-x-[70px]',
      needsContentTransform: 'translateX(-52px)', 
      descriptionFontSize: '14px',
      descriptionWhitespace: 'pre'
    }
  },
  BLUE_SKY: {
    bg: '/Bluebg.png',
    title: 'BLUE SKY',
    subtitle: 'ผู้หาความสงบในความเงียบ',
    description: `คุณคือคนที่มองหาความสงบ\nเหมือนท้องฟ้าที่โปร่งใส\nการพักใจของคุณคือ\nการกลับเข้าสู่ความเงียบและพื้นที่ส่วนตัว\nเพื่อให้ใจได้หายใจเต็มปอดอีกครั้ง`,
    strengths: ['การควบคุมอารมณ์ได้ดี', 'มองเห็นภาพกว้าง', 'คิดอย่างลึกซึ้ง'],
    needs: `อย่าลืมเปิดใจแบ่งปันบ้าง\nเพราะท้องฟ้าที่สวยงาม\nก็ต่อเมื่อมีคนได้เห็นร่วมกัน`,
    message: `“ความสงบในใจคุณ\n เป็นของขวัญที่หายาก\n จงใช้มันเป็นแรงนำทาง”`,
    buttonColor: 'text-blue-800',
    styles: {
      strengthsFontSize: '14px',
      strengthsMarginTop: 'mt-[142px]',
      strengthsWhitespace: 'first-item-nowrap',
      needsFontSize: '14px',
      needsWhitespace: 'pre',
      needsLineHeight: 1.5,
      needsMaxWidth: 'auto',
      needsClasses: 'pr-4',
      needsHeadingClasses: '',
      needsContentClasses: '',
      needsContentTransform: 'none',
      descriptionFontSize: '17px',
      descriptionWhitespace: 'pre-line'
    }
  },
  GOLDEN_SUN: {
    bg: '/Goldbg.png',
    title: 'GOLDEN SUN',
    subtitle: 'ผู้ให้พลังใจและความมั่นคง',
    description: `คุณคือคนที่เต็มไปด้วยพลังในการ\nสร้างความมั่นคงทั้งต่อตนเองและคนรอบข้าง\nเหมือนแสงแดดยามเช้าที่อบอุ่นและมั่นคงอยู่เสมอ\nไม่ว่าจะเจอพายุหรือเมฆหมอก\nคุณยังพยายามยืนหยัดและทำให้คนอื่นมั่นใจได้ว่า\n“พรุ่งนี้จะยังมีแสงสว่างเสมอ”`,
    strengths: ['ความพากเพียร', 'ความอดทน', 'เป็นเสาหลักให้คนอื่น'],
    needs: `อย่าลืมพักบ้าง\nเพราะแม้แต่ดวงอาทิตย์\nก็มีเวลาลับขอบฟ้า`,
    message: `“คุณไม่จำเป็น\nต้องแข็งแรงตลอดเวลา\nการพักใจก็เป็นพลังอีกแบบหนึ่ง”`,
    buttonColor: 'text-amber-800',
    styles: {
      strengthsFontSize: '15px',
      strengthsMarginTop: 'mt-[142px]',
      strengthsWhitespace: 'wrap',
      needsFontSize: '15px',
      needsWhitespace: 'pre',
      needsLineHeight: 1.4,
      needsMaxWidth: 'none',
      needsClasses: 'pr-4',
      needsHeadingClasses: 'whitespace-nowrap',
      // ขยับมาทางขวา 3 ระดับ (ลดค่าลบจาก -50px เหลือ -10px และจาก -30px เหลือ 0px)
      needsContentClasses: '-translate-x-[10px]', 
      needsContentTransform: 'translateX(0px)',
      descriptionFontSize: '14px',
      descriptionWhitespace: 'pre'
    }
  }
};

function ResultCard({ config }) {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.visualViewport?.height || window.innerHeight
  });

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.visualViewport?.height || window.innerHeight
      });
    };
    window.addEventListener('resize', updateViewport);
    window.visualViewport?.addEventListener('resize', updateViewport);
    return () => {
      window.removeEventListener('resize', updateViewport);
      window.visualViewport?.removeEventListener('resize', updateViewport);
    };
  }, []);

  const scale = useMemo(() => 
    Math.min(viewport.width / DESIGN_WIDTH, viewport.height / DESIGN_HEIGHT)
  , [viewport.width, viewport.height]);

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
        <img src={config.bg} alt="" className="w-full h-full object-cover block" />
        <div className="absolute inset-0 flex flex-col p-4 z-10">
          <div className="max-w-sm w-full mx-auto flex flex-col flex-1 text-center text-white animate-fadeIn pt-5 pb-4">
            
            <div className="flex flex-col items-center gap-1 mt-3">
              <div className="flex flex-row items-center gap-6">
                <img src="/icon.png" alt="Breath icon" className="w-20 h-25" />
                <div className="flex flex-col items-center">
                  <h1 className="text-white font-extrabold breath-font" style={{ fontSize: '42px', fontWeight: 900, WebkitTextStroke: '0.6px rgba(255,255,255,0.9)' }}>
                    <span className="mt-3 block">Breath</span>
                  </h1>
                  <h2 className="text-white font-light italic -ml-2 -mt-2" style={{ fontSize: '14px', opacity: 0.85 }}>" พักใจ "</h2>
                </div>
              </div>
            </div>

            <div className="px-6 mt-5 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div>
                  <p className="result-heading-font font-bold tracking-wide" style={{ fontSize: '28px' }}>{config.title}</p>
                  <p className="result-heading-font font-extrabold mt-1" style={{ fontSize: '16px', fontWeight: 900 }}>{config.subtitle}</p>
                </div>
                <div className="text-left space-y-2 text-white/90" style={{ fontSize: '14px' }}>
                  <p
                    className="text-center prompt-font mt-2 text-white/80 font-light"
                    style={{
                      whiteSpace: config.styles.descriptionWhitespace,
                      fontWeight: 300,
                      fontSize: config.styles.descriptionFontSize,
                      letterSpacing: config.styles.descriptionWhitespace === 'pre' ? '0em' : '0.02em'
                    }}
                  >
                    {config.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-row gap-4 prompt-font mt-7">
                <div className={`flex-1 text-left ${config.styles.strengthsMarginTop}`}>
                  <p className="font-bold" style={{ fontSize: '18px' }}>จุดแข็ง</p>
                  <ul className="list-disc list-inside text-white/90 font-light" style={{ fontSize: config.styles.strengthsFontSize, fontWeight: 300 }}>
                    {config.strengths.map((s, i) => (
                      <li key={i} className={config.styles.strengthsWhitespace === 'first-item-nowrap' && i === 0 ? 'whitespace-nowrap' : config.styles.strengthsWhitespace === 'wrap' ? 'whitespace-nowrap' : ''}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  <div className={`text-right mt-[207px] ${config.styles.needsClasses || ''}`}>
                    <p className={`font-bold ${config.styles.needsHeadingClasses || ''}`} style={{ fontSize: '18px', transform: config.styles.needsHeadingTransform || 'none' }}>
                      สิ่งที่ใจคุณต้องการ
                    </p>
                    <p
                      className={`text-white/90 font-light ${config.styles.needsContentClasses || ''}`}
                      style={{
                        fontSize: config.styles.needsFontSize,
                        whiteSpace: config.styles.needsWhitespace,
                        fontWeight: 300,
                        lineHeight: config.styles.needsLineHeight,
                        maxWidth: config.styles.needsMaxWidth,
                        transform: config.styles.needsContentTransform || 'none'
                      }}
                    >
                      {config.needs}
                    </p>
                  </div>
                </div>
              </div>

              <div className="prompt-font text-left space-y-1 w-full -mt-2 -translate-y-6 self-start">
                <p className="font-bold" style={{ fontSize: '18px' }}>ข้อความถึงคุณ</p>
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
  const hasSentWebhook = useRef(false);

  useEffect(() => {
    try {
      const savedAnswers = localStorage.getItem('assessmentAnswers');
      if (!savedAnswers) return navigate('/', { replace: true });
      
      const answers = JSON.parse(savedAnswers);
      setAnswerCount(answers.length);
      const calculated = calculateResult(answers);
      
      if (!calculated || !resultConfig[calculated.type]) {
        setResult({ type: 'PINK_DAWN' }); 
      } else {
        setResult(calculated);
      }
    } catch (e) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (result && !hasSentWebhook.current) {
      const config = resultConfig[result.type] || resultConfig.PINK_DAWN;
      sendWebhook('result_page_enter', {
        resultType: result.type,
        resultTitle: config.title,
        answerCount
      });
      hasSentWebhook.current = true;
    }
  }, [result, answerCount]);

  if (!result) return null;
  return <ResultCard config={resultConfig[result.type] || resultConfig.PINK_DAWN} />;
}

export default ResultPage;