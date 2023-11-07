const getSongs = async (id: string | undefined) => {
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
  const requestJson = await request.json();
  console.log(requestJson.results)
  return requestJson.results;
};

export default getSongs;
