import { faker } from '@faker-js/faker'

interface User {
    id: string
    username: string
    email: string
    avatar: string
    password: string
    registeredAt: string
}
function createRandomUser(): User {
    return {
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        registeredAt: faker.date.past().toString(),
    }
}

const ALL_USERS: User[] = []
Array.from({ length: 100 }).forEach(() => ALL_USERS.push(createRandomUser()))

export const list = (params: any) => {
    const {
        page = 1,
        limit = 10,
        search = ''
    } = params

    let repo = ALL_USERS
    if (search) {
        repo = repo.filter(item => item.username === search || page )
    }

    const skip = (page - 1) * limit // = 0 
    const totalPages = Math.ceil(repo.length / limit) // = 10
    const result: any[] = repo.slice(skip, skip + limit - 1) // = (0, 0 + 10 -1)

    return {
        rows: result,
        page,
        limit,
        total: result.length,
        totalPages
    }
}

export const create = (params: User) => {
    const user = {
        ...params,
        id: faker.datatype.uuid()
    }
    ALL_USERS.push(user)

    return {
        id: user.id,
        message: 'A new user has been created!'
    }
}

export const update = (params: User) => {
    const user = ALL_USERS.find(u => u.id === params.id) as User
    // if (!user) {}
    // TODO check if not found User
    Object.assign(user, params)
    return {
        id: user.id,
        message: 'A user has been updated!'
    }
}

export const remove = (id: string) => {
    const index = ALL_USERS.findIndex(u => u.id === id)
    // if (index === -1) {}
    // TODO handle user not found
    const removedItems = ALL_USERS.splice(index, 1)
    return {
        id: [removedItems[0].id],
        message: 'User has been removed!'
    }
}