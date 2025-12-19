import { api } from "./http/httpClient";
import type { Box } from "@/types/box.type"; 

export interface SendExcelPayload {
  email: string;
  boxes: Box[];
}

export async function sendExcel(payload: SendExcelPayload) {
  const formatted = {
    email: payload.email,
    boxes: payload.boxes.map(b => ({
      box: b.BoxCode,
      products: b.Products
    }))
  };

  return api.post("/export/send-excel", formatted);
}