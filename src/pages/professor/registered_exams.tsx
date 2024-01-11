import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { useExamsFromCurrentExamPeriodQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from 'next/link'
import { ProfessorNavigationBar } from "../../components/professor/NavigationBar";

const RegisteredExams = ({}) => {
  const [{ data, error, fetching }] = useExamsFromCurrentExamPeriodQuery();
  const router = useRouter();

  return (
    <>
      <ProfessorNavigationBar />
      <h1 className="text-center text-2xl font-bold text-gray-600 mt-4">
          Ваши испити у текућем року
      </h1>
      {data && data.examsFromCurrentExamPeriod.length != 0 ? (
        <div className="flex flex-col mt-10 px-20">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
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
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Датум полагања
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data?.examsFromCurrentExamPeriod.length !== 0 ? (
                      data?.examsFromCurrentExamPeriod.map((e) => {
                        return (
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {e.subject.subjectName}
                              </div>
                            </td>
                            <td className="px-8 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {e.subject.type === "REQUIRED" ? "ОБАВЕЗНИ" : "ИЗБОРНИ"}
                              </div>
                            </td>
                            <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                              {e.subject.espp}
                            </td>
                            <td className="px-10 py-4 whitespace-nowrap text-sm text-gray-500">
                              {e.date.split("T")[0]}
                            </td>
                            <td className="px-8 py-4 whitespace-nowrap text-sm text-white">
                             <NextLink href="/professor/students_who_singed_exam/[id]" as={`/professor/students_who_singed_exam/${e.subject.id}`}>
                              <button
                                className="bg-gray-500 rounded-lg p-2"
                                onClick={async () => {
                                  
                                }}
                              >
                                Унесите резултате испита 
                              </button>
                              </NextLink>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <div className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                        
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-12 px-8 py-4 whitespace-nowrap text-md text-gray-500">
          {" "}
          Тренутно нема исптних рокова. &nbsp;{" "}
          {/* <a
            className="cursor-pointer text-cyan-600"
            onClick={() => {
              router.push("/next_examination_period");
            }}
          >
            овде.
          </a>{" "} */}
        </div>
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(RegisteredExams);
