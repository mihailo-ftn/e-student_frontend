import { withUrqlClient } from "next-urql";
import React from "react";
import { NavigationBar } from "../../components/student/NavigationBar";
import { NextExaminationPeriodTable } from "../../components/student/tables/NextExaminationPeriodTable";
import { createUrqlClient } from "../../utils/createUrqlClient";


const NextExaminationPeriod = ({}) => {

  return (
    <>
      <NavigationBar />
      <NextExaminationPeriodTable />
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(
  NextExaminationPeriod
);
