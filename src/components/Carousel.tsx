import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Button,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';

type CarouselProps = {
  items: {
    id: number;
    title: string;
    image: string;
    description: string;
  }[];
};

const useStyles = makeStyles((theme) => ({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.5s',
  },
  currentImage: {
    opacity: 1,
    width: '100%',
    height: 'auto',
    marginBottom: theme.spacing(2),
  },
  prevImage: {
    opacity: 0,
    width: '50%',
    height: 'auto',
    marginRight: theme.spacing(2),
  },
  nextImage: {
    opacity: 0,
    width: '50%',
    height: 'auto',
    marginLeft: theme.spacing(2),
  },
  controls: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.spacing(0, 2),
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
  },
  playButton: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
  },
  thumbnailContainer: {
    display: 'flex',
    overflowX: 'auto',
    margin: theme.spacing(2, 0),
  },
  thumbnail: {
    flex: '0 0 auto',
    margin: theme.spacing(0, 0.5),
    cursor: 'pointer',
    filter: 'grayscale(1)',
    '&:hover': {
      filter: 'grayscale(0)',
    },
  },
  selectedThumbnail: {
    filter: 'grayscale(0)',
  },
}));

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

          <Grid justifyContent="flex-start" style={{ gap: '10px' }}>
            <Grid item>
              <Typography variant="h3">{items[currentSlide].title}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                {items[currentSlide].description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Carousel;
