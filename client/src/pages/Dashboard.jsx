import Profile from '../sections/dashboard/Profile';
import DiscordServers from '../sections/dashboard/DiscordServers';
import TelegramGroups from '../sections/dashboard/TelegramGroups';

const Dashboard = () => {
    return (
        <div className='flex flex-col justify-between min-h-screen'>
            <Profile />

            <DiscordServers />

            <TelegramGroups />
        </div>
    );
};

export default Dashboard;