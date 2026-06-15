export default function ClothingFilter({ filtro, setFiltro }) {
    const tipos = [
        "Todos",
        "Camiseta",
        "Calça",
        "Vestido",
        "Jaqueta",
        "Moletom",
        "Shorts",
        "Saia",
        "Outro",
    ];

    return (
        <div className="relative">
            <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="p-3 pr-10 rounded-xl border-2 border-gray-200 bg-white cursor-pointer appearance-none transition-all duration-200 font-medium text-gray-700 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:border-indigo-500"
            >
                {tipos.map((tipo) => (
                    <option key={tipo} value={tipo}>
                        {tipo}
                    </option>
                ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
}