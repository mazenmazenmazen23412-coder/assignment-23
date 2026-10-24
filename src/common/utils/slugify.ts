export const slugify =(value:string)=>{
    return value
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g,"")
    .replace(/[^\s_-]/g,"")
    .replace(/^-+|-+$/g,"")
}