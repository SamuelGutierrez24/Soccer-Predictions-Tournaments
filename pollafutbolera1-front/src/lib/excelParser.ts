import * as XLSX from 'xlsx';
import { User } from '../interfaces/user.interface';
export interface ImportedUser {
  username: string;
  email: string;
  userId: string;
}

export async function parseExcelToEmails(
  file: File
): Promise<ImportedUser[]> {  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet);
  
  return rows.map((row:any) => ({
    username: row['Nombre Completo'] || row['nombre'] || '',
    email: row['Correo'] || row['email'] || '',
    userId: row['id'] || row['identificacion'] || 'General'
  }));
}