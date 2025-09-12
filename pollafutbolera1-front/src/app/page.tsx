"use client"
import { useState } from 'react'
import { Trophy, PlayCircle, Users, BarChart } from 'lucide-react'

import Navbar from "@/src/components/layout/Navbar";
import Footer from "../components/layout/Footer";


export default function Home() {
const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const testimonials = [
  {
    company: "Icesi",
    logo: "/logos/globant.png",
    quote: "POPOYA transformó nuestra cultura de equipo, generando una conexión única durante los partidos.",
    rating: 5,
    team: "Equipo de Tecnología"
  },
  {
    company: "Javeriana",
    logo: "/logos/mercadolibre.png",
    quote: "Una herramienta increíble que nos permite crear momentos de diversión y competencia sana.",
    rating: 5,
    team: "Departamento de Innovación"
  },
  {
    company: "Tapitas",
    logo: "/logos/despegar.png",
    quote: "POPOYA nos ayuda a mantener la motivación del equipo en un ambiente divertido y colaborativo.",
    rating: 4,
    team: "Recursos Humanos"
  },
  {
    company: "Inlab",
    logo: "/logos/rappi.png",
    quote: "La plataforma perfecta para conectar a nuestros equipos más allá del trabajo diario.",
    rating: 5,
    team: "Equipo de Producto"
  }
];

  const functionalityCards = [
    {
      title: "Apuestas en vivo", 
      desc: "Participa durante los partidos con tus predicciones en vivo y directo.",
      icon: PlayCircle,
      iconColor: "text-red-500",
      bgColor: "bg-rose-50",
      bgHoverColor: "bg-rose-100"
    },
    {
      title: "Ranking por premios", 
      desc: "Compite con otros usuarios por increíbles premios.",
      icon: Trophy,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
      bgHoverColor: "bg-orange-100"
    },
    {
      title: "Subpollas con amigos", 
      desc: "Crea tus propias ligas entre amigos o compañeros.",
      icon: Users,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
      bgHoverColor: "bg-blue-100"
    },
    {
      title: "Estadísticas del torneo", 
      desc: "Consulta datos como máximo goleador y rendimiento.",
      icon: BarChart,
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
      bgHoverColor: "bg-green-100"
    }
  ]

  return (
    <div className="bg-gray-100 text-gray-800">
      
      {/* Hero Section */}
      <section className="bg-cover bg-center text-white text-center py-16 md:py-32 px-4 bg-fixed relative" style={{ backgroundImage: "url('/pollas/estadio-fondo.png')" }}>
        {/* Overlay to improve text readability */}
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div className="max-w-2xl mx-auto relative z-10 mt-0">
          <img 
            src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1742268225/logo_popoya_pemlzv.png" 
            alt="POPOYA logo" 
            className="w-40 md:w-60 mx-auto mb-6 drop-shadow-lg" 
          />
          <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight tracking-tight">
            La mejor manera de vivir el fútbol con amigos y tu empresa
          </h1>
          <p className="text-base md:text-lg mb-8 opacity-90 max-w-xl mx-auto">
           Prepárate para formar parte de una plataforma que está revolucionando la forma en que se vive la emoción del deporte, combinando tecnología de vanguardia, seguridad de primer nivel y entretenimiento sin límites.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href='/auth/login'
             className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold 
              transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 
              shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Juega Gratis
            </a>

            <a 
              href="#empresas"
              className="border border-white-300 text-white-800 hover: px-8 py-3 rounded-lg font-semibold 
                transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 
                shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              Ver Planes
            </a>
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section 
        id="funcionalidad" 
        className="bg-stone-50 py-12 px-6 text-center relative"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-10">¿Cómo funciona POPOYA?</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {functionalityCards.map((card, i) => (
            <div 
              key={i} 
              className={`
                p-6 rounded-xl 
                border border-gray-200
                transform transition-all duration-300 ease-in-out
                ${hoveredCard === i 
                  ? 'sm:scale-105 shadow-lg' 
                  : 'scale-100 shadow-md'}
                hover:shadow-xl
                cursor-pointer
                text-center
                ${hoveredCard === i 
                  ? card.bgHoverColor 
                  : card.bgColor}
              `}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="mb-4 flex justify-center">
                <card.icon 
                  size={48} 
                  className={`
                    ${card.iconColor}
                    ${hoveredCard === i 
                      ? 'transform scale-110' 
                      : 'scale-100'}
                    transition-transform duration-300
                  `}
                />
              </div>

              <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Planes para Empresas */}
      <section id="empresas" className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-br from-gray-60 to-gray-100 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Planes Empresariales POPOYA</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Diseñamos soluciones personalizadas para impulsar la motivación y conexión de tu equipo a través de la emoción del fútbol.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Plan PYME",
                price: "A medida",
                desc: "Solución perfecta para equipos pequeños y medianos",
                features: [
                  "Hasta 30 usuarios",
                  "Ranking interno",
                  "Predicciones en vivo",
                  "Soporte básico"
                ],
                bgColor: "bg-white",
                textColor: "text-gray-800",
                borderColor: "border-gray-200",
                isMostPopular: false
              },
              {
                title: "Plan Corporativo",
                price: "A medida",
                desc: "Potencia la cultura de tu empresa con herramientas avanzadas",
                features: [
                  "Número ilimitado de usuarios",
                  "Branding personalizado",
                  "Estadísticas detalladas",
                  "Soporte premium",
                  "Ranking interdepartamental"
                ],
                bgColor: "bg-red-50",
                textColor: "text-red-900",
                borderColor: "border-red-200",
                isMostPopular: true
              },
              {
                title: "Plan Élite",
                price: "A medida",
                desc: "Solución 100% personalizada para grandes empresas",
                features: [
                  "Integración con sistemas internos",
                  "API dedicada",
                  "Asistencia personalizada",
                  "Diseño exclusivo",
                  "Reportes ejecutivos"
                ],
                bgColor: "bg-white",
                textColor: "text-gray-800",
                borderColor: "border-gray-200",
                isMostPopular: false
              }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`
                  ${plan.bgColor} 
                  ${plan.borderColor}
                  ${plan.textColor}
                  border-2 
                  rounded-2xl 
                  p-6 md:p-8 
                  relative 
                  transform 
                  transition-all 
                  duration-300 
                  ${plan.isMostPopular 
                    ? 'md:hover:scale-110 md:scale-105 shadow-xl' 
                    : 'md:hover:scale-105'}
                  hover:shadow-xl
                  mb-8 md:mb-0
                `}
              >
                {plan.isMostPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      MÁS POPULAR
                    </span>
                  </div>
                )}
                
                <h3 className="text-xl md:text-2xl font-bold mb-4">{plan.title}</h3>
                <p className="text-lg md:text-xl font-semibold mb-4">{plan.price}</p>
                <p className="text-gray-600 mb-6 text-sm md:text-base">{plan.desc}</p>
                
                <ul className="mb-8 space-y-3 text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="flex items-center space-x-3"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 md:h-6 md:w-6 ${plan.isMostPopular ? 'text-red-500' : 'text-green-500'}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                      </svg>
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`
                    w-full 
                    py-3 
                    rounded-lg 
                    font-semibold 
                    text-sm md:text-base
                    transition-colors 
                    duration-300 
                    ${plan.isMostPopular 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}
                  `}
                >
                  Solicitar
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white shadow-lg rounded-2xl p-6 md:p-8 max-w-4xl mx-auto hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">¿Necesitas algo diferente?</h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Nuestro equipo está listo para diseñar una solución que se adapte perfectamente a las necesidades específicas de tu empresa.
            </p>
            <button 
              className="
                bg-red-600
                text-white 
                px-6 md:px-8 
                py-2 md:py-3 
                rounded-lg 
                font-semibold 
                text-sm md:text-base
                hover:bg-red-800
                transition-all 
                duration-300
              "
            >
              Agenda una Consulta Personalizada
            </button>
          </div>
        </div>
      </section>

      {/* Testimonios de Empresas */}
      <section className="bg-stone-50 py-16 md:py-20 px-4 md:px-6 text-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">Empresas que confían en POPOYA</h2>

          <div className="overflow-hidden group">
            <div className="flex space-x-4 md:space-x-8 animate-infinite-carousel w-max">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-white p-4 md:p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 w-72 md:w-96 flex-shrink-0 relative overflow-hidden"
                >
                  {/* Estrellas de calificación */}
                  <div className="absolute top-2 md:top-4 right-2 md:right-4 flex">
                    {[...Array(testimonial.rating)].map((_, starIndex) => (
                      <svg 
                        key={starIndex} 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 md:h-6 md:w-6 text-yellow-400" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Contenido del testimonio */}
                  <p className="italic text-gray-600 mb-4 mt-3 text-sm md:text-base">"{testimonial.quote}"</p>
                  <div className="font-semibold text-gray-800 text-sm md:text-base">
                    <p>{testimonial.team}</p>
                    <p className="text-xs md:text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradientes de borde para efecto visual */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-stone-50 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-stone-50 to-transparent z-10"></div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};