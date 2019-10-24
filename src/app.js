import { fetchData } from './fetchdata';
import { GraphQLServer} from 'graphql-yoga';


const url = 'https://swapi.co/api/people/';

const runApp = data => {

  const typeDefs = `
  type Query{

    people(page:Int!,number:Int!,name:String,gender:String): [Personaje!]!
    character(id:Int!):Personaje
  } 

  type Personaje{

    name: String!
    gender:String!
    url:String!
    films:[String]
  }
  `
  
  const resolvers = {
    Query: {

      //Function Query people
      people(parent, args, ctx, info){

        const page = args.page || 1;
        const number = args.number || 20;
        let start = number*(page-1);
        let finish = start + number;

        if(args.name){

            const listname = data.filter(element => element.name == args.name);
            const array = listname.slice(start, finish);

            return array.map(character => {
                return {
                  name: character.name,
                  gender: character.gender,
                  url: character.url,
                }   
            });

            

        }else if(args.gender){

            const listgender = data.filter(element => element.gender == args.gender);
            const array = listgender.slice(start, finish);
            return array.map(character => {
                return {
                  name: character.name,
                  gender: character.gender,
                  url: character.url,
                } 
            });

        }else{

            const array = data.slice(start, finish);
            return array.map(character => {
                return {
                    
                    name: character.name,
                    gender: character.gender,
                    url: character.url,
                }   
            });
        }

      },

      character(parent, args, ctx, info){

        

        const page =  1;
        const number =  88;
        let start = number*(page-1);
        let finish = start + number;

        const array = data.slice(start, finish);

        let charac = [];

        array.forEach((elem,index) =>{

          if(index === args.id){

             charac = elem;

          }

        });

        return charac.map(character => {
          return {
              
              name: character.name,
              gender: character.gender,
              url: character.url,
          }   
      });




      }
      
    }
}

  const server = new GraphQLServer({typeDefs, resolvers})
  server.start({port: "3006"})
};
// main program

fetchData(runApp,url);

