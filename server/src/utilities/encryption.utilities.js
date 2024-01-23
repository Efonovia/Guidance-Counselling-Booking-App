import crypto from 'crypto'

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.createHash('sha256').update(password + salt).digest('hex');
  return { salt, hash };
}

export function verifyPassword(password, salt, storedHash) {
  const hash = crypto.createHash('sha256').update(password + salt).digest('hex');
  return hash === storedHash;
}

// Example usage
// const userPassword = 'user123';
// const { salt, hash } = hashPassword(userPassword);

// console.log('Salt:', salt);
// console.log('Hash:', hash);

// const isPasswordValid = verifyPassword(userPassword, salt, hash);
// console.log('Is Password Valid:', isPasswordValid);
