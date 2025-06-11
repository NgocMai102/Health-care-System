"use client";

import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";

type Message = {
  sender: "user" | "bot";
  text: string;
};
interface Patient {
  id: number;
  user_id: number;
  date_of_birth: string;
  address: string;
  medical_history: string;
  created_at: string;
  updated_at: string;
}

interface Doctor {
  id: number;
  user_id: number;
  specialty: string;
  clinic: string;
  schedule: string;
  created_at: string;
  updated_at: string;
}

const USER_API = "http://localhost:8080/api/users/me/";
const DOCTOR_API = "http://localhost:8003/api/doctors/";
const PATIENT_API = "http://localhost:8080/api/patients/";

const BOT_AVATAR = "https://cdn-icons-png.flaticon.com/512/4712/4712035.png";
const USER_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
const fetchAllDoctors = async () => {
  const res = await fetch(DOCTOR_API);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json() as Promise<Doctor[]>;
};

const fetchAllPatients = async (token: string) => {
  const res = await fetch(PATIENT_API, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json() as Promise<Patient[]>;
};

const exampleQuestions = [
  "Tôi bị sốt, ho, đau họng",
  "Tôi muốn đặt lịch hẹn với bác sĩ",
  "Tôi nên uống thuốc gì cho cảm cúm?",
  "Tôi bị đau bụng, buồn nôn",
];

export default function ChatbotPage() {
  // State for chatbot messages
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Xin chào! Tôi là trợ lý sức khỏe. Bạn cần tôi giúp gì hôm nay?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // State for patient info
  const [patient, setPatient] = useState<Patient | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const token = Cookies.get("access") || "";
  const userId = Cookies.get("user_id") ? Number(Cookies.get("user_id")) : null;

  // Fetch patient info on mount
  useEffect(() => {
    const fetchPatient = async () => {
      if (!token || !userId) return;
      try {
        const res = await fetch(PATIENT_API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const allPatients: Patient[] = await res.json();
        const foundPatient = allPatients.find((p) => p.user_id === userId);
        setPatient(foundPatient || null);
        console.log("Patient info:", foundPatient);
      } catch {
        // Optionally handle error
      }
    };
    fetchPatient();
    // eslint-disable-next-line
  }, [token, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (msg: string) => {
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setInput("");
    setLoading(true);

    try {
      console.log(JSON.stringify({ patient_id: patient?.id, message: msg }));

      const res = await fetch("http://localhost:8080/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patient_id: patient?.id, message: msg }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.response || "Xin lỗi, tôi chưa hiểu ý bạn.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Có lỗi xảy ra khi kết nối đến máy chủ. Vui lòng thử lại sau.",
        },
      ]);
    }
    setLoading(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) sendMessage(input);
  };

  const handleExample = (q: string) => {
    setInput(q);
    setTimeout(() => sendMessage(q), 300);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#B2DDED] overflow-hidden flex items-center justify-center">
      {/* White blobs */}
      <div className="absolute -top-24 -left-32 w-96 h-96 bg-white opacity-30 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-24 -right-32 w-96 h-96 bg-white opacity-40 rounded-full blur-3xl z-0"></div>
      {/* Blue blur points */}
      <div className="absolute top-1/2 left-0 w-40 h-40 bg-[#eaf6fb] opacity-40 rounded-full blur-2xl z-0"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#b2dded] opacity-30 rounded-full blur-2xl z-0"></div>
      {/* Decorative dots top-left */}
      <div className="absolute top-10 left-10 grid grid-cols-4 gap-2 opacity-20 z-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 bg-white rounded-full inline-block"
          />
        ))}
      </div>
      {/* Decorative dots bottom-right */}
      <div className="absolute bottom-10 right-10 grid grid-cols-4 gap-2 opacity-20 z-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 bg-[#eaf6fb] rounded-full inline-block"
          />
        ))}
      </div>
      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#eaf6fb]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#23408e] to-[#1B71A1] p-6 flex items-center gap-3 rounded-t-3xl">
          <img
            src={BOT_AVATAR}
            alt="Bot"
            className="w-12 h-12 rounded-full border-2 border-white shadow"
          />
          <div>
            <div className="text-white font-bold text-xl leading-tight">
              HealthCare Chatbot
            </div>
            <div className="text-[#eaf6fb] text-xs font-medium">
              Trợ lý sức khỏe thông minh
            </div>
          </div>
        </div>
        {/* Chat area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[#f6fbfd]">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "bot" && (
                <img
                  src={BOT_AVATAR}
                  alt="Bot"
                  className="w-8 h-8 rounded-full mr-2 shadow"
                />
              )}
              <div
                className={`px-4 py-2 rounded-2xl shadow transition-all duration-200 max-w-[70%] break-words ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-[#2176ae] to-[#1B71A1] text-white rounded-br-none"
                    : "bg-white text-[#23408e] border border-[#eaf6fb] rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <img
                  src={USER_AVATAR}
                  alt="User"
                  className="w-8 h-8 rounded-full ml-2 shadow"
                />
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2">
              <img
                src={BOT_AVATAR}
                alt="Bot"
                className="w-8 h-8 rounded-full mr-2 shadow"
              />
              <div className="animate-pulse bg-[#eaf6fb] px-4 py-2 rounded-2xl text-[#23408e]">
                Đang trả lời...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Input area */}
        <div className="px-6 py-4 bg-white border-t border-[#eaf6fb]">
          <div className="flex flex-wrap gap-2 mb-2">
            {exampleQuestions.map((q, i) => (
              <button
                key={i}
                className="text-xs bg-[#eaf6fb] hover:bg-[#b2dded] text-[#2176ae] px-3 py-1 rounded-full transition font-medium shadow"
                onClick={() => handleExample(q)}
                disabled={loading}
              >
                {q}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-full border border-[#b2dded] focus:outline-none focus:ring-2 focus:ring-[#b2dded] transition bg-[#f6fbfd]"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              className="bg-gradient-to-r from-[#23408e] to-[#1B71A1] text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition disabled:opacity-50"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
            >
              Gửi
            </button>
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
    </section>
  );
}
