const BaseUrl = `http://d98a-211-38-155-122.ngrok.io/login/`;

export const fetchPost = async () => {
  const response = await (await fetch(BaseUrl)).json();
  return response;
};
