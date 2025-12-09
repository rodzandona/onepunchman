export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Início</h1>
      <p className="text-gray-600 mb-8">
        Bem-vindo ao aplicativo! Este é o conteúdo da página inicial.
      </p>
      
      <div className="space-y-4">
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">Item 1</h2>
          <p className="text-gray-500">Descrição do item 1</p>
        </div>
      </div>
    </div>
  );
}