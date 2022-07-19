import bcrypt from "bcrypt";
export const generateHash = async(string) =>{
    try{
        const salt = await bcrypt.genSalt(+process.env.SALT_ROUND);
        return await bcrypt.hash(string+"",salt);
    }catch(err){
        throw new Error(err);
    }
}

export const hashMatch = async(string,hash) =>{
    const match = await bcrypt.compare(string, hash);
    return match;
}