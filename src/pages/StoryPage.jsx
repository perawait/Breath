import { useNavigate } from 'react-router-dom';

function StoryPage() {
  const navigate = useNavigate();

  return (
    <div
      className="h-[100svh] overflow-hidden bg-cover bg-no-repeat bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: "url('/bgst_1.png')" }}
    >
      <div className="max-w-md w-full h-full flex flex-col justify-between text-center text-white animate-fadeIn-slow pb-8">
        <div className="mt-12 px-6 space-y-0">
          <p
            className="leading-relaxed font-extralight"
            style={{ fontSize: '17px', fontFamily: 'Prompt', fontWeight: 200 }}
          >
            คุณยืนอยู่ท่ามกลางความมืด<br />
            ความเงียบรายล้อม<br /> เหมือนหัวใจยังหนักอึ้ง<br />
            แต่เส้นขอบฟ้าเริ่มเผยแสงแรกจาง ๆ
          </p>
        </div>

        <div className="mb-0 px-6 space-y-6">
          <p className="text-white/90 italic font-extralight" style={{ fontSize: '17px', fontFamily: 'Prompt', fontWeight: 200 }}>
            คุณพร้อมที่จะก้าวสู่การเดินทาง<br />
            ครั้งนี้หรือยัง?
          </p>

          <button
            onClick={() => {
              localStorage.removeItem('tempAssessmentAnswers');
              localStorage.removeItem('currentQuestionIndex');
              localStorage.removeItem('assessmentAnswers');
              navigate('/questions');
            }}
            className="inline-flex items-center justify-center rounded-full px-8 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.45)] bg-[#C39753] border border-[#A67A5F] text-white/80 hover:brightness-110 transition-all duration-300"
            style={{ fontSize: '13px', fontWeight: 700, textShadow: '0 2px 6px rgba(0, 0, 0, 0.45)' }}
          >
            เริ่มต้นการเดินทาง
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoryPage;

