const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem("token");
}

export async function criarBox() {
  const response = await fetch(`${API_URL}/api/boxes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) throw new Error("Erro ao criar box");
  return response.json();
}

export async function adicionarProduto(boxId: number, codigoBarras: string) {
  const response = await fetch(
    `${API_URL}/api/boxes/${boxId}/produtos`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ codigoBarras }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Erro ao adicionar produto");
  }
}

export async function fecharBox(boxId: number) {
  const response = await fetch(
    `${API_URL}/api/boxes/${boxId}/fechar`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!response.ok) throw new Error("Erro ao fechar box");
}
