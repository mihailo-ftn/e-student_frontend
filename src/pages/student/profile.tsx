import { withUrqlClient } from "next-urql";
import { CardBasic } from "../../components/CardBasic";
import { CardExams } from "../../components/CardExams";
import { NavigationBar } from "../../components/student/NavigationBar";
import { useMeQuery, useAverageGradeQuery, useEspbQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient"

const Profile = () =>{
    const [{ data }] = useMeQuery();
    const [{data:avg}] = useAverageGradeQuery();
    const [{data:espp}] = useEspbQuery();
    return (
      <>
        <NavigationBar />
        <div className="flex justify-center">
          <div className="mt-6">
            <img
              className="h-48 w-48 rounded-full shadow-md"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
        </div>
        <div className="">
          <div className="">
            <CardBasic
              name={data ? data?.me.firstName + " " + data?.me.lastName : ""}
              email={data ? data?.me.email: ""}
              brind={data ? data?.me.brind: ""}
            />
          </div>
          <div className="">
            <CardExams
            average={avg ? avg : 0.00}
            espp={espp ? espp : 0}
            />
          </div>
        </div>
      </>
    );
}

export default withUrqlClient(createUrqlClient)(Profile)