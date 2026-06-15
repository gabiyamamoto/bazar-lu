import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Details() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [roupa, setRoupa] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        buscarRoupa();
    }, []);

    async function buscarRoupa() {
        setLoading(true);
        const { data } = await supabase
            .from("roupas")
            .select("*")
            .eq("id", id)
            .single();

        setRoupa(data);
        setLoading(false);
    }

    async function excluirRoupa() {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir esta peça? Esta ação não pode ser desfeita."
        );

        if (!confirmar) return;

        const { error } = await supabase
            .from("roupas")
            .delete()
            .eq("id", id);

        if (error) {
            console.error(error);
            alert("Erro ao excluir a peça.");
            return;
        }

        alert("✅ Peça excluída com sucesso!");
        navigate("/");
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <Header />
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!roupa) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <Header />
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Peça não encontrada</h2>
                    <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
                        Voltar para o início
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header />

            <main className="max-w-6xl mx-auto px-4 py-8">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Voltar
                </button>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8 p-6">
                        {/* Imagem */}
                        <div className="relative">
                            <img
                                src={roupa.imagem || "https://placehold.co/600x800"}
                                alt={roupa.titulo}
                                className="w-full rounded-xl object-cover shadow-lg"
                            />
                            <span className="absolute top-4 left-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                {roupa.tipo_peca}
                            </span>
                        </div>

                        {/* Informações */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-3">
                                {roupa.titulo}
                            </h1>

                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                    </svg>
                                    <span className="text-gray-600">Novo</span>
                                </div>
                            </div>

                            <div className="border-t border-b border-gray-100 py-4 my-4">
                                <div className="text-4xl font-bold text-indigo-600 mb-2">
                                    R$ {Number(roupa.preco).toFixed(2)}
                                </div>
                                <p className="text-gray-500 text-sm">
                                    em até 3x sem juros
                                </p>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-start gap-3">
                                    <span className="font-medium text-gray-700 w-24">Marca:</span>
                                    <span className="text-gray-600">{roupa.marca || "Não informada"}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="font-medium text-gray-700 w-24">Material:</span>
                                    <span className="text-gray-600">{roupa.material || "Não informado"}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="font-medium text-gray-700 w-24">Tamanho:</span>
                                    <span className="bg-gray-100 px-2 py-1 rounded text-gray-700 font-medium">
                                        {roupa.tamanho}
                                    </span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="font-medium text-gray-700 w-24">Estado:</span>
                                    <span className="text-green-600 font-medium">{roupa.estado}</span>
                                </div>
                            </div>

                            {roupa.descricao && (
                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-800 mb-2">Descrição</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {roupa.descricao}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-3">
                                <button
                                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02]"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 1.4a2 2 0 00.8 3.4h10.4a2 2 0 001.6-3.4L17 13M7 13h10" />
                                        </svg>
                                        Comprar agora
                                    </div>
                                </button>

                                <Link to={`/editar/${roupa.id}`}>
                                    <button className="w-full border-2 border-indigo-500 text-indigo-600 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-indigo-50">
                                        Editar anúncio
                                    </button>
                                </Link>

                                {/* Botão de excluir com cor mais suave e espaçamento adequado */}
                                <div className="pt-2">
                                    <button
                                        onClick={excluirRoupa}
                                        className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl font-semibold transition-all duration-300 border border-red-200"
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Excluir anúncio
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}