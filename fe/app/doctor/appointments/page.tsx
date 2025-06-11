"use client";

import React, { useEffect, useState } from "react";

// Helper to get cookie by name
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift() || null;
  return null;
}

type Doctor = {
  id: number;
  user_id: number;
  specialty: string;
  clinic: string;
  schedule: string;
};

type Appointment = {
  id: number;
  patient: number;
  doctor_id: number;
  appointment_date: string;
  reason: string;
  status: "pending" | "confirmed" | "cancelled";
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Chờ xác nhận",
  confirmed: "Đã xác nhận",
  cancelled: "Đã hủy",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function DoctorAppointmentsPage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch doctor info
  useEffect(() => {
    async function fetchDoctor() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:8080/api/doctors/");
        const doctors: Doctor[] = await res.json();
        const userId = getCookie("user_id");
        if (!userId) {
          setError("Không tìm thấy thông tin đăng nhập.");
          setLoading(false);
          return;
        }
        const found = doctors.find((d) => String(d.user_id) === userId);
        if (!found) {
          setError("Không tìm thấy thông tin bác sĩ.");
          setLoading(false);
          return;
        }
        setDoctor(found);
      } catch (e) {
        setError("Lỗi khi tải thông tin bác sĩ.");
      } finally {
        setLoading(false);
      }
    }
    fetchDoctor();
  }, []);

  // Fetch appointments
  useEffect(() => {
    if (!doctor) return;
    async function fetchAppointments() {
      setLoading(true);
      setError(null);
      try {
        if (!doctor) return;
        const res = await fetch(
          `http://localhost:8080/api/appointments/by_doctorId/${doctor.id}/`
        );
        const data = await res.json();
        console.log(data);
        if (data.detail) {
          setAppointments([]); // Đặt appointments thành mảng rỗng
        } else {
          setAppointments(data); // Nếu là mảng, đặt appointments như bình thường
        }
        console.log(appointments);
      } catch (e) {
        setError("Lỗi khi tải lịch hẹn.");
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, [doctor]);

  // Update appointment status
  async function updateStatus(id: number, status: string) {
    setUpdatingId(id);
    setError(null);
    try {
      const res = await fetch(
        `http://localhost:8080/api/appointments/${id}/update_status/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      if (!res.ok) throw new Error();
      setAppointments((prev) =>
        prev?.map((a) =>
          a.id === id
            ? { ...a, status: status as "pending" | "confirmed" | "cancelled" }
            : a
        )
      );
    } catch {
      setError("Cập nhật trạng thái thất bại.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-[#B2DDED] pb-16 relative overflow-hidden">
      {/* Decorative dots left */}
      <div className="absolute top-10 left-10 grid grid-cols-4 gap-2 opacity-30 z-0">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 bg-white rounded-full inline-block"
            style={{ margin: 2 }}
          />
        ))}
      </div>
      {/* Decorative dots right */}
      <div className="absolute top-16 right-10 grid grid-cols-4 gap-2 opacity-30 z-0">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 border-2 border-white rounded-full inline-block"
            style={{ margin: 2 }}
          />
        ))}
      </div>
      {/* Main content */}
      <div className="relative z-10 max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#23408e] flex items-center gap-2">
            <svg
              className="w-8 h-8 text-[#2176ae]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z"
              />
            </svg>
            Quản lý lịch hẹn
          </h1>
        </div>
        {doctor && (
          <div className="mb-6">
            <div className="text-lg font-semibold text-[#1a3365]">
              {doctor.clinic} - {doctor.specialty}
            </div>
            <div className="text-[#1B71A1]">
              Lịch làm việc: {doctor.schedule}
            </div>
          </div>
        )}
        {error && (
          <div className="mb-4 text-red-600 font-semibold">{error}</div>
        )}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#2176ae]"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow text-[#23408e]">
              <thead>
                <tr className="bg-[#eaf6fb] text-[#2176ae]">
                  <th className="px-4 py-2 text-left font-semibold">#</th>
                  <th className="px-4 py-2 text-left font-semibold">Ngày hẹn</th>
                  <th className="px-4 py-2 text-left font-semibold">Lý do</th>
                  <th className="px-4 py-2 text-left font-semibold">Trạng thái</th>
                  <th className="px-4 py-2 text-left font-semibold">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-[#1B71A1] font-medium">
                      Không có lịch hẹn nào.
                    </td>
                  </tr>
                ) : (
                  appointments?.map((a, idx) => (
                    <tr key={a.id} className="transition hover:bg-[#f5fbfd] border-b last:border-none">
                      <td className="px-4 py-2">{idx + 1}</td>
                      <td className="px-4 py-2 font-semibold">
                        {new Date(a.appointment_date).toLocaleString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-2">{a.reason}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            STATUS_COLORS[a.status]
                          }`}
                        >
                          {STATUS_LABELS[a.status]}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          {a.status === "pending" && (
                            <>
                              <button
                                disabled={updatingId === a.id}
                                onClick={() => updateStatus(a.id, "confirmed")}
                                className="transition bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full shadow text-sm font-medium disabled:opacity-50"
                              >
                                {updatingId === a.id
                                  ? "Đang lưu..."
                                  : "Xác nhận"}
                              </button>
                              <button
                                disabled={updatingId === a.id}
                                onClick={() => updateStatus(a.id, "cancelled")}
                                className="transition bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full shadow text-sm font-medium disabled:opacity-50"
                              >
                                {updatingId === a.id ? "Đang lưu..." : "Hủy"}
                              </button>
                            </>
                          )}
                          {a.status !== "pending" && (
                            <span className="text-gray-400 italic">
                              Không có
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
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
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
