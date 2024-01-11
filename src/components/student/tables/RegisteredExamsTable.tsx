import { useRouter } from "next/router";
import React from "react";
import {
  useDeregisterMutation,
  useRegisteredExamsQuery,
} from "../../../generated/graphql";

export const RegisteredExamsTable = () => {
  const router = useRouter();
  const [{ data, error, fetching }] = useRegisteredExamsQuery();
  const [, deregister] = useDeregisterMutation();

  return (
    <>
      {data ? (
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
                      >
                        Испитни наставник
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data?.registeredExams.length !== 0 ? (
                      data?.registeredExams.map((e) => {
                        return (
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {e.exam.subject.subjectName}
                              </div>
                            </td>
                            <td className="px-8 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {e.exam.subject.type}
                              </div>
                            </td>
                            <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                              {e.exam.subject.espp}
                            </td>
                            <td className="px-10 py-4 whitespace-nowrap text-sm text-gray-500">
                              {e.exam.date.split("T")[0]}
                            </td>
                            <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                              {e.exam.subject.professor.firstName}{" "}
                              {e.exam.subject.professor.lastName}
                            </td>
                            <td className="px-8 py-4 whitespace-nowrap text-sm text-white">
                              <button
                                className="bg-gray-500 rounded-lg p-2"
                                onClick={async () => {
                                  try {
                                    const result = await deregister({
                                      examID: e.exam.id,
                                    });
                                  } finally {
                                    window.location.reload();
                                  }
                                }}
                              >
                                Одјави испит
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <div className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                        {/* {" "}
                      Сви испити из овог рока су већ {" "}
                      <a
                        className="cursor-pointer text-cyan-600"
                        onClick={() => {
                          router.push("/registered-exams");
                        }}
                      >
                        пријављени
                      </a>{" "}
                      или {" "}
                      <a
                        className="cursor-pointer text-cyan-600"
                        onClick={() => {
                          router.push("/passed_exams");
                        }}
                      >
                        положени
                      </a> */}
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
          Немате пријављених испита, то можете урадити &nbsp;{" "}
          <a
            className="cursor-pointer text-cyan-600"
            onClick={() => {
              router.push("/student/next_examination_period");
            }}
          >
            овде.
          </a>{" "}
        </div>
      )}
    </>
  );
};
