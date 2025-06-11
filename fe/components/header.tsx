import { cookies } from "next/headers";
import Link from "next/link";
import Menu from "./menu";
import GlobalFadeInUpStyle from "./global-fade in-up";

// Nút menu không icon, font nhỏ, chỉ có chữ, hover nổi lên
function HeaderLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-2 py-1 font-medium text-[#283779] bg-transparent border-none text-[15px] transition-all duration-150 hover:-translate-y-0.5 hover:font-semibold hover:text-[#1a3365]"
      style={{ borderRadius: 0, boxShadow: "none" }}
    >
      {label}
    </Link>
  );
}

function PatientMenu() {
  return (
    <div className="flex items-center gap-2">
      <HeaderLink href="/lichhen" label="Đặt lịch hẹn" />
      <HeaderLink href="/insurance" label="Bảo hiểm" />
      <HeaderLink href="/pharmacy" label="Nhà thuốc" />
      {/* <HeaderLink href="/payment" label="Thanh toán" />
      <HeaderLink href="/notifications" label="Thông báo" /> */}
      <HeaderLink href="/chatbot" label="Chatbot" />
      <Menu />
    </div>
  );
}

function DoctorMenu() {
  return (
    <div className="flex items-center gap-2">
      <HeaderLink href="/doctor/appointments" label="QL lịch hẹn" />
      <HeaderLink href="/doctor/patients" label="Bệnh nhân" />
      <HeaderLink href="/doctor/laboratory" label="Yêu cầu XN" />
      <HeaderLink href="/doctor/profile" label="Hồ sơ" />
      <Menu />
    </div>
  );
}

function PharmacistMenu() {
  return (
    <div className="flex items-center gap-2">
      <HeaderLink href="/pharamacist/medicines" label="QL thuốc" />
      <Menu />
    </div>
  );
}

function InsuranceMenu() {
  return (
    <div className="flex items-center gap-2">
      <HeaderLink href="/insurance_management" label="QL bảo hiểm" />
      <Menu />
    </div>
  );
}

function AdminMenu() {
  return (
    <div className="flex items-center gap-2">
      <HeaderLink href="/admin" label="QL người dùng" />
      <Menu />
    </div>
  );
}

function LabTechnicianMenu() {
  return (
    <div className="flex items-center gap-2">
      <HeaderLink href="/lab_technician/laboratory" label="QL xét nghiệm" />
      <Menu />
    </div>
  );
}

export default async function Header() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access")?.value;
  const role = cookieStore.get("role")?.value;
  return (
    <header className="w-full bg-[#B2DDED] border-b border-[#e3eaf3]">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-8 py-3">
        <Link
          href="/"
          className="text-xl font-extrabold text-[#2176ae] tracking-wide"
          style={{ letterSpacing: 1 }}
        >
          HEALTHCARE
        </Link>
        {accessToken ? (
          role === "patient" ? (
            <PatientMenu />
          ) : role === "doctor" ? (
            <DoctorMenu />
          ) : role === "pharmacist" ? (
            <PharmacistMenu />
          ) : role === "insurance_provider" ? (
            <InsuranceMenu />
          ) : role === "admin" ? (
            <AdminMenu />
          ) : (
            <LabTechnicianMenu />
          )
        ) : (
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-5 py-1.5 border border-[#283779] text-[#283779] font-semibold text-[15px] bg-white rounded-full transition-colors duration-200 hover:bg-[#283779] hover:text-white"
              style={{ boxShadow: "0 1px 4px 0 rgba(40,55,121,0.04)" }}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-5 py-1.5 border border-[#283779] text-[#283779] font-semibold text-[15px] bg-white rounded-full transition-colors duration-200 hover:bg-[#283779] hover:text-white"
              style={{ boxShadow: "0 1px 4px 0 rgba(40,55,121,0.04)" }}
            >
              Register
            </Link>
          </div>
        )}
      </nav>
      <GlobalFadeInUpStyle />
    </header>
  );
}
