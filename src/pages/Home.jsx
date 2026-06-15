import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import ClothingFilter from "../components/ClothingFilter";
import ClothingCard from "../components/ClothingCard/ClothingCard";

export default function Home() {
    const [roupas, setRoupas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filtro, setFiltro] = useState("Todos");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        buscarRoupas();
    }, []);

    async function buscarRoupas() {
        setLoading(true);
        const { data } = await supabase
            .from("roupas")
            .select("*")
            .order("created_at", {
                ascending: false,
            });

        setRoupas(data || []);
        setLoading(false);
    }

    const roupasFiltradas = roupas.filter(
        (roupa) => {
            const busca =
                roupa.titulo
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    ) ||
                roupa.marca?.toLowerCase().includes(searchTerm.toLowerCase());

            const tipo =
                filtro === "Todos" ||
                roupa.tipo_peca === filtro;

            return busca && tipo;
        }
    );

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
            <Header />

            <main className="flex-1">
                <div className="max-w-6xl mx-auto px-4 py-8">
                    {/* Cabeçalho da página */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Descubra peças únicas
                        </h2>
                        <p className="text-gray-600">
                            {roupasFiltradas.length} {roupasFiltradas.length === 1 ? 'peça encontrada' : 'peças encontradas'}
                        </p>
                    </div>

                    {/* Filtros e busca */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1">
                            <SearchBar
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                            />
                        </div>
                        <div className="md:w-64">
                            <ClothingFilter
                                filtro={filtro}
                                setFiltro={setFiltro}
                            />
                        </div>
                    </div>

                    {/* Grid de produtos */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : roupasFiltradas.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">👗</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                Nenhuma peça encontrada
                            </h3>
                            <p className="text-gray-500">
                                Tente ajustar os filtros ou buscar por outro termo
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {roupasFiltradas.map((roupa) => (
                                <ClothingCard
                                    key={roupa.id}
                                    roupa={roupa}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}