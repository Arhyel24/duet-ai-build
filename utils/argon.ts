import argon2 from "argon2";

const hashOptions = {
  type: argon2.argon2id,
  memory: 2048,
  parallelism: 2,
  salt: Buffer.from(process.env.NEXTAUTH_SECRET as string, "utf8"),
};

const hashPassword = async (password: string): Promise<string> => {
  return await argon2.hash(password, hashOptions);
};

const verifyPassword = async (
  hashedPassword: string,
  password: string
): Promise<boolean> => {
  return await argon2.verify(hashedPassword, password, {
    secret: hashOptions.salt,
  });
};

export { hashPassword, verifyPassword };
