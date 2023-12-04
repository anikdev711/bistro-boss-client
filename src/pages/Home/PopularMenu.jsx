// import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useMenu from "../../hooks/useMenu";
import MenuItem from "../Shared/MenuItem/MenuItem";


const PopularMenu = () => {

    // const [menu, setMenu] = useState([]);

    // useEffect(() => {
    //     fetch('/menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             const popularItem = data.filter(item => item.category === 'popular')
    //             setMenu(popularItem)
    //         })
    // }, [])

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <section className="mb-12">
            <SectionTitle
                heading="FROM OUR MENU"
                subHeading="Check it out"></SectionTitle>
            <div className="grid md:grid-cols-2 gap-10">
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}></MenuItem>)
                }
            </div>
            <div className="flex justify-center items-center mt-10">
                <button className="btn btn-outline border-0 border-b-4">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;