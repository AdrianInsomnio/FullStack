module.exports = (sequelize , type)=>{
    return sequelize.define( 'operacion',{
        id:{
            type : type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        concepto: type.STRING,
        monto:{
            type:type.INTEGER
        },
        tipo : type.STRING
    })
}