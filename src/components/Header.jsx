import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
                        Bazar da Lu
                    </h1>
                </Link>

                <Link to="/nova-peca">
                    <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-105 active:scale-95 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Publicar
                    </button>
                </Link>
            </div>
        </header>
    );
}