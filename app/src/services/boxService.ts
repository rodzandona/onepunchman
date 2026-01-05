import { apiFetch } from "@/services/http/apiFetch";

export async function criarBox() {
  const response = await apiFetch("/boxes", {
    method: "POST",
  });

  return response.json();
}

export async function adicionarProduto(
  boxId: number,
  codigoBarras: string
) {
  const response = await apiFetch(`/boxes/${boxId}/produtos`, {
    method: "POST",
    body: JSON.stringify({ codigoBarras }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Erro ao adicionar produto");
  }
}

export async function fecharBox(boxId: number) {
  const response = await apiFetch(`/boxes/${boxId}/fechar`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Erro ao fechar box");
  }
}
