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
    <div>
      <Grid>
        <Grid style={{ display: 'flex', gap: '50px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={items[currentSlide].image}
              alt={items[currentSlide].title}
              width={700}
              height={400}
              style={{ borderRadius: '33px' }}
            />

            <Grid
              className="flex"
              style={{ display: 'flex', alignItems: 'center', gap: '30px' }}
            >
              <IconButton onClick={handlePrevSlide}>
                <ArrowLeft fontSize="large" />
              </IconButton>
              {items.map((item, index) => (
                <Grid key={item.id} style={{ marginTop: '30px' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      filter:
                        currentSlide === index ? 'none' : 'grayscale(100%)',
                      borderRadius: '33px',
                    }}
                    width={150}
                    height={120}
                    onClick={() => handleThumbnailClick(index)}
                  />
                </Grid>
              ))}

              <IconButton onClick={handleNextSlide}>
                <ArrowRight fontSize="large" />
              </IconButton>
            </Grid>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Grid justifyContent="flex-start" style={{ gap: '10px' }}>
              <Grid item>
                <Typography variant="h3">
                  {items[currentSlide].title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h5">
                  {items[currentSlide].description}
                </Typography>
              </Grid>
            </Grid>
            <div style={{ justifyContent: 'end' }}>
              <IconButton onClick={handlePlayPause}>
                {isPlaying ? (
                  <PauseIcon fontSize="large" />
                ) : (
                  <PlayArrowIcon fontSize="large" />
                )}
              </IconButton>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Carousel;
