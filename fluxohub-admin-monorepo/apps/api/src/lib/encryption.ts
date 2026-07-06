import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

/**
 * A chave mestre precisa ter 32 bytes (256 bits).
 * Nunca expor o valor no código fonte. 
 */
const ENCRYPTION_KEY = process.env.MASTER_ENCRYPTION_KEY 
  ? Buffer.from(process.env.MASTER_ENCRYPTION_KEY, 'base64')
  : crypto.randomBytes(32); // Fallback para dev, chaves serão perdidas a cada restart!

const ALGORITHM = 'aes-256-gcm';

export const EncryptionService = {
  
  /**
   * Encripta objetos confidenciais em uma string formatada contendo o IV e AuthTag
   */
  encryptData(jsonData: Record<string, any>): string {
    const iv = randomBytes(16);
    const cipher = createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    
    let encrypted = cipher.update(JSON.stringify(jsonData), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag().toString('hex');
    
    // Retorna: IV:AuthTag:EncryptedData
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  },

  /**
   * Desencripta o payload mantendo a integridade (AuthTag evita alterações em trânsito)
   */
  decryptData(encryptedString: string): Record<string, any> {
    const parts = encryptedString.split(':');
    if (parts.length !== 3) throw new Error('Carga criptográfica corrompida.');

    const iv = Buffer.from(parts[0], 'hex');
    const authTag = Buffer.from(parts[1], 'hex');
    const encryptedText = parts[2];

    const decipher = createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  }
};
