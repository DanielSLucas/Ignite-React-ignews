import { query as q } from "faunadb";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { fauna } from "../../../services/fauna";

export default NextAuth({  
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,      
    }),    
  ],
  callbacks: {
    async session({ session }) {            
      try {
        const userActiveSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  "ref",
                  q.Get(
                    q.Match(
                      q.Index('user_by_email'),
                      q.Casefold(session.user.email),
                    ),
                  ),
                ),
              ),
              q.Match(
                q.Index('subscription_by_status'),
                "active"
              ),
            ]),
          ),
        );          

        return {
          ...session,
          activeSubscription: userActiveSubscription,
        }
      } catch (err) {        
        return {
          ...session,
          activeSubscription: null,
        }
      }
    },
    async signIn({ user, }) {            
      const { email } = user;

      try {
        // Cria o usuário se ele não existir, 
        // caso contrário retorna o existente
        await fauna.query(
          q.If(
            // condition
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            // true
            q.Create(
              q.Collection('users'),
              { data: { email }}
            ),
            // false
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        );

        return true;
      } catch (error) {
        return false;
      }

      
    },
  }
})