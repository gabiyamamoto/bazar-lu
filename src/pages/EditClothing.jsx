import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function EditClothing() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    const tipos = [
        "Camiseta", "Calça", "Vestido", "Jaqueta",
        "Moletom", "Saia", "Shorts", "Outro"
    ];

    const materiais = [
        "Algodão", "Poliéster", "Linho", "Jeans", "Lã",
        "Viscose", "Couro", "Moletom", "Outro"
    ];

    const estados = [
        "Novo", "Como novo", "Excelente", "Bom", "Regular", "Com defeito"
    ];

    const [formData, setFormData] = useState({
        tipo_peca: "",
        titulo: "",
        marca: "",
        material: "",
        tamanho: "",
        estado: "",
        preco: "",
        descricao: "",
        imagem: "",
    });

    useEffect(() => {
        carregarRoupa();
    }, []);

    async function carregarRoupa() {
        const { data, error } = await supabase
            .from("roupas")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            console.error(error);
            alert("Erro ao carregar peça");
            navigate("/");
            return;
        }

        setFormData(data);
        setInitialLoading(false);
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function atualizarRoupa(e) {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from("roupas")
            .update(formData)
            .eq("id", id);

        if (error) {
            console.error(error);
            alert("Erro ao atualizar peça.");
            setLoading(false);
            return;
        }

        alert("✅ Peça atualizada com sucesso!");
        navigate(`/roupa/${id}`);
    }

    if (initialLoading) {
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
                <Header />
                <div className="flex-1 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
            <Header />

            <main className="flex-1">
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <div className="mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Voltar
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-6">
                            <h1 className="text-3xl font-bold text-white">
                                Editar peça
                            </h1>
                            <p className="text-amber-100 text-sm mt-1">
                                Atualize as informações da sua peça
                            </p>
                        </div>

                        <form onSubmit={atualizarRoupa} className="p-8 space-y-6">
                            {/* Tipo da peça e Título */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tipo da peça *
                                    </label>
                                    <select
                                        name="tipo_peca"
                                        value={formData.tipo_peca}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                                    >
                                        <option value="">Selecione o tipo</option>
                                        {tipos.map(tipo => (
                                            <option key={tipo} value={tipo}>{tipo}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Título do anúncio *
                                    </label>
                                    <input
                                        type="text"
                                        name="titulo"
                                        placeholder="Título do anúncio"
                                        value={formData.titulo}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Marca e Material */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Marca
                                    </label>
                                    <input
                                        type="text"
                                        name="marca"
                                        placeholder="Marca da peça"
                                        value={formData.marca}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Material
                                    </label>
                                    <select
                                        name="material"
                                        value={formData.material}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                                    >
                                        <option value="">Selecione o material</option>
                                        {materiais.map(material => (
                                            <option key={material} value={material}>{material}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Tamanho e Estado */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tamanho *
                                    </label>
                                    <input
                                        type="text"
                                        name="tamanho"
                                        placeholder="Ex: P, M, G, 38, 42"
                                        value={formData.tamanho}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Estado de conservação *
                                    </label>
                                    <select
                                        name="estado"
                                        value={formData.estado}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                                    >
                                        <option value="">Selecione o estado</option>
                                        {estados.map(estado => (
                                            <option key={estado} value={estado}>{estado}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Preço e URL da imagem */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Preço (R$) *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        name="preco"
                                        placeholder="0,00"
                                        value={formData.preco}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        URL da imagem
                                    </label>
                                    <input
                                        type="text"
                                        name="imagem"
                                        placeholder="https://exemplo.com/imagem.jpg"
                                        value={formData.imagem}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Descrição */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Descrição
                                </label>
                                <textarea
                                    name="descricao"
                                    rows="5"
                                    placeholder="Descreva sua peça com detalhes..."
                                    value={formData.descricao}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
                                />
                            </div>

                            {/* Botões */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold transition-all duration-300 border border-gray-200"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Salvando...</span>
                                        </div>
                                    ) : (
                                        "Salvar alterações"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}