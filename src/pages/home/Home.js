import './Home.css';
import Navbar from '../../components/navbar/Navbar';
import Leftbar from '../../components/leftbar/Leftbar';
import Rightbar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="homeContainer">
                <div className="Leftbar">
                    <Leftbar />
                </div>
                <div className="Feed">
                    <Feed />
                </div>
                <div className="Rightbar">
                    <Rightbar />
                </div>
            </div>
        </>
    )
}
