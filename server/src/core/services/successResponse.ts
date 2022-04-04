export function successResponse(result: object | object[]) {
  const response = {
    success: true,
    result,
  };
  return response;
}
