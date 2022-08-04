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
        repo = repo.filter(item => item.username === search)
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
        username: user.username,
        message: 'A new user has been created!'
    }
}

export const findId = (params: any) => {
    const user = ALL_USERS.find((u) => u.id === params)
    return {
        rows: user
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




// const ALL_USERS: User[] = [
//     {
//         "username": "username 1",
//         "email": "email 1",
//         "avatar": "avatar 1",
//         "password": "password 1",
//         "registeredAt": "registeredAt 1",
//         "id": "1"
//     },
//     {
//         "username": "username 2",
//         "email": "email 2",
//         "avatar": "avatar 2",
//         "password": "password 2",
//         "registeredAt": "registeredAt 2",
//         "id": "2"
//     },
//     {
//         "username": "username 3",
//         "email": "email 3",
//         "avatar": "avatar 3",
//         "password": "password 3",
//         "registeredAt": "registeredAt 3",
//         "id": "3"
//     },
//     {
//         "username": "username 4",
//         "email": "email 4",
//         "avatar": "avatar 4",
//         "password": "password 4",
//         "registeredAt": "registeredAt 4",
//         "id": "4"
//     },
//     {
//         "username": "username 5",
//         "email": "email 5",
//         "avatar": "avatar 5",
//         "password": "password 5",
//         "registeredAt": "registeredAt 5",
//         "id": "5"
//     },
//     {
//         "username": "username 6",
//         "email": "email 6",
//         "avatar": "avatar 6",
//         "password": "password 6",
//         "registeredAt": "registeredAt 6",
//         "id": "6"
//     },
//     {
//         "username": "username 7",
//         "email": "email 7",
//         "avatar": "avatar 7",
//         "password": "password 7",
//         "registeredAt": "registeredAt 7",
//         "id": "7"
//     },
//     {
//         "username": "username 8",
//         "email": "email 8",
//         "avatar": "avatar 8",
//         "password": "password 8",
//         "registeredAt": "registeredAt 8",
//         "id": "8"
//     },
//     {
//         "username": "username 9",
//         "email": "email 9",
//         "avatar": "avatar 9",
//         "password": "password 9",
//         "registeredAt": "registeredAt 9",
//         "id": "9"
//     },
//     {
//         "username": "username 10",
//         "email": "email 10",
//         "avatar": "avatar 10",
//         "password": "password 10",
//         "registeredAt": "registeredAt 10",
//         "id": "10"
//     },
//     {
//         "username": "username 11",
//         "email": "email 11",
//         "avatar": "avatar 11",
//         "password": "password 11",
//         "registeredAt": "registeredAt 11",
//         "id": "11"
//     },
//     {
//         "username": "username 12",
//         "email": "email 12",
//         "avatar": "avatar 12",
//         "password": "password 12",
//         "registeredAt": "registeredAt 12",
//         "id": "12"
//     },
//     {
//         "username": "username 13",
//         "email": "email 13",
//         "avatar": "avatar 13",
//         "password": "password 13",
//         "registeredAt": "registeredAt 13",
//         "id": "13"
//     },
//     {
//         "username": "username 14",
//         "email": "email 14",
//         "avatar": "avatar 14",
//         "password": "password 14",
//         "registeredAt": "registeredAt 14",
//         "id": "14"
//     },
//     {
//         "username": "username 15",
//         "email": "email 15",
//         "avatar": "avatar 15",
//         "password": "password 15",
//         "registeredAt": "registeredAt 15",
//         "id": "15"
//     },
//     {
//         "username": "username 16",
//         "email": "email 16",
//         "avatar": "avatar 16",
//         "password": "password 16",
//         "registeredAt": "registeredAt 16",
//         "id": "16"
//     },
//     {
//         "username": "username 17",
//         "email": "email 17",
//         "avatar": "avatar 17",
//         "password": "password 17",
//         "registeredAt": "registeredAt 17",
//         "id": "17"
//     },
//     {
//         "username": "username 18",
//         "email": "email 18",
//         "avatar": "avatar 18",
//         "password": "password 18",
//         "registeredAt": "registeredAt 18",
//         "id": "18"
//     },
//     {
//         "username": "username 19",
//         "email": "email 19",
//         "avatar": "avatar 19",
//         "password": "password 19",
//         "registeredAt": "registeredAt 19",
//         "id": "19"
//     },
//     {
//         "username": "username 20",
//         "email": "email 20",
//         "avatar": "avatar 20",
//         "password": "password 20",
//         "registeredAt": "registeredAt 20",
//         "id": "20"
//     },
//     {
//         "username": "username 21",
//         "email": "email 21",
//         "avatar": "avatar 21",
//         "password": "password 21",
//         "registeredAt": "registeredAt 21",
//         "id": "21"
//     },
//     {
//         "username": "username 22",
//         "email": "email 22",
//         "avatar": "avatar 22",
//         "password": "password 22",
//         "registeredAt": "registeredAt 22",
//         "id": "22"
//     },
//     {
//         "username": "username 23",
//         "email": "email 23",
//         "avatar": "avatar 23",
//         "password": "password 23",
//         "registeredAt": "registeredAt 23",
//         "id": "23"
//     },
//     {
//         "username": "username 24",
//         "email": "email 24",
//         "avatar": "avatar 24",
//         "password": "password 24",
//         "registeredAt": "registeredAt 24",
//         "id": "24"
//     },
//     {
//         "username": "username 25",
//         "email": "email 25",
//         "avatar": "avatar 25",
//         "password": "password 25",
//         "registeredAt": "registeredAt 25",
//         "id": "25"
//     },
//     {
//         "username": "username 26",
//         "email": "email 26",
//         "avatar": "avatar 26",
//         "password": "password 26",
//         "registeredAt": "registeredAt 26",
//         "id": "26"
//     },
//     {
//         "username": "username 27",
//         "email": "email 27",
//         "avatar": "avatar 27",
//         "password": "password 27",
//         "registeredAt": "registeredAt 27",
//         "id": "27"
//     },
//     {
//         "username": "username 28",
//         "email": "email 28",
//         "avatar": "avatar 28",
//         "password": "password 28",
//         "registeredAt": "registeredAt 28",
//         "id": "28"
//     },
//     {
//         "username": "username 29",
//         "email": "email 29",
//         "avatar": "avatar 29",
//         "password": "password 29",
//         "registeredAt": "registeredAt 29",
//         "id": "29"
//     },
//     {
//         "username": "username 30",
//         "email": "email 30",
//         "avatar": "avatar 30",
//         "password": "password 30",
//         "registeredAt": "registeredAt 30",
//         "id": "30"
//     },
//     {
//         "username": "username 31",
//         "email": "email 31",
//         "avatar": "avatar 31",
//         "password": "password 31",
//         "registeredAt": "registeredAt 31",
//         "id": "31"
//     },
//     {
//         "username": "username 32",
//         "email": "email 32",
//         "avatar": "avatar 32",
//         "password": "password 32",
//         "registeredAt": "registeredAt 32",
//         "id": "32"
//     },
//     {
//         "username": "username 33",
//         "email": "email 33",
//         "avatar": "avatar 33",
//         "password": "password 33",
//         "registeredAt": "registeredAt 33",
//         "id": "33"
//     },
//     {
//         "username": "username 34",
//         "email": "email 34",
//         "avatar": "avatar 34",
//         "password": "password 34",
//         "registeredAt": "registeredAt 34",
//         "id": "34"
//     },
//     {
//         "username": "username 35",
//         "email": "email 35",
//         "avatar": "avatar 35",
//         "password": "password 35",
//         "registeredAt": "registeredAt 35",
//         "id": "35"
//     },
//     {
//         "username": "username 36",
//         "email": "email 36",
//         "avatar": "avatar 36",
//         "password": "password 36",
//         "registeredAt": "registeredAt 36",
//         "id": "36"
//     },
//     {
//         "username": "username 37",
//         "email": "email 37",
//         "avatar": "avatar 37",
//         "password": "password 37",
//         "registeredAt": "registeredAt 37",
//         "id": "37"
//     },
//     {
//         "username": "username 38",
//         "email": "email 38",
//         "avatar": "avatar 38",
//         "password": "password 38",
//         "registeredAt": "registeredAt 38",
//         "id": "38"
//     },
//     {
//         "username": "username 39",
//         "email": "email 39",
//         "avatar": "avatar 39",
//         "password": "password 39",
//         "registeredAt": "registeredAt 39",
//         "id": "39"
//     },
//     {
//         "username": "username 40",
//         "email": "email 40",
//         "avatar": "avatar 40",
//         "password": "password 40",
//         "registeredAt": "registeredAt 40",
//         "id": "40"
//     },
//     {
//         "username": "username 41",
//         "email": "email 41",
//         "avatar": "avatar 41",
//         "password": "password 41",
//         "registeredAt": "registeredAt 41",
//         "id": "41"
//     },
//     {
//         "username": "username 42",
//         "email": "email 42",
//         "avatar": "avatar 42",
//         "password": "password 42",
//         "registeredAt": "registeredAt 42",
//         "id": "42"
//     },
//     {
//         "username": "username 43",
//         "email": "email 43",
//         "avatar": "avatar 43",
//         "password": "password 43",
//         "registeredAt": "registeredAt 43",
//         "id": "43"
//     },
//     {
//         "username": "username 44",
//         "email": "email 44",
//         "avatar": "avatar 44",
//         "password": "password 44",
//         "registeredAt": "registeredAt 44",
//         "id": "44"
//     },
//     {
//         "username": "username 45",
//         "email": "email 45",
//         "avatar": "avatar 45",
//         "password": "password 45",
//         "registeredAt": "registeredAt 45",
//         "id": "45"
//     },
//     {
//         "username": "username 46",
//         "email": "email 46",
//         "avatar": "avatar 46",
//         "password": "password 46",
//         "registeredAt": "registeredAt 46",
//         "id": "46"
//     },
//     {
//         "username": "username 47",
//         "email": "email 47",
//         "avatar": "avatar 47",
//         "password": "password 47",
//         "registeredAt": "registeredAt 47",
//         "id": "47"
//     },
//     {
//         "username": "username 48",
//         "email": "email 48",
//         "avatar": "avatar 48",
//         "password": "password 48",
//         "registeredAt": "registeredAt 48",
//         "id": "48"
//     },
//     {
//         "username": "username 49",
//         "email": "email 49",
//         "avatar": "avatar 49",
//         "password": "password 49",
//         "registeredAt": "registeredAt 49",
//         "id": "49"
//     },
//     {
//         "username": "username 50",
//         "email": "email 50",
//         "avatar": "avatar 50",
//         "password": "password 50",
//         "registeredAt": "registeredAt 50",
//         "id": "50"
//     },
//     {
//         "username": "username 51",
//         "email": "email 51",
//         "avatar": "avatar 51",
//         "password": "password 51",
//         "registeredAt": "registeredAt 51",
//         "id": "51"
//     },
//     {
//         "username": "username 52",
//         "email": "email 52",
//         "avatar": "avatar 52",
//         "password": "password 52",
//         "registeredAt": "registeredAt 52",
//         "id": "52"
//     },
//     {
//         "username": "username 53",
//         "email": "email 53",
//         "avatar": "avatar 53",
//         "password": "password 53",
//         "registeredAt": "registeredAt 53",
//         "id": "53"
//     },
//     {
//         "username": "username 54",
//         "email": "email 54",
//         "avatar": "avatar 54",
//         "password": "password 54",
//         "registeredAt": "registeredAt 54",
//         "id": "54"
//     },
//     {
//         "username": "username 55",
//         "email": "email 55",
//         "avatar": "avatar 55",
//         "password": "password 55",
//         "registeredAt": "registeredAt 55",
//         "id": "55"
//     },
//     {
//         "username": "username 56",
//         "email": "email 56",
//         "avatar": "avatar 56",
//         "password": "password 56",
//         "registeredAt": "registeredAt 56",
//         "id": "56"
//     },
//     {
//         "username": "username 57",
//         "email": "email 57",
//         "avatar": "avatar 57",
//         "password": "password 57",
//         "registeredAt": "registeredAt 57",
//         "id": "57"
//     },
//     {
//         "username": "username 58",
//         "email": "email 58",
//         "avatar": "avatar 58",
//         "password": "password 58",
//         "registeredAt": "registeredAt 58",
//         "id": "58"
//     },
//     {
//         "username": "username 59",
//         "email": "email 59",
//         "avatar": "avatar 59",
//         "password": "password 59",
//         "registeredAt": "registeredAt 59",
//         "id": "59"
//     },
//     {
//         "username": "username 60",
//         "email": "email 60",
//         "avatar": "avatar 60",
//         "password": "password 60",
//         "registeredAt": "registeredAt 60",
//         "id": "60"
//     },
//     {
//         "username": "username 61",
//         "email": "email 61",
//         "avatar": "avatar 61",
//         "password": "password 61",
//         "registeredAt": "registeredAt 61",
//         "id": "61"
//     },
//     {
//         "username": "username 62",
//         "email": "email 62",
//         "avatar": "avatar 62",
//         "password": "password 62",
//         "registeredAt": "registeredAt 62",
//         "id": "62"
//     },
//     {
//         "username": "username 63",
//         "email": "email 63",
//         "avatar": "avatar 63",
//         "password": "password 63",
//         "registeredAt": "registeredAt 63",
//         "id": "63"
//     },
//     {
//         "username": "username 64",
//         "email": "email 64",
//         "avatar": "avatar 64",
//         "password": "password 64",
//         "registeredAt": "registeredAt 64",
//         "id": "64"
//     },
//     {
//         "username": "username 65",
//         "email": "email 65",
//         "avatar": "avatar 65",
//         "password": "password 65",
//         "registeredAt": "registeredAt 65",
//         "id": "65"
//     },
//     {
//         "username": "username 66",
//         "email": "email 66",
//         "avatar": "avatar 66",
//         "password": "password 66",
//         "registeredAt": "registeredAt 66",
//         "id": "66"
//     },
//     {
//         "username": "username 67",
//         "email": "email 67",
//         "avatar": "avatar 67",
//         "password": "password 67",
//         "registeredAt": "registeredAt 67",
//         "id": "67"
//     },
//     {
//         "username": "username 68",
//         "email": "email 68",
//         "avatar": "avatar 68",
//         "password": "password 68",
//         "registeredAt": "registeredAt 68",
//         "id": "68"
//     },
//     {
//         "username": "username 69",
//         "email": "email 69",
//         "avatar": "avatar 69",
//         "password": "password 69",
//         "registeredAt": "registeredAt 69",
//         "id": "69"
//     },
//     {
//         "username": "username 70",
//         "email": "email 70",
//         "avatar": "avatar 70",
//         "password": "password 70",
//         "registeredAt": "registeredAt 70",
//         "id": "70"
//     },
//     {
//         "username": "username 71",
//         "email": "email 71",
//         "avatar": "avatar 71",
//         "password": "password 71",
//         "registeredAt": "registeredAt 71",
//         "id": "71"
//     },
//     {
//         "username": "username 72",
//         "email": "email 72",
//         "avatar": "avatar 72",
//         "password": "password 72",
//         "registeredAt": "registeredAt 72",
//         "id": "72"
//     },
//     {
//         "username": "username 73",
//         "email": "email 73",
//         "avatar": "avatar 73",
//         "password": "password 73",
//         "registeredAt": "registeredAt 73",
//         "id": "73"
//     },
//     {
//         "username": "username 74",
//         "email": "email 74",
//         "avatar": "avatar 74",
//         "password": "password 74",
//         "registeredAt": "registeredAt 74",
//         "id": "74"
//     },
//     {
//         "username": "username 75",
//         "email": "email 75",
//         "avatar": "avatar 75",
//         "password": "password 75",
//         "registeredAt": "registeredAt 75",
//         "id": "75"
//     },
//     {
//         "username": "username 76",
//         "email": "email 76",
//         "avatar": "avatar 76",
//         "password": "password 76",
//         "registeredAt": "registeredAt 76",
//         "id": "76"
//     },
//     {
//         "username": "username 77",
//         "email": "email 77",
//         "avatar": "avatar 77",
//         "password": "password 77",
//         "registeredAt": "registeredAt 77",
//         "id": "77"
//     },
//     {
//         "username": "username 78",
//         "email": "email 78",
//         "avatar": "avatar 78",
//         "password": "password 78",
//         "registeredAt": "registeredAt 78",
//         "id": "78"
//     },
//     {
//         "username": "username 79",
//         "email": "email 79",
//         "avatar": "avatar 79",
//         "password": "password 79",
//         "registeredAt": "registeredAt 79",
//         "id": "79"
//     },
//     {
//         "username": "username 80",
//         "email": "email 80",
//         "avatar": "avatar 80",
//         "password": "password 80",
//         "registeredAt": "registeredAt 80",
//         "id": "80"
//     },
//     {
//         "username": "username 81",
//         "email": "email 81",
//         "avatar": "avatar 81",
//         "password": "password 81",
//         "registeredAt": "registeredAt 81",
//         "id": "81"
//     },
//     {
//         "username": "username 82",
//         "email": "email 82",
//         "avatar": "avatar 82",
//         "password": "password 82",
//         "registeredAt": "registeredAt 82",
//         "id": "82"
//     },
//     {
//         "username": "username 83",
//         "email": "email 83",
//         "avatar": "avatar 83",
//         "password": "password 83",
//         "registeredAt": "registeredAt 83",
//         "id": "83"
//     },
//     {
//         "username": "username 84",
//         "email": "email 84",
//         "avatar": "avatar 84",
//         "password": "password 84",
//         "registeredAt": "registeredAt 84",
//         "id": "84"
//     },
//     {
//         "username": "username 85",
//         "email": "email 85",
//         "avatar": "avatar 85",
//         "password": "password 85",
//         "registeredAt": "registeredAt 85",
//         "id": "85"
//     },
//     {
//         "username": "username 86",
//         "email": "email 86",
//         "avatar": "avatar 86",
//         "password": "password 86",
//         "registeredAt": "registeredAt 86",
//         "id": "86"
//     },
//     {
//         "username": "username 87",
//         "email": "email 87",
//         "avatar": "avatar 87",
//         "password": "password 87",
//         "registeredAt": "registeredAt 87",
//         "id": "87"
//     },
//     {
//         "username": "username 88",
//         "email": "email 88",
//         "avatar": "avatar 88",
//         "password": "password 88",
//         "registeredAt": "registeredAt 88",
//         "id": "88"
//     },
//     {
//         "username": "username 89",
//         "email": "email 89",
//         "avatar": "avatar 89",
//         "password": "password 89",
//         "registeredAt": "registeredAt 89",
//         "id": "89"
//     },
//     {
//         "username": "username 90",
//         "email": "email 90",
//         "avatar": "avatar 90",
//         "password": "password 90",
//         "registeredAt": "registeredAt 90",
//         "id": "90"
//     },
//     {
//         "username": "username 91",
//         "email": "email 91",
//         "avatar": "avatar 91",
//         "password": "password 91",
//         "registeredAt": "registeredAt 91",
//         "id": "91"
//     },
//     {
//         "username": "username 92",
//         "email": "email 92",
//         "avatar": "avatar 92",
//         "password": "password 92",
//         "registeredAt": "registeredAt 92",
//         "id": "92"
//     },
//     {
//         "username": "username 93",
//         "email": "email 93",
//         "avatar": "avatar 93",
//         "password": "password 93",
//         "registeredAt": "registeredAt 93",
//         "id": "93"
//     },
//     {
//         "username": "username 94",
//         "email": "email 94",
//         "avatar": "avatar 94",
//         "password": "password 94",
//         "registeredAt": "registeredAt 94",
//         "id": "94"
//     },
//     {
//         "username": "username 95",
//         "email": "email 95",
//         "avatar": "avatar 95",
//         "password": "password 95",
//         "registeredAt": "registeredAt 95",
//         "id": "95"
//     },
//     {
//         "username": "username 96",
//         "email": "email 96",
//         "avatar": "avatar 96",
//         "password": "password 96",
//         "registeredAt": "registeredAt 96",
//         "id": "96"
//     },
//     {
//         "username": "username 97",
//         "email": "email 97",
//         "avatar": "avatar 97",
//         "password": "password 97",
//         "registeredAt": "registeredAt 97",
//         "id": "97"
//     },
//     {
//         "username": "username 98",
//         "email": "email 98",
//         "avatar": "avatar 98",
//         "password": "password 98",
//         "registeredAt": "registeredAt 98",
//         "id": "98"
//     },
//     {
//         "username": "username 99",
//         "email": "email 99",
//         "avatar": "avatar 99",
//         "password": "password 99",
//         "registeredAt": "registeredAt 99",
//         "id": "99"
//     },
//     {
//         "username": "username 100",
//         "email": "email 100",
//         "avatar": "avatar 100",
//         "password": "password 100",
//         "registeredAt": "registeredAt 100",
//         "id": "100"
//     }
// ];