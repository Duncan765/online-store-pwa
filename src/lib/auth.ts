import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const result = await sql`
          SELECT * FROM admins WHERE username = ${credentials.username as string}
        `;

        const admin = result.rows[0];

        if (!admin) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          admin.password_hash
        );

        if (!isValidPassword) {
          return null;
        }

        return {
          id: admin.id.toString(),
          name: admin.username,
        };
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnLogin = nextUrl.pathname === '/admin/login';

      if (isOnAdmin && !isOnLogin) {
        if (!isLoggedIn) return false;
        return true;
      }

      return true;
    }
  }
});
