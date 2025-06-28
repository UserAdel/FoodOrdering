
import landingImage from "../assets/landing.png"
import appDownladImage from "../assets/appDownload.png"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import { useNavigate } from "react-router-dom"

export default function () {
    const navigate=useNavigate()

    const handelFormSubmit=(searchFormValues:SearchForm)=>{
        navigate({
            pathname:`/resturants/${searchFormValues.searchQuery}`,
        })
    }
    return (
        <div className='flex flex-col gap-12'>
            <div className="md:px-32 px-10 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold tracking-tight text-orange-600"> Tuck into a takeaway today</h1>
                <span className="text-xl">Food is just a click away</span>
                <SearchBar searchQuery="" placeHolder="Search by city of town" onSubmit={handelFormSubmit} onReset={()=>{}}/>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img draggable="false"  src={landingImage} />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                <span className="font-bold text-3xl tracking-tighter">
                    Order takeaway even faster!
                </span>
                <span className='text-gray-500'>Downlad the mernEats App for faster ordering and personlised recomendations</span>
                <img draggable="false" src={appDownladImage} />
                </div>
            </div>
        </div>
    )
}
