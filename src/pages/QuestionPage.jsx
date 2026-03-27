import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { questions, scaleOptions } from '../data/questions';

function QuestionPage() {
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];
  const useSpecialLayout = true;

  const questionScaleOptions = {
    2: [
      { value: 1, label: 'พายุฝนที่โหมแรง' },
      { value: 2, label: 'หมอกหนาทึบที่บดบังทาง' },
      { value: 3, label: 'ความร้อนอบอ้าวที่หายใจไม่ออก' },
      { value: 4, label: 'กลางคืนที่ยาวนานไร้แสง' }
    ],
    3: [
      { value: 1, label: 'การทำงานหนักโดยไร้คนเห็นคุณค่า' },
      { value: 2, label: 'การไม่สามารถบอกความรู้สึกจริง ๆ ได้' },
      { value: 3, label: 'ความเข้าใจผิดจากคนรอบข้าง' },
      { value: 4, label: 'ความรู้สึกว่าต้องเข้มแข็งตลอดเวลา' }
    ],
    4: [
      { value: 1, label: 'การได้เริ่มต้นอีกครั้ง' },
      { value: 2, label: 'ความสงบ' },
      { value: 3, label: 'การปล่อยวางสิ่งเก่า' },
      { value: 4, label: 'ความหวังใหม่' }
    ],
    5: [
      { value: 1, label: 'ระเบียงบ้านพร้อมแสงแดดอุ่น' },
      { value: 2, label: 'ป่าที่นกเริ่มส่งเสียง' },
      { value: 3, label: 'ชายหาดที่คลื่นกระทบเบา ๆ' },
      { value: 4, label: 'ยอดเขาสูงเห็นพระอาทิตย์ขึ้น' }
    ],
    6: [
      { value: 1, label: 'ความสงบ' },
      { value: 2, label: 'ความมั่นใจ' },
      { value: 3, label: 'ความอ่อนโยน' },
      { value: 4, label: 'ความเข้มแข็ง' }
    ],
    7: [
      { value: 3, label: 'ใช้เวลาอยู่กับครอบครัว/เพื่อน' },
      { value: 4, label: 'เขียน/วาดเพื่อถ่ายทอดความรู้สึก' },
      { value: 1, label: 'เดินทางไปในที่ใหม่ ๆ' },
      { value: 2, label: 'หยุดนิ่งและอยู่กับความเงียบ' }
    ],
    8: [
      { value: 1, label: 'ทองอ่อน' },
      { value: 3, label: 'ชมพูส้ม' },
      { value: 2, label: 'ฟ้าอ่อน' },
      { value: 4, label: 'ม่วงอ่อน' }
    ],
    9: [
      { value: 3, label: '“เธอทำดีที่สุดแล้ว”' },
      { value: 1, label: '“ขอบคุณที่ยังไม่ยอมแพ้”' },
      { value: 4, label: '“อนาคตยังรออยู่”' },
      { value: 2, label: '“อย่าลืมยิ้มให้กับวันนี้”' }
    ],
    10: [
      { value: 3, label: 'จะไม่ละเลยหัวใจตัวเองอีก' },
      { value: 2, label: 'จะให้โอกาสตัวเองได้พัก' },
      { value: 1, label: 'จะไม่เปรียบเทียบตัวเองกับใคร' },
      { value: 4, label: 'จะเริ่มต้นใหม่ด้วยความกล้า' }
    ],
    11: [
      { value: 1, label: 'สิ่งที่ฉันพยายามอย่างหนัก' },
      { value: 2, label: 'ความรู้สึกที่ฉันมักซ่อนเอาไว้' },
      { value: 3, label: 'มุมสงบที่ฉันลืมไปนาน' },
      { value: 4, label: 'ความฝันที่ฉันยังไม่กล้าก้าวเข้าไปหา' }
    ]
  };

  const activeScaleOptions =
    questionScaleOptions[currentQuestion.id] || scaleOptions.slice(0, 4);

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    const savedAnswers = localStorage.getItem('tempAssessmentAnswers');
    const savedIndex = localStorage.getItem('currentQuestionIndex');

    if (savedAnswers && savedIndex) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        const parsedIndex = parseInt(savedIndex, 10);

        if (
          Array.isArray(parsedAnswers) &&
          !Number.isNaN(parsedIndex) &&
          parsedIndex >= 0 &&
          parsedIndex < questions.length
        ) {
          setAnswers(parsedAnswers);
          setCurrentQuestionIndex(parsedIndex);
        }
      } catch {}
    }
  }, []);

  const handleAnswer = (value) => {
    setSelectedValue(value);

    setTimeout(() => {
      const newAnswer = {
        questionId: currentQuestion.id,
        dimension: currentQuestion.dimension,
        value
      };

      const newAnswers = [...answers, newAnswer];
      setAnswers(newAnswers);

      const nextIndex = currentQuestionIndex + 1;
      const isLastQuestion = currentQuestionIndex >= questions.length - 1;

      localStorage.setItem('tempAssessmentAnswers', JSON.stringify(newAnswers));

      if (currentQuestion.id === 2 && !isLastQuestion) {
        localStorage.setItem('currentQuestionIndex', nextIndex);
        navigate('/story-burnout');
        return;
      }

      if (currentQuestion.id === 4 && !isLastQuestion) {
        localStorage.setItem('currentQuestionIndex', nextIndex);
        navigate('/story-sunrise');
        return;
      }

      if (currentQuestion.id === 6 && !isLastQuestion) {
        localStorage.setItem('currentQuestionIndex', nextIndex);
        navigate('/story-reflect');
        return;
      }

      if (currentQuestion.id === 8 && !isLastQuestion) {
        localStorage.setItem('currentQuestionIndex', nextIndex);
        navigate('/story-new-day');
        return;
      }

      if (!isLastQuestion) {
        setCurrentQuestionIndex(nextIndex);
        setSelectedValue(null);
        localStorage.setItem('currentQuestionIndex', nextIndex);
      } else {
        localStorage.setItem('assessmentAnswers', JSON.stringify(newAnswers));
        localStorage.removeItem('tempAssessmentAnswers');
        localStorage.removeItem('currentQuestionIndex');
        navigate('/story-final');
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedValue(null);
    } else {
      navigate('/story');
    }
  };

  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden flex flex-col p-4 bg-no-repeat bg-center"
      style={{ 
        backgroundImage: "url('/bgqs_1.png')",
        backgroundSize: '100% 100%',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="sunset-ambient" />

      <div className="relative z-10 w-full max-w-2xl mx-auto flex-1 flex flex-col py-6">
        <div className="mb-2">
          <div className="w-10/12 max-w-xs mx-auto flex items-center mb-2">
            <button
              onClick={handleBack}
              className="text-white/80 hover:text-white transition-colors p-2 -ml-2"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
        </div>

        {useSpecialLayout ? (
          <div className="flex-1 flex flex-col justify-between">
            <div className="-mt-4 px-6 animate-fadeIn">
              <p
                className="text-black text-center leading-relaxed font-Prompt max-w-sm mx-auto"
                style={{ fontSize: '18px', fontFamily: 'Prompt', whiteSpace: 'pre-line' }}
              >
                {currentQuestion.id === 1 ? (
                  <strong className="font-normal">
                    เมื่อทุกอย่างถาโถม
                    <br />
                    จนคุณรู้สึกหมดแรง คุณจะ ...
                  </strong>
                ) : (
                  currentQuestion.text
                )}
              </p>
            </div>

            <div key={currentQuestion.id} className="pb-10 space-y-3 w-10/12 max-w-xs mx-auto">
              {activeScaleOptions.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`answer-reveal block w-[277px] h-[47px] max-w-full mx-auto rounded-xl px-4 text-white shadow-[0_6px_16px_rgba(0,0,0,0.22)] bg-[#C39753] border border-[#A67A5F] transition-[opacity,transform,filter] duration-220 ease-out hover:brightness-105 hover:-translate-y-0.5 ${
                    selectedValue === option.value
                      ? 'brightness-110 scale-[1.01]'
                      : selectedValue !== null
                        ? 'opacity-70'
                      : ''
                  }`}
                  style={{
                    fontSize: 'clamp(0.95rem, 2.1vw, 1.1rem)',
                    fontFamily: 'Prompt',
                    fontWeight: 300,
                    animationDelay: `${index * 60}ms`
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 mb-6 animate-fadeIn">
                <p
                  className="text-white text-center leading-relaxed max-w-sm mx-auto"
                  style={{ fontSize: '16px' }}
                >
                  {currentQuestion.text}
                </p>
              </div>

              <div key={currentQuestion.id} className="space-y-3 w-10/12 max-w-xs mx-auto">
                {activeScaleOptions.map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`answer-reveal block w-[277px] h-[47px] max-w-full mx-auto rounded-xl px-4 text-white shadow-[0_6px_16px_rgba(0,0,0,0.22)] bg-[#C39753] border border-[#A67A5F] transition-[opacity,transform,filter] duration-220 ease-out hover:brightness-105 hover:-translate-y-0.5 ${
                      selectedValue === option.value
                        ? 'brightness-110 scale-[1.01]'
                        : selectedValue !== null
                          ? 'opacity-70'
                          : ''
                    }`}
                    style={{
                      fontSize: 'clamp(0.95rem, 2.1vw, 1.1rem)',
                      fontFamily: 'Prompt',
                      fontWeight: 300,
                      animationDelay: `${index * 60}ms`
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 space-y-3 w-10/12 max-w-xs mx-auto">
          <div className="bg-white/5 rounded-full h-2.5 overflow-hidden backdrop-blur-md">
            <div
              className="bg-white/25 h-full transition-[width] duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;