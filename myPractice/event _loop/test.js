const thenable = {
    then: function(onFulfilled)  {
        // onError('hello')
        console.log(arguments)
    },
    catch: function(onError) {
        console.log(arguments)
    }
}
const data = thenable.then(data => console.log(data))
console.log('data', data)
// .catch(err => console.log(err))