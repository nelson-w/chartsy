import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";

import { Image, defaultImage } from "./image";
import { Search, SearchType } from "./search";
import { Collage } from "./collage";
import { Save } from "./options";
import { getAlbum, getGame, getMovie, getSeries } from "./fetcher";
import { onResults } from "./results";

let defaultImages = () => {
  let imgs: Image[] = [];
  for (let i = 0; i < 50; i++) {
    imgs.push(defaultImage);
  }

  return imgs;
};

export const Home: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState(SearchType.Music);
  const [activeButton, setActiveButton] = useState("music");
  const [columns, setColumns] = useState(5);

  useEffect(() => {
    const download = async () => {
      if (search === "") {
        return;
      }

      switch (searchType) {
        case SearchType.Games:
          let albums = await getGame(search);
          setImages(albums);
          break;

        case SearchType.Movies:
          let movies = await getMovie(search);
          setImages(movies);
          break;

        case SearchType.Series:
          let series = await getSeries(search);
          setImages(series);
          break;

        default:
          let games = await getAlbum(search);
          setImages(games);
          break;
      }
    };

    download();
  }, [search, setImages, searchType]);

  return (
    <div className="home">
      <Grid padded>
        <Grid.Column width={3}>
          <Grid.Row>
            <Button.Group>
              <Button
                basic
                active={activeButton === "music"}
                icon="music"
                onClick={(e) => {
                  setSearchType(SearchType.Music);
                  setActiveButton("music");
                  e.preventDefault();
                }}
              />
              <Button
                basic
                active={activeButton === "game"}
                icon="game"
                onClick={(e) => {
                  setSearchType(SearchType.Games);
                  setActiveButton("game");
                  e.preventDefault();
                }}
              />
              <Button
                basic
                active={activeButton === "film"}
                icon="film"
                onClick={(e) => {
                  setSearchType(SearchType.Movies);
                  setActiveButton("film");
                  e.preventDefault();
                }}
              />
              <Button
                basic
                active={activeButton === "tv"}
                icon="tv"
                onClick={(e) => {
                  setSearchType(SearchType.Series);
                  setActiveButton("tv");
                  e.preventDefault();
                }}
              />
            </Button.Group>
          </Grid.Row>
          <Grid.Row>
            <Search setSearch={setSearch} />
          </Grid.Row>
          <Grid.Row padded>{onResults(search, images)}</Grid.Row>
        </Grid.Column>
        <Grid.Column width={11}>
          <Collage cols={columns} images={defaultImages()} titleVisible={true} />
        </Grid.Column>
        <Grid.Column width={2}>
          <Save cols={columns} setCols={setColumns} />
        </Grid.Column>
      </Grid>
    </div>
  );
};
