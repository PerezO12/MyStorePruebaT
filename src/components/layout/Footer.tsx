export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              My Store
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Tu tienda online de confianza. Encuentra los mejores productos al mejor precio.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <a 
                  href="/" 
                  className="hover:text-primary-600 dark:hover:text-secondary-400 transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a 
                  href="/cart" 
                  className="hover:text-primary-600 dark:hover:text-secondary-400 transition-colors"
                >
                  Carrito
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contacto
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Email: info@mystore.com<br />
              Teléfono: +1 (555) 123-4567
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            © 2025 My Store. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
