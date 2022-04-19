const isValidForm = ( input = [] ) => {
  return !input.some( ( value ) => value === "" || value === null || value === undefined )
  
}
export default isValidForm


const formData = {
  name: "Emmanuel Lucius",
  hasValentine: "Emmanuel",
  age: "Emmanuel",
  hobbies: "Problem-solving",
  isStart: "Emmanuel",
}

isValidForm()

const response = Object.values( formData ).some( ( value ) => value === "" || value === null || value === undefined )

console.log( response )



const obj = {
  name: "Rasheed",
  surname: "Iskilu",
  fullName: function () {
    return this.name + this.surname
  },
  career: {
    developer: "Frontend Developer",
    others: "Graphic Design",
    headline: function () {
      return this.developer + this.others
    }
  }
}

const profile = obj.fullName.bind( obj )

console.log( profile() )


const array = ['a', 'b'];
const elements = [0, 1, 2];
array.push.apply( array, elements );
console.info( array ); // ["a", "b", 0, 1, 2]



function pash( elements ) {
  const array = ['a', 'b'];
  for ( let i = 0; i < array.length; i++ ) {
    array.push( ...elements );
  }
  return array
}
pash( [0, 1, 2] )