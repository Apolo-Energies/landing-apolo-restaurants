"use client";

import { sendForm } from "@/app/services/FormService/form.service";
import { useState } from "react";

export const Block1Component = ({ onScrollToQuery }: { onScrollToQuery: () => void }) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showForm, setShowForm] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        file: "",
        agree: "",
    });

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        file: null as File | null,
        agree: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            setFormData({ ...formData, [name]: checked });
        } else if (type === "file") {
            setFormData({ ...formData, [name]: files ? files[0] : null });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        const newErrors: typeof errors = {
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            file: "",
            agree: "",
        };
        let valid = true;

        if (!formData.firstname.trim()) {
            newErrors.firstname = "El nombre es obligatorio";
            valid = false;
        }
        if (!formData.lastname.trim()) {
            newErrors.lastname = "Los apellidos son obligatorios";
            valid = false;
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "El teléfono es obligatorio";
            valid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = "El email es obligatorio";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El email no es válido";
            valid = false;
        }
        if (!formData.file) {
            newErrors.file = "Debes subir tu factura";
            valid = false;
        }
        if (!formData.agree) {
            newErrors.agree = "Debes aceptar la política de privacidad";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);
        try {

            const response = await sendForm({
                name: `${formData.firstname} ${formData.lastname}`,
                email: formData.email,
                phone: formData.phone,
                formType: "restaurants",
                file: formData.file || undefined
            });

            if (response.status === 200) {
                setShowForm(false);
                setSuccessMessage(response.message || "Formulario enviado correctamente");

                setTimeout(() => {
                    setShowForm(true);
                    setSuccessMessage("");
                    setFormData({
                        firstname: "",
                        lastname: "",
                        phone: "",
                        email: "",
                        file: null,
                        agree: false,
                    });
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
            setErrorMessage("Error al enviar el formulario");
            setTimeout(() => setErrorMessage(""), 4000);
        } finally {
            setIsSubmitting(false);
        }
    };


    const images = [
        { src: "/imgs/block2r1.webp", alt: "Trabajador restaurant" },
    ];

    return (
        <div className="container mx-auto px-4 pt-16 pb-28">
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
                {/* Imagen con texto */}
                <div className="relative w-full max-h-[550px] rounded-lg overflow-hidden">
                    {images.map((img, index) => (
                        <div key={index} className="relative w-full h-full">
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end items-end p-6">
                                <p className="text-white text-2xl sm:text-4xl font-bold max-w-[70%] text-left leading-snug">
                                    Ahorra hasta un 25 % en la factura de la luz de tu hostelería
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Formulario */}
                <div className="bg-white px-6 py-6 rounded-lg shadow-lg flex flex-col justify-start">
                    {/* Mensaje de éxito estilo check azul */}
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

                    {/* Formulario */}
                    {showForm && (
                        <>
                            <h3 className="text-xl sm:text-2xl mb-6 w-full text-center">
                                Sube tu factura y descubre{" "}
                                <span className="text-2xl sm:text-2xl font-black">en segundos</span>{" "}
                                cuánto podrías ahorrar en tu bar, hotel o restaurante:
                            </h3>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="firstname"
                                                placeholder="Nombre*"
                                                value={formData.firstname}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded px-4 py-2 w-full"
                                            />
                                            {errors.firstname && (
                                                <p className="absolute text-red-600 text-xs mt-1">
                                                    {errors.firstname}
                                                </p>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="lastname"
                                                placeholder="Apellidos*"
                                                value={formData.lastname}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded px-4 py-2 w-full"
                                            />
                                            {errors.lastname && (
                                                <p className="absolute text-red-600 text-xs mt-1">
                                                    {errors.lastname}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Teléfono*"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded px-4 py-2 w-full"
                                            />
                                            {errors.phone && (
                                                <p className="absolute text-red-600 text-xs mt-1">
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email*"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="border border-gray-300 rounded px-4 py-2 w-full"
                                            />
                                            {errors.email && (
                                                <p className="absolute text-red-600 text-xs mt-1">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <label className="block text-gray-700 mb-2 font-medium">
                                            Sube tu factura (PDF, JPG o PNG)*
                                        </label>
                                        <input
                                            type="file"
                                            name="file"
                                            accept=".pdf, .jpg, .jpeg, .png"
                                            onChange={handleChange}
                                            className="border border-gray-300 rounded px-4 py-2 w-full cursor-pointer"
                                        />
                                        {errors.file && (
                                            <p className="absolute text-red-600 text-xs mt-1">
                                                {errors.file}
                                            </p>
                                        )}
                                    </div>

                                    <div className="text-base text-gray-600 relative">
                                        <label className="flex items-start">
                                            <input
                                                type="checkbox"
                                                name="agree"
                                                checked={formData.agree}
                                                onChange={handleChange}
                                                className="mt-1 mr-2"
                                            />
                                            <span>
                                                He leído y acepto la política de privacidad y autorizo a
                                                Apolo Energía a remitir información comercial sobre sus
                                                productos y servicios.
                                            </span>
                                        </label>
                                        {errors.agree && (
                                            <p className="absolute text-red-600 text-xs mt-1">
                                                {errors.agree}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-4 mt-6 mb-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`bg-[#0C1C7C] cursor-pointer text-white px-6 py-2 rounded-full hover:bg-blue-800 transition flex items-center justify-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                                                }`}
                                        >
                                            {isSubmitting ? "Enviando..." : "Enviar →"}
                                        </button>
                                        <button
                                            onClick={onScrollToQuery}
                                            type="button"
                                            className="border-2 cursor-pointer border-[#0C1C7C] text-[#0C1C7C] px-6 py-2 rounded-full hover:bg-blue-50 transition"
                                        >
                                            Consultar con nuestros especialistas
                                        </button>
                                    </div>

                                    <p className="text-xl text-center p-2 inline-block">
                                        Te llamaremos y daremos la información sin ningún compromiso
                                    </p>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
