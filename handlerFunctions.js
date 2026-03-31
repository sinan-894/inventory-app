
const getTodayDate = ()=>{
    return new Date().toISOString().split('T')[0]
}

const genratePlaceHolder = (n)=>{
   let placeHolder = '' 
   for(let i = 1;i<=n;i++){
        placeHolder+=`$${i},`
   } 
   return placeHolder.slice(0,-1)
}

const genrateUpdatePlaceHolder = (schema,n)=>{
    const columns = Object.keys(schema)
    return columns.reduce((placeHolder,column,index)=>placeHolder + `${column}=$${index+1},`,'').slice(0,-1)
}

module.exports = {
    getTodayDate,
    genratePlaceHolder,
    genrateUpdatePlaceHolder,
}