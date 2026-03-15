import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-[100svh] bg-no-repeat bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: "url('/first_page.png')" }}
    >
      <div className="max-w-md w-full min-h-[80vh] flex flex-col justify-between text-center animate-fadeIn pt-4 pb-10">
        <div className="flex flex-col items-center gap-0 mt-6">
          <img src="/icon.png" alt="Breath icon" className="w-30 h-30" />

          <h1 className="text-white font-bold Prachhason neue" style={{ fontSize: '54px' }}>
            Breath
          </h1>
          <h2 className="text-white italic Prachhason neue font-light italic" style={{ fontSize: '20px', fontWeight: 500, letterSpacing: '0.04em' }}>
            "พักใจ"
          </h2>
        </div>

        <div className="flex flex-col items-center gap-8 pb-4 mt-80">
          <p className="text-white/90 leading-relaxed px-6 text-center Prompt italic tracking-wide" style={{ fontSize: '16px', fontWeight: 200 }}>
            แสงเช้าจะกลับมาเสมอ<br />
            แม้คืนนี้จะยาวนานแค่ไหน
          </p>

          <button
            onClick={() => navigate('/story')}
            classname="text-white/40 group"
            style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 300 }}
          >
            <span className="inline-flex flex-col items-center">
              <span>ออกเดินทางสู่แสงแรก →</span>
              <span className="mt-1 h-px w-0 bg-white/60 transition-all duration-300 group-active:w-full" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
