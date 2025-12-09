import message from '../models/message.model.js';
import { User } from '../models/user.model.js';

export const getUsersForSidebar = async (req, res) => {

    try {
        const LoggedInUserId = req.user._id;
        const users = await User.find({ _id: { $ne: LoggedInUserId } }).select('fullName email profilePicture');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getmessages = async (req, res) => {
    try{
    const { id:userToChatId } = req.params;
    const senderId= req.user._id;
    const messages= await message.find({
        $or:[
            {senderId: senderId, receiverId: userToChatId},
            {senderId: userToChatId, receiverId: senderId},
        ]
    })
    res.status(200).json(messages);
}catch(error){
    res.status(500).json({ message: 'Server error' });
}

};

export const sendMessage = async (req, res) => {
        try{
    const { id:receiverId } = req.params;
    const senderId= req.user._id;
    const {text,image}= req.body;

    let imageUrl;
    if (image) {
        const uploadResult = await cloudinary.uploader.upload(image, {
            folder: 'messages',
        });
        imageUrl = uploadResult.secure_url;
    }
    const newMessage= new message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
}catch(error){
    res.status(500).json({ message: 'Server error' });
        }
};