import React, { useState, useEffect } from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import { ArrowLeft, ArrowRight } from '@material-ui/icons';

type CarouselProps = {
  items: {
    id: number;
    title: string;
    image: string;
    description: string;
  }[];
};

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePrevSlide = (): void => {
    setCurrentSlide((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNextSlide = (): void => {
    setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number): void => {
    setCurrentSlide(index);
  };

  const handlePlayPause = (): void => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    let interval: any;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === items.length - 1 ? 0 : prev + 1));
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, items.length]);

  return (
    <Grid container xs={12}>
      <Grid item xs={12} md={6} spacing={5} justifyContent="center">
        <Grid container xs={12} justifyContent="center">
          <Grid justifyContent="center" xs={12} md={10}>
            <img
              src={items[currentSlide].image}
              alt={items[currentSlide].title}
              style={{ borderRadius: '23px', width: '100%', height: '40vh' }}
            />
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: '5%' }}
          xs={12}
        >
          <Grid item xs={2} alignItems="flex-end" style={{ flexBasis: 0 }}>
            <IconButton onClick={handlePrevSlide}>
              <ArrowLeft fontSize="large" />
            </IconButton>
          </Grid>
          <Grid container spacing={2} xs={9}>
            {items.map((item, index) => (
              <Grid key={item.id} item xs={3}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    filter: currentSlide === index ? 'none' : 'grayscale(100%)',
                    borderRadius: '23px',
                    width: '100%',
                    height: '100%',
                  }}
                  onClick={() => handleThumbnailClick(index)}
                />
              </Grid>
            ))}
          </Grid>

          <Grid item xs={1} alignContent="center">
            <IconButton onClick={handleNextSlide}>
              <ArrowRight fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      <Grid container sm={12} md={5} spacing={4} style={{ margin: '20px' }}>
        <Grid item sm={10}>
          <Grid item xs={12}>
            <Typography variant="h3">{items[currentSlide].title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">
              {items[currentSlide].description}
            </Typography>
          </Grid>
        </Grid>
        <Grid item sm={3}>
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? (
              <PauseIcon fontSize="large" />
            ) : (
              <PlayArrowIcon fontSize="large" />
            )}
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Carousel;
