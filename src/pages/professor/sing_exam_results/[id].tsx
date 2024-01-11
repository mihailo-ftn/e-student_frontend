import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ProfessorNavigationBar } from "../../../components/professor/NavigationBar";
import {
  useExamRecordFromIdQuery,
  useRegisterExamMutation,
  useRegisterPassedExamMutation,
  useStudentsWhoSingedExamQuery,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

const RegisterPassedExam = () => {
  const router = useRouter();
  const id = router.query.id as any;
  const [{ data, error, fetching }] = useExamRecordFromIdQuery({
    variables: {
      id,
    },
  });
  const [, registerPassedExam] = useRegisterPassedExamMutation();
  const [points, setPoints] = useState("");
  const [result, setResult] = useState<any>();
  let body = null;
  if (result?.data) {
    body = (
      <div className="alert flex  flex-row items-center bg-green-200 p-5 rounded border-b-2 border-green-300">
        <div className="alert-icon flex items-center bg-green-100 border-2 border-green-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
          <span className="text-green-500">
            <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </div>
        <div className="alert-content ml-4">
          <div className="alert-title font-semibold text-lg text-green-800">
            Успешно сте унели податке о испиту
          </div>
        </div>
      </div>
    );
    setInterval(()=>{
      router.push('/professor/registered_exams')
    },2000)
  } else if (result?.error) {
    body = (
      <div className="alert flex flex-row items-center bg-red-200 p-5 rounded border-b-2 border-red-300">
        <div className="alert-icon flex items-center bg-red-100 border-2 border-red-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
          <span className="text-red-500">
            <svg fill="currentColor" viewBox="0 0 20 20" className="h-6 w-6">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </div>
        <div className="alert-content ml-4">
          <div className="alert-title font-semibold text-lg text-red-800">
            Грешка при уносу података
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <ProfessorNavigationBar />
      {body}
      <div className="h-full">
        <div className="container mx-auto">
          <div className="inputs w-full max-w-2xl p-6 mx-auto">
            <h2 className="text-2xl text-gray-900">
              Унесите податке о протеклом испиту
            </h2>
            <form className="mt-6 border-t border-gray-400 pt-4">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-full px-3 mb-6">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    назив испита
                  </label>
                  <label
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    id="grid-text-1"
                  >
                    {data?.ExamRecordFromId.exam.subject.subjectName}
                  </label>
                </div>
                <div className="w-full md:w-full px-3 mb-6 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    поени
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    id="grid-text-1"
                    // type={"number"}
                    value={points}
                    onChange={(e) => {
                      e.preventDefault();
                      setPoints(e.target.value);
                    }}
                    placeholder="Унеси број поена"
                  />
                </div>
                <div className="w-full md:w-full px-3 mb-6 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    име студента
                  </label>
                  <label
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    id="grid-text-1"
                  >
                    {data?.ExamRecordFromId.student?.firstName}
                  </label>
                </div>
                <div className="w-full md:w-full px-3 mb-6 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    презиме студента
                  </label>
                  <label
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    id="grid-text-1"
                  >
                    {data?.ExamRecordFromId.student?.lastName}
                  </label>
                </div>
                <div className="w-full md:w-full px-3 mb-6 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    број индекса студента
                  </label>
                  <label
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    id="grid-text-1"
                  >
                    {data?.ExamRecordFromId.student?.brind}
                  </label>
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      const result = await registerPassedExam({
                        id: data?.ExamRecordFromId.id as any,
                        points: parseFloat(points),
                      });
                      setResult(result);
                    }}
                    className="appearance-none mt-4 w-48 bg-gray-200 text-gray-900 px-2 py-1 shadow-sm border border-gray-400 rounded-md "
                  >
                    Унеси
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(RegisterPassedExam);
