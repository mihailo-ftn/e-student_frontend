export const submitForm = async (
  values: Object,
  cb: () => Promise<any>,
  setError: (error: string) => any,
  setShowSuccess: (value: boolean) => any
) => {
  if (Object.values(values).every((value) => !!value)) {
    const response = await cb();
    if (response.error) {
      if (response.error?.message.includes("ER201")) {
        setError("Непостојећи модул");
      } else if (response.error?.message.includes("ER100")) {
        setError("Неправилан унос!");
      } else if (response.error?.message.includes("ER001")) {
        setError("неважећи кориснички креденцијали!");
      } else if (response.error?.message.includes("ER301")) {
        setError("Непостојећи предмет");
      } else if (response.error?.message.includes("ER02")) {
        setError("Нисте ауторизовани");
      } else if (response.error?.message.includes("ER401")) {
        setError("Непостојећи предмет");
      } else {
        setError("Дошло је до грешке!");
      }
    } else {
      setShowSuccess(true);
    }
  } else {
    setError("Неправилан унос!");
  }
};
