export default function Settings() {


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Configurações</h1>
      <p className="text-gray-600 mb-8">
        Aqui você pode ajustar as configurações do aplicativo.
      </p>

      <button className="w-full bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition shadow">
        Salvar Configurações
      </button>

      <button className="w-full border border-red-300 text-red-600 py-3 rounded-xl font-medium hover:bg-red-50 transition">
        Sair da Conta
      </button>
    </div>
  );
}