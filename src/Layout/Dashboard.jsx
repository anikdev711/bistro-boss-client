import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaListAlt, FaMoneyBill, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart();
    // const isAdmin = true;
    const [isAdmin] = useAdmin();
    return (
        <div className="flex">

            {/* Navbar part  */}

            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/admin-home">
                                    <FaHome></FaHome>
                                    Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/add-items">
                                    <FaUtensils />
                                    Add Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-items">
                                    <FaListAlt></FaListAlt>
                                    Manage Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-bookings">
                                    <FaBook></FaBook>
                                    Manage Bookings
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/all-users">
                                    <FaUsers></FaUsers>
                                    All Users
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink to="/dashboard/bookings">
                                    <FaList></FaList>
                                    My Booking
                                </NavLink>
                            </li> */}
                            <div className="divider"></div>
                            <li>
                                <NavLink to="/">
                                    <FaHome></FaHome>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/order/salad">
                                    <FaSearch></FaSearch>
                                    Menu
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/order/contact">
                                    <FaEnvelope></FaEnvelope>
                                    Contact
                                </NavLink>
                            </li>
                        </>
                            :
                            <>


                                <li>
                                    <NavLink to="/dashboard/user-home">
                                        <FaHome></FaHome>
                                        User Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation">
                                        <FaCalendar></FaCalendar>
                                        Reservation
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/history">
                                        <FaCalendar></FaCalendar>
                                         History 
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/payment">
                                        <FaMoneyBill></FaMoneyBill>
                                        Payment 
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart ({cart.length})
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review">
                                        <FaAd></FaAd>
                                        Add Review
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <FaList></FaList>
                                        My Booking
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/payment-history">
                                        <FaList></FaList>
                                        Payment Real History
                                    </NavLink>
                                </li>
                                <div className="divider"></div>
                                <li>
                                    <NavLink to="/">
                                        <FaHome></FaHome>
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/order/salad">
                                        <FaSearch></FaSearch>
                                        Menu
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/order/contact">
                                        <FaEnvelope></FaEnvelope>
                                        Contact
                                    </NavLink>
                                </li>
                            </>
                    }

                </ul>
            </div>

            {/* outlet part  */}

            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;