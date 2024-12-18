console.clear()

class Greeting {
    english() {return "Hello"}
    spanish() {return "hola"}
}


class MoreGreeting {
    french() {return "Bonjour"}
    german() {return "halo"}
}

const greeting = new Greeting()
const moreGreeting = new MoreGreeting()

// how to combine acess to both class?

const allGreet = new Proxy(moreGreeting, {
    get: function(target, property) {
        // terget is jus point to moreGreetibg
        // prop is actually string name that we want to access
        // console.log(property)
        return target[property] || greeting[property]
    }
})

console.log(allGreet.english())