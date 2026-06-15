import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CreateClothing() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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

    const tipos = [
        "Camiseta", "Calça", "Vestido", "Jaqueta",
        "Moletom", "Saia", "Shorts", "Outro"
    ];

    const estados = [
        "Novo", "Como novo", "Excelente", "Bom", "Regular", "Com defeito"
    ];

    const materiais = [
        "Algodão", "Poliéster", "Linho", "Jeans", "Lã",
        "Viscose", "Couro", "Moletom", "Outro"
    ];

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from("roupas")
            .insert([formData]);

        if (error) {
            console.error(error);
            alert("Erro ao cadastrar peça");
            setLoading(false);
            return;
        }

        alert("✅ Peça cadastrada com sucesso!");
        navigate("/");
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
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
                            <h1 className="text-3xl font-bold text-white">
                                Publicar nova peça
                            </h1>
                            <p className="text-indigo-100 text-sm mt-1">
                                Preencha os dados abaixo para anunciar sua peça
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Tipo da peça e Título - 2 colunas */}
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
                                        placeholder="Ex: Camiseta branca de algodão"
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

                            {/* Descrição - largura total */}
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

                            {/* Botão submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Cadastrando...</span>
                                    </div>
                                ) : (
                                    "Publicar peça"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}