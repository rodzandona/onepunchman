// src/services/boxService.ts

const API_URL = import.meta.env.VITE_API_URL;
export async function criarBox() {
  const response = await fetch(`${API_URL}/api/boxes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao criar box");
  }

  return response.json() as Promise<{ id: number }>;
}

export async function adicionarProduto(
  boxId: number,
  codigoBarras: string
) {
  const response = await fetch(
    `${API_URL}/api/boxes/${boxId}/produtos`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(codigoBarras),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
}

export async function fecharBox(boxId: number) {
  const response = await fetch(
    `${API_URL}/api/boxes/${boxId}/fechar`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao fechar box");
  }
}
