import { useNavigate } from 'react-router-dom';

function SunriseStoryPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-[100svh] bg-no-repeat bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: "url('/bgst_1.png')" }}
    >
      <div className="max-w-md w-full min-h-[80vh] flex flex-col justify-between text-center text-white animate-fadeIn-slow pb-14">
        <div className="mt-12 px-6 space-y-0">
          <p
            className="leading-relaxed font-extralight"
            style={{ fontSize: '17px', fontFamily: 'Prompt', fontWeight: 200 }}
          >
            ความอบอุ่นเริ่มแตะไหล่
            <br />
            ราวกับพระอาทิตย์ส่งของขวัญเล็ก ๆ มาให้
          </p>
        </div>

        <div className="mb-0 px-6 space-y-6 mt-auto translate-y-7">
          <p
            className="text-white/90 italic font-extralight"
            style={{ fontSize: '17px', fontFamily: 'Prompt', fontWeight: 200 }}
          >
            เป็นสิ่งที่คุณเฝ้ารอ
            <br />
            เพื่อปลอบประโลมใจตัวเอง
          </p>

          <button
            onClick={() => navigate('/questions')}
            className="inline-flex items-center justify-center rounded-full px-8 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.45)] bg-[#C39753] border border-[#A67A5F] text-white/80 hover:brightness-110 transition-all duration-300"
             style={{ fontSize: '13px', fontWeight: 700, textShadow: '0 2px 6px rgba(0, 0, 0, 0.45)' }}
          >
            ต่อไป
          </button>
        </div>
      </div>
    </div>
  );
}

export default SunriseStoryPage;

