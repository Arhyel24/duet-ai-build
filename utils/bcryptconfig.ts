import bcryptjs from "bcryptjs";

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);

  return await bcryptjs.hash(password, salt);
};

const verifyPassword = async (
  hashedPassword: string,
  password: string
): Promise<boolean> => {
  return await bcryptjs.compare(password, hashedPassword);
};

export { hashPassword, verifyPassword };
