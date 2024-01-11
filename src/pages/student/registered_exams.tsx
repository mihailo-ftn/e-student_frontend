import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { NavigationBar } from "../../components/student/NavigationBar";
import { RegisteredExamsTable } from "../../components/student/tables/RegisteredExamsTable";
import { createUrqlClient } from "../../utils/createUrqlClient";


const RegisteredExams = ({}) => {

  const router = useRouter();
  return (
    <>
      <NavigationBar />
      <h1 className="text-center text-3xl font-bold text-gray-600 mt-4">
        Пријављени испити
      </h1>
      <RegisteredExamsTable />
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(RegisteredExams);
