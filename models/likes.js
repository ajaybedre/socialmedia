
module.exports = (sequalize,DataTypes)=>{
    const Like= sequalize.define('Like', {

        // id:{
        //    type:DataTypes.UUID,
        //    defaultValue:DataTypes.UUIDV4,
        //    autoIncrement:true,
        //    primaryKey:true,
        //    allowNull:false,
        //    unique:true
        // }
        //userId
        //postId
    }, {
        timestamps: true
    });
    return Like;
}



