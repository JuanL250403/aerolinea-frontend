import { jwtDecode } from "jwt-decode"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {},
                password: {}
            },

            async authorize(credentials) {
                const response = await fetch("http://localhost:8080/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        usuario: credentials.username,
                        contrasenia: credentials.password
                    })
                })

                const data = await response.json()

                if (!response.ok) return console.log(response)

                const dataJWT = jwtDecode(data.authToken)
                
                return {
                    usuario: dataJWT.sub,
                    rol: dataJWT.rol,
                    token: data.authToken
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.usuario = user.usuario
                token.rol = user.rol
                token.accessToken = user.token
            }

            return token
        },

        async session({ session, token }) {
            session.user.usuario = token.usuario
            session.user.rol = token.rol
            session.accessToken = token.accessToken

            return session
        }
    },

    session: {
        strategy: "jwt"
    },

    secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }