import { NavLink } from 'react-router-dom'
import { MdOutlineDashboard } from 'react-icons/md'
import { FiUsers } from 'react-icons/fi'

const links = [
    {
        title: 'Overview',
        url: '/',
        icon: <MdOutlineDashboard size={15} />
    },
];

function SideNav() {
    const activeClassName = 'bg-blue-900 flex flex-row text-white items-center text-sm p-3 my-1 font-extrabold rounded-lg';
    const defaultClassName = 'hover:bg-blue-50 hover:text-black flex flex-row items-center hover:font-extrabold text-black text-sm font-extrabold p-3 my-1 rounded-lg';


    return (
        <div className='w-52 z-40 bg-white h-full fixed px-3 border-r-2'>
            <div className='mt-7'>
                <div className='pt-7 flex flex-col'>
                    {
                        links.map((link, index) => (
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? activeClassName : defaultClassName
                                }
                                key={index}
                                to={link.url}
                                end={link.title === 'User' ? false : true}
                            >
                                {link.title}
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SideNav;