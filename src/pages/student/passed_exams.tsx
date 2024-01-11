import { withUrqlClient } from "next-urql";
import React from "react";
import { NavigationBar } from "../../components/student/NavigationBar";
import { PassedExamsTable } from "../../components/student/tables/PassedExamsTable";
import { createUrqlClient } from "../../utils/createUrqlClient";


const passedExams = () => {
  return (
    <div>
      <NavigationBar />
      <h1 className="text-center text-3xl font-bold text-gray-600 mt-4">Положени испити</h1>
      <PassedExamsTable/>
    </div>
  );
};

export default withUrqlClient(createUrqlClient,{ssr:true})(passedExams);
