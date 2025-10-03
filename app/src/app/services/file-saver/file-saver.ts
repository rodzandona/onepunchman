import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileSaverService {
  generateExcel(products: string[], box?: string): Blob {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      products.map((p, i) => ({
        Produto: p,
        Ordem: i + 1,
      }))
    );

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Produtos');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });

    saveAs(blob, `caixa_${box || 'sem_codigo'}.xlsx`);
    return blob; // 🔹 devolve o arquivo, caso queira mandar por API/email
  }
}
