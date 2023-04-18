import bycrpt from "bcrypt";





export const bycrptPassword =async function (password){
    try {
        const salt = await bycrpt.genSalt(10)
        const hash = await bycrpt.hash(password,salt);
        return hash
    } catch (err){
        throw err
    }

}
