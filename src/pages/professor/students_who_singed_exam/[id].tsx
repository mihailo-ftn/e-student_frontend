import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { ProfessorNavigationBar } from "../../../components/professor/NavigationBar";
import { useStudentsWhoSingedExamQuery } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import NextLink from "next/link";

const StudentsWhoSinged = ({}) => {
  const router = useRouter();
  const id = router.query.id as any;
  const [{ data, error, fetching }] = useStudentsWhoSingedExamQuery({
    variables: {
      subjectID: id,
    },
  });
  let subject_name;
  {
    data?.studentsWhoSingedExam.map((sub) => {
      subject_name = sub.exam.subject.subjectName;
    });
  }
  return (
    <>
      <ProfessorNavigationBar />
      {data?.studentsWhoSingedExam.length !== 0 ? (
        <div>
          <h1 className="text-center text-3xl font-bold text-gray-600 mt-4">
            Студенти који су пријавили {subject_name}
          </h1>
          <div className="w-4/6 flex mt-10 ml-64 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-200">
                <tr>
                  <th
                    scope="col"
                    className="px-20 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Име и презиме студента
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                </tr>
              </thead>
              <tbody>
                {data?.studentsWhoSingedExam.map((s) => {
                  return (
                    <tr className="px-20 py-4 whitespace-nowrap text-sm text-gray-500">
                      <th scope="row" className="px-28 py-4 whitespace-nowrap text-sm text-gray-500">
                        {s.student?.firstName} {s.student?.lastName}
                      </th>
                      <NextLink href="/professor/sing_exam_results/[id]" as={`/professor/sing_exam_results/${s.id}`}>
                        <th scope="row" className="px-8 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="bg-gray-500 rounded-lg p-2 text-white" onClick={async () => {}}>
                            Унесите резултате испита
                          </button>
                        </th>
                      </NextLink>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h1 className="text-center text-3xl font-bold text-gray-600 mt-4">Нико није пријавио испит.</h1>
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(StudentsWhoSinged);
