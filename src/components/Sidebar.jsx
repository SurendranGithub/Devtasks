import { Link, useLocation } from 'react-router-dom';


const Sidebar = () => {
    const location = useLocation();
    const linkClass = (path) =>
        `block py-2 px-4 rounded ${location.pathname === path
            ? 'text-blue-700 dark:text-white'
            : 'text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
        }`;

    return (
        <aside className="w-60 bg-white dark:bg-gray-800 shadow-lg p-4">
            <h1 className="text-2xl font-bold text-primary mb-6">DevTasks</h1>
            <nav>
                <Link to="/" className={linkClass('/')}>
                    Dashboard
                </Link>
                <Link to="/calendar" className={linkClass('/calendar')}>
                    Calendar
                </Link>
                <Link to="/settings" className={linkClass('/settings')}>
                    Settings
                </Link>
            </nav>
        </aside>
    );
};

export default Sidebar;
