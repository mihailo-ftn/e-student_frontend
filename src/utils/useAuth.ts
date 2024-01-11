import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!data?.me) {
      router.replace("/student/please_login");
    }
  }, [fetching, data, router]);
};
