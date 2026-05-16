"use client";

import React, { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, Stethoscope, Video } from "lucide-react";

const doctors = [
  { id: 1, name: "Dr. Abebe Kebede", specialty: "General Physician", available: true },
  { id: 2, name: "Dr. Tirunesh Dibaba", specialty: "Pediatrician", available: true },
  { id: 3, name: "Dr. Haile Gebrselassie", specialty: "Cardiologist", available: false },
  { id: 4, name: "Dr. Meseret Defar", specialty: "Dermatologist", available: true },
];

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"];

export default function TeleHealthPage() {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", reason: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleBook = () => {
    if (!selectedDoctor || !selectedTime || !form.name || !form.phone) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-10 text-center max-w-md">
          <div className="bg-green-100 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-6">
            <Video className="text-green-600 w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Appointment Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your telehealth appointment with {doctors.find(d => d.id === selectedDoctor)?.name} at {selectedTime} has been booked. A confirmation link will be sent to your email.
          </p>
          <button onClick={() => { setSubmitted(false); setStep(1); setSelectedDoctor(null); setSelectedTime(""); setForm({ name: "", phone: "", email: "", reason: "" }); }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">TeleHealth Booking</h1>
        <p className="text-gray-600 mb-8">Schedule a virtual consultation with our specialists.</p>

        <div className="flex mb-10">
          {["Select Doctor", "Choose Time", "Your Details"].map((label, i) => (
            <div key={i} className="flex-1 text-center">
              <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-bold ${step > i ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                {i + 1}
              </div>
              <p className="mt-2 text-sm text-gray-600">{label}</p>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {doctors.map(doc => (
              <button key={doc.id} onClick={() => { setSelectedDoctor(doc.id); setStep(2); }}
                disabled={!doc.available}
                className={`p-6 rounded-xl border-2 transition text-left ${selectedDoctor === doc.id ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:shadow-lg"} ${!doc.available ? "opacity-50 cursor-not-allowed" : ""}`}>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 rounded-full p-3"><Stethoscope className="text-blue-600 w-6 h-6" /></div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                    <p className="text-sm text-gray-500">{doc.specialty}</p>
                    <p className={`text-xs mt-1 ${doc.available ? "text-green-600" : "text-red-600"}`}>
                      {doc.available ? "Available Today" : "Offline"}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} className="text-blue-600 mb-4 hover:underline">&larr; Back</button>
            <h2 className="text-xl font-semibold mb-4">Select a Time Slot</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {timeSlots.map(slot => (
                <button key={slot} onClick={() => { setSelectedTime(slot); setStep(3); }}
                  className={`p-3 rounded-lg border transition ${selectedTime === slot ? "bg-blue-600 text-white border-blue-600" : "bg-white border-gray-200 hover:bg-gray-50"}`}>
                  <Clock className="inline w-4 h-4 mr-2" />{slot}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
            <button onClick={() => setStep(2)} className="text-blue-600 mb-4 hover:underline">&larr; Back</button>
            <h2 className="text-xl font-semibold mb-4">Your Information</h2>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2" placeholder="Your name" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2" placeholder="+251..." /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2" placeholder="email@example.com" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                <textarea value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2" rows={3} placeholder="Brief description..." /></div>
              <button onClick={handleBook}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
