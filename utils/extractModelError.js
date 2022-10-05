const extractModelError = (error) => {
    try {
        return Object.entries(error.errors)[0][1].message
    } catch {
        return "Something Wen't Wrong"
    }
}
module.exports = extractModelError;