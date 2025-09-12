import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo Column */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1742481930/football_soccer_GIF_by_happydog_1_1_a2kcqe.png"
              alt="POPOYA Footer Logo"
              width={180}
              height={200}
              className="h-36 w-auto mb-4 hover:opacity-90 transition-opacity"
            />
            <p className="text-blue-200 text-sm mt-4 text-center md:text-left">
              Tu destino para deportes y entretenimiento
            </p>
          </div>

          {/* Social Media Column */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-lg mb-6 text-white relative">
              Nuestras Redes
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-400 rounded-full"></span>
            </h3>
            <div className="flex space-x-6">
              <Link href="#" className="text-white hover:text-blue-300 transition-colors">
                <div className="bg-blue-800 hover:bg-blue-700 p-3 rounded-full transition-all transform hover:scale-110">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </Link>
              <Link href="#" className="text-white hover:text-blue-300 transition-colors">
                <div className="bg-blue-800 hover:bg-blue-700 p-3 rounded-full transition-all transform hover:scale-110">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
                  </svg>
                </div>
              </Link>
              <Link href="#" className="text-white hover:text-blue-300 transition-colors">
                <div className="bg-blue-800 hover:bg-blue-700 p-3 rounded-full transition-all transform hover:scale-110">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-lg mb-6 text-white relative">
              Navegación
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-400 rounded-full"></span>
            </h3>
            <div className="space-y-4">
              <Link href="#" className="text-blue-100 hover:text-white transition-colors hover:translate-x-1 transform duration-200 flex items-center">
                <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                ¿Quienes somos?
              </Link>
              <Link href="#" className="text-blue-100 hover:text-white transition-colors hover:translate-x-1 transform duration-200 flex items-center">
                <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Creadores
              </Link>
              <Link href="#" className="text-blue-100 hover:text-white transition-colors hover:translate-x-1 transform duration-200 flex items-center">
                <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Mercancia
              </Link>
              <Link href="#" className="text-blue-100 hover:text-white transition-colors hover:translate-x-1 transform duration-200 flex items-center">
                <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Asociados
              </Link>
              <Link href="#" className="text-blue-100 hover:text-white transition-colors hover:translate-x-1 transform duration-200 flex items-center">
                <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                Contacto
              </Link>
            </div>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-lg mb-6 text-white relative">
              Contacto
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-400 rounded-full"></span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-blue-100">Cl. 18 #122-135, Barrio Pance, Cali, Valle del Cauca</p>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-blue-100">contacto@popoya.com</p>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="text-blue-100">+57 (602) 555-0123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-blue-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6 md:mb-0">
              <Link href="#" className="text-blue-300 hover:text-white transition-colors text-sm">
                Políticas de cookies
              </Link>
              <Link href="#" className="text-blue-300 hover:text-white transition-colors text-sm">
                Términos y condiciones
              </Link>
              <Link href="#" className="text-blue-300 hover:text-white transition-colors text-sm">
                Soporte técnico popoya
              </Link>
              <Link href="#" className="text-blue-300 hover:text-white transition-colors text-sm">
                Política canal de denuncias
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Image
                src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1742481930/image_46_nistqa.png"
                alt="Certification 1"
                width={30}
                height={30}
                className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
              <Image
                src="https://res.cloudinary.com/dapfvvlsy/image/upload/v1742481930/image_45_v4a2b6.png"
                alt="Certification 2"
                width={30}
                height={30}
                className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-blue-400">
            © 2026 UR Media. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}