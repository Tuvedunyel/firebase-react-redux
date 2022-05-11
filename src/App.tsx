import {FC} from 'react';
import ConnectModal from "./Components/CommectModal";

const App: FC = () => {
    return (
        <div>
            <div className="app-header">
                <ConnectModal />
            </div>
            <div className="posts-container"></div>
        </div>
    );
};

export default App;
