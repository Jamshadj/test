import mongoose from 'mongoose';
const hostSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number
        
    },
    googleId: {
        type: String,
        allowNull: true
    },
    loginWithGoogle: {
        type: Boolean,
        default: false
    },
    password:{
        type:String,
        required:true
    },
    blocked: {
        type: Boolean,
        default:false
    },
    image: {
        type: Object,
    },
    wallet: {
        type: Number,
        default:0
    },
    balance: {
        type: Number,
        default:0
    }

    
})

const HostModel=mongoose.model('hostDetails',hostSchema)
export default HostModel;