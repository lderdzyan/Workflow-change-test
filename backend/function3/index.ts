export const handler = async () => {
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!3'),
  };
  return response;
};
