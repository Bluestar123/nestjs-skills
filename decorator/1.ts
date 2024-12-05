const obj: Record<string, any> = {a: 1}

console.log(Reflect.get(obj, 'a'))

Reflect.set(obj, 'b', 2)

console.log(obj.b)