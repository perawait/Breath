import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle } from 'lucide-react';

function ConsentPage() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleStart = () => {
    if (agreed) {
      navigate('/questions');
    }
  };

  return (
    <div className="min-h-[100svh] bg-gradient-to-br from-purple-900 via-purple-700 to-orange-400 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl animate-fadeIn">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <h2 className="text-white text-center font-bold mb-6" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
          ข้อตกลงและความเป็นส่วนตัว
        </h2>

        <div className="bg-white/5 rounded-2xl p-6 mb-6 max-h-[50vh] overflow-y-auto">
          <div className="text-white/90 space-y-4" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
            <p className="leading-relaxed">
              แบบประเมินนี้ออกแบบมาเพื่อช่วยให้คุณเข้าใจสถานะสุขภาพจิตของตนเองเกี่ยวกับภาวะหมดไฟทางการเรียน
              ผลลัพธ์จะช่วยให้คุณได้รับคำแนะนำเบื้องต้นในการดูแลตนเอง
            </p>

            <div className="space-y-3">
              <p className="font-semibold text-white">ข้อควรทราบ:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>แบบประเมินนี้ไม่ใช่การวินิจฉัยทางการแพทย์</li>
                <li>ข้อมูลของคุณจะถูกเก็บไว้ในเครื่องของคุณเท่านั้น</li>
                <li>เราไม่เก็บข้อมูลส่วนบุคคลใดๆ ของคุณ</li>
                <li>คุณสามารถหยุดทำแบบประเมินได้ตลอดเวลา</li>
                <li>หากคุณมีอาการรุนแรง กรุณาปรึกษาผู้เชี่ยวชาญ</li>
              </ul>
            </div>

            <p className="leading-relaxed text-white/80 text-sm pt-4">
              การทำแบบประเมินนี้แสดงว่าคุณยอมรับข้อตกลงและเข้าใจวัตถุประสงค์ของแบบประเมิน
              กรุณาตอบคำถามด้วยความซื่อสัตย์เพื่อผลลัพธ์ที่แม่นยำที่สุด
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex-shrink-0 mt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                agreed
                  ? 'bg-white border-white'
                  : 'bg-white/10 border-white/30 group-hover:border-white/50'
              }`}>
                {agreed && <CheckCircle className="w-4 h-4 text-purple-600" />}
              </div>
            </div>
            <span className="text-white/90" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
              ฉันได้อ่านและเข้าใจข้อตกลง พร้อมทำแบบประเมินด้วยความสมัครใจ
            </span>
          </label>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-white/10 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all duration-300"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
          >
            ย้อนกลับ
          </button>
          <button
            onClick={handleStart}
            disabled={!agreed}
            className={`flex-1 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              agreed
                ? 'bg-white text-purple-900 hover:shadow-xl hover:scale-105'
                : 'bg-white/20 text-white/50 cursor-not-allowed'
            }`}
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
          >
            เริ่มต้น
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConsentPage;
