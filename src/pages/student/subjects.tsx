import { withUrqlClient } from "next-urql";
import React from "react";
import { NavigationBar } from "../../components/student/NavigationBar";
import { useStudentsSubjectsQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Subjects = () => {
  const [{ data, error, fetching }] = useStudentsSubjectsQuery();

  return (
    <>
      <NavigationBar />
      <h1 className="text-center text-3xl font-bold text-gray-600 mt-10 mb-10">
        Предмети
      </h1>
      <div className="w-4/6 flex ml-64 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Назив предмета
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Тип пријаве
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ЕСПБ
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.studentsSubjects.map((s) => {
              return (
                <tr className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                  <th
                    scope="row"
                    className="px-8 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {s.subjectName}
                  </th>
                  <td className="px-8 py-4">
                    {s.type === "REQUIRED" ? "OBAVEZNI" : "IZBORNI"}
                  </td>
                  <td className="px-8 py-4">{s.espp}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Subjects);
