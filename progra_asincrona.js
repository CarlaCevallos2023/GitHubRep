/*
//....... 1. Cree una función llamada EsperandoRespuesta que tome un argumento en ms(milisegundo) y retorne una promesa que se resuelva después de ms milisegundos.Dentro de la promesa, simplemente use setTimeout para resolver después del tiempo especificado.

const esperandoRespuesta = (ms) =>{
    return new Promise((res) =>{
        setTimeout(() =>{
            res({

            })
        }, 0 | Math.random()*5000);
    })
 
}

esperandoRespuesta()
    .then(()=>{
        console.log('La promesa se resolvió en 5 segundos')

    })
    .catch()

//....... 2. Cree tres instancias de la función EsperandoRespuesta con diferentes tiempos de retraso (por ejemplo, 2000 ms, 3000 ms y 1500 ms). Almacene estas promesas en variables llamadas promise1, promise2 y promise3.

const promise1 = esperandoRespuesta(2000)
const promise2 = esperandoRespuesta(3000)
const promise3 = esperandoRespuesta(1500)

Promise.all([promise1, promise2, promise3])
    .then(() =>{
        console.log('Todas las promesas han sido resueltas')
    })
    .catch()

//....... 3. Utilice las promesas promise1, promise2 y promise 3 para realizar las siguientes tareas una vez que se resuelvan: Cuando promise1 se resuelva, muestre en la consola "¡Promesa 1 resuelta!", cuando promise2 se resuelva, muestre en la consola "¡Promesa 2 resuelta!", cuando promise3 se resuelva, muestre en la consola "¡Promesa 3 resuelta!".

promise1.then(() =>{
    console.log('¡Promesa 1 resuelta')
})

promise2.then(() =>{
    console.log('¡Promesa 2 resuelta')
})

promise3.then(() =>{
    console.log('¡Promesa 3 resuelta')
})
*/
const datosPersonales = [
    { //0
        ci: 123,
        nombre: 'juan',
        apellido: 'perez',
        edad: 22,
        sexo:'M',
        estado: 'soltero',
        email: 'juan.perez@gmail.com',
    },
    { //1
        ci: 456,
        nombre: 'maria',
        apellido: 'lopez',
        edad: 18,
        sexo:'F',
        estado: 'casada',
        email: 'maria.lopez@gmail.com',
    },
    {
        ci: 789,
        nombre: 'carlos',
        apellido: 'gonzales',
        edad: 25,
        sexo:'M',
        estado: 'soltero',
        email: 'carlos.gonzales@gmail.com',
    }

];

const usuarios = [
    {
        id: 1,
        username: 123,
        password: '123',
    },
    {
        id: 2,
        username: 456,
        password: '456',
    },
    {
        id: 3,
        username: 789,
        password: '789',
    },
    {
        id: 4,
        username: 2023,
        password: '2023',
    }
];
console.log(datosPersonales);
console.log(usuarios);

console.log('------------------------------');

const getDatosPersonales = (ci) => {
    return new Promise ((resolve, reject) => {

        setTimeout(() =>{
            datosPersonales.find((persona) =>{
                if(persona.ci === ci){
                    const {ci, apellido, nombre, email} = persona;
                    resolve({ci, apellido, nombre, email});
                }
            })
            reject('Error. No existe datos personales')
        }, Math.random()*3000);


        
    });
}
/*
getDatosPersonales(123)
    .then((resp) =>{
        console.log(resp)
    })
    .catch((err) =>{
        console.error(err)
    })
*/

const getUsuario = (usuario, clave) =>{
    const regex = /^[a-zA-Z0-9]/;
    if(!regex.test(clave))
        Promise.reject('Err. El password no cumple con los datos específicos')

        return new Promise ((resolve,reject)=>{
            setTimeout(()=>{
                usuarios.find((user)=>{
                    if(user.username === usuario){
                        resolve(user)
                    }
                });
                reject('Err. El usuario no está registrado');
            }, Math.random()*3000);
        })
}


/*
const login = (usuario, clave) =>{
    getUsuario(usuario, clave)
        .then((resp)=>{
            if(resp.password === clave){
                //console.log('usuario logueado')
                return getDatosPersonales(usuario);
            }    
            else{
                throw new Error('Err. clave incorrecta');
                //console.error('Err, clave erronea')
            }
        })
        .then((resp)=>{
            console.log(`Nombres: ${resp.nombre} ${resp.apellido}\nUsuario: ${resp.ci}`)

        })
        .catch((err)=>{
            console.error(err)
        })

}

login(123,'123'); */

// TRY  CATCH
/*
try {
    const a = 12;
    const d = 0;
    if(d===0)
        throw new Error('No se puede dividir por 0')
    console.log(`el resultado es ${a/d}`) 
} catch (error) {
    console.log(`El error es: ${error}`)   
}finally{
    this.user = null;
    console.log(`Esto se ejecuta siempre`)
} */

// ASYNC - AWAIT
const login = async (usuario, clave) =>{
    try {
        const usuarioResp = await getUsuario(usuario, clave);
        if(usuarioResp.password !== clave)
            throw new Error(`Err. clave incorrecta`)
        const datosPersonalesResp = await getDatosPersonales(usuario);
        console.log(`Nombres: ${datosPersonalesResp.nombre} ${datosPersonalesResp.apellido}\nUsuario: ${datosPersonalesResp.ci}`)
    } catch (error) {
        console.error(error)
    } finally{
        usuarioResp = null;
        console.log(usuarioResp)
    }
}