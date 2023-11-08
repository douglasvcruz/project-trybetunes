import { ResultItem } from "../interfaces/IResultItem";

const searchAlbumsAPI = async (artist: string) => {
  const artistNameURL = encodeURI(artist).replaceAll("%20", "+");

  const getAlbumsAPI = `https://itunes.apple.com/search?entity=album&term=${artistNameURL}&attribute=allArtistTerm`;

  const APIResponse = await fetch(getAlbumsAPI);
  const { results } = await APIResponse.json();

  const response: ResultItem[] = results.map(
    ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    }: ResultItem) => ({
      artistId,
      artistName,
      collectionId,
      collectionName,
      collectionPrice,
      artworkUrl100,
      releaseDate,
      trackCount,
    })
  );
  return response;
};

export default searchAlbumsAPI;
