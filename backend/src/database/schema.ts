import { Client } from 'pg';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { createAdmin } from './createAdmin';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: true })
  first_name: string;

  @Column('varchar', { nullable: true })
  last_name: string;

  @Column('date', { nullable: true })
  birth_date: Date;

  @Column('varchar', { nullable: true })
  about: string;

  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Column('varchar', { nullable: true })
  phone: string;

  @Column('varchar', { nullable: true })
  avatar: string;

  @CreateDateColumn({ type: 'timestamp',  default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp',  default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @Column('text', { array: true })
  images: string[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column()
  author_id: number;

  @Column()
  author_name: string;
}

export async function createSchema() {
  const client = new Client({
    user: 'admin',
    host: 'postgres',
    database: 'project_db',
    password: '12345',
    port: 5432,
  });

  try {
    await client.connect();
    console.log('Connected database');

    const { rows: tables } = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );

    console.log('Наши табилцы:', tables);

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        birth_date DATE,
        about TEXT,
        email VARCHAR(100) NOT NULL UNIQUE,
        phone VARCHAR(20),
        avatar TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        images TEXT[],
        author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        author_name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('таблицы созданы успешно');

    const { rows: currentTables } = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );

    console.log('Наши табилцы теперь:', currentTables);

    const { rows: users } = await client.query(
      'SELECT id FROM users WHERE id = 1 LIMIT 1'
    );

    if (users.length === 0) {
      await createAdmin(client);
      console.log('создали админа');
    }
    
  } catch (error) {
    console.error('Error creating database schema:', error);
    throw error;
  } finally {
    await client.end();
  }
}

if (require.main === module) {
  createSchema()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
