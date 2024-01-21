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
            <a href="/admin/create-student" className="bg-gray-800 w-72 text-white rounded-md p-3 block text-center">
              Направи студента
            </a>
          </div>
          <div>
            <button
              className="bg-gray-800 w-72 text-white rounded-md p-3"
              onClick={() => {
                router.push("/admin/create-class");
              }}
            >
              Додај генерацију
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
            <a href="/admin/create-subject" className="bg-gray-800 w-72 text-white rounded-md p-3 block text-center">
              Направи предмет
            </a>
          </div>
          <div>
            <button
              className="bg-gray-800 w-72 text-white rounded-md p-3"
              onClick={() => {
                router.push("/admin/create-professor");
              }}
            >
              Направи професора
            </button>
          </div>
          <div>
            <a
              href="/admin/create-examination-period"
              className="bg-gray-800 w-72 text-white rounded-md p-3 block text-center"
            >
              Направи испитни рок
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
