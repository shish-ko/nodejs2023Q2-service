import * as bcrypt from 'bcryptjs';

export const getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(+process.env.CRYPT_SALT);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
