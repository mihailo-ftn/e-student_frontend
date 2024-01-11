import { useRouter } from "next/router";
import React from "react";
import {
  useExamsFromExaminationPeriodQuery,
  useMeQuery,
  useRegisterExamMutation,
} from "../../../generated/graphql";

export const NextExaminationPeriodTable = () => {
  const router = useRouter();
  const [{ data, error, fetching }] = useExamsFromExaminationPeriodQuery();
  console.log(data);
  const [, registerExam] = useRegisterExamMutation();
  const [{ data: student }] = useMeQuery();
  let buttonDisplay = true;
  return (
    <>
      {data ? (
        <>
          <h1 className="text-center text-3xl font-bold text-gray-600 mt-4">
            {data?.examsFromExaminationPeriod.name}
          </h1>
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
                      {data?.examsFromExaminationPeriod.exams.length !== 0 ? (
                        data?.examsFromExaminationPeriod.exams.map((e) => {
                          if (student?.me) {
                            if (
                              e.examRecord?.singed  &&
                              e.examRecord?.studentID?.includes(
                                student?.me.id as any
                              )
                            ) {
                              buttonDisplay = false;
                            }

                          }
                          return (
                            <tr className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center">
                                  {e.subject.subjectName}
                                </div>
                              </td>
                              <td className="px-8 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {e.subject.type === "REQUIRED" ? "OBAVEZNI" : "IZBORNI"}
                                </div>
                              </td>
                              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                                {e.subject.espp}
                              </td>
                              <td className="px-10 py-4 whitespace-nowrap text-sm text-gray-500">
                                {e.date.split("T")[0]}
                              </td>
                              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                                {e.subject.professor.firstName}{" "}
                                {e.subject.professor.lastName}
                              </td>
                              <td className="px-8 py-4 whitespace-nowrap text-sm text-white">
                                {buttonDisplay ? (
                                  <button
                                    className="bg-gray-500 rounded-lg p-2"
                                    onClick={async () => {
                                      try{
                                      await registerExam({
                                        examID: e.id as any,
                                      });
                                    }finally{
                                      window.location.reload()
                                    }
                                    }}
                                  >
                                    Пријави испит
                                  </button>
                                ) : (
                                  <div className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {" "}
                                    Испит је пријављен{" "}
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <div className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                          {" "}
                          Сви испити из овог рока су већ{" "}
                          <a
                            className="cursor-pointer text-cyan-600"
                            onClick={() => {
                              router.push("/registered-exams");
                            }}
                          >
                            пријављени
                          </a>{" "}
                          или{" "}
                          <a
                            className="cursor-pointer text-cyan-600"
                            onClick={() => {
                              router.push("/passed_exams");
                            }}
                          >
                            положени
                          </a>
                        </div>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-center text-xl font-bold text-gray-600 mt-6">
          Тренутно нема испитних рокова или сте све ипите већ пријавили или
          положили
        </h1>
      )}
    </>
  );
};
