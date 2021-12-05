module.exports =(sequalize,DataTypes)=>{
    const FriendList= sequalize.define('FriendList', {
        // id:{
        //     type:DataTypes.UUID,
        //     defaultValue:DataTypes.UUIDV4,
        //     autoIncrement:true,
        //     primaryKey:true,
        //     allowNull:false,
        //     unique:true
        //  },
         
         status:{
             //false denotes pending reguest
             //true denotes friends
             type:DataTypes.BOOLEAN,
             defaultValue:false
         }
         //userId
         //friendId
    }, {
        timestamps: true
    });
    return FriendList;
}


