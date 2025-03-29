export const createAdmin = async (client) => {
  await client.query(`
    INSERT INTO users (first_name, last_name, birth_date, about, email, phone, avatar)
    VALUES ('Admin1', 'Admin2', '1985-06-15', 'Administrator', 'admin@example.com', '1234567890', '')
  `);
};