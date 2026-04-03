export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-6">
          <div className="flex flex-col items-center md:items-start">
            <p className="font-semibold text-gray-900 text-base flex items-center gap-2">
              <span className="text-[#4CAF50]">Kisan AI</span> Sahayak
            </p>
            <p className="mt-1">Free AI for better yields. © {new Date().getFullYear()}</p>
          </div>
          <div className="text-center md:text-right">
            <span className="font-semibold text-gray-700 block mb-1">Proudly supporting farmers in MP:</span>
            <span className="text-gray-400">Indore • Sehore • Vidisha • Raisen • Shivpuri • Gwalior • Ujjain • Hoshangabad • Sagar • Satna</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
