import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IndexCard } from "../../components/IndexCard";
import { IndexSideCard } from "../../components/IndexSideCard";
import { ProfessorNavigationBar } from "../../components/professor/NavigationBar";
import { useCreatePostMutation, useGetAllPostsQuery, useImportantQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const ProfessorHome = ({}) => {
  const [important, setImportant] = useState(false);
  const [text, setText] = useState("");
  const [{ data }] = useGetAllPostsQuery();
  const [, createPost] = useCreatePostMutation();
  const [{ data: special }] = useImportantQuery();
  const router = useRouter();
  return (
    <>
      <ProfessorNavigationBar />
      <div className="flex justify-center h-screen px-4 text-gray-700">
        <div className="flex w-full max-w-screen-lg">
          <div className="flex flex-col w-64 py-4 pr-3">
            <a
              onClick={() => {
                router.push("/professor/registered_exams");
              }}
              className="px-3 py-2 mt-2 text-lg font-medium rounded-md hover:bg-gray-300"
              href="#"
            >
              Испити из текућег рока
            </a>
            <a
              onClick={() => {
                router.push("/professor/create");
              }}
              className="px-3 py-2 mt-2 text-lg font-medium rounded-md hover:bg-gray-300"
              href="#"
            >
              Креирај испит
            </a>
            <a
              onClick={() => {
                router.push("/professor/subjects");
              }}
              className="px-3 py-2 mt-2 text-lg font-medium rounded-md hover:bg-gray-300"
              href="#"
            >
              Предмети
            </a>
            <a className="px-3 py-2 mt-2 text-lg font-medium rounded-md hover:bg-gray-300" href="#">
              Универзитет
            </a>
            <a className="flex px-3 py-2 mt-2 mt-auto text-lg rounded-md font-medium hover:bg-gray-200" href="#"></a>
          </div>
          <div className="flex flex-col flex-grow border-l border-r border-gray-300">
            <div className="flex justify-between flex-shrink-0 px-8 py-4 border-b border-gray-300">
              <h1 className="text-xl font-semibold">Обавештења</h1>
            </div>
            <div className="flex-grow h-0 overflow-auto">
              <div className="flex w-full p-8 border-b-4 border-gray-300">
                <span className="flex-shrink-0 w-12 h-12 bg-gray-400 rounded-full"></span>
                <div className="flex flex-col flex-grow ml-4">
                  <textarea
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                    className="p-3 bg-transparent border resize-none border-gray-500 rounded-md"
                    name=""
                    id=""
                    rows={3}
                    placeholder="Унесите текст новог обавештења"
                  ></textarea>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => {
                        setImportant(!important);
                      }}
                      className="flex items-center h-8 px-3 text-xs rounded-md hover:bg-gray-200"
                    >
                      {" "}
                      Важно
                    </button>
                    <button
                      onClick={async () => {
                        await createPost({
                          input: {
                            creationDate: new Date(),
                            text: text,
                            important: important,
                          },
                        });
                        setImportant(!important);
                        window.location.reload();
                      }}
                      className="flex items-center h-8 px-3 text-xs rounded-md bg-gray-300 hover:bg-gray-400"
                    >
                      Објави
                    </button>
                  </div>
                </div>
              </div>
              {data?.getAllPosts.map((post) => {
                return <IndexCard post={post} />;
              })}
            </div>
          </div>
          <div className="flex flex-col flex-shrink-0 w-1/4 py-4 pl-4">
            <input
              className="flex items-center h-8 px-2 border border-gray-500 rounded-md"
              type="search"
              placeholder="Search…"
            />
            <div>
              <h3 className="mt-6 font-semibold">Популарно</h3>
              {special?.getImportant.map((post) => {
                return <IndexSideCard post={post} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(ProfessorHome);
