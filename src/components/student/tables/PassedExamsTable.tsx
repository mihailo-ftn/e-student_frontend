import React from "react";
import {
  useAverageGradeQuery,
  useEspbQuery,
  usePassedExamsQuery,
} from "../../../generated/graphql";

export const PassedExamsTable = () => {
  const [{ data, fetching, error }] = usePassedExamsQuery();
  // if (data! && fetching) {
  //   return <div>Ucitavam</div>;
  // }
  const [{ data: avg }] = useAverageGradeQuery();
  // if (avg! && fetching) {
  //   return <div>Ucitavam</div>;
  // }
  const [{ data: espb }] = useEspbQuery();

  return (
    <>
      {data?.passedExams.length !== 0 ? (
        <div className="flex flex-col mt-16 px-20">
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
                        Поени
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Оцена
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
                        Рок
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
                        Потписао наставник
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {data?.passedExams.map((e) => {
                      return (
                        <tr className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              {e.exam.subject.subjectName}
                            </div>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {e.exam.subject.type === "REQUIRED" ? "OBAVEZNI" : "IZBORNI"}
                            </div>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            {e.points}
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {e.grade.value}
                            </span>
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            {e.exam.subject.espp}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {e.exam.examinationPeriod?.name}
                          </td>
                          <td className="px-10 py-4 whitespace-nowrap text-sm text-gray-500">
                            {e.exam.date.split("T")[0]}
                          </td>
                          <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                            {e.exam.subject.professor.firstName}{" "}
                            {e.exam.subject.professor.lastName}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  {avg?.averageGrade && espb?.sumESPP ? (
                    <tbody>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        Просечна оцена : {avg?.averageGrade}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        Укупно ЕСПБ : {espb?.sumESPP}
                      </td>
                    </tbody>
                  ) : null}
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-12 px-8 py-4 whitespace-nowrap text-md text-gray-500">
          {" "}
          Нисте положили ниједан испит
        </div>
      )}
    </>
  );
};
