import { Client } from "faunadb";
// 1 - Criar conta no FaunaDB
// 2 - Criar um novo DB
// 3 - Ir em 'Security' e criar uma nova API key
// 4 - Salvar a API key em uma várialvel ambiente
// 5 - Criar uma nova collection
// ? - Criar um 'index' se quiser otimizar as buscas na collection
// 6 - Instalar o 'faunadb' no projeto
// 7 - Criar esse arquivo de conexão
// 8 - Utilizar o faunadb somente nas partes do projeto que rodem do lado do servidor
// (getServerSideProps, getStaticProps, Serveless functions)
export const fauna = new Client({
  secret: process.env.FAUNADB_KEY,
});
