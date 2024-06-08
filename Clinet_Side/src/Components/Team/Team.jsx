import Navbar from "../Navbar/Navbar";

const Team = () => {
    return (
        <div>
            <Navbar></Navbar>
            <h1 className="text-3xl text-center font-bold p-4">Team Members</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 container mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <img className="w-24 h-24 rounded-full mx-auto mb-4" src={'https://scontent.fjsr17-1.fna.fbcdn.net/v/t39.30808-1/412285399_804278565045439_6909440542137519216_n.jpg?stp=dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFsgOjB5TsVev8tB2B31L7wK4b5_u2-QZorhvn-7b5BmqVuKfz3fnZMJTiDTj9G5W7CF4P9Fa9nOU5YgdJ0ZJYx&_nc_ohc=WV4jOdL2fEgQ7kNvgGtoXb-&_nc_ht=scontent.fjsr17-1.fna&oh=00_AfCDyQyNSLM8KU0sim9tzWEA59nObi_7YQoWdjfj-PRx4A&oe=663CA5B5'} alt={`Profile of`} />
                    <h2 className="text-xl font-semibold text-center">Sheikh Shadi</h2>
                    <p className="text-gray-600 text-center">FullStack</p>
                    <button className="flex justify-center mt-4 space-x-4">
                        {<a href='https://www.facebook.com/shaadi07' className="text-gray-400 hover:text-blue-500"><i className="uil uil-facebook-alt"></i></a>}
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <img className="w-24 h-24 rounded-full mx-auto mb-4" src={'https://scontent.fjsr17-1.fna.fbcdn.net/v/t39.30808-1/385481255_331511299432559_3030067950027253913_n.jpg?stp=c132.137.882.882a_dst-jpg_s160x160&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFdWds18wllmWmR2CTVsyPXIXWTHXXBnQEhdZMddcGdAeTKo1z2vNN27iLPq35Mqd7bi25A5MZRZJCVqHBNRbhS&_nc_ohc=Ht5A7JWkvvsQ7kNvgGxFPAB&_nc_ht=scontent.fjsr17-1.fna&oh=00_AfD1Lc4iB02a2wJAB_ilnIXIu-EBasnKr5BPgwncL8zgfw&oe=663CACE5'} alt={`Profile of`} />
                    <h2 className="text-xl font-semibold text-center">Tamjid Bond</h2>
                    <p className="text-gray-600 text-center">FullStack</p>
                    <div className="flex justify-center mt-4 space-x-4">
                        {<a href='https://www.facebook.com/TamjidBond/' className="text-gray-400 hover:text-blue-500"><i className="uil uil-facebook-alt"></i></a>}
                    </div>
                </div>


                <div className="bg-white rounded-lg shadow-md p-6">
                    <img className="w-24 h-24 rounded-full mx-auto mb-4" src={'https://scontent.fjsr17-1.fna.fbcdn.net/v/t39.30808-1/395780875_1388320332037890_7606283701295817477_n.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEvi-jos1zMkEVYaKHQlAWGNXFaQrFSL341cVpCsVIvfppGjSo9P8igUTTtb2vn2DwtwkLN_KJiU_qSInO3OoJV&_nc_ohc=r0RxGk1eqpUQ7kNvgFy0Qd8&_nc_ht=scontent.fjsr17-1.fna&oh=00_AfCtk7rRRG1oBhvPIkH9JUXUjm8-jSAzDRGXiANW0El2xQ&oe=663CB470'} alt={`Profile of`} />
                    <h2 className="text-xl font-semibold text-center">Shuvro Joty Sarker</h2>
                    <p className="text-gray-600 text-center">FullStack</p>
                </div>
            </div>
        </div>
    );
};

export default Team;
