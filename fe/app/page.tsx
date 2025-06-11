import Link from "next/link";

export default function Home() {
  return (
    <section className="relative w-full min-h-[500px] bg-[#B2DDED] overflow-hidden pb-16">
      {/* Decorative dots left */}
      <div className="absolute top-10 left-10 grid grid-cols-4 gap-2 opacity-30">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 bg-white rounded-full inline-block"
            style={{ margin: 2 }}
          />
        ))}
      </div>
      {/* Decorative dots right */}
      <div className="absolute top-16 right-10 grid grid-cols-4 gap-2 opacity-30">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 border-2 border-white rounded-full inline-block"
            style={{ margin: 2 }}
          />
        ))}
      </div>
      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between pt-16">
        {/* Text */}
        <div className="flex-1 px-6 md:px-0">
          <h2 className="text-3xl md:text-4xl font-light text-[#1a3365] mb-4">
            Vì <span className="font-bold text-[#23408e]">sức khỏe </span> trọn
            vẹn – Vì{" "}
            <span className="font-bold text-[#23408e]">cuộc sống tốt đẹp</span>{" "}
            hơn.
          </h2>
          <p className="text-[#1B71A1] text-base mb-7 max-w-md">
            Dịch vụ y tế 24/7 – linh hoạt trực tuyến lẫn trực tiếp. Đội ngũ bác
            sĩ chuyên khoa tận tâm luôn sẵn sàng chăm sóc bạn đúng lúc, đúng
            cách – ở bất cứ đâu, bất cứ khi nào.
          </p>
          <Link href="/lichhen">
            <button className="px-6 py-2 rounded-full bg-[#23408e] text-white font-semibold shadow-md transition-colors duration-200 hover:bg-[#2176ae] text-[15px]">
              Đặt lịch hẹn
            </button>
          </Link>
        </div>
        {/* Image */}
        <div className="flex-1 flex justify-center items-center mt-10 md:mt-0">
          <div className="relative">
            <div className="absolute -inset-2 bg-white rounded-full opacity-60 blur-lg"></div>
            <img
              src="https://images.stockcake.com/public/b/7/c/b7cef295-9510-4a83-8677-6bb07049d78e_large/medical-team-smiling-stockcake.jpg"
              alt="Clinic Team"
              width={320}
              height={320}
              className="relative rounded-full w-[320px] h-[320px] object-cover border-4 border-white shadow-xl"
            />
          </div>
        </div>
      </div>
      {/* Curved white bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        height="120"
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ minWidth: "100%" }}
      >
        <path d="M0 0C360 120 1080 0 1440 120V120H0V0Z" fill="#fff" />
      </svg>

      {/* About Us */}
      <div className="relative z-20 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between pt-16 pb-16 rounded-3xl bg-white shadow-lg overflow-hidden my-10">
        {/* Decorative dots left */}
        <div className="absolute left-0 top-0 h-full w-16 flex flex-col items-center justify-center opacity-20 z-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="w-2 h-2 bg-[#b2dded] rounded-full mb-3" />
          ))}
        </div>
        {/* Image bên trái */}
        <div className="flex-1 flex justify-center items-center mb-8 md:mb-0 z-10">
          <div className="relative">
            <img
              src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg"
              alt="About Us"
              width={340}
              height={340}
              className="rounded-3xl w-[340px] h-[340px] object-cover shadow-xl"
              style={{
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                background: "rgba(255,255,255,0.7)",
              }}
            />
          </div>
        </div>
        {/* Text bên phải */}
        <div className="flex-1 px-6 md:px-0 z-10">
          <h2 className="text-2xl md:text-3xl font-light text-[#1a3365] mb-4">
            <span className="font-bold text-[#23408e]">Về chúng tôi</span>
          </h2>
          <p className="text-[#1B71A1] text-base mb-7 max-w-md">
            Chúng tôi là đội ngũ y bác sĩ giàu kinh nghiệm, tận tâm với sứ mệnh
            mang lại dịch vụ chăm sóc sức khỏe chất lượng cao cho cộng đồng.
            Luôn đặt bệnh nhân làm trung tâm, chúng tôi không ngừng đổi mới để
            phục vụ tốt nhất cho mọi người.
          </p>
        </div>
        {/* Decorative dots right */}
        <div className="absolute right-0 top-0 h-full w-16 flex flex-col items-center justify-center opacity-20 z-0">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="w-2 h-2 bg-[#b2dded] rounded-full mb-3" />
          ))}
        </div>
      </div>

      {/* Our Services */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-between pt-16 pb-16 rounded-3xl bg-white shadow-lg overflow-hidden my-10">
        {/* Vết loang xanh (blobs) */}
        <div className="absolute -top-20 -left-32 w-96 h-96 bg-[#b2dded] opacity-30 rounded-full blur-3xl z-0"></div>
        <div className="absolute -bottom-24 -right-32 w-96 h-96 bg-[#eaf6fb] opacity-40 rounded-full blur-3xl z-0"></div>
        {/* Chấm bi trang trí */}
        <div className="absolute top-8 left-8 grid grid-cols-4 gap-2 opacity-20 z-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="w-2 h-2 bg-[#b2dded] rounded-full inline-block"
            />
          ))}
        </div>
        <div className="absolute bottom-8 right-8 grid grid-cols-4 gap-2 opacity-20 z-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="w-2 h-2 bg-[#eaf6fb] rounded-full inline-block"
            />
          ))}
        </div>
        {/* Tiêu đề dịch vụ */}
        <h2 className="text-2xl md:text-3xl font-light text-[#1a3365] mb-10 text-center z-10">
          <span className="font-bold text-[#23408e]">
            Dịch vụ của chúng tôi
          </span>
        </h2>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 z-10 px-4 md:px-8">
          {/* Service list bên trái */}
          <div className="flex-1 flex flex-col gap-10">
            <div className="flex items-start gap-4">
              <div className="bg-[#eaf6fb] rounded-full p-5 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#2176ae]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#23408e] mb-1">
                  Khám tổng quát
                </h3>
                <p className="text-[#1B71A1] text-base">
                  Kiểm tra sức khỏe toàn diện, phát hiện sớm các vấn đề tiềm ẩn.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#eaf6fb] rounded-full p-5 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#2176ae]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#23408e] mb-1">
                  Tư vấn trực tuyến
                </h3>
                <p className="text-[#1B71A1] text-base">
                  Kết nối với bác sĩ mọi lúc, mọi nơi qua nền tảng trực tuyến.
                </p>
              </div>
            </div>
          </div>
          {/* Hình ở giữa */}
          <div className="flex-1 flex justify-center items-center my-10 md:my-0">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="260" height="260">
                  <circle
                    cx="130"
                    cy="130"
                    r="120"
                    fill="none"
                    stroke="#bfe6fa"
                    strokeWidth="2"
                    strokeDasharray="6 18"
                  />
                </svg>
              </div>
              <img
                src="https://img.freepik.com/free-vector/doctor-explaining-something-patient_1308-53197.jpg"
                alt="Our Services"
                width={180}
                height={180}
                className="relative rounded-full w-[180px] h-[180px] object-cover border-4 border-white shadow-xl bg-white"
              />
            </div>
          </div>
          {/* Service list bên phải */}
          <div className="flex-1 flex flex-col gap-10">
            <div className="flex items-start gap-4">
              <div className="bg-[#eaf6fb] rounded-full p-5 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#2176ae]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#23408e] mb-1">
                  Xét nghiệm tại nhà
                </h3>
                <p className="text-[#1B71A1] text-base">
                  Dịch vụ lấy mẫu xét nghiệm tận nơi, tiện lợi và an toàn.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#eaf6fb] rounded-full p-5 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#2176ae]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 8v4l3 3" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#23408e] mb-1">
                  Chăm sóc dài hạn
                </h3>
                <p className="text-[#1B71A1] text-base">
                  Theo dõi, hỗ trợ sức khỏe lâu dài cho bệnh nhân và gia đình.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
