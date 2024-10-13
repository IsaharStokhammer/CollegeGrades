import bcrypt from 'bcrypt'


export const createNewPassword = async(password : string):Promise<string> => {
    const hashedPasword = await bcrypt.hash(password, 10);
    return hashedPasword;
}
export const authorization = (role: string, user : any) : boolean => {
    if (role != user.role) {
        return false
    }
    return true
}