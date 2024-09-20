import { v4 as uuidv4 } from 'uuid';

function generateShortId(length: number): string {
    const id = uuidv4().replace(/-/g, ''); // Remove os hífens do UUID
    return id.substring(0, length); // Retorna os primeiros 'length' caracteres
  }

  export default {
    generateShortId
  }