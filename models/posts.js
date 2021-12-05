module.exports = (sequalize,DataTypes)=>{
    const Post = sequalize.define('Post', {

        // id:{
        //     type:DataTypes.INTEGER,
        //     // defaultValue:DataTypes.UUIDV4,
        //     autoIncrement:true,
        //     primaryKey:true
        // },
        caption:{
            type:DataTypes.STRING
        },
        data:{
            type:DataTypes.STRING
        }
        //userId
    }, {
        timestamps: true
    });
    // sequalize.sync()
    // console.log(Post);
    return Post;
}



