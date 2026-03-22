export function SiteFooter() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-xl font-bold text-gray-900 mb-1">
            Forja<span className="text-violet-600">.ai</span>
          </p>
          <p className="text-sm text-gray-500">Landing pages propulsées par l&apos;IA, créées en quelques secondes.</p>
        </div>

        <div className="flex items-center gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-gray-900 transition-colors">Confidentialité</a>
          <a href="#" className="hover:text-gray-900 transition-colors">CGU</a>
          <a href="mailto:hello@forja.ai" className="hover:text-gray-900 transition-colors">Contact</a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-1">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Forja. Tous droits réservés.
          </p>
          <p className="text-xs text-gray-400">
            Développé par{' '}
            <a href="https://spays.fr" target="_blank" rel="noopener noreferrer"
               className="hover:text-gray-600 transition-colors underline underline-offset-2">
              Spays
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
