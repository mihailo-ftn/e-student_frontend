import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { AdminNavigationBar } from "../../components/admin/NavigationBar";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Home = ({}) => {
  const router = useRouter();
  return (
    <>
      <AdminNavigationBar />
      <h1 className="text-center text-3xl font-bold text-gray-600 mt-10">АДМИН ПАНЕЛ</h1>
      <div className="flex justify-center items-center">
        <div className="grid content-center grid-cols-1 gap-4 mt-4 p-5">
          <div>
            <button
              onClick={() => {
                router.push("/admin/create-student");
              }}
              className="bg-gray-800 w-72 text-white rounded-md p-3"
            >
              Направи студента
            </button>
          </div>
          <div>
            <button
              className="bg-gray-800 w-72 text-white rounded-md p-3"
              onClick={() => {
                router.push("/admin/create-class");
              }}
            >
              Направи класу
            </button>
          </div>
          <div>
            <button
              className="bg-gray-800 w-72 text-white rounded-md p-3"
              onClick={() => {
                router.push("/admin/create-modul");
              }}
            >
              Направи модул
            </button>
          </div>
          <div>
            <button
              className="bg-gray-800 w-72 text-white rounded-md p-3"
              onClick={() => {
                router.push("/admin/create-subject");
              }}
            >
              Направи предмет
            </button>
          </div>
          <div>
            <button className="bg-gray-800 w-72 text-white rounded-md p-3">Направи професора</button>
          </div>
          <div>
            <button
              className="bg-gray-800 w-72 text-white rounded-md p-3"
              onClick={() => {
                router.push("/admin/create-examination-period");
              }}
            >
              Направи испитни рок
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
