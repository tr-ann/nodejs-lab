import bcrypt from 'bcrypt'

class Hash {
    get(data) {
        return bcrypt.hashSync(data, 10)
    }

    async compare(data, hash) {
        return await bcrypt.compare(data, hash)
    }
}

export default new Hash()