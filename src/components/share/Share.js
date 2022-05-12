import { Cancel, EmojiEmotions, Label, PermMedia, Room } from '@material-ui/icons'
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './Share.css'

export default function Share({ setPosts, posts }) {
    const { user } = useContext(AuthContext);
    const descriptionRef = useRef();
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [percent, setpercent] = useState(null);
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (imageFile !== null) {
            const metadata = {
                contentType: 'image/jpeg/jpg/png'
            };
            const name = Date.now() + imageFile.name;
            const storageRef = ref(storage, 'images/' + name);
            const uploadTask = uploadBytesResumable(storageRef, imageFile, metadata);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setpercent(progress);
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error.code);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUrl(downloadURL);
                    });
                }
            );
        }
        else if (description !== "")
            makeRequest();
    }

    const makeRequest = async () => {
        const newPost = {
            userId: user._id,
            description,
            image: imageUrl
        }
        try {
            const response = await axios.post('/posts/createPost', newPost, { withCredentials: true });
            setPosts([response.data, ...posts]);
            setDescription("");
            descriptionRef.current.value = "";
            setImageUrl("");
            setImageFile(null);
            setImageUrl("");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (imageUrl !== "")
            makeRequest();
    }, [imageUrl])

    return (
        <div className='shareContainer'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfile" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png" alt="profile" />
                    <input className="shareInput" ref={descriptionRef} placeholder={`Let your thoughts spread ${user.firstName}`} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <hr className="shareHr" />
                {
                    imageFile &&
                    <div className='imageFileContainer'>
                        <img className="imageFileImg" src={URL.createObjectURL(imageFile)} alt="Post" />
                        <Cancel className='cancelImage' onClick={() => setImageFile(null)} style={{ cursor: 'pointer' }} />
                    </div>
                }
                <form className="shareBottom" onSubmit={handleSubmit}>
                    <div className="shareOptions">
                        <label htmlFor="imageFiles" className="shareOption">
                            <PermMedia htmlColor="lime" className="shareOptionIcon" />
                            <span className="shareOptionText">Photo/Video</span>
                            <input style={{ display: 'none' }} type="file" name="imageFiles" id="imageFiles" accept='.png, .jpg, .jpeg' onChange={e => setImageFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="rgb(51, 153, 255)" className="shareOptionIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="tomato" className="shareOptionIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareOptionIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                        <button disabled={percent !== null && percent < 100} className="shareOptionButton" type="submit" >Share</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
