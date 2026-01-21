type GetReturnLocation = () => string | null;
export const getReturnLocation: GetReturnLocation = () => {
  const location = (window.location.pathname + window.location.hash).split("?")[1];
  const searchParams = new URLSearchParams(location);
  const returnLocationParamValue = searchParams.get("returnLocation");
  return returnLocationParamValue ? decodeURIComponent(returnLocationParamValue) : null;
};

