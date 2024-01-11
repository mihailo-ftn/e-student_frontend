import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Home = () => {

  const router = useRouter();
  const [{ data }] = useMeQuery();

  return (
    <>
      <div className="flex w-full h-screen bg-center bg-no-repeat bg-cover bg-bck">
        <div className="w-full h-screen bg-opacity-50 bg-black flex justify-center items-center">
          <div className="mx-4 text-center text-white">
            <h1 className="flex items-center justify-center font-bold text-4xl mb-4">
              Добродошли на студентску платформу Универзитета одбране
            </h1>
            <h2 className="flex items-center justify-center font-bold text-3xl mb-12">Изаберите начин пријављивања</h2>
            <div className="flex justify-center">
              <a
                href="/student/login"
                className="bg-red-500 w-48 rounded-md font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-red-600"
              >
                Студент
              </a>
              <a
                href="/professor/login"
                className="bg-blue-500 w-48 rounded-md font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 ml-2"
              >
                Професор
              </a>
              <a
                href="/admin/login"
                className="bg-white w-48 rounded-md font-bold text-black text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-gray-300 ml-2"
              >
                Студентска служба
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
