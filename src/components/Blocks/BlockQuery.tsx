"use client";
import { sendForm } from "@/app/services/FormService/form.service";
import React, { useState } from "react";

export const BlockQuery = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [showForm, setShowForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await sendForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        formType: "business"
      });

      if (response.status === 200) {
        setShowForm(false);
        setSuccessMessage(response.message || "¡Gracias! Nos pondremos en contacto contigo.");
        setTimeout(() => {
          setShowForm(true);
          setSuccessMessage("");
          setFormData({ name: "", phone: "", email: "" });
        }, 4000);
      } else {
        setShowForm(false);
        setErrorMessage(response.message || "Hubo un error al enviar el formulario");
        setTimeout(() => {
          setShowForm(true);
          setErrorMessage("");
        }, 4000);
      }
    } catch (error) {
      console.error(error);
      setShowForm(false);
      setErrorMessage("Error al enviar el formulario");
      setTimeout(() => {
        setShowForm(true);
        setErrorMessage("");
      }, 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container mx-auto px-14 pt-0 pb-14">
      <div className="grid md:grid-cols-2 gap-12 items-stretch">
        {/* Texto */}
        <div className="bg-gray-50 p-10 rounded-2xl text-center md:text-left shadow-sm flex flex-col justify-between h-full">
          <div>
            <h3 className="text-3xl font-bold mb-4">
              Solicita más información sobre las{" "}
              <span className="text-[#15268D]">condiciones para tu hostelería</span>
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Si administras un restaurante, cafetería u hotel, nuestro equipo especializado puede asesorarte sobre cómo mejorar la eficiencia energética de tu negocio.
              Responderemos todas tus consultas y te ayudaremos a tomar decisiones informadas.
            </p>
          </div>
          <p className="mt-8 text-gray-600 italic text-sm">
            Nuestro equipo te responderá en menos de 24 horas hábiles.
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white p-10 rounded-2xl shadow-lg flex flex-col justify-center h-full">
          {/* Mensaje de éxito */}
          {!showForm && successMessage && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-800 text-lg font-semibold">{successMessage}</p>
            </div>
          )}

          {/* Mensaje de error */}
          {!showForm && errorMessage && (
            <div className="flex flex-col items-center justify-center h-full text-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-600 mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <p className="text-gray-800 text-lg font-semibold">{errorMessage}</p>
            </div>
          )}
          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de contacto
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej. Juan Pérez"
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ej. +34 600 123 456"
                    required
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@restaurante.com"
                  required
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#0C1C7C] cursor-pointer text-white px-10 py-3 rounded-full font-semibold hover:bg-blue-800 transition flex items-center justify-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? "Enviando..." : "Enviar →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
