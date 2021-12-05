module.exports = (sequalize,DataTypes)=>{
    const Comment= sequalize.define('Comment', {
    
        // id:{
        //     type:DataTypes.UUID,
        //     defaultValue:DataTypes.UUIDV4,
        //     autoIncrement:true,
        //     primaryKey:true,
        //     allowNull:false,
        //     unique:true
        // },
        comment:{
            type:DataTypes.STRING
        }
        //userId
        //postId
    }, {
        timestamps: true
    });
    return Comment;
}



