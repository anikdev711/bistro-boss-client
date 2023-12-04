import SectionTitle from "../../components/SectionTitle/SectionTitle";
import featuredImage from "../../assets/home/featured.jpg"
import './Featured.css'


const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-10">
            <SectionTitle
                heading="FROM OUR MENU"
                subHeading="Check it out"></SectionTitle>
            <div className="flex justify-center items-center bg-slate-500 bg-opacity-60 py-8 px-16">
                <div>
                    <img src={featuredImage} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20, 2023</p>
                    <p className="uppercase">WHERE CAN I GET SOME?</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.
                    </p>
                    <button className="btn btn-outline border-0 border-b-4">Order now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;