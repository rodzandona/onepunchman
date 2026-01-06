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
  }, 1000); // timeout 

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
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
