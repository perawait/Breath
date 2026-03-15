import { useNavigate } from 'react-router-dom';

function FinalStoryPage() {
  const navigate = useNavigate();

  return (
    <div
      className="h-[100svh] overflow-hidden bg-cover bg-no-repeat bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: "url('/first_page.png')" }}
    >
      <div className="max-w-md w-full h-full flex flex-col justify-between text-center animate-fadeIn pt-4 pb-10">
        <div className="flex flex-col items-center gap-0 mt-6">
          <img src="/icon.png" alt="Breath icon" className="w-30 h-30" />

          <h1 className="text-white font-bold Prachhason neue m-0 -mt-3 leading-none" style={{ fontSize: '54px' }}>
            Breath
          </h1>
          <h2 className="text-white italic Prachhason neue font-light italic m-0 -mt-1" style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '0.04em' }}>
            "พักใจ"
          </h2>
          <p
            className="text-white/80 mt-8 prompt-font tracking-wide"
            style={{ fontSize: '17px', fontWeight: 300 }}
          >
            เมื่อพระอาทิตย์ยกตัวสูงเต็มท้องฟ้า
            <br />
            คุณเข้าใจแล้วว่า
          </p>
        </div>

          <div className="flex flex-col items-center gap-8 pb-4">
          <p
            className="text-white/90 leading-relaxed px-6 text-center italic prompt-font tracking-wide"
            style={{ fontSize: '15px', fontWeight: 300 }}
          >
            การพักใจไม่ใช่การหยุดเดินทาง
            <br />
            แต่คือการก้าวต่อไปอย่างเบาและมั่นคงกว่าเดิม
          </p>

          <button
            onClick={() => navigate('/result')}
            className="text-white/40 group mt-2"
            style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 700 }}
          >
            <span className="inline-flex flex-col items-center">
              <span>ดูผลลัพธ์ →</span>
              <span className="mt-1 h-px w-0 bg-white/60 transition-all duration-300 group-active:w-full" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinalStoryPage;

