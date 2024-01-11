import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeProfessorQuery } from "../generated/graphql";

export const isProfessor = () => {
    const [{ data, fetching }] = useMeProfessorQuery();
    const router = useRouter();
    useEffect(() => {
      if (!data?.meProfessor) {
        router.push("/login");
      }
    }, [fetching, data, router]);
  };