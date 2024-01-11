import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ProfessorNavigationBar } from "../../../components/professor/NavigationBar";
import { useAddExamMutation, useCurrentExPeriodQuery, useGetSubjectQuery } from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

const CreateExam = () => {
  const router = useRouter();
  const id = router.query.id as any;
  const [{ data }] = useCurrentExPeriodQuery();
  const [date, setDate] = useState("");
  const [{data: subject}] = useGetSubjectQuery({
    variables:{
      id: id
    }
  })
  const [,addExam] = useAddExamMutation()
  return (
    <>
      <ProfessorNavigationBar />
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
                    назив предмета
                  </label>
                  <label
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    id="grid-text-1"
                  >
                    {subject?.getSubject.subjectName}
                  </label>
                </div>
                <div className="w-full md:w-full px-3 mb-6 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    датум
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    id="grid-text-1"
                    // type={"number"}
                    value={date}
                    onChange={(e) => {
                      e.preventDefault();
                      setDate(e.target.value);
                    }}
                    placeholder="Унеси датум (2022-01-01)"
                  />
                </div>
                <div className="w-full md:w-full px-3 mb-6 ">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    испитни рок
                  </label>
                  <label
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    id="grid-text-1"
                  >
                    {data?.currentExPeriod.name}
                  </label>
                </div>
                <div className="w-full md:w-full px-3 mb-6 ">
                  <button
                    onClick={async (e) => {
                        await addExam({input:{
                            date:date,
                            subjectID:id,
                            exPeriodID:data?.currentExPeriod.id
                        }})

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

export default withUrqlClient(createUrqlClient)(CreateExam);
