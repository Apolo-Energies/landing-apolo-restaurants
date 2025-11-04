import React, { useEffect, useState } from 'react'

export const Block4Component = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    [
      { name: 'Iker Pogazauriundua', date: '2024-10-21', rating: 5, text: 'Buena mejora de precio y ahorro en la empresa. Gente seria' },
      { name: 'Sagrario José García Cab...', date: '2024-10-20', rating: 5, text: 'Estoy muy satisfecho. Realizaron un estudio con comparativa con referencia y optimizaron mi factura. Trato cercano y personalizado' },
      { name: 'LUIS YUSTE GALAN', date: '2024-10-20', rating: 5, text: 'Atención, servicio y una reducción significativa en la factura de la luz que es lo más importante de su contratación.' }
    ],
    [
      { name: 'María González', date: '2024-10-19', rating: 5, text: 'Excelente servicio al cliente y precios competitivos' },
      { name: 'Pedro Martínez', date: '2024-10-18', rating: 5, text: 'Muy profesionales, me ayudaron a reducir mi factura considerablemente' },
      { name: 'Ana Rodríguez', date: '2024-10-17', rating: 5, text: 'Recomendado 100%, transparencia total en todo el proceso' }
    ]
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-linear-to-b from-[#15268D] to-[#2541E9] py-20">
      <div className="container mx-auto px-4 text-white">

        {/* Texto superior centrado */}
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Apolo Energies, no solo tú hablas de nosotros. También ellos.
          </h2>
          <p className="text-3xl sm:text-3xl">
            ¿Por qué nos eligen bares, restaurantes y hoteles?
          </p>
        </div>

        {/* Carrusel de testimonios */}
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
          >
            {testimonials.map((group, groupIndex) => (
              <div key={groupIndex} className="flex-shrink-0 w-full grid md:grid-cols-3 gap-6">
                {group.map((testimonial, index) => (
                  <div key={index} className="bg-white text-gray-800 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                        {testimonial.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.date}</p>
                      </div>
                      <div className="ml-auto">
                        <span className="text-blue-600">G</span>
                      </div>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <p className="text-sm">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
