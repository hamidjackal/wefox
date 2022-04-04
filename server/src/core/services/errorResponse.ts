const UNKNOWN_SERVER_ERROR = {
  message: 'Unknown server error',
  code: 500,
};

export function errorResponse(error: Error) {
  return {
    success: false,
    error:
      Object.keys(error).length === 0
        ? Object.assign({}, UNKNOWN_SERVER_ERROR, {
            errorContent: typeof error === 'object' ? error.stack : undefined,
          })
        : error,
  };
}
