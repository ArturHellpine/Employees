import {User} from "@prisma/client";

export type ErrorWithMessage = {
    status: number
    data: {
        message: string
    }
}

export type RegisterData = Omit<User, 'id'> & {confirmPassword: string}