import { withUrqlClient } from "next-urql";
import grbUniverziteta from "../../public/grbuniverziteta.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../utils/createUrqlClient";





// ADD MODULE TO SUBJECT
//
//
//
//
//
//
//



const PleaseLogin = () => {
    const router = useRouter();
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
        <div className="max-w-md">
          <p className="text-2xl md:text-3xl font-light leading-normal">
            Ниста пријављени.{" "}
          </p>
          <p className="mb-4">
            Без бриге то можете урадити нашој почетној страници.
          </p>

          <button 
          onClick={()=>{
              router.push("/")
          }}
          className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
            назад на почетну
          </button>
        </div>
        <div className="max-w-lg -mt-10 h-32">
          <Image
            src={grbUniverziteta}
            alt="Workflow"
            height={120}
            width={150}
          />
        </div>
      </div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(PleaseLogin);
