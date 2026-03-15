import { useNavigate } from 'react-router-dom';
import { Heart, Phone, MessageCircle, Users, BookOpen, Home } from 'lucide-react';

function CarePage() {
  const navigate = useNavigate();

  const resources = [
    {
      icon: Phone,
      title: 'สายด่วนสุขภาพจิต',
      description: 'กรมสุขภาพจิต กรุงเทพฯ',
      contact: '1323',
      color: 'from-pink-500 to-rose-400'
    },
    {
      icon: MessageCircle,
      title: 'ปรึกษาปัญหาออนไลน์',
      description: 'Thai Mental Health',
      contact: 'www.thaimental.com',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Users,
      title: 'กลุ่มสนับสนุน',
      description: 'ห้องปรึกษาปัญหา มหาวิทยาลัย',
      contact: 'ติดต่อสถาบันของคุณ',
      color: 'from-purple-500 to-indigo-400'
    },
    {
      icon: BookOpen,
      title: 'แหล่งความรู้',
      description: 'บทความและคู่มือการดูแลตนเอง',
      contact: 'www.dmh.go.th',
      color: 'from-amber-500 to-orange-400'
    }
  ];

  const selfCareTips = [
    {
      title: 'ดูแลร่างกาย',
      tips: [
        'นอนหลับให้เพียงพอ 7-9 ชั่วโมงต่อวัน',
        'ออกกำลังกายสม่ำเสมออย่างน้อยสัปดาห์ละ 3 ครั้ง',
        'รับประทานอาหารที่มีประโยชน์และครบ 5 หมู่',
        'ดื่มน้ำให้เพียงพอ'
      ]
    },
    {
      title: 'ดูแลจิตใจ',
      tips: [
        'ฝึกสติและการทำสมาธิ',
        'เขียนบันทึกความรู้สึกและความคิด',
        'ทำกิจกรรมที่ชอบและผ่อนคลาย',
        'หลีกเลี่ยงการเปรียบเทียบตนเองกับผู้อื่น'
      ]
    },
    {
      title: 'จัดการเวลา',
      tips: [
        'ตั้งเป้าหมายที่ชัดเจนและทำได้จริง',
        'แบ่งงานใหญ่เป็นงานเล็กๆ',
        'จัดลำดับความสำคัญของงาน',
        'ให้เวลาพักผ่อนระหว่างทำงาน'
      ]
    },
    {
      title: 'สร้างความสัมพันธ์',
      tips: [
        'ใช้เวลากับคนที่รักและเข้าใจคุณ',
        'แบ่งปันความรู้สึกกับคนใกล้ชิด',
        'เข้าร่วมกิจกรรมกลุ่มหรือชุมชน',
        'ขอความช่วยเหลือเมื่อจำเป็น'
      ]
    }
  ];

  return (
    <div className="min-h-[100svh] bg-gradient-to-br from-purple-900 via-purple-700 to-orange-400 p-4 overflow-y-auto">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8 animate-fadeIn">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <h1 className="text-white font-bold mb-2" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)' }}>
            การดูแลและคำแนะนำ
          </h1>
          <p className="text-white/90" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
            แหล่งข้อมูลและคำแนะนำสำหรับการดูแลสุขภาพจิต
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 mb-6">
          <h2 className="text-white font-bold mb-6" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
            ช่องทางขอความช่วยเหลือ
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 rounded-2xl p-5 hover:bg-white/15 transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-1" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>
                    {resource.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-2">
                    {resource.description}
                  </p>
                  <p className="text-white font-medium" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                    {resource.contact}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 mb-6">
          <h2 className="text-white font-bold mb-6" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
            แนวทางการดูแลตนเอง
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {selfCareTips.map((category, index) => (
              <div key={index} className="bg-white/5 rounded-2xl p-5">
                <h3 className="text-white font-semibold mb-4" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-white/70 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-white/80 text-sm leading-relaxed">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 mb-6">
          <h2 className="text-white font-bold mb-4" style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}>
            เมื่อไหร่ควรพบผู้เชี่ยวชาญ
          </h2>
          <div className="space-y-3">
            <p className="text-white/90" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
              คุณควรพิจารณาปรึกษานักจิตวิทยาหรือจิตแพทย์ หากคุณมีอาการดังต่อไปนี้:
            </p>
            <ul className="space-y-2">
              {[
                'รู้สึกเศร้า หดหู่ หรือว้าเหว่เป็นเวลานานกว่า 2 สัปดาห์',
                'มีความคิดทำร้ายตนเองหรือผู้อื่น',
                'ไม่สามารถทำกิจวัตรประจำวันได้ตามปกติ',
                'มีอาการวิตกกังวลหรือตื่นตระหนกรุนแรง',
                'มีปัญหาการนอนหรือการรับประทานอาหารอย่างต่อเนื่อง'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                  <span className="text-white/80" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/result')}
            className="flex-1 bg-white/10 backdrop-blur text-white px-6 py-4 rounded-full font-medium hover:bg-white/20 transition-all duration-300"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
          >
            ดูผลประเมินอีกครั้ง
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('assessmentAnswers');
              navigate('/');
            }}
            className="flex-1 bg-white text-purple-900 px-6 py-4 rounded-full font-medium shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
          >
            <Home className="w-5 h-5" />
            กลับหน้าหลัก
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            © 2025 Breath - Academic Burnout Assessment
          </p>
        </div>
      </div>
    </div>
  );
}

export default CarePage;
